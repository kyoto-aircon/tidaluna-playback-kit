import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { DEFAULT_EFFECTS, describeEffects, hasAudibleEffects, normalizeEffects } from "../plugins/PlaybackKit/src/effectsSettings";

describe("effects settings", () => {
	it("defaults to everything off", () => {
		assert.deepEqual(normalizeEffects(undefined), DEFAULT_EFFECTS);
		assert.equal(hasAudibleEffects(DEFAULT_EFFECTS), false);
		assert.equal(describeEffects(DEFAULT_EFFECTS), "No effects enabled");
	});

	it("clamps out-of-range values", () => {
		const effects = normalizeEffects({
			eq: { enabled: true, low: 99, mid: -99, high: 3 },
			delay: { enabled: true, timeMs: 0, feedback: 5, mix: -1 },
			reverb: { enabled: true, decay: 100, mix: 2 },
		});
		assert.deepEqual(effects.eq, { enabled: true, low: 12, mid: -12, high: 3 });
		assert.deepEqual(effects.delay, { enabled: true, timeMs: 20, feedback: 0.9, mix: 0 });
		assert.deepEqual(effects.reverb, { enabled: true, decay: 8, mix: 1 });
	});

	it("falls back for non-numeric values and reports active effects", () => {
		const effects = normalizeEffects({ delay: { enabled: true, timeMs: "fast", feedback: null, mix: "wet" } });
		assert.equal(effects.delay.timeMs, DEFAULT_EFFECTS.delay.timeMs);
		assert.equal(effects.delay.feedback, DEFAULT_EFFECTS.delay.feedback);
		assert.equal(effects.delay.mix, DEFAULT_EFFECTS.delay.mix);
		assert.equal(hasAudibleEffects(effects), true);
		assert.match(describeEffects(effects), /Delay 250 ms/);
	});
});
