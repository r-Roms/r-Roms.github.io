import type { Snippet } from "svelte";
import type * as CSS from "csstype";
import type { ReadableBox, WritableBox } from "./box/box.svelte.js";
export type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return;
export type Getter<T> = () => T;
export type MaybeGetter<T> = T | Getter<T>;
export type MaybeBoxOrGetter<T> = T | Getter<T> | ReadableBox<T>;
export type BoxOrGetter<T> = Getter<T> | ReadableBox<T>;
export type Box<T> = ReadableBox<T> | WritableBox<T>;
export type Expand<T> = T extends infer U ? {
    [K in keyof U]: U[K];
} : never;
/**
 * Given a Record type T, returns a type that represents the same type, but with
 * all values wrapped in a `ReadableBox`.
 */
export type ReadableBoxedValues<T> = {
    [K in keyof T]: ReadableBox<T[K]>;
};
/**
 * Given a Record type T, returns a type that represents the same type, but with
 * all values wrapped in a `WritableBox`.
 */
export type WritableBoxedValues<T> = {
    [K in keyof T]: WritableBox<T[K]>;
};
export type WithChild<
/**
 * The props that the component accepts.
 */
Props extends Record<PropertyKey, unknown> = {}, 
/**
 * The props that are passed to the `child` and `children` snippets. The `ElementProps` are
 * merged with these props for the `child` snippet.
 */
SnippetProps extends Record<PropertyKey, unknown> = {
    _default: never;
}, 
/**
 * The underlying DOM element being rendered. You can bind to this prop to
 * programatically interact with the element.
 */
Ref = HTMLElement> = Omit<Props, "child" | "children"> & {
    child?: SnippetProps extends {
        _default: never;
    } ? Snippet<[{
        props: Record<string, unknown>;
    }]> : Snippet<[SnippetProps & {
        props: Record<string, unknown>;
    }]>;
    children?: SnippetProps extends {
        _default: never;
    } ? Snippet : Snippet<[SnippetProps]>;
    style?: string | null | undefined;
    ref?: Ref | null | undefined;
};
export type WithChildren<Props = {}> = Props & {
    children?: Snippet | undefined;
};
/**
 * Constructs a new type by omitting properties from type
 * 'T' that exist in type 'U'.
 *
 * @template T - The base object type from which properties will be omitted.
 * @template U - The object type whose properties will be omitted from 'T'.
 * @example
 * type Result = Without<{ a: number; b: string; }, { b: string; }>;
 * // Result type will be { a: number; }
 */
export type Without<T extends object, U extends object> = Omit<T, keyof U>;
export type WithRefProps<T = {}> = T & ReadableBoxedValues<{
    id: string;
}> & WritableBoxedValues<{
    ref: HTMLElement | null;
}>;
export type WithoutChild<T> = T extends {
    child?: any;
} ? Omit<T, "child"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithoutChildren<T> = T extends {
    children?: any;
} ? Omit<T, "children"> : T;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
    ref?: U | null;
};
export type StyleProperties = CSS.Properties & {
    [str: `--${string}`]: any;
};
export type AnyFn = (...args: any[]) => any;
