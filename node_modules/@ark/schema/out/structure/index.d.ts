import { BaseConstraint } from "../constraint.ts";
import type { RootSchema, nodeOfKind } from "../kinds.ts";
import { type BaseNode, type DeepNodeTransformContext, type DeepNodeTransformation } from "../node.ts";
import type { BaseRoot } from "../roots/root.ts";
import type { BaseNormalizedSchema, declareNode } from "../shared/declare.ts";
import { type RootKind, type nodeImplementationOf } from "../shared/implement.ts";
import { type TraverseAllows, type TraverseApply } from "../shared/traversal.ts";
export declare namespace Index {
    type KeyKind = Exclude<RootKind, "unit">;
    type KeyNode = nodeOfKind<KeyKind>;
    interface Schema extends BaseNormalizedSchema {
        readonly signature: RootSchema<KeyKind>;
        readonly value: RootSchema;
    }
    interface Inner {
        readonly signature: KeyNode;
        readonly value: BaseRoot;
    }
    interface Declaration extends declareNode<{
        kind: "index";
        schema: Schema;
        normalizedSchema: Schema;
        inner: Inner;
        prerequisite: object;
        intersectionIsOpen: true;
        childKind: RootKind;
    }> {
    }
    type Node = IndexNode;
}
export declare class IndexNode extends BaseConstraint<Index.Declaration> {
    impliedBasis: BaseRoot;
    expression: string;
    flatRefs: import("../node.ts").FlatRef<BaseRoot<import("../roots/root.ts").InternalRootDeclaration>>[];
    traverseAllows: TraverseAllows<object>;
    traverseApply: TraverseApply<object>;
    protected _transform(mapper: DeepNodeTransformation, ctx: DeepNodeTransformContext): BaseNode | null;
    compile(): void;
}
export declare const Index: {
    implementation: nodeImplementationOf<Index.Declaration>;
    Node: typeof IndexNode;
};
export declare const writeEnumerableIndexBranches: (keys: string[]) => string;
export declare const writeInvalidPropertyKeyMessage: <indexSchema extends string>(indexSchema: indexSchema) => writeInvalidPropertyKeyMessage<indexSchema>;
export type writeInvalidPropertyKeyMessage<indexSchema extends string> = `Indexed key definition '${indexSchema}' must be a string or symbol`;
