export const isBrowser = typeof document !== "undefined";
export function isHTMLElement(element) {
    return element instanceof HTMLElement;
}
export function isKeyDown(event) {
    return event.type === "keydown";
}
export function isMouseEvent(event) {
    return event.type.startsWith("mouse");
}
export function isTouchEvent(event) {
    return event.type.startsWith("touch");
}
