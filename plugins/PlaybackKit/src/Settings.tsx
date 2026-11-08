import React from "react";

import { LunaButtonSetting, LunaSettings, LunaSwitchSetting, LunaTextSetting } from "@luna/ui";

import { copyReport } from "./debug";
import { formatSemitones } from "./pitch";
import { presetStore, type PlaybackPreset } from "./presets";
import { formatSpeed } from "./speed";
import { speedStore } from "./state";

const parsePositive = (raw: string): number | undefined => {
	const value = Number(raw.trim().replace(",", "."));
	return Number.isFinite(value) && value > 0 ? value : undefined;
};

const describePreset = (preset: PlaybackPreset): string => {
	const pitch = preset.pitchShifts ? "pitch follows speed" : preset.pitchSemitones === 0 ? "pitch preserved" : `pitch ${formatSemitones(preset.pitchSemitones)} st`;
	return `${formatSpeed(preset.speed)}× · ${pitch}${preset.builtin === true ? " · built-in" : ""}`;
};

export const Settings = () => {
	const [settings, setSettings] = React.useState(speedStore.get);
	const [presets, setPresets] = React.useState(presetStore.get);
	const [copyStatus, setCopyStatus] = React.useState("Copy diagnostics");

	React.useEffect(() => speedStore.subscribe(setSettings), []);
	React.useEffect(() => presetStore.subscribe(() => setPresets(presetStore.get())), []);
	React.useEffect(() => {
		if (copyStatus === "Copy diagnostics") return;
		const timer = setTimeout(() => setCopyStatus("Copy diagnostics"), 1800);
		return () => clearTimeout(timer);
	}, [copyStatus]);

	const { bounds, pitchShifts } = settings;

	return (
		<LunaSettings>
			<LunaTextSetting
				title="Minimum speed"
				desc="Lowest speed the slider can reach. Chromium plays anything under 0.0625× at its floor."
				defaultValue={formatSpeed(bounds.min)}
				inputProps={{ inputMode: "decimal" }}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					const value = parsePositive(e.target.value);
					if (value !== undefined) speedStore.setBounds({ min: value });
				}}
			/>
			<LunaTextSetting
				title="Maximum speed"
				desc="Highest speed the slider can reach."
				defaultValue={formatSpeed(bounds.max)}
				inputProps={{ inputMode: "decimal" }}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					const value = parsePositive(e.target.value);
					if (value !== undefined) speedStore.setBounds({ max: value });
				}}
			/>
			<LunaTextSetting
				title="Snap / step"
				desc="The slider snaps to this, and the − / + buttons move by it."
				defaultValue={formatSpeed(bounds.step)}
				inputProps={{ inputMode: "decimal" }}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					const value = parsePositive(e.target.value);
					if (value !== undefined) speedStore.setBounds({ step: value });
				}}
			/>
			<LunaSwitchSetting
				title="Pitch follows speed"
				desc="Off keeps pitch natural at any speed; on makes it chipmunk / slow-mo. Clears any custom pitch shift."
				checked={pitchShifts}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => speedStore.setPitchShifts(e.target.checked)}
			/>
			{presets.map((preset) => (
				<LunaButtonSetting
					key={preset.id}
					title={preset.name}
					desc={describePreset(preset)}
					children={preset.builtin === true ? "Built-in" : "Delete"}
					disabled={preset.builtin === true}
					onClick={() => presetStore.remove(preset.id)}
				/>
			))}
			<LunaButtonSetting title="Reset speed" desc="Return to 1.00× with no pitch change." children="Reset" onClick={() => speedStore.reset()} />
			<LunaButtonSetting
				title="Diagnostics"
				desc="Copy the player, pitch-engine and media state plus recent logs, then paste them into a bug report."
				children={copyStatus}
				onClick={async () => {
					setCopyStatus("Copying…");
					const copied = await copyReport(speedStore.get());
					setCopyStatus(copied ? "Copied" : "Copy failed");
				}}
			/>
		</LunaSettings>
	);
};
