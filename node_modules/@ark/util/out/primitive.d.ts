import type { inferDomain } from "./domain.ts";
import type { BigintLiteral } from "./numbers.ts";
type SerializedString<value extends string = string> = `"${value}"`;
export type SerializedPrimitives = {
    string: SerializedString;
    number: `${number}`;
    bigint: BigintLiteral;
    boolean: "true" | "false";
    null: "null";
    undefined: "undefined";
};
export type SerializedPrimitive = SerializedPrimitives[keyof SerializedPrimitives];
export type SerializablePrimitive = inferDomain<keyof SerializedPrimitives>;
export declare const serializePrimitive: <value extends SerializablePrimitive>(value: value) => serializePrimitive<value>;
export type serializePrimitive<value extends SerializablePrimitive> = value extends string ? `"${value}"` : value extends bigint ? `${value}n` : `${value}`;
export {};
