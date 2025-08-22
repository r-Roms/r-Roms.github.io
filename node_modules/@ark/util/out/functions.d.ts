export type Fn<args extends readonly any[] = readonly any[], returns = unknown> = (...args: args) => returns;
export declare const cached: <t>(thunk: () => t) => (() => t);
export declare const isThunk: <value>(value: value) => value is Extract<value, Thunk> extends never ? value & Thunk : Extract<value, Thunk>;
export type Thunk<ret = unknown> = () => ret;
export type thunkable<t> = t | Thunk<t>;
export declare const tryCatch: <returns, onError = never>(fn: () => returns, onError?: (e: unknown) => onError) => returns | onError;
export declare const DynamicFunction: DynamicFunction;
export type DynamicFunction = new <fn extends Fn>(...args: ConstructorParameters<typeof Function>) => fn & {
    apply(thisArg: null, args: Parameters<fn>): ReturnType<fn>;
    call(thisArg: null, ...args: Parameters<fn>): ReturnType<fn>;
};
export type CallableOptions<attachments extends object> = {
    attach?: attachments;
    bind?: object;
};
/** @ts-ignore required to cast function type */
export interface Callable<fn extends Fn, attachments extends object> extends fn, attachments {
}
export declare class Callable<fn extends Fn, attachments extends object = {}> {
    constructor(fn: fn, ...[opts]: {} extends attachments ? [opts?: CallableOptions<attachments>] : [opts: CallableOptions<attachments>]);
}
export type GuardablePredicate<input = unknown, narrowed extends input = input> = ((In: input) => In is narrowed) | ((In: input) => boolean);
export type TypeGuard<input = unknown, narrowed extends input = input> = (In: input) => In is narrowed;
/**
 * Checks if the environment has Content Security Policy (CSP) enabled,
 * preventing JIT-optimized code from being compiled via new Function().
 *
 * @returns `true` if a function created using new Function() can be
 * successfully invoked in the environment, `false` otherwise.
 *
 * The result is cached for subsequent invocations.
 */
export declare const envHasCsp: () => boolean;
