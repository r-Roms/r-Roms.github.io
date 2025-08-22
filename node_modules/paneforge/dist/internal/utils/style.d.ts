import type { PaneState } from "../../paneforge.svelte.js";
import type { DragState } from "../types.js";
type CursorState = "horizontal" | "horizontal-max" | "horizontal-min" | "vertical" | "vertical-max" | "vertical-min";
/**
 * Returns the cursor style for a given cursor state.
 */
export declare function getCursorStyle(state: CursorState): string;
/**
 * Resets the global cursor style to the default.
 */
export declare function resetGlobalCursorStyle(): void;
/**
 * Sets the global cursor style to the given state.
 */
export declare function setGlobalCursorStyle(state: CursorState, doc: Document): void;
/**
 * Computes the flexbox style for a pane given its layout and drag state.
 */
export declare function computePaneFlexBoxStyle({ defaultSize, dragState, layout, panesArray, paneIndex, precision, }: {
    defaultSize: number | undefined;
    layout: number[];
    dragState: DragState | null;
    panesArray: PaneState[];
    paneIndex: number;
    precision?: number;
}): Record<string, unknown>;
export {};
