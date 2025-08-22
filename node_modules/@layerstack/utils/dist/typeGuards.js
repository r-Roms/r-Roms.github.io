// Generic type guard -  https://stackoverflow.com/a/43423642/191902
export function hasKeyOf(object, key) {
    if (object) {
        return key in object;
    }
    else {
        return false;
    }
}
// Similar to Object.hasOwnProperty
// http://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
export function hasProperty(o, name) {
    return name in o;
}
// Typesafe way to get property names
// https://www.meziantou.net/typescript-nameof-operator-equivalent.htm
// https://schneidenbach.gitbooks.io/typescript-cookbook/nameof-operator.html
export function nameof(key, instance) {
    return key;
}
export function isNumber(val) {
    return typeof val === 'number';
}
/**
 * Check if value is present (not `null`/`undefined`).  Useful with `arr.filter(notNull)`
 */
export function notNull(value) {
    return value != null;
}
export function isElement(elem) {
    return !!elem && elem instanceof Element;
}
// functional definition of isSVGElement. Note that SVGSVGElements are HTMLElements
export function isSVGElement(elem) {
    return !!elem && (elem instanceof SVGElement || 'ownerSVGElement' in elem);
}
// functional definition of SVGGElement
export function isSVGSVGElement(elem) {
    return !!elem && 'createSVGPoint' in elem;
}
export function isSVGGraphicsElement(elem) {
    return !!elem && 'getScreenCTM' in elem;
}
// functional definition of TouchEvent
export function isTouchEvent(event) {
    return !!event && 'changedTouches' in event;
}
// functional definition of event
export function isEvent(event) {
    return (!!event &&
        (event instanceof Event || ('nativeEvent' in event && event.nativeEvent instanceof Event)));
}
