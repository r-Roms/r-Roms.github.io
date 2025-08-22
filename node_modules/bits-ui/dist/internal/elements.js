export function isOrContainsTarget(node, target) {
    return node === target || node.contains(target);
}
export function getOwnerDocument(el) {
    return el?.ownerDocument ?? document;
}
