import { isSVGElement, isSVGGraphicsElement, isSVGSVGElement, isTouchEvent } from './typeGuards.js';
/**
 * Find the closest scrollable parent
 * - see: https://stackoverflow.com/questions/35939886/find-first-scrollable-parent
 * - see: https://gist.github.com/twxia/bb20843c495a49644be6ea3804c0d775
 */
export function getScrollParent(node) {
    const isElement = node instanceof HTMLElement;
    const overflowX = isElement ? (window?.getComputedStyle(node).overflowX ?? 'visible') : 'unknown';
    const overflowY = isElement ? (window?.getComputedStyle(node).overflowY ?? 'visible') : 'unknown';
    const isHorizontalScrollable = !['visible', 'hidden'].includes(overflowX) && node.scrollWidth > node.clientWidth;
    const isVerticalScrollable = !['visible', 'hidden'].includes(overflowY) && node.scrollHeight > node.clientHeight;
    if (isHorizontalScrollable || isVerticalScrollable) {
        return node;
    }
    else if (node.parentElement) {
        return getScrollParent(node.parentElement);
    }
    else {
        return document.body;
    }
}
/**
 * Scroll node into view of closest scrollable (i.e. overflown) parent.  Like `node.scrollIntoView()` but will only scroll immediate container (not viewport)
 */
export function scrollIntoView(node) {
    // TODO: Consider only scrolling if needed
    const scrollParent = getScrollParent(node);
    const removeScrollParentOffset = scrollParent != node.offsetParent; // ignore `position: absolute` parent, for example
    const nodeOffset = {
        top: node.offsetTop - (removeScrollParentOffset ? (scrollParent?.offsetTop ?? 0) : 0),
        left: node.offsetLeft - (removeScrollParentOffset ? (scrollParent?.offsetLeft ?? 0) : 0),
    };
    const optionCenter = {
        left: node.clientWidth / 2,
        top: node.clientHeight / 2,
    };
    const containerCenter = {
        left: scrollParent.clientWidth / 2,
        top: scrollParent.clientHeight / 2,
    };
    scrollParent.scroll({
        top: nodeOffset.top + optionCenter.top - containerCenter.top,
        left: nodeOffset.left + optionCenter.left - containerCenter.left,
        behavior: 'smooth',
    });
}
/**
 * Determine if node is currently visible in scroll container
 */
export function isVisibleInScrollParent(node) {
    const nodeRect = node.getBoundingClientRect();
    const scrollParent = getScrollParent(node);
    const parentRect = scrollParent.getBoundingClientRect();
    const isVisible = nodeRect.top > parentRect.top && nodeRect.bottom < parentRect.bottom;
    return isVisible;
}
/**
 * Get pointer coordinates relative to node/container
 * Matches event.layerX/Y, but is deprecated (https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/layerX).
 * Also similar but not identical to event.offsetX/Y
 */
export function localPoint(event, node) {
    if (!node) {
        node = event.currentTarget ?? event.target;
    }
    if (!node || !event)
        return { x: 0, y: 0 };
    const coords = getPointFromEvent(event);
    // find top-most SVG
    const svg = isSVGElement(node) ? node.ownerSVGElement : node;
    const screenCTM = isSVGGraphicsElement(svg) ? svg.getScreenCTM() : null;
    if (isSVGSVGElement(svg) && screenCTM) {
        let point = svg.createSVGPoint();
        point.x = coords.x;
        point.y = coords.y;
        point = point.matrixTransform(screenCTM.inverse());
        return {
            x: point.x,
            y: point.y,
        };
    }
    // fall back to bounding box
    const rect = node.getBoundingClientRect();
    return {
        x: coords.x - rect.left - node.clientLeft,
        y: coords.y - rect.top - node.clientTop,
    };
}
function getPointFromEvent(event) {
    if (!event)
        return { x: 0, y: 0 };
    if (isTouchEvent(event)) {
        return event.changedTouches.length > 0
            ? {
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY,
            }
            : { x: 0, y: 0 };
    }
    return {
        x: event.clientX,
        y: event.clientY,
    };
}
