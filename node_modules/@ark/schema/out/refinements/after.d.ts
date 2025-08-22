import type { BaseRoot } from "../roots/root.ts";
import type { BaseErrorContext, declareNode } from "../shared/declare.ts";
import { type nodeImplementationOf } from "../shared/implement.ts";
import type { JsonSchema } from "../shared/jsonSchema.ts";
import type { ToJsonSchema } from "../shared/toJsonSchema.ts";
import type { TraverseAllows } from "../shared/traversal.ts";
import { BaseRange, type BaseRangeInner, type LimitSchemaValue, type UnknownExpandedRangeSchema, type UnknownNormalizedRangeSchema } from "./range.ts";
export declare namespace After {
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
    interface ErrorContext extends BaseErrorContext<"after">, Inner {
    }
    interface Declaration extends declareNode<{
        kind: "after";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        prerequisite: Date;
        errorContext: ErrorContext;
    }> {
    }
    type Node = AfterNode;
}
export declare class AfterNode extends BaseRange<After.Declaration> {
    impliedBasis: BaseRoot;
    collapsibleLimitString: string;
    traverseAllows: TraverseAllows<Date>;
    reduceJsonSchema(base: JsonSchema, ctx: ToJsonSchema.Context): JsonSchema;
}
export declare const After: {
    implementation: nodeImplementationOf<After.Declaration>;
    Node: typeof AfterNode;
};
