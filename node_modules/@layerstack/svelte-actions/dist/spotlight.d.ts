import type { Action } from 'svelte/action';
type SpotlightOptions = {
    radius?: string;
    borderWidth?: string;
    borderColorStops?: string;
    surfaceColorStops?: string;
    hover?: {
        radius?: string;
        borderWidth?: string;
        borderColorStops?: string;
        surfaceColorStops?: string;
    };
} | undefined;
export declare const spotlight: Action<HTMLElement, SpotlightOptions>;
export {};
//# sourceMappingURL=spotlight.d.ts.map