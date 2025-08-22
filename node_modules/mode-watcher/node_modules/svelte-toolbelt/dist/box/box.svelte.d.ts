import type { Expand, Getter, MaybeBoxOrGetter } from "../types.js";
declare const BoxSymbol: unique symbol;
declare const isWritableSymbol: unique symbol;
export type ReadableBox<T> = {
    readonly [BoxSymbol]: true;
    readonly current: T;
};
export type WritableBox<T> = ReadableBox<T> & {
    readonly [isWritableSymbol]: true;
    current: T;
};
/**
 * Creates a writable box.
 *
 * @returns A box with a `current` property which can be set to a new value.
 * Useful to pass state to other functions.
 *
 * @see {@link https://runed.dev/docs/functions/box}
 */
export declare function box<T>(): WritableBox<T | undefined>;
/**
 * Creates a writable box with an initial value.
 *
 * @param initialValue The initial value of the box.
 * @returns A box with a `current` property which can be set to a new value.
 * Useful to pass state to other functions.
 *
 * @see {@link https://runed.dev/docs/functions/box}
 */
export declare function box<T>(initialValue: T): WritableBox<T>;
export declare namespace box {
    export var from: typeof boxFrom;
    var _a: typeof boxWith;
    export var flatten: typeof boxFlatten;
    export var readonly: typeof toReadonlyBox;
    export var isBox: (value: unknown) => value is ReadableBox<unknown>;
    export var isWritableBox: (value: unknown) => value is WritableBox<unknown>;
    export { _a as with };
}
/**
 * Creates a readonly box
 *
 * @param getter Function to get the value of the box
 * @returns A box with a `current` property whose value is the result of the getter.
 * Useful to pass state to other functions.
 *
 * @see {@link https://runed.dev/docs/functions/box}
 */
declare function boxWith<T>(getter: () => T): ReadableBox<T>;
/**
 * Creates a writable box
 *
 * @param getter Function to get the value of the box
 * @param setter Function to set the value of the box
 * @returns A box with a `current` property which can be set to a new value.
 * Useful to pass state to other functions.
 *
 * @see {@link https://runed.dev/docs/functions/box}
 */
declare function boxWith<T>(getter: () => T, setter: (v: T) => void): WritableBox<T>;
/**
 * Creates a box from either a static value, a box, or a getter function.
 * Useful when you want to receive any of these types of values and generate a boxed version of it.
 *
 * @returns A box with a `current` property whose value.
 *
 * @see {@link https://runed.dev/docs/functions/box}
 */
declare function boxFrom<T>(value: T | WritableBox<T>): WritableBox<T>;
declare function boxFrom<T>(value: ReadableBox<T>): ReadableBox<T>;
declare function boxFrom<T>(value: Getter<T>): ReadableBox<T>;
declare function boxFrom<T>(value: MaybeBoxOrGetter<T>): ReadableBox<T>;
declare function boxFrom<T>(value: T): WritableBox<T>;
type GetKeys<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
type RemoveValues<T, U> = Omit<T, GetKeys<T, U>>;
type BoxFlatten<R extends Record<string, unknown>> = Expand<RemoveValues<{
    [K in keyof R]: R[K] extends WritableBox<infer T> ? T : never;
}, never> & RemoveValues<{
    readonly [K in keyof R]: R[K] extends WritableBox<infer _> ? never : R[K] extends ReadableBox<infer T> ? T : never;
}, never>> & RemoveValues<{
    [K in keyof R]: R[K] extends ReadableBox<infer _> ? never : R[K];
}, never>;
/**
 * Function that gets an object of boxes, and returns an object of reactive values
 *
 * @example
 * const count = box(0)
 * const flat = box.flatten({ count, double: box.with(() => count.current) })
 * // type of flat is { count: number, readonly double: number }
 *
 * @see {@link https://runed.dev/docs/functions/box}
 */
declare function boxFlatten<R extends Record<string, unknown>>(boxes: R): BoxFlatten<R>;
/**
 * Function that converts a box to a readonly box.
 *
 * @example
 * const count = box(0) // WritableBox<number>
 * const countReadonly = box.readonly(count) // ReadableBox<number>
 *
 * @see {@link https://runed.dev/docs/functions/box}
 */
declare function toReadonlyBox<T>(b: ReadableBox<T>): ReadableBox<T>;
export {};
