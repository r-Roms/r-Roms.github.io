import { type ConfigurableDocument, type ConfigurableWindow } from "../../internal/configurable-globals.js";
import type { MaybeElementGetter } from "../../internal/types.js";
export type OnClickOutsideOptions = ConfigurableWindow & ConfigurableDocument & {
    /**
     * Whether the click outside handler is enabled by default or not.
     * If set to false, the handler will not be active until enabled by
     * calling the returned `start` function
     *
     * @default true
     */
    immediate?: boolean;
    /**
     * Controls whether focus events from iframes trigger the callback.
     *
     * Since iframe click events don't bubble to the parent document,
     * you may want to enable this if you need to detect when users
     * interact with iframe content.
     *
     * @default false
     */
    detectIframe?: boolean;
};
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
export declare function onClickOutside<T extends Element = HTMLElement>(container: MaybeElementGetter<T>, callback: (event: PointerEvent | FocusEvent) => void, opts?: OnClickOutsideOptions): {
    /** Stop listening for click events outside the container. */
    stop: () => boolean;
    /** Start listening for click events outside the container. */
    start: () => boolean;
    /** Whether the click outside handler is currently enabled or not. */
    readonly enabled: boolean;
};
