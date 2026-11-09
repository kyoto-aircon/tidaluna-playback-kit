import { debugLog } from "./debug";

/**
 * TIDAL's lossless path plays through `window.NativePlayerComponent`, a native
 * audio backend with no HTMLMediaElement, so `playbackRate` is ignored.
 * We patch its prototype to capture the live instance and, if the backend
 * exposes a rate method, drive it from here.
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

/** Patch the component before TIDAL builds its player, so we can see the instance. */
export const captureNativeComponent = (): boolean => {
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
