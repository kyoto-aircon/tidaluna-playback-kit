import type { PlaybackPreset, PresetStore } from "./presets";
import type { SpeedStore } from "./state";

const uniqueName = (presetStore: PresetStore, base: string): string => {
	const names = new Set(presetStore.get().map((preset) => preset.name));
	if (!names.has(base)) return base;
	let index = 2;
	while (names.has(`${base} ${index}`)) index += 1;
	return `${base} ${index}`;
};

/**
 * Saves the live speed/pitch/effects onto the active preset.
 * A custom preset is overwritten; a built-in becomes a new custom copy.
 */
export const saveActivePreset = (speedStore: SpeedStore, presetStore: PresetStore, preset: PlaybackPreset): PlaybackPreset | undefined => {
	const settings = speedStore.get();
	const values = {
		speed: settings.speed,
		pitchShifts: settings.pitchShifts,
		pitchSemitones: settings.pitchSemitones,
		effects: settings.effects,
	};
	if (preset.builtin === true) {
		const created = presetStore.save(uniqueName(presetStore, `${preset.name} (edited)`), values);
		if (created !== undefined) speedStore.applyPreset(created);
		return created;
	}
	presetStore.update(preset.id, values);
	return preset;
};

/** Clears an active built-in preset when built-ins are hidden. */
export const enforcePresetVisibility = (speedStore: SpeedStore, presetStore: PresetStore): void => {
	const settings = speedStore.get();
	if (settings.builtinPresets || settings.presetId === null) return;
	if (presetStore.getById(settings.presetId)?.builtin === true) speedStore.clearPreset();
};
