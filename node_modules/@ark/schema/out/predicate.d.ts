import { BaseConstraint } from "./constraint.ts";
import type { NodeCompiler } from "./shared/compile.ts";
import type { BaseErrorContext, BaseNormalizedSchema, declareNode } from "./shared/declare.ts";
import { type nodeImplementationOf } from "./shared/implement.ts";
import type { JsonSchema } from "./shared/jsonSchema.ts";
import { type RegisteredReference } from "./shared/registry.ts";
import type { ToJsonSchema } from "./shared/toJsonSchema.ts";
import type { Traversal, TraverseAllows, TraverseApply } from "./shared/traversal.ts";
export declare namespace Predicate {
    type Schema<predicate extends Predicate = Predicate> = NormalizedSchema<predicate> | predicate;
    interface NormalizedSchema<predicate extends Predicate = Predicate> extends BaseNormalizedSchema {
        readonly predicate: predicate;
    }
    interface Inner<predicate extends Predicate = Predicate> {
        readonly predicate: predicate;
    }
    interface ErrorContext extends BaseErrorContext<"predicate"> {
        readonly predicate?: Predicate;
    }
    interface Declaration extends declareNode<{
        kind: "predicate";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        intersectionIsOpen: true;
        errorContext: ErrorContext;
    }> {
    }
    type Node = PredicateNode;
}
export declare class PredicateNode extends BaseConstraint<Predicate.Declaration> {
    serializedPredicate: RegisteredReference;
    compiledCondition: string;
    compiledNegation: string;
    impliedBasis: null;
    expression: string;
    traverseAllows: TraverseAllows;
    errorContext: Predicate.ErrorContext;
    compiledErrorContext: string;
    traverseApply: TraverseApply;
    compile(js: NodeCompiler): void;
    reduceJsonSchema(base: JsonSchema.Constrainable, ctx: ToJsonSchema.Context): JsonSchema;
}
export declare const Predicate: {
    implementation: nodeImplementationOf<Predicate.Declaration>;
    Node: typeof PredicateNode;
};
export type Predicate<data = any> = (data: data, ctx: Traversal) => boolean;
export declare namespace Predicate {
    type Casted<input = never, narrowed extends input = input> = (input: input, ctx: Traversal) => input is narrowed;
    type Castable<input = never, narrowed extends input = input> = Predicate<input> | Casted<input, narrowed>;
}
