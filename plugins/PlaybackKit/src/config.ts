import { NIGHTCORE_ID, createPresetStore, type PlaybackPreset } from "./presets";
import { createSpeedStore, type SpeedSettings, type StorageLike } from "./state";

export const CONFIG_VERSION = 1;

export interface PlaybackKitConfig {
	version: number;
	settings: SpeedSettings;
	presets: PlaybackPreset[];
}

const fixedStorage = (json: string): StorageLike => ({
	getItem: () => json,
	setItem: () => undefined,
});

/** Validates a config file. Unknown versions and malformed JSON are rejected wholesale. */
export const parseConfig = (raw: string | null | undefined): PlaybackKitConfig | undefined => {
	if (raw === null || raw === undefined) return undefined;
	let parsed: unknown;
	try {
		parsed = JSON.parse(raw);
	} catch {
		return undefined;
	}
	if (typeof parsed !== "object" || parsed === null) return undefined;
	const record = parsed as Record<string, unknown>;
	if (record.version !== CONFIG_VERSION) return undefined;

	const settings = createSpeedStore(fixedStorage(JSON.stringify(record.settings ?? {}))).get();
	const presets = createPresetStore(fixedStorage(JSON.stringify(record.presets ?? [])))
		.get()
		.filter((preset) => preset.builtin !== true);

	// An active preset id that no longer exists (e.g. deleted in the edited file) falls back to custom.
	const known = new Set<string>([NIGHTCORE_ID, ...presets.map((preset) => preset.id)]);
	if (settings.presetId !== null && !known.has(settings.presetId)) settings.presetId = null;

	return { version: CONFIG_VERSION, settings, presets };
};

export const serializeConfig = (settings: SpeedSettings, presets: PlaybackPreset[]): string =>
	`${JSON.stringify(
		{
			version: CONFIG_VERSION,
			settings,
			presets: presets.filter((preset) => preset.builtin !== true),
		},
		null,
		2,
	)}\n`;
