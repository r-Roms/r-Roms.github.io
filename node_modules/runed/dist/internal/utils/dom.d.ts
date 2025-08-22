/**
 * Handles getting the active element in a document or shadow root.
 * If the active element is within a shadow root, it will traverse the shadow root
 * to find the active element.
 * If not, it will return the active element in the document.
 *
 * @param document A document or shadow root to get the active element from.
 * @returns The active element in the document or shadow root.
 */
export declare function getActiveElement(document: DocumentOrShadowRoot): Element | null;
/**
 * Returns the owner document of a given element.
 *
 * @param node The element to get the owner document from.
 * @returns
 */
export declare function getOwnerDocument(node: Element | null | undefined, fallback?: Document | undefined): Document | undefined;
/**
 * Checks if an element is or is contained by another element.
 *
 * @param node The element to check if it or its descendants contain the target element.
 * @param target The element to check if it is contained by the node.
 * @returns
 */
export declare function isOrContainsTarget(node: Element, target: Element): boolean;
