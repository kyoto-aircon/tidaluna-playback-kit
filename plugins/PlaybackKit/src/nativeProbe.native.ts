// Runs in the TIDAL main process through Luna's native module bridge.
// The native player only exists in main, so this is the one place where the
// `media.load` command (and therefore the real stream URL + key) is visible.
//
// Two jobs:
//  1. diagnostics: record the load descriptor and probe the stream URL;
//  2. shadow player: download and decrypt the same lossless stream for the
//     renderer to play through the effects graph.
//
// Signed stream URLs and encryption keys never cross the bridge. Only
// host/format/query names, progress and decrypted chunk bytes are returned.

import { createLosslessDecryptor, hexHead, isFlacHead, unwrapLosslessKey } from "./losslessCrypto";
import { describeHead, describeNativeCommand, type HeadDescriptor, type NativeStreamDescriptor } from "./nativeProbe";

const nodeRequire = require;

type PlayerMessageListener = (event: unknown, message: unknown) => void;
type IpcMainLike = {
	on(channel: string, listener: PlayerMessageListener): void;
	removeListener(channel: string, listener: PlayerMessageListener): void;
};
const electron = (): { ipcMain: IpcMainLike } => nodeRequire("electron") as { ipcMain: IpcMainLike };

const CHANNEL = "player.message";
const MAX_BYTES = 128 * 1024;
const FETCH_TIMEOUT_MS = 15_000;
const DOWNLOAD_TIMEOUT_MS = 180_000;
const MAX_TRACK_BYTES = 200 * 1024 * 1024;
const READ_CHUNK_LIMIT = 2 * 1024 * 1024;

export interface NativeFetchProbe {
	at: number;
	ok: boolean;
	status: number | null;
	contentType: string | null;
	contentRange: string | null;
	acceptRanges: string | null;
	contentLength: string | null;
	bytes: number;
	head: HeadDescriptor | null;
	elapsedMs: number;
	error?: string;
}

export type PreparedState = "downloading" | "ready" | "released" | "error";

export interface PreparedTrack {
	id: number;
	state: PreparedState;
	format: string | null;
	encrypted: boolean;
	bytes: number;
	total: number | null;
	flac: boolean;
	elapsedMs: number;
	error?: string;
}

export interface NativeProbeState {
	started: boolean;
	events: number;
	load?: NativeStreamDescriptor;
	preload?: NativeStreamDescriptor;
	fetch?: NativeFetchProbe;
	track?: PreparedTrack;
	/** Last non-zero media.volume TIDAL sent (0..1). */
	volume?: number;
	error?: string;
}

const state: NativeProbeState = { started: false, events: 0 };

interface RawLoad {
	url: string;
	key: string;
	format: string | null;
}
let rawLoad: RawLoad | undefined;
let prepared: { info: PreparedTrack; data?: Uint8Array; url: string; key: string } | undefined;
let nextTrackId = 1;

const snapshot = (): NativeProbeState => structuredClone({ ...state, track: prepared?.info });

const sanitize = (value: unknown, url: string): string => {
	const text = String(value);
	return url === "" ? text : text.split(url).join("[url]");
};

const parseTotal = (contentRange: string | null, contentLength: string | null): number | null => {
	if (contentRange !== null) {
		const match = /\/(\d+)\s*$/.exec(contentRange);
		if (match !== null) return Number(match[1]);
	}
	if (contentLength !== null) {
		const length = Number(contentLength);
		if (Number.isFinite(length) && length > 0) return length;
	}
	return null;
};

const fetchHead = async (url: string): Promise<void> => {
	const at = Date.now();
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
	try {
		const response = await fetch(url, {
			headers: { Range: `bytes=0-${MAX_BYTES - 1}` },
			signal: controller.signal,
		});
		const headers = {
			contentType: response.headers.get("content-type"),
			contentRange: response.headers.get("content-range"),
			acceptRanges: response.headers.get("accept-ranges"),
			contentLength: response.headers.get("content-length"),
		};
		let bytes = 0;
		const chunks: Uint8Array[] = [];
		const body = response.body;
		if (body !== null) {
			const reader = body.getReader();
			try {
				while (bytes < MAX_BYTES) {
					const { done, value } = await reader.read();
					if (done) break;
					if (value === undefined) continue;
					const take = value.subarray(0, MAX_BYTES - bytes);
					chunks.push(take);
					bytes += take.length;
				}
			} finally {
				try {
					await reader.cancel();
				} catch {
					// The stream may already be closed.
				}
			}
		}
		const head = new Uint8Array(bytes);
		let offset = 0;
		for (const chunk of chunks) {
			head.set(chunk, offset);
			offset += chunk.length;
		}
		state.fetch = {
			at: Date.now(),
			ok: response.ok,
			status: response.status,
			...headers,
			bytes,
			head: bytes === 0 ? null : describeHead(head),
			elapsedMs: Date.now() - at,
		};
	} catch (err) {
		state.fetch = {
			at: Date.now(),
			ok: false,
			status: null,
			contentType: null,
			contentRange: null,
			acceptRanges: null,
			contentLength: null,
			bytes: 0,
			head: null,
			elapsedMs: Date.now() - at,
			error: sanitize(err, url),
		};
	} finally {
		clearTimeout(timer);
	}
};

const downloadAndDecrypt = async (load: RawLoad, info: PreparedTrack): Promise<void> => {
	const started = Date.now();
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT_MS);
	try {
		const key = load.key === "" ? undefined : unwrapLosslessKey(load.key);
		const decryptor = key === undefined ? undefined : createLosslessDecryptor(key.key, key.nonce);
		const response = await fetch(load.url, { headers: { Range: "bytes=0-" }, signal: controller.signal });
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		info.total = parseTotal(response.headers.get("content-range"), response.headers.get("content-length"));
		const chunks: Uint8Array[] = [];
		let bytes = 0;
		const body = response.body;
		if (body === null) throw new Error("empty response body");
		const reader = body.getReader();
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				if (value === undefined) continue;
				const next = decryptor === undefined ? value : decryptor.update(value);
				chunks.push(next);
				bytes += next.length;
				info.bytes = bytes;
				if (bytes > MAX_TRACK_BYTES) throw new Error(`track exceeds ${MAX_TRACK_BYTES} bytes`);
			}
		} finally {
			try {
				await reader.cancel();
			} catch {
				// Already closed.
			}
		}
		const data = new Uint8Array(bytes);
		let offset = 0;
		for (const chunk of chunks) {
			data.set(chunk, offset);
			offset += chunk.length;
		}
		info.flac = isFlacHead(data);
		if (!info.flac) throw new Error(`decrypted stream is not FLAC (head ${hexHead(data)})`);
		info.bytes = data.length;
		info.total = info.total ?? data.length;
		info.state = "ready";
		info.elapsedMs = Date.now() - started;
		if (prepared === undefined || prepared.info.id !== info.id) return;
		prepared.data = data;
	} catch (err) {
		info.state = "error";
		info.error = sanitize(err, load.url);
		info.elapsedMs = Date.now() - started;
	} finally {
		clearTimeout(timer);
	}
};

const onPlayerMessage: PlayerMessageListener = (_event, message) => {
	if (typeof message !== "string") return;
	let parsed: { command?: unknown; url?: unknown; encryptionKey?: unknown; streamFormat?: unknown; volume?: unknown };
	try {
		parsed = JSON.parse(message) as typeof parsed;
	} catch {
		return;
	}
	if (parsed.command === "media.volume") {
		if (typeof parsed.volume === "number" && parsed.volume > 0) state.volume = Math.min(1, parsed.volume / 100);
		return;
	}
	const descriptor = describeNativeCommand(message);
	if (descriptor === null) return;
	state.events += 1;
	if (descriptor.command === "media.load") state.load = descriptor;
	else state.preload = descriptor;
	if (descriptor.command !== "media.load") return;
	const url = typeof parsed.url === "string" ? parsed.url : "";
	const key = typeof parsed.encryptionKey === "string" ? parsed.encryptionKey : "";
	const format = typeof parsed.streamFormat === "string" ? parsed.streamFormat : null;
	if (!/^https?:\/\//i.test(url)) return;
	rawLoad = { url, key, format };
	void fetchHead(url);
};

export const startProbe = async (): Promise<NativeProbeState> => {
	if (state.started) return snapshot();
	try {
		const host = ((globalThis as Record<string, unknown>).luna ?? {}) as Record<string, unknown>;
		const previous = host.__playbackKitNativeProbe as PlayerMessageListener | undefined;
		const api = electron().ipcMain;
		if (previous !== undefined) api.removeListener(CHANNEL, previous);
		api.on(CHANNEL, onPlayerMessage);
		host.__playbackKitNativeProbe = onPlayerMessage;
		state.started = true;
		delete state.error;
	} catch (err) {
		state.error = String(err);
	}
	return snapshot();
};

export const stopProbe = async (): Promise<NativeProbeState> => {
	const host = ((globalThis as Record<string, unknown>).luna ?? {}) as Record<string, unknown>;
	const listener = host.__playbackKitNativeProbe as PlayerMessageListener | undefined;
	if (state.started || listener !== undefined) {
		try {
			const api = electron().ipcMain;
			if (listener !== undefined) api.removeListener(CHANNEL, listener);
			else api.removeListener(CHANNEL, onPlayerMessage);
		} catch (err) {
			state.error = String(err);
		}
		delete host.__playbackKitNativeProbe;
		state.started = false;
	}
	rawLoad = undefined;
	prepared = undefined;
	return snapshot();
};

/** Current probe/track state; safe to call at any time (no Electron access). */
export const readProbe = async (): Promise<NativeProbeState> => snapshot();

/** True when a media.load has already been seen. */
export const canPrepare = async (): Promise<boolean> => rawLoad !== undefined;

/** Starts downloading/decrypting the last media.load; returns immediately. */
export const prepareLastLoad = async (): Promise<PreparedTrack | undefined> => {
	if (rawLoad === undefined) return undefined;
	if (prepared !== undefined && prepared.url === rawLoad.url && prepared.key === rawLoad.key && prepared.info.state !== "released" && prepared.info.state !== "error") {
		return prepared.info;
	}
	if (prepared !== undefined) prepared.data = undefined;
	const info: PreparedTrack = {
		id: nextTrackId++,
		state: "downloading",
		format: rawLoad.format,
		encrypted: rawLoad.key !== "",
		bytes: 0,
		total: parseTotal(state.fetch?.contentRange ?? null, state.fetch?.contentLength ?? null),
		flac: false,
		elapsedMs: 0,
	};
	prepared = { info, url: rawLoad.url, key: rawLoad.key };
	void downloadAndDecrypt(rawLoad, info);
	return info;
};

/** Reads a decrypted chunk. Chunks are capped to keep each IPC message small. */
export const readTrack = async (id: number, offset: number, length: number): Promise<Uint8Array> => {
	if (prepared === undefined || prepared.info.id !== id) throw new Error("unknown track");
	if (prepared.data === undefined) throw new Error(`track is ${prepared.info.state}`);
	const start = Math.max(0, Math.floor(offset));
	const size = Math.max(0, Math.min(Math.floor(length), READ_CHUNK_LIMIT));
	const end = Math.min(prepared.data.length, start + size);
	return prepared.data.slice(start, end);
};

/** Frees the decrypted bytes after the renderer has copied them. */
export const releaseTrack = async (id: number): Promise<void> => {
	if (prepared === undefined || prepared.info.id !== id) return;
	prepared.data = undefined;
	if (prepared.info.state === "ready") prepared.info.state = "released";
};
