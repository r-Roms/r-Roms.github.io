import { isObject } from "./is.js";
const ELEMENT_NODE = 1;
const DOCUMENT_NODE = 9;
const DOCUMENT_FRAGMENT_NODE = 11;
export function isHTMLElement(node) {
    return isObject(node) && node.nodeType === ELEMENT_NODE && typeof node.nodeName === "string";
}
export function isDocument(node) {
    return isObject(node) && node.nodeType === DOCUMENT_NODE;
}
export function isWindow(node) {
    return isObject(node) && node.constructor?.name === "VisualViewport";
}
export function getNodeName(node) {
    if (isHTMLElement(node))
        return node.localName ?? "";
    return "#document";
}
export function isNode(node) {
    return isObject(node) && node.nodeType !== undefined;
}
export function isShadowRoot(node) {
    return isNode(node) && node.nodeType === DOCUMENT_FRAGMENT_NODE && "host" in node;
}
export function contains(parent, child) {
    if (!parent || !child)
        return false;
    if (!isHTMLElement(parent) || !isHTMLElement(child))
        return false;
    const rootNode = child.getRootNode?.();
    if (parent === child)
        return true;
    if (parent.contains(child))
        return true;
    if (rootNode && isShadowRoot(rootNode)) {
        let next = child;
        while (next) {
            if (parent === next)
                return true;
            // @ts-expect-error - host is not typed
            next = next.parentNode || next.host;
        }
    }
    return false;
}
export function getDocument(node) {
    if (isDocument(node))
        return node;
    if (isWindow(node))
        return node.document;
    return node?.ownerDocument ?? document;
}
export function getDocumentElement(node) {
    return getDocument(node).documentElement;
}
export function getWindow(node) {
    if (isShadowRoot(node))
        return getWindow(node.host);
    if (isDocument(node))
        return node.defaultView ?? window;
    if (isHTMLElement(node))
        return node.ownerDocument?.defaultView ?? window;
    return window;
}
export function getActiveElement(rootNode) {
    let activeElement = rootNode.activeElement;
    while (activeElement?.shadowRoot) {
        const el = activeElement.shadowRoot.activeElement;
        if (el === activeElement)
            break;
        else
            activeElement = el;
    }
    return activeElement;
}
export function getParentNode(node) {
    if (getNodeName(node) === "html")
        return node;
    const result = 
    // @ts-expect-error - assignedSlot is not typed
    node.assignedSlot ||
        node.parentNode ||
        (isShadowRoot(node) && node.host) ||
        getDocumentElement(node);
    return isShadowRoot(result) ? result.host : result;
}
