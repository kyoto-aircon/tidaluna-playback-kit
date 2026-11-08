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
- **Persists** — rate, pitch mode and bounds survive restarts.
- **Clean unload** — disabling the plugin restores `1×` and removes its UI.

## Caveats

- Chromium's audio renderer clamps effective playback to **0.0625× – 16×**. Speeds below `0.0625×` are still selectable but play at that floor.
- TIDAL plays through hidden `<video>` elements driven by Shaka. The plugin sets `playbackRate` on those elements and re-asserts it when TIDAL resets them on track load. If TIDAL falls back to its native/exclusive player, that player may ignore the element rate.
- With TIDAL's audio spectrum visualiser enabled, audio can be routed through Web Audio, which may bypass pitch preservation.

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
- `src/control.ts` — pill, steppers and popover; mounts into `[data-test="footer-player"] [class*="utilityButtons"]`.
- `src/Settings.tsx` — Luna settings tab.

## License

MIT
