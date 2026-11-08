import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
	clampSpeed,
	DEFAULT_BOUNDS,
	formatSpeed,
	normalizeBounds,
	positionToSpeed,
	snapToStep,
	speedLabel,
	speedToPosition,
	stepSpeed,
	tickValues,
} from "../plugins/PlaybackKit/src/speed";

describe("normalizeBounds", () => {
	it("falls back to defaults for missing values", () => {
		assert.deepEqual(normalizeBounds(undefined), DEFAULT_BOUNDS);
		assert.deepEqual(normalizeBounds({}), DEFAULT_BOUNDS);
	});

	it("rejects NaN and inverted ranges", () => {
		assert.deepEqual(normalizeBounds({ min: Number.NaN, max: Number.NaN, step: Number.NaN }), DEFAULT_BOUNDS);
		const inverted = normalizeBounds({ min: 5, max: 2, step: 0.05 });
		assert.ok(inverted.max > inverted.min);
		assert.equal(inverted.step, 0.05);
	});

	it("never allows a non-positive minimum or step", () => {
		const bounds = normalizeBounds({ min: -3, max: 4, step: 0 });
		assert.ok(bounds.min > 0);
		assert.ok(bounds.step > 0);
	});
});

describe("clampSpeed", () => {
	it("snaps to the step anchored at the minimum", () => {
		assert.equal(clampSpeed(1.37, { min: 0.05, max: 10, step: 0.05 }), 1.35);
		assert.equal(clampSpeed(1.36, { min: 0.05, max: 10, step: 0.05 }), 1.35);
		assert.equal(clampSpeed(0.07, { min: 0.07, max: 10, step: 0.05 }), 0.07);
		assert.equal(clampSpeed(0.12, { min: 0.07, max: 10, step: 0.05 }), 0.12);
	});

	it("clamps into the configured range", () => {
		assert.equal(clampSpeed(50, { min: 0.05, max: 10, step: 0.05 }), 10);
		assert.equal(clampSpeed(0, { min: 0.05, max: 10, step: 0.05 }), 0.05);
	});

	it("avoids floating point noise", () => {
		assert.equal(clampSpeed(1.0000000000002, DEFAULT_BOUNDS), 1);
		assert.equal(snapToStep(0.1 + 0.2, DEFAULT_BOUNDS), 0.3);
	});
});

describe("stepSpeed", () => {
	it("moves one snap at a time", () => {
		assert.equal(stepSpeed(1, 1, DEFAULT_BOUNDS), 1.05);
		assert.equal(stepSpeed(1, -1, DEFAULT_BOUNDS), 0.95);
	});

	it("stops at the bounds", () => {
		assert.equal(stepSpeed(10, 1, DEFAULT_BOUNDS), 10);
		assert.equal(stepSpeed(0.05, -1, DEFAULT_BOUNDS), 0.05);
	});
});

describe("formatSpeed", () => {
	it("trims trailing zeros", () => {
		assert.equal(formatSpeed(1), "1");
		assert.equal(formatSpeed(1.5), "1.5");
		assert.equal(formatSpeed(1.35), "1.35");
		assert.equal(formatSpeed(0.05), "0.05");
		assert.equal(formatSpeed(10), "10");
	});

	it("renders a label with the times sign", () => {
		assert.equal(speedLabel(1.05), "1.05×");
	});
});

describe("log scale", () => {
	it("round-trips speeds on the snap grid", () => {
		for (const speed of [0.05, 0.25, 0.5, 1, 1.35, 2, 5, 10]) {
			const position = speedToPosition(speed, DEFAULT_BOUNDS);
			const back = positionToSpeed(position, DEFAULT_BOUNDS);
			assert.ok(Math.abs(back - speed) < 1e-3, `${speed} -> ${position} -> ${back}`);
		}
	});

	it("puts 1x above the middle of a 0.05-10 scale", () => {
		const position = speedToPosition(1, DEFAULT_BOUNDS);
		assert.ok(position > 0.5 && position < 0.6, String(position));
	});

	it("clamps positions outside 0..1", () => {
		assert.equal(positionToSpeed(-1, DEFAULT_BOUNDS), 0.05);
		assert.equal(positionToSpeed(2, DEFAULT_BOUNDS), 10);
	});
});

describe("tickValues", () => {
	it("marks the ends and the landmarks", () => {
		assert.deepEqual(tickValues(DEFAULT_BOUNDS), [0.05, 1, 2, 5, 10]);
	});

	it("keeps every tick inside custom bounds", () => {
		const ticks = tickValues({ min: 0.5, max: 3, step: 0.05 });
		assert.equal(ticks[0], 0.5);
		assert.equal(ticks[ticks.length - 1], 3);
		assert.ok(ticks.every((tick) => tick >= 0.5 && tick <= 3));
	});
});
