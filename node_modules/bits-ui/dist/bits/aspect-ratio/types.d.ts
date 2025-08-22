import type { WithChild, Without } from "../../internal/types.js";
import type { BitsPrimitiveDivAttributes } from "../../shared/attributes.js";
export type AspectRatioRootPropsWithoutHTML = WithChild<{
    /**
     * The aspect ratio of the image.
     *
     * @defaultValue 1
     */
    ratio?: number;
}>;
export type AspectRatioRootProps = AspectRatioRootPropsWithoutHTML & Without<BitsPrimitiveDivAttributes, AspectRatioRootPropsWithoutHTML>;
