import { type ReadableBoxedValues, type WithRefProps, DOMContext } from "svelte-toolbelt";
import type { Direction, DragState, PaneOnCollapse, PaneOnExpand, PaneOnResize, PaneResizeHandleOnDragging, RefAttachment, ResizeEvent, ResizeHandler } from "./internal/types.js";
import { type PaneGroupStorage } from "./internal/utils/storage.js";
import type { FocusEventHandler, KeyboardEventHandler, MouseEventHandler, TouchEventHandler } from "svelte/elements";
export declare const defaultStorage: PaneGroupStorage;
interface PaneGroupStateOpts extends WithRefProps, ReadableBoxedValues<{
    autoSaveId: string | null;
    direction: Direction;
    keyboardResizeBy: number | null;
    onLayout: (layout: number[]) => void | null;
    storage: PaneGroupStorage;
}> {
}
export declare class PaneGroupState {
    #private;
    static create(opts: PaneGroupStateOpts): PaneGroupState;
    readonly opts: PaneGroupStateOpts;
    readonly attachment: RefAttachment;
    readonly domContext: DOMContext;
    dragState: DragState | null;
    layout: number[];
    panesArray: PaneState[];
    panesArrayChanged: boolean;
    paneIdToLastNotifiedSizeMap: Record<string, number>;
    paneSizeBeforeCollapseMap: Map<string, number>;
    prevDelta: number;
    constructor(opts: PaneGroupStateOpts);
    setLayout: (newLayout: number[]) => void;
    registerResizeHandle: (dragHandleId: string) => (event: ResizeEvent) => void;
    resizePane: (paneState: PaneState, unsafePaneSize: number) => void;
    startDragging: (dragHandleId: string, e: ResizeEvent) => void;
    stopDragging: () => void;
    isPaneCollapsed: (pane: PaneState) => boolean;
    expandPane: (pane: PaneState) => void;
    collapsePane: (pane: PaneState) => void;
    getPaneSize: (pane: PaneState) => number;
    getPaneStyle: (pane: PaneState, defaultSize: number | undefined) => Record<string, unknown>;
    isPaneExpanded: (pane: PaneState) => boolean;
    registerPane: (pane: PaneState) => () => void;
    readonly props: {
        readonly id: string;
        readonly "data-pane-group": "";
        readonly "data-direction": Direction;
        readonly "data-pane-group-id": string;
        readonly style: {
            readonly display: "flex";
            readonly flexDirection: "row" | "column";
            readonly height: "100%";
            readonly overflow: "hidden";
            readonly width: "100%";
        };
    };
}
interface PaneResizerStateOpts extends WithRefProps, ReadableBoxedValues<{
    onDraggingChange: PaneResizeHandleOnDragging;
    disabled: boolean;
    tabIndex: number;
}> {
}
export declare class PaneResizerState {
    #private;
    static create(opts: PaneResizerStateOpts): PaneResizerState;
    readonly opts: PaneResizerStateOpts;
    readonly attachment: RefAttachment;
    readonly domContext: DOMContext;
    resizeHandler: ResizeHandler | null;
    constructor(opts: PaneResizerStateOpts, group: PaneGroupState);
    readonly props: {
        readonly id: string;
        readonly role: "separator";
        readonly "data-direction": Direction;
        readonly "data-pane-group-id": string;
        readonly "data-active": "keyboard" | "pointer" | undefined;
        readonly "data-enabled": boolean;
        readonly "data-pane-resizer-id": string;
        readonly "data-pane-resizer": "";
        readonly tabIndex: number;
        readonly style: {
            readonly cursor: string;
            readonly touchAction: "none";
            readonly userSelect: "none";
            readonly "-webkit-user-select": "none";
            readonly "-webkit-touch-callout": "none";
        };
        readonly onkeydown: KeyboardEventHandler<HTMLElement>;
        readonly onblur: FocusEventHandler<HTMLElement>;
        readonly onfocus: FocusEventHandler<HTMLElement>;
        readonly onmousedown: MouseEventHandler<HTMLElement>;
        readonly onmouseup: MouseEventHandler<HTMLElement>;
        readonly ontouchcancel: TouchEventHandler<HTMLElement>;
        readonly ontouchend: TouchEventHandler<HTMLElement>;
        readonly ontouchstart: TouchEventHandler<HTMLElement>;
    };
}
interface PaneStateOpts extends WithRefProps, ReadableBoxedValues<{
    collapsedSize: number | undefined;
    collapsible: boolean | undefined;
    defaultSize: number | undefined;
    maxSize: number | undefined;
    minSize: number | undefined;
    order: number | undefined;
    onCollapse: PaneOnCollapse;
    onExpand: PaneOnExpand;
    onResize: PaneOnResize;
}> {
}
export declare class PaneState {
    #private;
    static create(opts: PaneStateOpts): PaneState;
    readonly opts: PaneStateOpts;
    readonly group: PaneGroupState;
    readonly attachment: RefAttachment;
    readonly domContext: DOMContext;
    readonly callbacks: {
        onCollapse: PaneOnCollapse;
        onExpand: PaneOnExpand;
        onResize: PaneOnResize;
    };
    readonly constraints: {
        collapsedSize: number | undefined;
        collapsible: boolean | undefined;
        defaultSize: number | undefined;
        maxSize: number | undefined;
        minSize: number | undefined;
    };
    readonly pane: {
        collapse: () => void;
        expand: () => void;
        getSize: () => number;
        isCollapsed: () => boolean;
        isExpanded: () => boolean;
        resize: (size: number) => void;
        getId: () => string;
    };
    constructor(opts: PaneStateOpts, group: PaneGroupState);
    readonly props: {
        readonly id: string;
        readonly style: Record<string, unknown>;
        readonly "data-pane": "";
        readonly "data-pane-id": string;
        readonly "data-pane-group-id": string;
        readonly "data-collapsed": "" | undefined;
        readonly "data-expanded": "" | undefined;
        readonly "data-pane-state": "collapsing" | "expanding" | "collapsed" | "expanded";
    };
}
export {};
