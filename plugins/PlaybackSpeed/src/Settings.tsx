import React from "react";

import { LunaButtonSetting, LunaSettings, LunaSwitchSetting, LunaTextSetting } from "@luna/ui";

import { formatSpeed } from "./speed";
import { speedStore } from "./state";

const parsePositive = (raw: string): number | undefined => {
	const value = Number(raw.trim().replace(",", "."));
	return Number.isFinite(value) && value > 0 ? value : undefined;
};

export const Settings = () => {
	const [settings, setSettings] = React.useState(speedStore.get);
	React.useEffect(() => speedStore.subscribe(setSettings), []);

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
				desc="Off keeps pitch natural at any speed; on makes it chipmunk / slow-mo."
				checked={pitchShifts}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => speedStore.setPitchShifts(e.target.checked)}
			/>
			<LunaButtonSetting title="Reset speed" desc="Return to 1.00×." children="Reset" onClick={() => speedStore.reset()} />
		</LunaSettings>
	);
};
