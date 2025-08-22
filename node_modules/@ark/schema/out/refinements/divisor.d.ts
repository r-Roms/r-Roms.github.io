import { InternalPrimitiveConstraint, writeInvalidOperandMessage } from "../constraint.ts";
import type { BaseRoot } from "../roots/root.ts";
import type { BaseErrorContext, BaseNormalizedSchema, declareNode } from "../shared/declare.ts";
import { type nodeImplementationOf } from "../shared/implement.ts";
import type { JsonSchema } from "../shared/jsonSchema.ts";
import type { TraverseAllows } from "../shared/traversal.ts";
export declare namespace Divisor {
    interface Inner {
        readonly rule: number;
    }
    interface NormalizedSchema extends BaseNormalizedSchema {
        readonly rule: number;
    }
    type Schema = NormalizedSchema | number;
    interface ErrorContext extends BaseErrorContext<"divisor">, Inner {
    }
    interface Declaration extends declareNode<{
        kind: "divisor";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        prerequisite: number;
        errorContext: ErrorContext;
    }> {
    }
    type Node = DivisorNode;
}
export declare class DivisorNode extends InternalPrimitiveConstraint<Divisor.Declaration> {
    traverseAllows: TraverseAllows<number>;
    readonly compiledCondition: string;
    readonly compiledNegation: string;
    readonly impliedBasis: BaseRoot;
    readonly expression: string;
    reduceJsonSchema(schema: JsonSchema.Numeric): JsonSchema.Numeric;
}
export declare const Divisor: {
    implementation: nodeImplementationOf<Divisor.Declaration>;
    Node: typeof DivisorNode;
};
export declare const writeIndivisibleMessage: (t: BaseRoot) => string;
export type writeIndivisibleMessage<actual> = writeInvalidOperandMessage<"divisor", actual>;
export declare const writeNonIntegerDivisorMessage: <divisor extends number>(divisor: divisor) => writeNonIntegerDivisorMessage<divisor>;
export type writeNonIntegerDivisorMessage<divisor extends number> = `divisor must be an integer (was ${divisor})`;
