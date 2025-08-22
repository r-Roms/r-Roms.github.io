import { type BuiltinObjectKind, type Constructor } from "@ark/util";
import type { BaseErrorContext, BaseNormalizedSchema, declareNode } from "../shared/declare.ts";
import { type nodeImplementationOf } from "../shared/implement.ts";
import type { JsonSchema } from "../shared/jsonSchema.ts";
import type { ToJsonSchema } from "../shared/toJsonSchema.ts";
import type { TraverseAllows } from "../shared/traversal.ts";
import { InternalBasis } from "./basis.ts";
export declare namespace Proto {
    type Reference = Constructor | BuiltinObjectKind;
    type Schema<proto extends Reference = Reference> = proto | ExpandedSchema<proto>;
    interface NormalizedSchema<proto extends Constructor = Constructor> extends BaseNormalizedSchema {
        readonly proto: proto;
        readonly dateAllowsInvalid?: boolean;
    }
    interface ExpandedSchema<proto extends Reference = Reference> {
        readonly proto: proto;
        readonly dateAllowsInvalid?: boolean;
    }
    interface Inner<proto extends Constructor = Constructor> {
        readonly proto: proto;
        readonly dateAllowsInvalid?: boolean;
    }
    interface ErrorContext extends BaseErrorContext<"proto">, Inner {
    }
    interface Declaration extends declareNode<{
        kind: "proto";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        errorContext: ErrorContext;
    }> {
    }
    type Node = ProtoNode;
}
export declare class ProtoNode extends InternalBasis<Proto.Declaration> {
    builtinName: BuiltinObjectKind | null;
    serializedConstructor: string;
    private readonly requiresInvalidDateCheck;
    traverseAllows: TraverseAllows;
    compiledCondition: string;
    compiledNegation: string;
    protected innerToJsonSchema(ctx: ToJsonSchema.Context): JsonSchema;
    expression: string;
    get nestableExpression(): string;
    readonly domain = "object";
    get defaultShortDescription(): string;
}
export declare const Proto: {
    implementation: nodeImplementationOf<Proto.Declaration>;
    Node: typeof ProtoNode;
    writeBadInvalidDateMessage: (actual: Constructor) => string;
    writeInvalidSchemaMessage: (actual: unknown) => string;
};
