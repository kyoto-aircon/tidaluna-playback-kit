import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createSpeedStore, STORAGE_KEY, type StorageLike } from "../plugins/PlaybackSpeed/src/state";

const fakeStorage = (initial?: string): StorageLike & { value: string | null } => ({
	value: initial ?? null,
	getItem() {
		return this.value;
	},
	setItem(_key: string, value: string) {
		this.value = value;
	},
});

describe("speed store", () => {
	it("starts at 1x with pitch preserved and default bounds", () => {
		const store = createSpeedStore(fakeStorage());
		assert.deepEqual(store.get(), {
			speed: 1,
			pitchShifts: false,
			bounds: { min: 0.05, max: 10, step: 0.05 },
		});
	});

	it("persists and restores every field", () => {
		const storage = fakeStorage();
		const store = createSpeedStore(storage);
		store.setSpeed(1.35);
		store.setPitchShifts(true);
		store.setBounds({ min: 0.5, max: 3, step: 0.1 });

		const restored = createSpeedStore(storage);
		assert.equal(restored.get().speed, 1.4);
		assert.equal(restored.get().pitchShifts, true);
		assert.deepEqual(restored.get().bounds, { min: 0.5, max: 3, step: 0.1 });
		assert.equal(storage.value, JSON.stringify(store.get()));
	});

	it("writes to the versioned storage key", () => {
		let key = "";
		const storage: StorageLike = {
			getItem: () => null,
			setItem: (k) => {
				key = k;
			},
		};
		createSpeedStore(storage).setSpeed(2);
		assert.equal(key, STORAGE_KEY);
	});

	it("ignores corrupt or unrelated storage", () => {
		for (const raw of ["{not json", "[]", "null", JSON.stringify({ speed: "fast", pitchShifts: "yes" })]) {
			const store = createSpeedStore(fakeStorage(raw));
			assert.equal(store.get().speed, 1, raw);
			assert.equal(store.get().pitchShifts, false, raw);
		}
	});

	it("clamps the current speed when the bounds shrink", () => {
		const store = createSpeedStore(fakeStorage());
		store.setSpeed(5);
		store.setBounds({ max: 2 });
		assert.equal(store.get().speed, 2);

		store.setSpeed(0.5);
		store.setBounds({ min: 1 });
		assert.equal(store.get().speed, 1);
	});

	it("steps and clamps at the ends", () => {
		const store = createSpeedStore(fakeStorage());
		store.setBounds({ min: 1, max: 1.1, step: 0.05 });
		store.step(1);
		assert.equal(store.get().speed, 1.05);
		store.step(1);
		assert.equal(store.get().speed, 1.1);
		store.step(1);
		assert.equal(store.get().speed, 1.1);
		store.step(-1);
		assert.equal(store.get().speed, 1.05);
	});

	it("notifies subscribers and stops after unsubscribe", () => {
		const store = createSpeedStore(fakeStorage());
		const seen: number[] = [];
		const unsubscribe = store.subscribe((settings) => seen.push(settings.speed));
		store.setSpeed(1.5);
		store.setSpeed(1.5);
		store.setPitchShifts(true);
		unsubscribe();
		store.setSpeed(2);
		assert.deepEqual(seen, [1.5, 1.5]);
	});

	it("resets to 1x", () => {
		const store = createSpeedStore(fakeStorage());
		store.setSpeed(2);
		store.reset();
		assert.equal(store.get().speed, 1);
	});
});
