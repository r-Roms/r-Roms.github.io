export type LegendPayload = {
    key: string;
    label?: string;
    color?: string;
};
export declare function setLegendPayloadContext(payload: LegendPayload[]): LegendPayload[];
export declare function getLegendPayloadContext(): LegendPayload[];
