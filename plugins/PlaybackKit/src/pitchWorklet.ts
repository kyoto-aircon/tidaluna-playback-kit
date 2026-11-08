/**
 * Granular delay-line pitch shifter. Two taps run on a sawtooth delay ramp and
 * are crossfaded with a triangle window, which hides the ramp reset.
 * ratio = 2^(semitones/12); 1 = passthrough.
 */
export const PITCH_WORKLET_SOURCE = `
class PlaybackKitPitch extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [{ name: "ratio", defaultValue: 1, minValue: 0.25, maxValue: 4, automationRate: "k-rate" }];
	}

	constructor() {
		super();
		this.size = Math.ceil(sampleRate * 0.25);
		this.maxDelay = Math.floor(sampleRate * 0.06);
		this.buffers = [];
		this.write = 0;
		this.phase = 0;
		this.ratio = 1;
	}

	buffer(channel) {
		if (this.buffers[channel] === undefined) this.buffers[channel] = new Float32Array(this.size);
		return this.buffers[channel];
	}

	read(buffer, delay) {
		let index = this.write - delay;
		while (index < 0) index += this.size;
		const base = Math.floor(index);
		const i0 = base % this.size;
		const i1 = (i0 + 1) % this.size;
		const frac = index - base;
		return buffer[i0] * (1 - frac) + buffer[i1] * frac;
	}

	process(inputs, outputs, parameters) {
		const input = inputs[0];
		const output = outputs[0];
		if (input === undefined || input.length === 0) return true;

		const target = parameters.ratio[0];
		const channels = Math.min(input.length, output.length);
		const frames = input[0].length;

		for (let frame = 0; frame < frames; frame++) {
			for (let channel = 0; channel < channels; channel++) {
				this.buffer(channel)[this.write] = input[channel][frame];
			}

			this.ratio += (target - this.ratio) * 0.0008;
			const ratio = Math.abs(this.ratio - 1) < 0.0002 ? 1 : this.ratio;

			if (ratio === 1) {
				for (let channel = 0; channel < channels; channel++) output[channel][frame] = input[channel][frame];
			} else {
				const maxDelay = this.maxDelay;
				const phaseStep = Math.abs(ratio - 1) / maxDelay;
				const up = ratio > 1;

				const p1 = this.phase;
				const p2 = (this.phase + 0.5) % 1;
				const delay1 = Math.max(1, maxDelay * (up ? 1 - p1 : p1));
				const delay2 = Math.max(1, maxDelay * (up ? 1 - p2 : p2));
				const w1 = 1 - Math.abs(2 * p1 - 1);
				const w2 = 1 - w1;

				for (let channel = 0; channel < channels; channel++) {
					const buffer = this.buffer(channel);
					output[channel][frame] = w1 * this.read(buffer, delay1) + w2 * this.read(buffer, delay2);
				}

				this.phase += phaseStep;
				if (this.phase >= 1) this.phase -= 1;
			}

			this.write = (this.write + 1) % this.size;
		}

		return true;
	}
}

registerProcessor("playback-kit-pitch", PlaybackKitPitch);
`;
