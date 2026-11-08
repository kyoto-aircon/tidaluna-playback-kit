import type { LunaUnload } from "@luna/core";
import { findModuleByProperty, Tracer } from "@luna/core";
import { redux } from "@luna/lib";

import { setupSpeedControl } from "./control";
import {
	buildReport,
	clearLogs,
	copyReport,
	debugLog,
	getLogs,
	getLogsText,
	PLUGIN_VERSION,
	registerReportExtras,
	registerTidalProbe,
	setVerbose,
	snapshotSelectors,
} from "./debug";
import { getMediaElements, SpeedController } from "./mediaController";
import { applyNativeRate, captureNativeComponent, hasNativeInstance, probeNativeComponent } from "./nativePlayer";
import { getPlayerKind, setPlayerKind, subscribePlayerKind, type PlayerKind } from "./playerKind";
import { speedStore } from "./state";

export { Settings } from "./Settings";

export const unloads = new Set<LunaUnload>();

const { trace } = Tracer("[PlaybackSpeed]");
const SCAN_INTERVAL_MS = 1000;
const PLAYER_POLL_MS = 1500;
const QUALITY_KEY = "tidaluna.playback-speed.previous-quality";

const readPreviousQuality = (): string | null => {
	try {
		return localStorage.getItem(QUALITY_KEY);
	} catch {
		return null;
	}
};

const rememberQuality = (quality: string): void => {
	try {
		localStorage.setItem(QUALITY_KEY, quality);
	} catch {
		// Diagnostics still work without storage.
	}
};

const forgetQuality = (): void => {
	try {
		localStorage.removeItem(QUALITY_KEY);
	} catch {
		// ignore
	}
};

const setStreamingQuality = (quality: string): void => {
	const setQuality = (redux.actions as unknown as Record<string, (payload: unknown) => unknown>)["settings/SET_STREAMING_QUALITY"];
	if (typeof setQuality === "function") setQuality(quality);
	else (redux.store.dispatch as (action: unknown) => unknown)({ type: "settings/SET_STREAMING_QUALITY", payload: quality });
};

const probeActivePlayer = (): unknown => {
	const module = findModuleByProperty<{ activePlayer?: Record<string, unknown> }>(
		(key, value) => key === "activePlayer" && typeof value === "object" && value !== null,
	);
	const player = module?.activePlayer as Record<string, unknown> | undefined;
	if (player === undefined) return { found: false };
	try {
		const prototype = Object.getPrototypeOf(player) as object | null;
		const methods =
			prototype === null
				? []
				: Object.getOwnPropertyNames(prototype)
						.filter((key) => {
							try {
								return typeof (player as Record<string, unknown>)[key] === "function";
							} catch {
								return false;
							}
						})
						.slice(0, 60);
		const read = (key: string): unknown => {
			try {
				return player[key];
			} catch {
				return undefined;
			}
		};
		return {
			found: true,
			name: read("name"),
			constructor: (player as { constructor?: { name?: string } }).constructor?.name,
			state: read("playbackState") ?? read("state"),
			currentTime: read("currentTime"),
			methods,
			hasSetPlaybackRate: methods.includes("setPlaybackRate"),
			hasMediaElement: Boolean(read("mediaElement") ?? read("video") ?? read("element")),
		};
	} catch (err) {
		return { found: true, error: String(err) };
	}
};

const detectPlayerKind = (): PlayerKind => {
	const module = findModuleByProperty<{ activePlayer?: { name?: string } }>(
		(key, value) => key === "activePlayer" && typeof value === "object" && value !== null,
	);
	const name = module?.activePlayer?.name;
	if (name === "nativePlayer") return "native";
	if (name === "shakaPlayer") return "shaka";
	if (name === "browserPlayer") return "browser";
	return "unknown";
};

const useBrowserPlayer = (): void => {
	try {
		const state = redux.store.getState() as { settings?: { quality?: { streaming?: string } } };
		const before = state.settings?.quality?.streaming;
		if (before === "HIGH") {
			debugLog("info", "already on the browser player quality");
			return;
		}
		debugLog("info", "switching streaming quality to HIGH", { from: before });
		if (typeof before === "string") rememberQuality(before);
		setStreamingQuality("HIGH");
	} catch (err) {
		debugLog("error", "quality switch failed", { error: String(err) });
	}
};

const restoreQuality = (): void => {
	const previous = readPreviousQuality();
	if (previous === null) return;
	debugLog("info", "restoring streaming quality", { to: previous });
	setStreamingQuality(previous);
	forgetQuality();
};

const installDebugApi = (controller: SpeedController): void => {
	const api = {
		version: PLUGIN_VERSION,
		logs: getLogs,
		logText: getLogsText,
		report: () => buildReport(speedStore.get()),
		copy: () => copyReport(speedStore.get()),
		clear: clearLogs,
		setVerbose,
		selectors: snapshotSelectors,
		playerKind: getPlayerKind,
		native: probeNativeComponent,
		store: speedStore,
		controller,
	};
	(globalThis as Record<string, unknown>).__playbackSpeed = api;
	unloads.add(() => {
		if ((globalThis as Record<string, unknown>).__playbackSpeed === api) delete (globalThis as Record<string, unknown>).__playbackSpeed;
	});
};

try {
	registerTidalProbe(probeActivePlayer);
	registerReportExtras(() => ({
		kind: getPlayerKind(),
		native: probeNativeComponent(),
		nativeInstance: hasNativeInstance(),
	}));

	captureNativeComponent();
	debugLog("info", "loading", {
		version: PLUGIN_VERSION,
		selectors: snapshotSelectors(),
		media: getMediaElements().length,
		settings: speedStore.get(),
		tidal: probeActivePlayer(),
		native: probeNativeComponent(),
	});

	const controller = new SpeedController(getMediaElements, speedStore);
	controller.start();

	const unsubscribe = speedStore.subscribe((settings) => {
		debugLog("info", "settings changed", { speed: settings.speed, pitchShifts: settings.pitchShifts, bounds: settings.bounds });
		controller.apply();
		if (getPlayerKind() === "native") applyNativeRate(settings.speed);
	});
	setupSpeedControl(unloads, speedStore, {
		getPlayerKind,
		subscribePlayerKind,
		useBrowserPlayer,
		previousQuality: readPreviousQuality,
		restoreQuality,
	});
	installDebugApi(controller);

	// TIDAL swaps media elements between tracks and re-renders the footer.
	const scanTimer = setInterval(() => controller.scan(), SCAN_INTERVAL_MS);
	setPlayerKind(detectPlayerKind());
	const playerTimer = setInterval(() => {
		captureNativeComponent();
		const next = detectPlayerKind();
		const previous = getPlayerKind();
		setPlayerKind(next);
		if (next !== previous && next === "native") {
			applyNativeRate(speedStore.get().speed);
			forgetQuality();
		}
	}, PLAYER_POLL_MS);

	unloads.add(() => {
		clearInterval(scanTimer);
		clearInterval(playerTimer);
		unsubscribe();
		controller.stop();
	});

	trace.log("loaded");
} catch (err) {
	debugLog("error", "failed to load", { error: String(err), stack: (err as Error)?.stack });
	trace.err("Failed to load:", err);
}

