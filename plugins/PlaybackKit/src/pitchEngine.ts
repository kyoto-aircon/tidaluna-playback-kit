import { attach, ensureContext, getStatus, insert, loadWorklet } from "./audioEngine";
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

let node: AudioWorkletNode | undefined;

let state: PitchEngineState = { status: "idle", semitones: 0, attached: 0 };

export const getPitchEngineState = (): PitchEngineState => ({ ...state });

const pickElement = (elements: HTMLMediaElement[]): HTMLMediaElement | undefined =>
	elements.find((element) => !element.paused && element.readyState > 0) ?? elements.find((element) => element.readyState > 0);

const ensureNode = async (ctx: AudioContext): Promise<AudioWorkletNode> => {
	await loadWorklet(PITCH_WORKLET_SOURCE, PROCESSOR_NAME);
	if (node === undefined) {
		node = new AudioWorkletNode(ctx, PROCESSOR_NAME, { numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [2] });
		await insert(node, 0);
		debugLog("info", "pitch node inserted into audio engine");
	}
	return node;
};

const attachPitch = async (semitones: number, elements: HTMLMediaElement[]): Promise<void> => {
	const ctx = await ensureContext();
	if (ctx.state !== "running") {
		state = { status: "waiting", reason: "audio context suspended (interact with the page)", semitones, context: ctx.state, attached: state.attached };
		return;
	}
	const element = pickElement(elements);
	if (element === undefined) {
		state = { status: "waiting", reason: "no playing media element", semitones, context: ctx.state, attached: state.attached };
		return;
	}
	await attach(element);
	const worklet = await ensureNode(ctx);
	const ratio = worklet.parameters.get("ratio");
	if (ratio !== undefined) ratio.value = semitoneRatio(semitones);
	state = { status: "running", semitones, context: ctx.state, attached: getStatus().sources };
};

/** ratio 1 is a transparent passthrough; the graph stays connected once created. */
export const setPitchSemitones = async (semitones: number, elements: HTMLMediaElement[]): Promise<void> => {
	if (semitones === 0) {
		if (node !== undefined) {
			const ratio = node.parameters.get("ratio");
			if (ratio !== undefined) ratio.value = 1;
		}
		state = { ...state, status: node === undefined ? "idle" : "ready", semitones: 0, reason: undefined };
		return;
	}
	try {
		await attachPitch(semitones, elements);
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		state = { status: "unavailable", reason: message, semitones, attached: state.attached };
		debugLog("error", "pitch engine unavailable", { error: message });
	}
};

/** Leaves the graph connected but transparent. Called when the plugin unloads. */
export const resetPitchEngine = (): void => {
	if (node !== undefined) {
		const ratio = node.parameters.get("ratio");
		if (ratio !== undefined) ratio.value = 1;
	}
	state = { ...state, status: node === undefined ? "idle" : "ready", semitones: 0, reason: undefined };
};
