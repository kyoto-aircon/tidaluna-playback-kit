import { debugLog } from "./debug";
import { semitoneRatio } from "./pitch";
import { PITCH_WORKLET_SOURCE } from "./pitchWorklet";

export type PitchEngineStatus = "idle" | "waiting" | "running" | "ready" | "unavailable";

export interface PitchEngineState {
	status: PitchEngineStatus;
	reason?: string;
	semitones: number;
	context?: AudioContextState;
	attached: number;
}

const PROCESSOR_NAME = "playback-kit-pitch";

let context: AudioContext | undefined;
let node: AudioWorkletNode | undefined;
let modulePromise: Promise<void> | undefined;
let state: PitchEngineState = { status: "idle", semitones: 0, attached: 0 };

const sources = new WeakMap<HTMLMediaElement, MediaElementAudioSourceNode>();
let attachedCount = 0;

export const getPitchEngineState = (): PitchEngineState => ({ ...state });

const ensureContext = async (): Promise<AudioContext> => {
	if (context === undefined) {
		const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
		if (Ctor === undefined) throw new Error("Web Audio is unavailable");
		context = new Ctor({ latencyHint: "playback" });
	}
	if (context.state === "suspended") {
		try {
			await Promise.race([context.resume(), new Promise((resolve) => setTimeout(resolve, 250))]);
		} catch {
			// A gesture is required; attach() reports this without touching the graph.
		}
	}
	return context;
};

const ensureNode = async (): Promise<AudioWorkletNode> => {
	const ctx = await ensureContext();
	if (modulePromise === undefined) {
		const url = URL.createObjectURL(new Blob([PITCH_WORKLET_SOURCE], { type: "text/javascript" }));
		modulePromise = ctx.audioWorklet.addModule(url).finally(() => URL.revokeObjectURL(url));
	}
	await modulePromise;
	if (node === undefined) {
		node = new AudioWorkletNode(ctx, PROCESSOR_NAME, { numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [2] });
		node.connect(ctx.destination);
	}
	return node;
};

const pickElement = (elements: HTMLMediaElement[]): HTMLMediaElement | undefined =>
	elements.find((element) => !element.paused && element.readyState > 0) ?? elements.find((element) => element.readyState > 0);

const attach = async (semitones: number, elements: HTMLMediaElement[]): Promise<void> => {
	const ctx = await ensureContext();
	if (ctx.state !== "running") {
		state = { status: "waiting", reason: "audio context suspended (interact with the page)", semitones, context: ctx.state, attached: attachedCount };
		return;
	}
	const worklet = await ensureNode();
	const element = pickElement(elements);
	if (element === undefined) {
		state = { status: "waiting", semitones, context: ctx.state, attached: attachedCount };
		return;
	}
	if (element.mediaKeys !== null && element.mediaKeys !== undefined) {
		state = { status: "unavailable", reason: "protected media (DRM) cannot be routed through Web Audio", semitones, context: ctx.state, attached: attachedCount };
		return;
	}
	let source = sources.get(element);
	if (source === undefined) {
		source = ctx.createMediaElementSource(element);
		source.connect(worklet);
		sources.set(element, source);
		attachedCount += 1;
		debugLog("info", "pitch engine attached to element", { id: element.id, channels: source.channelCount });
	}
	const ratio = worklet.parameters.get("ratio");
	if (ratio !== undefined) ratio.value = semitoneRatio(semitones);
	state = { status: "running", semitones, context: ctx.state, attached: attachedCount };
};

/** ratio 1 is a transparent passthrough; the graph stays connected once created. */
export const setPitchSemitones = async (semitones: number, elements: HTMLMediaElement[]): Promise<void> => {
	if (semitones === 0) {
		if (node !== undefined) {
			const ratio = node.parameters.get("ratio");
			if (ratio !== undefined) ratio.value = 1;
		}
		state = { ...state, status: node === undefined ? "idle" : "ready", semitones: 0, reason: undefined, context: context?.state, attached: attachedCount };
		return;
	}
	try {
		await attach(semitones, elements);
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		state = { status: "unavailable", reason: message, semitones, context: context?.state, attached: attachedCount };
		debugLog("error", "pitch engine unavailable", { error: message });
	}
};

/** Leaves the graph connected but transparent. Called when the plugin unloads. */
export const resetPitchEngine = (): void => {
	if (node !== undefined) {
		const ratio = node.parameters.get("ratio");
		if (ratio !== undefined) ratio.value = 1;
	}
	state = { ...state, status: node === undefined ? "idle" : "ready", semitones: 0, reason: undefined, context: context?.state, attached: attachedCount };
};
