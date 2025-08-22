import type { Action } from 'svelte/action';
export type ScrollIntoViewOptions = {
    condition: boolean | ((node: HTMLElement) => boolean);
    /** Only scroll if needed (not visible in scroll parent).  Similar to non-standard `scrollIntoViewIfNeeded()` */
    onlyIfNeeded?: boolean;
    initial?: boolean;
    delay?: number;
};
export declare const scrollIntoView: Action<HTMLElement, ScrollIntoViewOptions | undefined>;
type ScrollShadowOptions = Partial<Record<'top' | 'bottom' | 'left' | 'right', {
    color?: string;
    offset?: number;
    blur?: number;
    spread?: number;
    scrollRatio?: number;
}>>;
export declare const scrollShadow: Action<HTMLElement, ScrollShadowOptions | undefined>;
type ScrollFadeOptions = {
    length?: number;
    scrollRatio?: number;
};
export declare const scrollFade: Action<HTMLElement, ScrollFadeOptions | undefined>;
export {};
//# sourceMappingURL=scroll.d.ts.map