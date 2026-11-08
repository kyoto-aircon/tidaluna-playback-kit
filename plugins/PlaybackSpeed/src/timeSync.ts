/**
 * TIDAL redraws the scrubber from `latestCurrentTime + (now - syncTimestamp)/1000`,
 * i.e. it assumes 1x wall-clock playback. At any other rate the UI time drifts
 * from the audio until the player sends a fresh TIME_UPDATE (usually on pause).
 * Re-dispatching TIME_UPDATE with the real media position keeps them in sync.
 */
export interface TimeSyncDeps {
	getSpeed(): number;
	isPlaying(): boolean;
	getPosition(): number | null;
	dispatchTimeUpdate(time: number): void;
}

export const SYNC_INTERVAL_MS = 100;
const SPEED_EPSILON = 1e-3;

export const needsSync = (speed: number): boolean => Math.abs(speed - 1) > SPEED_EPSILON;

/** Returns true when a TIME_UPDATE was dispatched. */
export const syncOnce = (deps: TimeSyncDeps): boolean => {
	if (!needsSync(deps.getSpeed())) return false;
	if (!deps.isPlaying()) return false;
	const position = deps.getPosition();
	if (position === null || !Number.isFinite(position) || position < 0) return false;
	deps.dispatchTimeUpdate(position);
	return true;
};

export const startTimeSync = (deps: TimeSyncDeps, intervalMs: number = SYNC_INTERVAL_MS): (() => void) => {
	const timer = setInterval(() => syncOnce(deps), intervalMs);
	return () => clearInterval(timer);
};
