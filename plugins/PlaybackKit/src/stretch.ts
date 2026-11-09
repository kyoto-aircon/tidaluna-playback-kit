import type { SignalsmithStretchFactory, StretchNode } from "signalsmith-stretch";

let factory: SignalsmithStretchFactory | undefined;

const getFactory = async (): Promise<SignalsmithStretchFactory> => {
	if (factory === undefined) {
		const module = await import("signalsmith-stretch");
		factory = module.default as SignalsmithStretchFactory;
	}
	return factory;
};

let bufferNode: StretchNode | undefined;
let bufferContext: AudioContext | undefined;

/**
 * Buffer-mode node: the shadow player loads a decoded track into it.
 * WASM loads lazily so plugin startup stays cheap.
 */
export const ensureStretch = async (ctx: AudioContext): Promise<StretchNode> => {
	if (bufferNode !== undefined && bufferContext === ctx) return bufferNode;
	const create = await getFactory();
	const created = await create(ctx, { numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [2] });
	try {
		await created.configure({ blockMs: 120 });
	} catch {
		// Older builds may not expose configure; defaults are fine.
	}
	await created.setUpdateInterval(0.05);
	bufferNode = created;
	bufferContext = ctx;
	return created;
};

let liveNode: StretchNode | undefined;
let liveContext: AudioContext | undefined;

/** Live-input node: the browser/shaka player feeds it through the audio chain. */
export const ensureLiveStretch = async (ctx: AudioContext): Promise<StretchNode> => {
	if (liveNode !== undefined && liveContext === ctx) return liveNode;
	const create = await getFactory();
	const created = await create(ctx, { numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [2] });
	try {
		await created.configure({ blockMs: 80 });
	} catch {
		// Defaults are fine.
	}
	await created.setUpdateInterval(0.1);
	liveNode = created;
	liveContext = ctx;
	return created;
};

export const getStretch = (): StretchNode | undefined => bufferNode;
export const getLiveStretch = (): StretchNode | undefined => liveNode;

export const resetStretch = (): void => {
	if (bufferNode !== undefined) {
		try {
			bufferNode.disconnect();
		} catch {
			// Already disconnected.
		}
	}
	bufferNode = undefined;
	bufferContext = undefined;
};

export const resetLiveStretch = (): void => {
	if (liveNode !== undefined) {
		try {
			liveNode.disconnect();
		} catch {
			// Already disconnected.
		}
	}
	liveNode = undefined;
	liveContext = undefined;
};
