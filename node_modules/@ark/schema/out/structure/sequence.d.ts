import { type array, type satisfy } from "@ark/util";
import { BaseConstraint } from "../constraint.ts";
import type { RootSchema } from "../kinds.ts";
import { type BaseNode, type DeepNodeTransformContext, type DeepNodeTransformation, type FlatRef } from "../node.ts";
import type { ExactLengthNode } from "../refinements/exactLength.ts";
import type { MaxLengthNode } from "../refinements/maxLength.ts";
import type { MinLengthNode } from "../refinements/minLength.ts";
import type { Morph } from "../roots/morph.ts";
import type { BaseRoot } from "../roots/root.ts";
import type { NodeCompiler } from "../shared/compile.ts";
import type { BaseNormalizedSchema, declareNode } from "../shared/declare.ts";
import { type RootKind, type nodeImplementationOf } from "../shared/implement.ts";
import type { JsonSchema } from "../shared/jsonSchema.ts";
import type { ToJsonSchema } from "../shared/toJsonSchema.ts";
import { type TraverseAllows, type TraverseApply } from "../shared/traversal.ts";
export declare namespace Sequence {
    interface NormalizedSchema extends BaseNormalizedSchema {
        readonly prefix?: array<RootSchema>;
        readonly defaultables?: array<DefaultableSchema>;
        readonly optionals?: array<RootSchema>;
        readonly variadic?: RootSchema;
        readonly minVariadicLength?: number;
        readonly postfix?: array<RootSchema>;
    }
    type Schema = NormalizedSchema | RootSchema;
    type DefaultableSchema = [schema: RootSchema, defaultValue: unknown];
    type DefaultableElement = [node: BaseRoot, defaultValue: unknown];
    interface Inner {
        readonly prefix?: array<BaseRoot>;
        readonly defaultables?: array<DefaultableElement>;
        readonly optionals?: array<BaseRoot>;
        readonly variadic?: BaseRoot;
        readonly minVariadicLength?: number;
        readonly postfix?: array<BaseRoot>;
    }
    interface Declaration extends declareNode<{
        kind: "sequence";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        prerequisite: array;
        reducibleTo: "sequence";
        childKind: RootKind;
    }> {
    }
    type Node = SequenceNode;
}
export declare class SequenceNode extends BaseConstraint<Sequence.Declaration> {
    impliedBasis: BaseRoot;
    tuple: SequenceTuple;
    prefixLength: number;
    defaultablesLength: number;
    optionalsLength: number;
    postfixLength: number;
    defaultablesAndOptionals: BaseRoot[];
    prevariadic: array<PrevariadicSequenceElement>;
    variadicOrPostfix: array<BaseRoot>;
    flatRefs: FlatRef[];
    protected addFlatRefs(): FlatRef[];
    isVariadicOnly: boolean;
    minVariadicLength: number;
    minLength: number;
    minLengthNode: MinLengthNode | null;
    maxLength: number | null;
    maxLengthNode: MaxLengthNode | ExactLengthNode | null;
    impliedSiblings: array<MaxLengthNode | MinLengthNode | ExactLengthNode>;
    defaultValueMorphs: Morph[];
    defaultValueMorphsReference: `$ark.${string}` | `$ark0.${string}` | `$ark${`2${string}` & `${bigint}`}.${string}` | `$ark${`1${string}` & `${bigint}`}.${string}` | `$ark${`3${string}` & `${bigint}`}.${string}` | `$ark${`4${string}` & `${bigint}`}.${string}` | `$ark${`5${string}` & `${bigint}`}.${string}` | `$ark${`6${string}` & `${bigint}`}.${string}` | `$ark${`7${string}` & `${bigint}`}.${string}` | `$ark${`8${string}` & `${bigint}`}.${string}` | `$ark${`9${string}` & `${bigint}`}.${string}` | undefined;
    protected elementAtIndex(data: array, index: number): SequenceElement;
    traverseAllows: TraverseAllows<array>;
    traverseApply: TraverseApply<array>;
    get element(): BaseRoot;
    compile(js: NodeCompiler): void;
    protected _transform(mapper: DeepNodeTransformation, ctx: DeepNodeTransformContext): BaseNode | null;
    expression: string;
    reduceJsonSchema(schema: JsonSchema.Array, ctx: ToJsonSchema.Context): JsonSchema.Array;
}
export declare const Sequence: {
    implementation: nodeImplementationOf<Sequence.Declaration>;
    Node: typeof SequenceNode;
};
export declare const postfixAfterOptionalOrDefaultableMessage = "A postfix required element cannot follow an optional or defaultable element";
export type postfixAfterOptionalOrDefaultableMessage = typeof postfixAfterOptionalOrDefaultableMessage;
export declare const postfixWithoutVariadicMessage = "A postfix element requires a variadic element";
export type postfixWithoutVariadicMessage = typeof postfixWithoutVariadicMessage;
export type SequenceElement = PrevariadicSequenceElement | VariadicSequenceElement | PostfixSequenceElement;
export type SequenceElementKind = satisfy<keyof Sequence.Inner, SequenceElement["kind"]>;
export type PrevariadicSequenceElement = PrefixSequenceElement | DefaultableSequenceElement | OptionalSequenceElement;
export type PrefixSequenceElement = {
    kind: "prefix";
    node: BaseRoot;
};
export type OptionalSequenceElement = {
    kind: "optionals";
    node: BaseRoot;
};
export type PostfixSequenceElement = {
    kind: "postfix";
    node: BaseRoot;
};
export type VariadicSequenceElement = {
    kind: "variadic";
    node: BaseRoot;
};
export type DefaultableSequenceElement = {
    kind: "defaultables";
    node: BaseRoot;
    default: unknown;
};
export type SequenceTuple = array<SequenceElement>;
