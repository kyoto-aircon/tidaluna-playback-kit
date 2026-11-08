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
