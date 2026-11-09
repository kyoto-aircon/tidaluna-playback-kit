import type { SignalsmithStretchFactory, StretchNode } from "signalsmith-stretch";

let node: StretchNode | undefined;
let context: AudioContext | undefined;
let factory: SignalsmithStretchFactory | undefined;

/**
 * Signalsmith Stretch is loaded lazily: importing the module instantiates its
 * WASM, which we do not want on every plugin load. It is MIT-licensed and the
 * WASM is embedded, so there is no external download at runtime.
 */
export const ensureStretch = async (ctx: AudioContext): Promise<StretchNode> => {
	if (node !== undefined && context === ctx) return node;
	if (factory === undefined) {
		const module = await import("signalsmith-stretch");
		factory = module.default as SignalsmithStretchFactory;
	}
	const created = await factory(ctx, { numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [2] });
	try {
		await created.configure({ blockMs: 120 });
	} catch (err) {
		// Older builds may not expose configure; defaults are fine.
		console.warn("[PlaybackKit] stretch configure failed", err);
	}
	await created.setUpdateInterval(0.05);
	node = created;
	context = ctx;
	return created;
};

export const getStretch = (): StretchNode | undefined => node;

export const resetStretch = (): void => {
	if (node !== undefined) {
		try {
			node.disconnect();
		} catch {
			// Already disconnected.
		}
	}
	node = undefined;
	context = undefined;
};
