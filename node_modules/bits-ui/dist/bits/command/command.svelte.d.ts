import { type WritableBoxedValues, type ReadableBoxedValues } from "svelte-toolbelt";
import type { CommandState } from "./types.js";
import type { BitsKeyboardEvent, BitsMouseEvent, BitsPointerEvent, RefAttachment, WithRefOpts } from "../../internal/types.js";
interface GridItem {
    index: number;
    firstRowOfGroup: boolean;
    ref: HTMLElement;
}
type ItemsGrid = GridItem[][];
interface CommandRootStateOpts extends WithRefOpts, ReadableBoxedValues<{
    filter: (value: string, search: string, keywords?: string[]) => number;
    shouldFilter: boolean;
    loop: boolean;
    vimBindings: boolean;
    columns: number | null;
    disablePointerSelection: boolean;
    disableInitialScroll: boolean;
    onStateChange?: (state: Readonly<CommandState>) => void;
}>, WritableBoxedValues<{
    value: string;
}> {
}
export declare class CommandRootState {
    #private;
    static create(opts: CommandRootStateOpts): CommandRootState;
    readonly opts: CommandRootStateOpts;
    readonly attachment: RefAttachment;
    sortAfterTick: boolean;
    sortAndFilterAfterTick: boolean;
    allItems: Set<string>;
    allGroups: Map<string, Set<string>>;
    allIds: Map<string, {
        value: string;
        keywords?: string[];
    }>;
    key: number;
    viewportNode: HTMLElement | null;
    inputNode: HTMLElement | null;
    labelNode: HTMLElement | null;
    commandState: CommandState;
    _commandState: CommandState;
    setState<K extends keyof CommandState>(key: K, value: CommandState[K], preventScroll?: boolean): void;
    constructor(opts: CommandRootStateOpts);
    /**
     * Sets current value and triggers re-render if cleared.
     *
     * @param value - New value to set
     */
    setValue(value: string, opts?: boolean): void;
    /**
     * Gets all non-disabled, visible command items.
     *
     * @returns Array of valid item elements
     * @remarks Exposed for direct item access and bound checking
     */
    getValidItems(): HTMLElement[];
    /**
     * Gets all visible command items.
     *
     * @returns Array of valid item elements
     * @remarks Exposed for direct item access and bound checking
     */
    getVisibleItems(): HTMLElement[];
    /** Returns all visible items in a matrix structure
     *
     * @remarks Returns empty if the command isn't configured as a grid
     *
     * @returns
     */
    get itemsGrid(): ItemsGrid;
    /**
     * Sets selection to item at specified index in valid items array.
     * If index is out of bounds, does nothing.
     *
     * @param index - Zero-based index of item to select
     * @remarks
     * Uses `getValidItems()` to get selectable items, filtering out disabled/hidden ones.
     * Access valid items directly via `getValidItems()` to check bounds before calling.
     *
     * @example
     * // get valid items length for bounds check
     * const items = getValidItems()
     * if (index < items.length) {
     *   updateSelectedToIndex(index)
     * }
     */
    updateSelectedToIndex(index: number): void;
    /**
     * Updates selected item by moving up/down relative to current selection.
     * Handles wrapping when loop option is enabled.
     *
     * @param change - Direction to move: 1 for next item, -1 for previous item
     * @remarks
     * The loop behavior wraps:
     * - From last item to first when moving next
     * - From first item to last when moving previous
     *
     * Uses `getValidItems()` to get all selectable items, which filters out disabled/hidden items.
     * You can call `getValidItems()` directly to get the current valid items array.
     *
     * @example
     * // select next item
     * updateSelectedByItem(1)
     *
     * // get all valid items
     * const items = getValidItems()
     */
    updateSelectedByItem(change: number): void;
    /**
     * Moves selection to the first valid item in the next/previous group.
     * If no group is found, falls back to selecting the next/previous item globally.
     *
     * @param change - Direction to move: 1 for next group, -1 for previous group
     * @example
     * // move to first item in next group
     * updateSelectedByGroup(1)
     *
     * // move to first item in previous group
     * updateSelectedByGroup(-1)
     */
    updateSelectedByGroup(change: 1 | -1): void;
    /**
     * Maps item id to display value and search keywords.
     * Returns cleanup function to remove mapping.
     *
     * @param id - Unique item identifier
     * @param value - Display text
     * @param keywords - Optional search boost terms
     * @returns Cleanup function
     */
    registerValue(value: string, keywords?: string[]): () => void;
    /**
     * Registers item in command list and its group.
     * Handles filtering, sorting and selection updates.
     *
     * @param id - Item identifier
     * @param groupId - Optional group to add item to
     * @returns Cleanup function that handles selection
     */
    registerItem(id: string, groupId: string | undefined): () => void;
    /**
     * Creates empty group if not exists.
     *
     * @param id - Group identifier
     * @returns Cleanup function
     */
    registerGroup(id: string): () => void;
    get isGrid(): boolean;
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly id: string;
        readonly role: "application";
        readonly tabindex: -1;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    };
}
interface CommandEmptyStateOpts extends WithRefOpts, ReadableBoxedValues<{
    forceMount: boolean;
}> {
}
export declare class CommandEmptyState {
    #private;
    static create(opts: CommandEmptyStateOpts): CommandEmptyState;
    readonly opts: CommandEmptyStateOpts;
    readonly root: CommandRootState;
    readonly attachment: RefAttachment;
    readonly shouldRender: boolean;
    constructor(opts: CommandEmptyStateOpts, root: CommandRootState);
    readonly props: {
        readonly id: string;
        readonly role: "presentation";
    };
}
interface CommandGroupContainerStateOpts extends WithRefOpts, ReadableBoxedValues<{
    value: string;
    forceMount: boolean;
}> {
}
export declare class CommandGroupContainerState {
    static create(opts: CommandGroupContainerStateOpts): CommandGroupContainerState;
    readonly opts: CommandGroupContainerStateOpts;
    readonly root: CommandRootState;
    readonly attachment: RefAttachment;
    readonly shouldRender: boolean;
    headingNode: HTMLElement | null;
    trueValue: string;
    constructor(opts: CommandGroupContainerStateOpts, root: CommandRootState);
    readonly props: {
        readonly id: string;
        readonly role: "presentation";
        readonly hidden: true | undefined;
        readonly "data-value": string;
    };
}
interface CommandGroupHeadingStateOpts extends WithRefOpts {
}
export declare class CommandGroupHeadingState {
    static create(opts: CommandGroupHeadingStateOpts): CommandGroupHeadingState;
    readonly opts: CommandGroupHeadingStateOpts;
    readonly group: CommandGroupContainerState;
    readonly attachment: RefAttachment;
    constructor(opts: CommandGroupHeadingStateOpts, group: CommandGroupContainerState);
    readonly props: {
        readonly id: string;
    };
}
interface CommandGroupItemsStateOpts extends WithRefOpts {
}
export declare class CommandGroupItemsState {
    static create(opts: CommandGroupItemsStateOpts): CommandGroupItemsState;
    readonly opts: CommandGroupItemsStateOpts;
    readonly group: CommandGroupContainerState;
    readonly attachment: RefAttachment;
    constructor(opts: CommandGroupItemsStateOpts, group: CommandGroupContainerState);
    readonly props: {
        readonly id: string;
        readonly role: "group";
        readonly "aria-labelledby": string | undefined;
    };
}
interface CommandInputStateOpts extends WithRefOpts, WritableBoxedValues<{
    value: string;
}>, ReadableBoxedValues<{
    autofocus: boolean;
}> {
}
export declare class CommandInputState {
    #private;
    static create(opts: CommandInputStateOpts): CommandInputState;
    readonly opts: CommandInputStateOpts;
    readonly root: CommandRootState;
    readonly attachment: RefAttachment;
    constructor(opts: CommandInputStateOpts, root: CommandRootState);
    readonly props: {
        readonly id: string;
        readonly type: "text";
        readonly autocomplete: "off";
        readonly autocorrect: "off";
        readonly spellcheck: false;
        readonly "aria-autocomplete": "list";
        readonly role: "combobox";
        readonly "aria-expanded": "true" | "false";
        readonly "aria-controls": string | undefined;
        readonly "aria-labelledby": string | undefined;
        readonly "aria-activedescendant": string | undefined;
    };
}
interface CommandItemStateOpts extends WithRefOpts, ReadableBoxedValues<{
    value: string;
    disabled: boolean;
    onSelect: () => void;
    forceMount: boolean;
    keywords: string[];
}> {
    group: CommandGroupContainerState | null;
}
export declare class CommandItemState {
    #private;
    static create(opts: Omit<CommandItemStateOpts, "group">): CommandItemState;
    readonly opts: CommandItemStateOpts;
    readonly root: CommandRootState;
    readonly attachment: RefAttachment;
    readonly shouldRender: boolean;
    readonly isSelected: boolean;
    trueValue: string;
    constructor(opts: CommandItemStateOpts, root: CommandRootState);
    onpointermove(_: BitsPointerEvent): void;
    onclick(_: BitsMouseEvent): void;
    readonly props: {
        readonly id: string;
        readonly "aria-disabled": "true" | "false";
        readonly "aria-selected": "true" | "false";
        readonly "data-disabled": "" | undefined;
        readonly "data-selected": "" | undefined;
        readonly "data-value": string;
        readonly "data-group": string | undefined;
        readonly role: "option";
        readonly onpointermove: (_: BitsPointerEvent) => void;
        readonly onclick: (_: BitsMouseEvent) => void;
    };
}
interface CommandLoadingStateOpts extends WithRefOpts, ReadableBoxedValues<{
    progress: number;
}> {
}
export declare class CommandLoadingState {
    static create(opts: CommandLoadingStateOpts): CommandLoadingState;
    readonly opts: CommandLoadingStateOpts;
    readonly attachment: RefAttachment;
    constructor(opts: CommandLoadingStateOpts);
    readonly props: {
        readonly id: string;
        readonly role: "progressbar";
        readonly "aria-valuenow": number;
        readonly "aria-valuemin": 0;
        readonly "aria-valuemax": 100;
        readonly "aria-label": "Loading...";
    };
}
interface CommandSeparatorStateOpts extends WithRefOpts, ReadableBoxedValues<{
    forceMount: boolean;
}> {
}
export declare class CommandSeparatorState {
    static create(opts: CommandSeparatorStateOpts): CommandSeparatorState;
    readonly opts: CommandSeparatorStateOpts;
    readonly root: CommandRootState;
    readonly attachment: RefAttachment;
    readonly shouldRender: boolean;
    constructor(opts: CommandSeparatorStateOpts, root: CommandRootState);
    readonly props: {
        readonly id: string;
        readonly "aria-hidden": "true";
    };
}
interface CommandListStateOpts extends WithRefOpts, ReadableBoxedValues<{
    ariaLabel: string;
}> {
}
export declare class CommandListState {
    static create(opts: CommandListStateOpts): CommandListState;
    readonly opts: CommandListStateOpts;
    readonly root: CommandRootState;
    readonly attachment: RefAttachment;
    constructor(opts: CommandListStateOpts, root: CommandRootState);
    readonly props: {
        readonly id: string;
        readonly role: "listbox";
        readonly "aria-label": string;
    };
}
interface CommandLabelStateOpts extends WithRefOpts, ReadableBoxedValues<{
    for?: string;
}> {
}
export declare class CommandLabelState {
    static create(opts: CommandLabelStateOpts): CommandLabelState;
    readonly opts: CommandLabelStateOpts;
    readonly root: CommandRootState;
    readonly attachment: RefAttachment;
    constructor(opts: CommandLabelStateOpts, root: CommandRootState);
    readonly props: {
        readonly id: string;
        readonly for: string | undefined;
        readonly style: import("svelte-toolbelt").StyleProperties;
    };
}
interface CommandViewportStateOpts extends WithRefOpts {
}
export declare class CommandViewportState {
    static create(opts: CommandViewportStateOpts): CommandViewportState;
    readonly opts: CommandViewportStateOpts;
    readonly list: CommandListState;
    readonly attachment: RefAttachment;
    constructor(opts: CommandViewportStateOpts, list: CommandListState);
    readonly props: {
        readonly id: string;
    };
}
export {};
