/**
 * Gets all tabbable elements in the body and finds the next/previous tabbable element
 * from the `currentNode` based on the `direction` provided.
 * @param currentNode - the node we want to get the next/previous tabbable from
 */
export declare function getTabbableFrom(currentNode: HTMLElement, direction: "next" | "prev"): import("tabbable").FocusableElement | undefined;
export declare function getTabbableFromFocusable(currentNode: HTMLElement, direction: "next" | "prev"): import("tabbable").FocusableElement;
