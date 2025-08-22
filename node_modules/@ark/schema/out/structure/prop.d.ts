import { type Key } from "@ark/util";
import { BaseConstraint } from "../constraint.ts";
import type { nodeOfKind, RootSchema } from "../kinds.ts";
import { type BaseNode, type DeepNodeTransformation, type DeepNodeTransformContext, type FlatRef } from "../node.ts";
import type { BaseRoot } from "../roots/root.ts";
import { type NodeCompiler } from "../shared/compile.ts";
import type { BaseNormalizedSchema } from "../shared/declare.ts";
import { Disjoint } from "../shared/disjoint.ts";
import type { IntersectionContext, RootKind } from "../shared/implement.ts";
import { type TraverseAllows, type TraverseApply } from "../shared/traversal.ts";
import type { Optional } from "./optional.ts";
import type { Required } from "./required.ts";
export declare namespace Prop {
    type Kind = "required" | "optional";
    type Node = nodeOfKind<Kind>;
    interface Schema extends BaseNormalizedSchema {
        readonly key: Key;
        readonly value: RootSchema;
    }
    interface Inner {
        readonly key: Key;
        readonly value: BaseRoot;
    }
    interface Declaration<kind extends Kind = Kind> {
        kind: kind;
        prerequisite: object;
        intersectionIsOpen: true;
        childKind: RootKind;
    }
}
export declare const intersectProps: (l: nodeOfKind<Prop.Kind>, r: nodeOfKind<Prop.Kind>, ctx: IntersectionContext) => nodeOfKind<Prop.Kind> | Disjoint | null;
export declare abstract class BaseProp<kind extends Prop.Kind = Prop.Kind> extends BaseConstraint<kind extends "required" ? Required.Declaration : Optional.Declaration> {
    required: boolean;
    optional: boolean;
    impliedBasis: BaseRoot;
    serializedKey: string;
    compiledKey: string;
    flatRefs: FlatRef[];
    protected _transform(mapper: DeepNodeTransformation, ctx: DeepNodeTransformContext): BaseNode | null;
    hasDefault(): this is Optional.Node.withDefault;
    traverseAllows: TraverseAllows<object>;
    traverseApply: TraverseApply<object>;
    compile(js: NodeCompiler): void;
}
export declare const writeDefaultIntersectionMessage: (lValue: unknown, rValue: unknown) => string;
