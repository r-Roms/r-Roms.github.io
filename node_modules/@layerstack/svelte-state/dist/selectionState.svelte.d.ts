export type SelectionOptions<T, S extends boolean = false> = {
    /** Initial values */
    initial?: T[];
    /** All values to select when `toggleAll()` is called */
    all?: T[];
    /** Only allow 1 selected value */
    single?: S;
    /** Maximum number of values that can be selected  */
    max?: number;
};
export declare class SelectionState<T, S extends boolean = false> {
    #private;
    all: Array<T>;
    single: S;
    max: number | undefined;
    constructor(options?: SelectionOptions<T, S>);
    get current(): S extends true ? T | null : T[];
    set current(values: T[] | T | null);
    /** Check if a value is selected */
    isSelected(value: T): boolean;
    /** Check if the selection is empty */
    isEmpty(): boolean;
    /** Check if all values in `all` are selected */
    isAllSelected(): boolean;
    /** Check if any values in `all` are selected */
    isAnySelected(): boolean;
    /** Check if the selection is at the maximum */
    isMaxSelected(): boolean;
    /** Check if a value is disabled (max reached) */
    isDisabled(value: T): boolean;
    /** Clear all selected values */
    clear(): void;
    /** Reset to initial values */
    reset(): void;
    /** Toggle a value */
    toggle(value: T): void;
    /** Toggle all values */
    toggleAll(): void;
}
//# sourceMappingURL=selectionState.svelte.d.ts.map