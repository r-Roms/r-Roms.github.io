import { type ReadableBox, type ReadableBoxedValues, type WritableBoxedValues } from "svelte-toolbelt";
import type { InteractOutsideBehaviorType } from "../utilities/dismissible-layer/types.js";
import type { Direction } from "../../shared/index.js";
import type { OnChangeFn, RefAttachment, WithRefOpts } from "../../internal/types.js";
import type { FocusEventHandler, KeyboardEventHandler, PointerEventHandler } from "svelte/elements";
import { RovingFocusGroup } from "../../internal/roving-focus-group.js";
interface MenubarRootStateOpts extends WithRefOpts, ReadableBoxedValues<{
    dir: Direction;
    loop: boolean;
}>, WritableBoxedValues<{
    value: string;
}> {
}
export declare class MenubarRootState {
    static create(opts: MenubarRootStateOpts): MenubarRootState;
    readonly opts: MenubarRootStateOpts;
    readonly rovingFocusGroup: RovingFocusGroup;
    readonly attachment: RefAttachment;
    wasOpenedByKeyboard: boolean;
    triggerIds: string[];
    valueToChangeHandler: Map<string, ReadableBox<OnChangeFn<boolean>>>;
    constructor(opts: MenubarRootStateOpts);
    /**
     * @param id - the id of the trigger to register
     * @returns - a function to de-register the trigger
     */
    registerTrigger: (id: string) => () => void;
    /**
     * @param value - the value of the menu to register
     * @param contentId - the content id to associate with the value
     * @returns - a function to de-register the menu
     */
    registerMenu: (value: string, onOpenChange: ReadableBox<OnChangeFn<boolean>>) => () => void;
    updateValue: (value: string) => void;
    getTriggers: () => HTMLButtonElement[];
    onMenuOpen: (id: string, triggerId: string) => void;
    onMenuClose: () => void;
    onMenuToggle: (id: string) => void;
    readonly props: {
        readonly id: string;
        readonly role: "menubar";
    };
}
interface MenubarMenuStateOpts extends ReadableBoxedValues<{
    value: string;
    onOpenChange: OnChangeFn<boolean>;
}> {
}
export declare class MenubarMenuState {
    static create(opts: MenubarMenuStateOpts): MenubarMenuState;
    readonly opts: MenubarMenuStateOpts;
    readonly root: MenubarRootState;
    open: boolean;
    wasOpenedByKeyboard: boolean;
    triggerNode: HTMLElement | null;
    triggerId: string | undefined;
    contentId: string | undefined;
    contentNode: HTMLElement | null;
    constructor(opts: MenubarMenuStateOpts, root: MenubarRootState);
    getTriggerNode(): HTMLElement | null;
    toggleMenu(): void;
    openMenu(): void;
}
interface MenubarTriggerStateOpts extends WithRefOpts, ReadableBoxedValues<{
    disabled: boolean;
}> {
}
export declare class MenubarTriggerState {
    #private;
    static create(opts: MenubarTriggerStateOpts): MenubarTriggerState;
    readonly opts: MenubarTriggerStateOpts;
    readonly menu: MenubarMenuState;
    readonly root: MenubarRootState;
    readonly attachment: RefAttachment;
    isFocused: boolean;
    constructor(opts: MenubarTriggerStateOpts, menu: MenubarMenuState);
    onpointerdown: PointerEventHandler<HTMLElement>;
    onpointerenter: PointerEventHandler<HTMLElement>;
    onkeydown: KeyboardEventHandler<HTMLElement>;
    onfocus: FocusEventHandler<HTMLElement>;
    onblur: FocusEventHandler<HTMLElement>;
    readonly props: {
        readonly type: "button";
        readonly role: "menuitem";
        readonly id: string;
        readonly "aria-haspopup": "menu";
        readonly "aria-expanded": "true" | "false";
        readonly "aria-controls": string | undefined;
        readonly "data-highlighted": "" | undefined;
        readonly "data-state": "open" | "closed";
        readonly "data-disabled": "" | undefined;
        readonly "data-menu-value": string;
        readonly disabled: true | undefined;
        readonly tabindex: number;
        readonly onpointerdown: PointerEventHandler<HTMLElement>;
        readonly onpointerenter: PointerEventHandler<HTMLElement>;
        readonly onkeydown: KeyboardEventHandler<HTMLElement>;
        readonly onfocus: FocusEventHandler<HTMLElement>;
        readonly onblur: FocusEventHandler<HTMLElement>;
    };
}
interface MenubarContentStateOpts extends WithRefOpts, ReadableBoxedValues<{
    interactOutsideBehavior: InteractOutsideBehaviorType;
    onOpenAutoFocus: (e: Event) => void;
    onCloseAutoFocus: (e: Event) => void;
    onFocusOutside: (e: FocusEvent) => void;
    onInteractOutside: (e: PointerEvent) => void;
}> {
}
export declare class MenubarContentState {
    static create(opts: MenubarContentStateOpts): MenubarContentState;
    readonly opts: MenubarContentStateOpts;
    readonly menu: MenubarMenuState;
    readonly root: MenubarRootState;
    readonly attachment: RefAttachment;
    constructor(opts: MenubarContentStateOpts, menu: MenubarMenuState);
    onCloseAutoFocus: (e: Event) => void;
    onFocusOutside: (e: FocusEvent) => void;
    onInteractOutside: (e: PointerEvent) => void;
    onOpenAutoFocus: (e: Event) => void;
    onkeydown: KeyboardEventHandler<HTMLElement>;
    props: {
        readonly id: string;
        readonly "aria-labelledby": string | undefined;
        readonly style: {
            [x: string]: string;
        };
        readonly onkeydown: KeyboardEventHandler<HTMLElement>;
        readonly "data-menu-content": "";
    };
    popperProps: {
        onCloseAutoFocus: (e: Event) => void;
        onFocusOutside: (e: FocusEvent) => void;
        onInteractOutside: (e: PointerEvent) => void;
        onOpenAutoFocus: (e: Event) => void;
    };
}
export {};
