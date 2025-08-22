import { focusMove } from './focus.js';
/**
 * Auto focus node when rendered.  Useful for inputs
 */
export function autoFocus(node, options) {
    // Delay by 5ms by default since Dialog/Drawer/Menu also call `focusMove` but with default `0ms` delay, and we want to focus last
    // Chrome works with `1ms`, but Firefox required `2ms` and Safari required `3ms`, so using `5ms` as a buffer
    return focusMove(node, { delay: 5, ...options });
}
/**
 * Selects the text inside a text node when the node is focused
 */
export const selectOnFocus = (node) => {
    const handleFocus = (event) => {
        node.select();
    };
    node.addEventListener('focus', handleFocus);
    return {
        destroy() {
            node.removeEventListener('focus', handleFocus);
        },
    };
};
/**
 * Blurs the node when Escape is pressed
 */
export const blurOnEscape = (node) => {
    const handleKey = (event) => {
        if (event.key === 'Escape') {
            node.blur();
        }
    };
    node.addEventListener('keydown', handleKey);
    return {
        destroy() {
            node.removeEventListener('keydown', handleKey);
        },
    };
};
/**
 * Automatically resize textarea based on content
 * See:
 *  - https://svelte.dev/repl/ead0f1fcd2d4402bbbd64eca1d665341?version=3.14.1
 *  - https://svelte.dev/repl/f1a7e24a08a54947bb4447f295c741fb?version=3.14.1
 */
export const autoHeight = (node) => {
    function resize({ target }) {
        if (target instanceof HTMLElement) {
            target.style.height = '1px';
            target.style.height = +target.scrollHeight + 'px';
        }
    }
    node.style.overflow = 'hidden';
    node.addEventListener('input', resize);
    // Resize initially
    resize({ target: node });
    return {
        destroy() {
            node.removeEventListener('input', resize);
        },
    };
};
/**
 * Debounce event handler (change, input, etc)
 */
export const debounceEvent = (node, options) => {
    if (options) {
        const { type, listener, timeout } = options;
        let lastTimeoutId;
        function onEvent(e) {
            clearTimeout(lastTimeoutId);
            lastTimeoutId = setTimeout(() => {
                listener(e);
            }, timeout ?? 300);
        }
        node.addEventListener(type, onEvent);
        return {
            destroy() {
                node.removeEventListener(type, onEvent);
            },
        };
    }
};
