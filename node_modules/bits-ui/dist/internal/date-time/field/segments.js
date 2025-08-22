import { isAnySegmentPart } from "./helpers.js";
import { isHTMLElement } from "../../is.js";
import { kbd } from "../../kbd.js";
/**
 * Handles segment navigation based on the provided keyboard event and field ID.
 *
 * @param e - The keyboard event
 * @param fieldNode - The ID of the field we're navigating within
 */
export function handleSegmentNavigation(e, fieldNode) {
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget))
        return;
    const { prev, next } = getPrevNextSegments(currentTarget, fieldNode);
    if (e.key === kbd.ARROW_LEFT) {
        if (!prev)
            return;
        prev.focus();
    }
    else if (e.key === kbd.ARROW_RIGHT) {
        if (!next)
            return;
        next.focus();
    }
}
export function handleTimeSegmentNavigation(e, fieldNode) {
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget))
        return;
    const { prev, next } = getPrevNextTimeSegments(currentTarget, fieldNode);
    if (e.key === kbd.ARROW_LEFT) {
        if (!prev)
            return;
        prev.focus();
    }
    else if (e.key === kbd.ARROW_RIGHT) {
        if (!next)
            return;
        next.focus();
    }
}
/**
 * Retrieves the next segment in the list of segments relative to the provided node.
 *
 * @param node - The node we're starting from
 * @param segments - The list of candidate segments to navigate through
 */
export function getNextSegment(node, segments) {
    const index = segments.indexOf(node);
    if (index === segments.length - 1 || index === -1)
        return null;
    const nextIndex = index + 1;
    const nextSegment = segments[nextIndex];
    return nextSegment;
}
/**
 * Retrieves the previous segment in the list of segments relative to the provided node.
 *
 * @param node - The node we're starting from
 * @param segments - The list of candidate segments to navigate through
 */
export function getPrevSegment(node, segments) {
    const index = segments.indexOf(node);
    if (index === 0 || index === -1)
        return null;
    const prevIndex = index - 1;
    const prevSegment = segments[prevIndex];
    return prevSegment;
}
/**
 * Retrieves an object containing the next and previous segments relative to the current node.
 *
 * @param startingNode - The node we're starting from
 * @param fieldNode - The ID of the field we're navigating within
 */
export function getPrevNextSegments(startingNode, fieldNode) {
    const segments = getSegments(fieldNode);
    if (!segments.length) {
        return {
            next: null,
            prev: null,
        };
    }
    return {
        next: getNextSegment(startingNode, segments),
        prev: getPrevSegment(startingNode, segments),
    };
}
export function getPrevNextTimeSegments(startingNode, fieldNode) {
    const segments = getTimeSegments(fieldNode);
    if (!segments.length) {
        return {
            next: null,
            prev: null,
        };
    }
    return {
        next: getNextSegment(startingNode, segments),
        prev: getPrevSegment(startingNode, segments),
    };
}
/**
 * Shifts the focus to the next segment in the list of segments
 * within the field identified by the provided ID.
 */
export function moveToNextSegment(e, fieldNode) {
    const node = e.currentTarget;
    if (!isHTMLElement(node))
        return;
    const { next } = getPrevNextSegments(node, fieldNode);
    if (!next)
        return;
    next.focus();
}
export function moveToNextTimeSegment(e, fieldNode) {
    const node = e.currentTarget;
    if (!isHTMLElement(node))
        return;
    const { next } = getPrevNextTimeSegments(node, fieldNode);
    if (!next)
        return;
    next.focus();
}
export function moveToPrevTimeSegment(e, fieldNode) {
    const node = e.currentTarget;
    if (!isHTMLElement(node))
        return;
    const { prev } = getPrevNextTimeSegments(node, fieldNode);
    if (!prev)
        return;
    prev.focus();
}
/**
 * Shifts the focus to the previous segment in the list of segments
 * within the field identified by the provided ID. If this is the first
 * segment, focus will not be shifted.
 */
export function moveToPrevSegment(e, fieldNode) {
    const node = e.currentTarget;
    if (!isHTMLElement(node))
        return;
    const { prev } = getPrevNextSegments(node, fieldNode);
    if (!prev)
        return;
    prev.focus();
}
export function isSegmentNavigationKey(key) {
    if (key === kbd.ARROW_RIGHT || key === kbd.ARROW_LEFT)
        return true;
    return false;
}
/**
 * Retrieves all the interactive segments within the field identified by the provided ID.
 */
export function getSegments(fieldNode) {
    if (!fieldNode)
        return [];
    const segments = Array.from(fieldNode.querySelectorAll("[data-segment]")).filter((el) => {
        if (!isHTMLElement(el))
            return false;
        const segment = el.dataset.segment;
        if (segment === "trigger")
            return true;
        if (!isAnySegmentPart(segment) || segment === "literal")
            return false;
        return true;
    });
    return segments;
}
export function getTimeSegments(fieldNode) {
    if (!fieldNode)
        return [];
    const segments = Array.from(fieldNode.querySelectorAll("[data-segment]")).filter((el) => {
        if (!isHTMLElement(el))
            return false;
        const segment = el.dataset.segment;
        if (segment === "trigger")
            return true;
        if (segment === "literal")
            return false;
        return true;
    });
    return segments;
}
export function getFirstTimeSegment(fieldNode) {
    return getTimeSegments(fieldNode)[0];
}
/**
 * Get the first interactive segment within the field identified by the provided ID.
 */
export function getFirstSegment(fieldNode) {
    return getSegments(fieldNode)[0];
}
