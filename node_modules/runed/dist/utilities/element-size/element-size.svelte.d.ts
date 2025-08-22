import { type ConfigurableWindow } from "../../internal/configurable-globals.js";
import type { MaybeElementGetter } from "../../internal/types.js";
export type ElementSizeOptions = ConfigurableWindow & {
    box?: "content-box" | "border-box";
};
/**
 * Returns a reactive value holding the size of `node`.
 *
 * Accepts an `options` object with the following properties:
 * - `initialSize`: The initial size of the element. Defaults to `{ width: 0, height: 0 }`.
 * - `box`: The box model to use. Can be either `"content-box"` or `"border-box"`. Defaults to `"border-box"`.
 *
 * @returns an object with `width` and `height` properties.
 *
 * @see {@link https://runed.dev/docs/utilities/element-size}
 */
export declare class ElementSize {
    #private;
    constructor(node: MaybeElementGetter, options?: ElementSizeOptions);
    calculateSize(): {
        width: number;
        height: number;
    } | undefined;
    getSize(): {
        width: number;
        height: number;
    };
    get current(): {
        width: number;
        height: number;
    };
    get width(): number;
    get height(): number;
}
