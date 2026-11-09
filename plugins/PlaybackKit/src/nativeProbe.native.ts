// Runs in the TIDAL main process through Luna's native module bridge.
//
// The renderer captures `media.load` / `next` from TIDAL's native player and
// passes the signed URL + key here, because the CDN is not CORS-friendly for
// the page origin. This module only uses `fetch` and the whitelisted `crypto`
// module: no electron/fs grant is required.
//
// The URL/key stay in main; the renderer receives decrypted FLAC chunks only.

import { createLosslessDecryptor, hexHead, isFlacHead, unwrapLosslessKey } from "./losslessCrypto";

const DOWNLOAD_TIMEOUT_MS = 180_000;
const MAX_TRACK_BYTES = 200 * 1024 * 1024;
const READ_CHUNK_LIMIT = 2 * 1024 * 1024;

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

export interface NativeBridgeState {
	load?: PreparedTrack;
	preload?: PreparedTrack;
}

interface Slot {
	info: PreparedTrack;
	data?: Uint8Array;
	url: string;
	key: string;
}

let nextTrackId = 1;
let loadSlot: Slot | undefined;
let preloadSlot: Slot | undefined;

const snapshot = (slot: Slot | undefined): PreparedTrack | undefined => (slot === undefined ? undefined : { ...slot.info });

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

const findSlot = (id: number): Slot | undefined => {
	if (loadSlot?.info.id === id) return loadSlot;
	if (preloadSlot?.info.id === id) return preloadSlot;
	return undefined;
};

const download = async (slot: Slot): Promise<void> => {
	const started = Date.now();
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT_MS);
	try {
		const key = slot.key === "" ? undefined : unwrapLosslessKey(slot.key);
		const decryptor = key === undefined ? undefined : createLosslessDecryptor(key.key, key.nonce);
		const response = await fetch(slot.url, { headers: { Range: "bytes=0-" }, signal: controller.signal });
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		slot.info.total = parseTotal(response.headers.get("content-range"), response.headers.get("content-length"));
		const body = response.body;
		if (body === null) throw new Error("empty response body");
		const reader = body.getReader();
		const chunks: Uint8Array[] = [];
		let bytes = 0;
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				if (value === undefined) continue;
				const next = decryptor === undefined ? value : decryptor.update(value);
				chunks.push(next);
				bytes += next.length;
				slot.info.bytes = bytes;
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
		if (!isFlacHead(data)) throw new Error(`decrypted stream is not FLAC (head ${hexHead(data)})`);
		if (findSlot(slot.info.id) !== slot) return;
		slot.info.flac = true;
		slot.info.bytes = data.length;
		slot.info.total = slot.info.total ?? data.length;
		slot.info.state = "ready";
		slot.info.elapsedMs = Date.now() - started;
		slot.data = data;
	} catch (err) {
		if (findSlot(slot.info.id) !== slot) return;
		slot.info.state = "error";
		slot.info.error = sanitize(err, slot.url);
		slot.info.elapsedMs = Date.now() - started;
	} finally {
		clearTimeout(timer);
	}
};

const begin = (url: string, format: string | null, key: string): Slot => {
	const slot: Slot = {
		info: {
			id: nextTrackId++,
			state: "downloading",
			format,
			encrypted: key !== "",
			bytes: 0,
			total: null,
			flac: false,
			elapsedMs: 0,
		},
		url,
		key,
	};
	void download(slot);
	return slot;
};

const normalize = (url: unknown, format: unknown, key: unknown): { url: string; format: string | null; key: string } | undefined => {
	if (typeof url !== "string" || !/^https?:\/\//i.test(url)) return undefined;
	return {
		url,
		format: typeof format === "string" ? format : null,
		key: typeof key === "string" ? key : "",
	};
};

/** Prepares the current track. Promotes a matching preload instead of re-downloading. */
export const prepareStream = async (rawUrl: unknown, rawFormat: unknown, rawKey: unknown): Promise<PreparedTrack | undefined> => {
	const next = normalize(rawUrl, rawFormat, rawKey);
	if (next === undefined) return undefined;
	if (preloadSlot !== undefined && preloadSlot.url === next.url && preloadSlot.key === next.key && preloadSlot.info.state !== "error") {
		if (loadSlot !== undefined && loadSlot !== preloadSlot) loadSlot.data = undefined;
		loadSlot = preloadSlot;
		preloadSlot = undefined;
		return snapshot(loadSlot);
	}
	if (loadSlot !== undefined && loadSlot.url === next.url && loadSlot.key === next.key && loadSlot.info.state !== "released" && loadSlot.info.state !== "error") {
		return snapshot(loadSlot);
	}
	if (loadSlot !== undefined) loadSlot.data = undefined;
	loadSlot = begin(next.url, next.format, next.key);
	return snapshot(loadSlot);
};

/** Starts preparing the next track while the current one plays. */
export const preparePreload = async (rawUrl: unknown, rawFormat: unknown, rawKey: unknown): Promise<PreparedTrack | undefined> => {
	const next = normalize(rawUrl, rawFormat, rawKey);
	if (next === undefined) return undefined;
	if (loadSlot !== undefined && loadSlot.url === next.url && loadSlot.key === next.key) return snapshot(loadSlot);
	if (preloadSlot !== undefined && preloadSlot.url === next.url && preloadSlot.key === next.key && preloadSlot.info.state !== "released" && preloadSlot.info.state !== "error") {
		return snapshot(preloadSlot);
	}
	if (preloadSlot !== undefined) preloadSlot.data = undefined;
	preloadSlot = begin(next.url, next.format, next.key);
	return snapshot(preloadSlot);
};

/** Reads a decrypted chunk. Chunks are capped to keep each IPC message small. */
export const readTrack = async (id: number, offset: number, length: number): Promise<Uint8Array> => {
	const slot = findSlot(id);
	if (slot === undefined) throw new Error("unknown track");
	if (slot.data === undefined) throw new Error(`track is ${slot.info.state}`);
	const start = Math.max(0, Math.floor(offset));
	const size = Math.max(0, Math.min(Math.floor(length), READ_CHUNK_LIMIT));
	const end = Math.min(slot.data.length, start + size);
	return slot.data.slice(start, end);
};

/** Frees decrypted bytes after the renderer has copied them. */
export const releaseTrack = async (id: number): Promise<void> => {
	const slot = findSlot(id);
	if (slot === undefined) return;
	slot.data = undefined;
	if (slot.info.state === "ready") slot.info.state = "released";
};

export const readBridge = async (): Promise<NativeBridgeState> => ({
	load: snapshot(loadSlot),
	preload: snapshot(preloadSlot),
});
