import { type Brand, type dict } from "@ark/util";
import { type NormalizedSchema } from "./kinds.ts";
import type { BaseNode } from "./node.ts";
import type { BaseRoot } from "./roots/root.ts";
import type { BaseScope } from "./scope.ts";
import type { NodeMeta } from "./shared/declare.ts";
import { type NodeKind, type RootKind } from "./shared/implement.ts";
import { type arkKind } from "./shared/utils.ts";
export type ContextualArgs = Record<string, BaseRoot | NodeId>;
export type BaseParseOptions<prereduced extends boolean = boolean> = {
    alias?: string;
    prereduced?: prereduced;
    args?: ContextualArgs;
    id?: NodeId;
};
export interface BaseParseContextInput extends BaseParseOptions {
    prefix: string;
    def: unknown;
}
export interface AttachedParseContext {
    [arkKind]: "context";
    $: BaseScope;
    id: NodeId;
    phase: "unresolved" | "resolving" | "resolved";
}
export interface BaseParseContext extends BaseParseContextInput, AttachedParseContext {
    id: NodeId;
}
export interface NodeParseContextInput<kind extends NodeKind = NodeKind> extends BaseParseContextInput {
    kind: kind;
    def: NormalizedSchema<kind>;
}
export interface NodeParseContext<kind extends NodeKind = NodeKind> extends NodeParseContextInput<kind>, AttachedParseContext {
    id: NodeId;
}
export declare const schemaKindOf: <kind extends RootKind = RootKind>(schema: unknown, allowedKinds?: readonly kind[]) => kind;
export declare const writeInvalidSchemaMessage: (schema: unknown) => string;
export type NodeId = Brand<string, "NodeId">;
export type NodeResolver = (id: NodeId) => BaseNode;
export declare const nodesByRegisteredId: Record<NodeId, BaseNode | BaseParseContext | undefined>;
export declare const registerNodeId: (prefix: string) => NodeId;
export declare const parseNode: (ctx: NodeParseContext) => BaseNode;
export type CreateNodeInput = {
    id: NodeId;
    kind: NodeKind;
    inner: dict;
    meta: NodeMeta;
    $: BaseScope;
    ignoreCache?: true;
};
export declare const createNode: ({ id, kind, inner, meta, $, ignoreCache }: CreateNodeInput) => BaseNode;
export declare const withId: <node extends BaseNode>(node: node, id: NodeId) => node;
export declare const withMeta: <node extends BaseNode>(node: node, meta: ArkEnv.meta, id?: NodeId) => node;
