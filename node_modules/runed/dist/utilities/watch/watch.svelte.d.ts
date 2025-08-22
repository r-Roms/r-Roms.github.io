import type { Getter } from "../../internal/types.js";
export type WatchOptions = {
    /**
     * If `true`, the effect doesn't run until one of the `sources` changes.
     *
     * @default false
     */
    lazy?: boolean;
};
export declare function watch<T extends Array<unknown>>(sources: {
    [K in keyof T]: Getter<T[K]>;
}, effect: (values: T, previousValues: {
    [K in keyof T]: T[K] | undefined;
}) => void | VoidFunction, options?: WatchOptions): void;
export declare function watch<T>(source: Getter<T>, effect: (value: T, previousValue: T | undefined) => void | VoidFunction, options?: WatchOptions): void;
export declare namespace watch {
    var pre: typeof watchPre;
}
declare function watchPre<T extends Array<unknown>>(sources: {
    [K in keyof T]: Getter<T[K]>;
}, effect: (values: T, previousValues: {
    [K in keyof T]: T[K] | undefined;
}) => void | VoidFunction, options?: WatchOptions): void;
declare function watchPre<T>(source: Getter<T>, effect: (value: T, previousValue: T | undefined) => void | VoidFunction, options?: WatchOptions): void;
export declare function watchOnce<T extends Array<unknown>>(sources: {
    [K in keyof T]: Getter<T[K]>;
}, effect: (values: T, previousValues: T) => void | VoidFunction): void;
export declare function watchOnce<T>(source: Getter<T>, effect: (value: T, previousValue: T) => void | VoidFunction): void;
export declare namespace watchOnce {
    var pre: typeof watchOncePre;
}
declare function watchOncePre<T extends Array<unknown>>(sources: {
    [K in keyof T]: Getter<T[K]>;
}, effect: (values: T, previousValues: T) => void | VoidFunction): void;
declare function watchOncePre<T>(source: Getter<T>, effect: (value: T, previousValue: T) => void | VoidFunction): void;
export {};
