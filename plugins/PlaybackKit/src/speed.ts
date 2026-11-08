export interface SpeedBounds {
	/** Lowest selectable speed. */
	min: number;
	/** Highest selectable speed. */
	max: number;
	/** Snap increment applied to every change. */
	step: number;
}

export const DEFAULT_BOUNDS: SpeedBounds = { min: 0.05, max: 10, step: 0.05 };
export const DEFAULT_SPEED = 1;
/** Chromium's audio renderer clamps effective playback to this floor. */
export const CHROMIUM_MIN_RATE = 0.0625;
/** Chromium's audio renderer clamps effective playback to this ceiling. */
export const CHROMIUM_MAX_RATE = 16;

const PRECISION = 6;

export const roundTo = (value: number, digits: number = PRECISION): number => {
	const factor = 10 ** digits;
	return Math.round(value * factor) / factor;
};

export const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/** Coerce arbitrary input into a valid, ordered set of bounds. */
export const normalizeBounds = (bounds: Partial<SpeedBounds> | undefined): SpeedBounds => {
	const rawMin = Number(bounds?.min);
	const min = Number.isFinite(rawMin) ? roundTo(Math.max(0.01, rawMin)) : DEFAULT_BOUNDS.min;
	const rawMax = Number(bounds?.max);
	const max = Number.isFinite(rawMax) ? roundTo(Math.max(min + 0.01, rawMax)) : Math.max(min + 0.01, DEFAULT_BOUNDS.max);
	const rawStep = Number(bounds?.step);
	const step = Number.isFinite(rawStep) && rawStep > 0 ? roundTo(rawStep) : DEFAULT_BOUNDS.step;
	return { min, max, step };
};

/** Snap to the grid anchored at the minimum, then clamp into range. */
export const snapToStep = (value: number, bounds: SpeedBounds): number => {
	const { min, step } = bounds;
	const snapped = min + Math.round((value - min) / step) * step;
	return roundTo(snapped);
};

export const clampSpeed = (value: number, bounds: Partial<SpeedBounds> | undefined): number => {
	const normalized = normalizeBounds(bounds);
	const finite = Number.isFinite(value) ? value : DEFAULT_SPEED;
	const snapped = snapToStep(finite, normalized);
	return clamp(roundTo(snapped), normalized.min, normalized.max);
};

/** Move by whole steps. Direction is -1 (slower) or 1 (faster). */
export const stepSpeed = (value: number, direction: number, bounds: Partial<SpeedBounds> | undefined): number => {
	const normalized = normalizeBounds(bounds);
	const from = clampSpeed(value, normalized);
	return clampSpeed(from + direction * normalized.step, normalized);
};

const trimZeros = (value: string): string => {
	const trimmed = value.includes(".") ? value.replace(/0+$/, "").replace(/\.$/, "") : value;
	return trimmed === "" || trimmed === "-0" ? "0" : trimmed;
};

/** 1 -> "1", 1.35 -> "1.35", 0.05 -> "0.05", 10 -> "10" */
export const formatSpeed = (value: number): string => {
	if (!Number.isFinite(value)) return String(DEFAULT_SPEED);
	return trimZeros(value.toFixed(4));
};

export const speedLabel = (value: number): string => `${formatSpeed(value)}×`;

/** Map speed onto 0..1 for a log-scaled slider. */
export const speedToPosition = (value: number, bounds: Partial<SpeedBounds> | undefined): number => {
	const { min, max } = normalizeBounds(bounds);
	if (!(max > min)) return 0;
	const ratio = Math.log(clamp(value, min, max) / min) / Math.log(max / min);
	return clamp(Number.isFinite(ratio) ? ratio : 0, 0, 1);
};

/** Map a 0..1 slider position back to a snapped speed. */
export const positionToSpeed = (position: number, bounds: Partial<SpeedBounds> | undefined): number => {
	const normalized = normalizeBounds(bounds);
	const raw = normalized.min * Math.pow(normalized.max / normalized.min, clamp(position, 0, 1));
	return clampSpeed(raw, normalized);
};

/** Ticks for the scale rule: the ends plus the usual landmarks, deduped and spaced. */
export const tickValues = (bounds: Partial<SpeedBounds> | undefined): number[] => {
	const { min, max } = normalizeBounds(bounds);
	const candidates = [min, 1, 2, 5, 10, max];
	const seen = new Set<string>();
	const ticks: number[] = [];
	for (const candidate of candidates.sort((a, b) => a - b)) {
		if (candidate < min || candidate > max) continue;
		const key = formatSpeed(candidate);
		if (seen.has(key)) continue;
		seen.add(key);
		ticks.push(roundTo(candidate));
	}
	// Drop neighbours that would overlap on a ~340px-wide scale.
	const spaced: number[] = [];
	for (const tick of ticks) {
		const previous = spaced[spaced.length - 1];
		if (previous !== undefined && speedToPosition(tick, bounds) - speedToPosition(previous, bounds) < 0.07) continue;
		spaced.push(tick);
	}
	return spaced;
};
