import type { PaneState } from "../../paneforge.svelte.js";
/**
 * A utility function that calculates the `aria-valuemax`, `aria-valuemin`,
 * and `aria-valuenow` values for a pane based on its layout and constraints.
 */
export declare function calculateAriaValues({ layout, panesArray, pivotIndices, }: {
    layout: number[];
    panesArray: PaneState[];
    pivotIndices: number[];
}): {
    valueMax: number;
    valueMin: number;
    valueNow: number;
};
