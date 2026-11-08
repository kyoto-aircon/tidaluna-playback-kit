import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { SpeedController, type MediaTarget } from "../plugins/PlaybackSpeed/src/mediaController";

class FakeMedia extends EventTarget {
	playbackRate = 1;
	preservesPitch = true;
	webkitPreservesPitch = true;

	asTarget(): MediaTarget {
		return this as unknown as MediaTarget;
	}
}

const createSource = (speed = 1.5, pitchShifts = false) => {
	const source = { speed, pitchShifts };
	return {
		source,
		get: () => ({ speed: source.speed, pitchShifts: source.pitchShifts }),
	};
};

describe("SpeedController", () => {
	it("applies the rate and pitch mode to existing elements", () => {
		const media = new FakeMedia();
		const { get } = createSource(1.5, false);
		const controller = new SpeedController(() => [media.asTarget()], { get });
		controller.start();

		assert.equal(media.playbackRate, 1.5);
		assert.equal(media.preservesPitch, true);
	});

	it("disables pitch preservation when pitch shifts are on", () => {
		const media = new FakeMedia();
		const { get } = createSource(2, true);
		const controller = new SpeedController(() => [media.asTarget()], { get });
		controller.start();

		assert.equal(media.preservesPitch, false);
		assert.equal(media.webkitPreservesPitch, false);
	});

	it("re-applies the rate after TIDAL resets it on a new track", () => {
		const media = new FakeMedia();
		const { get } = createSource(1.25);
		const controller = new SpeedController(() => [media.asTarget()], { get });
		controller.start();

		media.playbackRate = 1;
		media.dispatchEvent(new Event("loadstart"));
		assert.equal(media.playbackRate, 1.25);

		media.playbackRate = 1;
		media.dispatchEvent(new Event("ratechange"));
		assert.equal(media.playbackRate, 1.25);
	});

	it("attaches to elements that appear later", () => {
		const first = new FakeMedia();
		const second = new FakeMedia();
		const elements: MediaTarget[] = [first.asTarget()];
		const { get } = createSource(1.75);
		const controller = new SpeedController(() => elements, { get });
		controller.start();

		elements.push(second.asTarget());
		controller.scan();

		assert.equal(second.playbackRate, 1.75);
	});

	it("applies an updated rate without re-attaching", () => {
		const media = new FakeMedia();
		const { source, get } = createSource(1.5);
		const controller = new SpeedController(() => [media.asTarget()], { get });
		controller.start();

		source.speed = 0.75;
		controller.apply();
		assert.equal(media.playbackRate, 0.75);
	});

	it("restores normal playback and stops listening on stop", () => {
		const media = new FakeMedia();
		const { get } = createSource(3, true);
		const controller = new SpeedController(() => [media.asTarget()], { get });
		controller.start();

		controller.stop();
		assert.equal(media.playbackRate, 1);
		assert.equal(media.preservesPitch, true);
		assert.equal(media.webkitPreservesPitch, true);

		media.playbackRate = 1;
		media.dispatchEvent(new Event("loadstart"));
		assert.equal(media.playbackRate, 1, "listeners should be detached");
	});

	it("does not fight a rate that already matches", () => {
		const media = new FakeMedia();
		media.playbackRate = 1.5;
		let writes = 0;
		Object.defineProperty(media, "playbackRate", {
			get: () => 1.5,
			set: () => {
				writes += 1;
			},
		});
		const { get } = createSource(1.5);
		const controller = new SpeedController(() => [media.asTarget()], { get });
		controller.start();

		assert.equal(writes, 0);
	});
});
