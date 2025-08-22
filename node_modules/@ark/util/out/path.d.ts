import { ReadonlyArray, type array } from "./arrays.ts";
import type { requireKeys } from "./records.ts";
import { type JsonArray } from "./serialize.ts";
export type StringifyPathOptions<stringifiable = PropertyKey> = requireKeys<{
    stringifySymbol?: (s: symbol) => string;
    stringifyNonKey?: (o: Exclude<stringifiable, PropertyKey>) => string;
}, stringifiable extends PropertyKey ? never : "stringifyNonKey">;
export type StringifyPathFn = <stringifiable>(path: array<stringifiable>, ...[opts]: [stringifiable] extends [PropertyKey] ? [
    opts?: StringifyPathOptions
] : NoInfer<[opts: StringifyPathOptions<stringifiable>]>) => string;
export type AppendStringifiedKeyFn = <stringifiable>(path: string, prop: stringifiable, ...[opts]: [stringifiable] extends [PropertyKey] ? [
    opts?: StringifyPathOptions
] : NoInfer<[opts: StringifyPathOptions<stringifiable>]>) => string;
export declare const appendStringifiedKey: AppendStringifiedKeyFn;
export declare const stringifyPath: StringifyPathFn;
export declare class ReadonlyPath extends ReadonlyArray<PropertyKey> {
    private cache;
    constructor(...items: array<PropertyKey>);
    toJSON(): JsonArray;
    stringify(): string;
    stringifyAncestors(): readonly string[];
}
