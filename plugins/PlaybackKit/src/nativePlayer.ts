import { debugLog } from "./debug";
import { extractStreamInfo, type NativeStreamCapture } from "./nativeStream";

/**
 * TIDAL's lossless path plays through `window.NativePlayerComponent`, a native
 * audio backend with no HTMLMediaElement, so `playbackRate` is ignored.
 * We patch its prototype to capture the live instance and, if the backend
 * exposes a rate method, drive it from here.
 *
 * The live player object is a class instance (not the preload factory result),
 * so `load`/`next` are wrapped on its actual prototype to capture the stream
 * descriptor. That keeps the shadow player in the renderer, with no electron
 * grant.
 */

interface NativePlayerLike {
	[key: string]: unknown;
	playbackRate?: number;
}

const PATCH_MARK = "__lunaspeedPatched";

let instance: NativePlayerLike | undefined;
let rateMember: string | undefined;

const getContainer = (): { Player?: { prototype?: Record<string, unknown> } } | undefined => {
	const global = globalThis as Record<string, unknown>;
	const container = global.NativePlayerComponent as { Player?: { prototype?: Record<string, unknown> } } | undefined;
	if (container === undefined || container.Player === undefined || container.Player.prototype === undefined) return undefined;
	return container;
};

const methodNames = (target: object): string[] => {
	const names = new Set<string>();
	let current: object | null = target;
	let depth = 0;
	while (current !== null && depth < 4) {
		for (const name of Object.getOwnPropertyNames(current)) names.add(name);
		current = Object.getPrototypeOf(current);
		depth += 1;
	}
	return [...names];
};

const findRateMember = (target: NativePlayerLike): string | undefined => {
	const names = methodNames(target);
	const method = names.find((name) => /^set(playback|audio)?(rate|speed|tempo)$/i.test(name));
	if (method !== undefined && typeof target[method] === "function") return method;
	if (typeof target.playbackRate === "number") return "playbackRate";
	return names.find((name) => /^(playbackRate|rate|speed)$/i.test(name) && typeof target[name] === "number");
};

const captureInstance = (native: NativePlayerLike): void => {
	if (instance === native) return;
	instance = native;
	rateMember = findRateMember(native);
	debugLog("info", "native player instance captured", {
		rateMember: rateMember ?? null,
		ownKeys: Object.keys(native).slice(0, 40),
		methods: methodNames(native).slice(0, 80),
	});
};

let activePlayerFinder: (() => object | undefined) | undefined;

/** Set by index.ts, which already locates TIDAL's active player. */
export const setActivePlayerFinder = (finder: () => object | undefined): void => {
	activePlayerFinder = finder;
};

export interface NativeStreamState {
	load?: NativeStreamCapture;
	preload?: NativeStreamCapture;
	seek?: { time: number; at: number };
	/** User play/pause intent captured from TIDAL's active player. */
	transport?: { value: "playing" | "paused"; at: number };
}

const STREAM_KEY = "__playbackKitNativeStreams";
const streamState: NativeStreamState = ((globalThis as Record<string, unknown>)[STREAM_KEY] ??= {}) as NativeStreamState;

export const getNativeStreamState = (): NativeStreamState => ({
	load: streamState.load === undefined ? undefined : { ...streamState.load },
	preload: streamState.preload === undefined ? undefined : { ...streamState.preload },
	seek: streamState.seek === undefined ? undefined : { ...streamState.seek },
	transport: streamState.transport === undefined ? undefined : { ...streamState.transport },
});

const patchStreamPrototype = (player: object): void => {
	const prototype = Object.getPrototypeOf(player) as Record<string, unknown> | null;
	if (prototype === null || prototype === Object.prototype) return;
	if (prototype.__pbkStreamPatched === true) return;
	const callerStack = (): string[] => {
		try {
			return (new Error().stack ?? "").split("\n").slice(2, 7).map((line) => line.trim());
		} catch {
			return [];
		}
	};
	const wrap = (method: "load" | "next", slot: "load" | "preload"): void => {
		const original = prototype[method];
		if (typeof original !== "function") return;
		prototype[method] = function patchedStream(this: unknown, ...args: unknown[]): unknown {
			try {
				const info = extractStreamInfo(args[0]);
				if (info !== null) streamState[slot] = info;
			} catch (err) {
				debugLog("debug", "native stream capture failed", { error: String(err) });
			}
			return (original as (...inner: unknown[]) => unknown).apply(this, args);
		};
	};
	try {
		Object.defineProperty(prototype, "__pbkStreamPatched", { value: true, enumerable: false });
	} catch {
		return;
	}
	wrap("load", "load");
	wrap("next", "preload");
	const originalSeek = prototype.seek;
	if (typeof originalSeek === "function") {
		prototype.seek = function patchedSeek(this: unknown, ...args: unknown[]): unknown {
			const time = Number(args[0]);
			if (Number.isFinite(time)) {
				streamState.seek = { time: Math.max(0, time), at: Date.now() };
				debugLog("info", "native seek", { time: Math.max(0, time), caller: callerStack() });
			}
			return (originalSeek as (...inner: unknown[]) => unknown).apply(this, args);
		};
	}
	const wrapTransport = (method: "play" | "pause", value: "playing" | "paused"): void => {
		const original = prototype[method];
		if (typeof original !== "function") return;
		prototype[method] = function patchedTransport(this: unknown, ...args: unknown[]): unknown {
			streamState.transport = { value, at: Date.now() };
			debugLog("info", "native transport", { value, caller: callerStack() });
			return (original as (...inner: unknown[]) => unknown).apply(this, args);
		};
	};
	wrapTransport("play", "playing");
	wrapTransport("pause", "paused");
	debugLog("info", "native stream capture patched", { methods: ["load", "next", "seek", "play", "pause"] });
};

/** Applies the stream capture to the current active player. Idempotent. */
export const captureNativeStreams = (): void => {
	if (activePlayerFinder === undefined) return;
	try {
		const player = activePlayerFinder();
		if (player !== undefined) patchStreamPrototype(player);
	} catch (err) {
		debugLog("debug", "native stream patch failed", { error: String(err) });
	}
};

/** Patch the component before TIDAL builds its player, so we can see the instance. */
export const captureNativeComponent = (): boolean => {
	captureNativeStreams();
	const container = getContainer();
	if (container === undefined) return false;
	const prototype = container.Player?.prototype;
	if (prototype === undefined) return false;
	if ((prototype as Record<string, unknown>)[PATCH_MARK] === true) return true;
	try {
		Object.defineProperty(prototype, PATCH_MARK, { value: true, enumerable: false });
	} catch {
		return false;
	}
	for (const method of ["play", "load", "pause", "seek"]) {
		const original = prototype[method];
		if (typeof original !== "function") continue;
		prototype[method] = function patched(this: NativePlayerLike, ...args: unknown[]) {
			try {
				captureInstance(this);
			} catch (err) {
				debugLog("error", "native capture failed", { error: String(err) });
			}
			return (original as (...inner: unknown[]) => unknown).apply(this, args);
		};
	}
	debugLog("info", "native player component patched");
	return true;
};

export const hasNativeInstance = (): boolean => instance !== undefined;

interface NativePlayerControl {
	setVolume?: (volume: number) => void;
	volume?: number;
	pause?: () => void;
	play?: () => void;
	seek?: (time: number) => void;
}

let control: NativePlayerControl | undefined;

/**
 * The preload exposes `NativePlayerComponent.Player()` to the page. A second
 * instance shares the same main-process `player.message` channel, so calling
 * `setVolume` here drives the one native player TIDAL is using.
 */
const getControl = (): NativePlayerControl | undefined => {
	const global = globalThis as Record<string, unknown>;
	const container = global.NativePlayerComponent as { Player?: () => NativePlayerControl } | undefined;
	if (container === undefined || typeof container.Player !== "function") return undefined;
	if (control === undefined) {
		try {
			control = container.Player();
		} catch (err) {
			debugLog("error", "native volume control unavailable", { error: String(err) });
			return undefined;
		}
	}
	return control;
};

/** 0..1; TIDAL's native player takes 0..100. */
export const setNativeVolume = (volume: number): void => {
	const target = getControl();
	if (target === undefined || typeof target.setVolume !== "function") return;
	try {
		target.setVolume(Math.round(Math.max(0, Math.min(1, volume)) * 100));
	} catch (err) {
		debugLog("error", "native volume set failed", { error: String(err) });
	}
};

/** Desired volume from TIDAL's settings store, when the preload exposes it. */
export const getNativeVolume = (): number | undefined => {
	const target = getControl();
	const value = target?.volume;
	if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
	return Math.max(0, Math.min(1, value));
};

/** Stops TIDAL's native renderer while the shadow player owns the clock. */
export const pauseNative = (): void => {
	const target = getControl();
	if (target?.pause === undefined) return;
	try {
		target.pause();
	} catch (err) {
		debugLog("error", "native pause failed", { error: String(err) });
	}
};

/** Seeks the native renderer without changing its play state. */
export const seekNative = (time: number): void => {
	const target = getControl();
	if (target?.seek === undefined) return;
	try {
		target.seek(Math.max(0, time));
	} catch (err) {
		debugLog("error", "native seek failed", { error: String(err) });
	}
};

/** Seeks and plays the native renderer (used to trigger its `completed` signal). */
export const playNativeAt = (time: number, volume: number): boolean => {
	const target = getControl();
	if (target === undefined) return false;
	try {
		if (typeof target.setVolume === "function") target.setVolume(Math.round(Math.max(0, Math.min(1, volume)) * 100));
		if (typeof target.seek === "function") target.seek(Math.max(0, time));
		if (typeof target.play === "function") target.play();
		return typeof target.play === "function";
	} catch (err) {
		debugLog("error", "native seek/play failed", { error: String(err) });
		return false;
	}
};

export const applyNativeRate = (rate: number): boolean => {
	if (instance === undefined) return false;
	if (rateMember === undefined) rateMember = findRateMember(instance);
	if (rateMember === undefined) return false;
	try {
		const current = instance[rateMember];
		if (rateMember === "playbackRate") {
			if (current === rate) return true;
			instance.playbackRate = rate;
		} else {
			(instance[rateMember] as (value: number) => unknown)(rate);
		}
		debugLog("info", "native rate applied", { rate, member: rateMember, readback: instance[rateMember] });
		return true;
	} catch (err) {
		debugLog("error", "native rate failed", { rate, member: rateMember, error: String(err) });
		return false;
	}
};

export const probeNativeComponent = (): unknown => {
	const container = getContainer();
	if (container === undefined) return { present: false };
	const prototype = container.Player?.prototype;
	const names = prototype === undefined ? [] : Object.getOwnPropertyNames(prototype).filter((name) => name !== PATCH_MARK);
	return {
		present: true,
		patched: prototype !== undefined && (prototype as Record<string, unknown>)[PATCH_MARK] === true,
		playerMethods: names.slice(0, 100),
		rateMethods: names.filter((name) => /rate|speed|tempo|pitch/i.test(name)),
		instanceCaptured: instance !== undefined,
		rateMember: rateMember ?? null,
		instanceMethods: instance === undefined ? [] : methodNames(instance).slice(0, 100),
	};
};
