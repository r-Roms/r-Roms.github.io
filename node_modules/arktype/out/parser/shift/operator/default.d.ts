import type { BaseRoot } from "@ark/schema";
import type { BigintLiteral, ErrorMessage, NumberLiteral, trim } from "@ark/util";
import type { DateLiteral } from "../../../attributes.ts";
import type { DynamicStateWithRoot } from "../../reduce/dynamic.ts";
import type { StringLiteral } from "../operand/enclosed.ts";
type UnitLiteralKeyword = "null" | "undefined" | "true" | "false";
export type UnitLiteral = StringLiteral | BigintLiteral | NumberLiteral | DateLiteral | UnitLiteralKeyword;
export type ParsedDefaultableProperty = readonly [BaseRoot, "=", unknown];
export declare const parseDefault: (s: DynamicStateWithRoot) => ParsedDefaultableProperty;
export type parseDefault<root, unscanned extends string> = trim<unscanned> extends infer defaultValue extends UnitLiteral ? [
    root,
    "=",
    defaultValue
] : ErrorMessage<writeNonLiteralDefaultMessage<trim<unscanned>>>;
export declare const writeNonLiteralDefaultMessage: <defaultDef extends string>(defaultDef: defaultDef) => writeNonLiteralDefaultMessage<defaultDef>;
export type writeNonLiteralDefaultMessage<defaultDef extends string> = `Default value '${defaultDef}' must a literal value`;
export {};
