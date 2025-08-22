import { type ReadableBoxedValues } from "svelte-toolbelt";
import type { RefAttachment, WithRefOpts } from "../../internal/types.js";
interface ProgressRootStateOpts extends WithRefOpts, ReadableBoxedValues<{
    value: number | null;
    max: number;
    min: number;
}> {
}
export declare class ProgressRootState {
    static create(opts: ProgressRootStateOpts): ProgressRootState;
    readonly opts: ProgressRootStateOpts;
    readonly attachment: RefAttachment;
    constructor(opts: ProgressRootStateOpts);
    readonly props: {
        readonly role: "progressbar";
        readonly value: number | null;
        readonly "aria-valuemin": number;
        readonly "aria-valuemax": number;
        readonly "aria-valuenow": number | undefined;
        readonly "data-value": number | undefined;
        readonly "data-state": "indeterminate" | "loading" | "loaded";
        readonly "data-max": number;
        readonly "data-min": number;
        readonly "data-indeterminate": "" | undefined;
    };
}
export {};
