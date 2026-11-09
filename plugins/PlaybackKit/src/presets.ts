import {
	DEFAULT_EFFECTS,
	normalizeEffects,
	type BassSettings,
	type DelaySettings,
	type EffectsSettings,
	type EightDSettings,
	type EqSettings,
	type ReverbSettings,
} from "./effectsSettings";
import { clampSemitones } from "./pitch";
import { createBrowserStorage } from "./state";

export interface PlaybackPreset {
	id: string;
	name: string;
	speed: number;
	/** Pitch follows speed (rate-based chipmunk / slow-mo). */
	pitchShifts: boolean;
	/** Independent pitch offset in semitones. */
	pitchSemitones: number;
	/** Effects snapshot captured with the preset. */
	effects: EffectsSettings;
	/** Built-in presets cannot be edited or removed. */
	builtin?: boolean;
}

export interface PresetValues {
	speed: number;
	pitchShifts: boolean;
	pitchSemitones: number;
	effects: EffectsSettings;
}

export interface PresetStorage {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
}

export const PRESETS_KEY = "tidaluna.playback-kit.presets.v1";
export const NIGHTCORE_ID = "nightcore";

type EffectsOverrides = {
	eq?: Partial<EqSettings>;
	bass?: Partial<BassSettings>;
	eightD?: Partial<EightDSettings>;
	delay?: Partial<DelaySettings>;
	reverb?: Partial<ReverbSettings>;
};

const effectsOf = (overrides: EffectsOverrides): EffectsSettings =>
	normalizeEffects({
		...DEFAULT_EFFECTS,
		...overrides,
		eq: { ...DEFAULT_EFFECTS.eq, ...(overrides.eq ?? {}) },
		bass: { ...DEFAULT_EFFECTS.bass, ...(overrides.bass ?? {}) },
		eightD: { ...DEFAULT_EFFECTS.eightD, ...(overrides.eightD ?? {}) },
		delay: { ...DEFAULT_EFFECTS.delay, ...(overrides.delay ?? {}) },
		reverb: { ...DEFAULT_EFFECTS.reverb, ...(overrides.reverb ?? {}) },
	});

export const NIGHTCORE_PRESET: PlaybackPreset = {
	id: NIGHTCORE_ID,
	name: "Nightcore",
	speed: 1.35,
	pitchShifts: true,
	pitchSemitones: 0,
	effects: effectsOf({}),
	builtin: true,
};

export const SLOWCORE_PRESET: PlaybackPreset = {
	id: "slowcore",
	name: "Slowcore",
	speed: 0.8,
	pitchShifts: true,
	pitchSemitones: 0,
	effects: effectsOf({ reverb: { enabled: true, decay: 4, mix: 0.35 } }),
	builtin: true,
};

export const BIG_BASS_PRESET: PlaybackPreset = {
	id: "big-bass",
	name: "Big Bass",
	speed: 1,
	pitchShifts: false,
	pitchSemitones: 0,
	effects: effectsOf({
		eq: { enabled: true, bands: [3, 2, 0, 0, 0, 0, 0, 1] },
		bass: { enabled: true, boost: 14, sub: 6, drive: 0.5, mix: 1 },
	}),
	builtin: true,
};

export const EIGHT_D_PRESET: PlaybackPreset = {
	id: "eight-d",
	name: "8D Orbit",
	speed: 1,
	pitchShifts: false,
	pitchSemitones: 0,
	effects: effectsOf({ eightD: { enabled: true, rate: 0.1, panDepth: 0.85, pitchRate: 0.3, pitchDepth: 4 } }),
	builtin: true,
};

export const DUB_ECHO_PRESET: PlaybackPreset = {
	id: "dub-echo",
	name: "Dub Echo",
	speed: 1,
	pitchShifts: false,
	pitchSemitones: 0,
	effects: effectsOf({ delay: { enabled: true, timeMs: 450, feedback: 0.45, mix: 0.28 } }),
	builtin: true,
};

export const DAYCORE_PRESET: PlaybackPreset = {
	id: "daycore",
	name: "Daycore",
	speed: 0.85,
	pitchShifts: true,
	pitchSemitones: 0,
	effects: effectsOf({ reverb: { enabled: true, decay: 2.5, mix: 0.2 } }),
	builtin: true,
};

export const CHIPMUNK_PRESET: PlaybackPreset = {
	id: "chipmunk",
	name: "Chipmunk",
	speed: 1.6,
	pitchShifts: true,
	pitchSemitones: 0,
	effects: effectsOf({}),
	builtin: true,
};

export const VAPORWAVE_PRESET: PlaybackPreset = {
	id: "vaporwave",
	name: "Vaporwave",
	speed: 0.7,
	pitchShifts: true,
	pitchSemitones: 0,
	effects: effectsOf({ reverb: { enabled: true, decay: 5, mix: 0.35 }, delay: { enabled: true, timeMs: 300, feedback: 0.3, mix: 0.2 } }),
	builtin: true,
};

export const SUBMERGE_PRESET: PlaybackPreset = {
	id: "submerge",
	name: "Submerge",
	speed: 0.95,
	pitchShifts: false,
	pitchSemitones: 0,
	effects: effectsOf({
		bass: { enabled: true, boost: 10, sub: 5, drive: 0.3, mix: 0.6 },
		eightD: { enabled: true, rate: 0.08, panDepth: 0.7, pitchRate: 0.2, pitchDepth: 3 },
	}),
	builtin: true,
};

export const CLEAR_VOICE_PRESET: PlaybackPreset = {
	id: "clear-voice",
	name: "Clear Voice",
	speed: 1.15,
	pitchShifts: false,
	pitchSemitones: 0,
	effects: effectsOf({ eq: { enabled: true, bands: [-4, -2, 1, 2, 2, 1, 0, 0] } }),
	builtin: true,
};

export const BUILTIN_PRESETS: readonly PlaybackPreset[] = [
	NIGHTCORE_PRESET,
	DAYCORE_PRESET,
	SLOWCORE_PRESET,
	CHIPMUNK_PRESET,
	VAPORWAVE_PRESET,
	BIG_BASS_PRESET,
	SUBMERGE_PRESET,
	EIGHT_D_PRESET,
	DUB_ECHO_PRESET,
	CLEAR_VOICE_PRESET,
];
const BUILTIN_IDS = new Set(BUILTIN_PRESETS.map((preset) => preset.id));

const MAX_NAME_LENGTH = 24;
const MIN_SPEED = 0.05;
const MAX_SPEED = 16;

const sanitizeName = (name: unknown): string | undefined => {
	if (typeof name !== "string") return undefined;
	const trimmed = name.trim().slice(0, MAX_NAME_LENGTH);
	return trimmed === "" ? undefined : trimmed;
};

const sanitizeSpeed = (speed: unknown): number => {
	const value = Number(speed);
	if (!Number.isFinite(value)) return 1;
	return Math.max(MIN_SPEED, Math.min(MAX_SPEED, value));
};

const parseCustomPreset = (raw: unknown, seen: Set<string>): PlaybackPreset | undefined => {
	if (typeof raw !== "object" || raw === null) return undefined;
	const record = raw as Record<string, unknown>;
	const id = typeof record.id === "string" ? record.id : undefined;
	const name = sanitizeName(record.name);
	if (id === undefined || name === undefined || BUILTIN_IDS.has(id) || seen.has(id)) return undefined;
	seen.add(id);
	return {
		id,
		name,
		speed: sanitizeSpeed(record.speed),
		pitchShifts: record.pitchShifts === true,
		pitchSemitones: clampSemitones(typeof record.pitchSemitones === "number" ? record.pitchSemitones : 0),
		effects: normalizeEffects(record.effects),
	};
};

const parsePresets = (raw: string | null): PlaybackPreset[] => {
	if (raw === null) return [];
	let parsed: unknown;
	try {
		parsed = JSON.parse(raw);
	} catch {
		return [];
	}
	if (!Array.isArray(parsed)) return [];
	const seen = new Set<string>();
	const presets: PlaybackPreset[] = [];
	for (const entry of parsed) {
		const preset = parseCustomPreset(entry, seen);
		if (preset !== undefined) presets.push(preset);
	}
	return presets;
};

const sameEffects = (a: EffectsSettings, b: EffectsSettings): boolean => {
	if (a.eq.enabled !== b.eq.enabled || a.eq.bands.length !== b.eq.bands.length) return false;
	for (let index = 0; index < a.eq.bands.length; index += 1) if (a.eq.bands[index] !== b.eq.bands[index]) return false;
	const keys = ["enabled", "boost", "sub", "drive", "mix"] as const;
	for (const key of keys) if (a.bass[key] !== b.bass[key]) return false;
	const eightDKeys = ["enabled", "rate", "panDepth", "pitchRate", "pitchDepth"] as const;
	for (const key of eightDKeys) if (a.eightD[key] !== b.eightD[key]) return false;
	const delayKeys = ["enabled", "timeMs", "feedback", "mix"] as const;
	for (const key of delayKeys) if (a.delay[key] !== b.delay[key]) return false;
	return a.reverb.enabled === b.reverb.enabled && a.reverb.decay === b.reverb.decay && a.reverb.mix === b.reverb.mix;
};

/** True when the live playback/effect state matches the preset snapshot. */
export const presetMatches = (
	preset: PlaybackPreset,
	state: { speed: number; pitchShifts: boolean; pitchSemitones: number; effects: EffectsSettings },
): boolean =>
	preset.speed === state.speed &&
	preset.pitchShifts === state.pitchShifts &&
	preset.pitchSemitones === state.pitchSemitones &&
	sameEffects(preset.effects, state.effects);

export const createPresetStore = (storage: PresetStorage, key: string = PRESETS_KEY) => {
	let customs = parsePresets(storage.getItem(key));
	const listeners = new Set<() => void>();
	let counter = 0;

	const persist = (): void => {
		try {
			storage.setItem(key, JSON.stringify(customs));
		} catch {
			// Presets still work for this session.
		}
	};

	const emit = (): void => {
		for (const listener of [...listeners]) {
			try {
				listener();
			} catch {
				// A broken listener must not break the store.
			}
		}
	};

	const get = (): PlaybackPreset[] => [...BUILTIN_PRESETS.map((preset) => ({ ...preset })), ...customs.map((preset) => ({ ...preset }))];

	return {
		get,
		getById(id: string): PlaybackPreset | undefined {
			return get().find((preset) => preset.id === id);
		},
		save(name: unknown, values: PresetValues): PlaybackPreset | undefined {
			const safeName = sanitizeName(name);
			if (safeName === undefined) return undefined;
			counter += 1;
			const preset: PlaybackPreset = {
				id: `custom-${Date.now().toString(36)}-${counter}`,
				name: safeName,
				speed: sanitizeSpeed(values.speed),
				pitchShifts: values.pitchShifts === true,
				pitchSemitones: clampSemitones(values.pitchSemitones),
				effects: normalizeEffects(values.effects),
			};
			customs.push(preset);
			persist();
			emit();
			return { ...preset };
		},
		remove(id: string): boolean {
			if (BUILTIN_IDS.has(id)) return false;
			const next = customs.filter((preset) => preset.id !== id);
			if (next.length === customs.length) return false;
			customs = next;
			persist();
			emit();
			return true;
		},
		rename(id: string, name: unknown): boolean {
			if (BUILTIN_IDS.has(id)) return false;
			const safeName = sanitizeName(name);
			const preset = customs.find((entry) => entry.id === id);
			if (safeName === undefined || preset === undefined) return false;
			preset.name = safeName;
			persist();
			emit();
			return true;
		},
		update(id: string, values: PresetValues): boolean {
			if (BUILTIN_IDS.has(id)) return false;
			const preset = customs.find((entry) => entry.id === id);
			if (preset === undefined) return false;
			preset.speed = sanitizeSpeed(values.speed);
			preset.pitchShifts = values.pitchShifts === true;
			preset.pitchSemitones = clampSemitones(values.pitchSemitones);
			preset.effects = normalizeEffects(values.effects);
			persist();
			emit();
			return true;
		},
		move(id: string, direction: number): boolean {
			if (BUILTIN_IDS.has(id)) return false;
			const index = customs.findIndex((entry) => entry.id === id);
			const target = index + Math.sign(direction);
			if (index < 0 || target < 0 || target >= customs.length) return false;
			const [preset] = customs.splice(index, 1);
			customs.splice(target, 0, preset);
			persist();
			emit();
			return true;
		},
		/** Replaces all custom presets (config import / file load). Built-in nightcore is implicit. */
		replace(presets: PlaybackPreset[]): void {
			const seen = new Set<string>();
			customs = presets
				.filter((preset) => preset.builtin !== true)
				.map((preset) => parseCustomPreset(preset, seen))
				.filter((preset): preset is PlaybackPreset => preset !== undefined);
			persist();
			emit();
		},
		subscribe(listener: () => void): () => void {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},
	};
};

export type PresetStore = ReturnType<typeof createPresetStore>;

export const presetStore = createPresetStore(createBrowserStorage());
