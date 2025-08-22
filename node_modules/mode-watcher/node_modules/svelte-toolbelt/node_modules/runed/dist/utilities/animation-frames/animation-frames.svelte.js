import { untrack } from "svelte";
import { extract } from "../extract/index.js";
import { defaultWindow } from "../../internal/configurable-globals.js";
/**
 * Wrapper over {@link https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame requestAnimationFrame},
 * with controls for pausing and resuming the animation, reactive tracking and optional limiting of fps, and utilities.
 */
export class AnimationFrames {
    #callback;
    #fpsLimitOption = 0;
    #fpsLimit = $derived(extract(this.#fpsLimitOption) ?? 0);
    #previousTimestamp = null;
    #frame = null;
    #fps = $state(0);
    #running = $state(false);
    #window = defaultWindow;
    constructor(callback, options = {}) {
        if (options.window)
            this.#window = options.window;
        this.#fpsLimitOption = options.fpsLimit;
        this.#callback = callback;
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.toggle = this.toggle.bind(this);
        $effect(() => {
            if (options.immediate ?? true) {
                untrack(this.start);
            }
            return this.stop;
        });
    }
    #loop(timestamp) {
        if (!this.#running || !this.#window)
            return;
        if (this.#previousTimestamp === null) {
            this.#previousTimestamp = timestamp;
        }
        const delta = timestamp - this.#previousTimestamp;
        const fps = 1000 / delta;
        if (this.#fpsLimit && fps > this.#fpsLimit) {
            this.#frame = this.#window.requestAnimationFrame(this.#loop.bind(this));
            return;
        }
        this.#fps = fps;
        this.#previousTimestamp = timestamp;
        this.#callback({ delta, timestamp });
        this.#frame = this.#window.requestAnimationFrame(this.#loop.bind(this));
    }
    start() {
        if (!this.#window)
            return;
        this.#running = true;
        this.#previousTimestamp = 0;
        this.#frame = this.#window.requestAnimationFrame(this.#loop.bind(this));
    }
    stop() {
        if (!this.#frame || !this.#window)
            return;
        this.#running = false;
        this.#window.cancelAnimationFrame(this.#frame);
        this.#frame = null;
    }
    toggle() {
        this.#running ? this.stop() : this.start();
    }
    get fps() {
        return !this.#running ? 0 : this.#fps;
    }
    get running() {
        return this.#running;
    }
}
