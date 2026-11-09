import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { describeStreamInfo, extractStreamInfo } from "../plugins/PlaybackKit/src/nativeStream";

describe("native stream capture", () => {
	it("extracts the stream descriptor from a TIDAL transition", () => {
		const info = extractStreamInfo(
			{
				assetPosition: 0,
				streamInfo: {
					streamUrl: "https://lgf.audio.tidal.com/mediatracks/abc/track.flac?token=super-secret",
					streamFormat: "flac",
					securityToken: "wrapped-key-material",
				},
			},
			1234,
		);
		assert.ok(info !== undefined);
		assert.equal(info?.format, "flac");
		assert.equal(info?.key, "wrapped-key-material");
		assert.equal(info?.at, 1234);

		const descriptor = describeStreamInfo(info!);
		assert.equal(descriptor?.origin, "https://lgf.audio.tidal.com");
		assert.equal(descriptor?.encrypted, true);
		const report = JSON.stringify(descriptor);
		assert.equal(report.includes("super-secret"), false);
		assert.equal(report.includes("wrapped-key-material"), false);
	});

	it("ignores objects without a usable streamInfo", () => {
		assert.equal(extractStreamInfo(null), null);
		assert.equal(extractStreamInfo({}), null);
		assert.equal(extractStreamInfo({ streamInfo: {} }), null);
		assert.equal(extractStreamInfo({ streamInfo: { streamUrl: "file:///tmp/x.flac" } }), null);
	});
});
