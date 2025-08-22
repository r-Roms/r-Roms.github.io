import { test, vi } from "vitest";
export function testWithEffect(name, fn) {
    test(name, () => effectRootScope(fn));
}
export function effectRootScope(fn) {
    let promise;
    const cleanup = $effect.root(() => {
        promise = fn();
    });
    if (promise instanceof Promise) {
        return promise.finally(cleanup);
    }
    else {
        cleanup();
    }
}
export function vitestSetTimeoutWrapper(fn, timeout) {
    setTimeout(() => {
        fn();
    }, timeout + 1);
    vi.advanceTimersByTime(timeout);
}
