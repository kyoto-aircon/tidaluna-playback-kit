import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { CONFIG_VERSION, parseConfig, serializeConfig } from "../plugins/PlaybackKit/src/config";
import { DEFAULT_EFFECTS } from "../plugins/PlaybackKit/src/effectsSettings";
import { NIGHTCORE_PRESET } from "../plugins/PlaybackKit/src/presets";

const settings = {
	speed: 1.35,
	pitchShifts: true,
	pitchSemitones: 0,
	presetId: "nightcore",
	developerMode: false,
	effects: DEFAULT_EFFECTS,
	bounds: { min: 0.05, max: 10, step: 0.01 },
};

const custom = { id: "custom-1", name: "Practice", speed: 1.2, pitchShifts: false, pitchSemitones: 2 };

describe("config file", () => {
	it("parses a valid config", () => {
		const parsed = parseConfig(JSON.stringify({ version: CONFIG_VERSION, settings, presets: [custom] }));
		assert.ok(parsed !== undefined);
		assert.equal(parsed?.settings.speed, 1.35);
		assert.equal(parsed?.settings.bounds.step, 0.01);
		assert.equal(parsed?.presets.length, 1);
		assert.equal(parsed?.presets[0].name, "Practice");
	});

	it("rejects bad JSON, wrong versions and non-objects", () => {
		for (const raw of ["{not json", "null", "[]", JSON.stringify({ version: 99, settings, presets: [] })]) {
			assert.equal(parseConfig(raw), undefined, raw);
		}
		assert.equal(parseConfig(null), undefined);
		assert.equal(parseConfig(undefined), undefined);
	});

	it("sanitises settings and drops the built-in preset", () => {
		const parsed = parseConfig(
			JSON.stringify({
				version: CONFIG_VERSION,
				settings: { speed: 99, pitchShifts: true, pitchSemitones: 40, bounds: { min: 0.5, max: 2, step: 0.25 } },
				presets: [NIGHTCORE_PRESET, custom],
			}),
		);
		assert.ok(parsed !== undefined);
		assert.equal(parsed?.settings.speed, 2);
		assert.equal(parsed?.settings.pitchSemitones, 12);
		assert.equal(parsed?.settings.pitchShifts, false, "non-zero semitones win over rate-pitch");
		assert.deepEqual(parsed?.presets.map((preset) => preset.id), ["custom-1"]);
	});

	it("clears an active preset id that no longer exists", () => {
		const parsed = parseConfig(JSON.stringify({ version: CONFIG_VERSION, settings: { ...settings, presetId: "gone" }, presets: [] }));
		assert.equal(parsed?.settings.presetId, null);
	});

	it("round-trips through serializeConfig", () => {
		const raw = serializeConfig(settings, [NIGHTCORE_PRESET, custom]);
		const written = JSON.parse(raw) as { presets: Array<{ id: string }> };
		assert.equal(written.presets.length, 1, "built-in is implicit");
		const parsed = parseConfig(raw);
		assert.deepEqual(parsed?.settings, settings);
		assert.equal(parsed?.presets.length, 1);
	});
});
