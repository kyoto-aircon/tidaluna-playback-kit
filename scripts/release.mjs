// Publishes the built plugin as the mutable `latest` GitHub release.
// Usage: GH_TOKEN=... npm run release
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const owner = "kyoto-aircon";
const repo = "tidaluna-playback-speed";
const tag = "latest";
const distDir = new URL("../dist/", import.meta.url).pathname;

const token = process.env.GH_TOKEN;
if (!token) {
	console.error("GH_TOKEN is required");
	process.exit(1);
}

const api = "https://api.github.com";
const headers = {
	Authorization: `Bearer ${token}`,
	Accept: "application/vnd.github+json",
	"User-Agent": "tidaluna-playback-speed-release",
};

const request = async (url, options = {}) => {
	const response = await fetch(url, { ...options, headers: { ...headers, ...(options.headers ?? {}) } });
	if (!response.ok) throw new Error(`${options.method ?? "GET"} ${url} -> ${response.status} ${await response.text()}`);
	return response.status === 204 ? undefined : response.json();
};

const findRelease = () => request(`${api}/repos/${owner}/${repo}/releases/tags/${tag}`).catch(() => undefined);

let release = await findRelease();
if (release === undefined) {
	release = await request(`${api}/repos/${owner}/${repo}/releases`, {
		method: "POST",
		body: JSON.stringify({
			tag_name: tag,
			name: tag,
			target_commitish: "main",
			make_latest: "true",
			body: [
				"Automated build of the Playback Speed plugin.",
				"",
				`Install store URL: https://github.com/${owner}/${repo}/releases/download/${tag}/store.json`,
			].join("\n"),
		}),
	});
	console.log(`Created release ${release.id}`);
}

const existing = new Map((release.assets ?? []).map((asset) => [asset.name, asset.id]));
const files = (await readdir(distDir)).filter((name) => /\.(mjs|json|map)$/.test(name));

for (const name of files) {
	const body = await readFile(join(distDir, name));
	if (existing.has(name)) {
		await request(`${api}/repos/${owner}/${repo}/releases/assets/${existing.get(name)}`, { method: "DELETE" });
	}
	await request(`https://uploads.github.com/repos/${owner}/${repo}/releases/${release.id}/assets?name=${encodeURIComponent(name)}`, {
		method: "POST",
		headers: { "Content-Type": "application/octet-stream", "Content-Length": String(body.byteLength) },
		body,
	});
	console.log(`Uploaded ${name} (${body.byteLength} bytes)`);
}

console.log(`Done: https://github.com/${owner}/${repo}/releases/tag/${tag}`);
