export class SharedState {
    #factory;
    #subscribers = 0;
    #state = $state();
    #scope;
    constructor(factory) {
        this.#factory = factory;
    }
    #dispose() {
        this.#subscribers -= 1;
        if (this.#scope && this.#subscribers <= 0) {
            this.#scope();
            this.#state = undefined;
            this.#scope = undefined;
        }
    }
    get(...args) {
        this.#subscribers += 1;
        if (this.#state === undefined) {
            this.#scope = $effect.root(() => {
                this.#state = this.#factory(...args);
            });
        }
        $effect(() => {
            return () => {
                this.#dispose();
            };
        });
        return this.#state;
    }
}
