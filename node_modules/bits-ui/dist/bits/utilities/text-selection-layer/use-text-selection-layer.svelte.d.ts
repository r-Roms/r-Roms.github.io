import { DOMContext, type ReadableBoxedValues } from "svelte-toolbelt";
import type { TextSelectionLayerImplProps } from "./types.js";
interface TextSelectionLayerStateOpts extends ReadableBoxedValues<Required<Omit<TextSelectionLayerImplProps, "children" | "preventOverflowTextSelection" | "ref">> & {
    ref: HTMLElement | null;
}> {
}
export declare class TextSelectionLayerState {
    #private;
    static create(opts: TextSelectionLayerStateOpts): TextSelectionLayerState;
    readonly opts: TextSelectionLayerStateOpts;
    readonly domContext: DOMContext;
    constructor(opts: TextSelectionLayerStateOpts);
}
export {};
