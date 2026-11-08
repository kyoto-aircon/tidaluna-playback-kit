import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { clampSemitones, formatSemitones, semitoneLabel, semitoneRatio } from "../plugins/PlaybackKit/src/pitch";

describe("pitch", () => {
	it("clamps and rounds semitones", () => {
		assert.equal(clampSemitones(40), 12);
		assert.equal(clampSemitones(-40), -12);
		assert.equal(clampSemitones(1.4), 1);
		assert.equal(clampSemitones(1.6), 2);
		assert.equal(clampSemitones(Number.NaN), 0);
	});

	it("maps semitones to a rate ratio", () => {
		assert.equal(semitoneRatio(0), 1);
		assert.equal(semitoneRatio(12), 2);
		assert.equal(semitoneRatio(-12), 0.5);
		assert.ok(Math.abs(semitoneRatio(7) - 1.4983) < 0.001);
	});

	it("formats signed semitones", () => {
		assert.equal(formatSemitones(0), "0");
		assert.equal(formatSemitones(3), "+3");
		assert.equal(formatSemitones(-3), "-3");
		assert.equal(semitoneLabel(2), "+2 st");
	});
});
