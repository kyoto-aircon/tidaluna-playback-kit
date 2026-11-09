import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { DEFAULT_EFFECTS } from "../plugins/PlaybackKit/src/effectsSettings";
import { NIGHTCORE_PRESET } from "../plugins/PlaybackKit/src/presets";
import { createSpeedStore, STORAGE_KEY, type StorageLike } from "../plugins/PlaybackKit/src/state";

const fakeStorage = (initial?: string, legacy?: string): StorageLike & { value: string | null } => ({
	value: initial ?? null,
	getItem(key: string) {
		if (key === "tidaluna.playback-speed.v1") return legacy ?? null;
		return this.value;
	},
	setItem(_key: string, value: string) {
		this.value = value;
	},
});

const defaults = {
	speed: 1,
	pitchShifts: false,
	pitchSemitones: 0,
	presetId: null,
	developerMode: false,
	builtinPresets: true,
	nativeEffects: false,
	effects: DEFAULT_EFFECTS,
	bounds: { min: 0.05, max: 10, step: 0.05 },
};

describe("speed store", () => {
	it("starts at 1x with default pitch and bounds", () => {
		assert.deepEqual(createSpeedStore(fakeStorage()).get(), defaults);
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
		assert.equal(restored.get().pitchSemitones, 0);
		assert.deepEqual(restored.get().bounds, { min: 0.5, max: 3, step: 0.1 });
	});

	it("writes to the new versioned key", () => {
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

	it("migrates settings from the old Playback Speed key", () => {
		const legacy = JSON.stringify({ speed: 1.5, pitchShifts: true, bounds: { min: 0.5, max: 2, step: 0.05 } });
		const store = createSpeedStore(fakeStorage(undefined, legacy));
		assert.equal(store.get().speed, 1.5);
		assert.equal(store.get().pitchShifts, true);
		assert.deepEqual(store.get().bounds, { min: 0.5, max: 2, step: 0.05 });
		assert.equal(store.get().presetId, null);
	});

	it("ignores corrupt or unrelated storage", () => {
		for (const raw of ["{not json", "[]", "null", JSON.stringify({ speed: "fast", pitchShifts: "yes" })]) {
			const store = createSpeedStore(fakeStorage(raw));
			assert.equal(store.get().speed, 1, raw);
			assert.equal(store.get().pitchShifts, false, raw);
		}
	});

	it("keeps pitch shift and pitch-follows-speed mutually exclusive", () => {
		const store = createSpeedStore(fakeStorage());
		store.setPitchShifts(true);
		assert.deepEqual([store.get().pitchShifts, store.get().pitchSemitones], [true, 0]);

		store.setPitchSemitones(3);
		assert.deepEqual([store.get().pitchShifts, store.get().pitchSemitones], [false, 3]);

		store.setPitchShifts(true);
		assert.deepEqual([store.get().pitchShifts, store.get().pitchSemitones], [true, 0]);

		store.setPitchSemitones(0);
		assert.equal(store.get().pitchShifts, true, "0 st leaves the current pitch mode alone");
	});

	it("clamps pitch to the ±12 semitone range", () => {
		const store = createSpeedStore(fakeStorage());
		store.setPitchSemitones(40);
		assert.equal(store.get().pitchSemitones, 12);
		store.setPitchSemitones(-40);
		assert.equal(store.get().pitchSemitones, -12);
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

	it("keeps the preset active on manual changes so it can be marked dirty", () => {
		const store = createSpeedStore(fakeStorage());
		store.applyPreset(NIGHTCORE_PRESET);
		assert.equal(store.get().presetId, "nightcore");
		assert.equal(store.get().speed, 1.35);
		assert.equal(store.get().pitchShifts, true);
		assert.equal(store.get().pitchSemitones, 0);
		assert.equal(store.get().effects.reverb.enabled, false);

		store.setSpeed(1.5);
		assert.equal(store.get().presetId, "nightcore", "manual speed change keeps the preset active");

		store.applyPreset(NIGHTCORE_PRESET);
		store.clearPreset();
		assert.equal(store.get().presetId, null);
		assert.equal(store.get().speed, 1.35, "clearing keeps the applied values");
	});

	it("persists effects; editing them exits the active preset", () => {
		const storage = fakeStorage();
		const store = createSpeedStore(storage);
		store.applyPreset(NIGHTCORE_PRESET);
		store.setEffects({ ...DEFAULT_EFFECTS, reverb: { enabled: true, decay: 4, mix: 0.4 } });
		assert.equal(store.get().presetId, "nightcore");
		assert.equal(store.get().effects.reverb.decay, 4);
		assert.equal(createSpeedStore(storage).get().effects.reverb.enabled, true);
		store.reset();
		assert.equal(store.get().effects.reverb.enabled, false, "reset clears effects");
		assert.deepEqual(store.get().effects, DEFAULT_EFFECTS);
	});

	it("toggles developer mode without touching the active preset", () => {
		const store = createSpeedStore(fakeStorage());
		store.applyPreset(NIGHTCORE_PRESET);
		store.setDeveloperMode(true);
		assert.equal(store.get().developerMode, true);
		assert.equal(store.get().presetId, "nightcore");
		store.reset();
		assert.equal(store.get().developerMode, true, "reset keeps developer mode");
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

	it("resets speed, pitch and effects but keeps UI preferences", () => {
		const store = createSpeedStore(fakeStorage());
		store.setDeveloperMode(true);
		store.setBuiltinPresets(false);
		store.setSpeed(2);
		store.setPitchSemitones(4);
		store.setEffects({ ...DEFAULT_EFFECTS, bass: { enabled: true, boost: 12, sub: 5, drive: 0.4, mix: 0.8 } });
		store.reset();
		assert.deepEqual([store.get().speed, store.get().pitchSemitones, store.get().pitchShifts], [1, 0, false]);
		assert.deepEqual(store.get().effects, DEFAULT_EFFECTS);
		assert.equal(store.get().developerMode, true);
		assert.equal(store.get().builtinPresets, false);
	});
});
