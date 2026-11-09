import React from "react";

import { LunaButton, LunaButtonSetting, LunaSetting, LunaSettings, LunaSwitchSetting, LunaTextSetting } from "@luna/ui";

import { runAudioSelfTest } from "./audioSelfTest";
import { parseConfig, serializeConfig } from "./config";
import { exportConfig, getConfigPath, importConfig, readConfig, revealConfig, writeConfig } from "./config.native";
import { copyReport, copyText } from "./debug";
import { describeEffects, EQ_BANDS } from "./effectsSettings";
import { EqSliders } from "./EqSliders";
import { formatSemitones } from "./pitch";
import { presetStore, type PlaybackPreset } from "./presets";
import { formatSpeed } from "./speed";
import { speedStore } from "./state";

const parsePositive = (raw: string): number | undefined => {
	const value = Number(raw.trim().replace(",", "."));
	return Number.isFinite(value) && value > 0 ? value : undefined;
};

const parseNumber = (raw: string): number | undefined => {
	const value = Number(raw.trim().replace(",", "."));
	return Number.isFinite(value) ? value : undefined;
};

const describePreset = (preset: PlaybackPreset): string => {
	const pitch = preset.pitchShifts ? "pitch follows speed" : preset.pitchSemitones === 0 ? "pitch preserved" : `pitch ${formatSemitones(preset.pitchSemitones)} st`;
	return `${formatSpeed(preset.speed)}× · ${pitch} · ${describeEffects(preset.effects)}`;
};

const actions = { display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 6, marginLeft: "auto" } as const;

const Section = ({ children }: { children: React.ReactNode }) => <div style={{ marginBottom: 16 }}>{children}</div>;

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
	React.useEffect(() => presetStore.subscribe(() => setPresets(presetStore.get())), []);
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

	const { bounds, pitchShifts, developerMode, effects } = settings;

	const setEq = (patch: Partial<typeof effects.eq>) => speedStore.setEffects({ ...effects, eq: { ...effects.eq, ...patch } });
	const setDelay = (patch: Partial<typeof effects.delay>) => speedStore.setEffects({ ...effects, delay: { ...effects.delay, ...patch } });
	const setReverb = (patch: Partial<typeof effects.reverb>) => speedStore.setEffects({ ...effects, reverb: { ...effects.reverb, ...patch } });

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
		if (!window.confirm(`Overwrite "${preset.name}" with the current speed, pitch and effects?`)) return;
		presetStore.update(preset.id, {
			speed: settings.speed,
			pitchShifts: settings.pitchShifts,
			pitchSemitones: settings.pitchSemitones,
			effects: settings.effects,
		});
		setConfigStatus(`Updated "${preset.name}"`);
	};

	const removePreset = (preset: PlaybackPreset): void => {
		if (!window.confirm(`Delete preset "${preset.name}"?`)) return;
		presetStore.remove(preset.id);
		setConfigStatus(`Deleted "${preset.name}"`);
	};

	return (
		<div style={{ paddingBottom: 8 }}>
			<Section>
				<LunaSettings title="Playback" desc="Speed and pitch. Effects live in their own section below.">
					<LunaTextSetting
						title="Minimum speed"
						desc="Below 0.0625× Chromium plays at its floor."
						defaultValue={formatSpeed(bounds.min)}
						inputProps={{ inputMode: "decimal" }}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const value = parsePositive(e.target.value);
							if (value !== undefined) speedStore.setBounds({ min: value });
						}}
					/>
					<LunaTextSetting
						title="Maximum speed"
						defaultValue={formatSpeed(bounds.max)}
						inputProps={{ inputMode: "decimal" }}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const value = parsePositive(e.target.value);
							if (value !== undefined) speedStore.setBounds({ max: value });
						}}
					/>
					<LunaTextSetting
						title="Snap step"
						desc="Slider snapping and the − / + step size."
						defaultValue={formatSpeed(bounds.step)}
						inputProps={{ inputMode: "decimal" }}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const value = parsePositive(e.target.value);
							if (value !== undefined) speedStore.setBounds({ step: value });
						}}
					/>
					<LunaSwitchSetting
						title="Pitch follows speed"
						desc="Chipmunk / slow-mo. Clears any custom pitch shift."
						checked={pitchShifts}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => speedStore.setPitchShifts(e.target.checked)}
					/>
					<LunaSetting title="Reset" desc="Back to 1.00×, no pitch shift, effects unchanged.">
						<div style={actions}>
							<LunaButton size="small" variant="outlined"  onClick={() => speedStore.reset()}>
								Reset playback
							</LunaButton>
						</div>
					</LunaSetting>
				</LunaSettings>
			</Section>

			<Section>
				<LunaSettings title="Presets" desc="Capture speed, pitch and effects. Nightcore is fixed; custom presets can be applied, renamed, updated, reordered and deleted.">
					{presets.map((preset, index) => (
						<LunaSetting key={preset.id} title={preset.name} desc={describePreset(preset)}>
							<div style={actions}>
								{settings.presetId === preset.id ? (
									<span style={{ fontSize: 12, opacity: 0.7 }}>Active</span>
								) : (
									<LunaButton size="small" onClick={() => speedStore.applyPreset(preset)}>
										Use
									</LunaButton>
								)}
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
										<LunaButton size="small" variant="text" disabled={index <= 1} title="Move up" onClick={() => presetStore.move(preset.id, -1)}>
											↑
										</LunaButton>
										<LunaButton size="small" variant="text" disabled={index >= presets.length - 1} title="Move down" onClick={() => presetStore.move(preset.id, 1)}>
											↓
										</LunaButton>
										<LunaButton size="small" variant="text" color="error" onClick={() => removePreset(preset)}>
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
								<div style={actions}>
									<LunaButton
										size="small"
										onClick={() => {
											presetStore.rename(renaming.id, renaming.value);
											setRenaming(null);
										}}
									>
										Save
									</LunaButton>
									<LunaButton size="small" variant="text" onClick={() => setRenaming(null)}>
										Cancel
									</LunaButton>
								</div>
							</LunaSetting>
						</>
					)}
				</LunaSettings>
			</Section>

			<Section>
				<LunaSettings title="Effects" desc="Same Web Audio chain as pitch. Needs audio capture — use the dev-mode self-test if nothing changes.">
					<LunaSwitchSetting
						title="Equalizer"
						desc="8 bands, 62 Hz to 8 kHz, ±12 dB. Drag a band; double-click resets it."
						checked={effects.eq.enabled}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEq({ enabled: e.target.checked })}
					/>
					<LunaSetting title="Bands" desc="Shift+arrow for 3 dB steps.">
						<EqSliders eq={effects.eq} disabled={!effects.eq.enabled} onChange={(bands) => setEq({ bands })} />
					</LunaSetting>
					<LunaSetting title="Flatten" desc="Set every band to 0 dB.">
						<div style={actions}>
							<LunaButton size="small" variant="outlined" disabled={!effects.eq.enabled} onClick={() => setEq({ bands: Array.from({ length: EQ_BANDS }, () => 0) })}>
								Flatten EQ
							</LunaButton>
						</div>
					</LunaSetting>
					<LunaSwitchSetting
						title="Delay"
						desc="Feedback delay."
						checked={effects.delay.enabled}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDelay({ enabled: e.target.checked })}
					/>
					<LunaTextSetting
						title="Delay time (ms)"
						defaultValue={String(Math.round(effects.delay.timeMs))}
						inputProps={{ inputMode: "numeric" }}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const value = parseNumber(e.target.value);
							if (value !== undefined) setDelay({ timeMs: Math.max(20, Math.min(2000, value)) });
						}}
					/>
					<LunaTextSetting
						title="Delay feedback (%)"
						defaultValue={String(Math.round(effects.delay.feedback * 100))}
						inputProps={{ inputMode: "numeric" }}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const value = parseNumber(e.target.value);
							if (value !== undefined) setDelay({ feedback: Math.max(0, Math.min(90, value)) / 100 });
						}}
					/>
					<LunaTextSetting
						title="Delay mix (%)"
						defaultValue={String(Math.round(effects.delay.mix * 100))}
						inputProps={{ inputMode: "numeric" }}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const value = parseNumber(e.target.value);
							if (value !== undefined) setDelay({ mix: Math.max(0, Math.min(100, value)) / 100 });
						}}
					/>
					<LunaSwitchSetting
						title="Reverb"
						desc="Generated impulse response."
						checked={effects.reverb.enabled}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReverb({ enabled: e.target.checked })}
					/>
					<LunaTextSetting
						title="Reverb decay (s)"
						defaultValue={String(effects.reverb.decay)}
						inputProps={{ inputMode: "decimal" }}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const value = parseNumber(e.target.value);
							if (value !== undefined) setReverb({ decay: Math.max(0.2, Math.min(8, value)) });
						}}
					/>
					<LunaTextSetting
						title="Reverb mix (%)"
						defaultValue={String(Math.round(effects.reverb.mix * 100))}
						inputProps={{ inputMode: "numeric" }}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const value = parseNumber(e.target.value);
							if (value !== undefined) setReverb({ mix: Math.max(0, Math.min(100, value)) / 100 });
						}}
					/>
				</LunaSettings>
			</Section>

			<Section>
				<LunaSettings title="Config file" desc="Versioned JSON, editable outside Luna. Autosaves 300 ms after changes.">
					<LunaSetting title="Path" desc={configPath}>
						<div style={actions}>
							<LunaButton size="small" variant="text" onClick={() => void copyText(configPath)}>
								Copy path
							</LunaButton>
						</div>
					</LunaSetting>
					<LunaSetting title="Actions" desc={configStatus === "" ? undefined : configStatus}>
						<div style={actions}>
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
			</Section>

			<Section>
				<LunaSettings title="Developer" desc="Logs and test tools are off unless you need to report a bug.">
					<LunaSwitchSetting
						title="Developer mode"
						desc="Write diagnostics logs and show the Copy diagnostics action."
						checked={developerMode}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => speedStore.setDeveloperMode(e.target.checked)}
					/>
					{developerMode && (
						<LunaSetting title="Audio engine self-test" desc={selfTestStatus}>
							<div style={actions}>
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
							desc="Copy player, pitch-engine, effects, theme and media state plus recent logs."
							children={copyStatus}
							onClick={async () => {
								setCopyStatus("Copying…");
								const copied = await copyReport(speedStore.get());
								setCopyStatus(copied ? "Copied" : "Copy failed");
							}}
						/>
					)}
				</LunaSettings>
			</Section>
		</div>
	);
};
