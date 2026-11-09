import assert from "node:assert/strict";
import { createCipheriv } from "node:crypto";
import { describe, it } from "node:test";

import {
	createLosslessDecryptor,
	hexHead,
	isFlacHead,
	OLD_AES_MASTER_KEY_B64,
	unwrapLosslessKey,
} from "../plugins/PlaybackKit/src/losslessCrypto";

const master = Buffer.from(OLD_AES_MASTER_KEY_B64, "base64");

const wrapFixture = (key: Uint8Array, nonce: Uint8Array, iv: Uint8Array): string => {
	const plain = Buffer.concat([Buffer.from(key), Buffer.from(nonce), Buffer.alloc(8, 9)]);
	const cipher = createCipheriv("aes-256-cbc", master, Buffer.from(iv));
	cipher.setAutoPadding(false);
	return Buffer.concat([Buffer.from(iv), cipher.update(plain), cipher.final()]).toString("base64");
};

describe("TIDAL lossless crypto", () => {
	it("unwraps the per-track key and nonce", () => {
		const key = Uint8Array.from({ length: 16 }, (_, index) => index);
		const nonce = Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8]);
		const iv = Uint8Array.from({ length: 16 }, (_, index) => 255 - index);
		const token = wrapFixture(key, nonce, iv);
		const unwrapped = unwrapLosslessKey(token);
		assert.deepEqual(Array.from(unwrapped.key), Array.from(key));
		assert.deepEqual(Array.from(unwrapped.nonce), Array.from(nonce));
	});

	it("rejects malformed tokens", () => {
		assert.throws(() => unwrapLosslessKey("not-base64"));
		assert.throws(() => unwrapLosslessKey(Buffer.alloc(20).toString("base64")));
	});

	it("decrypts a stream across chunk boundaries and finds fLaC", () => {
		const key = Uint8Array.from({ length: 16 }, (_, index) => index + 1);
		const nonce = Uint8Array.from([9, 8, 7, 6, 5, 4, 3, 2]);
		const payload = Buffer.concat([Buffer.from("fLaC"), Buffer.alloc(1000, 7)]);
		const cipher = createCipheriv("aes-128-ctr", Buffer.from(key), Buffer.concat([Buffer.from(nonce), Buffer.alloc(8)]));
		const encrypted = Buffer.concat([cipher.update(payload), cipher.final()]);

		assert.equal(isFlacHead(encrypted), false, "encrypted bytes should not look like FLAC");

		const decryptor = createLosslessDecryptor(key, nonce);
		const out = Buffer.concat([decryptor.update(encrypted.subarray(0, 5)), decryptor.update(encrypted.subarray(5))]);
		assert.deepEqual(out, payload);
		assert.equal(isFlacHead(out), true);
		assert.equal(hexHead(out), "66 4c 61 43 07 07 07 07");
	});
});
