import { AnimationFrames, useDebounce, useEventListener } from "runed";
import { onMount } from "svelte";
import { extract } from "../extract/extract.svelte.js";
import { noop } from "../../internal/utils/function.js";
/**
 * We have to check if the scroll amount is close enough to some threshold in order to
 * more accurately calculate arrivedState. This is because scrollTop/scrollLeft are non-rounded
 * numbers, while scrollHeight/scrollWidth and clientHeight/clientWidth are rounded.
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
 */
const ARRIVED_STATE_THRESHOLD_PIXELS = 1;
/**
 * A reactive utility for tracking scroll position, direction,
 * and edge arrival states, while supporting programmatic scrolling.
 *
 * @see https://vueuse.org/useScroll for the inspiration behind this utility.
 * @param element
 * @param options
 */
export class ScrollState {
    #options;
    element = $derived(extract(this.#options.element));
    idle = $derived.by(() => extract(this.#options?.idle, 200));
    offset = $derived(extract(this.#options.offset, {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }));
    onScroll = $derived(this.#options.onScroll ?? noop);
    onStop = $derived(this.#options.onStop ?? noop);
    eventListenerOptions = $derived(this.#options.eventListenerOptions ?? {
        capture: false,
        passive: true,
    });
    behavior = $derived(extract(this.#options.behavior, "auto"));
    onError = $derived(this.#options.onError ??
        ((e) => {
            console.error(e);
        }));
    /** State */
    internalX = $state(0);
    internalY = $state(0);
    // Use a get/set pair for x and y because we want to write the value to the refs
    // during a `scrollTo()` without firing additional `scrollTo()`s in the process.
    #x = $derived(this.internalX);
    get x() {
        return this.#x;
    }
    set x(v) {
        this.scrollTo(v, undefined);
    }
    #y = $derived(this.internalY);
    get y() {
        return this.#y;
    }
    set y(v) {
        this.scrollTo(undefined, v);
    }
    isScrolling = $state(false);
    arrived = $state({
        left: true,
        right: false,
        top: true,
        bottom: false,
    });
    directions = $state({
        left: false,
        right: false,
        top: false,
        bottom: false,
    });
    constructor(options) {
        this.#options = options;
        useEventListener(() => this.element, "scroll", this.#onScrollHandler, this.eventListenerOptions);
        useEventListener(() => this.element, "scrollend", (e) => this.onScrollEnd(e), this.eventListenerOptions);
        onMount(() => {
            this.setArrivedState();
        });
        // overkill?
        new AnimationFrames(() => this.setArrivedState());
    }
    /**
     * Updates direction and edge arrival states based on the current scroll position.
     * Takes into account writing mode, flex direction, and RTL layouts.
     */
    setArrivedState = () => {
        if (!window || !this.element)
            return;
        const el = (this.element?.document?.documentElement ||
            this.element?.documentElement ||
            this.element);
        const { display, flexDirection, direction } = getComputedStyle(el);
        const directionMultiplier = direction === "rtl" ? -1 : 1;
        const scrollLeft = el.scrollLeft;
        if (scrollLeft !== this.internalX) {
            this.directions.left = scrollLeft < this.internalX;
            this.directions.right = scrollLeft > this.internalX;
        }
        const left = scrollLeft * directionMultiplier <= (this.offset.left || 0);
        const right = scrollLeft * directionMultiplier + el.clientWidth >=
            el.scrollWidth - (this.offset.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
        if (display === "flex" && flexDirection === "row-reverse") {
            this.arrived.left = right;
            this.arrived.right = left;
        }
        else {
            this.arrived.left = left;
            this.arrived.right = right;
        }
        this.internalX = scrollLeft;
        let scrollTop = el.scrollTop;
        // patch for mobile compatible
        if (this.element === window.document && !scrollTop)
            scrollTop = window.document.body.scrollTop;
        if (scrollTop !== this.internalY) {
            this.directions.top = scrollTop < this.internalY;
            this.directions.bottom = scrollTop > this.internalY;
        }
        const top = scrollTop <= (this.offset.top || 0);
        const bottom = scrollTop + el.clientHeight >=
            el.scrollHeight - (this.offset.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
        /**
         * reverse columns and rows behave exactly the other way around,
         * bottom is treated as top and top is treated as the negative version of bottom
         */
        if (display === "flex" && flexDirection === "column-reverse") {
            this.arrived.top = bottom;
            this.arrived.bottom = top;
        }
        else {
            this.arrived.top = top;
            this.arrived.bottom = bottom;
        }
        this.internalY = scrollTop;
    };
    #onScrollHandler = (e) => {
        if (!window)
            return;
        this.setArrivedState();
        this.isScrolling = true;
        this.onScrollEndDebounced(e);
        this.onScroll(e);
    };
    /**
     * Programmatically scroll to a specific position.
     */
    scrollTo(x, y) {
        if (!window)
            return;
        (this.element instanceof Document ? window.document.body : this.element)?.scrollTo({
            top: y ?? this.y,
            left: x ?? this.x,
            behavior: this.behavior,
        });
        const scrollContainer = this.element?.document?.documentElement ||
            this.element?.documentElement ||
            this.element;
        if (x != null)
            this.internalX = scrollContainer.scrollLeft;
        if (y != null)
            this.internalY = scrollContainer.scrollTop;
    }
    /**
     * Scrolls to the top of the element.
     */
    scrollToTop() {
        this.scrollTo(undefined, 0);
    }
    /**
     * Scrolls to the bottom of the element.
     */
    scrollToBottom() {
        if (!window)
            return;
        const scrollContainer = this.element?.document?.documentElement ||
            this.element?.documentElement ||
            this.element;
        if (!scrollContainer)
            return;
        this.scrollTo(undefined, scrollContainer.scrollHeight);
    }
    onScrollEnd = (e) => {
        // dedupe if support native scrollend event
        if (!this.isScrolling)
            return;
        this.isScrolling = false;
        this.directions.left = false;
        this.directions.right = false;
        this.directions.top = false;
        this.directions.bottom = false;
        this.onStop(e);
    };
    onScrollEndDebounced = useDebounce(this.onScrollEnd, () => this.idle);
}
