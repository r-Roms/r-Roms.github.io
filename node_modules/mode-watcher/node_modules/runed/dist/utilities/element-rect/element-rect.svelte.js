import { extract } from "../extract/extract.svelte.js";
import { useMutationObserver } from "../use-mutation-observer/use-mutation-observer.svelte.js";
import { useResizeObserver } from "../use-resize-observer/use-resize-observer.svelte.js";
/**
 * Returns a reactive value holding the size of `node`.
 *
 * Accepts an `options` object with the following properties:
 * - `initialSize`: The initial size of the element. Defaults to `{ width: 0, height: 0 }`.
 * - `box`: The box model to use. Can be either `"content-box"` or `"border-box"`. Defaults to `"border-box"`.
 *
 * @returns an object with `width` and `height` properties.
 *
 * @see {@link https://runed.dev/docs/utilities/element-size}
 */
export class ElementRect {
    #rect = $state({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    });
    constructor(node, options = {}) {
        this.#rect = {
            width: options.initialRect?.width ?? 0,
            height: options.initialRect?.height ?? 0,
            x: options.initialRect?.x ?? 0,
            y: options.initialRect?.y ?? 0,
            top: options.initialRect?.top ?? 0,
            right: options.initialRect?.right ?? 0,
            bottom: options.initialRect?.bottom ?? 0,
            left: options.initialRect?.left ?? 0,
        };
        const el = $derived(extract(node));
        const update = () => {
            if (!el)
                return;
            const rect = el.getBoundingClientRect();
            this.#rect.width = rect.width;
            this.#rect.height = rect.height;
            this.#rect.x = rect.x;
            this.#rect.y = rect.y;
            this.#rect.top = rect.top;
            this.#rect.right = rect.right;
            this.#rect.bottom = rect.bottom;
            this.#rect.left = rect.left;
        };
        useResizeObserver(() => el, update, { window: options.window });
        $effect(update);
        useMutationObserver(() => el, update, {
            attributeFilter: ["style", "class"],
            window: options.window,
        });
    }
    get x() {
        return this.#rect.x;
    }
    get y() {
        return this.#rect.y;
    }
    get width() {
        return this.#rect.width;
    }
    get height() {
        return this.#rect.height;
    }
    get top() {
        return this.#rect.top;
    }
    get right() {
        return this.#rect.right;
    }
    get bottom() {
        return this.#rect.bottom;
    }
    get left() {
        return this.#rect.left;
    }
    get current() {
        return this.#rect;
    }
}
