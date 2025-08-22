import { type JsonStructure, type SerializedPrimitive, type array, type show } from "@ark/util";
import type { NodeSchema, RootSchema, nodeOfKind } from "../kinds.ts";
import type { BaseNode } from "../node.ts";
import { type NodeCompiler } from "../shared/compile.ts";
import type { BaseErrorContext, BaseNormalizedSchema, declareNode } from "../shared/declare.ts";
import { Disjoint } from "../shared/disjoint.ts";
import type { ArkError } from "../shared/errors.ts";
import { type IntersectionContext, type RootKind, type UnionChildKind, type nodeImplementationOf } from "../shared/implement.ts";
import type { JsonSchema } from "../shared/jsonSchema.ts";
import { type RegisteredReference } from "../shared/registry.ts";
import type { ToJsonSchema } from "../shared/toJsonSchema.ts";
import { type TraverseAllows, type TraverseApply } from "../shared/traversal.ts";
import type { Domain } from "./domain.ts";
import type { Morph } from "./morph.ts";
import { BaseRoot } from "./root.ts";
export declare namespace Union {
    type ChildKind = UnionChildKind;
    type ChildSchema = NodeSchema<ChildKind>;
    type ChildNode = nodeOfKind<ChildKind>;
    type Schema = NormalizedSchema | readonly RootSchema[];
    interface NormalizedSchema extends BaseNormalizedSchema {
        readonly branches: array<RootSchema>;
        readonly ordered?: true;
    }
    interface Inner {
        readonly branches: readonly ChildNode[];
        readonly ordered?: true;
    }
    interface ErrorContext extends BaseErrorContext<"union"> {
        errors: readonly ArkError[];
    }
    interface Declaration extends declareNode<{
        kind: "union";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        errorContext: ErrorContext;
        reducibleTo: RootKind;
        childKind: UnionChildKind;
    }> {
    }
    type Node = UnionNode;
}
export declare class UnionNode extends BaseRoot<Union.Declaration> {
    isBoolean: boolean;
    get branchGroups(): BaseRoot[];
    unitBranches: (import("./morph.ts").MorphNode | import("./unit.ts").UnitNode)[];
    discriminant: Discriminant<DiscriminantKind> | null;
    discriminantJson: JsonStructure | null;
    expression: string;
    createBranchedOptimisticRootApply(): BaseNode["rootApply"];
    get shallowMorphs(): array<Morph>;
    get defaultShortDescription(): string;
    protected innerToJsonSchema(ctx: ToJsonSchema.Context): JsonSchema;
    traverseAllows: TraverseAllows;
    traverseApply: TraverseApply;
    traverseOptimistic: (data: unknown) => unknown;
    compile(js: NodeCompiler): void;
    private compileIndiscriminable;
    get nestableExpression(): string;
    discriminate(): Discriminant | null;
}
export declare const Union: {
    implementation: nodeImplementationOf<Union.Declaration>;
    Node: typeof UnionNode;
};
type DescribeBranchesOptions = {
    delimiter?: string;
    finalDelimiter?: string;
};
export declare const describeBranches: (descriptions: string[], opts?: DescribeBranchesOptions) => string;
export declare const intersectBranches: (l: readonly Union.ChildNode[], r: readonly Union.ChildNode[], ctx: IntersectionContext) => readonly Union.ChildNode[] | Disjoint;
export declare const reduceBranches: ({ branches, ordered }: Union.Inner) => readonly Union.ChildNode[];
export type CaseKey<kind extends DiscriminantKind = DiscriminantKind> = DiscriminantKind extends kind ? string : DiscriminantKinds[kind] | "default";
type DiscriminantLocation<kind extends DiscriminantKind = DiscriminantKind> = {
    path: PropertyKey[];
    optionallyChainedPropString: string;
    kind: kind;
};
export interface Discriminant<kind extends DiscriminantKind = DiscriminantKind> extends DiscriminantLocation<kind> {
    cases: DiscriminatedCases<kind>;
}
export type CaseContext = {
    branchIndices: number[];
    condition: nodeOfKind<DiscriminantKind> | Domain.Enumerable;
};
export type CaseDiscriminant = nodeOfKind<DiscriminantKind> | Domain.Enumerable;
export type DiscriminatedCases<kind extends DiscriminantKind = DiscriminantKind> = {
    [caseKey in CaseKey<kind>]: BaseRoot | true;
};
export type DiscriminantKinds = {
    domain: Domain;
    unit: SerializedPrimitive | RegisteredReference;
};
export type DiscriminantKind = show<keyof DiscriminantKinds>;
export declare const pruneDiscriminant: (discriminantBranch: BaseRoot, discriminantCtx: DiscriminantLocation) => BaseRoot | null;
export declare const writeIndiscriminableMorphMessage: (lDescription: string, rDescription: string) => string;
export declare const writeOrderedIntersectionMessage: (lDescription: string, rDescription: string) => string;
export {};
