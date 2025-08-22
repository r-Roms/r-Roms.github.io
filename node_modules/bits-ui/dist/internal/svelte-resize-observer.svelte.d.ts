import type { Getter } from "svelte-toolbelt";
export declare class SvelteResizeObserver {
    #private;
    constructor(node: Getter<HTMLElement | null>, onResize: () => void);
    handler(): (() => void) | undefined;
}
