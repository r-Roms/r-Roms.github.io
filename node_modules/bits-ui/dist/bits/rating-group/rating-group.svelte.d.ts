import { DOMContext, type ReadableBoxedValues, type WritableBoxedValues } from "svelte-toolbelt";
import type { BitsKeyboardEvent, BitsMouseEvent, BitsPointerEvent, RefAttachment, WithRefOpts } from "../../internal/types.js";
import type { RatingGroupAriaValuetext, RatingGroupItemState as RatingGroupItemStateType } from "./types.js";
import type { Orientation } from "../../shared/index.js";
interface RatingGroupRootStateOpts extends WithRefOpts, ReadableBoxedValues<{
    disabled: boolean;
    required: boolean;
    orientation: Orientation;
    name: string | undefined;
    min: number;
    max: number;
    allowHalf: boolean;
    readonly: boolean;
    hoverPreview: boolean;
    ariaValuetext: NonNullable<RatingGroupAriaValuetext>;
}>, WritableBoxedValues<{
    value: number;
}> {
}
export declare class RatingGroupRootState {
    #private;
    static create(opts: RatingGroupRootStateOpts): RatingGroupRootState;
    readonly opts: RatingGroupRootStateOpts;
    readonly attachment: RefAttachment;
    domContext: DOMContext;
    readonly hasValue: boolean;
    readonly valueToUse: number;
    readonly isRTL: boolean;
    readonly ariaValuetext: string;
    readonly items: {
        index: number;
        state: RatingGroupItemStateType;
    }[];
    constructor(opts: RatingGroupRootStateOpts);
    isActive(itemIndex: number): boolean;
    isPartial(itemIndex: number): boolean;
    setHoverValue(value: number | null): void;
    setValue(value: number): void;
    calculateRatingFromPointer(itemIndex: number, event: {
        clientX: number;
        clientY: number;
        currentTarget: HTMLElement;
    }): number;
    onpointerleave(): void;
    readonly handlers: Record<string, () => void>;
    onkeydown(e: BitsKeyboardEvent): void;
    readonly snippetProps: {
        items: {
            index: number;
            state: RatingGroupItemStateType;
        }[];
        value: number;
        max: number;
    };
    readonly props: {
        readonly id: string;
        readonly role: "slider";
        readonly "aria-valuenow": number;
        readonly "aria-valuemin": number;
        readonly "aria-valuemax": number;
        readonly "aria-valuetext": string;
        readonly "aria-orientation": Orientation;
        readonly "aria-required": "true" | "false";
        readonly "aria-disabled": "true" | undefined;
        readonly "aria-label": "Rating";
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
        readonly "data-orientation": Orientation;
        readonly tabindex: 0 | -1;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
        readonly onpointerleave: () => void;
    };
}
interface RatingGroupItemStateOpts extends WithRefOpts, ReadableBoxedValues<{
    disabled: boolean;
    index: number;
}> {
}
export declare class RatingGroupItemState {
    #private;
    static create(opts: RatingGroupItemStateOpts): RatingGroupItemState;
    readonly opts: RatingGroupItemStateOpts;
    readonly root: RatingGroupRootState;
    readonly attachment: RefAttachment;
    constructor(opts: RatingGroupItemStateOpts, root: RatingGroupRootState);
    onclick(e: BitsMouseEvent): void;
    onpointermove(e: BitsPointerEvent): void;
    readonly snippetProps: {
        readonly state: RatingGroupItemStateType;
    };
    readonly props: {
        readonly id: string;
        readonly role: "presentation";
        readonly "data-value": number;
        readonly "data-orientation": Orientation;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
        readonly "data-state": RatingGroupItemStateType;
        readonly onclick: (e: BitsMouseEvent) => void;
        readonly onpointermove: (e: BitsPointerEvent) => void;
    };
}
export declare class RatingGroupHiddenInputState {
    static create(): RatingGroupHiddenInputState;
    readonly root: RatingGroupRootState;
    readonly shouldRender: boolean;
    readonly props: {
        readonly name: string | undefined;
        readonly value: number;
        readonly required: boolean;
        readonly disabled: boolean;
    };
    constructor(root: RatingGroupRootState);
}
export {};
