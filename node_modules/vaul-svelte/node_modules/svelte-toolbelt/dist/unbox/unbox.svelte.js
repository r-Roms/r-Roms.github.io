import { box } from "../box/box.svelte.js";
import { isFunction } from "../utils/is.js";
export function unbox(value) {
    if (box.isBox(value)) {
        return value.current;
    }
    if (isFunction(value)) {
        const getter = value;
        return getter();
    }
    return value;
}
