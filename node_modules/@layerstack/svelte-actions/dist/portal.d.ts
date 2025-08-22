import type { Action } from 'svelte/action';
export type PortalOptions = {
    enabled?: boolean;
    target?: HTMLElement | string;
} | boolean;
/**
 * Render component outside current DOM hierarchy
 */
export declare const portal: Action<HTMLElement, PortalOptions>;
//# sourceMappingURL=portal.d.ts.map