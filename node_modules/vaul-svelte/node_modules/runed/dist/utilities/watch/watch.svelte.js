import { untrack } from "svelte";
function runEffect(flush, effect) {
    switch (flush) {
        case "post":
            $effect(effect);
            break;
        case "pre":
            $effect.pre(effect);
            break;
    }
}
function runWatcher(sources, flush, effect, options = {}) {
    const { lazy = false } = options;
    // Run the effect immediately if `lazy` is `false`.
    let active = !lazy;
    // On the first run, if the dependencies are an array, pass an empty array
    // to the previous value instead of `undefined` to allow destructuring.
    //
    // watch(() => [a, b], ([a, b], [prevA, prevB]) => { ... });
    let previousValues = Array.isArray(sources)
        ? []
        : undefined;
    runEffect(flush, () => {
        const values = Array.isArray(sources) ? sources.map((source) => source()) : sources();
        if (!active) {
            active = true;
            previousValues = values;
            return;
        }
        const cleanup = untrack(() => effect(values, previousValues));
        previousValues = values;
        return cleanup;
    });
}
function runWatcherOnce(sources, flush, effect) {
    const cleanupRoot = $effect.root(() => {
        let stop = false;
        runWatcher(sources, flush, (values, previousValues) => {
            if (stop) {
                cleanupRoot();
                return;
            }
            // Since `lazy` is `true`, `previousValues` is always defined.
            const cleanup = effect(values, previousValues);
            stop = true;
            return cleanup;
        }, 
        // Running the effect immediately just once makes no sense at all.
        // That's just `onMount` with extra steps.
        { lazy: true });
    });
    $effect(() => {
        return cleanupRoot;
    });
}
export function watch(sources, effect, options) {
    runWatcher(sources, "post", effect, options);
}
function watchPre(sources, effect, options) {
    runWatcher(sources, "pre", effect, options);
}
watch.pre = watchPre;
export function watchOnce(source, effect) {
    runWatcherOnce(source, "post", effect);
}
function watchOncePre(source, effect) {
    runWatcherOnce(source, "pre", effect);
}
watchOnce.pre = watchOncePre;
