import { getScrollParent } from '@layerstack/utils';
export const resize = (node, options) => {
    let observer = new ResizeObserver((entries, observer) => {
        entries.forEach((entry) => {
            node.dispatchEvent(new CustomEvent('resize', { detail: entry }));
        });
    });
    observer.observe(node, options);
    return {
        destroy() {
            observer.disconnect();
        },
    };
};
export const intersection = (node, options = {}) => {
    const scrollParent = getScrollParent(node);
    // Use viewport (null) if scrollParent = `<body>`
    const root = scrollParent === document.body ? null : scrollParent;
    let observer = new IntersectionObserver((entries, observer) => {
        const entry = entries[0];
        node.dispatchEvent(new CustomEvent('intersecting', { detail: entry }));
    }, { root, ...options });
    observer.observe(node);
    return {
        destroy() {
            observer.disconnect();
        },
    };
};
export const mutate = (node, options) => {
    let observer = null;
    function update(options) {
        destroy();
        observer = new MutationObserver((mutations) => {
            node.dispatchEvent(new CustomEvent('mutate', { detail: mutations }));
        });
        observer.observe(node, options);
    }
    function destroy() {
        observer?.disconnect();
        observer = null;
    }
    update(options);
    return { update, destroy };
};
