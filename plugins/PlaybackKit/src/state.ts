import { clampSemitones, PITCH_DEFAULT } from "./pitch";
import type { PlaybackPreset } from "./presets";
import { clampSpeed, DEFAULT_BOUNDS, DEFAULT_SPEED, normalizeBounds, stepSpeed, type SpeedBounds } from "./speed";

export const STORAGE_KEY = "tidaluna.playback-kit.v1";
const LEGACY_STORAGE_KEY = "tidaluna.playback-speed.v1";

export interface SpeedSettings {
	/** Current playback speed. */
	speed: number;
	/** When true the speed change also changes the pitch (chipmunk / slow-mo). */
	pitchShifts: boolean;
	/** Independent pitch offset in semitones (-12..12). Mutually exclusive with pitchShifts. */
	pitchSemitones: number;
	/** Active preset id, or null for custom. */
	presetId: string | null;
	/** Slider range and snap increment. */
	bounds: SpeedBounds;
}

export interface StorageLike {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
}

export type SpeedListener = (settings: SpeedSettings) => void;

const defaults = (): SpeedSettings => ({
	speed: DEFAULT_SPEED,
	pitchShifts: false,
	pitchSemitones: PITCH_DEFAULT,
	presetId: null,
	bounds: { ...DEFAULT_BOUNDS },
});

const parseSettings = (raw: string | null): SpeedSettings => {
	if (raw === null) return defaults();
	let parsed: unknown;
	try {
		parsed = JSON.parse(raw);
	} catch {
		return defaults();
	}
	if (typeof parsed !== "object" || parsed === null) return defaults();
	const record = parsed as Record<string, unknown>;
	const bounds = normalizeBounds(record.bounds as Partial<SpeedBounds> | undefined);
	const pitchSemitones = clampSemitones(typeof record.pitchSemitones === "number" ? record.pitchSemitones : 0);
	return {
		speed: clampSpeed(typeof record.speed === "number" ? record.speed : DEFAULT_SPEED, bounds),
		pitchShifts: pitchSemitones === 0 && record.pitchShifts === true,
		pitchSemitones,
		presetId: typeof record.presetId === "string" ? record.presetId : null,
		bounds,
	};
};

/** Old Playback Speed installs keep their speed / pitch mode / bounds. */
const loadSettings = (storage: StorageLike, key: string): SpeedSettings => {
	const current = storage.getItem(key);
	if (current !== null) return parseSettings(current);
	const legacy = storage.getItem(LEGACY_STORAGE_KEY);
	if (legacy === null) return defaults();
	const migrated = parseSettings(legacy);
	migrated.presetId = null;
	return migrated;
};

const sameSettings = (a: SpeedSettings, b: SpeedSettings): boolean =>
	a.speed === b.speed &&
	a.pitchShifts === b.pitchShifts &&
	a.pitchSemitones === b.pitchSemitones &&
	a.presetId === b.presetId &&
	a.bounds.min === b.bounds.min &&
	a.bounds.max === b.bounds.max &&
	a.bounds.step === b.bounds.step;

export const createSpeedStore = (storage: StorageLike, key: string = STORAGE_KEY) => {
	let settings = loadSettings(storage, key);
	const listeners = new Set<SpeedListener>();

	const snapshot = (): SpeedSettings => ({ ...settings, bounds: { ...settings.bounds } });

	const commit = (next: SpeedSettings): void => {
		if (sameSettings(settings, next)) return;
		settings = next;
		try {
			storage.setItem(key, JSON.stringify(settings));
		} catch {
			// Storage can be unavailable; the store still works for this session.
		}
		const value = snapshot();
		for (const listener of [...listeners]) {
			try {
				listener(value);
			} catch (err) {
				console.error("[PlaybackKit] listener failed", err);
			}
		}
	};

	const manual = (patch: Partial<SpeedSettings>): SpeedSettings => ({ ...settings, ...patch, presetId: null });

	return {
		get: snapshot,
		subscribe(listener: SpeedListener): () => void {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},
		setSpeed(speed: number): void {
			commit(manual({ speed: clampSpeed(speed, settings.bounds) }));
		},
		step(direction: number): void {
			commit(manual({ speed: stepSpeed(settings.speed, direction, settings.bounds) }));
		},
		/** Turning this on clears any custom pitch shift. */
		setPitchShifts(pitchShifts: boolean): void {
			commit(manual({ pitchShifts, pitchSemitones: pitchShifts ? 0 : settings.pitchSemitones }));
		},
		/** Any non-zero offset turns pitch-follows-speed off. */
		setPitchSemitones(semitones: number): void {
			const next = clampSemitones(semitones);
			commit(manual({ pitchSemitones: next, pitchShifts: next === 0 ? settings.pitchShifts : false }));
		},
		setBounds(bounds: Partial<SpeedBounds>): void {
			const nextBounds = normalizeBounds({ ...settings.bounds, ...bounds });
			commit({ ...settings, bounds: nextBounds, speed: clampSpeed(settings.speed, nextBounds) });
		},
		applyPreset(preset: PlaybackPreset): void {
			const semitones = clampSemitones(preset.pitchSemitones);
			commit({
				...settings,
				speed: clampSpeed(preset.speed, settings.bounds),
				pitchShifts: semitones === 0 && preset.pitchShifts === true,
				pitchSemitones: semitones,
				presetId: preset.id,
			});
		},
		clearPreset(): void {
			commit({ ...settings, presetId: null });
		},
		/** Replaces the whole settings object (config file / import). */
		replace(next: SpeedSettings): void {
			const bounds = normalizeBounds(next.bounds);
			const semitones = clampSemitones(next.pitchSemitones);
			commit({
				speed: clampSpeed(next.speed, bounds),
				pitchShifts: semitones === 0 && next.pitchShifts === true,
				pitchSemitones: semitones,
				presetId: typeof next.presetId === "string" ? next.presetId : null,
				bounds,
			});
		},
		reset(): void {
			commit({ ...defaults(), presetId: null, bounds: { ...settings.bounds } });
		},
		destroy(): void {
			listeners.clear();
		},
	};
};

export type SpeedStore = ReturnType<typeof createSpeedStore>;

const memoryStorage = new Map<string, string>();

/** localStorage when available (the TIDAL renderer), otherwise an in-memory fallback. */
export const createBrowserStorage = (): StorageLike => {
	try {
		if (typeof localStorage !== "undefined") {
			const probe = "__lunakit_probe__";
			localStorage.setItem(probe, "1");
			localStorage.removeItem(probe);
			return localStorage;
		}
	} catch {
		// Fall through to memory storage.
	}
	return {
		getItem: (key) => memoryStorage.get(key) ?? null,
		setItem: (key, value) => void memoryStorage.set(key, value),
	};
};

export const speedStore: SpeedStore = createSpeedStore(createBrowserStorage());
