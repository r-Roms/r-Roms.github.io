import { type WritableBox } from "svelte-toolbelt";
type BoxAutoResetOptions<T> = {
    afterMs?: number;
    onChange?: (value: T) => void;
    getWindow: () => Window & typeof globalThis;
};
/**
 * Creates a box which will be reset to the default value after some time.
 *
 * @param defaultValue The value which will be set.
 * @param afterMs      A zero-or-greater delay in milliseconds.
 */
export declare function boxAutoReset<T>(defaultValue: T, options: BoxAutoResetOptions<T>): WritableBox<T>;
export {};
