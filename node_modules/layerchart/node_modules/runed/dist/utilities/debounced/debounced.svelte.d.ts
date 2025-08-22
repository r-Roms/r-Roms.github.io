import type { Getter, MaybeGetter } from "../../internal/types.js";
/**
 * A wrapper over {@link useDebounce} that creates a debounced state.
 * It takes a "getter" function which returns the state you want to debounce.
 * Every time this state changes a timer (re)starts, the length of which is
 * configurable with the `wait` arg. When the timer ends the `current` value
 * is updated.
 *
 * @see https://runed.dev/docs/utilities/debounced
 *
 * @example
 *
 * <script lang="ts">
 *   import { Debounced } from "runed";
 *
 *   let search = $state("");
 *   const debounced = new Debounced(() => search, 500);
 * </script>
 *
 * <div>
 *   <input bind:value={search} />
 *   <p>You searched for: <b>{debounced.current}</b></p>
 * </div>
 */
export declare class Debounced<T> {
    #private;
    /**
     * @param getter A function that returns the state to watch.
     * @param wait The length of time to wait in ms, defaults to 250.
     */
    constructor(getter: Getter<T>, wait?: MaybeGetter<number>);
    /**
     * Get the current value.
     */
    get current(): T;
    /**
     * Cancel the latest timer.
     */
    cancel(): void;
    /**
     * Run the debounced function immediately.
     */
    updateImmediately(): Promise<void>;
    /**
     * Set the `current` value without waiting.
     */
    setImmediately(v: T): void;
}
