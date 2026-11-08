export interface MediaTarget {
	playbackRate: number;
	preservesPitch?: boolean;
	webkitPreservesPitch?: boolean;
	addEventListener(type: string, listener: EventListener, options?: boolean | AddEventListenerOptions): void;
	removeEventListener(type: string, listener: EventListener, options?: boolean | EventListenerOptions): void;
}

export interface SpeedSource {
	get(): { speed: number; pitchShifts: boolean };
}

const MEDIA_SELECTOR = "#tidal-player-root video, #tidal-player-root audio, #video-one, #video-two";
const EVENTS = ["loadstart", "loadedmetadata", "canplay", "play", "emptied", "ratechange"] as const;
const EPSILON = 1e-3;
const RESTORED_RATE = 1;

/** TIDAL plays through two hidden <video> elements (video-one / video-two) inside #tidal-player-root. */
export const getMediaElements = (): HTMLMediaElement[] => {
	if (typeof document === "undefined") return [];
	return [...document.querySelectorAll<HTMLMediaElement>(MEDIA_SELECTOR)];
};

/**
 * Keeps every TIDAL media element on the desired rate and pitch mode.
 * TIDAL (and Shaka) reset playbackRate when a new track loads, so the value is
 * re-asserted on media events and by the periodic scan in index.ts.
 */
export class SpeedController {
	private readonly attachments = new Map<MediaTarget, () => void>();

	constructor(
		private readonly getElements: () => MediaTarget[],
		private readonly source: SpeedSource,
	) {}

	/** Attach to elements that are already in the DOM. */
	start(): void {
		this.scan();
	}

	/** Attach to any media elements that appeared since the last scan. */
	scan(): void {
		for (const element of this.getElements()) {
			if (this.attachments.has(element)) continue;
			this.attach(element);
		}
	}

	/** Re-assert the current rate on every attached element (after a settings change). */
	apply(): void {
		this.scan();
		for (const element of this.attachments.keys()) this.applyTo(element);
	}

	/** Detach and restore normal playback. Called when the plugin unloads. */
	stop(): void {
		for (const [element, detach] of this.attachments) {
			detach();
			this.restore(element);
		}
		this.attachments.clear();
	}

	private attach(element: MediaTarget): void {
		const listener: EventListener = () => this.applyTo(element);
		for (const type of EVENTS) element.addEventListener(type, listener);
		this.attachments.set(element, () => {
			for (const type of EVENTS) element.removeEventListener(type, listener);
		});
		this.applyTo(element);
	}

	private applyTo(element: MediaTarget): void {
		const { speed, pitchShifts } = this.source.get();
		try {
			if (Math.abs(element.playbackRate - speed) > EPSILON) element.playbackRate = speed;
			const preservePitch = !pitchShifts;
			if (element.preservesPitch !== undefined && element.preservesPitch !== preservePitch) element.preservesPitch = preservePitch;
			if (element.webkitPreservesPitch !== undefined && element.webkitPreservesPitch !== preservePitch) {
				element.webkitPreservesPitch = preservePitch;
			}
		} catch {
			// Some elements reject rate changes while loading; the next event retries.
		}
	}

	private restore(element: MediaTarget): void {
		try {
			element.playbackRate = RESTORED_RATE;
			if (element.preservesPitch !== undefined) element.preservesPitch = true;
			if (element.webkitPreservesPitch !== undefined) element.webkitPreservesPitch = true;
		} catch {
			// Ignore; the element may already be gone.
		}
	}
}
