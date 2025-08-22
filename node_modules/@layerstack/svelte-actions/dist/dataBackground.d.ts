import type { Action } from 'svelte/action';
import { tweened } from 'svelte/motion';
export type DataBackgroundOptions = {
    value: number | null | undefined;
    domain?: [number, number];
    /**
     * Set color explicitly.  Can also use the following:
     *   - tailwind gradient classes (`from-blue-200 to-blue-400`)
     *   - Set CSS variables `--color-from` and `--color-to`
     */
    color?: string | ((value: number) => string);
    /**
     * Render as bar or fill (heatmap)
     */
    mode?: 'bar' | 'fill';
    /** Inset bar.  Pass as [x,y] to specify per axis */
    inset?: number | [number, number];
    enabled?: boolean;
    /**
     * Show baseline
     */
    baseline?: boolean;
    tweened?: Parameters<typeof tweened<number | null>>[1];
};
export declare const dataBackground: Action<HTMLElement, DataBackgroundOptions>;
//# sourceMappingURL=dataBackground.d.ts.map