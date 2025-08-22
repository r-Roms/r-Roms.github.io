import { isDocument, isHTMLElement, isShadowRoot, isWindow } from "./is.js";
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
        const node = activeElement.shadowRoot.activeElement;
        if (node === activeElement)
            break;
        else
            activeElement = node;
    }
    return activeElement;
}
export class EnvironmentState {
    props;
    constructor(props = {}) {
        this.props = props;
    }
    getRootNode() {
        return (this.props?.getRootNode?.() ?? document);
    }
    getDoc() {
        return getDocument(this.getRootNode());
    }
    getWin() {
        return this.getDoc().defaultView ?? window;
    }
    getActiveElement() {
        return getActiveElement(this.getRootNode());
    }
    isActiveElement(node) {
        return node === this.getActiveElement();
    }
    getById(id) {
        return this.getRootNode().getElementById(id);
    }
}
