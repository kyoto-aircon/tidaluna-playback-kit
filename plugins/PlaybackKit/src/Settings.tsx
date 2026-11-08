import React from "react";

import { LunaButton, LunaButtonSetting, LunaSetting, LunaSettings, LunaSwitchSetting, LunaTextSetting } from "@luna/ui";

import { runAudioSelfTest } from "./audioSelfTest";
import { parseConfig, serializeConfig } from "./config";
import { exportConfig, getConfigPath, importConfig, readConfig, revealConfig, writeConfig } from "./config.native";
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

const buttonRow = { display: "flex", gap: 8, marginLeft: "auto", alignItems: "center" } as const;

export const Settings = () => {
	const [settings, setSettings] = React.useState(speedStore.get);
	const [presets, setPresets] = React.useState(presetStore.get);
	const [copyStatus, setCopyStatus] = React.useState("Copy diagnostics");
	const [configPath, setConfigPath] = React.useState("Resolving…");
	const [configStatus, setConfigStatus] = React.useState("");
	const [renaming, setRenaming] = React.useState<{ id: string; name: string; value: string } | null>(null);
	const [testing, setTesting] = React.useState(false);
	const [selfTestStatus, setSelfTestStatus] = React.useState("Attaches the playing element, measures captured RMS and reports blocked/silent reasons. May silence playback if capture fails; restart TIDAL to undo.");

	React.useEffect(() => speedStore.subscribe(setSettings), []);
	React.useEffect(
		() =>
			presetStore.subscribe(() => {
				setPresets(presetStore.get());
			}),
		[],
	);
	React.useEffect(() => {
		getConfigPath()
			.then(setConfigPath)
			.catch(() => setConfigPath("unavailable"));
	}, []);
	React.useEffect(() => {
		if (copyStatus === "Copy diagnostics") return;
		const timer = setTimeout(() => setCopyStatus("Copy diagnostics"), 1800);
		return () => clearTimeout(timer);
	}, [copyStatus]);
	React.useEffect(() => {
		if (configStatus === "") return;
		const timer = setTimeout(() => setConfigStatus(""), 4000);
		return () => clearTimeout(timer);
	}, [configStatus]);

	const { bounds, pitchShifts, developerMode } = settings;

	const applyConfigJson = async (json: string): Promise<boolean> => {
		const config = parseConfig(json);
		if (config === undefined) return false;
		speedStore.replace(config.settings);
		presetStore.replace(config.presets);
		await writeConfig(serializeConfig(config.settings, config.presets));
		return true;
	};

	const handleImport = async (): Promise<void> => {
		try {
			const picked = await importConfig();
			if (picked === null) return setConfigStatus("Import cancelled");
			const ok = await applyConfigJson(picked.json);
			setConfigStatus(ok ? `Imported ${picked.path}` : "Import failed: invalid config");
		} catch (err) {
			setConfigStatus(`Import failed: ${String(err)}`);
		}
	};

	const handleExport = async (): Promise<void> => {
		try {
			const path = await exportConfig(serializeConfig(speedStore.get(), presetStore.get()));
			setConfigStatus(path === null ? "Export cancelled" : `Exported ${path}`);
		} catch (err) {
			setConfigStatus(`Export failed: ${String(err)}`);
		}
	};

	const handleReload = async (): Promise<void> => {
		try {
			const raw = await readConfig();
			if (raw === null) return setConfigStatus("Config file not found");
			const ok = await applyConfigJson(raw);
			setConfigStatus(ok ? "Reloaded from config file" : "Reload failed: invalid config");
		} catch (err) {
			setConfigStatus(`Reload failed: ${String(err)}`);
		}
	};

	const overwritePreset = (preset: PlaybackPreset): void => {
		if (!window.confirm(`Overwrite "${preset.name}" with the current speed and pitch?`)) return;
		presetStore.update(preset.id, { speed: settings.speed, pitchShifts: settings.pitchShifts, pitchSemitones: settings.pitchSemitones });
		setConfigStatus(`Updated "${preset.name}"`);
	};

	const removePreset = (preset: PlaybackPreset): void => {
		if (!window.confirm(`Delete preset "${preset.name}"?`)) return;
		presetStore.remove(preset.id);
		setConfigStatus(`Deleted "${preset.name}"`);
	};

	return (
		<>
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
				<LunaSwitchSetting
					title="Developer mode"
					desc="Write diagnostics logs and show the Copy diagnostics action. Off by default."
					checked={developerMode}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => speedStore.setDeveloperMode(e.target.checked)}
				/>
				<LunaButtonSetting title="Reset speed" desc="Return to 1.00× with no pitch change." children="Reset" onClick={() => speedStore.reset()} />
				{developerMode && (
					<LunaSetting title="Audio engine self-test" desc={selfTestStatus}>
						<div style={buttonRow}>
							<LunaButton
								size="small"
								variant="outlined"
								disabled={testing}
								onClick={async () => {
									setTesting(true);
									try {
										const result = await runAudioSelfTest();
										setSelfTestStatus(
											result.ok
												? `OK · ${result.context} · rms ${result.rms} · peak ${result.peak} · Δ${result.progressionSeconds}s`
												: `Failed · ${result.reason ?? "unknown"} · context ${result.context}`,
										);
									} finally {
										setTesting(false);
									}
								}}
							>
								{testing ? "Testing…" : "Run test"}
							</LunaButton>
						</div>
					</LunaSetting>
				)}
				{developerMode && (
					<LunaButtonSetting
						title="Diagnostics"
						desc="Copy the player, pitch-engine, theme and media state plus recent logs."
						children={copyStatus}
						onClick={async () => {
							setCopyStatus("Copying…");
							const copied = await copyReport(speedStore.get());
							setCopyStatus(copied ? "Copied" : "Copy failed");
						}}
					/>
				)}
			</LunaSettings>

			<LunaSettings title="Presets" desc="Nightcore is built in; custom presets can be renamed, updated, reordered and deleted.">
				{presets.map((preset, index) => (
					<LunaSetting key={preset.id} title={preset.name} desc={describePreset(preset)}>
						<div style={buttonRow}>
							{preset.builtin === true ? (
								<span style={{ fontSize: 12, opacity: 0.6 }}>Built-in</span>
							) : (
								<>
									<LunaButton size="small" variant="outlined" onClick={() => setRenaming({ id: preset.id, name: preset.name, value: preset.name })}>
										Rename
									</LunaButton>
									<LunaButton size="small" variant="outlined" onClick={() => overwritePreset(preset)}>
										Update
									</LunaButton>
									<LunaButton size="small" variant="outlined" disabled={index <= 1} onClick={() => presetStore.move(preset.id, -1)}>
										↑
									</LunaButton>
									<LunaButton size="small" variant="outlined" disabled={index >= presets.length - 1} onClick={() => presetStore.move(preset.id, 1)}>
										↓
									</LunaButton>
									<LunaButton size="small" variant="outlined" color="error" onClick={() => removePreset(preset)}>
										Delete
									</LunaButton>
								</>
							)}
						</div>
					</LunaSetting>
				))}
				{renaming !== null && (
					<>
						<LunaTextSetting
							title={`Rename ${renaming.name}`}
							defaultValue={renaming.value}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRenaming({ ...renaming, value: e.target.value })}
						/>
						<LunaSetting title=" ">
							<div style={buttonRow}>
								<LunaButton
									size="small"
									onClick={() => {
										presetStore.rename(renaming.id, renaming.value);
										setRenaming(null);
									}}
								>
									Save name
								</LunaButton>
								<LunaButton size="small" variant="outlined" onClick={() => setRenaming(null)}>
									Cancel
								</LunaButton>
							</div>
						</LunaSetting>
					</>
				)}
			</LunaSettings>

			<LunaSettings title="Config file" desc="The JSON file is the source of truth and can be edited outside Luna. Backup by copying it.">
				<LunaSetting title="Path" desc={configPath} />
				<LunaSetting title="File actions" desc={configStatus === "" ? "Changes are saved automatically, 300 ms after the last change." : configStatus}>
					<div style={buttonRow}>
						<LunaButton size="small" variant="outlined" onClick={() => void revealConfig()}>
							Show folder
						</LunaButton>
						<LunaButton size="small" variant="outlined" onClick={() => void handleReload()}>
							Reload
						</LunaButton>
						<LunaButton size="small" variant="outlined" onClick={() => void handleImport()}>
							Import…
						</LunaButton>
						<LunaButton size="small" variant="outlined" onClick={() => void handleExport()}>
							Export…
						</LunaButton>
					</div>
				</LunaSetting>
			</LunaSettings>
		</>
	);
};
