# Agent notes

Single-plugin TidaLuna repo (Playback Kit). Build with `luna/buildPlugins`; the plugin lives in `plugins/PlaybackKit`.

## Commands

- `npm install`
- `npm test` — node:test through tsx (speed, pitch, presets, state, controller, time sync)
- `npm run build` — writes `dist/store.json` + `dist/kyoto-aircon.playback-kit.{mjs,json,map}`
- `npm run serve` — http-server on :3000 for the Luna dev store
- `GH_TOKEN=... npm run release` — upload `dist/*` to the mutable `latest` release

## Facts that matter

- TIDAL renders two hidden `<video id="video-one|video-two">` elements inside `#tidal-player-root` and drives them with Shaka. Speed goes through `playbackRate` / `defaultPlaybackRate` / `preservesPitch` on those elements.
- Desktop LOSSLESS/HI_RES uses `nativePlayer` (`window.NativePlayerComponent`), no media element, no rate API. `playerKind.ts` detects it; the popover offers switching to High quality (shaka) and restoring the previous quality.
- Chromium clamps effective rate to 0.0625×–16×.
- Pitch and rate-pitch are mutually exclusive in `state.ts`; a non-zero semitone offset forces `pitchShifts` off and vice versa.
- Presets: built-in `nightcore` (1.35×, pitch follows speed) cannot be removed; custom presets persist under `tidaluna.playback-kit.presets.v1`. Active `presetId` locks speed/pitch controls in the UI; any manual store setter clears it.
- Settings migration reads the old `tidaluna.playback-speed.v1` key when the new key is absent.

## Pitch engine

- `pitchEngine.ts` lazily builds `AudioContext → MediaElementSource → AudioWorkletNode → destination`.
- Worklet source is embedded as a string in `pitchWorklet.ts` and loaded from a blob URL.
- A `MediaElementSource` can only be created once per element; failures (already connected, DRM/mediaKeys) set status `unavailable` and leave audio untouched.
- Ratio 1 is a transparent passthrough; the graph is never torn down once created (disconnecting would silence audio).

## UI notes

- The popover is mounted inside the TIDAL app root (`#wimp`, falling back to body) so design tokens and fonts inherit live. CSS only references `--wave-color-*` tokens with neutral fallbacks (`currentColor`, `Canvas`, `color-mix`); never hardcode brand colours.
- Slider is a custom rail/fill/thumb with an invisible `input[type=range]`. Fill/thumb use `calc(8px + (100% - 16px) * var(--lunaspeed-pos))` so the fill ends at the thumb centre. While dragging, `render()` must not write the slider value.
- Scrubber math: TIDAL uses `latestCurrentTime + |now - sync|/1000` (1× assumption); `timeSync.ts` dispatches `playbackControls/TIME_UPDATE` every 100 ms at other rates.
- Typography: all font sizes are rem against TIDAL's 14px base (html font-size = --baseFontSize, body 1rem, --baseLineHeight); no px font sizes. The popover inherits the token line-height.
- Pitch-engine status is a dot on the Pitch shift label (detailed reason in its title/diagnostics), deliberately outside layout flow: showing it must never change the popover height while the user is clicking +/-.

## Config file

- The renderer has no filesystem access (nodeIntegration is off). File IO goes through `config.native.ts`, which Luna compiles into a main-process module and exposes as IPC proxies (build via `lunaNativePlugin`). Never import Node builtins from non-`.native` files.
- Path: `<userData>/playback-kit/config.json`; atomic write via `config.json.tmp` + rename. Created on first load when missing.
- `config.ts` holds the versioned schema (`version: 1`), validation and serialization; it reuses the store parsers so imports are sanitised exactly like local storage.
- Autosave is debounced 300 ms on both stores; imported/reloaded configs are written back. The built-in nightcore preset is implicit and must not be serialized.
- `presetStore` supports rename / update / move / replace; the built-in cannot be edited, moved or deleted.
- Native modules are sandboxed: `fs` and `electron` are not whitelisted, so Luna prompts for trust per module (cached in `luna-trust-store.enc`). Require them lazily inside functions so registration never prompts; deny means fall back to local storage. `path` is whitelisted; `process.env` is a frozen subset (APPDATA/HOME/USERPROFILE, no XDG_CONFIG_HOME) and `process.resourcesPath` is available, which is how the userData folder is derived without `electron.app`.

## Audio engine

- `audioEngine.ts` is the single graph owner: AudioContext, `chainIn -> nodes -> chainOut -> destination`, an AnalyserNode tap, and one MediaElementSource per element. Exposed as `window.__playbackKitAudio` (version 1); a future effects plugin inserts nodes and must never connect node outputs or create its own source.
- `pitchEngine.ts` is just a node in that chain (inserted at index 0); its worklet loads through `loadWorklet`.
- `audioSelfTest.ts` (dev mode only) attaches the playing element, measures captured RMS for ~1.2 s and explains silence (DRM / routed elsewhere / paused / context suspended). Attaching is permanent per element until TIDAL restarts.
- Slider feel: while dragging, `--lunaspeed-pos` follows the raw pointer position (smooth) while the stored speed snaps to the configured step. On release the thumb animates to the snapped position via the `[data-settling]` transition; `render()` must not write the slider while `dragging` is true.

## Developer mode

- `settings.developerMode` (default false) gates `debugLog`: when false the ring buffer is cleared and every call is a no-op, and both Copy diagnostics buttons are hidden. `debugLog` used to be unconditional; do not add logging that assumes it runs.
- index calls `setDiagnosticsEnabled(store.get().developerMode)` before its first log and on every store change; `reset()` keeps the flag.

## Effects

- `effectsSettings.ts` owns the schema/defaults/clamps: EQ ±12 dB shelves (200 Hz / 1 kHz peak / 4 kHz), delay 20–2000 ms, feedback 0–0.9, reverb decay 0.2–8 s, mixes 0–1.
- `effectsEngine.ts` builds one group (`insertGroup(fxIn, fxOut)`) with `eq → (dry+delay) → (dry+convolution)` and inserts it after pitch. Parameters use `setTargetAtTime`; the reverb impulse is regenerated only when decay changes by >0.05 s.
- If the context is suspended (e.g. effects enabled from config at startup), `updateEffects` does not attach and reports `audio context suspended`; the 1 s scan retries after a user gesture.
- Effects share the single MediaElementSource with the pitch shifter, so both depend on capture succeeding.
- EQ is 8 bands at 62/125/250/500/1k/2k/4k/8k Hz (lowshelf, peaking Q1.2, highshelf), stored as `eq.bands: number[8]` in dB; older `low/mid/high` configs are migrated by `normalizeBands`. UI is `EqSliders.tsx` (vertical pointer/keyboard sliders, no MUI dependency).
- Presets capture `effects` too: `save`/`update` take an `EffectsSettings` snapshot and `applyPreset` restores it. Manual setters keep `presetId`; the UI derives "dirty" with `presetMatches` and shows `*`. The single popover **Save preset** action pre-fills the active name: same name overwrites a custom preset (via `saveActivePreset`), otherwise it creates and activates a new preset; a built-in pre-fills `<name> (edited)`. There is no separate Save copy/changes button. Settings keeps its per-preset Update for custom presets. `reset()` clears the preset; nothing locks controls anymore.

## Bass boost

- Parallel send inside the effects group: `eqTail -> (dry) -> delay` and `eqTail -> lowpass 220 -> sub shelf 45 -> boost shelf 90 -> pre-gain -> tanh shaper (4x oversample) -> wet -> delay`. Wet is added to dry, not a crossfade, so mids/highs are untouched.
- `bass.boost` 0–24 dB, `bass.sub` 0–12 dB, `bass.drive` 0–1 (pre-gain 1+3·drive), `bass.mix` 0–1. A DynamicsCompressor limiter (-3 dB, 20:1) sits before the chain output for every effect.

## 8D audio

- Series stage between bass and delay. Dry path `eightDInput -> eightDDry -> eightDOut`; wet path splits L/R, feeds two 15 ms delays modulated in opposite phase by one sine LFO (stereo chorus), merges, then `StereoPanner` (second LFO) and `eightDWet` back to the output. `mix` is a dry/wet crossfade; disabled = dry 1, wet 0, pan/depth 0.
- `eightD.rate`/`pitchRate` 0.02–2 Hz, `panDepth` 0–1, `pitchDepth` 0–12 ms, `mix` 0–1.

## Release layout

- `npm run release` uploads dist/* to the mutable `latest` release **and** mirrors the same files to the `release` branch via the Git Data API.
- The public store URL is `https://raw.githubusercontent.com/kyoto-aircon/tidaluna-playback-kit/release/store.json` (raw has CORS `*`). GitHub’s `releases/download/latest` path has returned 504 across repos, so do not use it as the primary store URL.

## Built-in presets

- `BUILTIN_PRESETS` = Nightcore, Daycore, Slowcore, Chipmunk, Vaporwave, Big Bass, Submerge, 8D Orbit, Dub Echo, Clear Voice (ids `nightcore`, `daycore`, `slowcore`, `chipmunk`, `vaporwave`, `big-bass`, `submerge`, `eight-d`, `dub-echo`, `clear-voice`). They are implicit (never stored in config) and `BUILTIN_IDS` blocks rename/update/move/delete.
- `settings.builtinPresets` (default true) filters them out of the pickers via the `list` option and Settings; `enforcePresetVisibility` clears an active built-in when hidden.
