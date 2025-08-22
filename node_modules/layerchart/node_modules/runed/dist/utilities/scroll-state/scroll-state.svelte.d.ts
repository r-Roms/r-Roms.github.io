import type { MaybeGetter } from "../../internal/types.js";
export interface ScrollStateOptions {
    /**
     * The scroll container.
     *
     * Can be an HTMLElement, Window, or Document, or a getter returning one of these.
     */
    element: MaybeGetter<HTMLElement | Window | Document | null | undefined>;
    /**
     * Debounce timeout (ms) after scrolling ends.
     *
     * @default 200
     */
    idle?: MaybeGetter<number | undefined>;
    /**
     * Pixel offset thresholds for determining "arrived" state on each scroll edge.
     */
    offset?: MaybeGetter<{
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    } | undefined>;
    /**
     * Called during scroll events.
     */
    onScroll?: (e: Event) => void;
    /**
     * Called after scroll ends (after debounce).
     */
    onStop?: (e: Event) => void;
    /**
     * Scroll event listener options.
     *
     * @default { capture: false, passive: true }
     */
    eventListenerOptions?: AddEventListenerOptions;
    /**
     * Scroll behavior when using `scrollTo`, `scrollToTop`, or `scrollToBottom`,
     *
     * @default 'auto'
     */
    behavior?: MaybeGetter<ScrollBehavior | undefined>;
    /**
     * Optional error handler.
     *
     * @default console.error
     */
    onError?: (error: unknown) => void;
}
/**
 * A reactive utility for tracking scroll position, direction,
 * and edge arrival states, while supporting programmatic scrolling.
 *
 * @see https://vueuse.org/useScroll for the inspiration behind this utility.
 * @param element
 * @param options
 */
export declare class ScrollState {
    #private;
    element: Window | Document | HTMLElement | null | undefined;
    idle: number;
    offset: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    };
    onScroll: (e: Event) => void;
    onStop: (e: Event) => void;
    eventListenerOptions: AddEventListenerOptions;
    behavior: "auto" | "instant" | "smooth";
    onError: (error: unknown) => void;
    /** State */
    internalX: number;
    internalY: number;
    get x(): number;
    set x(v: number);
    get y(): number;
    set y(v: number);
    isScrolling: boolean;
    arrived: {
        left: boolean;
        right: boolean;
        top: boolean;
        bottom: boolean;
    };
    directions: {
        left: boolean;
        right: boolean;
        top: boolean;
        bottom: boolean;
    };
    constructor(options: ScrollStateOptions);
    /**
     * Updates direction and edge arrival states based on the current scroll position.
     * Takes into account writing mode, flex direction, and RTL layouts.
     */
    setArrivedState: () => void;
    /**
     * Programmatically scroll to a specific position.
     */
    scrollTo(x: number | undefined, y: number | undefined): void;
    /**
     * Scrolls to the top of the element.
     */
    scrollToTop(): void;
    /**
     * Scrolls to the bottom of the element.
     */
    scrollToBottom(): void;
    onScrollEnd: (e: Event) => void;
    onScrollEndDebounced: any;
}
