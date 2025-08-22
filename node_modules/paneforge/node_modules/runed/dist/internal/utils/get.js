import { isFunction } from "./is.js";
export function get(value) {
    if (isFunction(value)) {
        return value();
    }
    return value;
}
