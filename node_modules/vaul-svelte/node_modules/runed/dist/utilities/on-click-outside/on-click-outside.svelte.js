import { defaultWindow, } from "../../internal/configurable-globals.js";
import { getActiveElement, getOwnerDocument, isOrContainsTarget } from "../../internal/utils/dom.js";
import { noop } from "../../internal/utils/function.js";
import { isElement } from "../../internal/utils/is.js";
import { sleep } from "../../internal/utils/sleep.js";
import { on } from "svelte/events";
import { extract } from "../extract/extract.svelte.js";
import { useDebounce } from "../use-debounce/use-debounce.svelte.js";
import { watch } from "../watch/watch.svelte.js";
/**
 * A utility that calls a given callback when a click event occurs outside of
 * a specified container element.
 *
 * @template T - The type of the container element, defaults to HTMLElement.
 * @param {MaybeElementGetter<T>} container - The container element or a getter function that returns the container element.
 * @param {() => void} callback - The callback function to call when a click event occurs outside of the container.
 * @param {OnClickOutsideOptions} [opts={}] - Optional configuration object.
 * @param {ConfigurableDocument} [opts.document=defaultDocument] - The document object to use, defaults to the global document.
 * @param {boolean} [opts.immediate=true] - Whether the click outside handler is enabled by default or not.
 * @param {boolean} [opts.detectIframe=false] - Controls whether focus events from iframes trigger the callback.
 *
 * @example
 * ```svelte
 * <script>
 *   import { onClickOutside } from 'runed'
 *   let container = $state<HTMLElement>()!
 *
 *   const clickOutside = onClickOutside(() => container, () => {
 *     console.log('clicked outside the container!')
 *   });
 * </script>
 *
 * <div bind:this={container}>
 *  <span>Inside</span>
 * </div>
 * <button>Outside, click me to trigger callback</button>
 * <button onclick={clickOutside.start}>Start</button>
 * <button onclick={clickOutside.stop}>Stop</button>
 * <span>Enabled: {clickOutside.enabled}</span>
 *```
 * @see {@link https://runed.dev/docs/utilities/on-click-outside}
 */
export function onClickOutside(container, callback, opts = {}) {
    const { window = defaultWindow, immediate = true, detectIframe = false } = opts;
    const document = opts.document ?? window?.document;
    const node = $derived(extract(container));
    const nodeOwnerDocument = $derived(getOwnerDocument(node, document));
    let enabled = $state(immediate);
    let pointerDownIntercepted = false;
    let removeClickListener = noop;
    let removeListeners = noop;
    const handleClickOutside = useDebounce((e) => {
        if (!node || !nodeOwnerDocument) {
            removeClickListener();
            return;
        }
        if (pointerDownIntercepted === true || !isValidEvent(e, node, nodeOwnerDocument)) {
            removeClickListener();
            return;
        }
        if (e.pointerType === "touch") {
            /**
             * If the pointer type is touch, we add a listener to wait for the click
             * event that will follow the pointerdown event if the user interacts in a way
             * that would trigger a click event.
             *
             * This prevents us from prematurely calling the callback if the user is simply
             * scrolling or dragging the page.
             */
            removeClickListener();
            removeClickListener = on(nodeOwnerDocument, "click", () => callback(e), {
                once: true,
            });
        }
        else {
            /**
             * If the pointer type is not touch, we can directly call the callback function
             * as the interaction is likely a mouse or pen input which does not require
             * additional handling.
             */
            callback(e);
        }
    }, 10);
    function addListeners() {
        if (!nodeOwnerDocument || !window || !node)
            return noop;
        const events = [
            /**
             * CAPTURE INTERACTION START
             * Mark the pointerdown event as intercepted to indicate that an interaction
             * has started. This helps in distinguishing between valid and invalid events.
             */
            on(nodeOwnerDocument, "pointerdown", (e) => {
                if (isValidEvent(e, node, nodeOwnerDocument)) {
                    pointerDownIntercepted = true;
                }
            }, { capture: true }),
            /**
             * BUBBLE INTERACTION START
             * Mark the pointerdown event as non-intercepted. Debounce `handleClickOutside` to
             * avoid prematurely checking if other events were intercepted.
             */
            on(nodeOwnerDocument, "pointerdown", (e) => {
                pointerDownIntercepted = false;
                handleClickOutside(e);
            }),
        ];
        if (detectIframe) {
            events.push(
            /**
             * DETECT IFRAME INTERACTIONS
             *
             * We add a blur event listener to the window to detect when the user
             * interacts with an iframe. If the active element is an iframe and it
             * is not a descendant of the container, we call the callback function.
             */
            on(window, "blur", async (e) => {
                await sleep();
                const activeElement = getActiveElement(nodeOwnerDocument);
                if (activeElement?.tagName === "IFRAME" && !isOrContainsTarget(node, activeElement)) {
                    callback(e);
                }
            }));
        }
        return () => {
            for (const event of events) {
                event();
            }
        };
    }
    function cleanup() {
        pointerDownIntercepted = false;
        handleClickOutside.cancel();
        removeClickListener();
        removeListeners();
    }
    watch([() => enabled, () => node], ([enabled$, node$]) => {
        if (enabled$ && node$) {
            removeListeners();
            removeListeners = addListeners();
        }
        else {
            cleanup();
        }
    });
    $effect(() => {
        return () => {
            cleanup();
        };
    });
    return {
        /** Stop listening for click events outside the container. */
        stop: () => (enabled = false),
        /** Start listening for click events outside the container. */
        start: () => (enabled = true),
        /** Whether the click outside handler is currently enabled or not. */
        get enabled() {
            return enabled;
        },
    };
}
function isValidEvent(e, container, defaultDocument) {
    if ("button" in e && e.button > 0)
        return false;
    const target = e.target;
    if (!isElement(target))
        return false;
    const ownerDocument = getOwnerDocument(target, defaultDocument);
    if (!ownerDocument)
        return false;
    // handle the case where a user may have pressed a pseudo element by
    // checking the bounding rect of the container
    if (target === container) {
        const rect = container.getBoundingClientRect();
        const wasInsideClick = rect.top <= e.clientY &&
            e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX &&
            e.clientX <= rect.left + rect.width;
        return !wasInsideClick;
    }
    return ownerDocument.documentElement.contains(target) && !isOrContainsTarget(container, target);
}
