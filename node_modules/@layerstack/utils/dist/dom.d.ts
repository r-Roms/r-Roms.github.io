/**
 * Find the closest scrollable parent
 * - see: https://stackoverflow.com/questions/35939886/find-first-scrollable-parent
 * - see: https://gist.github.com/twxia/bb20843c495a49644be6ea3804c0d775
 */
export declare function getScrollParent(node: HTMLElement): HTMLElement;
/**
 * Scroll node into view of closest scrollable (i.e. overflown) parent.  Like `node.scrollIntoView()` but will only scroll immediate container (not viewport)
 */
export declare function scrollIntoView(node: HTMLElement): void;
/**
 * Determine if node is currently visible in scroll container
 */
export declare function isVisibleInScrollParent(node: HTMLElement): boolean;
/**
 * Get pointer coordinates relative to node/container
 * Matches event.layerX/Y, but is deprecated (https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/layerX).
 * Also similar but not identical to event.offsetX/Y
 */
export declare function localPoint(event: MouseEvent | TouchEvent | PointerEvent, node?: Element): {
    x: number;
    y: number;
};
//# sourceMappingURL=dom.d.ts.map