interface PreventScrollOptions {
    /** Whether the scroll lock is disabled. */
    isDisabled: () => boolean;
    focusCallback?: () => void;
}
export declare function isScrollable(node: Element): boolean;
export declare function getScrollParent(node: Element): Element;
/**
 * Prevents scrolling on the document body on mount, and
 * restores it on unmount. Also ensures that content does not
 * shift due to the scrollbars disappearing.
 */
export declare function usePreventScroll(opts: PreventScrollOptions): void;
export declare function isInput(target: Element): boolean;
export {};
