import type { WithChild } from "../../../internal/types.js";
import type { BitsPrimitiveSpanAttributes } from "../../../shared/attributes.js";
export type ArrowPropsWithoutHTML = WithChild<{
    /**
     * The width of the arrow in pixels.
     *
     * @defaultValue 10
     */
    width?: number;
    /**
     * The height of the arrow in pixels.
     *
     * @defaultValue 5
     */
    height?: number;
}>;
export type ArrowProps = ArrowPropsWithoutHTML & BitsPrimitiveSpanAttributes;
