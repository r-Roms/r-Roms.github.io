import type { JSONSchema7Definition } from 'json-schema';
import type { JSONSchema } from './jsonSchema/index.js';
import type { Writable } from 'svelte/store';
export type NumericRange<START extends number, END extends number, ARR extends unknown[] = [], ACC extends number = never> = ARR['length'] extends END ? ACC | START | END : NumericRange<START, END, [...ARR, 1], ARR[START] extends undefined ? ACC : ACC | ARR['length']>;
export type ErrorStatus = NumericRange<400, 599>;
export declare function clone<T>(data: T): T;
export type MaybePromise<T> = T | Promise<T>;
export type Prettify<T> = T extends object ? {
    [K in keyof T]: T[K];
} : T & {};
export type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
export declare function assertSchema(schema: JSONSchema7Definition, path: string | (string | number | symbol)[]): asserts schema is JSONSchema;
export type AllKeys<T> = T extends T ? keyof T : never;
type PickType<T, K extends AllKeys<T>> = T extends {
    [k in K]: any;
} ? T[K] : never;
/**
 * Merges a union to a single type which includes the properties of each type in the union.
 *
 * Thanks to https://dev.to/lucianbc/union-type-merging-in-typescript-9al
 */
export type MergeUnion<T> = {
    [K in AllKeys<T>]: PickType<T, K>;
};
/**
 * Transforms a Svelte store of a Record<string, unknown> type to a merged type of its unions.
 */
export type MergeFormUnion<Store extends Writable<Record<string, unknown>>> = Store extends Writable<infer M> ? Writable<MergeUnion<M>> : never;
/**
 * Casts a Svelte store of a Record<string, unknown> type to a merged type of its unions.
 * @param store A Svelte store of a Record<string, unknown> type
 * @returns The same store but casted to a merged type of its unions.
 */
export declare function mergeFormUnion<Store extends Record<string, unknown>>(store: Writable<Store>): Writable<MergeUnion<Store>>;
export {};
