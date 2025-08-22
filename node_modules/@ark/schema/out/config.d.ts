import type { ArkRegistry, requireKeys, show } from "@ark/util";
import type { intrinsic } from "./intrinsic.ts";
import type { nodesByRegisteredId } from "./parse.ts";
import type { TypeMeta } from "./shared/declare.ts";
import type { ActualConfig, ArkErrorCode, ArkErrors, ExpectedConfig, MessageConfig, ProblemConfig } from "./shared/errors.ts";
import { type DescriptionWriter, type NodeKind } from "./shared/implement.ts";
import { ToJsonSchema } from "./shared/toJsonSchema.ts";
import type { UndeclaredKeyBehavior } from "./structure/structure.ts";
export interface ArkSchemaRegistry extends ArkRegistry {
    intrinsic: typeof intrinsic;
    config: ArkSchemaConfig;
    defaultConfig: ResolvedConfig;
    resolvedConfig: ResolvedConfig;
    nodesByRegisteredId: typeof nodesByRegisteredId;
}
type nodeConfigForKind<kind extends NodeKind> = Readonly<show<{
    description?: DescriptionWriter<kind>;
} & (kind extends ArkErrorCode ? {
    expected?: ExpectedConfig<kind>;
    actual?: ActualConfig<kind>;
    problem?: ProblemConfig<kind>;
    message?: MessageConfig<kind>;
} : {})>>;
type NodeConfigsByKind = {
    [kind in NodeKind]: nodeConfigForKind<kind>;
};
export type NodeConfig<kind extends NodeKind = NodeKind> = NodeConfigsByKind[kind];
export interface UnknownErrorConfigs {
    expected?: ExpectedConfig;
    actual?: ActualConfig;
    problem?: ProblemConfig;
    message?: MessageConfig;
}
interface UnknownNodeConfig extends UnknownErrorConfigs {
    description?: DescriptionWriter;
}
export type ResolvedUnknownNodeConfig = requireKeys<UnknownNodeConfig, "description">;
export declare const configureSchema: (config: ArkSchemaConfig) => ArkSchemaConfig;
export declare const mergeConfigs: <base extends ArkSchemaConfig>(base: base, merged: ArkSchemaConfig | undefined) => base;
type MergeToJsonSchemaConfigs = <base extends ToJsonSchema.Options | undefined>(baseConfig: base, mergedConfig: ToJsonSchema.Options | undefined) => base extends ToJsonSchema.Context ? ToJsonSchema.Context : ToJsonSchema.Options;
export declare const mergeToJsonSchemaConfigs: MergeToJsonSchemaConfigs;
export type CloneImplementation = <original extends object>(original: original) => original;
export interface ArkSchemaConfig extends Partial<Readonly<NodeConfigsByKind>> {
    readonly jitless?: boolean;
    readonly clone?: boolean | CloneImplementation;
    readonly onUndeclaredKey?: UndeclaredKeyBehavior;
    readonly numberAllowsNaN?: boolean;
    readonly dateAllowsInvalid?: boolean;
    readonly exactOptionalPropertyTypes?: boolean;
    readonly onFail?: ArkErrors.Handler | null;
    readonly keywords?: Record<string, TypeMeta.Collapsible | undefined>;
    readonly toJsonSchema?: ToJsonSchema.Options;
}
export type resolveConfig<config extends ArkSchemaConfig> = show<{
    [k in keyof ArkSchemaConfig]-?: k extends NodeKind ? Required<config[k]> : k extends "clone" ? CloneImplementation | false : k extends "keywords" ? Record<string, TypeMeta | undefined> : k extends "toJsonSchema" ? ToJsonSchema.Context : config[k];
} & Omit<config, keyof ArkSchemaConfig>>;
export type ResolvedConfig = resolveConfig<ArkSchemaConfig>;
export {};
