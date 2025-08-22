import type { BitsMouseEvent, RefAttachment, WithRefOpts } from "../../internal/types.js";
interface LabelRootStateOpts extends WithRefOpts {
}
export declare class LabelRootState {
    static create(opts: LabelRootStateOpts): LabelRootState;
    readonly opts: LabelRootStateOpts;
    readonly attachment: RefAttachment;
    constructor(opts: LabelRootStateOpts);
    onmousedown(e: BitsMouseEvent): void;
    readonly props: {
        readonly id: string;
        readonly onmousedown: (e: BitsMouseEvent) => void;
    };
}
export {};
