// Runs in the TIDAL main process through Luna's native module bridge.
// The native player only exists in main, so this is the one place where the
// `media.load` command (and therefore the real stream URL) is visible.
//
// The URLs TIDAL hands to TIDALPlayer.exe are signed; never return them (or the
// response body) through the bridge. Only host/format/query names and the first
// bytes of a 128 KiB range request are reported.

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

export interface NativeProbeState {
	started: boolean;
	events: number;
	load?: NativeStreamDescriptor;
	preload?: NativeStreamDescriptor;
	fetch?: NativeFetchProbe;
	error?: string;
}

const state: NativeProbeState = { started: false, events: 0 };
let fetchedUrl: string | null = null;

const snapshot = (): NativeProbeState => structuredClone(state);

const fetchHead = async (url: string): Promise<void> => {
	if (fetchedUrl === url) return;
	fetchedUrl = url;
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
			error: String(err).split(url).join("[url]"),
		};
	} finally {
		clearTimeout(timer);
	}
};

const onPlayerMessage: PlayerMessageListener = (_event, message) => {
	const descriptor = describeNativeCommand(message);
	if (descriptor === null) return;
	state.events += 1;
	if (descriptor.command === "media.load") state.load = descriptor;
	else state.preload = descriptor;
	if (descriptor.command !== "media.load" || typeof message !== "string") return;
	try {
		const raw = (JSON.parse(message) as { url?: unknown }).url;
		if (typeof raw === "string" && /^https?:\/\//i.test(raw)) void fetchHead(raw);
	} catch {
		// A malformed command is already reflected in the descriptor.
	}
};

/** Starts listening for native player commands. Prompts for Electron access once. */
export const startProbe = async (): Promise<NativeProbeState> => {
	if (state.started) return snapshot();
	try {
		electron().ipcMain.on(CHANNEL, onPlayerMessage);
		state.started = true;
		delete state.error;
	} catch (err) {
		state.error = String(err);
	}
	return snapshot();
};

/** Detaches the listener (plugin unload / developer mode off). */
export const stopProbe = async (): Promise<NativeProbeState> => {
	if (state.started) {
		try {
			electron().ipcMain.removeListener(CHANNEL, onPlayerMessage);
		} catch (err) {
			state.error = String(err);
		}
		state.started = false;
	}
	return snapshot();
};

/** Current probe state; safe to call at any time (no Electron access). */
export const readProbe = async (): Promise<NativeProbeState> => snapshot();
