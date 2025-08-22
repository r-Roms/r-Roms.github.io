import { type ConfigurableDocumentOrShadowRoot, type ConfigurableWindow } from "../../internal/configurable-globals.js";
export interface ActiveElementOptions extends ConfigurableDocumentOrShadowRoot, ConfigurableWindow {
}
export declare class ActiveElement {
    #private;
    constructor(options?: ActiveElementOptions);
    get current(): Element | null;
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
export declare const activeElement: ActiveElement;
