const cache = new WeakMap();
export function isInView(el) {
    const rect = el.getBoundingClientRect();
    if (!window.visualViewport)
        return false;
    return (rect.top >= 0 &&
        rect.left >= 0 &&
        // Need + 40 for safari detection
        rect.bottom <= window.visualViewport.height - 40 &&
        rect.right <= window.visualViewport.width);
}
export function set(el, styles, ignoreCache = false) {
    if (!el || !(el instanceof HTMLElement))
        return;
    let originalStyles = {};
    Object.entries(styles).forEach(([key, value]) => {
        if (key.startsWith("--")) {
            el.style.setProperty(key, value);
            return;
        }
        originalStyles[key] = el.style[key];
        el.style[key] = value;
    });
    if (ignoreCache)
        return;
    cache.set(el, originalStyles);
}
export function reset(el, prop) {
    if (!el || !(el instanceof HTMLElement))
        return;
    let originalStyles = cache.get(el);
    if (!originalStyles)
        return;
    if (prop) {
        el.style[prop] = originalStyles[prop];
    }
    else {
        Object.entries(originalStyles).forEach(([key, value]) => {
            el.style[key] = value;
        });
    }
}
export const isVertical = (direction) => {
    switch (direction) {
        case "top":
        case "bottom":
            return true;
        case "left":
        case "right":
            return false;
        default:
            return direction;
    }
};
export function getTranslate(element, direction) {
    if (!element) {
        return null;
    }
    const style = window.getComputedStyle(element);
    const transform = 
    // @ts-expect-error - shh
    style.transform || style.webkitTransform || style.mozTransform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) {
        // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d
        return parseFloat(mat[1].split(", ")[isVertical(direction) ? 13 : 12]);
    }
    // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(", ")[isVertical(direction) ? 5 : 4]) : null;
}
export function dampenValue(v) {
    return 8 * (Math.log(v + 1) - 2);
}
export function assignStyle(element, style) {
    if (!element)
        return () => { };
    const prevStyle = element.style.cssText;
    Object.assign(element.style, style);
    return () => {
        element.style.cssText = prevStyle;
    };
}
/**
 * Receives functions as arguments and returns a new function that calls all.
 */
export function chain(...fns) {
    return (...args) => {
        for (const fn of fns) {
            if (typeof fn === "function") {
                fn(...args);
            }
        }
    };
}
