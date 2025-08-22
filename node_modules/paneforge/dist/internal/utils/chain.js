/**
 * Executes an array of callback functions with the same arguments.
 * @template T The types of the arguments that the callback functions take.
 * @returns A new function that executes all of the original callback functions with the same arguments.
 */
export function chain(...callbacks) {
    return (...args) => {
        for (const callback of callbacks) {
            if (typeof callback === "function") {
                callback(...args);
            }
        }
    };
}
