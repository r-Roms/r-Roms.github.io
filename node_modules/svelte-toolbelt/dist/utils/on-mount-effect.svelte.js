import { untrack } from "svelte";
export function onMountEffect(fn) {
    $effect(() => {
        const cleanup = untrack(() => fn());
        return cleanup;
    });
}
