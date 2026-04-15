import type { Tooltip } from "layerchart";
import { type Component, type Snippet } from "svelte";
export declare const THEMES: {
    readonly light: "";
    readonly dark: ".dark";
};
export type ChartConfig = {
    [k in string]: {
        label?: string;
        icon?: Component;
    } & ({
        color?: string;
        theme?: never;
    } | {
        color?: never;
        theme: Record<keyof typeof THEMES, string>;
    });
};
export type ExtractSnippetParams<T> = T extends Snippet<[infer P]> ? P : never;
export type TooltipPayload = Tooltip.TooltipSeries;
export declare function getPayloadConfigFromPayload(config: ChartConfig, payload: TooltipPayload, key: string, data?: Record<string, any> | null): ({
    label?: string;
    icon?: Component;
} & ({
    color?: string;
    theme?: never;
} | {
    color?: never;
    theme: Record<keyof typeof THEMES, string>;
})) | undefined;
type ChartContextValue = {
    config: ChartConfig;
};
export declare function setChartContext(value: ChartContextValue): ChartContextValue;
export declare function useChart(): ChartContextValue;
export {};
