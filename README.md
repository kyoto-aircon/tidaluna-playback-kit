# Playback Kit for TIDAL Luna

A [TidaLuna](https://github.com/Inrixia/TidaLuna) plugin that adds speed, pitch and presets to the TIDAL desktop player.

A pill beside the volume control shows the live rate and opens a log-scaled speed slider, an independent pitch shifter, and presets — including a built-in **Nightcore** preset.

## Install

1. Remove the old **Playback Speed** plugin first (the plugin name changed, so both would run).
2. TIDAL → **Luna Settings → Plugin Store** → add:

   ```
   https://github.com/kyoto-aircon/tidaluna-playback-kit/releases/download/latest/store.json
   ```

3. Install **Playback Kit** and enable it.

## Features

- **Speed** — `−` / `+` steppers and a log-scaled slider; range and snap are configurable (defaults `0.05×` – `10×`, step `0.05×`).
- **Pitch follows speed** — rate-based chipmunk / slow-mo, YouTube-style pitch preservation by default.
- **Pitch shifter** — independent `−12…+12` semitone offset through a Web Audio worklet, with the rate untouched. Mutually exclusive with *Pitch follows speed*: turning one on turns the other off.
- **Presets** — save the current speed/pitch as a named preset, apply one with a click, delete custom ones. While a preset is active the playback controls are locked; choose **Custom** to edit again.
- **Nightcore** — the built-in preset (cannot be removed): `1.35×` with pitch following speed.
- **Theme-aware** — surfaces, text, borders, accent and font come from TIDAL's design tokens, so TidaLuna CSS themes apply.
- **Lossless fallback with a way back** — on the native player the popover explains why speed/pitch can't apply and offers **Use browser player** (High quality); it remembers your previous quality and shows **Restore …**.
- **Scrubber stays honest** — at any rate other than 1× the plugin re-feeds the real position to TIDAL so audio and progress bar don't drift.
- **Clean unload** — disabling restores `1×`, no pitch shift, and removes the UI.

## Caveats

- Chromium clamps effective playback to **0.0625× – 16×**. Speeds below `0.0625×` are selectable but play at that floor.
- TIDAL desktop plays **LOSSLESS / HI_RES through a native audio backend** with no media element or rate API. Speed and pitch need the shaka/browser player; the popover offers the switch.
- The **pitch shifter is experimental**. It needs `AudioContext.createMediaElementSource`, so it fails gracefully if TIDAL already connected the element or if the stream is DRM-protected. Status is shown in the popover and in diagnostics; audio never breaks, it just stays unshifted.
- Pitch-shift quality is a granular delay line: fine for small offsets and nightcore, artefacty at the extremes.

## Troubleshooting / diagnostics

Open the pill → **Copy diagnostics**, or use the same action in Luna settings. The report includes:

- plugin version, URL, UA, settings and active preset
- detected player kind (`native` / `shaka` / `browser`), native component API
- pitch engine status (`idle` / `waiting` / `running` / `unavailable` + reason), `mediaKeys` presence
- selector counts, every media element's state, a 1.5 s progression probe (`observedRate` vs `expectedRate`)
- scrubber UI time vs actual media time
- the last 500 log lines

DevTools exposes `window.__playbackSpeed` (`logs()`, `report()`, `copy()`, `selectors()`, `playerKind()`); console entries use the `[PlaybackKit]` prefix.

## Development

```sh
npm install
npm test          # node:test via tsx
npm run build     # dist/store.json + dist/kyoto-aircon.playback-kit.{mjs,json,map}
npm run serve     # http://127.0.0.1:3000 for live reload
GH_TOKEN=... npm run release   # publish dist/* to the mutable `latest` release
```

For a local dev loop, add `http://127.0.0.1:3000` as a store URL in Luna.

### How it works

- `src/speed.ts` — snapping, clamping, log-scale mapping, ticks.
- `src/pitch.ts` — semitone clamp, labels, `2^(n/12)` ratio.
- `src/state.ts` — persisted settings (speed, pitch mode, semitones, active preset); migrates the old Playback Speed key.
- `src/presets.ts` — built-in Nightcore + custom presets, persisted.
- `src/mediaController.ts` — sets `playbackRate` / `defaultPlaybackRate` / `preservesPitch` on TIDAL's hidden video elements and re-asserts after track loads.
- `src/pitchEngine.ts` / `src/pitchWorklet.ts` — Web Audio graph and granular pitch-shift worklet.
- `src/playerKind.ts` / `src/nativePlayer.ts` — player detection and the native backend probe.
- `src/timeSync.ts` — keeps TIDAL's scrubber aligned at non-1× rates.
- `src/control.ts` / `src/Settings.tsx` / `src/styles.ts` — pill, popover, settings, theme tokens.

## License

MIT
