import type { LunaUnload } from "@luna/core";

import { connectSource, disconnectSource, ensureContext } from "./audioEngine";
import { debugLog } from "./debug";
import { hasAudibleEffects } from "./effectsSettings";
import { getPlayerKind } from "./playerKind";
import { prepareLastLoad, readProbe, readTrack, releaseTrack } from "./nativeProbe.native";
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
	getInitialVolume?: () => number | undefined;
	getSettings: () => SpeedSettings;
}

export interface ShadowStatus {
	state: "idle" | "preparing" | "ready" | "failed";
	bufferSeconds: number | null;
	playing: boolean;
	muted: boolean;
	loadAt: number | null;
	error?: string;
}

let deps: ShadowDeps | undefined;
let timer: ReturnType<typeof setInterval> | undefined;
let busy = false;
let enabled = false;

let loadAt: number | null = null;
let phase: ShadowStatus["state"] = "idle";
let preparingId: number | null = null;
let buffer: AudioBuffer | null = null;
let source: AudioBufferSourceNode | null = null;
let sourceStartedAt = 0;
let sourceOffset = 0;
let sourcePlaying = false;
let muted = false;
let lastPollAt = 0;
let error: string | undefined;
let failedLoadAt: number | null = null;
let desiredVolume = 1;

const currentPosition = (): number => {
	if (source === null || !sourcePlaying) return sourceOffset;
	const ctx = source.context;
	return Math.max(0, ctx.currentTime - sourceStartedAt + sourceOffset);
};

const stopSource = (): void => {
	if (source === null) return;
	const node = source;
	source = null;
	sourcePlaying = false;
	try {
		node.stop();
	} catch {
		// Already stopped.
	}
	disconnectSource(node);
};

const setMuted = (next: boolean): void => {
	if (deps === undefined) return;
	if (next && !muted) {
		deps.setNativeVolume(0);
		muted = true;
	} else if (!next && muted) {
		deps.setNativeVolume(desiredVolume);
		muted = false;
	}
};

const startAt = async (position: number): Promise<void> => {
	if (buffer === null) return;
	const ctx = await ensureContext();
	if (ctx.state !== "running") throw new Error(`audio context is ${ctx.state}`);
	const duration = buffer.duration;
	if (!Number.isFinite(duration) || duration <= 0) return;
	const offset = Math.min(Math.max(0, position), Math.max(0, duration - 0.02));
	stopSource();
	const node = ctx.createBufferSource();
	node.buffer = buffer;
	node.onended = () => {
		if (source === node) sourcePlaying = false;
	};
	await connectSource(node);
	source = node;
	const live = deps?.getNativePosition() ?? null;
	const start = live === null ? offset : Math.max(0, Math.min(live + 0.02, Math.max(0, duration - 0.02)));
	sourceOffset = start;
	sourceStartedAt = ctx.currentTime;
	sourcePlaying = true;
	node.start(0, start);
	debugLog("info", "shadow source started", { offset: Number(offset.toFixed(3)) });
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
	buffer = audio;
	phase = "ready";
	debugLog("info", "shadow track decoded", { seconds: Number(audio.duration.toFixed(2)), channels: audio.numberOfChannels });
};

const fail = (reason: unknown): void => {
	error = String(reason);
	phase = "failed";
	failedLoadAt = loadAt;
	stopSource();
	buffer = null;
	setMuted(false);
	debugLog("error", "shadow player failed", { error });
};

const shouldRun = (settings: SpeedSettings): boolean =>
	settings.nativeEffects && (hasAudibleEffects(settings.effects) || settings.pitchSemitones !== 0);

const runTick = async (): Promise<void> => {
	if (deps === undefined) return;
	const settings = deps.getSettings();
	const active = enabled && getPlayerKind() === "native" && shouldRun(settings);
	if (!active) {
		if (source !== null || buffer !== null || muted) {
			stopSource();
			buffer = null;
			phase = "idle";
			setMuted(false);
		}
		loadAt = null;
		failedLoadAt = null;
		return;
	}

	const now = Date.now();
	if (now - lastPollAt >= POLL_MS) {
		lastPollAt = now;
		const probe = await readProbe();
		if (typeof probe.volume === "number" && probe.volume > 0) desiredVolume = probe.volume;
		const load = probe.load;
		if (load === undefined) return;
		if (loadAt !== load.at) {
			loadAt = load.at;
			failedLoadAt = null;
			error = undefined;
			buffer = null;
			phase = "preparing";
			stopSource();
			const started = await prepareLastLoad();
			preparingId = started?.id ?? null;
			return;
		}
		if (phase === "preparing") {
			if (probe.track !== undefined && probe.track.state === "error") {
				fail(probe.track.error ?? "native stream could not be prepared");
				return;
			}
			if (probe.track !== undefined && probe.track.state === "ready" && probe.track.id === preparingId) {
				try {
					await decodeTrack(probe.track.id, probe.track.bytes);
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

	if (buffer === null) return;
	if (muted) deps.setNativeVolume(0);

	const native = deps.getNativePosition();
	if (native === null) return;
	const playing = deps.isPlaying();
	if (!playing) {
		if (sourcePlaying) stopSource();
		sourceOffset = native;
		setMuted(false);
		return;
	}
	if (native >= buffer.duration - 0.05) {
		if (sourcePlaying) stopSource();
		return;
	}

	setMuted(true);
	if (!sourcePlaying) {
		await startAt(native + 0.05);
		return;
	}
	if (Math.abs(currentPosition() - native) > DRIFT_SECONDS) {
		debugLog("info", "shadow resync", { ours: Number(currentPosition().toFixed(3)), native: Number(native.toFixed(3)) });
		await startAt(native + 0.05);
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

export const getShadowStatus = (): ShadowStatus => ({
	state: phase,
	bufferSeconds: buffer === null ? null : Number(buffer.duration.toFixed(2)),
	playing: sourcePlaying,
	muted,
	loadAt,
	error,
});

export const startShadowPlayer = (unloads: Set<LunaUnload>, next: ShadowDeps): void => {
	deps = next;
	desiredVolume = next.getInitialVolume?.() ?? 1;
	timer = setInterval(tick, TICK_MS);
	tick();
	unloads.add(() => {
		if (timer !== undefined) clearInterval(timer);
		timer = undefined;
		stopSource();
		buffer = null;
		setMuted(false);
		deps = undefined;
	});
};
