export declare function fail(message: string): never;
/**
 * Omit properties in `T` defined in `K`
 * included with Typescript 3.5 - https://devblogs.microsoft.com/typescript/announcing-typescript-3-5-rc/#the-omit-helper-type
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/**
 *
 * see: https://stackoverflow.com/a/53936938/191902
 */
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
/**
 * Get values of object (similar to Object.values())
 */
export type ValueOf<T> = T[keyof T];
/**
 * Nested Record type
 */
export type NestedRecord<T> = {
    [key: string]: T | NestedRecord<T>;
};
export declare function keys<T extends object>(o: T): (keyof T)[];
export type ObjectKey = string | number | symbol;
export declare function entries<K extends ObjectKey, V>(o: Record<K, V>): [`${Extract<K, string | number>}`, V][];
export declare function entries<K, V>(o: Map<K, V>): [K, V][];
export declare function fromEntries<K extends ObjectKey, V>(entries: [K, V][] | Map<K, V>): Record<K, V>;
export declare function enumKeys(E: any): (string | number | symbol)[];
export declare function enumValues(E: any): any[];
export interface TreeMap<K = string, V = null> extends Map<K, TreeMap | V> {
}
/**
 * Constructs a type consisting of all properties of T set to required and non-nullable (combination of Required<T> and NonNullable<T>)
 * https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredt
 */
export type RequiredNonNullable<T> = {
    [P in keyof T]-?: NonNullable<T[P]>;
};
/**
 * Make all properties partial (full tree unlike Partial<T>)
 * see: https://stackoverflow.com/questions/47914536/use-partial-in-nested-property-with-typescript
 */
export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
export type FilterPropKeys<T, Match> = {
    [P in keyof T]: T[P] extends Match ? P : never;
}[keyof T];
export type EventWithTarget = Partial<Pick<Event, 'currentTarget' | 'target'>>;
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
/**
 * util to make sure we have handled all enum cases in a switch statement
 * Just add at the end of the switch statement a `default` like this:
 *
 * ```ts
 * switch (periodType) {
 *   case xxx:
 *     ...
 *
 *   default:
 *     assertNever(periodType); // This will now report unhandled cases
 * }
 * ```
 */
export declare function assertNever(x: never): never;
//# sourceMappingURL=typeHelpers.d.ts.map