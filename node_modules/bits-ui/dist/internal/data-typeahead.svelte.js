import { getNextMatch } from "./arrays.js";
import { boxAutoReset } from "./box-auto-reset.svelte.js";
export class DataTypeahead {
    #opts;
    #candidateValues = $derived.by(() => this.#opts.candidateValues());
    #search;
    constructor(opts) {
        this.#opts = opts;
        this.#search = boxAutoReset("", {
            afterMs: 1000,
            getWindow: this.#opts.getWindow,
        });
        this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this);
        this.resetTypeahead = this.resetTypeahead.bind(this);
    }
    handleTypeaheadSearch(key) {
        if (!this.#opts.enabled() || !this.#candidateValues.length)
            return;
        this.#search.current = this.#search.current + key;
        const currentItem = this.#opts.getCurrentItem();
        const currentMatch = this.#candidateValues.find((item) => item === currentItem) ?? "";
        const values = this.#candidateValues.map((item) => item ?? "");
        const nextMatch = getNextMatch(values, this.#search.current, currentMatch);
        const newItem = this.#candidateValues.find((item) => item === nextMatch);
        if (newItem) {
            this.#opts.onMatch(newItem);
        }
        return newItem;
    }
    resetTypeahead() {
        this.#search.current = "";
    }
}
