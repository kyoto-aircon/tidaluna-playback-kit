// Publishes the built plugin as the mutable `latest` GitHub release and mirrors
// the dist files to a `release` branch served by raw.githubusercontent.com.
// Usage: GH_TOKEN=... npm run release
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const owner = "kyoto-aircon";
const repo = "tidaluna-playback-kit";
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
	"User-Agent": "tidaluna-playback-kit-release",
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
				"Automated build of Playback Kit.",
				"",
				`Install store URL: https://raw.githubusercontent.com/${owner}/${repo}/release/store.json`,
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

// GitHub's releases/download endpoint has intermittently returned 504s for tag
// `latest`, which makes Luna load nothing. Mirroring to a branch gives a stable
// raw.githubusercontent.com URL instead.
const pkg = JSON.parse(await readFile(join(distDir, "store.json"), "utf8"));
const refPath = `${api}/repos/${owner}/${repo}/git/ref/heads/release`;
let branch;
try {
	branch = await request(refPath);
} catch {
	const main = await request(`${api}/repos/${owner}/${repo}/git/ref/heads/main`);
	branch = await request(`${api}/repos/${owner}/${repo}/git/refs`, {
		method: "POST",
		body: JSON.stringify({ ref: "refs/heads/release", sha: main.object.sha }),
	});
}
const headSha = branch.object.sha;
const headCommit = await request(`${api}/repos/${owner}/${repo}/git/commits/${headSha}`);
const treeEntries = [];
for (const name of files) {
	const body = await readFile(join(distDir, name));
	const blob = await request(`${api}/repos/${owner}/${repo}/git/blobs`, {
		method: "POST",
		body: JSON.stringify({ content: body.toString("base64"), encoding: "base64" }),
	});
	treeEntries.push({ path: name, mode: "100644", type: "blob", sha: blob.sha });
}
const tree = await request(`${api}/repos/${owner}/${repo}/git/trees`, {
	method: "POST",
	body: JSON.stringify({ base_tree: headCommit.tree.sha, tree: treeEntries }),
});
const commit = await request(`${api}/repos/${owner}/${repo}/git/commits`, {
	method: "POST",
	body: JSON.stringify({ message: `release ${pkg.version}`, tree: tree.sha, parents: [headSha] }),
});
await request(`${api}/repos/${owner}/${repo}/git/refs/heads/release`, {
	method: "PATCH",
	body: JSON.stringify({ sha: commit.sha, force: true }),
});
console.log(`Published release branch (${pkg.version})`);

console.log(`Done: https://github.com/${owner}/${repo}/releases/tag/${tag}`);
