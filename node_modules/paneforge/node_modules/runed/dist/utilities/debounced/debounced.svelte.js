import { useDebounce } from "../use-debounce/use-debounce.svelte.js";
import { watch } from "../watch/watch.svelte.js";
import { noop } from "../../internal/utils/function.js";
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
export class Debounced {
    #current = $state();
    #debounceFn;
    /**
     * @param getter A function that returns the state to watch.
     * @param wait The length of time to wait in ms, defaults to 250.
     */
    constructor(getter, wait = 250) {
        this.#current = getter(); // immediately set the initial value
        this.cancel = this.cancel.bind(this);
        this.setImmediately = this.setImmediately.bind(this);
        this.updateImmediately = this.updateImmediately.bind(this);
        this.#debounceFn = useDebounce(() => {
            this.#current = getter();
        }, wait);
        watch(getter, () => {
            this.#debounceFn().catch(noop);
        });
    }
    /**
     * Get the current value.
     */
    get current() {
        return this.#current;
    }
    /**
     * Cancel the latest timer.
     */
    cancel() {
        this.#debounceFn.cancel();
    }
    /**
     * Run the debounced function immediately.
     */
    updateImmediately() {
        return this.#debounceFn.runScheduledNow();
    }
    /**
     * Set the `current` value without waiting.
     */
    setImmediately(v) {
        this.cancel();
        this.#current = v;
    }
}
