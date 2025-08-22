import { ActiveElement, } from "../active-element/active-element.svelte.js";
import { extract } from "../extract/extract.svelte.js";
/**
 * Tracks whether the focus is within a target element.
 * @see {@link https://runed.dev/docs/utilities/is-focus-within}
 */
export class IsFocusWithin {
    #node;
    #activeElement;
    constructor(node, options = {}) {
        this.#node = node;
        this.#activeElement = new ActiveElement(options);
    }
    current = $derived.by(() => {
        const node = extract(this.#node);
        if (node == null)
            return false;
        return node.contains(this.#activeElement.current);
    });
}
