import { DOMContext, composeHandlers, contains, executeCallbacks, } from "svelte-toolbelt";
import { watch } from "runed";
import { on } from "svelte/events";
import { noop } from "../../../internal/noop.js";
import { isHTMLElement } from "../../../internal/is.js";
globalThis.bitsTextSelectionLayers ??= new Map();
export class TextSelectionLayerState {
    static create(opts) {
        return new TextSelectionLayerState(opts);
    }
    opts;
    domContext;
    #unsubSelectionLock = noop;
    constructor(opts) {
        this.opts = opts;
        this.domContext = new DOMContext(opts.ref);
        let unsubEvents = noop;
        watch(() => this.opts.enabled.current, (isEnabled) => {
            if (isEnabled) {
                globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled);
                unsubEvents();
                unsubEvents = this.#addEventListeners();
            }
            return () => {
                unsubEvents();
                this.#resetSelectionLock();
                globalThis.bitsTextSelectionLayers.delete(this);
            };
        });
    }
    #addEventListeners() {
        return executeCallbacks(on(this.domContext.getDocument(), "pointerdown", this.#pointerdown), on(this.domContext.getDocument(), "pointerup", composeHandlers(this.#resetSelectionLock, this.opts.onPointerUp.current)));
    }
    #pointerdown = (e) => {
        const node = this.opts.ref.current;
        const target = e.target;
        if (!isHTMLElement(node) || !isHTMLElement(target) || !this.opts.enabled.current)
            return;
        /**
         * We only lock user-selection overflow if layer is the top most layer and
         * pointerdown occurred inside the node. You are still allowed to select text
         * outside the node provided pointerdown occurs outside the node.
         */
        if (!isHighestLayer(this) || !contains(node, target))
            return;
        this.opts.onPointerDown.current(e);
        if (e.defaultPrevented)
            return;
        this.#unsubSelectionLock = preventTextSelectionOverflow(node, this.domContext.getDocument().body);
    };
    #resetSelectionLock = () => {
        this.#unsubSelectionLock();
        this.#unsubSelectionLock = noop;
    };
}
const getUserSelect = (node) => node.style.userSelect || node.style.webkitUserSelect;
function preventTextSelectionOverflow(node, body) {
    const originalBodyUserSelect = getUserSelect(body);
    const originalNodeUserSelect = getUserSelect(node);
    setUserSelect(body, "none");
    setUserSelect(node, "text");
    return () => {
        setUserSelect(body, originalBodyUserSelect);
        setUserSelect(node, originalNodeUserSelect);
    };
}
function setUserSelect(node, value) {
    node.style.userSelect = value;
    node.style.webkitUserSelect = value;
}
function isHighestLayer(instance) {
    const layersArr = [...globalThis.bitsTextSelectionLayers];
    if (!layersArr.length)
        return false;
    const highestLayer = layersArr.at(-1);
    if (!highestLayer)
        return false;
    return highestLayer[0] === instance;
}
