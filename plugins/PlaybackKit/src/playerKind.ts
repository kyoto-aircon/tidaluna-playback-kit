import { debugLog } from "./debug";

export type PlayerKind = "native" | "shaka" | "browser" | "unknown";

let kind: PlayerKind = "unknown";
const listeners = new Set<(kind: PlayerKind) => void>();

export const getPlayerKind = (): PlayerKind => kind;

export const setPlayerKind = (next: PlayerKind): void => {
	if (next === kind) return;
	debugLog("info", "player kind changed", { from: kind, to: next });
	kind = next;
	for (const listener of [...listeners]) {
		try {
			listener(next);
		} catch (err) {
			debugLog("error", "player kind listener failed", { error: String(err) });
		}
	}
};

export const subscribePlayerKind = (listener: (kind: PlayerKind) => void): (() => void) => {
	listeners.add(listener);
	return () => listeners.delete(listener);
};
