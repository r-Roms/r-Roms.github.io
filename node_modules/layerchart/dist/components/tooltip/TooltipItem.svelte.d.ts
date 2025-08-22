import type { HTMLAttributes } from 'svelte/elements';
import { type Without } from '../../utils/types.js';
export type TooltipItemPropsWithoutHTML = {
    /**
     * The label to display in the tooltip item.
     */
    label?: string | number | null | undefined | Snippet;
    /**
     * Value to be formatted and displayed in absence of the
     * default `children` snippet
     */
    value?: any;
    /**
     * Format to use when displaying the value.
     */
    format?: FormatType | FormatConfig;
    /**
     * Alignment of the value.
     *
     * @default 'left'
     */
    valueAlign?: 'left' | 'right' | 'center';
    /**
     * Color to use for the color dot.
     */
    color?: string;
    /**
     * Classes to apply to the parts of the tooltip item.
     *
     * @default {}
     */
    classes?: {
        root?: string;
        label?: string;
        value?: string;
        color?: string;
    };
    props?: {
        root?: HTMLAttributes<HTMLElement>;
        label?: HTMLAttributes<HTMLElement>;
        value?: HTMLAttributes<HTMLElement>;
        color?: HTMLAttributes<HTMLElement>;
    };
    /**
     * A reference to the tooltip item's outermost `<div>` tag.
     */
    ref?: HTMLElement;
    /**
     * A reference to the tooltip item's label `<div>` tag.
     */
    labelRef?: HTMLElement;
    /**
     * A reference to the tooltip item's value `<div>` tag.
     */
    valueRef?: HTMLElement;
    /**
     * A reference to the tooltip item's color `<div>` tag.
     */
    colorRef?: HTMLElement;
};
export type TooltipItemProps = TooltipItemPropsWithoutHTML & Without<HTMLAttributes<HTMLElement>, TooltipItemPropsWithoutHTML>;
import { type FormatType, type FormatConfig } from '@layerstack/utils';
import type { Snippet } from 'svelte';
declare const TooltipItem: import("svelte").Component<TooltipItemProps, {}, "ref" | "colorRef" | "labelRef" | "valueRef">;
type TooltipItem = ReturnType<typeof TooltipItem>;
export default TooltipItem;
