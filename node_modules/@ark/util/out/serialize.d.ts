import type { array } from "./arrays.ts";
import { type Primitive } from "./domain.ts";
export type SerializationOptions = {
    onCycle?: (value: object) => string;
    onSymbol?: (value: symbol) => string;
    onFunction?: (value: Function) => string;
    onUndefined?: string;
    onBigInt?: (value: bigint) => string;
};
export type JsonStructure = JsonObject | JsonArray;
export interface JsonObject {
    [k: string]: Json;
}
export type JsonArray = Json[];
export type JsonPrimitive = string | boolean | number | null;
export type Json = JsonStructure | JsonPrimitive;
export declare const snapshot: <t>(data: t, opts?: SerializationOptions) => snapshot<t>;
export type snapshot<t, depth extends 1[] = []> = unknown extends t ? unknown : t extends Primitive ? snapshotPrimitive<t> : t extends {
    toJSON: () => infer serialized;
} ? serialized : t extends Function ? `Function(${string})` : t extends Date ? string : depth["length"] extends 10 ? unknown : t extends array<infer item> ? array<snapshot<item, [...depth, 1]>> : {
    [k in keyof t as snapshotPrimitive<k>]: snapshot<t[k], [...depth, 1]>;
};
type snapshotPrimitive<t> = t extends symbol ? `Symbol(${string})` : t;
export type PrintableOptions = {
    indent?: number;
    quoteKeys?: boolean;
};
export declare const print: (data: unknown, opts?: PrintableOptions) => void;
export declare const printable: (data: unknown, opts?: PrintableOptions) => string;
/**
 * Converts a Date instance to a human-readable description relative to its precision
 */
export declare const describeCollapsibleDate: (date: Date) => string;
export {};
