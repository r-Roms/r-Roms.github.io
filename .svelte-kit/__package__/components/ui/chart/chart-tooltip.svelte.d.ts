import { type WithElementRef, type WithoutChildren } from "../../../utils.js";
import type { HTMLAttributes } from "svelte/elements";
import { type TooltipPayload } from "./chart-utils.js";
import type { Snippet } from "svelte";
type $$ComponentProps = WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> & {
    hideLabel?: boolean;
    label?: string;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
    hideIndicator?: boolean;
    labelClassName?: string;
    labelFormatter?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((value: any, payload: TooltipPayload[]) => string | number | Snippet) | null;
    formatter?: Snippet<[
        {
            value: unknown;
            name: string;
            item: TooltipPayload;
            index: number;
            payload: TooltipPayload[];
        }
    ]>;
};
declare const ChartTooltip: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ChartTooltip = ReturnType<typeof ChartTooltip>;
export default ChartTooltip;
