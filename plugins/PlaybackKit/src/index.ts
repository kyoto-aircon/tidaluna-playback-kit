import type { LunaUnload } from "@luna/core";
import { findModuleByProperty, LunaPlugin, Tracer } from "@luna/core";
import { redux } from "@luna/lib";

import { parseConfig, serializeConfig } from "./config";
import { getConfigPath, readConfig, writeConfig } from "./config.native";
import { exposeAudioEngine, getStatus as getAudioEngineStatus, hideAudioEngine } from "./audioEngine";
import { setupSpeedControl } from "./control";
import { hasAudibleEffects } from "./effectsSettings";
import { getEffectsEngineState, updateEffects } from "./effectsEngine";
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
	setDiagnosticsEnabled,
	setVerbose,
	snapshotSelectors,
} from "./debug";
import { getMediaElements, SpeedController } from "./mediaController";
import { applyNativeRate, captureNativeComponent, hasNativeInstance, probeNativeComponent } from "./nativePlayer";
import { getPitchEngineState, resetPitchEngine, setPitchSemitones } from "./pitchEngine";
import { getPlayerKind, setPlayerKind, subscribePlayerKind, type PlayerKind } from "./playerKind";
import { enforcePresetVisibility, saveActivePreset } from "./presetActions";
import { presetStore, type PlaybackPreset, type PresetValues } from "./presets";
import { speedStore } from "./state";
import { startTimeSync, syncOnce } from "./timeSync";

export { Settings } from "./Settings";

export const unloads = new Set<LunaUnload>();

const { trace } = Tracer("[PlaybackKit]");
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

interface ActivePlayerLike {
	name?: string;
	currentTime?: number;
	playbackState?: string;
}

let activePlayerHolder: { activePlayer?: ActivePlayerLike } | undefined;

const getActivePlayer = (): ActivePlayerLike | undefined => {
	activePlayerHolder ??= findModuleByProperty<{ activePlayer?: ActivePlayerLike }>(
		(key, value) => key === "activePlayer" && typeof value === "object" && value !== null,
	) as { activePlayer?: ActivePlayerLike } | undefined;
	return activePlayerHolder?.activePlayer;
};

/** Media position of whatever is actually playing (native player or media element). */
const getActualPosition = (): number | null => {
	if (getPlayerKind() === "native") {
		const time = getActivePlayer()?.currentTime;
		return typeof time === "number" && Number.isFinite(time) ? time : null;
	}
	const elements = getMediaElements();
	const element = elements.find((candidate) => !candidate.paused && candidate.readyState > 0) ?? elements.find((candidate) => candidate.readyState > 0);
	return element === undefined ? null : element.currentTime;
};

const isPlaying = (): boolean => {
	try {
		const controls = (redux.store.getState() as { playbackControls?: { playbackState?: string } }).playbackControls;
		return controls?.playbackState === "PLAYING";
	} catch {
		return false;
	}
};

const dispatchTimeUpdate = (time: number): void => {
	const action = (redux.actions as unknown as Record<string, (payload: number) => unknown>)["playbackControls/TIME_UPDATE"];
	if (typeof action === "function") action(time);
	else (redux.store.dispatch as (value: unknown) => unknown)({ type: "playbackControls/TIME_UPDATE", payload: time });
};

/** What the scrubber currently shows: TIDAL adds wall-clock seconds to the last sync. */
const readUiPosition = (): number | null => {
	try {
		const controls = (
			redux.store.getState() as {
				playbackControls?: { latestCurrentTime?: number; latestCurrentTimeSyncTimestamp?: number; playbackState?: string };
			}
		).playbackControls;
		if (controls === undefined) return null;
		const base = controls.latestCurrentTime ?? 0;
		if (controls.playbackState !== "PLAYING") return base;
		return base + Math.abs(Date.now() - (controls.latestCurrentTimeSyncTimestamp ?? Date.now())) / 1000;
	} catch {
		return null;
	}
};

const timeSyncDeps = { getSpeed: () => speedStore.get().speed, isPlaying, getPosition: getActualPosition, dispatchTimeUpdate };

const probeCurrentTrack = () => {
	try {
		const state = redux.store.getState() as {
			playQueue?: { elements?: Array<{ mediaItemId?: string | number }>; currentIndex?: number };
			content?: { mediaItems?: Record<string, Record<string, unknown>> };
		};
		const queue = state.playQueue;
		const id = queue?.elements?.[queue.currentIndex ?? -1]?.mediaItemId;
		if (id === undefined) return null;
		const item = state.content?.mediaItems?.[String(id)];
		if (item === undefined) return { id, found: false };
		return {
			id,
			found: true,
			title: item.title,
			bpm: item.bpm ?? null,
			key: item.key ?? item.keyScale ?? null,
			metadataKeys: Object.keys(item).filter((key) => /bpm|key|tempo|tone/i.test(key)),
		};
	} catch (err) {
		return { error: String(err) };
	}
};

let configReady = false;
let configSaveTimer: ReturnType<typeof setTimeout> | undefined;
const configSnapshot = (): string => serializeConfig(speedStore.get(), presetStore.get());

const scheduleConfigSave = (): void => {
	if (!configReady) return;
	if (configSaveTimer !== undefined) clearTimeout(configSaveTimer);
	configSaveTimer = setTimeout(() => {
		configSaveTimer = undefined;
		writeConfig(configSnapshot()).catch((err) => debugLog("error", "config save failed", { error: String(err) }));
	}, 300);
};

const hydrateConfig = async (): Promise<void> => {
	try {
		const raw = await readConfig();
		const parsed = raw === null ? undefined : parseConfig(raw);
		const path = await getConfigPath();
		if (parsed !== undefined) {
			speedStore.replace(parsed.settings);
			presetStore.replace(parsed.presets);
			enforcePresetVisibility(speedStore, presetStore);
			debugLog("info", "config loaded", { path, speed: parsed.settings.speed, presets: parsed.presets.length });
		} else {
			await writeConfig(configSnapshot());
			debugLog("info", raw === null ? "config created" : "config invalid, rewrote defaults", { path });
		}
	} catch (err) {
		debugLog("warn", "config file unavailable; using browser storage only", { error: String(err) });
	} finally {
		configReady = true;
	}
};

const openLunaSettings = (): void => {
	try {
		const push = (redux.actions as unknown as Record<string, (payload: unknown) => unknown>)["router/PUSH"];
		if (typeof push !== "function") throw new Error("router/PUSH is unavailable");
		push({ pathname: "/not-found", search: "LunaSettings", replace: true });
		debugLog("info", "opening Luna settings");
		setTimeout(() => {
			const tabs = [...document.querySelectorAll<HTMLElement>('[role="tab"]')];
			const pluginsTab = tabs.find((tab) => (tab.textContent ?? "").trim() === "Plugins");
			if (pluginsTab !== undefined && pluginsTab.getAttribute("aria-selected") !== "true") pluginsTab.click();
			setTimeout(() => {
				const nodes = [...document.querySelectorAll<HTMLElement>("h1,h2,h3,h4,h5,h6,span,p,div")];
				const target = nodes.find((node) => (node.textContent ?? "").trim() === "@kyoto-aircon/playback-kit");
				target?.scrollIntoView({ block: "center", behavior: "smooth" });
			}, 250);
		}, 250);
	} catch (err) {
		debugLog("error", "open Luna settings failed", { error: String(err) });
	}
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
		audioEngine: getAudioEngineStatus,
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
	setDiagnosticsEnabled(speedStore.get().developerMode);
	registerTidalProbe(probeActivePlayer);
	try {
		const legacy = LunaPlugin.getByName("@kyoto-aircon/playback-speed") as { store?: { enabled?: boolean } } | undefined;
		if (legacy !== undefined) debugLog("warn", "old Playback Speed plugin is still installed", { enabled: legacy.store?.enabled });
	} catch {
		// Not fatal; just diagnostics.
	}
	registerReportExtras(() => ({
		kind: getPlayerKind(),
		native: probeNativeComponent(),
		nativeInstance: hasNativeInstance(),
		speed: speedStore.get().speed,
		track: probeCurrentTrack(),
		audioEngine: getAudioEngineStatus(),
		effects: getEffectsEngineState(),
		pitchSemitones: speedStore.get().pitchSemitones,
		pitchEngine: getPitchEngineState(),
		presetId: speedStore.get().presetId,
		uiTime: readUiPosition(),
		actualTime: getActualPosition(),
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

	const audioEngine = exposeAudioEngine();
	unloads.add(() => hideAudioEngine(audioEngine));

	const controller = new SpeedController(getMediaElements, speedStore);
	controller.start();

	const unsubscribe = speedStore.subscribe((settings) => {
		setDiagnosticsEnabled(settings.developerMode);
		scheduleConfigSave();
		debugLog("info", "settings changed", { speed: settings.speed, pitchShifts: settings.pitchShifts, bounds: settings.bounds });
		controller.apply();
		if (getPlayerKind() === "native") applyNativeRate(settings.speed);
		syncOnce(timeSyncDeps);
		void setPitchSemitones(settings.pitchSemitones, getMediaElements());
		void updateEffects(settings.effects, getMediaElements());
	});
	presetStore.subscribe(scheduleConfigSave);
	void hydrateConfig();

	const presetControls = {
		list: () => presetStore.get().filter((preset) => speedStore.get().builtinPresets || preset.builtin !== true),
		apply: (preset: PlaybackPreset) => {
			speedStore.applyPreset(preset);
			debugLog("info", "preset applied", { id: preset.id, name: preset.name });
		},
		clear: () => speedStore.clearPreset(),
		save: (name: string, values: PresetValues) => presetStore.save(name, values),
		saveActive: (preset: PlaybackPreset) => {
			const saved = saveActivePreset(speedStore, presetStore, preset);
			debugLog("info", "saved preset from live state", { id: saved?.id, builtin: preset.builtin === true });
		},
	};
	setupSpeedControl(unloads, speedStore, {
		getPlayerKind,
		subscribePlayerKind,
		useBrowserPlayer,
		previousQuality: readPreviousQuality,
		restoreQuality,
		presets: presetControls,
		getPitchEngineState,
		openSettings: openLunaSettings,
		onOpen: () => {
			const semitones = speedStore.get().pitchSemitones;
			if (semitones !== 0) void setPitchSemitones(semitones, getMediaElements());
		},
	});
	installDebugApi(controller);

	// TIDAL swaps media elements between tracks and re-renders the footer.
	const scanTimer = setInterval(() => {
		controller.scan();
		const semitones = speedStore.get().pitchSemitones;
		if (semitones !== 0) void setPitchSemitones(semitones, getMediaElements());
		const effects = speedStore.get().effects;
		if (hasAudibleEffects(effects)) void updateEffects(effects, getMediaElements());
	}, SCAN_INTERVAL_MS);
	const stopTimeSync = startTimeSync(timeSyncDeps);
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
		if (configSaveTimer !== undefined) {
			clearTimeout(configSaveTimer);
			void writeConfig(configSnapshot()).catch(() => undefined);
		}
		clearInterval(scanTimer);
		clearInterval(playerTimer);
		stopTimeSync();
		unsubscribe();
		controller.stop();
		resetPitchEngine();
	});

	trace.log("loaded");
} catch (err) {
	debugLog("error", "failed to load", { error: String(err), stack: (err as Error)?.stack });
	trace.err("Failed to load:", err);
}

