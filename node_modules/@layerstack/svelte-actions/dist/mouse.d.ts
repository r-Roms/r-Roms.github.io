import type { Action } from 'svelte/action';
/**
 * Dispatch event after element has been pressed for a duration of time
 */
export declare const longpress: Action<HTMLElement, number>;
type MovableOptions = {
    /**
     * Number of pixels to step
     */
    step?: number;
    /**
     * Percentage of parent element's pixels to step
     */
    stepPercent?: number;
    axis?: 'x' | 'y' | 'xy';
};
/**
 * Track mouse position changes from mouse down on node to mouse up
 */
export declare const movable: Action<HTMLElement | SVGElement, MovableOptions | undefined>;
/** Set relative mouse coordinates as --x/--y CSS variables */
export declare const mouseCoords: Action<HTMLElement, HTMLElement | undefined>;
export {};
//# sourceMappingURL=mouse.d.ts.map