/**
 * A callback function that takes an array of arguments of type `T` and returns `void`.
 * @template T The types of the arguments that the callback function takes.
 */
export type Callback<T extends unknown[] = unknown[]> = (...args: T) => void;
type NonEmptyArray<T> = [T, ...T[]];
/**
 * Executes an array of callback functions with the same arguments.
 * @template T The types of the arguments that the callback functions take.
 * @returns A new function that executes all of the original callback functions with the same arguments.
 */
export declare function chain<T extends unknown[]>(...callbacks: NonEmptyArray<Callback<T>>): (...args: T) => void;
export {};
