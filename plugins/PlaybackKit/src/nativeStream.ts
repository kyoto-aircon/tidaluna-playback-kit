import { describeNativeCommand, type NativeStreamDescriptor } from "./nativeProbe";

export interface NativeStreamCapture {
	url: string;
	format: string | null;
	key: string;
	at: number;
}

/**
 * TIDAL's native player receives a transition object with a `streamInfo` field.
 * `NativePlayer.load` then forwards `streamUrl`, `streamFormat` and
 * `securityToken` to the preload player. Wrapping the renderer-side method gives
 * us the same data without main-process IPC (and without an electron grant).
 */
export const extractStreamInfo = (transition: unknown, at = Date.now()): NativeStreamCapture | null => {
	if (typeof transition !== "object" || transition === null) return null;
	const streamInfo = (transition as Record<string, unknown>).streamInfo;
	if (typeof streamInfo !== "object" || streamInfo === null) return null;
	const record = streamInfo as Record<string, unknown>;
	const url = typeof record.streamUrl === "string" ? record.streamUrl : null;
	if (url === null || !/^https?:\/\//i.test(url)) return null;
	return {
		url,
		format: typeof record.streamFormat === "string" ? record.streamFormat : null,
		key: typeof record.securityToken === "string" ? record.securityToken : "",
		at,
	};
};

export const describeStreamInfo = (info: NativeStreamCapture): NativeStreamDescriptor | undefined =>
	describeNativeCommand(
		JSON.stringify({ command: "media.load", url: info.url, streamFormat: info.format, encryptionKey: info.key }),
		info.at,
	) ?? undefined;
