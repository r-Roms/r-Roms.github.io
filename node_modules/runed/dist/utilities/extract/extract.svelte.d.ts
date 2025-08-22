import type { MaybeGetter } from "../../internal/types.js";
/**
 * Resolves a value that may be a getter function or a direct value.
 *
 * If the input is a function, it will be invoked to retrieve the actual value.
 * If the resolved value (or the input itself) is `undefined`, the optional
 * `defaultValue` is returned instead.
 *
 * @template T - The expected return type.
 * @param value - A value or a function that returns a value.
 * @param defaultValue - A fallback value returned if the resolved value is `undefined`.
 * @returns The resolved value or the default.
 */
export declare function extract<T>(value: MaybeGetter<T>): T;
export declare function extract<T>(value: MaybeGetter<T | undefined>, defaultValue: T): T;
