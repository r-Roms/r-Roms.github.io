import { box } from "../box/box.svelte.js";
import { getActiveElement, getDocument } from "./dom.js";
export class DOMContext {
    element;
    root = $derived.by(() => {
        if (!this.element.current)
            return document;
        const rootNode = this.element.current.getRootNode() ?? document;
        return rootNode;
    });
    constructor(element) {
        if (typeof element === "function") {
            this.element = box.with(element);
        }
        else {
            this.element = element;
        }
    }
    getDocument = () => {
        return getDocument(this.root);
    };
    getWindow = () => {
        return this.getDocument().defaultView ?? window;
    };
    getActiveElement = () => {
        return getActiveElement(this.root);
    };
    isActiveElement = (node) => {
        return node === this.getActiveElement();
    };
    getElementById(id) {
        return this.root.getElementById(id);
    }
    querySelector = (selector) => {
        if (!this.root)
            return null;
        return this.root.querySelector(selector);
    };
    querySelectorAll = (selector) => {
        if (!this.root)
            return [];
        return this.root.querySelectorAll(selector);
    };
    setTimeout = (callback, delay) => {
        return this.getWindow().setTimeout(callback, delay);
    };
    clearTimeout = (timeoutId) => {
        return this.getWindow().clearTimeout(timeoutId);
    };
}
