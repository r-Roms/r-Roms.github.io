import type { MaybeGetter } from "../../internal/types.js";
/**
 * Extracts the value from a getter or a value.
 * Optionally, a default value can be provided.
 */
export declare function extract<T>(value: MaybeGetter<T>, defaultValue?: T): T;
