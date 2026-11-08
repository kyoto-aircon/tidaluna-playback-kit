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
