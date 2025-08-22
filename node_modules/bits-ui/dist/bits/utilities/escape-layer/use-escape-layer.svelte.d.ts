import { DOMContext, type Box, type ReadableBoxedValues } from "svelte-toolbelt";
import type { EscapeLayerImplProps } from "./types.js";
interface EscapeLayerStateOpts extends ReadableBoxedValues<Required<Omit<EscapeLayerImplProps, "children" | "ref">>> {
    ref: Box<HTMLElement | null>;
}
export declare class EscapeLayerState {
    #private;
    static create(opts: EscapeLayerStateOpts): EscapeLayerState;
    readonly opts: EscapeLayerStateOpts;
    readonly domContext: DOMContext;
    constructor(opts: EscapeLayerStateOpts);
}
export {};
