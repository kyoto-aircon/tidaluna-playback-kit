/**
 * Shadow-player maths.
 *
 * The buffer source runs at `speed`, which multiplies its pitch by the same
 * factor. Unless "pitch follows speed" is on, the pitch worklet cancels that
 * with a 1/speed ratio. The worklet's parameter range is 0.25–4, so extreme
 * speeds clamp (pitch preservation is approximate there).
 */
export const shadowPitchRatio = (semitones: number, speed: number, pitchShifts: boolean, compensate: boolean): number => {
	const user = 2 ** (semitones / 12);
	if (!compensate) return user;
	if (pitchShifts) return 1;
	if (Math.abs(speed - 1) < 1e-3) return user;
	return Math.max(0.25, Math.min(4, user / speed));
};

/** Stream position of the buffer source, in seconds. */
export const shadowPosition = (elapsedSeconds: number, rate: number, offset: number): number =>
	Math.max(0, elapsedSeconds * rate + offset);

/** Signalsmith semitones: pitch follows speed, or the user's independent offset. */
export const stretchSemitones = (semitones: number, speed: number, pitchShifts: boolean): number =>
	pitchShifts ? 12 * Math.log2(speed) : semitones;

export interface TransportState {
	playing: boolean;
	hasIntent: boolean;
	lastAt: number;
}

/**
 * User intent is captured from TIDAL's active player. Redux alone is not a
 * reliable source: pausing the native renderer for non-1× speeds can make its
 * state leave PLAYING, which used to stop the shadow. Only a real play/pause
 * command clears intent.
 */
export const resolveTransport = (
	current: TransportState,
	transport: { value: "playing" | "paused"; at: number } | undefined,
	reduxPlaying: boolean,
): TransportState => {
	if (transport !== undefined && transport.at !== current.lastAt) {
		return { playing: transport.value === "playing", hasIntent: true, lastAt: transport.at };
	}
	if (!current.hasIntent && reduxPlaying) return { ...current, playing: true };
	return current;
};
