import type { Getter } from "../../internal/types.js";
/**
 * Holds the previous value of a getter.
 *
 * @see {@link https://runed.dev/docs/utilities/previous}
 */
export declare class Previous<T> {
    #private;
    constructor(getter: Getter<T>, initialValue?: T);
    get current(): T | undefined;
}
