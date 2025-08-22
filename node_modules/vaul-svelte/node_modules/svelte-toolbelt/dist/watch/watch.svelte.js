import { untrack } from "svelte";
export function watch(box, callback, options = {}) {
    let prev = $state(box.current);
    let ranOnce = false;
    const watchEffect = $effect.root(() => {
        $effect.pre(() => {
            if (prev === box.current || !options.immediate)
                return;
            if (options.once && ranOnce)
                return;
            callback(box.current, untrack(() => prev));
            untrack(() => (prev = box.current));
            ranOnce = true;
        });
        $effect(() => {
            if (prev === box.current || options.immediate)
                return;
            if (options.once && ranOnce)
                return;
            callback(box.current, untrack(() => prev));
            untrack(() => (prev = box.current));
            ranOnce = true;
        });
    });
    return watchEffect;
}
