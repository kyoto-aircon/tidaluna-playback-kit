import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { DEFAULT_EFFECTS, EQ_BANDS, describeEffects, hasAudibleEffects, normalizeEffects } from "../plugins/PlaybackKit/src/effectsSettings";

describe("effects settings", () => {
	it("defaults to everything off with a flat 8-band EQ", () => {
		assert.deepEqual(normalizeEffects(undefined), DEFAULT_EFFECTS);
		assert.equal(DEFAULT_EFFECTS.eq.bands.length, EQ_BANDS);
		assert.equal(hasAudibleEffects(DEFAULT_EFFECTS), false);
		assert.equal(describeEffects(DEFAULT_EFFECTS), "No effects enabled");
	});

	it("clamps band gains and pads short arrays", () => {
		const effects = normalizeEffects({ eq: { enabled: true, bands: [99, -99, 3] } });
		assert.equal(effects.eq.bands.length, EQ_BANDS);
		assert.deepEqual(effects.eq.bands.slice(0, 4), [12, -12, 3, 0]);
		assert.equal(hasAudibleEffects(effects), true);
		assert.match(describeEffects(effects), /EQ 8-band/);
	});

	it("migrates the legacy 3-band fields onto the 8-band grid", () => {
		const effects = normalizeEffects({ eq: { enabled: true, low: 6, mid: -3, high: 2 } });
		assert.deepEqual(effects.eq.bands, [6, 6, -3, -3, -3, 2, 2, 2]);
	});

	it("clamps 8D ranges", () => {
		const effects = normalizeEffects({ eightD: { enabled: true, rate: 99, panDepth: 2, pitchRate: 0, pitchDepth: 99, mix: 4 } });
		assert.deepEqual(effects.eightD, { enabled: true, rate: 2, panDepth: 1, pitchRate: 0.02, pitchDepth: 12, mix: 1 });
		assert.equal(hasAudibleEffects(effects), true);
		assert.match(describeEffects(effects), /8D 2.00 Hz/);
	});

	it("clamps bass boost ranges", () => {
		const effects = normalizeEffects({ bass: { enabled: true, boost: 99, sub: -5, drive: 3, mix: 2 } });
		assert.deepEqual(effects.bass, { enabled: true, boost: 24, sub: 0, drive: 1, mix: 1 });
		assert.equal(hasAudibleEffects(effects), true);
		assert.match(describeEffects(effects), /Bass \+24 dB/);
	});

	it("clamps delay and reverb ranges", () => {
		const effects = normalizeEffects({
			delay: { enabled: true, timeMs: 0, feedback: 5, mix: -1 },
			reverb: { enabled: true, decay: 100, mix: 2 },
		});
		assert.deepEqual(effects.delay, { enabled: true, timeMs: 20, feedback: 0.9, mix: 0 });
		assert.deepEqual(effects.reverb, { enabled: true, decay: 8, mix: 1 });
	});

	it("falls back for non-numeric values", () => {
		const effects = normalizeEffects({ delay: { enabled: true, timeMs: "fast", feedback: null, mix: "wet" } });
		assert.equal(effects.delay.timeMs, DEFAULT_EFFECTS.delay.timeMs);
		assert.equal(effects.delay.feedback, DEFAULT_EFFECTS.delay.feedback);
		assert.equal(effects.delay.mix, DEFAULT_EFFECTS.delay.mix);
		assert.match(describeEffects(effects), /Delay 250 ms/);
	});
});
