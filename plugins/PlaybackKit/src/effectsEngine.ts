import { attach, ensureContext, getStatus, insertGroup } from "./audioEngine";
import { debugLog } from "./debug";
import { EQ_FREQUENCIES, hasAudibleEffects, normalizeEffects, type EffectsSettings } from "./effectsSettings";

export interface EffectsEngineState {
	built: boolean;
	context?: AudioContextState | "none";
	active: string[];
	error?: string;
	attached: number;
}

interface Graph {
	fxIn: GainNode;
	eqFilters: BiquadFilterNode[];
	delayDry: GainNode;
	delayNode: DelayNode;
	delayWet: GainNode;
	delayFeedback: GainNode;
	reverbIn: GainNode;
	reverbDry: GainNode;
	convolver: ConvolverNode;
	reverbWet: GainNode;
	fxOut: GainNode;
	decay: number;
}

let graph: Graph | undefined;
let state: EffectsEngineState = { built: false, active: [], attached: 0 };

export const getEffectsEngineState = (): EffectsEngineState => ({ ...state });

const pickElement = (elements: HTMLMediaElement[]): HTMLMediaElement | undefined =>
	elements.find((element) => !element.paused && element.readyState > 0) ?? elements.find((element) => element.readyState > 0);

const makeImpulse = (ctx: AudioContext, decay: number): AudioBuffer => {
	const length = Math.max(1, Math.floor(ctx.sampleRate * decay));
	const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
	for (let channel = 0; channel < 2; channel += 1) {
		const data = buffer.getChannelData(channel);
		for (let index = 0; index < length; index += 1) {
			const envelope = Math.pow(1 - index / length, 2.2);
			data[index] = (Math.random() * 2 - 1) * envelope;
		}
	}
	return buffer;
};

const build = async (): Promise<Graph> => {
	const ctx = await ensureContext();
	if (graph !== undefined) return graph;
	const fxIn = ctx.createGain();
	const eqFilters = EQ_FREQUENCIES.map((frequency, index) => {
		const filter = ctx.createBiquadFilter();
		filter.frequency.value = frequency;
		if (index === 0) filter.type = "lowshelf";
		else if (index === EQ_FREQUENCIES.length - 1) filter.type = "highshelf";
		else {
			filter.type = "peaking";
			filter.Q.value = 1.2;
		}
		return filter;
	});

	const delayDry = ctx.createGain();
	const delayNode = ctx.createDelay(2);
	const delayWet = ctx.createGain();
	const delayFeedback = ctx.createGain();

	const reverbIn = ctx.createGain();
	const reverbDry = ctx.createGain();
	const convolver = ctx.createConvolver();
	const reverbWet = ctx.createGain();
	const fxOut = ctx.createGain();

	fxIn.connect(eqFilters[0]);
	for (let index = 1; index < eqFilters.length; index += 1) eqFilters[index - 1].connect(eqFilters[index]);
	const eqTail = eqFilters[eqFilters.length - 1];

	eqTail.connect(delayDry);
	delayDry.connect(reverbIn);
	eqTail.connect(delayNode);
	delayNode.connect(delayWet);
	delayWet.connect(reverbIn);
	delayNode.connect(delayFeedback);
	delayFeedback.connect(delayNode);

	reverbIn.connect(reverbDry);
	reverbDry.connect(fxOut);
	reverbIn.connect(convolver);
	convolver.connect(reverbWet);
	reverbWet.connect(fxOut);

	graph = {
		fxIn,
		eqFilters,
		delayDry,
		delayNode,
		delayWet,
		delayFeedback,
		reverbIn,
		reverbDry,
		convolver,
		reverbWet,
		fxOut,
		decay: 0,
	};
	await insertGroup(fxIn, fxOut);
	debugLog("info", "effects graph inserted");
	return graph;
};

const applyParams = (ctx: AudioContext, effects: EffectsSettings): void => {
	if (graph === undefined) return;
	const now = ctx.currentTime;
	const smooth = 0.03;
	const g = graph;

	for (let index = 0; index < g.eqFilters.length; index += 1) {
		const gain = effects.eq.enabled ? (effects.eq.bands[index] ?? 0) : 0;
		g.eqFilters[index].gain.setTargetAtTime(gain, now, smooth);
	}

	const delayWet = effects.delay.enabled ? effects.delay.mix : 0;
	g.delayNode.delayTime.setTargetAtTime(Math.min(2, Math.max(0.02, effects.delay.timeMs / 1000)), now, smooth);
	g.delayFeedback.gain.setTargetAtTime(effects.delay.enabled ? effects.delay.feedback : 0, now, smooth);
	g.delayWet.gain.setTargetAtTime(delayWet, now, smooth);
	g.delayDry.gain.setTargetAtTime(1 - delayWet, now, smooth);

	const reverbWet = effects.reverb.enabled ? effects.reverb.mix : 0;
	if (Math.abs(g.decay - effects.reverb.decay) > 0.05) {
		g.convolver.buffer = makeImpulse(ctx, effects.reverb.decay);
		g.decay = effects.reverb.decay;
	}
	g.reverbWet.gain.setTargetAtTime(reverbWet, now, smooth);
	g.reverbDry.gain.setTargetAtTime(1 - reverbWet, now, smooth);
};

export const updateEffects = async (effects: EffectsSettings, elements: HTMLMediaElement[]): Promise<void> => {
	const normalized = normalizeEffects(effects);
	const enabled = hasAudibleEffects(normalized);
	if (!enabled && graph === undefined) {
		state = { ...state, active: [] };
		return;
	}
	try {
		const ctx = await ensureContext();
		if (ctx.state !== "running") {
			state = { built: graph !== undefined, context: ctx.state, active: [], error: "audio context suspended (interact with the page)", attached: getStatus().sources };
			return;
		}
		if (enabled) {
			const element = pickElement(elements);
			if (element !== undefined) await attach(element);
		}
		const built = await build();
		applyParams(ctx, normalized);
		state = {
			built: true,
			context: ctx.state,
			active: [
				normalized.eq.enabled ? "eq" : "",
				normalized.delay.enabled ? "delay" : "",
				normalized.reverb.enabled ? "reverb" : "",
			].filter((name) => name !== ""),
			attached: getStatus().sources,
		};
		if (built.decay === 0 && normalized.reverb.enabled) built.decay = normalized.reverb.decay;
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		state = { built: graph !== undefined, context: getStatus().context, active: [], error: message, attached: getStatus().sources };
		debugLog("warn", "effects engine unavailable", { error: message });
	}
};
