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

describe("preset editing", () => {
	it("renames, updates and reorders custom presets", () => {
		const store = createPresetStore(fakeStorage());
		const a = store.save("Alpha", values)!;
		const b = store.save("Beta", values)!;

		assert.equal(store.rename(a.id, "Alpha 2"), true);
		assert.equal(store.get().find((preset) => preset.id === a.id)?.name, "Alpha 2");
		assert.equal(store.rename(NIGHTCORE_ID, "Nope"), false);
		assert.equal(store.rename(a.id, "   "), false);

		assert.equal(store.update(a.id, { speed: 0.8, pitchShifts: false, pitchSemitones: -3 }), true);
		const updated = store.get().find((preset) => preset.id === a.id);
		assert.deepEqual([updated?.speed, updated?.pitchSemitones], [0.8, -3]);
		assert.equal(store.update(NIGHTCORE_ID, values), false);

		assert.equal(store.move(b.id, -1), true);
		assert.deepEqual(store.get().map((preset) => preset.name), ["Nightcore", "Beta", "Alpha 2"]);
		assert.equal(store.move(b.id, -1), false, "cannot move above the built-in");
		assert.equal(store.move(b.id, 1), true);
		assert.deepEqual(store.get().map((preset) => preset.name), ["Nightcore", "Alpha 2", "Beta"]);
	});

	it("replaces the custom list from config, keeping nightcore implicit", () => {
		const store = createPresetStore(fakeStorage());
		store.save("Old", values);
		store.replace([NIGHTCORE_PRESET, { id: "new-1", name: "New", speed: 2, pitchShifts: false, pitchSemitones: 1 }]);
		assert.deepEqual(store.get().map((preset) => preset.name), ["Nightcore", "New"]);
	});
});
