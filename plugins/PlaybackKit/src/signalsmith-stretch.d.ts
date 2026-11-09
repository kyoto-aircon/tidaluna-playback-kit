declare module "signalsmith-stretch" {
	export interface StretchSchedule {
		output?: number;
		active?: boolean;
		input?: number;
		rate?: number;
		semitones?: number;
		tonalityHz?: number;
		formantSemitones?: number;
		formantCompensation?: boolean;
		formantBaseHz?: number;
		loopStart?: number;
		loopEnd?: number;
	}

	export interface StretchNode extends AudioWorkletNode {
		inputTime: number;
		addBuffers(buffers: Float32Array[], transfer?: Transferable[]): Promise<number>;
		dropBuffers(toSeconds?: number): Promise<unknown>;
		schedule(config: StretchSchedule): Promise<unknown>;
		setUpdateInterval(seconds: number, callback?: (time: number) => void): Promise<unknown>;
		start(when?: number, offset?: number, duration?: number, rate?: number): Promise<unknown>;
		stop(when?: number): Promise<unknown>;
		latency(): Promise<number>;
		configure(config: {
			blockMs?: number | null;
			intervalMs?: number;
			splitComputation?: boolean;
			preset?: "default" | "cheaper";
		}): Promise<unknown>;
	}

	export type SignalsmithStretchFactory = (
		context: AudioContext,
		options?: AudioWorkletNodeOptions,
	) => Promise<StretchNode>;

	const SignalsmithStretch: SignalsmithStretchFactory;
	export default SignalsmithStretch;
}
