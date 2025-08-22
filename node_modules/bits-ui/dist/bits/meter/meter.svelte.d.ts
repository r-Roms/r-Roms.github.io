import { type ReadableBoxedValues } from "svelte-toolbelt";
import type { RefAttachment, WithRefOpts } from "../../internal/types.js";
interface MeterRootStateOpts extends WithRefOpts, ReadableBoxedValues<{
    value: number;
    max: number;
    min: number;
}> {
}
export declare class MeterRootState {
    static create(opts: MeterRootStateOpts): MeterRootState;
    readonly opts: MeterRootStateOpts;
    readonly attachment: RefAttachment;
    constructor(opts: MeterRootStateOpts);
    readonly props: {
        readonly role: "meter";
        readonly value: number;
        readonly "aria-valuemin": number;
        readonly "aria-valuemax": number;
        readonly "aria-valuenow": number;
        readonly "data-value": number;
        readonly "data-max": number;
        readonly "data-min": number;
    };
}
export {};
