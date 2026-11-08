# Playback Speed for TIDAL Luna

A [TidaLuna](https://github.com/Inrixia/TidaLuna) plugin that adds a YouTube-style playback speed control to the TIDAL desktop player.

A small pill sits beside the volume control, shows the live rate, and opens a log-scaled slider. The range and the snap increment are configured in Luna settings.

## Install

1. Open TIDAL → **Luna Settings → Plugin Store**.
2. Add this store URL:

   ```
   https://github.com/kyoto-aircon/tidaluna-playback-speed/releases/download/latest/store.json
   ```

3. Install **Playback Speed** and enable it.

## Features

- **Pill in the player bar** — sits left of the volume control, always shows the current rate (`1.35×`). Mint when the rate is not 1×.
- **`−` / `+` steppers** — move by the configured snap increment and clamp at the configured range.
- **Slider** — click the pill for a log-scaled slider: 1× near the middle, the rest of the range still reachable at both ends.
- **Range and snap in Settings** — minimum, maximum and step are configurable (defaults `0.05×` – `10×`, step `0.05×`).
- **Pitch toggle** — "Pitch follows speed" is off by default, so pitch stays natural (YouTube behaviour). Turn it on for chipmunk / slow-mo.
- **Follows the active theme** — surfaces, text, borders, accent and font are read from TIDAL's design tokens (`--wave-color-*`) and the footer's computed style, so TidaLuna CSS themes apply.
- **Lossless fallback with a way back** — on the native player the popover explains why speed can't apply and offers **Use browser player** (switches streaming quality to High). It remembers your previous quality and shows **Restore …** so you can return to the native/lossless path.
- **Persists** — rate, pitch mode and bounds survive restarts.
- **Clean unload** — disabling the plugin restores `1×` and removes its UI.

## Caveats

- Chromium's audio renderer clamps effective playback to **0.0625× – 16×**. Speeds below `0.0625×` are still selectable but play at that floor.
- TIDAL has two playback paths. The **shaka / browser player** uses hidden `<video>` elements (`#video-one`, `#video-two`), where the plugin sets `playbackRate` and `preservesPitch` and re-asserts them on track load. The **native player** — used for LOSSLESS / HI_RES on desktop — is a native audio backend with no media element and no rate API, so speed cannot be applied there. The popover detects this and shows a warning with **Use browser player**, which sets TIDAL streaming quality to High (320 kbps AAC) so playback moves to the shaka player and speed works again.
- With TIDAL's audio spectrum visualiser enabled, audio can be routed through Web Audio, which may bypass pitch preservation.

## Troubleshooting / diagnostics

If the speed doesn't change, open the pill and press **Copy diagnostics**. It copies a report containing:

- plugin version, URL, UA, settings
- selector counts for `#tidal-player-root`, the media elements and the footer
- a snapshot of every `video` / `audio` element (`readyState`, `playbackRate`, `defaultPlaybackRate`, `currentTime`, `src`, parent)
- a 1.5 s progression probe: `observedRate` vs `expectedRate` (if `observedRate` stays 0 while audio plays, TIDAL is not using these elements)
- the TIDAL `activePlayer` probe (name, methods, state) plus the last 500 log lines

Paste that into a bug report. In DevTools the same data is on `window.__playbackSpeed` (`logs()`, `report()`, `copy()`, `selectors()`), and every entry is logged to the console with the `[PlaybackSpeed]` prefix.

## Development

```sh
npm install
npm test          # node:test via tsx
npm run build     # dist/store.json + dist/kyoto-aircon.playback-speed.{mjs,json,map}
npm run serve     # http://127.0.0.1:3000 for live reload
GH_TOKEN=... npm run release   # publish dist/* to the mutable `latest` release
```

For a local dev loop, add `http://127.0.0.1:3000` as a store URL in Luna and enable the plugin.

### How it works

- `src/speed.ts` — pure speed maths: snapping, clamping, log-scale mapping, tick values.
- `src/state.ts` — persisted store (`localStorage`, key `tidaluna.playback-speed.v1`).
- `src/mediaController.ts` — attaches to `#tidal-player-root video` (TIDAL's `video-one` / `video-two`) and keeps `playbackRate` + `preservesPitch` applied.
- `src/playerKind.ts` / `src/nativePlayer.ts` — detect native vs shaka vs browser player, probe the native component and drive a native rate method if one ever appears.
- `src/control.ts` — pill, steppers and popover; mounts into `[data-test="footer-player"] [class*="utilityButtons"]`.
- `src/Settings.tsx` — Luna settings tab.

## License

MIT
