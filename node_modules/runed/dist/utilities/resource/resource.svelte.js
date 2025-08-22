import { watch } from "../watch/index.js";
// Helper functions for debounce and throttle
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce(fn, delay) {
    let timeoutId;
    let lastResolve = null;
    return (...args) => {
        return new Promise((resolve) => {
            if (lastResolve) {
                lastResolve(undefined);
            }
            lastResolve = resolve;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(async () => {
                const result = await fn(...args);
                if (lastResolve) {
                    lastResolve(result);
                    lastResolve = null;
                }
            }, delay);
        });
    };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function throttle(fn, delay) {
    let lastRun = 0;
    let lastPromise = null;
    return (...args) => {
        const now = Date.now();
        if (lastRun && now - lastRun < delay) {
            return lastPromise ?? Promise.resolve(undefined);
        }
        lastRun = now;
        lastPromise = fn(...args);
        return lastPromise;
    };
}
function runResource(source, fetcher, options = {}, effectFn) {
    const { lazy = false, once = false, initialValue, debounce: debounceTime, throttle: throttleTime, } = options;
    // Create state
    let current = $state(initialValue);
    let loading = $state(false);
    let error = $state(undefined);
    let cleanupFns = $state([]);
    // Helper function to run cleanup functions
    const runCleanup = () => {
        cleanupFns.forEach((fn) => fn());
        cleanupFns = [];
    };
    // Helper function to register cleanup
    const onCleanup = (fn) => {
        cleanupFns = [...cleanupFns, fn];
    };
    // Create the base fetcher function
    const baseFetcher = async (value, previousValue, refetching = false) => {
        try {
            loading = true;
            error = undefined;
            runCleanup();
            // Create new AbortController for this fetch
            const controller = new AbortController();
            onCleanup(() => controller.abort());
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = await fetcher(value, previousValue, {
                data: current,
                refetching,
                onCleanup,
                signal: controller.signal,
            });
            current = result;
            return result;
        }
        catch (e) {
            if (!(e instanceof DOMException && e.name === "AbortError")) {
                error = e;
            }
            return undefined;
        }
        finally {
            loading = false;
        }
    };
    // Apply debounce or throttle if specified
    const runFetcher = debounceTime
        ? debounce(baseFetcher, debounceTime)
        : throttleTime
            ? throttle(baseFetcher, throttleTime)
            : baseFetcher;
    // Setup effect
    const sources = Array.isArray(source) ? source : [source];
    let prevValues;
    effectFn((values, previousValues) => {
        // Skip if once and already ran
        if (once && prevValues) {
            return;
        }
        prevValues = values;
        runFetcher(Array.isArray(source) ? values : values[0], Array.isArray(source) ? previousValues : previousValues?.[0]);
    }, { lazy });
    return {
        get current() {
            return current;
        },
        get loading() {
            return loading;
        },
        get error() {
            return error;
        },
        mutate: (value) => {
            current = value;
        },
        refetch: (info) => {
            const values = sources.map((s) => s());
            return runFetcher(Array.isArray(source) ? values : values[0], Array.isArray(source) ? values : values[0], info ?? true);
        },
    };
}
// Implementation
export function resource(source, fetcher, options) {
    return runResource(source, fetcher, options, (fn, options) => {
        const sources = Array.isArray(source) ? source : [source];
        const getters = () => sources.map((s) => s());
        watch(getters, (values, previousValues) => {
            fn(values, previousValues ?? []);
        }, options);
    });
}
// Implementation
export function resourcePre(source, fetcher, options) {
    return runResource(source, fetcher, options, (fn, options) => {
        const sources = Array.isArray(source) ? source : [source];
        const getter = () => sources.map((s) => s());
        watch.pre(getter, (values, previousValues) => {
            fn(values, previousValues ?? []);
        }, options);
    });
}
resource.pre = resourcePre;
