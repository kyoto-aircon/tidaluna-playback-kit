import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { needsSync, syncOnce, startTimeSync, type TimeSyncDeps } from "../plugins/PlaybackSpeed/src/timeSync";

const createDeps = (overrides: Partial<TimeSyncDeps> = {}) => {
	const updates: number[] = [];
	const deps: TimeSyncDeps = {
		getSpeed: () => 1.5,
		isPlaying: () => true,
		getPosition: () => 42.5,
		dispatchTimeUpdate: (time) => updates.push(time),
		...overrides,
	};
	return { deps, updates };
};

describe("time sync", () => {
	it("only syncs away from 1x", () => {
		assert.equal(needsSync(1), false);
		assert.equal(needsSync(1.0004), false);
		assert.equal(needsSync(1.05), true);
		assert.equal(needsSync(0.95), true);
	});

	it("dispatches the real position while playing at another speed", () => {
		const { deps, updates } = createDeps();
		assert.equal(syncOnce(deps), true);
		assert.deepEqual(updates, [42.5]);
	});

	it("does not dispatch at 1x or while paused", () => {
		const atOne = createDeps({ getSpeed: () => 1 });
		assert.equal(syncOnce(atOne.deps), false);
		assert.deepEqual(atOne.updates, []);

		const paused = createDeps({ isPlaying: () => false });
		assert.equal(syncOnce(paused.deps), false);
		assert.deepEqual(paused.updates, []);
	});

	it("ignores missing or invalid positions", () => {
		for (const position of [null, Number.NaN, -1]) {
			const { deps, updates } = createDeps({ getPosition: () => position });
			assert.equal(syncOnce(deps), false, String(position));
			assert.deepEqual(updates, []);
		}
	});

	it("runs on an interval and stops", async () => {
		const { deps, updates } = createDeps();
		const stop = startTimeSync(deps, 10);
		await new Promise((resolve) => setTimeout(resolve, 35));
		stop();
		const count = updates.length;
		assert.ok(count >= 2, `expected repeats, got ${count}`);
		await new Promise((resolve) => setTimeout(resolve, 25));
		assert.equal(updates.length, count, "no updates after stop");
	});
});
