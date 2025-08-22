/**
 * A utility function that executes a callback after a specified number of milliseconds.
 */
export function afterSleep(ms, cb) {
    return setTimeout(cb, ms);
}
