import type { describeDefaults, DescribeOptions } from "./describe.ts";
import type { show } from "./generics.ts";
import type { stringifyUnion } from "./unionToTuple.ts";
export type JsTypeOf = "object" | "function" | "number" | "bigint" | "boolean" | "string" | "symbol" | "undefined" | "null";
export declare const hasDomain: <data, domain extends Domain>(data: data, kind: domain) => data is data & inferDomain<domain>;
type TypesByDomain = {
    bigint: bigint;
    boolean: boolean;
    number: number;
    object: object;
    string: string;
    symbol: symbol;
    undefined: undefined;
    null: null;
};
export type inferDomain<kind extends Domain> = Domain extends kind ? unknown : TypesByDomain[kind];
export type Domain = show<keyof TypesByDomain>;
export type NullishDomain = "undefined" | "null";
export type NonNullishDomain = Exclude<Domain, NullishDomain>;
export type PrimitiveDomain = Exclude<Domain, "object">;
export type Primitive = inferDomain<PrimitiveDomain>;
export type domainOf<data> = unknown extends data ? Domain : data extends object ? "object" : data extends string ? "string" : data extends number ? "number" : data extends boolean ? "boolean" : data extends undefined ? "undefined" : data extends null ? "null" : data extends bigint ? "bigint" : data extends symbol ? "symbol" : never;
export declare const domainOf: <data>(data: data) => domainOf<data>;
/** Each domain's completion for the phrase "must be _____" */
export declare const domainDescriptions: {
    readonly boolean: "boolean";
    readonly null: "null";
    readonly undefined: "undefined";
    readonly bigint: "a bigint";
    readonly number: "a number";
    readonly object: "an object";
    readonly string: "a string";
    readonly symbol: "a symbol";
};
export declare const jsTypeOfDescriptions: {
    readonly function: "a function";
    readonly boolean: "boolean";
    readonly null: "null";
    readonly undefined: "undefined";
    readonly bigint: "a bigint";
    readonly number: "a number";
    readonly object: "an object";
    readonly string: "a string";
    readonly symbol: "a symbol";
};
export type domainDescriptions = typeof domainDescriptions;
export type describeDomainOf<t, opts extends DescribeOptions = {}> = stringifyUnion<opts["includeArticles"] extends true ? domainDescriptions[domainOf<t>] : domainOf<t>, opts["branchDelimiter"] extends string ? opts["branchDelimiter"] : describeDefaults["branchDelimiter"]>;
export {};
