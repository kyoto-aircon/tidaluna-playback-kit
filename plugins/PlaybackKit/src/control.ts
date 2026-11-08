import type { LunaUnload } from "@luna/core";
import { StyleTag } from "@luna/lib";

import { copyReport, debugLog, PLUGIN_VERSION } from "./debug";
import { formatSemitones, MIN_SEMITONES, MAX_SEMITONES } from "./pitch";
import type { PitchEngineState } from "./pitchEngine";
import type { PlayerKind } from "./playerKind";
import type { PlaybackPreset, PresetValues } from "./presets";
import { formatSpeed, positionToSpeed, speedLabel, speedToPosition, tickValues, type SpeedBounds } from "./speed";
import type { SpeedStore } from "./state";
import { SPEED_CSS } from "./styles";

const SLIDER_RESOLUTION = 1000;
const POPOVER_GAP = 12;
const VIEWPORT_MARGIN = 8;
const MOUNT_INTERVAL_MS = 1000;

const GAUGE_SVG = `<svg class="lunaspeed-gauge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21a9 9 0 1 1 9-9"/><path d="M12 12l5-4"/></svg>`;

const clampNumber = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const findButtonHost = (): HTMLElement | null => document.querySelector<HTMLElement>('[data-test="footer-player"] [class*="utilityButtons"]');

const qualityName = (quality: string): string => {
	switch (quality) {
		case "HI_RES_LOSSLESS":
			return "Max";
		case "HI_RES":
			return "Hi-Res";
		case "LOSSLESS":
			return "Lossless";
		case "HIGH":
			return "High";
		case "LOW":
			return "Low";
		default:
			return quality;
	}
};

export interface PresetControls {
	list: () => PlaybackPreset[];
	apply: (preset: PlaybackPreset) => void;
	clear: () => void;
	save: (name: string, values: PresetValues) => unknown;
}

export interface SpeedControlOptions {
	getPlayerKind?: () => PlayerKind;
	subscribePlayerKind?: (listener: (kind: PlayerKind) => void) => () => void;
	useBrowserPlayer?: () => void;
	previousQuality?: () => string | null;
	restoreQuality?: () => void;
	presets?: PresetControls;
	getPitchEngineState?: () => PitchEngineState;
	onOpen?: () => void;
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
	popover.setAttribute("aria-label", "Playback settings");
	popover.hidden = true;
	popover.innerHTML = `
		<div class="lunaspeed-pop-head">
			<span class="lunaspeed-pop-title">Playback</span>
			<button class="lunaspeed-reset" type="button">Reset</button>
		</div>
		<div class="lunaspeed-readout">
			<span class="lunaspeed-value">1</span><span class="lunaspeed-unit">×</span>
		</div>
		<div class="lunaspeed-presets" role="group" aria-label="Presets"></div>
		<form class="lunaspeed-save" hidden>
			<input class="lunaspeed-save-input" type="text" maxlength="24" placeholder="Preset name" aria-label="Preset name" />
			<button class="lunaspeed-save-ok" type="submit">Save</button>
			<button class="lunaspeed-save-cancel" type="button">Cancel</button>
		</form>
		<div class="lunaspeed-slider">
			<div class="lunaspeed-slider-rail"></div>
			<div class="lunaspeed-slider-fill"></div>
			<div class="lunaspeed-slider-thumb"></div>
			<input class="lunaspeed-range" type="range" min="0" max="${SLIDER_RESOLUTION}" step="1" aria-label="Playback speed slider" />
		</div>
		<div class="lunaspeed-ticks"></div>
		<div class="lunaspeed-pitch-row">
			<span class="lunaspeed-pitch-label">Pitch shift</span>
			<div class="lunaspeed-pitch">
				<button class="lunaspeed-pitch-step" type="button" data-delta="-1" aria-label="Lower pitch">−</button>
				<span class="lunaspeed-pitch-value">0 st</span>
				<button class="lunaspeed-pitch-step" type="button" data-delta="1" aria-label="Raise pitch">+</button>
			</div>
		</div>
		<div class="lunaspeed-switch-row">
			<span class="lunaspeed-switch-label">Pitch follows speed</span>
			<button class="lunaspeed-switch" type="button" role="switch" aria-checked="false" aria-label="Pitch follows speed"></button>
		</div>
		<div class="lunaspeed-lock" hidden></div>
		<div class="lunaspeed-engine" hidden></div>
		<div class="lunaspeed-warning" hidden>
			<span class="lunaspeed-warning-title">Native (lossless) player</span>
			<span class="lunaspeed-warning-text">TIDAL ignores speed and pitch here. They need the browser player.</span>
			<button class="lunaspeed-warning-action" type="button">Use browser player</button>
		</div>
		<div class="lunaspeed-quality" hidden>
			<span class="lunaspeed-quality-text">TIDAL is on High quality so speed can work.</span>
			<button class="lunaspeed-quality-action" type="button">Restore lossless</button>
		</div>
		<div class="lunaspeed-foot">
			<span class="lunaspeed-version">v${PLUGIN_VERSION}</span>
			<button class="lunaspeed-copy" type="button">Copy diagnostics</button>
		</div>`;

	const readout = popover.querySelector<HTMLElement>(".lunaspeed-value") as HTMLElement;
	const presetRow = popover.querySelector<HTMLElement>(".lunaspeed-presets") as HTMLElement;
	const saveForm = popover.querySelector<HTMLFormElement>(".lunaspeed-save") as HTMLFormElement;
	const saveInput = popover.querySelector<HTMLInputElement>(".lunaspeed-save-input") as HTMLInputElement;
	const saveCancel = popover.querySelector<HTMLButtonElement>(".lunaspeed-save-cancel") as HTMLButtonElement;
	const slider = popover.querySelector<HTMLElement>(".lunaspeed-slider") as HTMLElement;
	const range = popover.querySelector<HTMLInputElement>(".lunaspeed-range") as HTMLInputElement;
	const ticks = popover.querySelector<HTMLElement>(".lunaspeed-ticks") as HTMLElement;
	const pitchValue = popover.querySelector<HTMLElement>(".lunaspeed-pitch-value") as HTMLElement;
	const pitchSteps = [...popover.querySelectorAll<HTMLButtonElement>(".lunaspeed-pitch-step")];
	const pitchSwitch = popover.querySelector<HTMLButtonElement>(".lunaspeed-switch") as HTMLButtonElement;
	const resetButton = popover.querySelector<HTMLButtonElement>(".lunaspeed-reset") as HTMLButtonElement;
	const copyButton = popover.querySelector<HTMLButtonElement>(".lunaspeed-copy") as HTMLButtonElement;
	const lockNote = popover.querySelector<HTMLElement>(".lunaspeed-lock") as HTMLElement;
	const engineNote = popover.querySelector<HTMLElement>(".lunaspeed-engine") as HTMLElement;
	const warning = popover.querySelector<HTMLElement>(".lunaspeed-warning") as HTMLElement;
	const warningAction = popover.querySelector<HTMLButtonElement>(".lunaspeed-warning-action") as HTMLButtonElement;
	const quality = popover.querySelector<HTMLElement>(".lunaspeed-quality") as HTMLElement;
	const qualityAction = popover.querySelector<HTMLButtonElement>(".lunaspeed-quality-action") as HTMLButtonElement;

	let ticksKey = "";
	let presetsKey = "";
	let isOpen = false;
	let dragging = false;

	/** TIDAL ships design tokens (themes override them); copy them onto our detached popover. */
	const applyTheme = (): void => {
		const reference = document.querySelector<HTMLElement>('[data-test="footer-player"]') ?? document.documentElement;
		const styles = getComputedStyle(reference);
		const token = (name: string): string => styles.getPropertyValue(name).trim();
		const accent = token("--wave-color-solid-accent-fill");
		const fg = token("--wave-color-solid-contrast-fill");
		const surface = token("--wave-color-solid-base-brighter");
		const border = token("--wave-color-opacity-contrast-fill-thin");
		for (const element of [control, popover]) {
			if (accent !== "") element.style.setProperty("--lunaspeed-accent", accent);
			if (fg !== "") element.style.setProperty("--lunaspeed-fg", fg);
			if (surface !== "") element.style.setProperty("--lunaspeed-surface", surface);
			if (border !== "") element.style.setProperty("--lunaspeed-border", border);
			if (styles.fontFamily !== "") element.style.fontFamily = styles.fontFamily;
		}
	};

	const setSliderVisual = (position: number): void => {
		slider.style.setProperty("--lunaspeed-pos", String(clampNumber(position, 0, 1)));
	};

	const syncSlider = (speed: number, bounds: SpeedBounds): void => {
		const position = speedToPosition(speed, bounds);
		range.value = String(Math.round(position * SLIDER_RESOLUTION));
		setSliderVisual(position);
	};

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

	const presetName = (id: string | null): string => {
		if (id === null) return "Custom";
		return options.presets?.list().find((preset) => preset.id === id)?.name ?? "Custom";
	};

	const renderPresets = (): void => {
		const presets = options.presets;
		if (presets === undefined) {
			presetRow.hidden = true;
			saveForm.hidden = true;
			return;
		}
		const list = presets.list();
		const activeId = store.get().presetId;
		const key = `${list.map((preset) => `${preset.id}:${preset.name}`).join("|")}::${activeId ?? ""}`;
		if (key === presetsKey) return;
		presetsKey = key;

		const chips: HTMLElement[] = [];
		const custom = document.createElement("button");
		custom.type = "button";
		custom.className = "lunaspeed-preset";
		custom.textContent = "Custom";
		custom.dataset.active = String(activeId === null);
		custom.addEventListener("click", () => presets.clear());
		chips.push(custom);

		for (const preset of list) {
			const chip = document.createElement("button");
			chip.type = "button";
			chip.className = "lunaspeed-preset";
			chip.textContent = preset.name;
			chip.dataset.active = String(activeId === preset.id);
			chip.dataset.builtin = String(preset.builtin === true);
			chip.title = `${preset.name} — ${speedLabel(preset.speed)}${preset.pitchShifts ? ", pitch follows speed" : preset.pitchSemitones !== 0 ? `, ${formatSemitones(preset.pitchSemitones)} st` : ""}`;
			chip.addEventListener("click", () => presets.apply(preset));
			chips.push(chip);
		}

		const save = document.createElement("button");
		save.type = "button";
		save.className = "lunaspeed-save-toggle";
		save.textContent = "Save preset";
		save.addEventListener("click", () => {
			saveForm.hidden = !saveForm.hidden;
			if (!saveForm.hidden) saveInput.focus();
		});
		chips.push(save);

		presetRow.replaceChildren(...chips);
	};

	const renderPitch = (semitones: number, pitchShifts: boolean, locked: boolean): void => {
		pitchValue.textContent = `${formatSemitones(semitones)} st`;
		for (const button of pitchSteps) {
			const delta = Number(button.dataset.delta);
			button.disabled = locked || (delta < 0 ? semitones <= MIN_SEMITONES : semitones >= MAX_SEMITONES);
			button.title = delta < 0 ? "Lower pitch by 1 semitone" : "Raise pitch by 1 semitone";
		}
		pitchSwitch.setAttribute("aria-checked", String(pitchShifts));
		pitchSwitch.disabled = locked;
	};

	const renderEngine = (semitones: number): void => {
		if (semitones === 0 || options.getPitchEngineState === undefined) {
			engineNote.hidden = true;
			return;
		}
		const engine = options.getPitchEngineState();
		const text =
			engine.status === "running"
				? "Pitch engine: active"
				: engine.status === "waiting"
					? "Pitch engine: waiting for the audio element"
					: engine.status === "unavailable"
						? `Pitch engine: unavailable${engine.reason === undefined ? "" : ` — ${engine.reason}`}`
						: engine.status === "ready"
							? "Pitch engine: ready"
							: "Pitch engine: idle";
		engineNote.textContent = text;
		engineNote.hidden = false;
		engineNote.dataset.status = engine.status;
	};

	const renderPlayerState = (kind: PlayerKind): void => {
		warning.hidden = kind !== "native";
		const previous = options.previousQuality?.() ?? null;
		const showQuality = kind !== "native" && previous !== null;
		quality.hidden = !showQuality;
		if (showQuality && previous !== null) qualityAction.textContent = `Restore ${qualityName(previous)}`;
	};

	const render = (): void => {
		const settings = store.get();
		const { speed, pitchShifts, pitchSemitones, bounds, presetId } = settings;
		const label = speedLabel(speed);
		pillLabel.textContent = label;
		pill.dataset.active = String(speed !== 1 || pitchShifts || pitchSemitones !== 0);
		pill.title = `Playback ${label}${presetId === null ? "" : ` · ${presetName(presetId)}`}`;
		slower.setAttribute("aria-label", `Slower by ${speedLabel(bounds.step)}`);
		faster.setAttribute("aria-label", `Faster by ${speedLabel(bounds.step)}`);
		slower.title = `−${formatSpeed(bounds.step)}×`;
		faster.title = `+${formatSpeed(bounds.step)}×`;

		readout.textContent = formatSpeed(speed);
		if (!dragging) syncSlider(speed, bounds);
		range.setAttribute("aria-valuetext", label);
		renderTicks();
		renderPresets();

		const locked = presetId !== null;
		slider.dataset.locked = String(locked);
		range.disabled = locked;
		slower.disabled = locked;
		faster.disabled = locked;
		resetButton.disabled = locked;
		renderPitch(pitchSemitones, pitchShifts, locked);
		renderEngine(pitchSemitones);

		lockNote.hidden = !locked;
		if (locked) lockNote.textContent = `${presetName(presetId)} preset active — choose Custom to edit.`;

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
		isOpen = true;
		applyTheme();
		popover.hidden = false;
		pill.dataset.open = "true";
		render();
		renderPlayerState(options.getPlayerKind?.() ?? "unknown");
		positionPopover();
		options.onOpen?.();
		document.addEventListener("pointerdown", onDocumentPointerDown, true);
		document.addEventListener("keydown", onDocumentKeyDown, true);
		window.addEventListener("resize", onResize);
		debugLog("debug", "popover open");
	};

	const close = (): void => {
		if (!isOpen) return;
		isOpen = false;
		popover.hidden = true;
		delete pill.dataset.open;
		saveForm.hidden = true;
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
			applyTheme();
		}
		if (!popover.isConnected) document.body.appendChild(popover);
	};

	slower.addEventListener("click", () => store.step(-1));
	faster.addEventListener("click", () => store.step(1));
	pill.addEventListener("click", toggle);

	range.addEventListener("pointerdown", () => {
		dragging = true;
	});
	const endDrag = (): void => {
		if (!dragging) return;
		dragging = false;
		const { speed, bounds } = store.get();
		syncSlider(speed, bounds);
	};
	range.addEventListener("change", endDrag);
	window.addEventListener("pointerup", endDrag);
	window.addEventListener("pointercancel", endDrag);

	range.addEventListener("input", () => {
		if (range.disabled) return;
		const position = Number(range.value) / SLIDER_RESOLUTION;
		setSliderVisual(position);
		store.setSpeed(positionToSpeed(position, store.get().bounds));
	});

	popover.addEventListener("keydown", (event) => {
		if (store.get().presetId !== null) return;
		if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
			event.preventDefault();
			store.step(-1);
		} else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
			event.preventDefault();
			store.step(1);
		}
	});

	for (const button of pitchSteps) {
		button.addEventListener("click", () => {
			const delta = Number(button.dataset.delta);
			store.setPitchSemitones(store.get().pitchSemitones + delta);
		});
	}

	pitchSwitch.addEventListener("click", () => store.setPitchShifts(!store.get().pitchShifts));
	resetButton.addEventListener("click", () => store.reset());

	saveForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const presets = options.presets;
		if (presets === undefined) return;
		const name = saveInput.value.trim();
		if (name === "") return;
		const { speed, pitchShifts, pitchSemitones } = store.get();
		const saved = presets.save(name, { speed, pitchShifts, pitchSemitones });
		if (saved === undefined) return;
		saveInput.value = "";
		saveForm.hidden = true;
		presetsKey = "";
		renderPresets();
		debugLog("info", "preset saved", { name });
	});
	saveCancel.addEventListener("click", () => {
		saveForm.hidden = true;
		saveInput.value = "";
	});

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

	let switchTimer: ReturnType<typeof setTimeout> | undefined;
	warningAction.addEventListener("click", () => {
		if (options.useBrowserPlayer === undefined) return;
		if (switchTimer !== undefined) clearTimeout(switchTimer);
		warningAction.disabled = true;
		warningAction.textContent = "Switching…";
		options.useBrowserPlayer();
		debugLog("info", "requested browser player from warning");
		switchTimer = setTimeout(() => {
			warningAction.disabled = false;
			warningAction.textContent = "Use browser player";
		}, 2500);
	});

	qualityAction.addEventListener("click", () => {
		if (options.restoreQuality === undefined) return;
		options.restoreQuality();
		quality.hidden = true;
		debugLog("info", "restored original streaming quality");
	});

	renderPlayerState(options.getPlayerKind?.() ?? "unknown");
	const unsubscribeKind = options.subscribePlayerKind?.(renderPlayerState);
	if (unsubscribeKind !== undefined) unloads.add(unsubscribeKind);

	ensureMounted();
	applyTheme();
	render();

	unloads.add(store.subscribe(render));

	// TIDAL re-renders the footer on navigation, which drops our node. Re-mount as needed.
	const mountTimer = setInterval(ensureMounted, MOUNT_INTERVAL_MS);

	unloads.add(() => {
		clearInterval(mountTimer);
		window.removeEventListener("pointerup", endDrag);
		window.removeEventListener("pointercancel", endDrag);
		if (copyResetTimer !== undefined) clearTimeout(copyResetTimer);
		if (switchTimer !== undefined) clearTimeout(switchTimer);
		close();
		popover.remove();
		control.remove();
	});
};
