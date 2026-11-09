# Native shadow player (design)

Date: 2026-11-09
Status: proposed
Author: controller

## Intent

Make Playback Kit's speed/pitch/effects work while TIDAL plays through its native
lossless player (`TIDALPlayer.exe`). Today the renderer never sees native audio:
the player process fetches, decrypts and decodes FLAC itself and renders through
WASAPI. The only renderer-visible artefact is the JSON `media.load` command in
the Electron main process.

Constraints from the user:

- no external drivers (VB-Cable, Voicemeeter);
- no external binaries/tools (Frida, DLL injectors);
- keep it self-contained in the plugin;
- effects must apply to lossless playback, not force the 320 kbps browser path.

The accepted trade-off is one extra download + FLAC decode per track, in
exchange for keeping TIDAL's queue, clock, seek and device handling intact.

## Goals

- On the native player, when effects or pitch are active, hear the processed
  stream instead of the unprocessed native output.
- Keep TIDAL's UI/clock authoritative: progress, pause/resume, seek, next/prev,
  preload and completion keep working.
- Fail open: if anything goes wrong (fetch, key unwrap, decode, mute), restore
  native audio and report the reason in diagnostics.
- No new trusted native capabilities beyond what the config module already
  requests (`electron`, `fs`); decryption uses Node `crypto`, which Luna
  whitelists.

## Non-goals (v1)

- Changing speed on the native player (time-stretch); native speed stays 1×.
- Mirroring TIDAL's selected output device / exclusive mode. The shadow output
  uses the Web Audio default sink.
- MQA rendering, gapless sample accuracy, HiRes bit-perfect passthrough.
- Download caching across sessions (memory only).

## Architecture

```
TIDAL UI --JSON--> Electron main --JSON--> TIDALPlayer.exe (clock, muted)
                       |                        |
                       | media.load url+key     | decrypt+FLAC+WASAPI
                       v                        v
              nativeBridge.native.ts        (silent)
                 fetch + AES-CTR decrypt
                       |
                       | decrypted FLAC chunks (IPC)
                       v
              renderer shadowPlayer.ts
                 decodeAudioData -> AudioBufferSource
                       |
                       v
              existing audioEngine chain (pitch -> EQ -> bass -> 8D -> delay -> reverb)
                       |
                       v
                    default output
```

### 1. Lossless crypto (`losslessCrypto.ts`, pure)

TIDAL `OLD_AES` lossless format, confirmed against the `TIDALPlayer.exe`
strings (master key `UIlTTEM…`) and existing clients:

- `keyId` is base64: `iv = token[0..16]`, `wrapped = token[16..]`.
- `plain = AES-256-CBC-decrypt(masterKey, iv, wrapped, no padding)`.
- `key = plain[0..16]`, `nonce = plain[16..24]`.
- stream = AES-128-CTR with counter = `nonce || 00*8`, big-endian, starting at 0.
- decrypted bytes start with `fLaC`.

Functions: `unwrapLosslessKey(encryptionKeyB64)`, `createLosslessDecryptor(key,
nonce)` with per-chunk `update()`, `verifyFlacHead(bytes)`.

Tested with a synthetic fixture (wrap a random key/nonce, encrypt a FLAC-like
payload, decrypt, compare). This proves the counter convention, not TIDAL's
server.

### 2. Native bridge (`nativeBridge.native.ts`, main)

Extends the existing probe (new file, probe stays for diagnostics):

- `startBridge()` / `stopBridge()`: listen on `player.message`, record the last
  `media.load`/`media.preload` (url + encryptionKey kept in main only).
- `prepareLastLoad()`: start downloading the recorded load URL, decrypt with
  `losslessCrypto`, verify `fLaC`; expose `{ id, state, bytes, total,
  decrypted, error }`.
- `readTrack(id, offset, length)`: returns a `Uint8Array` chunk over the Luna
  IPC bridge (structured clone).
- `releaseTrack(id)`: free memory.
- `captureStatus()`: one call returning the last command descriptor (redacted),
  download progress, decrypt status, head magic, and whether `fLaC` was found.
  Used by diagnostics.
- One track kept at a time, plus one prefetched; cap total memory (e.g. 250 MB)
  and drop the oldest.
- Download: single streaming GET (no Range) from offset 0, so the CTR state is
  continuous. Abort if `content-length` is missing and bytes exceed the cap.
- Trust: `electron` prompt once per build; `crypto`/`fetch` need no trust.

### 3. Renderer shadow player (`shadowPlayer.ts`)

State machine per load:

1. `idle`: no shadow source.
2. `preparing`: native audio is still audible; main downloads/decrypts.
3. `ready`: decode the FLAC into an `AudioBuffer` (one decode, off the main
   thread as much as `decodeAudioData` allows).
4. `playing` / `paused`: an `AudioBufferSourceNode` connected to
   `audioEngine.chainIn`; native session muted.
5. `failed`: restore native volume, log reason, wait for the next load.

Sync loop (250 ms):

- native position comes from the existing `getActualPosition()`;
- our position = `ctx.currentTime - startedAt + startOffset`;
- if `|ours - native| > 0.25 s`, restart the source at the native position;
- playback state comes from `playbackControls.playbackState`;
- seek is inferred from a jump > 1 s; restart at the new position.

Mute:

- send `media.volume 0` through a `NativePlayerComponent.Player()` instance;
- re-apply every 1 s while the shadow is active (TIDAL resets volume on track
  changes);
- restore `desiredVolumeLevel` (read from Redux, fall back to 1) on disable,
  failure or unload;
- if the native output is exclusive, volume control may hit the endpoint; if
  the native player reports `deviceVolumeNotSupported`, disable the shadow and
  warn. (Exclusive detection is best-effort in v1.)

Activation:

- only when `playerKind === "native"`;
- only when `hasAudibleEffects(effects) || pitchSemitones !== 0`;
- gated by a new `settings.nativeEffects` toggle (default true for existing
  users? see Open questions) and disabled if the bridge reports failure;
- prefetch on `media.preload` so the next track is ready before `media.load`.

### 4. Audio engine

Add `connectSource(node: AudioNode)` / `disconnectSource(node)` to
`audioEngine.ts`, connecting to `chainIn`. The graph stays the single owner;
shadow sources are not MediaElementSources.

### 5. UI

- Settings: toggle "Apply effects to the native player (experimental)" with a
  short note about the extra download.
- Popover: when on native and the toggle is off, the existing native warning
  gains an "Enable native effects" button that flips the setting.
- Diagnostics: `shadow` block with load descriptor, download/decrypt status,
  head magic, `flac` boolean, decode duration, source state, mute state, last
  sync error.

## Failure handling

- fetch non-2xx / key unwrap / not `fLaC` / decode error → never mute; report.
- mute fails → stop shadow, keep native audio, report.
- native player kind changes away from native → stop shadow, restore volume.
- plugin unload / live reload → stop source, restore volume, release tracks.
- TIDAL pause/resume/seek while preparing → when ready, join at the current
  native position.

## Performance

- one extra 55 MB download per HiRes track, prefetched during the previous
  track when possible;
- one extra FLAC decode (~1–3 % of a core);
- decoded AudioBuffer memory ~100–300 MB for a long HiRes track; cap and drop
  the previous track when the new one is ready;
- no extra work when effects and pitch are off.

## Testing

- unit: key unwrap + CTR fixture, FLAC head verify, sync/position math,
  activation predicate, mute restore value;
- typecheck/build;
- jsdom full-bundle load;
- local native harness: fake IPC `media.load`, local HTTP server serving a
  synthetic encrypted FLAC, assert download/decrypt/read chunks;
- manual: TIDAL HiRes track, verify processed audio, seek, pause, next track,
  disable → native volume restored.

## Open questions / calls

- Default of `nativeEffects`: **on** when the native player is first detected
  (the user explicitly wants effects on native); a popover warning still
  explains the extra download. If it causes trouble, it can be turned off.
- Prefetch depth: **one** next track; drop it if memory > 250 MB.
- Speed on native: **out of scope**; speed UI remains disabled on native.
- Output device: **default sink**; documented limitation.
