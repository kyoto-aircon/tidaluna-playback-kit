import { attach, ensureContext, getStatus, measureRms, type AudioEngineStatus } from "./audioEngine";
import { debugLog } from "./debug";
import { getMediaElements } from "./mediaController";

export interface AudioSelfTestResult {
	at: number;
	ok: boolean;
	reason?: string;
	context: string;
	element?: { id: string; paused: boolean; readyState: number; currentTime: number; playbackRate: number };
	progressionSeconds?: number;
	rms?: number;
	peak?: number;
	silent?: boolean;
	engine: AudioEngineStatus;
}

const describe = (element: HTMLMediaElement) => ({
	id: element.id,
	paused: element.paused,
	readyState: element.readyState,
	currentTime: Number(element.currentTime.toFixed(2)),
	playbackRate: element.playbackRate,
});

/**
 * Dev-mode tool: attach the playing element, measure the captured signal and
 * explain silence/blocked reasons. Attaching is permanent for that element
 * until TIDAL restarts (one MediaElementSource per element).
 */
export const runAudioSelfTest = async (durationMs: number = 1200): Promise<AudioSelfTestResult> => {
	const at = Date.now();
	const engine = getStatus();
	const elements = getMediaElements();
	const element = elements.find((candidate) => !candidate.paused && candidate.readyState > 0) ?? elements[0];
	if (element === undefined) {
		const result: AudioSelfTestResult = { at, ok: false, reason: "no media element", context: engine.context, engine };
		debugLog("warn", "audio self-test: no media element");
		return result;
	}

	const startTime = element.currentTime;
	try {
		await attach(element);
	} catch (err) {
		const result: AudioSelfTestResult = {
			at,
			ok: false,
			reason: err instanceof Error ? err.message : String(err),
			context: getStatus().context,
			element: describe(element),
			engine: getStatus(),
		};
		debugLog("warn", "audio self-test failed to attach", result);
		return result;
	}

	const ctx = await ensureContext();
	let rms = 0;
	let peak = 0;
	let silent = true;
	try {
		const measured = await measureRms(durationMs);
		rms = measured.rms;
		peak = measured.peak;
		silent = measured.silent;
	} catch (err) {
		debugLog("error", "audio self-test measurement failed", { error: String(err) });
	}

	const progression = Number((element.currentTime - startTime).toFixed(2));
	const reason =
		ctx.state !== "running"
			? `audio context ${ctx.state}`
			: element.paused
				? "playback is paused"
				: silent && progression > 0.2
					? "captured audio is silent (DRM-protected or already routed elsewhere)"
					: silent
						? "no audio measured"
						: undefined;

	const result: AudioSelfTestResult = {
		at,
		ok: reason === undefined,
		reason,
		context: ctx.state,
		element: describe(element),
		progressionSeconds: progression,
		rms: Number(rms.toFixed(5)),
		peak: Number(peak.toFixed(5)),
		silent,
		engine: getStatus(),
	};
	debugLog(result.ok ? "info" : "warn", "audio self-test", result);
	return result;
};
