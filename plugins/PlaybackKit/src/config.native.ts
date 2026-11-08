// Runs in the TIDAL main process through Luna's native module bridge.
// Node modules are required lazily so registration itself never prompts for trust.
const nodeRequire = require;

const path = nodeRequire("path") as { join(...parts: string[]): string; dirname(value: string): string; basename(value: string): string };

type FsPromises = {
	mkdir(path: string, options?: { recursive?: boolean }): Promise<unknown>;
	readFile(path: string, encoding: string): Promise<string>;
	rename(from: string, to: string): Promise<void>;
	writeFile(path: string, data: string, encoding: string): Promise<void>;
};
const fs = (): FsPromises => nodeRequire("fs/promises") as FsPromises;
const fsSync = (): { existsSync(path: string): boolean } => nodeRequire("fs") as { existsSync(path: string): boolean };

type Electron = {
	dialog: {
		showOpenDialog(options: Record<string, unknown>): Promise<{ canceled: boolean; filePaths: string[] }>;
		showSaveDialog(options: Record<string, unknown>): Promise<{ canceled: boolean; filePath?: string }>;
	};
	shell: { openPath(path: string): Promise<string> };
};
const electron = (): Electron => nodeRequire("electron") as Electron;

const home = (): string => process.env.HOME ?? process.env.USERPROFILE ?? "";

const configBase = (): string => {
	if (process.platform === "win32") return process.env.APPDATA ?? path.join(home(), "AppData", "Roaming");
	if (process.platform === "darwin") return path.join(home(), "Library", "Application Support");
	return path.join(home(), ".config");
};

/** Match Electron's userData folder without depending on `electron.app`. */
const appFolder = (): string => {
	const base = configBase();
	const lookup = fsSync();
	const candidates: string[] = [];
	const resourcesPath = (process as unknown as { resourcesPath?: string }).resourcesPath;
	if (resourcesPath !== undefined) {
		candidates.push(path.basename(path.dirname(path.dirname(resourcesPath))));
		candidates.push(path.basename(path.dirname(resourcesPath)));
	}
	candidates.push("TIDAL", "Tidal", "tidal", "tidal-hifi");
	for (const candidate of candidates) {
		if (candidate === "" || candidate === "Contents" || candidate === "resources") continue;
		if (lookup.existsSync(path.join(base, candidate))) return candidate;
	}
	return "TIDAL";
};

const folder = (): string => path.join(configBase(), appFolder(), "playback-kit");
const configFile = (): string => path.join(folder(), "config.json");

export const getConfigPath = async (): Promise<string> => configFile();

export const readConfig = async (): Promise<string | null> => {
	try {
		return await fs().readFile(configFile(), "utf8");
	} catch {
		return null;
	}
};

export const writeConfig = async (json: string): Promise<string> => {
	await fs().mkdir(folder(), { recursive: true });
	const temporary = `${configFile()}.tmp`;
	await fs().writeFile(temporary, json, "utf8");
	await fs().rename(temporary, configFile());
	return configFile();
};

export const exportConfig = async (json: string): Promise<string | null> => {
	const api = electron();
	const result = await api.dialog.showSaveDialog({
		title: "Export Playback Kit config",
		defaultPath: path.join(configBase(), "playback-kit.json"),
		filters: [{ name: "JSON", extensions: ["json"] }],
	});
	if (result.canceled || result.filePath === undefined) return null;
	await fs().writeFile(result.filePath, json, "utf8");
	return result.filePath;
};

export const importConfig = async (): Promise<{ path: string; json: string } | null> => {
	const api = electron();
	const result = await api.dialog.showOpenDialog({
		title: "Import Playback Kit config",
		properties: ["openFile"],
		filters: [{ name: "JSON", extensions: ["json"] }],
	});
	const filePath = result.filePaths[0];
	if (result.canceled || filePath === undefined) return null;
	return { path: filePath, json: await fs().readFile(filePath, "utf8") };
};

export const revealConfig = async (): Promise<void> => {
	await fs().mkdir(folder(), { recursive: true });
	await electron().shell.openPath(folder());
};
