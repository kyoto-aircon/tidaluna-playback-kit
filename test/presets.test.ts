import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { DEFAULT_EFFECTS } from "../plugins/PlaybackKit/src/effectsSettings";
import { BUILTIN_PRESETS, createPresetStore, NIGHTCORE_ID, NIGHTCORE_PRESET, presetMatches, PRESETS_KEY, type PresetStorage } from "../plugins/PlaybackKit/src/presets";

const fakeStorage = (initial?: string): PresetStorage & { value: string | null } => ({
	value: initial ?? null,
	getItem() {
		return this.value;
	},
	setItem(_key: string, value: string) {
		this.value = value;
	},
});

const values = { speed: 1.5, pitchShifts: false, pitchSemitones: 2, effects: DEFAULT_EFFECTS };

describe("preset store", () => {
	it("always exposes the built-in presets first", () => {
		const presets = createPresetStore(fakeStorage()).get();
		assert.equal(presets.length, BUILTIN_PRESETS.length);
		assert.deepEqual(presets.map((preset) => preset.name), [
			"Nightcore",
			"Daycore",
			"Slowcore",
			"Chipmunk",
			"Vaporwave",
			"Big Bass",
			"Submerge",
			"8D Orbit",
			"Dub Echo",
			"Clear Voice",
		]);
		assert.deepEqual(presets[0], NIGHTCORE_PRESET);
		assert.equal(presets.find((preset) => preset.id === "big-bass")?.effects.bass.enabled, true, "Big Bass uses the bass effect");
		assert.equal(presets.find((preset) => preset.id === "slowcore")?.effects.reverb.enabled, true, "Slowcore uses reverb");
	});

	it("saves custom presets and persists them", () => {
		const storage = fakeStorage();
		const store = createPresetStore(storage);
		const saved = store.save("Practice", values);
		assert.ok(saved !== undefined);
		assert.equal(saved?.name, "Practice");
		assert.deepEqual(saved?.effects, DEFAULT_EFFECTS);

		const restored = createPresetStore(storage).get();
		assert.equal(restored.length, BUILTIN_PRESETS.length + 1);
		assert.deepEqual(restored.find((preset) => preset.id === saved?.id), saved);
	});

	it("rejects empty names and clamps values", () => {
		const store = createPresetStore(fakeStorage());
		assert.equal(store.save("   ", values), undefined);
		const saved = store.save("Loud", { speed: 99, pitchShifts: true, pitchSemitones: 40, effects: DEFAULT_EFFECTS });
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
		assert.equal(store.get().length, BUILTIN_PRESETS.length);
		assert.equal(store.getById(saved.id), undefined);
	});

	it("ignores corrupt storage and duplicate nightcore entries", () => {
		for (const raw of ["{not json", "{}", "null"]) {
			assert.equal(createPresetStore(fakeStorage(raw)).get().length, BUILTIN_PRESETS.length, raw);
		}
		const duplicate = JSON.stringify([
			{ id: NIGHTCORE_ID, name: "Fake", speed: 2, pitchShifts: false, pitchSemitones: 0 },
			{ id: "custom-1", name: "Valid", speed: 1.2, pitchShifts: false, pitchSemitones: 0 },
		]);
		const presets = createPresetStore(fakeStorage(duplicate)).get();
		assert.equal(presets.length, BUILTIN_PRESETS.length + 1);
		assert.equal(presets[0].name, "Nightcore");
		assert.equal(presets[presets.length - 1].name, "Valid");
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

		assert.equal(store.update(a.id, { speed: 0.8, pitchShifts: false, pitchSemitones: -3, effects: { ...DEFAULT_EFFECTS, reverb: { enabled: true, decay: 4, mix: 0.5 } } }), true);
		const updated = store.get().find((preset) => preset.id === a.id);
		assert.deepEqual([updated?.speed, updated?.pitchSemitones], [0.8, -3]);
		assert.equal(updated?.effects.reverb.enabled, true);
		assert.equal(store.update(NIGHTCORE_ID, values), false);

		const customNames = () => store.get().filter((preset) => preset.builtin !== true).map((preset) => preset.name);
		assert.equal(store.move(b.id, -1), true);
		assert.deepEqual(customNames(), ["Beta", "Alpha 2"]);
		assert.equal(store.move(b.id, -1), false, "cannot move above the built-in block");
		assert.equal(store.move(b.id, 1), true);
		assert.deepEqual(customNames(), ["Alpha 2", "Beta"]);
	});

	it("replaces the custom list from config, keeping nightcore implicit", () => {
		const store = createPresetStore(fakeStorage());
		store.save("Old", values);
		store.replace([NIGHTCORE_PRESET, { id: "new-1", name: "New", speed: 2, pitchShifts: false, pitchSemitones: 1, effects: DEFAULT_EFFECTS }]);
		assert.deepEqual(store.get().filter((preset) => preset.builtin !== true).map((preset) => preset.name), ["New"]);
	});
});

describe("preset matching", () => {
	it("matches speed, pitch mode, offset and effects", () => {
		const state = { speed: 1.35, pitchShifts: true, pitchSemitones: 0, effects: DEFAULT_EFFECTS };
		assert.equal(presetMatches(NIGHTCORE_PRESET, state), true);
		assert.equal(presetMatches(NIGHTCORE_PRESET, { ...state, speed: 1.4 }), false);
		assert.equal(presetMatches(NIGHTCORE_PRESET, { ...state, effects: { ...DEFAULT_EFFECTS, reverb: { enabled: true, decay: 3, mix: 0.4 } } }), false);
	});
});
