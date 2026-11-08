import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { applyNativeRate, captureNativeComponent, hasNativeInstance, probeNativeComponent } from "../plugins/PlaybackSpeed/src/nativePlayer";
import { getPlayerKind, setPlayerKind, subscribePlayerKind } from "../plugins/PlaybackSpeed/src/playerKind";

class FakeNative {
	rate = 1;
	loaded = false;

	play(): string {
		return "played";
	}

	load(url: string): string {
		this.loaded = true;
		return url;
	}

	setPlaybackRate(rate: number): void {
		this.rate = rate;
	}
}

describe("native player bridge", () => {
	it("does nothing without the component", () => {
		assert.equal(captureNativeComponent(), false);
		assert.equal(hasNativeInstance(), false);
		assert.equal(applyNativeRate(2), false);
	});

	it("patches the component, captures the instance and drives its rate", () => {
		(globalThis as Record<string, unknown>).NativePlayerComponent = { Player: FakeNative };
		assert.equal(captureNativeComponent(), true);

		const player = new FakeNative();
		player.play();
		assert.equal(hasNativeInstance(), true);

		assert.equal(applyNativeRate(1.35), true);
		assert.equal(player.rate, 1.35);

		const probe = probeNativeComponent() as Record<string, unknown>;
		assert.equal(probe.instanceCaptured, true);
		assert.equal(probe.rateMember, "setPlaybackRate");
		assert.deepEqual(probe.rateMethods, ["setPlaybackRate"]);

		delete (globalThis as Record<string, unknown>).NativePlayerComponent;
	});
});

describe("player kind", () => {
	it("notifies subscribers on change only", () => {
		const seen: string[] = [];
		const unsubscribe = subscribePlayerKind((kind) => seen.push(kind));
		setPlayerKind("native");
		setPlayerKind("native");
		setPlayerKind("shaka");
		unsubscribe();
		setPlayerKind("browser");
		assert.deepEqual(seen, ["native", "shaka"]);
		assert.equal(getPlayerKind(), "browser");
	});
});
