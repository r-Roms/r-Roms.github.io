import { tick } from "svelte";
export function afterTick(fn) {
    tick().then(fn);
}
