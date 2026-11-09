import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { describeHead, describeNativeCommand } from "../plugins/PlaybackKit/src/nativeProbe";

describe("native stream probe descriptors", () => {
	it("describes a media.load command without leaking the signed URL", () => {
		const raw = JSON.stringify({
			command: "media.load",
			url: "https://sp-pr-cf.audio.tidal.com/mediatracks/abc/manifest?token=super-secret&expires=1700000000",
			streamFormat: "flac",
			encryptionKey: "",
		});
		const descriptor = describeNativeCommand(raw, 1234);
		assert.ok(descriptor !== null);
		assert.equal(descriptor?.at, 1234);
		assert.equal(descriptor?.command, "media.load");
		assert.equal(descriptor?.format, "flac");
		assert.equal(descriptor?.encrypted, false);
		assert.equal(descriptor?.origin, "https://sp-pr-cf.audio.tidal.com");
		assert.deepEqual(descriptor?.queryKeys, ["expires", "token"]);
		assert.ok((descriptor?.urlLength ?? 0) > 0);
		const serialized = JSON.stringify(descriptor);
		assert.equal(serialized.includes("super-secret"), false);
	});

	it("flags encryption keys and keeps only the extension", () => {
		const descriptor = describeNativeCommand(
			JSON.stringify({
				command: "media.preload",
				url: "https://cdn.example.test/path/track.flac?x=1",
				streamFormat: "flac",
				encryptionKey: "key-material",
			}),
		);
		assert.equal(descriptor?.command, "media.preload");
		assert.equal(descriptor?.encrypted, true);
		assert.equal(descriptor?.extension, "flac");
		assert.equal(JSON.stringify(descriptor).includes("key-material"), false);
	});

	it("ignores other commands, malformed JSON and non-http URLs", () => {
		assert.equal(describeNativeCommand(JSON.stringify({ command: "media.play" })), null);
		assert.equal(describeNativeCommand("{not json"), null);
		assert.equal(describeNativeCommand(null), null);
		assert.equal(describeNativeCommand(JSON.stringify({ command: "media.load", url: "file:///secret.flac" }))?.origin, null);
	});

	it("detects raw FLAC streams from the first bytes", () => {
		const head = describeHead(new Uint8Array([0x66, 0x4c, 0x61, 0x43, 0x00, 0x00, 0x00, 0x22]));
		assert.equal(head.magic, "fLaC");
		assert.equal(head.flac, true);
		assert.equal(describeHead(new Uint8Array([0x49, 0x44, 0x33, 0x04])).flac, false);
	});
});
