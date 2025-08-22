import { watch } from "../watch/watch.svelte.js";
/**
 * Holds the previous value of a getter.
 *
 * @see {@link https://runed.dev/docs/utilities/previous}
 */
export class Previous {
    #previous = $state(undefined);
    constructor(getter, initialValue) {
        if (initialValue !== undefined)
            this.#previous = initialValue;
        watch(() => getter(), (_, v) => {
            this.#previous = v;
        });
    }
    get current() {
        return this.#previous;
    }
}
