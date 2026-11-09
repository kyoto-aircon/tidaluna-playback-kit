import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { resolveTransport, shadowPitchRatio, shadowPosition, stretchSemitones } from "../plugins/PlaybackKit/src/shadowMath";

const close = (actual: number, expected: number, epsilon = 1e-6): void => {
	assert.ok(Math.abs(actual - expected) < epsilon, `${actual} != ${expected}`);
};

describe("shadow player maths", () => {
	it("cancels the pitch change from the source rate", () => {
		close(shadowPitchRatio(0, 0.7, false, true), 1 / 0.7);
		close(shadowPitchRatio(0, 1.35, false, true), 1 / 1.35);
		close(shadowPitchRatio(2, 1.2, false, true), 2 ** (2 / 12) / 1.2);
	});

	it("leaves pitch alone at 1x, with pitch-follows-speed, or outside the shadow", () => {
		close(shadowPitchRatio(0, 1, false, true), 1);
		close(shadowPitchRatio(0, 0.7, true, true), 1);
		close(shadowPitchRatio(3, 0.7, false, false), 2 ** (3 / 12));
	});

	it("clamps to the worklet's ratio range", () => {
		close(shadowPitchRatio(0, 0.1, false, true), 4);
		close(shadowPitchRatio(0, 10, false, true), 0.25);
	});

	it("maps elapsed wall time to stream position at a rate", () => {
		close(shadowPosition(10, 1, 0), 10);
		close(shadowPosition(10, 0.7, 4), 11);
		close(shadowPosition(0, 0.7, -1), 0);
	});

	it("maps speed/pitch to Signalsmith semitones", () => {
		close(stretchSemitones(3, 1, false), 3);
		close(stretchSemitones(3, 0.7, false), 3);
		close(stretchSemitones(0, 0.5, true), -12);
		close(stretchSemitones(0, 1.35, true), 12 * Math.log2(1.35));
		close(stretchSemitones(0, 1, true), 0);
	});

	it("keeps playing when Redux leaves PLAYING without a user pause", () => {
		// A native pause caused by the shadow itself must not stop it.
		const playing = { playing: true, hasIntent: false, lastAt: 0 };
		assert.deepEqual(resolveTransport(playing, undefined, false), playing);
		// But a captured user pause wins.
		assert.deepEqual(resolveTransport(playing, { value: "paused", at: 5 }, true), {
			playing: false,
			hasIntent: true,
			lastAt: 5,
		});
		// A captured play wins again.
		assert.deepEqual(resolveTransport({ playing: false, hasIntent: true, lastAt: 5 }, { value: "playing", at: 6 }, false), {
			playing: true,
			hasIntent: true,
			lastAt: 6,
		});
		// Stale transport events are ignored.
		const paused = { playing: false, hasIntent: true, lastAt: 6 };
		assert.deepEqual(resolveTransport(paused, { value: "playing", at: 6 }, true), paused);
	});
});
