import { InternalPrimitiveConstraint } from "../constraint.ts";
import type { BaseRoot } from "../roots/root.ts";
import type { BaseErrorContext, BaseNormalizedSchema, declareNode } from "../shared/declare.ts";
import { type nodeImplementationOf } from "../shared/implement.ts";
import type { JsonSchema } from "../shared/jsonSchema.ts";
import type { ToJsonSchema } from "../shared/toJsonSchema.ts";
export declare namespace Pattern {
    interface NormalizedSchema extends BaseNormalizedSchema {
        readonly rule: string;
        readonly flags?: string;
    }
    interface Inner {
        readonly rule: string;
        readonly flags?: string;
    }
    type Schema = NormalizedSchema | string | RegExp;
    interface ErrorContext extends BaseErrorContext<"pattern">, Inner {
    }
    interface Declaration extends declareNode<{
        kind: "pattern";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        intersectionIsOpen: true;
        prerequisite: string;
        errorContext: ErrorContext;
    }> {
    }
    type Node = PatternNode;
}
export declare class PatternNode extends InternalPrimitiveConstraint<Pattern.Declaration> {
    readonly instance: RegExp;
    readonly expression: string;
    traverseAllows: (string: string) => boolean;
    readonly compiledCondition: string;
    readonly compiledNegation: string;
    readonly impliedBasis: BaseRoot;
    reduceJsonSchema(base: JsonSchema.String, ctx: ToJsonSchema.Context): JsonSchema.String;
}
export declare const Pattern: {
    implementation: nodeImplementationOf<Pattern.Declaration>;
    Node: typeof PatternNode;
};
