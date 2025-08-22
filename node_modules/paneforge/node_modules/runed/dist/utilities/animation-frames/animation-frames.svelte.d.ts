import type { MaybeGetter } from "../../internal/types.js";
import { type ConfigurableWindow } from "../../internal/configurable-globals.js";
type RafCallbackParams = {
    /** The number of milliseconds since the last frame. */
    delta: number;
    /**
     * Time elapsed since the creation of the web page.
     * See {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin Time origin}.
     */
    timestamp: DOMHighResTimeStamp;
};
export type AnimationFramesOptions = ConfigurableWindow & {
    /**
     * Start calling requestAnimationFrame immediately.
     *
     * @default true
     */
    immediate?: boolean;
    /**
     * Limit the number of frames per second.
     * Set to `0` to disable
     *
     * @default 0
     */
    fpsLimit?: MaybeGetter<number>;
};
/**
 * Wrapper over {@link https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame requestAnimationFrame},
 * with controls for pausing and resuming the animation, reactive tracking and optional limiting of fps, and utilities.
 */
export declare class AnimationFrames {
    #private;
    constructor(callback: (params: RafCallbackParams) => void, options?: AnimationFramesOptions);
    start(): void;
    stop(): void;
    toggle(): void;
    get fps(): number;
    get running(): boolean;
}
export {};
