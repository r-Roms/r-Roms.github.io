import type { WithChild, Without } from "../../internal/types.js";
import type { BitsPrimitiveLabelAttributes } from "../../shared/attributes.js";
export type LabelRootPropsWithoutHTML = WithChild;
export type LabelRootProps = LabelRootPropsWithoutHTML & Without<BitsPrimitiveLabelAttributes, LabelRootPropsWithoutHTML>;
