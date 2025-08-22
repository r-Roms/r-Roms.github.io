/**
 * Holds the previous value of a getter.
 *
 * @see {@link https://runed.dev/docs/utilities/previous}
 */
export class Previous {
    #previous = $state(undefined);
    #curr;
    constructor(getter) {
        $effect(() => {
            this.#previous = this.#curr;
            this.#curr = getter();
        });
    }
    get current() {
        return this.#previous;
    }
}
