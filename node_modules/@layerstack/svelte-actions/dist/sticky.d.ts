import type { Action } from 'svelte/action';
export type Edge = 'top' | 'bottom' | 'left' | 'right';
type StickyOptions = {
    [edge in Edge]?: boolean;
};
export declare const sticky: Action<HTMLElement, StickyOptions | undefined>;
type StickyContextOptions = {
    type: 'page' | 'container';
};
export declare const stickyContext: Action<HTMLElement, StickyContextOptions>;
export {};
//# sourceMappingURL=sticky.d.ts.map