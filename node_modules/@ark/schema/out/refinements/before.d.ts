import type { BaseRoot } from "../roots/root.ts";
import type { BaseErrorContext, declareNode } from "../shared/declare.ts";
import { type nodeImplementationOf } from "../shared/implement.ts";
import type { JsonSchema } from "../shared/jsonSchema.ts";
import type { ToJsonSchema } from "../shared/toJsonSchema.ts";
import type { TraverseAllows } from "../shared/traversal.ts";
import { BaseRange, type BaseRangeInner, type LimitSchemaValue, type UnknownExpandedRangeSchema, type UnknownNormalizedRangeSchema } from "./range.ts";
export declare namespace Before {
    interface Inner extends BaseRangeInner {
        rule: Date;
    }
    interface NormalizedSchema extends UnknownNormalizedRangeSchema {
        rule: LimitSchemaValue;
    }
    interface ExpandedSchema extends UnknownExpandedRangeSchema {
        rule: LimitSchemaValue;
    }
    type Schema = ExpandedSchema | LimitSchemaValue;
    interface ErrorContext extends BaseErrorContext<"before">, Inner {
    }
    interface Declaration extends declareNode<{
        kind: "before";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        prerequisite: Date;
        errorContext: ErrorContext;
    }> {
    }
    type Node = BeforeNode;
}
export declare class BeforeNode extends BaseRange<Before.Declaration> {
    collapsibleLimitString: string;
    traverseAllows: TraverseAllows<Date>;
    impliedBasis: BaseRoot;
    reduceJsonSchema(base: JsonSchema, ctx: ToJsonSchema.Context): JsonSchema;
}
export declare const Before: {
    implementation: nodeImplementationOf<Before.Declaration>;
    Node: typeof BeforeNode;
};
