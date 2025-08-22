import type { Action } from 'svelte/action';
/**
 * Set `height` or `max-height` to viewport height excluding node's current viewport top
 */
export declare const remainingViewportHeight: Action<HTMLElement, {
    max?: boolean;
    offset?: number;
    enabled?: boolean;
}>;
/**
 * Set `width` or `max-width` to viewport width excluding node's current viewport left
 */
export declare const remainingViewportWidth: Action<HTMLElement, {
    max?: boolean;
    offset?: number;
    enabled?: boolean;
}>;
/**
 * Watch for overflow changes (x or y) and dispatch `overflowX` / `overflowY` events with amount
 */
export declare const overflow: Action<HTMLElement>;
//# sourceMappingURL=layout.d.ts.map