export declare function getFirstNonCommentChild(element: HTMLElement | null): ChildNode | null;
/**
 * Determines if the click event truly occurred outside the content node.
 * This was added to handle password managers and other elements that may be injected
 * into the DOM but visually appear inside the content.
 */
export declare function isClickTrulyOutside(event: PointerEvent, contentNode: HTMLElement): boolean;
