import type { LunaUnload } from "@luna/core";
import type { StretchNode } from "signalsmith-stretch";

import { connectSource, disconnectSource, ensureContext } from "./audioEngine";
import { debugLog } from "./debug";
import { hasAudibleEffects } from "./effectsSettings";
import { getNativeStreamState } from "./nativePlayer";
import { getPlayerKind } from "./playerKind";
import { preparePreload, prepareStream, readBridge, readTrack, releaseTrack } from "./nativeProbe.native";
import { stretchSemitones } from "./shadowMath";
import { ensureStretch, resetStretch } from "./stretch";
import type { SpeedSettings } from "./state";

const TICK_MS = 250;
const POLL_MS = 800;
const CHUNK_BYTES = 1024 * 1024;
const DRIFT_SECONDS = 0.4;
const MAX_BUFFER_BYTES = 420 * 1024 * 1024;

export interface ShadowDeps {
	getNativePosition: () => number | null;
	isPlaying: () => boolean;
	/** 0..1; the shadow player sets 0 while it owns audio and restores this on exit. */
	setNativeVolume: (volume: number) => void;
	getDesiredVolume?: () => number | undefined;
	pauseNative?: () => void;
	playNativeAt?: (time: number, volume: number) => void;
	seekNative?: (time: number) => void;
	getSettings: () => SpeedSettings;
}

export interface ShadowStatus {
	state: "idle" | "preparing" | "ready" | "failed";
	engine: "signalsmith";
	bufferSeconds: number | null;
	playing: boolean;
	muted: boolean;
	nativePaused: boolean;
	rate: number;
	loadAt: number | null;
	error?: string;
}

let deps: ShadowDeps | undefined;
let timer: ReturnType<typeof setInterval> | undefined;
let busy = false;
let enabled = false;

let loadAt: number | null = null;
let lastPreloadAt: number | null = null;
let phase: ShadowStatus["state"] = "idle";
let preparingId: number | null = null;

let trackDuration = 0;
let channels: [Float32Array, Float32Array] | undefined;
let buffered = false;
let stretchNode: StretchNode | undefined;
let shadowGain: GainNode | undefined;

let sourceStartedAt = 0;
let sourceOffset = 0;
let sourceRate = 1;
let sourcePitch = 0;
let sourcePlaying = false;
let muted = false;
let nativePaused = false;
let ending = false;
let lastPollAt = 0;
let lastSeekAt = 0;
let error: string | undefined;
let failedLoadAt: number | null = null;
let desiredVolume = 1;

const currentPosition = (): number => {
	if (!sourcePlaying) return sourceOffset;
	const node = stretchNode;
	const measured = node?.inputTime;
	if (typeof measured === "number" && Number.isFinite(measured) && measured > 0) return measured;
	const elapsed = node === undefined ? 0 : Math.max(0, node.context.currentTime - sourceStartedAt);
	return sourceOffset + elapsed * sourceRate;
};

const stopSource = (): void => {
	if (!sourcePlaying) return;
	const position = currentPosition();
	sourceOffset = position;
	sourcePlaying = false;
	if (stretchNode !== undefined) {
		void stretchNode.schedule({ output: stretchNode.context.currentTime, active: false });
	}
};

/** Keeps the shadow at TIDAL's desired volume (the native session is muted). */
const ensureGain = async (ctx: AudioContext): Promise<GainNode> => {
	if (shadowGain === undefined || shadowGain.context !== ctx) {
		shadowGain = ctx.createGain();
		await connectSource(shadowGain);
	}
	shadowGain.gain.value = desiredVolume;
	return shadowGain;
};

const setMuted = (next: boolean): void => {
	if (deps === undefined) return;
	if (next && !muted) {
		deps.setNativeVolume(0);
		muted = true;
	} else if (!next && muted) {
		const latest = deps.getDesiredVolume?.();
		if (latest !== undefined) desiredVolume = latest;
		deps.setNativeVolume(desiredVolume);
		muted = false;
	}
};

/** Puts the native renderer back at our position without stealing the clock. */
const resumeNativeIfPaused = (): void => {
	if (!nativePaused || deps === undefined) return;
	const position = channels === undefined ? (deps.getNativePosition() ?? 0) : currentPosition();
	deps.seekNative?.(position);
	if (deps.isPlaying()) deps.playNativeAt?.(position, desiredVolume);
	else deps.setNativeVolume(desiredVolume);
	nativePaused = false;
};

const pitchSemitones = (settings: SpeedSettings): number =>
	stretchSemitones(settings.pitchSemitones, settings.speed, settings.pitchShifts);

const startAt = async (position: number, followNative = true): Promise<void> => {
	if (channels === undefined) return;
	const ctx = await ensureContext();
	if (ctx.state !== "running") throw new Error(`audio context is ${ctx.state}`);
	if (!Number.isFinite(trackDuration) || trackDuration <= 0) return;
	const settings = deps?.getSettings();
	const speed = settings?.speed ?? 1;
	const pitch = settings === undefined ? 0 : pitchSemitones(settings);
	const offset = Math.min(Math.max(0, position), Math.max(0, trackDuration - 0.02));

	stopSource();
	ending = false;
	const node = await ensureStretch(ctx);
	const gain = await ensureGain(ctx);
	if (stretchNode !== node) {
		try {
			node.disconnect();
		} catch {
			// Not connected yet.
		}
		node.connect(gain);
		stretchNode = node;
	}
	if (!buffered) {
		await node.dropBuffers();
		await node.addBuffers(channels);
		buffered = true;
	}
	const live = followNative ? (deps?.getNativePosition() ?? null) : null;
	const start = live === null ? offset : Math.max(0, Math.min(live + 0.02, Math.max(0, trackDuration - 0.02)));
	await node.schedule({ output: ctx.currentTime + 0.08, input: start, active: true, rate: speed, semitones: pitch });
	sourceOffset = start;
	sourceStartedAt = ctx.currentTime + 0.08;
	sourceRate = speed;
	sourcePitch = pitch;
	sourcePlaying = true;

	setMuted(true);
	if (Math.abs(speed - 1) > 1e-3) {
		if (!nativePaused) {
			deps?.pauseNative?.();
			nativePaused = true;
		}
	} else if (nativePaused) {
		deps?.playNativeAt?.(start, 0);
		nativePaused = false;
	}
	debugLog("info", "shadow source started", { offset: Number(start.toFixed(3)), rate: speed, pitch });
};

const readAll = async (id: number, total: number): Promise<Uint8Array> => {
	const chunks: Uint8Array[] = [];
	let received = 0;
	while (received < total) {
		const chunk = await readTrack(id, received, Math.min(CHUNK_BYTES, total - received));
		if (!(chunk instanceof Uint8Array) || chunk.length === 0) throw new Error("native bridge returned an empty chunk");
		chunks.push(chunk);
		received += chunk.length;
	}
	const bytes = new Uint8Array(received);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.length;
	}
	return bytes;
};

const decodeTrack = async (id: number, total: number): Promise<void> => {
	const bytes = await readAll(id, total);
	await releaseTrack(id);
	const ctx = await ensureContext();
	const copy = new ArrayBuffer(bytes.byteLength);
	new Uint8Array(copy).set(bytes);
	const audio = await ctx.decodeAudioData(copy);
	const estimated = audio.length * audio.numberOfChannels * 4;
	if (estimated > MAX_BUFFER_BYTES) {
		throw new Error(`decoded track is too large (${Math.round(estimated / 1024 / 1024)} MB)`);
	}
	const left = new Float32Array(audio.getChannelData(0));
	const right = audio.numberOfChannels > 1 ? new Float32Array(audio.getChannelData(1)) : left.slice();
	channels = [left, right];
	trackDuration = audio.duration;
	buffered = false;
	phase = "ready";
	debugLog("info", "shadow track decoded", { seconds: Number(audio.duration.toFixed(2)), channels: audio.numberOfChannels });
};

const fail = (reason: unknown): void => {
	error = String(reason);
	phase = "failed";
	failedLoadAt = loadAt;
	stopSource();
	resumeNativeIfPaused();
	channels = undefined;
	buffered = false;
	setMuted(false);
	debugLog("error", "shadow player failed", { error });
};

const shouldRun = (settings: SpeedSettings): boolean =>
	settings.nativeEffects &&
	(hasAudibleEffects(settings.effects) || settings.pitchSemitones !== 0 || Math.abs(settings.speed - 1) > 1e-3);

const runTick = async (): Promise<void> => {
	if (deps === undefined) return;
	const settings = deps.getSettings();
	const active = enabled && getPlayerKind() === "native" && shouldRun(settings);
	if (!active) {
		if (sourcePlaying || channels !== undefined || muted || nativePaused) {
			stopSource();
			resumeNativeIfPaused();
			channels = undefined;
			buffered = false;
			phase = "idle";
			setMuted(false);
		}
		loadAt = null;
		lastPreloadAt = null;
		lastSeekAt = 0;
		failedLoadAt = null;
		return;
	}

	const latest = deps.getDesiredVolume?.();
	if (latest !== undefined && Number.isFinite(latest)) {
		desiredVolume = Math.max(0, Math.min(1, latest));
		if (shadowGain !== undefined) shadowGain.gain.value = desiredVolume;
	}

	const now = Date.now();
	if (now - lastPollAt >= POLL_MS) {
		lastPollAt = now;
		const streams = getNativeStreamState();
		if (streams.preload !== undefined && streams.preload.at !== lastPreloadAt) {
			lastPreloadAt = streams.preload.at;
			void preparePreload(streams.preload.url, streams.preload.format, streams.preload.key);
		}
		if (streams.load !== undefined && streams.load.at !== loadAt) {
			loadAt = streams.load.at;
			failedLoadAt = null;
			error = undefined;
			channels = undefined;
			buffered = false;
			trackDuration = 0;
			phase = "preparing";
			ending = false;
			nativePaused = false;
			lastSeekAt = streams.seek?.at ?? 0;
			stopSource();
			setMuted(false);
			const started = await prepareStream(streams.load.url, streams.load.format, streams.load.key);
			preparingId = started?.id ?? null;
			return;
		}
		if (phase === "preparing") {
			const bridge = await readBridge();
			const track = bridge.load;
			if (track !== undefined && track.state === "error") {
				fail(track.error ?? "native stream could not be prepared");
				return;
			}
			if (track !== undefined && track.state === "ready" && track.id === preparingId) {
				try {
					await decodeTrack(track.id, track.bytes);
				} catch (err) {
					fail(err);
					return;
				}
			}
		}
	}

	if (phase === "failed") {
		if (loadAt === failedLoadAt) return;
	}

	const speed = deps.getSettings().speed;
	const fast = Math.abs(speed - 1) > 1e-3;
	const streamState = getNativeStreamState();
	const seek = streamState.seek;
	if (seek !== undefined && seek.at !== lastSeekAt) {
		lastSeekAt = seek.at;
		if (channels !== undefined) {
			if (deps.isPlaying()) await startAt(seek.time, false);
			else {
				if (sourcePlaying) stopSource();
				sourceOffset = Math.max(0, seek.time);
			}
			return;
		}
	}
	if (channels === undefined) return;
	if (muted) deps.setNativeVolume(0);
	if (ending) return;

	const currentPitch = pitchSemitones(deps.getSettings());
	if (sourcePlaying && stretchNode !== undefined && (Math.abs(sourceRate - speed) > 1e-4 || Math.abs(sourcePitch - currentPitch) > 1e-4)) {
		const position = currentPosition();
		await stretchNode.schedule({ output: stretchNode.context.currentTime + 0.05, rate: speed, semitones: currentPitch });
		sourceOffset = position;
		sourceStartedAt = stretchNode.context.currentTime + 0.05;
		sourceRate = speed;
		sourcePitch = currentPitch;
		if (fast && !nativePaused) {
			setMuted(true);
			deps.pauseNative?.();
			nativePaused = true;
		} else if (!fast && nativePaused) {
			deps.playNativeAt?.(position, 0);
			nativePaused = false;
		}
	}

	const playing = deps.isPlaying();
	if (!playing) {
		if (sourcePlaying) {
			sourceOffset = currentPosition();
			stopSource();
		}
		setMuted(false);
		if (!fast) {
			const paused = deps.getNativePosition();
			if (paused !== null) sourceOffset = paused;
		}
		return;
	}

	if (fast) {
		if (!sourcePlaying) {
			await startAt(sourceOffset, false);
			return;
		}
		if (currentPosition() >= trackDuration - 0.06) {
			stopSource();
			ending = true;
			deps.playNativeAt?.(Math.max(0, trackDuration - 0.25), 0);
			nativePaused = false;
		}
		return;
	}

	const native = deps.getNativePosition();
	if (native === null) return;
	if (native >= trackDuration - 0.05) {
		if (sourcePlaying) stopSource();
		return;
	}
	setMuted(true);
	if (!sourcePlaying) {
		await startAt(native + 0.02);
		return;
	}
	if (Math.abs(currentPosition() - native) > DRIFT_SECONDS) {
		debugLog("info", "shadow resync", { ours: Number(currentPosition().toFixed(3)), native: Number(native.toFixed(3)) });
		await startAt(native + 0.02);
	}
};

const tick = (): void => {
	if (busy) return;
	busy = true;
	void runTick()
		.catch((err) => {
			debugLog("error", "shadow tick failed", { error: String(err) });
			fail(err);
		})
		.finally(() => {
			busy = false;
		});
};

export const updateShadowPlayer = (settings: SpeedSettings): void => {
	enabled = settings.nativeEffects;
};

export const getShadowPosition = (): number | null => (channels === undefined ? null : currentPosition());

export const getShadowStatus = (): ShadowStatus => ({
	state: phase,
	engine: "signalsmith",
	bufferSeconds: channels === undefined ? null : Number(trackDuration.toFixed(2)),
	playing: sourcePlaying,
	muted,
	nativePaused,
	rate: sourceRate,
	loadAt,
	error,
});

export const startShadowPlayer = (unloads: Set<LunaUnload>, next: ShadowDeps): void => {
	deps = next;
	const initial = next.getDesiredVolume?.();
	desiredVolume = initial !== undefined && Number.isFinite(initial) ? Math.max(0, Math.min(1, initial)) : 1;
	timer = setInterval(tick, TICK_MS);
	tick();
	unloads.add(() => {
		if (timer !== undefined) clearInterval(timer);
		timer = undefined;
		stopSource();
		resumeNativeIfPaused();
		if (shadowGain !== undefined) {
			disconnectSource(shadowGain);
			shadowGain = undefined;
		}
		resetStretch();
		stretchNode = undefined;
		channels = undefined;
		buffered = false;
		setMuted(false);
		deps = undefined;
	});
};
