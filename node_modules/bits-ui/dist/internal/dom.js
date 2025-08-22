export function getFirstNonCommentChild(element) {
    if (!element)
        return null;
    for (const child of element.childNodes) {
        if (child.nodeType !== Node.COMMENT_NODE) {
            return child;
        }
    }
    return null;
}
/**
 * Determines if the click event truly occurred outside the content node.
 * This was added to handle password managers and other elements that may be injected
 * into the DOM but visually appear inside the content.
 */
export function isClickTrulyOutside(event, contentNode) {
    const { clientX, clientY } = event;
    const rect = contentNode.getBoundingClientRect();
    return (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom);
}
