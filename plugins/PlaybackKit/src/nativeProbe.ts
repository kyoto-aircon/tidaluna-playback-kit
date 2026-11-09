/**
 * Pure helpers for the native-player stream probe.
 *
 * The renderer never sees the native player's audio, but every `media.load` /
 * `media.preload` command crosses the Electron main process as JSON. These
 * helpers turn that command into a redacted descriptor: the URLs are signed and
 * may carry access tokens, so only the origin, format and query *names* are
 * kept for diagnostics.
 */

export interface NativeStreamDescriptor {
	at: number;
	command: string;
	format: string | null;
	encrypted: boolean;
	origin: string | null;
	extension: string | null;
	pathLength: number;
	queryKeys: string[];
	urlLength: number;
}

export interface HeadDescriptor {
	/** First four bytes as printable ASCII (`fLaC` for a raw FLAC stream). */
	magic: string;
	flac: boolean;
	hex: string;
}

const LOAD_COMMANDS = new Set(["media.load", "media.preload"]);

const describeUrl = (url: string): Pick<NativeStreamDescriptor, "origin" | "extension" | "pathLength" | "queryKeys" | "urlLength"> => {
	const result = { origin: null as string | null, extension: null as string | null, pathLength: 0, queryKeys: [] as string[], urlLength: url.length };
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return result;
		result.origin = parsed.origin;
		result.pathLength = parsed.pathname.length;
		const base = parsed.pathname.slice(parsed.pathname.lastIndexOf("/") + 1);
		const dot = base.lastIndexOf(".");
		if (dot > 0 && dot < base.length - 1) result.extension = base.slice(dot + 1).toLowerCase();
		result.queryKeys = [...parsed.searchParams.keys()].sort();
	} catch {
		// Leave origin null; the caller still gets the length and command.
	}
	return result;
};

/** Returns a descriptor for a `media.load`/`media.preload` command, or null for anything else. */
export const describeNativeCommand = (raw: unknown, at = Date.now()): NativeStreamDescriptor | null => {
	if (typeof raw !== "string") return null;
	let parsed: unknown;
	try {
		parsed = JSON.parse(raw);
	} catch {
		return null;
	}
	if (typeof parsed !== "object" || parsed === null) return null;
	const record = parsed as Record<string, unknown>;
	const command = typeof record.command === "string" ? record.command : null;
	if (command === null || !LOAD_COMMANDS.has(command)) return null;
	const url = typeof record.url === "string" ? record.url : null;
	return {
		at,
		command,
		format: typeof record.streamFormat === "string" ? record.streamFormat : null,
		encrypted: typeof record.encryptionKey === "string" && record.encryptionKey.length > 0,
		...(url === null
			? { origin: null, extension: null, pathLength: 0, queryKeys: [], urlLength: 0 }
			: describeUrl(url)),
	};
};

/** Summarises the first bytes of a fetched stream without keeping the body. */
export const describeHead = (bytes: Uint8Array): HeadDescriptor => {
	const magic = Array.from(bytes.subarray(0, 4))
		.map((byte) => (byte >= 32 && byte < 127 ? String.fromCharCode(byte) : "."))
		.join("");
	const hex = Array.from(bytes.subarray(0, 16))
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join(" ");
	return { magic, flac: magic === "fLaC", hex };
};
