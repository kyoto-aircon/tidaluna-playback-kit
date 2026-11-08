# Agent notes

Single-plugin TidaLuna repo. Build with `luna/buildPlugins`; one plugin lives in `plugins/PlaybackSpeed`.

## Commands

- `npm install`
- `npm test` — node:test through tsx, covers speed maths, store and media controller
- `npm run build` — writes `dist/store.json` + `dist/kyoto-aircon.playback-speed.{mjs,json,map}`
- `npm run serve` — http-server on :3000 for the Luna dev store

## Facts that matter

- TIDAL renders two hidden `<video id="video-one|video-two">` elements inside `#tidal-player-root` and drives them with Shaka. Playback speed goes through `playbackRate` / `preservesPitch` on those elements, never through TIDAL internals.
- TIDAL resets `playbackRate` on load; the controller re-asserts it on media events and via a 1 s scan.
- The footer is `[data-test="footer-player"]`; the control is inserted into `[class*="utilityButtons"]` before the volume (`[class*="sliderContainer"]`).
- Chromium clamps effective rate to 0.0625×–16×.
- Luna loads plugin exports `unloads` and `Settings`; `dist/*.json` is the manifest carrying the build hash.

## Diagnostics

- `debug.ts` keeps a 500-entry ring buffer and mirrors to console with the `[PlaybackSpeed]` prefix.
- `window.__playbackSpeed` exposes `logs()`, `logText()`, `report()`, `copy()`, `selectors()`, `store`.
- The popover and the settings tab both have a "Copy diagnostics" action; reports include a 1.5 s currentTime progression probe and the TIDAL `activePlayer` probe. Use those first when a speed change doesn't reach the audio.

## Native player

- Desktop LOSSLESS/HI_RES plays through `nativePlayer` (`window.NativePlayerComponent`), which has no HTMLMediaElement and no rate API — element `playbackRate` is ignored there.
- `nativePlayer.ts` patches the component prototype to capture the instance and, if a `setPlaybackRate`-like member appears, drives it.
- `nativePlayer.ts` also exposes `useBrowserPlayer` via index (dispatch `settings/SET_STREAMING_QUALITY` → `HIGH`), which moves playback to shaka where rate works.
- Player kind is polled every 1.5 s; the popover shows a warning while `native`.

## UI notes

- Colours/fonts come from TIDAL design tokens (`--wave-color-solid-accent-fill`, `--wave-color-solid-contrast-fill`, `--wave-color-solid-base-brighter`, `--wave-color-opacity-contrast-fill-thin`) copied from the footer's computed style onto `.lunaspeed-ctl` and `.lunaspeed-popover`; never hardcode a theme colour.
- The slider is a custom rail/fill/thumb with an invisible `input[type=range]` on top. Fill/thumb use `calc(8px + (100% - 16px) * var(--lunaspeed-pos))` so the fill ends at the thumb centre. While dragging, `render()` must not write the slider value or it jitters.
- Switching to the browser player stores the previous streaming quality in `localStorage` (`tidaluna.playback-speed.previous-quality`) so the popover can restore it.

## Scrubber sync

- TIDAL computes the displayed position as `latestCurrentTime + |Date.now() - latestCurrentTimeSyncTimestamp|/1000`; it assumes 1x and only corrects on pause/seek.
- `timeSync.ts` dispatches `playbackControls/TIME_UPDATE` (number payload) every 100 ms while speed != 1 and playbackState is PLAYING, using the media element currentTime or activePlayer.currentTime for native.
