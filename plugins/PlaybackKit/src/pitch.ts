export const MIN_SEMITONES = -12;
export const MAX_SEMITONES = 12;
export const PITCH_DEFAULT = 0;

export const clampSemitones = (value: number): number => {
	if (!Number.isFinite(value)) return PITCH_DEFAULT;
	return Math.max(MIN_SEMITONES, Math.min(MAX_SEMITONES, Math.round(value)));
};

/** Semitone offset -> playback-rate ratio (2^(n/12)). */
export const semitoneRatio = (semitones: number): number => 2 ** (clampSemitones(semitones) / 12);

export const formatSemitones = (semitones: number): string => {
	const value = clampSemitones(semitones);
	return `${value > 0 ? "+" : ""}${value}`;
};

export const semitoneLabel = (semitones: number): string => `${formatSemitones(semitones)} st`;
