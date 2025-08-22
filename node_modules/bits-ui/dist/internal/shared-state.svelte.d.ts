import type { AnyFn } from "./types.js";
export declare class SharedState<T extends AnyFn> {
    #private;
    constructor(factory: T);
    get(...args: Parameters<T>): ReturnType<T>;
}
