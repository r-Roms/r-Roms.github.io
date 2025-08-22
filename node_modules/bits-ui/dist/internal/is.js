export const isBrowser = typeof document !== "undefined";
export const isIOS = getIsIOS();
function getIsIOS() {
    return (isBrowser &&
        window?.navigator?.userAgent &&
        (/iP(ad|hone|od)/.test(window.navigator.userAgent) ||
            // The new iPad Pro Gen3 does not identify itself as iPad, but as Macintosh.
            (window?.navigator?.maxTouchPoints > 2 &&
                /iPad|Macintosh/.test(window?.navigator.userAgent))));
}
export function isFunction(value) {
    return typeof value === "function";
}
export function isHTMLElement(element) {
    return element instanceof HTMLElement;
}
export function isElement(element) {
    return element instanceof Element;
}
export function isElementOrSVGElement(element) {
    return element instanceof Element || element instanceof SVGElement;
}
export function isNumberString(value) {
    return !Number.isNaN(Number(value)) && !Number.isNaN(Number.parseFloat(value));
}
export function isNull(value) {
    return value === null;
}
export function isTouch(e) {
    return e.pointerType === "touch";
}
export function isFocusVisible(element) {
    return element.matches(":focus-visible");
}
export function isNotNull(value) {
    return value !== null;
}
/**
 * Determines if the provided object is a valid `HTMLInputElement` with
 * a `select` method available.
 */
export function isSelectableInput(element) {
    return element instanceof HTMLInputElement && "select" in element;
}
/**
 * Given a node, determine if it is hidden by walking up the
 * DOM tree until we hit the `stopAt` node (exclusive), if provided)
 * otherwise we stop at the document root.
 */
export function isElementHidden(node, stopAt) {
    if (getComputedStyle(node).visibility === "hidden")
        return true;
    while (node) {
        // we stop at `upTo` (excluding it)
        if (stopAt !== undefined && node === stopAt)
            return false;
        if (getComputedStyle(node).display === "none")
            return true;
        node = node.parentElement;
    }
    return false;
}
