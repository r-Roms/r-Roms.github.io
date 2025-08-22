import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import { type Without } from '../../utils/types.js';
export type TooltipHeaderPropsWithoutHTML = {
    /**
     * The value to display in the tooltip header when the `children`
     * snippet is not provided.
     */
    value?: any;
    /**
     * The format to use when displaying the value.
     */
    format?: FormatType | FormatConfig;
    /**
     * The color to use for the color dot.
     */
    color?: string;
    /**
     * Classes to apply to the parts of the tooltip header.
     */
    classes?: {
        root?: string;
        color?: string;
    };
    /**
     * Props to pass to the underlying elements rendered
     */
    props?: {
        root?: HTMLAttributes<HTMLElement>;
        color?: HTMLAttributes<HTMLElement>;
    };
    /**
     * A reference to the tooltip header's outermost `<div>` tag.
     */
    ref?: HTMLElement;
    /**
     * A reference to the tooltip header's color `<div>` tag.
     */
    colorRef?: HTMLElement;
    children?: Snippet;
};
export type TooltipHeaderProps = TooltipHeaderPropsWithoutHTML & Without<HTMLAttributes<HTMLElement>, TooltipHeaderPropsWithoutHTML>;
import { type FormatType, type FormatConfig } from '@layerstack/utils';
declare const TooltipHeader: import("svelte").Component<TooltipHeaderProps, {}, "ref" | "colorRef">;
type TooltipHeader = ReturnType<typeof TooltipHeader>;
export default TooltipHeader;
