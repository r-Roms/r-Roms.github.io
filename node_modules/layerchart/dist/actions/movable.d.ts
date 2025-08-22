import type { Action } from 'svelte/action';
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
    onMoveStart?: (event: CustomEvent<{
        x: number;
        y: number;
    }>) => void;
    onMove?: (event: CustomEvent<{
        x: number;
        y: number;
        dx: number;
        dy: number;
    }>) => void;
    onMoveEnd?: (event: CustomEvent<{
        x: number;
        y: number;
    }>) => void;
};
export declare const movable: Action<HTMLElement | SVGElement, MovableOptions | undefined>;
export {};
