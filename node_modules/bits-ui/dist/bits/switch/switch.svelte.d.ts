import { type ReadableBoxedValues, type WritableBoxedValues } from "svelte-toolbelt";
import type { BitsKeyboardEvent, BitsPointerEvent, RefAttachment, WithRefOpts } from "../../internal/types.js";
interface SwitchRootStateOpts extends WithRefOpts, ReadableBoxedValues<{
    disabled: boolean;
    required: boolean;
    name: string | undefined;
    value: string;
}>, WritableBoxedValues<{
    checked: boolean;
}> {
}
export declare class SwitchRootState {
    #private;
    static create(opts: SwitchRootStateOpts): SwitchRootState;
    readonly opts: SwitchRootStateOpts;
    readonly attachment: RefAttachment;
    constructor(opts: SwitchRootStateOpts);
    onkeydown(e: BitsKeyboardEvent): void;
    onclick(_: BitsPointerEvent): void;
    readonly sharedProps: {
        "data-disabled": "" | undefined;
        "data-state": "checked" | "unchecked";
        "data-required": "" | undefined;
    };
    readonly snippetProps: {
        checked: boolean;
    };
    readonly props: {
        readonly id: string;
        readonly role: "switch";
        readonly disabled: true | undefined;
        readonly "aria-checked": "true" | "false" | "mixed";
        readonly "aria-required": "true" | "false";
        readonly onclick: (_: BitsPointerEvent) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
        readonly "data-disabled": "" | undefined;
        readonly "data-state": "checked" | "unchecked";
        readonly "data-required": "" | undefined;
    };
}
export declare class SwitchInputState {
    static create(): SwitchInputState;
    readonly root: SwitchRootState;
    readonly shouldRender: boolean;
    constructor(root: SwitchRootState);
    readonly props: {
        readonly type: "checkbox";
        readonly name: string | undefined;
        readonly value: string;
        readonly checked: boolean;
        readonly disabled: boolean;
        readonly required: boolean;
    };
}
interface SwitchThumbStateOpts extends WithRefOpts {
}
export declare class SwitchThumbState {
    static create(opts: SwitchThumbStateOpts): SwitchThumbState;
    readonly opts: SwitchThumbStateOpts;
    readonly root: SwitchRootState;
    readonly attachment: RefAttachment;
    constructor(opts: SwitchThumbStateOpts, root: SwitchRootState);
    readonly snippetProps: {
        checked: boolean;
    };
    readonly props: {
        readonly id: string;
        readonly "data-disabled": "" | undefined;
        readonly "data-state": "checked" | "unchecked";
        readonly "data-required": "" | undefined;
    };
}
export {};
