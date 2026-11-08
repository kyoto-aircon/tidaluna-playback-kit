import { clampSpeed, DEFAULT_BOUNDS, DEFAULT_SPEED, normalizeBounds, stepSpeed, type SpeedBounds } from "./speed";

export const STORAGE_KEY = "tidaluna.playback-speed.v1";

export interface SpeedSettings {
	/** Current playback speed. */
	speed: number;
	/** When true the speed change also changes the pitch (chipmunk / slow-mo). */
	pitchShifts: boolean;
	/** Slider range and snap increment. */
	bounds: SpeedBounds;
}

export interface StorageLike {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
}

export type SpeedListener = (settings: SpeedSettings) => void;

const defaults = (): SpeedSettings => ({ speed: DEFAULT_SPEED, pitchShifts: false, bounds: { ...DEFAULT_BOUNDS } });

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
	return {
		speed: clampSpeed(typeof record.speed === "number" ? record.speed : DEFAULT_SPEED, bounds),
		pitchShifts: record.pitchShifts === true,
		bounds,
	};
};

export const createSpeedStore = (storage: StorageLike, key: string = STORAGE_KEY) => {
	let settings = parseSettings(storage.getItem(key));
	const listeners = new Set<SpeedListener>();

	const snapshot = (): SpeedSettings => ({ speed: settings.speed, pitchShifts: settings.pitchShifts, bounds: { ...settings.bounds } });

	const persist = (): void => {
		try {
			storage.setItem(key, JSON.stringify(settings));
		} catch {
			// Storage can be unavailable; the store still works for this session.
		}
	};

	const emit = (): void => {
		const next = snapshot();
		for (const listener of [...listeners]) {
			try {
				listener(next);
			} catch (err) {
				console.error("[PlaybackSpeed] listener failed", err);
			}
		}
	};

	const setSpeed = (speed: number): void => {
		const next = clampSpeed(speed, settings.bounds);
		if (next === settings.speed) return;
		settings.speed = next;
		persist();
		emit();
	};

	const setPitchShifts = (pitchShifts: boolean): void => {
		if (pitchShifts === settings.pitchShifts) return;
		settings.pitchShifts = pitchShifts;
		persist();
		emit();
	};

	const setBounds = (bounds: Partial<SpeedBounds>): void => {
		const nextBounds = normalizeBounds({ ...settings.bounds, ...bounds });
		const nextSpeed = clampSpeed(settings.speed, nextBounds);
		const boundsChanged = nextBounds.min !== settings.bounds.min || nextBounds.max !== settings.bounds.max || nextBounds.step !== settings.bounds.step;
		if (!boundsChanged && nextSpeed === settings.speed) return;
		settings.bounds = nextBounds;
		settings.speed = nextSpeed;
		persist();
		emit();
	};

	return {
		get: snapshot,
		subscribe(listener: SpeedListener): () => void {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},
		setSpeed,
		step(direction: number): void {
			setSpeed(stepSpeed(settings.speed, direction, settings.bounds));
		},
		setPitchShifts,
		setBounds,
		reset(): void {
			setSpeed(DEFAULT_SPEED);
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
			const probe = "__lunaspeed_probe__";
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
