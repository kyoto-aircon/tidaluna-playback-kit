import type { LunaUnload } from "@luna/core";
import { Tracer } from "@luna/core";

import { setupSpeedControl } from "./control";
import { getMediaElements, SpeedController } from "./mediaController";
import { speedStore } from "./state";

export { Settings } from "./Settings";

export const unloads = new Set<LunaUnload>();

const { trace } = Tracer("[PlaybackSpeed]");
const SCAN_INTERVAL_MS = 1000;

try {
	const controller = new SpeedController(getMediaElements, speedStore);
	controller.start();

	const unsubscribe = speedStore.subscribe(() => controller.apply());
	setupSpeedControl(unloads, speedStore);

	// TIDAL swaps media elements between tracks and re-renders the footer.
	const scanTimer = setInterval(() => controller.scan(), SCAN_INTERVAL_MS);

	unloads.add(() => {
		clearInterval(scanTimer);
		unsubscribe();
		controller.stop();
	});

	trace.log("loaded");
} catch (err) {
	trace.err("Failed to load:", err);
}
