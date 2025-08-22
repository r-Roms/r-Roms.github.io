import { isFunction } from "../../internal/utils/is.js";
/**
 * Extracts the value from a getter or a value.
 * Optionally, a default value can be provided.
 */
export function extract(value, defaultValue) {
    if (isFunction(value)) {
        const getter = value;
        return getter() ?? defaultValue ?? getter();
    }
    return value ?? defaultValue ?? value;
}
