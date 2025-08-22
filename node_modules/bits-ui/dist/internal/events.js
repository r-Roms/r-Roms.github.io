import { on } from "svelte/events";
/**
 * Adds an event listener to the specified target element(s) for the given event(s), and returns a function to remove it.
 * @param target The target element(s) to add the event listener to.
 * @param event The event(s) to listen for.
 * @param handler The function to be called when the event is triggered.
 * @param options An optional object that specifies characteristics about the event listener.
 * @returns A function that removes the event listener from the target element(s).
 */
export function addEventListener(target, event, handler, options) {
    const events = Array.isArray(event) ? event : [event];
    // Add the event listener to each specified event for the target element(s).
    events.forEach((_event) => target.addEventListener(_event, handler, options));
    // Return a function that removes the event listener from the target element(s).
    return () => {
        events.forEach((_event) => target.removeEventListener(_event, handler, options));
    };
}
/**
 * Creates a typed event dispatcher and listener pair for custom events
 * @template T - The type of data that will be passed in the event detail
 * @param eventName - The name of the custom event
 * @param options - CustomEvent options (bubbles, cancelable, etc.)
 */
export class CustomEventDispatcher {
    eventName;
    options;
    constructor(eventName, options = { bubbles: true, cancelable: true }) {
        this.eventName = eventName;
        this.options = options;
    }
    createEvent(detail) {
        return new CustomEvent(this.eventName, {
            ...this.options,
            detail,
        });
    }
    dispatch(element, detail) {
        const event = this.createEvent(detail);
        element.dispatchEvent(event);
        return event;
    }
    listen(element, callback, options) {
        const handler = (event) => {
            callback(event);
        };
        return on(element, this.eventName, handler, options);
    }
}
