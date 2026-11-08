export interface EqSettings {
	enabled: boolean;
	/** dB, -12..12 */
	low: number;
	mid: number;
	high: number;
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

export interface ReverbSettings {
	enabled: boolean;
	/** seconds, 0.2..8 */
	decay: number;
	/** 0..1 wet */
	mix: number;
}

export interface EffectsSettings {
	eq: EqSettings;
	delay: DelaySettings;
	reverb: ReverbSettings;
}

export const DEFAULT_EFFECTS: EffectsSettings = {
	eq: { enabled: false, low: 0, mid: 0, high: 0 },
	delay: { enabled: false, timeMs: 250, feedback: 0.25, mix: 0.25 },
	reverb: { enabled: false, decay: 2, mix: 0.25 },
};

const clamp = (value: unknown, min: number, max: number, fallback: number): number => {
	const numeric = typeof value === "number" ? value : typeof value === "string" && value.trim() !== "" ? Number(value) : Number.NaN;
	return Number.isFinite(numeric) ? Math.min(max, Math.max(min, numeric)) : fallback;
};

const bool = (value: unknown, fallback: boolean): boolean => (typeof value === "boolean" ? value : fallback);

export const normalizeEffects = (value: unknown): EffectsSettings => {
	const record = typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
	const eq = typeof record.eq === "object" && record.eq !== null ? (record.eq as Record<string, unknown>) : {};
	const delay = typeof record.delay === "object" && record.delay !== null ? (record.delay as Record<string, unknown>) : {};
	const reverb = typeof record.reverb === "object" && record.reverb !== null ? (record.reverb as Record<string, unknown>) : {};
	return {
		eq: {
			enabled: bool(eq.enabled, DEFAULT_EFFECTS.eq.enabled),
			low: clamp(eq.low, -12, 12, DEFAULT_EFFECTS.eq.low),
			mid: clamp(eq.mid, -12, 12, DEFAULT_EFFECTS.eq.mid),
			high: clamp(eq.high, -12, 12, DEFAULT_EFFECTS.eq.high),
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

export const hasAudibleEffects = (effects: EffectsSettings): boolean => effects.eq.enabled || effects.delay.enabled || effects.reverb.enabled;

export const describeEffects = (effects: EffectsSettings): string => {
	const parts: string[] = [];
	if (effects.eq.enabled) parts.push(`EQ ${effects.eq.low}/${effects.eq.mid}/${effects.eq.high} dB`);
	if (effects.delay.enabled) parts.push(`Delay ${Math.round(effects.delay.timeMs)} ms`);
	if (effects.reverb.enabled) parts.push(`Reverb ${effects.reverb.decay.toFixed(1)} s`);
	return parts.length === 0 ? "No effects enabled" : parts.join(" · ");
};
