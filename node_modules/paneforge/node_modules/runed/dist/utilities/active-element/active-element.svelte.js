import { defaultWindow, } from "../../internal/configurable-globals.js";
import { getActiveElement } from "../../internal/utils/dom.js";
import { on } from "svelte/events";
import { createSubscriber } from "svelte/reactivity";
export class ActiveElement {
    #document;
    #subscribe;
    constructor(options = {}) {
        const { window = defaultWindow, document = window?.document } = options;
        if (window === undefined)
            return;
        this.#document = document;
        this.#subscribe = createSubscriber((update) => {
            const cleanupFocusIn = on(window, "focusin", update);
            const cleanupFocusOut = on(window, "focusout", update);
            return () => {
                cleanupFocusIn();
                cleanupFocusOut();
            };
        });
    }
    get current() {
        this.#subscribe?.();
        if (!this.#document)
            return null;
        return getActiveElement(this.#document);
    }
}
/**
 * An object holding a reactive value that is equal to `document.activeElement`.
 * It automatically listens for changes, keeping the reference up to date.
 *
 * If you wish to use a custom document or shadowRoot, you should use
 * [useActiveElement](https://runed.dev/docs/utilities/active-element) instead.
 *
 * @see {@link https://runed.dev/docs/utilities/active-element}
 */
export const activeElement = new ActiveElement();
