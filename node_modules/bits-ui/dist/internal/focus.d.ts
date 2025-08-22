export type FocusableTarget = HTMLElement | {
    focus: () => void;
};
/**
 * Handles `initialFocus` prop behavior for the
 * Calendar & RangeCalendar components.
 */
export declare function handleCalendarInitialFocus(calendar: HTMLElement): void;
/**
 * A utility function that focuses an element without scrolling.
 */
export declare function focusWithoutScroll(element: HTMLElement): void;
/**
 * A utility function that focuses an element.
 */
export declare function focus(element?: FocusableTarget | null, { select }?: {
    select?: boolean | undefined;
}): void;
/**
 * Attempts to focus the first element in a list of candidates.
 * Stops when focus is successful.
 */
export declare function focusFirst(candidates: HTMLElement[], { select }: {
    select?: boolean | undefined;
} | undefined, getActiveElement: () => HTMLElement | null): true | undefined;
/**
 * Returns the first visible element in a list.
 * NOTE: Only checks visibility up to the `container`.
 */
export declare function findVisible(elements: HTMLElement[], container: HTMLElement): HTMLElement | undefined;
/**
 * Returns a list of potential tabbable candidates.
 *
 * NOTE: This is only a close approximation. For example it doesn't take into account cases like when
 * elements are not visible. This cannot be worked out easily by just reading a property, but rather
 * necessitate runtime knowledge (computed styles, etc). We deal with these cases separately.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
 * Credit: https://github.com/discord/focus-layers/blob/master/src/util/wrapFocus.tsx#L1
 */
export declare function getTabbableCandidates(container: HTMLElement): HTMLElement[];
/**
 * A utility function that returns the first and last elements within a container that are
 * visible and focusable.
 */
export declare function getTabbableEdges(container: HTMLElement): readonly [HTMLElement | undefined, HTMLElement | undefined];
