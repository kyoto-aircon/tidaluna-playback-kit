import React from "react";

import { EQ_FREQUENCIES, EQ_MAX_DB, EQ_MIN_DB, type EqSettings } from "./effectsSettings";

const TRACK_HEIGHT = 132;
const RANGE = EQ_MAX_DB - EQ_MIN_DB;

const clampDb = (value: number): number => Math.max(EQ_MIN_DB, Math.min(EQ_MAX_DB, value));

const formatDb = (value: number): string => `${value > 0 ? "+" : ""}${value}`;

const formatFrequency = (frequency: number): string => (frequency >= 1000 ? `${frequency / 1000}k` : String(frequency));

const EqBand = ({
	frequency,
	value,
	disabled,
	onChange,
}: {
	frequency: number;
	value: number;
	disabled: boolean;
	onChange: (value: number) => void;
}) => {
	const trackRef = React.useRef<HTMLDivElement>(null);

	const setFromPointer = (clientY: number): void => {
		const track = trackRef.current;
		if (track === null) return;
		const rect = track.getBoundingClientRect();
		const ratio = 1 - Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
		onChange(clampDb(Math.round(EQ_MIN_DB + ratio * RANGE)));
	};

	const percent = ((value - EQ_MIN_DB) / RANGE) * 100;
	const center = ((0 - EQ_MIN_DB) / RANGE) * 100;
	const fillTop = Math.min(percent, center);
	const fillHeight = Math.abs(percent - center);

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 30, opacity: disabled ? 0.4 : 1 }}>
			<span style={{ fontSize: 10, fontVariantNumeric: "tabular-nums", color: "currentColor", opacity: 0.8 }}>{formatDb(value)}</span>
			<div
				ref={trackRef}
				role="slider"
				tabIndex={disabled ? -1 : 0}
				aria-label={`${formatFrequency(frequency)} Hz`}
				aria-valuemin={EQ_MIN_DB}
				aria-valuemax={EQ_MAX_DB}
				aria-valuenow={value}
				aria-valuetext={`${formatDb(value)} dB`}
				aria-disabled={disabled}
				onPointerDown={(event) => {
					if (disabled) return;
					event.preventDefault();
					event.currentTarget.setPointerCapture(event.pointerId);
					setFromPointer(event.clientY);
				}}
				onPointerMove={(event) => {
					if (disabled || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
					setFromPointer(event.clientY);
				}}
				onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}
				onPointerCancel={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}
				onDoubleClick={() => {
					if (!disabled) onChange(0);
				}}
				onKeyDown={(event) => {
					if (disabled) return;
					const step = event.shiftKey ? 3 : 1;
					if (event.key === "ArrowUp" || event.key === "ArrowRight") onChange(clampDb(value + step));
					else if (event.key === "ArrowDown" || event.key === "ArrowLeft") onChange(clampDb(value - step));
					else if (event.key === "Home") onChange(EQ_MIN_DB);
					else if (event.key === "End") onChange(EQ_MAX_DB);
					else return;
					event.preventDefault();
				}}
				style={{
					position: "relative",
					width: 18,
					height: TRACK_HEIGHT,
					cursor: disabled ? "default" : "pointer",
					touchAction: "none",
					outline: "none",
				}}
			>
				<div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 5, transform: "translateX(-50%)", borderRadius: 999, background: "color-mix(in srgb, currentColor 16%, transparent)" }} />
				<div style={{ position: "absolute", left: 0, right: 0, top: `${center}%`, height: 1, background: "color-mix(in srgb, currentColor 28%, transparent)" }} />
				<div
					style={{
						position: "absolute",
						left: "50%",
						width: 5,
						transform: "translateX(-50%)",
						borderRadius: 999,
						top: `${fillTop}%`,
						height: `${fillHeight}%`,
						background: "var(--wave-color-solid-accent-fill, currentColor)",
					}}
				/>
				<div
					style={{
						position: "absolute",
						left: "50%",
						top: `${percent}%`,
						width: 12,
						height: 12,
						transform: "translate(-50%, -50%)",
						borderRadius: "50%",
						background: "currentColor",
						boxShadow: "0 0 0 3px color-mix(in srgb, var(--wave-color-solid-accent-fill, currentColor) 22%, transparent), 0 1px 3px rgba(0,0,0,.5)",
					}}
				/>
			</div>
			<span style={{ fontSize: 9, opacity: 0.6, letterSpacing: "-0.02em" }}>{formatFrequency(frequency)}</span>
		</div>
	);
};

export const EqSliders = ({ eq, disabled, onChange }: { eq: EqSettings; disabled: boolean; onChange: (bands: number[]) => void }) => (
	<div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginLeft: "auto", padding: "2px 0" }}>
		{EQ_FREQUENCIES.map((frequency, index) => (
			<EqBand
				key={frequency}
				frequency={frequency}
				value={eq.bands[index] ?? 0}
				disabled={disabled}
				onChange={(value) => {
					const next = [...eq.bands];
					next[index] = value;
					onChange(next);
				}}
			/>
		))}
	</div>
);
