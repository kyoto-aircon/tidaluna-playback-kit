import { debugLog } from "./debug";

export interface AudioEngineStatus {
	context: AudioContextState | "none";
	sampleRate?: number;
	sources: number;
	nodes: number;
}

export interface RmsResult {
	rms: number;
	peak: number;
	silent: boolean;
	samples: number;
	durationMs: number;
}

export interface AudioEngineApi {
	version: 1;
	ensureContext(): Promise<AudioContext>;
	loadWorklet(source: string, name: string): Promise<void>;
	attach(element: HTMLMediaElement): Promise<void>;
	insert(node: AudioNode, index?: number): Promise<void>;
	insertGroup(input: AudioNode, output: AudioNode, index?: number): Promise<void>;
	remove(node: AudioNode): Promise<boolean>;
	list(): AudioNode[];
	status(): AudioEngineStatus;
	measureRms(durationMs?: number): Promise<RmsResult>;
}

const WORKLET_LOAD_TIMEOUT_MS = 400;
const RMS_SAMPLE_MS = 100;
const SILENT_RMS = 0.0005;

let context: AudioContext | undefined;
let chainIn: GainNode | undefined;
let chainOut: GainNode | undefined;
let analyser: AnalyserNode | undefined;
interface ChainItem {
	input: AudioNode;
	output: AudioNode;
}

let chain: ChainItem[] = [];

const sources = new WeakMap<HTMLMediaElement, MediaElementAudioSourceNode>();
let sourceCount = 0;

const worklets = new Map<string, Promise<void>>();

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const ensureContext = async (): Promise<AudioContext> => {
	if (context === undefined) {
		const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
		if (Ctor === undefined) throw new Error("Web Audio is unavailable");
		context = new Ctor({ latencyHint: "playback" });
		debugLog("info", "audio context created", { sampleRate: context.sampleRate, state: context.state });
	}
	if (context.state === "suspended") {
		try {
			await Promise.race([context.resume(), delay(250)]);
		} catch {
			// A user gesture is required; callers check state.
		}
	}
	return context;
};

const rebuild = (): void => {
	if (chainIn === undefined || chainOut === undefined) return;
	chainIn.disconnect();
	for (const item of chain) {
		try {
			item.output.disconnect();
		} catch {
			// Already disconnected.
		}
	}
	let previous: AudioNode = chainIn;
	for (const item of chain) {
		previous.connect(item.input);
		previous = item.output;
	}
	previous.connect(chainOut);
};

const ensureChain = async (): Promise<{ ctx: AudioContext; input: GainNode; output: GainNode }> => {
	const ctx = await ensureContext();
	if (chainIn === undefined || chainOut === undefined) {
		chainIn = ctx.createGain();
		chainOut = ctx.createGain();
		analyser = ctx.createAnalyser();
		analyser.fftSize = 2048;
		chainOut.connect(analyser);
		chainOut.connect(ctx.destination);
	}
	rebuild();
	return { ctx, input: chainIn, output: chainOut };
};

export const loadWorklet = async (source: string, name: string): Promise<void> => {
	if (worklets.has(name)) return worklets.get(name);
	const ctx = await ensureContext();
	const url = URL.createObjectURL(new Blob([source], { type: "text/javascript" }));
	const load = (async (): Promise<void> => {
		let timer: ReturnType<typeof setTimeout> | undefined;
		try {
			await Promise.race([
				ctx.audioWorklet.addModule(url),
				new Promise<never>((_, reject) => {
					timer = setTimeout(() => reject(new Error(`Timed out loading worklet ${name}`)), WORKLET_LOAD_TIMEOUT_MS * 10);
				}),
			]);
		} finally {
			if (timer !== undefined) clearTimeout(timer);
			URL.revokeObjectURL(url);
		}
	})();
	worklets.set(name, load);
	try {
		await load;
	} catch (err) {
		worklets.delete(name);
		throw err;
	}
};

export const attach = async (element: HTMLMediaElement): Promise<void> => {
	const { ctx, input } = await ensureChain();
	if (sources.has(element)) return;
	if (element.mediaKeys !== null && element.mediaKeys !== undefined) {
		throw new Error("protected media (DRM) cannot be routed through Web Audio");
	}
	const source = ctx.createMediaElementSource(element);
	source.connect(input);
	sources.set(element, source);
	sourceCount += 1;
	debugLog("info", "audio engine attached element", { id: element.id, sources: sourceCount });
};

export const insert = async (node: AudioNode, index?: number): Promise<void> => {
	await insertGroup(node, node, index);
};

/** Insert a multi-node effect: engine connects previous -> input and output -> next. */
export const insertGroup = async (input: AudioNode, output: AudioNode, index?: number): Promise<void> => {
	await ensureChain();
	if (chain.some((item) => item.input === input)) return;
	const at = index === undefined ? chain.length : Math.max(0, Math.min(chain.length, index));
	chain.splice(at, 0, { input, output });
	rebuild();
	debugLog("debug", "audio engine inserted group", { index: at, nodes: chain.length });
};

export const remove = async (node: AudioNode): Promise<boolean> => {
	await ensureChain();
	const index = chain.findIndex((item) => item.input === node || item.output === node);
	if (index < 0) return false;
	const [item] = chain.splice(index, 1);
	try {
		item.output.disconnect();
	} catch {
		// Already disconnected.
	}
	rebuild();
	return true;
};

export const list = (): AudioNode[] => chain.map((item) => item.input);

export const getStatus = (): AudioEngineStatus => ({
	context: context === undefined ? "none" : context.state,
	sampleRate: context?.sampleRate,
	sources: sourceCount,
	nodes: chain.length,
});

export const measureRms = async (durationMs: number = 1200): Promise<RmsResult> => {
	const { ctx } = await ensureChain();
	if (analyser === undefined) throw new Error("analyser unavailable");
	const samples = Math.max(1, Math.round(durationMs / RMS_SAMPLE_MS));
	const buffer = new Float32Array(analyser.fftSize);
	let peak = 0;
	let sumSquares = 0;
	let taken = 0;
	for (let index = 0; index < samples; index += 1) {
		await delay(RMS_SAMPLE_MS);
		if (ctx.state !== "running") continue;
		analyser.getFloatTimeDomainData(buffer);
		let localPeak = 0;
		let localSquares = 0;
		for (const sample of buffer) {
			const magnitude = Math.abs(sample);
			if (magnitude > localPeak) localPeak = magnitude;
			localSquares += sample * sample;
		}
		peak = Math.max(peak, localPeak);
		sumSquares += localSquares / buffer.length;
		taken += 1;
	}
	const rms = taken === 0 ? 0 : Math.sqrt(sumSquares / taken);
	return { rms, peak, samples: taken, silent: rms < SILENT_RMS, durationMs };
};

export const getAudioEngineApi = (): AudioEngineApi => ({
	version: 1,
	ensureContext,
	loadWorklet,
	attach,
	insert,
	insertGroup,
	remove,
	list,
	status: getStatus,
	measureRms,
});


export const exposeAudioEngine = (): AudioEngineApi => {
	const api = getAudioEngineApi();
	(globalThis as Record<string, unknown>).__playbackKitAudio = api;
	return api;
};

export const hideAudioEngine = (api: AudioEngineApi): void => {
	if ((globalThis as Record<string, unknown>).__playbackKitAudio === api) {
		delete (globalThis as Record<string, unknown>).__playbackKitAudio;
	}
};
