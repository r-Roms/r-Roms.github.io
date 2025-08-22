import { entries, keys } from '@layerstack/utils';
export const styleProps = (node, props) => {
    entries(props ?? {}).forEach(([key, value]) => {
        // Ignore if null or undefined
        if (value != null) {
            value = typeof value === 'boolean' ? (value ? 1 : 0) : value;
            node.style.setProperty(String(key), String(value));
        }
    });
    let lastProps = {};
    return {
        update(newProps) {
            const newKeys = keys(newProps);
            keys(lastProps)
                .filter((key) => !newKeys.includes(key))
                .forEach((key) => node.style.removeProperty(key));
            entries(newProps).forEach(([key, value]) => {
                // Ignore if null or undefined
                if (value != null) {
                    node.style.setProperty(String(key), String(value));
                }
                if (props) {
                    delete props[key];
                }
            });
            lastProps = newProps;
        },
    };
};
export const computedStyles = (node, callback) => {
    callback(window.getComputedStyle(node));
    let mutationObserver = new MutationObserver((entries, observer) => {
        callback(window.getComputedStyle(node));
    });
    mutationObserver.observe(node, { attributes: true, attributeFilter: ['class', 'style'] });
    return {
        destroy() {
            mutationObserver.disconnect();
        },
    };
};
