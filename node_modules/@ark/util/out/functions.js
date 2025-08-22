import { throwInternalError } from "./errors.js";
import { unset } from "./records.js";
export const cached = (thunk) => {
    let result = unset;
    return () => (result === unset ? (result = thunk()) : result);
};
export const isThunk = (value) => typeof value === "function" && value.length === 0;
export const tryCatch = (fn, onError) => {
    try {
        return fn();
    }
    catch (e) {
        return onError?.(e);
    }
};
export const DynamicFunction = class extends Function {
    constructor(...args) {
        const params = args.slice(0, -1);
        const body = args.at(-1);
        try {
            super(...params, body);
        }
        catch (e) {
            return throwInternalError(`Encountered an unexpected error while compiling your definition:
                Message: ${e} 
                Source: (${args.slice(0, -1)}) => {
                    ${args.at(-1)}
                }`);
        }
    }
};
export class Callable {
    constructor(fn, ...[opts]) {
        return Object.assign(Object.setPrototypeOf(fn.bind(opts?.bind ?? this), this.constructor.prototype), opts?.attach);
    }
}
/**
 * Checks if the environment has Content Security Policy (CSP) enabled,
 * preventing JIT-optimized code from being compiled via new Function().
 *
 * @returns `true` if a function created using new Function() can be
 * successfully invoked in the environment, `false` otherwise.
 *
 * The result is cached for subsequent invocations.
 */
export const envHasCsp = cached(() => {
    try {
        return new Function("return false")();
    }
    catch {
        return true;
    }
});
