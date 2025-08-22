import { getNextMatch } from "./arrays.js";
import { boxAutoReset } from "./box-auto-reset.svelte.js";
export class DOMTypeahead {
    #opts;
    #search;
    #onMatch = $derived.by(() => {
        if (this.#opts.onMatch)
            return this.#opts.onMatch;
        return (node) => node.focus();
    });
    #getCurrentItem = $derived.by(() => {
        if (this.#opts.getCurrentItem)
            return this.#opts.getCurrentItem;
        return this.#opts.getActiveElement;
    });
    constructor(opts) {
        this.#opts = opts;
        this.#search = boxAutoReset("", {
            afterMs: 1000,
            getWindow: opts.getWindow,
        });
        this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this);
        this.resetTypeahead = this.resetTypeahead.bind(this);
    }
    handleTypeaheadSearch(key, candidates) {
        if (!candidates.length)
            return;
        this.#search.current = this.#search.current + key;
        const currentItem = this.#getCurrentItem();
        const currentMatch = candidates.find((item) => item === currentItem)?.textContent?.trim() ?? "";
        const values = candidates.map((item) => item.textContent?.trim() ?? "");
        const nextMatch = getNextMatch(values, this.#search.current, currentMatch);
        const newItem = candidates.find((item) => item.textContent?.trim() === nextMatch);
        if (newItem)
            this.#onMatch(newItem);
        return newItem;
    }
    resetTypeahead() {
        this.#search.current = "";
    }
    get search() {
        return this.#search.current;
    }
}
