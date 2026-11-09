export const EQ_FREQUENCIES = [62, 125, 250, 500, 1000, 2000, 4000, 8000] as const;
export const EQ_BANDS = EQ_FREQUENCIES.length;
export const EQ_MIN_DB = -12;
export const EQ_MAX_DB = 12;

export interface EqSettings {
	enabled: boolean;
	/** One gain in dB per EQ_FREQUENCY. */
	bands: number[];
}

export interface DelaySettings {
	enabled: boolean;
	/** milliseconds, 20..2000 */
	timeMs: number;
	/** 0..0.9 */
	feedback: number;
	/** 0..1 wet */
	mix: number;
}

export interface BassSettings {
	enabled: boolean;
	/** Low-shelf boost at 90 Hz, 0..24 dB. */
	boost: number;
	/** Sub shelf at 45 Hz, 0..12 dB. */
	sub: number;
	/** Saturation drive, 0..1. */
	drive: number;
	/** Wet send amount, 0..1 (added to the dry bass, not a crossfade). */
	mix: number;
}

export interface EightDSettings {
	enabled: boolean;
	/** Pan LFO rate in Hz, 0.02..2. */
	rate: number;
	/** Pan depth, 0..1. */
	panDepth: number;
	/** Pitch wobble LFO rate in Hz, 0.02..2. */
	pitchRate: number;
	/** Pitch wobble depth in milliseconds, 0..12. */
	pitchDepth: number;
	/** Wet mix, 0..1. */
	mix: number;
}

export interface ReverbSettings {
	enabled: boolean;
	/** seconds, 0.2..8 */
	decay: number;
	/** 0..1 wet */
	mix: number;
}

export interface EffectsSettings {
	eq: EqSettings;
	bass: BassSettings;
	eightD: EightDSettings;
	delay: DelaySettings;
	reverb: ReverbSettings;
}

export const DEFAULT_EFFECTS: EffectsSettings = {
	eq: { enabled: false, bands: Array.from({ length: EQ_BANDS }, () => 0) },
	bass: { enabled: false, boost: 6, sub: 3, drive: 0.2, mix: 0.6 },
	eightD: { enabled: false, rate: 0.15, panDepth: 0.9, pitchRate: 0.35, pitchDepth: 2, mix: 1 },
	delay: { enabled: false, timeMs: 250, feedback: 0.25, mix: 0.25 },
	reverb: { enabled: false, decay: 2, mix: 0.25 },
};

const clamp = (value: unknown, min: number, max: number, fallback: number): number => {
	const numeric = typeof value === "number" ? value : typeof value === "string" && value.trim() !== "" ? Number(value) : Number.NaN;
	return Number.isFinite(numeric) ? Math.min(max, Math.max(min, numeric)) : fallback;
};

const bool = (value: unknown, fallback: boolean): boolean => (typeof value === "boolean" ? value : fallback);

const normalizeBands = (eq: Record<string, unknown>): number[] => {
	const bands = Array.from({ length: EQ_BANDS }, () => 0);
	if (Array.isArray(eq.bands)) {
		for (let index = 0; index < EQ_BANDS; index += 1) bands[index] = clamp(eq.bands[index], EQ_MIN_DB, EQ_MAX_DB, 0);
		return bands;
	}
	// Legacy 3-band config: low -> 62/125 Hz, mid -> 250/500/1k, high -> 2k/4k/8k.
	const low = clamp(eq.low, EQ_MIN_DB, EQ_MAX_DB, 0);
	const mid = clamp(eq.mid, EQ_MIN_DB, EQ_MAX_DB, 0);
	const high = clamp(eq.high, EQ_MIN_DB, EQ_MAX_DB, 0);
	return [low, low, mid, mid, mid, high, high, high];
};

export const normalizeEffects = (value: unknown): EffectsSettings => {
	const record = typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
	const eq = typeof record.eq === "object" && record.eq !== null ? (record.eq as Record<string, unknown>) : {};
	const eightD = typeof record.eightD === "object" && record.eightD !== null ? (record.eightD as Record<string, unknown>) : {};
	const bass = typeof record.bass === "object" && record.bass !== null ? (record.bass as Record<string, unknown>) : {};
	const delay = typeof record.delay === "object" && record.delay !== null ? (record.delay as Record<string, unknown>) : {};
	const reverb = typeof record.reverb === "object" && record.reverb !== null ? (record.reverb as Record<string, unknown>) : {};
	return {
		eq: {
			enabled: bool(eq.enabled, DEFAULT_EFFECTS.eq.enabled),
			bands: normalizeBands(eq),
		},
		eightD: {
			enabled: bool(eightD.enabled, DEFAULT_EFFECTS.eightD.enabled),
			rate: clamp(eightD.rate, 0.02, 2, DEFAULT_EFFECTS.eightD.rate),
			panDepth: clamp(eightD.panDepth, 0, 1, DEFAULT_EFFECTS.eightD.panDepth),
			pitchRate: clamp(eightD.pitchRate, 0.02, 2, DEFAULT_EFFECTS.eightD.pitchRate),
			pitchDepth: clamp(eightD.pitchDepth, 0, 12, DEFAULT_EFFECTS.eightD.pitchDepth),
			mix: clamp(eightD.mix, 0, 1, DEFAULT_EFFECTS.eightD.mix),
		},
		bass: {
			enabled: bool(bass.enabled, DEFAULT_EFFECTS.bass.enabled),
			boost: clamp(bass.boost, 0, 24, DEFAULT_EFFECTS.bass.boost),
			sub: clamp(bass.sub, 0, 12, DEFAULT_EFFECTS.bass.sub),
			drive: clamp(bass.drive, 0, 1, DEFAULT_EFFECTS.bass.drive),
			mix: clamp(bass.mix, 0, 1, DEFAULT_EFFECTS.bass.mix),
		},
		delay: {
			enabled: bool(delay.enabled, DEFAULT_EFFECTS.delay.enabled),
			timeMs: clamp(delay.timeMs, 20, 2000, DEFAULT_EFFECTS.delay.timeMs),
			feedback: clamp(delay.feedback, 0, 0.9, DEFAULT_EFFECTS.delay.feedback),
			mix: clamp(delay.mix, 0, 1, DEFAULT_EFFECTS.delay.mix),
		},
		reverb: {
			enabled: bool(reverb.enabled, DEFAULT_EFFECTS.reverb.enabled),
			decay: clamp(reverb.decay, 0.2, 8, DEFAULT_EFFECTS.reverb.decay),
			mix: clamp(reverb.mix, 0, 1, DEFAULT_EFFECTS.reverb.mix),
		},
	};
};

export const hasAudibleEffects = (effects: EffectsSettings): boolean =>
	effects.eq.enabled || effects.bass.enabled || effects.eightD.enabled || effects.delay.enabled || effects.reverb.enabled;

export const describeEffects = (effects: EffectsSettings): string => {
	const parts: string[] = [];
	if (effects.eq.enabled) parts.push("EQ 8-band");
	if (effects.eightD.enabled) parts.push(`8D ${effects.eightD.rate.toFixed(2)} Hz`);
	if (effects.bass.enabled) parts.push(`Bass +${Math.round(effects.bass.boost)} dB`);
	if (effects.delay.enabled) parts.push(`Delay ${Math.round(effects.delay.timeMs)} ms`);
	if (effects.reverb.enabled) parts.push(`Reverb ${effects.reverb.decay.toFixed(1)} s`);
	return parts.length === 0 ? "No effects enabled" : parts.join(" · ");
};
