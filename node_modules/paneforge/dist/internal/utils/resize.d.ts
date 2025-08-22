import type { PaneConstraints } from "../types.js";
/**
 * Resizes a pane based on its constraints.
 */
export declare function resizePane({ paneConstraints: paneConstraintsArray, paneIndex, initialSize, }: {
    paneConstraints: PaneConstraints[];
    paneIndex: number;
    initialSize: number;
}): number;
