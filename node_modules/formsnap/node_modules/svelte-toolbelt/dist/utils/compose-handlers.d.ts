import type { EventCallback } from "./events.js";
import type { ReadableBox } from "../box/box.svelte.js";
/**
 * Composes event handlers into a single function that can be called with an event.
 * If the previous handler cancels the event using `event.preventDefault()`, the handlers
 * that follow will not be called.
 */
export declare function composeHandlers<E extends Event = Event, T extends Element = Element>(...handlers: Array<EventCallback<E> | ReadableBox<EventCallback<E>> | undefined>): (e: E) => void;
