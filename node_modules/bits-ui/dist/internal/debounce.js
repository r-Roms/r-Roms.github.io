// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce(fn, wait = 500) {
    let timeout = null;
    const debounced = (...args) => {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            fn(...args);
        }, wait);
    };
    debounced.destroy = () => {
        if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
        }
    };
    return debounced;
}
