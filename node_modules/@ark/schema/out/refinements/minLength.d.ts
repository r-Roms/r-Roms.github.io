import type { BaseRoot } from "../roots/root.ts";
import type { BaseErrorContext, declareNode } from "../shared/declare.ts";
import { type nodeImplementationOf } from "../shared/implement.ts";
import type { JsonSchema } from "../shared/jsonSchema.ts";
import type { TraverseAllows } from "../shared/traversal.ts";
import { BaseRange, type BaseRangeInner, type LengthBoundableData, type UnknownExpandedRangeSchema, type UnknownNormalizedRangeSchema } from "./range.ts";
export declare namespace MinLength {
    interface Inner extends BaseRangeInner {
        rule: number;
    }
    interface NormalizedSchema extends UnknownNormalizedRangeSchema {
        rule: number;
    }
    interface ExpandedSchema extends UnknownExpandedRangeSchema {
        rule: number;
    }
    type Schema = ExpandedSchema | number;
    interface ErrorContext extends BaseErrorContext<"minLength">, Inner {
    }
    interface Declaration extends declareNode<{
        kind: "minLength";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        prerequisite: LengthBoundableData;
        reducibleTo: "intersection";
        errorContext: ErrorContext;
    }> {
    }
    type Node = MinLengthNode;
}
export declare class MinLengthNode extends BaseRange<MinLength.Declaration> {
    readonly impliedBasis: BaseRoot;
    traverseAllows: TraverseAllows<LengthBoundableData>;
    reduceJsonSchema(schema: JsonSchema.LengthBoundable): JsonSchema.LengthBoundable;
}
export declare const MinLength: {
    implementation: nodeImplementationOf<MinLength.Declaration>;
    Node: typeof MinLengthNode;
};
