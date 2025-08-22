type Arrayable<T> = T | T[];
export type EventCallback<E extends Event = Event> = (event: E) => void;
type GeneralEventListener<E = Event> = (evt: E) => unknown;
export declare function addEventListener<E extends keyof WindowEventMap>(target: Window, event: Arrayable<E>, handler: (this: Window, ev: WindowEventMap[E]) => unknown, options?: boolean | AddEventListenerOptions): VoidFunction;
export declare function addEventListener<E extends keyof DocumentEventMap>(target: Document, event: Arrayable<E>, handler: (this: Document, ev: DocumentEventMap[E]) => unknown, options?: boolean | AddEventListenerOptions): VoidFunction;
export declare function addEventListener<E extends keyof HTMLElementEventMap>(target: EventTarget, event: Arrayable<E>, handler: GeneralEventListener<HTMLElementEventMap[E]>, options?: boolean | AddEventListenerOptions): VoidFunction;
export {};
