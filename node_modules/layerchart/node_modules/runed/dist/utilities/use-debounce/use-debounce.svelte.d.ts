import type { MaybeGetter } from "../../internal/types.js";
type UseDebounceReturn<Args extends unknown[], Return> = ((this: unknown, ...args: Args) => Promise<Return>) & {
    cancel: () => void;
    runScheduledNow: () => Promise<void>;
    pending: boolean;
};
/**
 * Function that takes a callback, and returns a debounced version of it.
 * When calling the debounced function, it will wait for the specified time
 * before calling the original callback. If the debounced function is called
 * again before the time has passed, the timer will be reset.
 *
 * You can await the debounced function to get the value when it is eventually
 * called.
 *
 * The second parameter is the time to wait before calling the original callback.
 * Alternatively, it can also be a getter function that returns the time to wait.
 *
 * @see {@link https://runed.dev/docs/utilities/use-debounce}
 *
 * @param callback The callback to call when the time has passed.
 * @param wait The length of time to wait in ms, defaults to 250.
 */
export declare function useDebounce<Args extends unknown[], Return>(callback: (...args: Args) => Return, wait?: MaybeGetter<number | undefined>): UseDebounceReturn<Args, Return>;
export {};
