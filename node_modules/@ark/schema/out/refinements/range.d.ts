import { type array, type propValueOf, type satisfy } from "@ark/util";
import { InternalPrimitiveConstraint } from "../constraint.ts";
import type { Declaration, nodeOfKind, NodeSchema, NormalizedSchema } from "../kinds.ts";
import type { BaseNodeDeclaration, BaseNormalizedSchema } from "../shared/declare.ts";
import type { keySchemaDefinitions, RangeKind } from "../shared/implement.ts";
export interface BaseRangeDeclaration extends BaseNodeDeclaration {
    kind: RangeKind;
    inner: BaseRangeInner;
    normalizedSchema: UnknownExpandedRangeSchema;
}
export declare abstract class BaseRange<d extends BaseRangeDeclaration> extends InternalPrimitiveConstraint<d> {
    readonly exclusive?: true;
    readonly boundOperandKind: OperandKindsByBoundKind[d["kind"]];
    readonly compiledActual: string;
    readonly comparator: RelativeComparator;
    readonly numericLimit: number;
    readonly expression: string;
    readonly compiledCondition: string;
    readonly compiledNegation: string;
    readonly stringLimit: string;
    readonly limitKind: LimitKind;
    isStricterThan(r: nodeOfKind<d["kind"] | pairedRangeKind<d["kind"]>>): boolean;
    overlapsRange(r: nodeOfKind<pairedRangeKind<d["kind"]>>): boolean;
    overlapIsUnit(r: nodeOfKind<pairedRangeKind<d["kind"]>>): boolean;
}
export interface BaseRangeInner {
    readonly rule: LimitValue;
}
export type LimitValue = Date | number;
export type LimitSchemaValue = Date | number | string;
export type LimitInnerValue<kind extends RangeKind = RangeKind> = kind extends "before" | "after" ? Date : number;
export interface UnknownExpandedRangeSchema extends BaseNormalizedSchema {
    readonly rule: LimitSchemaValue;
    readonly exclusive?: boolean;
}
export interface UnknownNormalizedRangeSchema extends BaseNormalizedSchema {
    readonly rule: LimitSchemaValue;
}
export type UnknownRangeSchema = LimitSchemaValue | UnknownExpandedRangeSchema;
export interface ExclusiveExpandedDateRangeSchema extends BaseNormalizedSchema {
    rule: LimitSchemaValue;
    exclusive?: true;
}
export type ExclusiveDateRangeSchema = LimitSchemaValue | ExclusiveExpandedDateRangeSchema;
export interface InclusiveExpandedDateRangeSchema extends BaseNormalizedSchema {
    rule: LimitSchemaValue;
    exclusive?: false;
}
export type InclusiveDateRangeSchema = LimitSchemaValue | InclusiveExpandedDateRangeSchema;
export interface ExclusiveNormalizedNumericRangeSchema extends BaseNormalizedSchema {
    rule: number;
    exclusive?: true;
}
export type ExclusiveNumericRangeSchema = number | ExclusiveNormalizedNumericRangeSchema;
export interface InclusiveNormalizedNumericRangeSchema extends BaseNormalizedSchema {
    rule: number;
    exclusive?: false;
}
export type InclusiveNumericRangeSchema = number | InclusiveNormalizedNumericRangeSchema;
export type LimitKind = "lower" | "upper";
export type RelativeComparator<kind extends LimitKind = LimitKind> = {
    lower: ">" | ">=";
    upper: "<" | "<=";
}[kind];
export declare const boundKindPairsByLower: BoundKindPairsByLower;
type BoundKindPairsByLower = {
    min: "max";
    minLength: "maxLength";
    after: "before";
};
type BoundKindPairsByUpper = {
    max: "min";
    maxLength: "minLength";
    before: "after";
};
export type pairedRangeKind<kind extends RangeKind> = kind extends LowerBoundKind ? BoundKindPairsByLower[kind] : BoundKindPairsByUpper[kind & UpperBoundKind];
export type LowerBoundKind = keyof typeof boundKindPairsByLower;
export type LowerNode = nodeOfKind<LowerBoundKind>;
export type UpperBoundKind = propValueOf<typeof boundKindPairsByLower>;
export type UpperNode = nodeOfKind<UpperBoundKind>;
export type NumericallyBoundable = string | number | array;
export type Boundable = NumericallyBoundable | Date;
export declare const parseExclusiveKey: keySchemaDefinitions<Declaration<"min" | "max">>["exclusive"];
export declare const createLengthSchemaNormalizer: <kind extends "minLength" | "maxLength">(kind: kind) => (schema: NodeSchema<kind>) => NormalizedSchema<kind>;
export declare const createDateSchemaNormalizer: <kind extends DateRangeKind>(kind: kind) => (schema: NodeSchema<kind>) => NormalizedSchema<kind>;
export declare const parseDateLimit: (limit: LimitSchemaValue) => Date;
export type LengthBoundKind = "minLength" | "maxLength" | "exactLength";
export declare const writeInvalidLengthBoundMessage: (kind: LengthBoundKind, limit: number) => string;
export declare const createLengthRuleParser: (kind: LengthBoundKind) => (limit: number) => number | undefined;
type OperandKindsByBoundKind = satisfy<Record<RangeKind, BoundOperandKind>, {
    min: "value";
    max: "value";
    minLength: "length";
    maxLength: "length";
    after: "date";
    before: "date";
}>;
export declare const compileComparator: (kind: RangeKind, exclusive: boolean | undefined) => RelativeComparator;
export type BoundOperandKind = "value" | "length" | "date";
export type LengthBoundableData = string | array;
export type DateRangeKind = "before" | "after";
export declare const dateLimitToString: (limit: LimitSchemaValue) => string;
export declare const writeUnboundableMessage: <root extends string>(root: root) => writeUnboundableMessage<root>;
export type writeUnboundableMessage<root extends string> = `Bounded expression ${root} must be exactly one of number, string, Array, or Date`;
export {};
