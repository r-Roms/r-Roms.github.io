import { SvelteSet } from 'svelte/reactivity';
/**
 * State to manage unique values using `SvelteSet` with improved
 * ergonomics and better control of updates
 */
export declare class UniqueState<T = string | number> {
    #private;
    current: SvelteSet<T>;
    constructor(initial?: T[]);
    /** Clear all values */
    clear(): void;
    /** Reset to initial values */
    reset(): void;
    /** Add a value */
    add(value: T): void;
    /** Add multiple values */
    addEach(values: T[]): void;
    /** Remove a value */
    delete(value: T): void;
    /** Toggle a value */
    toggle(value: T): void;
}
//# sourceMappingURL=uniqueState.svelte.d.ts.map