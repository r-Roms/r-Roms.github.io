import { type ReadableBoxedValues } from "svelte-toolbelt";
import type { RefAttachment, WithRefOpts } from "../../internal/types.js";
interface AspectRatioRootStateOpts extends WithRefOpts, ReadableBoxedValues<{
    ratio: number;
}> {
}
export declare class AspectRatioRootState {
    static create(opts: AspectRatioRootStateOpts): AspectRatioRootState;
    readonly opts: AspectRatioRootStateOpts;
    readonly attachment: RefAttachment;
    constructor(opts: AspectRatioRootStateOpts);
    readonly props: {
        readonly id: string;
        readonly style: {
            readonly position: "absolute";
            readonly top: 0;
            readonly right: 0;
            readonly bottom: 0;
            readonly left: 0;
        };
    };
}
export {};
