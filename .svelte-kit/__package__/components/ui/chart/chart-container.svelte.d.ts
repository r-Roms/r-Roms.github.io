import { type WithElementRef } from "../../../utils.js";
import type { HTMLAttributes } from "svelte/elements";
import { type ChartConfig } from "./chart-utils.js";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLElement>> & {
    config: ChartConfig;
};
declare const ChartContainer: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ChartContainer = ReturnType<typeof ChartContainer>;
export default ChartContainer;
