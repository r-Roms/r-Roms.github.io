import { type Domain as _Domain } from "@ark/util";
import type { BaseErrorContext, BaseNormalizedSchema, declareNode } from "../shared/declare.ts";
import { type nodeImplementationOf } from "../shared/implement.ts";
import type { JsonSchema } from "../shared/jsonSchema.ts";
import type { ToJsonSchema } from "../shared/toJsonSchema.ts";
import type { TraverseAllows } from "../shared/traversal.ts";
import { InternalBasis } from "./basis.ts";
export type Domain = _Domain;
export declare namespace Domain {
    type Enumerable = "undefined" | "null" | "boolean";
    type NonEnumerable = Exclude<Domain, Enumerable>;
    interface Inner<domain extends NonEnumerable = NonEnumerable> {
        readonly domain: domain;
        readonly numberAllowsNaN?: boolean;
    }
    interface NormalizedSchema<domain extends NonEnumerable = NonEnumerable> extends BaseNormalizedSchema, Inner<domain> {
    }
    type Schema<domain extends NonEnumerable = NonEnumerable> = domain | NormalizedSchema<domain>;
    interface ErrorContext extends BaseErrorContext<"domain">, Inner {
    }
    interface Declaration extends declareNode<{
        kind: "domain";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        errorContext: ErrorContext;
    }> {
    }
    type Node = DomainNode;
}
export declare class DomainNode extends InternalBasis<Domain.Declaration> {
    private readonly requiresNaNCheck;
    readonly traverseAllows: TraverseAllows;
    readonly compiledCondition: string;
    readonly compiledNegation: string;
    readonly expression: string;
    get nestableExpression(): string;
    get defaultShortDescription(): string;
    protected innerToJsonSchema(ctx: ToJsonSchema.Context): JsonSchema.Constrainable;
}
export declare const Domain: {
    implementation: nodeImplementationOf<Domain.Declaration>;
    Node: typeof DomainNode;
    writeBadAllowNanMessage: (actual: Exclude<Domain.NonEnumerable, "number">) => string;
};
