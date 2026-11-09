import { createDecipheriv } from "node:crypto";

/**
 * TIDAL's lossless ("OLD_AES") stream format.
 *
 * The native player receives a `keyId` with `media.load`. It is base64:
 *   iv       = token[0..16]
 *   wrapped  = token[16..]
 *   plain    = AES-256-CBC(masterKey, iv, wrapped, no padding)
 *   key      = plain[0..16]
 *   nonce    = plain[16..24]
 *
 * The CDN file is AES-128-CTR encrypted with `key` and a 128-bit counter that
 * starts at nonce || 00*8. Decryption state must be continuous across chunks.
 *
 * The master key is the same literal embedded in TIDALPlayer.exe (also used by
 * existing TIDAL clients). If TIDAL rotates it, `unwrapLosslessKey` fails and
 * the shadow player falls back to native audio.
 */
export const OLD_AES_MASTER_KEY_B64 = "UIlTTEMmmLfGowo/UC60x2H45W6MdGgTRfo/umg4754=";

export interface LosslessKey {
	key: Uint8Array;
	nonce: Uint8Array;
}

export interface LosslessDecryptor {
	update(chunk: Uint8Array): Uint8Array;
	destroy(): void;
}

/** Unwraps the per-track key/nonce. Throws on malformed input or a bad master key. */export const unwrapLosslessKey = (encryptionKeyB64: string, masterKeyB64: string = OLD_AES_MASTER_KEY_B64): LosslessKey => {
	const token = Buffer.from(encryptionKeyB64, "base64");
	if (token.length < 32 || (token.length - 16) % 16 !== 0) throw new Error("encryption key is not an OLD_AES token");
	const master = Buffer.from(masterKeyB64, "base64");
	if (master.length !== 32) throw new Error("invalid master key length");

	const decipher = createDecipheriv("aes-256-cbc", master, token.subarray(0, 16));
	decipher.setAutoPadding(false);
	const plain = Buffer.concat([decipher.update(token.subarray(16)), decipher.final()]);
	if (plain.length < 24) throw new Error("unwrapped key is too short");
	return { key: new Uint8Array(plain.subarray(0, 16)), nonce: new Uint8Array(plain.subarray(16, 24)) };
};

/** AES-128-CTR decryptor. Call `update` with sequential chunks from offset 0. */
export const createLosslessDecryptor = (key: Uint8Array, nonce: Uint8Array): LosslessDecryptor => {
	if (key.length !== 16) throw new Error("lossless key must be 16 bytes");
	if (nonce.length !== 8) throw new Error("lossless nonce must be 8 bytes");
	const counter = new Uint8Array(16);
	counter.set(nonce, 0);
	const decipher = createDecipheriv("aes-128-ctr", key, counter);
	return {
		update(chunk: Uint8Array): Uint8Array {
			return new Uint8Array(decipher.update(chunk));
		},
		destroy(): void {
			decipher.destroy();
		},
	};
};

/** A decrypted native stream is a raw FLAC file. */
export const isFlacHead = (bytes: Uint8Array): boolean =>
	bytes.length >= 4 && bytes[0] === 0x66 && bytes[1] === 0x4c && bytes[2] === 0x61 && bytes[3] === 0x43;

export const hexHead = (bytes: Uint8Array, count = 8): string =>
	Array.from(bytes.subarray(0, count))
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join(" ");
