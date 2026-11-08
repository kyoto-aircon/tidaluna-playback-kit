export const PLUGIN_VERSION = "1.3.0";

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
	at: number;
	level: LogLevel;
	message: string;
	data?: unknown;
}

const MAX_ENTRIES = 500;
const entries: LogEntry[] = [];
let verbose = true;

const safeData = (data: unknown): unknown => {
	if (data === undefined) return undefined;
	try {
		return JSON.parse(JSON.stringify(data));
	} catch {
		try {
			return String(data);
		} catch {
			return "[unserialisable]";
		}
	}
};

export const debugLog = (level: LogLevel, message: string, data?: unknown): void => {
	const entry: LogEntry = { at: Date.now(), level, message, data: safeData(data) };
	entries.push(entry);
	if (entries.length > MAX_ENTRIES) entries.shift();
	if (level === "debug" && !verbose) return;
	try {
		const method = level === "error" ? console.error : level === "warn" ? console.warn : console.debug;
		if (data === undefined) method(`[PlaybackSpeed] ${message}`);
		else method(`[PlaybackSpeed] ${message}`, data);
	} catch {
		// Console can be unavailable; the ring buffer still has it.
	}
};

export const getLogs = (): LogEntry[] => entries.map((entry) => ({ ...entry }));

export const getLogsText = (): string =>
	entries
		.map((entry) => `${new Date(entry.at).toISOString()} ${entry.level.toUpperCase().padEnd(5)} ${entry.message}${entry.data === undefined ? "" : ` ${JSON.stringify(entry.data)}`}`)
		.join("\n");

export const clearLogs = (): void => {
	entries.length = 0;
};

export const setVerbose = (value: boolean): void => {
	verbose = value;
};

export const isVerbose = (): boolean => verbose;

const describeMedia = (element: HTMLMediaElement) => ({
	tag: element.tagName.toLowerCase(),
	id: element.id,
	class: typeof element.className === "string" ? element.className : "",
	src: (element.currentSrc || element.src || "").slice(0, 140),
	paused: element.paused,
	readyState: element.readyState,
	networkState: element.networkState,
	currentTime: Number(element.currentTime.toFixed(3)),
	duration: Number.isFinite(element.duration) ? Number(element.duration.toFixed(3)) : element.duration,
	playbackRate: element.playbackRate,
	defaultPlaybackRate: element.defaultPlaybackRate,
	preservesPitch: element.preservesPitch,
	muted: element.muted,
	volume: element.volume,
	connected: element.isConnected,
	parent: element.parentElement === null ? null : element.parentElement.id || element.parentElement.className,
});

/** Every media element in the document, including ones owned by other plugins. */
export const snapshotMedia = (): unknown[] => {
	if (typeof document === "undefined") return [];
	return [...document.querySelectorAll<HTMLMediaElement>("video,audio")].map(describeMedia);
};

export const snapshotSelectors = () => {
	if (typeof document === "undefined") return {};
	const root = document.getElementById("tidal-player-root");
	return {
		playerRoot: root !== null,
		rootChildCount: root?.children.length ?? 0,
		rootChildren: root === null ? [] : [...root.children].map((child) => `${child.tagName.toLowerCase()}#${child.id || "-"}`),
		scopedMedia: document.querySelectorAll("#tidal-player-root video, #tidal-player-root audio").length,
		videoOne: document.getElementById("video-one") !== null,
		videoTwo: document.getElementById("video-two") !== null,
		allMedia: document.querySelectorAll("video,audio").length,
		footer: document.querySelector('[data-test="footer-player"]') !== null,
	};
};

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Plays for a moment and reports how far each element's currentTime moved.
 * If observedRate stays at 0 while audio plays, TIDAL is not using these elements.
 */
export const probeProgression = async (durationMs: number = 1500) => {
	if (typeof document === "undefined") return [];
	const elements = [...document.querySelectorAll<HTMLMediaElement>("video,audio")];
	const before = elements.map((element) => ({ id: element.id, tag: element.tagName.toLowerCase(), time: element.currentTime, paused: element.paused }));
	await delay(durationMs);
	return elements.map((element, index) => {
		const start = before[index];
		const delta = element.currentTime - start.time;
		const wall = durationMs / 1000;
		return {
			id: start.id,
			tag: start.tag,
			paused: element.paused,
			deltaSeconds: Number(delta.toFixed(3)),
			observedRate: Number((delta / wall).toFixed(3)),
			expectedRate: element.playbackRate,
		};
	});
};

let tidalProbe: (() => unknown) | undefined;

/** Set by index.ts, which has access to @luna/core. */
export const registerTidalProbe = (probe: () => unknown): void => {
	tidalProbe = probe;
};

let reportExtras: (() => Record<string, unknown>) | undefined;

/** Set by index.ts to add player kind / native component details to reports. */
export const registerReportExtras = (extras: () => Record<string, unknown>): void => {
	reportExtras = extras;
};

export const getReportExtras = (): Record<string, unknown> => {
	try {
		return reportExtras?.() ?? {};
	} catch (err) {
		return { error: String(err) };
	}
};

export const probeTidal = (): unknown => {
	try {
		return tidalProbe?.() ?? { registered: false };
	} catch (err) {
		return { error: String(err) };
	}
};

export const buildReport = async (settings: unknown): Promise<string> => {
	debugLog("info", "building diagnostics report");
	const progression = await probeProgression();
	const header = [
		`Playback Speed v${PLUGIN_VERSION}`,
		`at: ${new Date().toISOString()}`,
		`url: ${typeof location === "undefined" ? "?" : location.href}`,
		`ua: ${typeof navigator === "undefined" ? "?" : navigator.userAgent}`,
		`visibility: ${typeof document === "undefined" ? "?" : document.visibilityState}`,
		`settings: ${JSON.stringify(safeData(settings))}`,
		`selectors: ${JSON.stringify(snapshotSelectors())}`,
		`player: ${JSON.stringify(getReportExtras())}`,
		`tidal: ${JSON.stringify(probeTidal())}`,
		`progression: ${JSON.stringify(progression)}`,
		`media: ${JSON.stringify(snapshotMedia())}`,
		"",
		`--- logs (${entries.length}) ---`,
		getLogsText(),
	];
	return header.join("\n");
};

export const copyReport = async (settings: unknown): Promise<boolean> => copyText(await buildReport(settings));

export const copyText = async (text: string): Promise<boolean> => {
	try {
		if (typeof navigator !== "undefined" && navigator.clipboard?.writeText !== undefined) {
			await navigator.clipboard.writeText(text);
			return true;
		}
	} catch {
		// Fall through to execCommand.
	}
	try {
		const area = document.createElement("textarea");
		area.value = text;
		area.style.position = "fixed";
		area.style.opacity = "0";
		document.body.appendChild(area);
		area.select();
		const copied = document.execCommand("copy");
		area.remove();
		return copied;
	} catch {
		return false;
	}
};
