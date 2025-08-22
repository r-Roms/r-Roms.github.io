type OrderType = typeof import('d3-shape').stackOrderNone;
type OffsetType = typeof import('d3-shape').stackOffsetNone;
export declare function groupStackData<TData>(data: TData[], options: {
    xKey: string;
    groupBy?: string;
    stackBy?: string;
    order?: OrderType;
    offset?: OffsetType;
}): {
    keys: Record<string, any>;
    values: number[];
}[];
/**
 * Function to offset each layer by the maximum of the previous layer
 *   - see: https://observablehq.com/@mkfreeman/separated-bar-chart
 */
export declare function stackOffsetSeparated(series: any, order: any): void;
export {};
