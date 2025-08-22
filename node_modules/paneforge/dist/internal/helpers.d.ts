import type { PaneState } from "../paneforge.svelte.js";
import type { DOMContext } from "svelte-toolbelt";
import type { Direction, DragState, PaneConstraints, ResizeEvent } from "./types.js";
export declare function noop(): void;
interface UpdateResizeHandleAriaValuesOpts {
    groupId: string;
    layout: number[];
    panesArray: PaneState[];
    domContext: DOMContext;
}
export declare function updateResizeHandleAriaValues({ groupId, layout, panesArray, domContext, }: UpdateResizeHandleAriaValuesOpts): () => void;
export declare function getResizeHandleElementsForGroup(groupId: string, domContext: DOMContext): HTMLElement[];
interface GetResizeHandleElementIndexOpts {
    groupId: string;
    id: string;
    domContext: DOMContext;
}
export declare function getResizeHandleElementIndex({ groupId, id, domContext, }: GetResizeHandleElementIndexOpts): number | null;
type GetPivotIndicesOpts = {
    groupId: string;
    dragHandleId: string;
    domContext: DOMContext;
};
export declare function getPivotIndices({ groupId, dragHandleId, domContext, }: GetPivotIndicesOpts): [indexBefore: number, indexAfter: number];
export declare function paneDataHelper(panesArray: PaneState[], pane: PaneState, layout: number[]): {
    paneSize: number;
    pivotIndices: number[];
    collapsedSize: number | undefined;
    collapsible: boolean | undefined;
    defaultSize: number | undefined;
    maxSize: number | undefined;
    minSize: number | undefined;
};
export declare function findPaneDataIndex(panesArray: readonly PaneState[], pane: PaneState): number;
export declare function callPaneCallbacks(panesArray: PaneState[], layout: number[], paneIdToLastNotifiedSizeMap: Record<string, number>): void;
export declare function getUnsafeDefaultLayout({ panesArray }: {
    panesArray: PaneState[];
}): number[];
export declare function validatePaneGroupLayout({ layout: prevLayout, paneConstraints, }: {
    layout: number[];
    paneConstraints: PaneConstraints[];
}): number[];
export declare function getPaneGroupElement(id: string, domContext: DOMContext): HTMLElement | null;
export declare function getResizeHandleElement(id: string, domContext: DOMContext): HTMLElement | null;
interface GetDragOffsetPercentageOpts {
    event: ResizeEvent;
    dragHandleId: string;
    dir: Direction;
    initialDragState: DragState;
    domContext: DOMContext;
}
export declare function getDragOffsetPercentage({ event, dragHandleId, dir, initialDragState, domContext, }: GetDragOffsetPercentageOpts): number;
interface GetDeltaPercentageOpts {
    event: ResizeEvent;
    dragHandleId: string;
    dir: Direction;
    initialDragState: DragState | null;
    keyboardResizeBy: number | null;
    domContext: DOMContext;
}
export declare function getDeltaPercentage({ event, dragHandleId, dir, initialDragState, keyboardResizeBy, domContext, }: GetDeltaPercentageOpts): number;
export declare function getResizeEventCursorPosition(dir: Direction, e: ResizeEvent): number;
interface GetResizeHandlePaneIdsOpts {
    groupId: string;
    handleId: string;
    panesArray: PaneState[];
    domContext: DOMContext;
}
export declare function getResizeHandlePaneIds({ groupId, handleId, panesArray, domContext, }: GetResizeHandlePaneIdsOpts): [idBefore: string | null, idAfter: string | null];
export {};
