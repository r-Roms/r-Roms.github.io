import type { PaneConstraints } from "../types.js";
/**
 * Adjusts the layout of panes based on the delta of the resize handle.
 * All units must be in percentages; pixel values should be pre-converted.
 *
 * Credit: https://github.com/bvaughn/react-resizable-panels
 */
export declare function adjustLayoutByDelta({ delta, layout: prevLayout, paneConstraints: paneConstraintsArray, pivotIndices, trigger, }: {
    delta: number;
    layout: number[];
    paneConstraints: PaneConstraints[];
    pivotIndices: number[];
    trigger: "imperative-api" | "keyboard" | "mouse-or-touch";
}): number[];
