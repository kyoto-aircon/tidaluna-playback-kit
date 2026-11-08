import type { LunaUnload } from "@luna/core";
import { StyleTag } from "@luna/lib";

import { copyReport, debugLog, PLUGIN_VERSION } from "./debug";
import type { PlayerKind } from "./playerKind";
import { formatSpeed, positionToSpeed, speedLabel, speedToPosition, tickValues } from "./speed";
import type { SpeedStore } from "./state";
import { SPEED_CSS } from "./styles";

const SLIDER_RESOLUTION = 1000;
const POPOVER_GAP = 12;
const VIEWPORT_MARGIN = 8;
const MOUNT_INTERVAL_MS = 1000;

const GAUGE_SVG = `<svg class="lunaspeed-gauge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21a9 9 0 1 1 9-9"/><path d="M12 12l5-4"/></svg>`;

const clampNumber = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const findButtonHost = (): HTMLElement | null => document.querySelector<HTMLElement>('[data-test="footer-player"] [class*="utilityButtons"]');

export interface SpeedControlOptions {
	getPlayerKind?: () => PlayerKind;
	subscribePlayerKind?: (listener: (kind: PlayerKind) => void) => () => void;
	useBrowserPlayer?: () => void;
}

export const setupSpeedControl = (unloads: Set<LunaUnload>, store: SpeedStore, options: SpeedControlOptions = {}): void => {
	new StyleTag("lunaspeed-styles", unloads, SPEED_CSS);

	const control = document.createElement("div");
	control.className = "lunaspeed-ctl";
	control.dataset.lunaspeed = "control";

	const slower = document.createElement("button");
	slower.type = "button";
	slower.className = "lunaspeed-step";
	slower.textContent = "−";
	slower.setAttribute("aria-label", "Slower");

	const pill = document.createElement("button");
	pill.type = "button";
	pill.className = "lunaspeed-pill";
	pill.setAttribute("aria-label", "Playback speed");
	pill.setAttribute("aria-haspopup", "dialog");
	pill.innerHTML = `${GAUGE_SVG}<span class="lunaspeed-pill-label"></span>`;
	const pillLabel = pill.querySelector<HTMLElement>(".lunaspeed-pill-label") as HTMLElement;

	const faster = document.createElement("button");
	faster.type = "button";
	faster.className = "lunaspeed-step";
	faster.textContent = "+";
	faster.setAttribute("aria-label", "Faster");

	control.append(slower, pill, faster);

	const popover = document.createElement("div");
	popover.className = "lunaspeed-popover";
	popover.setAttribute("role", "dialog");
	popover.setAttribute("aria-label", "Playback speed");
	popover.hidden = true;
	popover.innerHTML = `
		<div class="lunaspeed-pop-head">
			<span class="lunaspeed-pop-title">Playback speed</span>
			<button class="lunaspeed-reset" type="button">Reset</button>
		</div>
		<div class="lunaspeed-readout">
			<span class="lunaspeed-value">1</span><span class="lunaspeed-unit">×</span>
		</div>
		<input class="lunaspeed-slider" type="range" min="0" max="${SLIDER_RESOLUTION}" step="1" aria-label="Playback speed slider" />
		<div class="lunaspeed-ticks"></div>
		<div class="lunaspeed-switch-row">
			<span class="lunaspeed-switch-label">Pitch follows speed</span>
			<button class="lunaspeed-switch" type="button" role="switch" aria-checked="false" aria-label="Pitch follows speed"></button>
		</div>
		<div class="lunaspeed-warning" hidden>
			<span class="lunaspeed-warning-title">Native (lossless) player</span>
			<span class="lunaspeed-warning-text">TIDAL ignores playback speed here. Speed needs the browser player.</span>
			<button class="lunaspeed-warning-action" type="button">Use browser player</button>
		</div>
		<div class="lunaspeed-foot">
			<span class="lunaspeed-version">v${PLUGIN_VERSION}</span>
			<button class="lunaspeed-copy" type="button">Copy diagnostics</button>
		</div>`;

	const readout = popover.querySelector<HTMLElement>(".lunaspeed-value") as HTMLElement;
	const slider = popover.querySelector<HTMLInputElement>(".lunaspeed-slider") as HTMLInputElement;
	const ticks = popover.querySelector<HTMLElement>(".lunaspeed-ticks") as HTMLElement;
	const pitchSwitch = popover.querySelector<HTMLButtonElement>(".lunaspeed-switch") as HTMLButtonElement;
	const resetButton = popover.querySelector<HTMLButtonElement>(".lunaspeed-reset") as HTMLButtonElement;
	const copyButton = popover.querySelector<HTMLButtonElement>(".lunaspeed-copy") as HTMLButtonElement;
	const warning = popover.querySelector<HTMLElement>(".lunaspeed-warning") as HTMLElement;
	const warningAction = popover.querySelector<HTMLButtonElement>(".lunaspeed-warning-action") as HTMLButtonElement;

	let ticksKey = "";
	let isOpen = false;

	const renderTicks = (): void => {
		const { bounds } = store.get();
		const key = `${bounds.min}:${bounds.max}`;
		if (key === ticksKey) return;
		ticksKey = key;
		ticks.replaceChildren(
			...tickValues(bounds).map((value) => {
				const tick = document.createElement("span");
				tick.className = "lunaspeed-tick";
				tick.style.left = `${(speedToPosition(value, bounds) * 100).toFixed(3)}%`;
				tick.textContent = speedLabel(value);
				return tick;
			}),
		);
	};

	const render = (): void => {
		const { speed, pitchShifts, bounds } = store.get();
		const label = speedLabel(speed);
		pillLabel.textContent = label;
		pill.dataset.active = String(speed !== 1);
		pill.title = `Playback speed ${label}`;
		slower.setAttribute("aria-label", `Slower by ${speedLabel(bounds.step)}`);
		faster.setAttribute("aria-label", `Faster by ${speedLabel(bounds.step)}`);
		slower.title = `−${formatSpeed(bounds.step)}×`;
		faster.title = `+${formatSpeed(bounds.step)}×`;

		readout.textContent = formatSpeed(speed);
		const position = speedToPosition(speed, bounds);
		slider.value = String(Math.round(position * SLIDER_RESOLUTION));
		slider.style.setProperty("--lunaspeed-pos", `${(position * 100).toFixed(2)}%`);
		slider.setAttribute("aria-valuetext", label);
		pitchSwitch.setAttribute("aria-checked", String(pitchShifts));
		renderTicks();
		if (isOpen) positionPopover();
	};

	const positionPopover = (): void => {
		const rect = pill.getBoundingClientRect();
		const width = popover.offsetWidth || 348;
		const height = popover.offsetHeight || 240;
		const left = clampNumber(rect.left + rect.width / 2 - width / 2, VIEWPORT_MARGIN, window.innerWidth - width - VIEWPORT_MARGIN);
		let top = rect.top - height - POPOVER_GAP;
		let side: "top" | "bottom" = "top";
		if (top < VIEWPORT_MARGIN) {
			top = Math.min(rect.bottom + POPOVER_GAP, window.innerHeight - height - VIEWPORT_MARGIN);
			side = "bottom";
		}
		popover.style.left = `${Math.round(left)}px`;
		popover.style.top = `${Math.round(top)}px`;
		popover.dataset.side = side;
		const caret = clampNumber(rect.left + rect.width / 2 - left, 18, width - 18);
		popover.style.setProperty("--lunaspeed-caret", `${Math.round(caret)}px`);
	};

	const onDocumentPointerDown = (event: PointerEvent): void => {
		const target = event.target as Node | null;
		if (target === null) return;
		if (popover.contains(target) || control.contains(target)) return;
		close();
	};

	const onDocumentKeyDown = (event: KeyboardEvent): void => {
		if (event.key === "Escape") {
			event.preventDefault();
			close();
			pill.focus();
		}
	};

	const onResize = (): void => {
		if (isOpen) positionPopover();
	};

	const open = (): void => {
		if (isOpen) return;
		debugLog("debug", "popover open");
		isOpen = true;
		popover.hidden = false;
		pill.dataset.open = "true";
		render();
		positionPopover();
		document.addEventListener("pointerdown", onDocumentPointerDown, true);
		document.addEventListener("keydown", onDocumentKeyDown, true);
		window.addEventListener("resize", onResize);
	};

	const close = (): void => {
		if (!isOpen) return;
		isOpen = false;
		popover.hidden = true;
		delete pill.dataset.open;
		document.removeEventListener("pointerdown", onDocumentPointerDown, true);
		document.removeEventListener("keydown", onDocumentKeyDown, true);
		window.removeEventListener("resize", onResize);
	};

	const toggle = (): void => (isOpen ? close() : open());

	const ensureMounted = (): void => {
		if (!control.isConnected) {
			if (isOpen) close();
			const host = findButtonHost();
			if (host === null) return;
			const volume = host.querySelector<HTMLElement>('[class*="sliderContainer"]');
			if (volume !== null && volume.parentElement === host) host.insertBefore(control, volume);
			else host.appendChild(control);
		}
		if (!popover.isConnected) document.body.appendChild(popover);
	};

	slower.addEventListener("click", () => store.step(-1));
	faster.addEventListener("click", () => store.step(1));
	pill.addEventListener("click", toggle);

	slider.addEventListener("input", () => {
		const position = Number(slider.value) / SLIDER_RESOLUTION;
		store.setSpeed(positionToSpeed(position, store.get().bounds));
	});

	popover.addEventListener("keydown", (event) => {
		if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
			event.preventDefault();
			store.step(-1);
		} else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
			event.preventDefault();
			store.step(1);
		}
	});

	pitchSwitch.addEventListener("click", () => store.setPitchShifts(!store.get().pitchShifts));
	resetButton.addEventListener("click", () => store.reset());

	let copyResetTimer: ReturnType<typeof setTimeout> | undefined;
	copyButton.addEventListener("click", async () => {
		if (copyResetTimer !== undefined) clearTimeout(copyResetTimer);
		copyButton.disabled = true;
		copyButton.textContent = "Copying…";
		const copied = await copyReport(store.get());
		debugLog(copied ? "info" : "error", "diagnostics copied", { copied });
		copyButton.textContent = copied ? "Copied" : "Copy failed";
		copyResetTimer = setTimeout(() => {
			copyButton.textContent = "Copy diagnostics";
			copyButton.disabled = false;
		}, 1800);
	});

	const renderWarning = (kind: PlayerKind): void => {
		warning.hidden = kind !== "native";
	};

	let switchTimer: ReturnType<typeof setTimeout> | undefined;
	warningAction.addEventListener("click", () => {
		if (options.useBrowserPlayer === undefined) return;
		if (switchTimer !== undefined) clearTimeout(switchTimer);
		warningAction.disabled = true;
		warningAction.textContent = "Switching\u2026";
		options.useBrowserPlayer();
		debugLog("info", "requested browser player from warning");
		switchTimer = setTimeout(() => {
			warningAction.disabled = false;
			warningAction.textContent = "Use browser player";
		}, 2500);
	});

	renderWarning(options.getPlayerKind?.() ?? "unknown");
	const unsubscribeKind = options.subscribePlayerKind?.(renderWarning);
	if (unsubscribeKind !== undefined) unloads.add(unsubscribeKind);

	ensureMounted();
	render();

	unloads.add(store.subscribe(render));

	// TIDAL re-renders the footer on navigation, which drops our node. Re-mount as needed.
	const mountTimer = setInterval(ensureMounted, MOUNT_INTERVAL_MS);

	unloads.add(() => {
		clearInterval(mountTimer);
		if (copyResetTimer !== undefined) clearTimeout(copyResetTimer);
		if (switchTimer !== undefined) clearTimeout(switchTimer);
		close();
		popover.remove();
		control.remove();
	});
};
