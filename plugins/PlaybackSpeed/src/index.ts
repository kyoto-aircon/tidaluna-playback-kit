import type { LunaUnload } from "@luna/core";
import { findModuleByProperty, Tracer } from "@luna/core";

import { setupSpeedControl } from "./control";
import {
	buildReport,
	clearLogs,
	copyReport,
	debugLog,
	getLogs,
	getLogsText,
	PLUGIN_VERSION,
	registerTidalProbe,
	setVerbose,
	snapshotSelectors,
} from "./debug";
import { getMediaElements, SpeedController } from "./mediaController";
import { speedStore } from "./state";

export { Settings } from "./Settings";

export const unloads = new Set<LunaUnload>();

const { trace } = Tracer("[PlaybackSpeed]");
const SCAN_INTERVAL_MS = 1000;

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
						.slice(0, 40);
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
			hasTrickPlay: methods.includes("trickPlay"),
			hasMediaElement: Boolean(read("mediaElement") ?? read("video") ?? read("element")),
		};
	} catch (err) {
		return { found: true, error: String(err) };
	}
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
	debugLog("info", "loading", {
		version: PLUGIN_VERSION,
		selectors: snapshotSelectors(),
		media: getMediaElements().length,
		settings: speedStore.get(),
		tidal: probeActivePlayer(),
	});

	const controller = new SpeedController(getMediaElements, speedStore);
	controller.start();

	const unsubscribe = speedStore.subscribe((settings) => {
		debugLog("info", "settings changed", { speed: settings.speed, pitchShifts: settings.pitchShifts, bounds: settings.bounds });
		controller.apply();
	});
	setupSpeedControl(unloads, speedStore);
	installDebugApi(controller);

	// TIDAL swaps media elements between tracks and re-renders the footer.
	const scanTimer = setInterval(() => controller.scan(), SCAN_INTERVAL_MS);

	unloads.add(() => {
		clearInterval(scanTimer);
		unsubscribe();
		controller.stop();
	});

	trace.log("loaded");
} catch (err) {
	debugLog("error", "failed to load", { error: String(err), stack: (err as Error)?.stack });
	trace.err("Failed to load:", err);
}
