export const SPEED_CSS = `
.lunaspeed-ctl {
	display: inline-flex;
	align-items: center;
	height: 34px;
	border-radius: 9px;
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.09);
	font-family: inherit;
}
.lunaspeed-ctl button {
	margin: 0;
	padding: 0;
	border: 0;
	background: transparent;
	font-family: inherit;
	cursor: pointer;
	-webkit-appearance: none;
	appearance: none;
}
.lunaspeed-step {
	width: 26px;
	height: 32px;
	display: grid;
	place-items: center;
	border-radius: 8px;
	color: rgba(255, 255, 255, 0.55);
	font-size: 16px;
	font-weight: 500;
	line-height: 1;
}
.lunaspeed-step:hover {
	background: rgba(255, 255, 255, 0.09);
	color: #fff;
}
.lunaspeed-step:focus-visible {
	outline: 2px solid #4de3c0;
	outline-offset: -3px;
}
.lunaspeed-pill {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 6px;
	min-width: 62px;
	height: 32px;
	padding: 0 8px;
	border-radius: 7px;
	border: 1px solid transparent;
	color: #e8e9ec;
	font-size: 13px;
	font-weight: 650;
	letter-spacing: 0.01em;
	font-variant-numeric: tabular-nums;
}
.lunaspeed-pill:hover {
	background: rgba(255, 255, 255, 0.08);
}
.lunaspeed-pill:focus-visible {
	outline: 2px solid #4de3c0;
	outline-offset: -3px;
}
.lunaspeed-pill[data-active="true"] {
	color: #4de3c0;
	background: rgba(77, 227, 192, 0.14);
}
.lunaspeed-pill[data-open="true"] {
	background: rgba(255, 255, 255, 0.1);
	border-color: rgba(255, 255, 255, 0.16);
}
.lunaspeed-gauge {
	width: 13px;
	height: 13px;
	opacity: 0.55;
	flex: none;
}
.lunaspeed-pill[data-active="true"] .lunaspeed-gauge {
	opacity: 1;
}

.lunaspeed-popover {
	position: fixed;
	z-index: 2147483000;
	width: 348px;
	max-width: calc(100vw - 16px);
	box-sizing: border-box;
	padding: 18px;
	border-radius: 16px;
	border: 1px solid rgba(255, 255, 255, 0.09);
	background: #191a1e;
	color: #f2f3f5;
	font-family: inherit;
	box-shadow: 0 30px 74px rgba(0, 0, 0, 0.7), 0 1px 0 rgba(255, 255, 255, 0.05) inset;
}
.lunaspeed-popover[hidden] {
	display: none;
}
.lunaspeed-pop-head {
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: 12px;
}
.lunaspeed-pop-title {
	font-size: 11px;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: #9a9aa4;
	font-weight: 650;
}
.lunaspeed-reset {
	margin: 0;
	padding: 0;
	border: 0;
	background: transparent;
	font-family: inherit;
	font-size: 12px;
	color: #6d6d78;
	cursor: pointer;
}
.lunaspeed-reset:hover {
	color: #c9cad0;
}
.lunaspeed-readout {
	display: flex;
	align-items: flex-end;
	gap: 6px;
	margin: 10px 0 18px;
}
.lunaspeed-value {
	font-size: 42px;
	line-height: 0.95;
	font-weight: 650;
	letter-spacing: -0.035em;
	color: #4de3c0;
	font-variant-numeric: tabular-nums;
}
.lunaspeed-unit {
	font-size: 23px;
	line-height: 1.1;
	color: #4de3c0;
	opacity: 0.85;
	font-weight: 500;
}
.lunaspeed-slider {
	-webkit-appearance: none;
	appearance: none;
	display: block;
	width: 100%;
	height: 26px;
	margin: 0;
	padding: 0;
	background: transparent;
	cursor: pointer;
}
.lunaspeed-slider::-webkit-slider-runnable-track {
	height: 5px;
	border-radius: 999px;
	background: linear-gradient(
		90deg,
		#4de3c0 0%,
		#4de3c0 var(--lunaspeed-pos, 0%),
		rgba(255, 255, 255, 0.12) var(--lunaspeed-pos, 0%),
		rgba(255, 255, 255, 0.12) 100%
	);
}
.lunaspeed-slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	width: 16px;
	height: 16px;
	margin-top: -5.5px;
	border-radius: 50%;
	background: #fff;
	box-shadow: 0 0 0 4px rgba(77, 227, 192, 0.18), 0 2px 6px rgba(0, 0, 0, 0.5);
}
.lunaspeed-slider:focus-visible {
	outline: 2px solid #4de3c0;
	outline-offset: 2px;
	border-radius: 999px;
}
.lunaspeed-ticks {
	position: relative;
	height: 24px;
	margin: 6px 2px 0;
}
.lunaspeed-ticks::before {
	content: "";
	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	height: 1px;
	margin-top: -0.5px;
	background: rgba(255, 255, 255, 0.16);
}
.lunaspeed-tick {
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	font-size: 10px;
	color: #6d6d78;
	font-variant-numeric: tabular-nums;
	background: #191a1e;
	padding: 0 6px;
	line-height: 1.1;
	box-shadow: 0 0 6px 3px #191a1e;
}
.lunaspeed-tick:first-child {
	transform: translate(0, -50%);
}
.lunaspeed-tick:last-child {
	transform: translate(-100%, -50%);
}
.lunaspeed-switch-row {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-top: 12px;
	padding-top: 15px;
	border-top: 1px solid rgba(255, 255, 255, 0.09);
}
.lunaspeed-switch-label {
	flex: 1;
	font-size: 13px;
	font-weight: 600;
	color: #f2f3f5;
}
.lunaspeed-switch {
	position: relative;
	flex: none;
	width: 38px;
	height: 22px;
	padding: 0;
	border: 0;
	border-radius: 999px;
	background: rgba(255, 255, 255, 0.16);
	cursor: pointer;
	-webkit-appearance: none;
	appearance: none;
}
.lunaspeed-switch[aria-checked="true"] {
	background: #4de3c0;
}
.lunaspeed-switch::after {
	content: "";
	position: absolute;
	top: 3px;
	left: 3px;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: #fff;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
	transition: left 0.15s ease;
}
.lunaspeed-switch[aria-checked="true"]::after {
	left: 19px;
}
.lunaspeed-switch:focus-visible {
	outline: 2px solid #4de3c0;
	outline-offset: 2px;
}
`;
