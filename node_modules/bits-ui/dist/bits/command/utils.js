export function findNextSibling(el, selector) {
    let sibling = el.nextElementSibling;
    while (sibling) {
        if (sibling.matches(selector))
            return sibling;
        sibling = sibling.nextElementSibling;
    }
}
export function findPreviousSibling(el, selector) {
    let sibling = el.previousElementSibling;
    while (sibling) {
        if (sibling.matches(selector))
            return sibling;
        sibling = sibling.previousElementSibling;
    }
}
export function findFirstStartMarkerWithImmediateSiblingAsEnd(el, type) {
    const startMarkers = el.querySelectorAll(`[data-bits-command-${type}-start]`);
    for (const startMarker of startMarkers) {
        const endMarker = startMarker.nextElementSibling;
        if (endMarker && endMarker.hasAttribute(`data-bits-command-${type}-end`)) {
            return startMarker;
        }
    }
    return null;
}
