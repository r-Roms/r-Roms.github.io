import { type Domain, type JsonPrimitive } from "@ark/util";
import type { BaseErrorContext, BaseNormalizedSchema, declareNode } from "../shared/declare.ts";
import { type nodeImplementationOf } from "../shared/implement.ts";
import type { JsonSchema } from "../shared/jsonSchema.ts";
import type { ToJsonSchema } from "../shared/toJsonSchema.ts";
import type { TraverseAllows } from "../shared/traversal.ts";
import { InternalBasis } from "./basis.ts";
export declare namespace Unit {
    interface Schema<value = unknown> extends BaseNormalizedSchema {
        readonly unit: value;
    }
    interface Inner<value = unknown> {
        readonly unit: value;
    }
    interface ErrorContext<value = unknown> extends BaseErrorContext<"unit">, Inner<value> {
    }
    interface Declaration extends declareNode<{
        kind: "unit";
        schema: Schema;
        normalizedSchema: Schema;
        inner: Inner;
        errorContext: ErrorContext;
    }> {
    }
    type Node = UnitNode;
}
export declare class UnitNode extends InternalBasis<Unit.Declaration> {
    compiledValue: JsonPrimitive;
    serializedValue: string;
    compiledCondition: string;
    compiledNegation: string;
    expression: string;
    domain: Domain;
    get defaultShortDescription(): string;
    protected innerToJsonSchema(ctx: ToJsonSchema.Context): JsonSchema;
    traverseAllows: TraverseAllows;
}
export declare const Unit: {
    implementation: nodeImplementationOf<Unit.Declaration>;
    Node: typeof UnitNode;
};
