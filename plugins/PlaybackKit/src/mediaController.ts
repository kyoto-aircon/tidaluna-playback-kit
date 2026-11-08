import { debugLog } from "./debug";

export interface MediaTarget {
	playbackRate: number;
	defaultPlaybackRate?: number;
	preservesPitch?: boolean;
	webkitPreservesPitch?: boolean;
	addEventListener(type: string, listener: EventListener, options?: boolean | AddEventListenerOptions): void;
	removeEventListener(type: string, listener: EventListener, options?: boolean | EventListenerOptions): void;
}

export interface SpeedSource {
	get(): { speed: number; pitchShifts: boolean };
}

const MEDIA_SELECTOR = "#tidal-player-root video, #tidal-player-root audio, #video-one, #video-two";
const EVENTS = ["loadstart", "loadedmetadata", "canplay", "playing", "play", "emptied", "ratechange", "seeked"] as const;
const EPSILON = 1e-3;
const RESTORED_RATE = 1;
const DELAYED_REAPPLY_MS = 150;

const elementId = (element: MediaTarget): string => {
	const id = (element as unknown as { id?: string }).id;
	return typeof id === "string" ? id : element.constructor.name;
};

/** TIDAL plays through two hidden <video> elements (video-one / video-two) inside #tidal-player-root. */
export const getMediaElements = (): HTMLMediaElement[] => {
	if (typeof document === "undefined") return [];
	return [...document.querySelectorAll<HTMLMediaElement>(MEDIA_SELECTOR)];
};

/**
 * Keeps every TIDAL media element on the desired rate and pitch mode.
 * TIDAL (Shaka) resets playbackRate to defaultPlaybackRate on load, so we set
 * defaultPlaybackRate as well and re-assert on media events plus a periodic scan.
 */
export class SpeedController {
	private readonly attachments = new Map<MediaTarget, () => void>();
	private readonly timers = new Set<ReturnType<typeof setTimeout>>();

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
		const elements = this.getElements();
		let added = 0;
		for (const element of elements) {
			if (this.attachments.has(element)) continue;
			this.attach(element);
			added += 1;
		}
		if (added > 0) debugLog("info", "attached media elements", { added, total: this.attachments.size, found: elements.length });
		else if (elements.length === 0) debugLog("debug", "no media elements found", { selector: MEDIA_SELECTOR });
	}

	/** Re-assert the current rate on every attached element (after a settings change). */
	apply(): void {
		this.scan();
		for (const element of this.attachments.keys()) this.applyTo(element, "settings-change");
	}

	/** Detach and restore normal playback. Called when the plugin unloads. */
	stop(): void {
		for (const timer of this.timers) clearTimeout(timer);
		this.timers.clear();
		for (const [element, detach] of this.attachments) {
			detach();
			this.restore(element);
		}
		this.attachments.clear();
		debugLog("info", "controller stopped");
	}

	private attach(element: MediaTarget): void {
		const listener: EventListener = (event) => {
			const desired = this.source.get().speed;
			const current = element.playbackRate;
			if (Math.abs(current - desired) > EPSILON) {
				debugLog("warn", "TIDAL reset the rate", {
					id: elementId(element),
					event: event.type,
					before: current,
					desired,
					currentTime: (element as unknown as { currentTime?: number }).currentTime,
				});
			}
			this.applyTo(element, event.type);
			if (event.type === "loadstart" || event.type === "emptied") this.scheduleReapply(element);
		};
		for (const type of EVENTS) element.addEventListener(type, listener);
		this.attachments.set(element, () => {
			for (const type of EVENTS) element.removeEventListener(type, listener);
		});
		debugLog("info", "attached", { id: elementId(element), tag: element.constructor.name, rate: element.playbackRate });
		this.applyTo(element, "attach");
	}

	private applyTo(element: MediaTarget, reason: string): void {
		const { speed, pitchShifts } = this.source.get();
		const before = element.playbackRate;
		try {
			if (Math.abs(before - speed) > EPSILON) element.playbackRate = speed;
			if (element.defaultPlaybackRate !== undefined && Math.abs(element.defaultPlaybackRate - speed) > EPSILON) {
				element.defaultPlaybackRate = speed;
			}
			const preservePitch = !pitchShifts;
			if (element.preservesPitch !== undefined && element.preservesPitch !== preservePitch) element.preservesPitch = preservePitch;
			if (element.webkitPreservesPitch !== undefined && element.webkitPreservesPitch !== preservePitch) {
				element.webkitPreservesPitch = preservePitch;
			}
		} catch (err) {
			debugLog("error", "failed to apply rate", { id: elementId(element), reason, error: String(err) });
			return;
		}
		const after = element.playbackRate;
		if (Math.abs(after - before) > EPSILON) {
			debugLog("debug", "applied rate", {
				id: elementId(element),
				reason,
				before,
				after,
				readback: after,
				defaultRate: element.defaultPlaybackRate,
			});
		}
	}

	private scheduleReapply(element: MediaTarget): void {
		const timer = setTimeout(() => {
			this.timers.delete(timer);
			if (!this.attachments.has(element)) return;
			this.applyTo(element, "delayed-reapply");
		}, DELAYED_REAPPLY_MS);
		this.timers.add(timer);
	}

	private restore(element: MediaTarget): void {
		try {
			element.playbackRate = RESTORED_RATE;
			if (element.defaultPlaybackRate !== undefined) element.defaultPlaybackRate = RESTORED_RATE;
			if (element.preservesPitch !== undefined) element.preservesPitch = true;
			if (element.webkitPreservesPitch !== undefined) element.webkitPreservesPitch = true;
		} catch {
			// Ignore; the element may already be gone.
		}
	}
}
