import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createPresetStore, NIGHTCORE_ID, NIGHTCORE_PRESET, PRESETS_KEY, type PresetStorage } from "../plugins/PlaybackKit/src/presets";

const fakeStorage = (initial?: string): PresetStorage & { value: string | null } => ({
	value: initial ?? null,
	getItem() {
		return this.value;
	},
	setItem(_key: string, value: string) {
		this.value = value;
	},
});

const values = { speed: 1.5, pitchShifts: false, pitchSemitones: 2 };

describe("preset store", () => {
	it("always exposes the built-in nightcore preset first", () => {
		const presets = createPresetStore(fakeStorage()).get();
		assert.equal(presets.length, 1);
		assert.deepEqual(presets[0], NIGHTCORE_PRESET);
		assert.equal(presets[0].speed, 1.35);
		assert.equal(presets[0].pitchShifts, true);
	});

	it("saves custom presets and persists them", () => {
		const storage = fakeStorage();
		const store = createPresetStore(storage);
		const saved = store.save("Practice", values);
		assert.ok(saved !== undefined);
		assert.equal(saved?.name, "Practice");

		const restored = createPresetStore(storage).get();
		assert.equal(restored.length, 2);
		assert.deepEqual(restored[1], saved);
	});

	it("rejects empty names and clamps values", () => {
		const store = createPresetStore(fakeStorage());
		assert.equal(store.save("   ", values), undefined);
		const saved = store.save("Loud", { speed: 99, pitchShifts: true, pitchSemitones: 40 });
		assert.equal(saved?.speed, 16);
		assert.equal(saved?.pitchSemitones, 12);
		assert.equal(saved?.pitchShifts, true);
	});

	it("cannot delete nightcore, but can delete custom presets", () => {
		const storage = fakeStorage();
		const store = createPresetStore(storage);
		assert.equal(store.remove(NIGHTCORE_ID), false);
		const saved = store.save("Temp", values)!;
		assert.equal(store.remove(saved.id), true);
		assert.equal(store.get().length, 1);
		assert.equal(store.getById(saved.id), undefined);
	});

	it("ignores corrupt storage and duplicate nightcore entries", () => {
		for (const raw of ["{not json", "{}", "null"]) {
			assert.equal(createPresetStore(fakeStorage(raw)).get().length, 1, raw);
		}
		const duplicate = JSON.stringify([
			{ id: NIGHTCORE_ID, name: "Fake", speed: 2, pitchShifts: false, pitchSemitones: 0 },
			{ id: "custom-1", name: "Valid", speed: 1.2, pitchShifts: false, pitchSemitones: 0 },
		]);
		const presets = createPresetStore(fakeStorage(duplicate)).get();
		assert.equal(presets.length, 2);
		assert.equal(presets[0].name, "Nightcore");
		assert.equal(presets[1].name, "Valid");
	});

	it("notifies subscribers and writes the versioned key", () => {
		let key = "";
		const storage: PresetStorage = {
			getItem: () => null,
			setItem: (k) => {
				key = k;
			},
		};
		const store = createPresetStore(storage);
		let calls = 0;
		const unsubscribe = store.subscribe(() => (calls += 1));
		const saved = store.save("One", values)!;
		store.remove(saved.id);
		unsubscribe();
		store.save("Two", values);
		assert.equal(calls, 2);
		assert.equal(key, PRESETS_KEY);
	});
});
