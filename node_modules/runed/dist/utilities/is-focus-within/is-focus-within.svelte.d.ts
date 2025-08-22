import type { MaybeElementGetter } from "../../internal/types.js";
import { type ActiveElementOptions } from "../active-element/active-element.svelte.js";
export interface IsFocusWithinOptions extends ActiveElementOptions {
}
/**
 * Tracks whether the focus is within a target element.
 * @see {@link https://runed.dev/docs/utilities/is-focus-within}
 */
export declare class IsFocusWithin {
    #private;
    constructor(node: MaybeElementGetter, options?: IsFocusWithinOptions);
    readonly current: boolean;
}
