export function isFunction(value) {
    return typeof value === "function";
}
export function isObject(value) {
    return value !== null && typeof value === "object";
}
export function isElement(value) {
    return value instanceof Element;
}
