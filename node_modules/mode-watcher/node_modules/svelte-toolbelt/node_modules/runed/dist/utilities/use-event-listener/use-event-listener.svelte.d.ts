import type { MaybeGetter } from "../../internal/types.js";
/**
 * Adds an event listener to the specified target element for the given event(s), and returns a function to remove it.
 * @param target The target element to add the event listener to.
 * @param event The event(s) to listen for.
 * @param handler The function to be called when the event is triggered.
 * @param options An optional object that specifies characteristics about the event listener.
 *
 * @see {@link https://runed.dev/docs/utilities/use-event-listener}
 */
export declare function useEventListener<TEvent extends keyof WindowEventMap>(target: MaybeGetter<Window | null | undefined>, event: MaybeGetter<TEvent | TEvent[]>, handler: (this: Window, event: WindowEventMap[TEvent]) => unknown, options?: AddEventListenerOptions): void;
/**
 * Adds an event listener to the specified target element for the given event(s), and returns a function to remove it.
 * @param target The target element to add the event listener to.
 * @param event The event(s) to listen for.
 * @param handler The function to be called when the event is triggered.
 * @param options An optional object that specifies characteristics about the event listener.
 *
 * @see {@link https://runed.dev/docs/utilities/use-event-listener}
 */
export declare function useEventListener<TEvent extends keyof DocumentEventMap>(target: MaybeGetter<Document | null | undefined>, event: MaybeGetter<TEvent | TEvent[]>, handler: (this: Document, event: DocumentEventMap[TEvent]) => unknown, options?: AddEventListenerOptions): void;
/**
 * Adds an event listener to the specified target element for the given event(s), and returns a function to remove it.
 * @param target The target element to add the event listener to.
 * @param event The event(s) to listen for.
 * @param handler The function to be called when the event is triggered.
 * @param options An optional object that specifies characteristics about the event listener.
 *
 * @see {@link https://runed.dev/docs/utilities/use-event-listener}
 */
export declare function useEventListener<TElement extends HTMLElement, TEvent extends keyof HTMLElementEventMap>(target: MaybeGetter<TElement | null | undefined>, event: MaybeGetter<TEvent | TEvent[]>, handler: (this: TElement, event: HTMLElementEventMap[TEvent]) => unknown, options?: AddEventListenerOptions): void;
/**
 * Adds an event listener to the specified target element for the given event(s), and returns a function to remove it.
 * @param target The target element to add the event listener to.
 * @param event The event(s) to listen for.
 * @param handler The function to be called when the event is triggered.
 * @param options An optional object that specifies characteristics about the event listener.
 *
 * @see {@link https://runed.dev/docs/utilities/use-event-listener}
 */
export declare function useEventListener<TEvent extends keyof MediaQueryListEventMap>(target: MaybeGetter<MediaQueryList | null | undefined>, event: MaybeGetter<TEvent | TEvent[]>, handler: (this: MediaQueryList, event: MediaQueryListEventMap[TEvent]) => unknown, options?: AddEventListenerOptions): void;
/**
 * Adds an event listener to the specified target element for the given event(s), and returns a function to remove it.
 * @param target The target element to add the event listener to.
 * @param event The event(s) to listen for.
 * @param handler The function to be called when the event is triggered.
 * @param options An optional object that specifies characteristics about the event listener.
 *
 * @see {@link https://runed.dev/docs/utilities/use-event-listener}
 */
export declare function useEventListener(target: MaybeGetter<EventTarget | null | undefined>, event: MaybeGetter<string | string[]>, handler: EventListener, options?: AddEventListenerOptions): void;
