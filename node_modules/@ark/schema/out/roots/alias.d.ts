import { type NodeId } from "../parse.ts";
import type { NodeCompiler } from "../shared/compile.ts";
import type { BaseNormalizedSchema, declareNode } from "../shared/declare.ts";
import { type nodeImplementationOf } from "../shared/implement.ts";
import type { JsonSchema } from "../shared/jsonSchema.ts";
import type { ToJsonSchema } from "../shared/toJsonSchema.ts";
import type { TraverseAllows, TraverseApply } from "../shared/traversal.ts";
import { BaseRoot } from "./root.ts";
export declare namespace Alias {
    type Schema<alias extends string = string> = `$${alias}` | NormalizedSchema<alias>;
    interface NormalizedSchema<alias extends string = string> extends BaseNormalizedSchema {
        readonly reference: alias;
        readonly resolve?: () => BaseRoot;
    }
    interface Inner<alias extends string = string> {
        readonly reference: alias;
        readonly resolve?: () => BaseRoot;
    }
    interface Declaration extends declareNode<{
        kind: "alias";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
    }> {
    }
    type Node = AliasNode;
}
export declare const normalizeAliasSchema: (schema: Alias.Schema) => Alias.Inner;
export declare class AliasNode extends BaseRoot<Alias.Declaration> {
    readonly expression: string;
    readonly structure: undefined;
    get resolution(): BaseRoot;
    protected _resolve(): BaseRoot;
    get resolutionId(): NodeId;
    get defaultShortDescription(): string;
    protected innerToJsonSchema(ctx: ToJsonSchema.Context): JsonSchema;
    traverseAllows: TraverseAllows;
    traverseApply: TraverseApply;
    compile(js: NodeCompiler): void;
}
export declare const writeShallowCycleErrorMessage: (name: string, seen: string[]) => string;
export declare const Alias: {
    implementation: nodeImplementationOf<Alias.Declaration>;
    Node: typeof AliasNode;
};
