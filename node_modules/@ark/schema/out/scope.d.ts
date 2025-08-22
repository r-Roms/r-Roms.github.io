import { ParseError, type JsonStructure, type anyOrNever, type array, type conform, type flattenListable, type intersectUnion, type listable, type noSuggest, type satisfy, type show } from "@ark/util";
import { type ArkSchemaConfig, type ResolvedConfig } from "./config.ts";
import { GenericRoot, type GenericRootParser } from "./generic.ts";
import { type NodeSchema, type RootSchema, type nodeOfKind, type reducibleKindOf } from "./kinds.ts";
import { RootModule, type InternalModule, type PreparsedNodeResolution, type SchemaModule, type instantiateRoot } from "./module.ts";
import type { BaseNode } from "./node.ts";
import { type AttachedParseContext, type BaseParseContext, type BaseParseContextInput, type BaseParseOptions, type NodeId, type NodeParseContext, type NodeParseContextInput } from "./parse.ts";
import { Alias } from "./roots/alias.ts";
import type { BaseRoot } from "./roots/root.ts";
import type { NodeKind, RootKind } from "./shared/implement.ts";
import { $ark } from "./shared/registry.ts";
import { Traversal, type TraverseAllows, type TraverseApply } from "./shared/traversal.ts";
import { arkKind } from "./shared/utils.ts";
export type InternalResolutions = Record<string, InternalResolution | undefined>;
export type exportedNameOf<$> = Exclude<keyof $ & string, PrivateDeclaration>;
export type resolvableReferenceIn<$> = {
    [k in keyof $]: k extends string ? k extends PrivateDeclaration<infer alias> ? alias : k extends noSuggest | "root" ? never : k : never;
}[keyof $];
export type resolveReference<reference extends resolvableReferenceIn<$>, $> = reference extends keyof $ ? $[reference] : $[`#${reference}` & keyof $];
export type flatResolutionsOf<$> = show<intersectUnion<resolvableReferenceIn<$> extends infer k ? k extends keyof $ & string ? resolutionsOfReference<k, $[k]> : unknown : unknown>>;
type resolutionsOfReference<k extends string, v> = [
    v
] extends [{
    [arkKind]: "module";
}] ? [
    v
] extends [anyOrNever] ? {
    [_ in k]: v;
} : prefixKeys<flatResolutionsOf<v>, k> & {
    [innerKey in keyof v as innerKey extends "root" ? k : never]: v[innerKey];
} : {
    [_ in k]: v;
};
type prefixKeys<o, prefix extends string> = {
    [k in keyof o & string as `${prefix}.${k}`]: o[k];
} & unknown;
export type PrivateDeclaration<key extends string = string> = `#${key}`;
export type InternalResolution = BaseRoot | GenericRoot | InternalModule;
export type toInternalScope<$> = BaseScope<{
    [k in keyof $]: $[k] extends {
        [arkKind]: infer kind;
    } ? [
        $[k]
    ] extends [anyOrNever] ? BaseRoot : kind extends "generic" ? GenericRoot : kind extends "module" ? InternalModule : never : BaseRoot;
}>;
type CachedResolution = NodeId | BaseRoot | GenericRoot;
export declare const writeDuplicateAliasError: <alias extends string>(alias: alias) => writeDuplicateAliasError<alias>;
export type writeDuplicateAliasError<alias extends string> = `#${alias} duplicates public alias ${alias}`;
export type AliasDefEntry = [name: string, defValue: unknown];
export type GlobalOnlyConfigOptionName = satisfy<keyof ArkSchemaConfig, "dateAllowsInvalid" | "numberAllowsNaN" | "onUndeclaredKey" | "keywords">;
export interface ScopeOnlyConfigOptions {
    name?: string;
    prereducedAliases?: boolean;
}
export interface ArkSchemaScopeConfig extends Omit<ArkSchemaConfig, GlobalOnlyConfigOptionName>, ScopeOnlyConfigOptions {
}
export interface ResolvedScopeConfig extends ResolvedConfig, ScopeOnlyConfigOptions {
}
export type PrecompiledReferences = {
    [k: `${string}Allows`]: TraverseAllows;
    [k: `${string}Apply`]: TraverseApply;
    [k: `${string}Optimistic`]: (data: unknown) => unknown;
};
export declare abstract class BaseScope<$ extends {} = {}> {
    readonly config: ArkSchemaScopeConfig;
    readonly resolvedConfig: ResolvedScopeConfig;
    readonly name: string;
    get [arkKind](): "scope";
    readonly referencesById: {
        [id: string]: BaseNode;
    };
    references: readonly BaseNode[];
    readonly resolutions: {
        [alias: string]: CachedResolution | undefined;
    };
    exportedNames: string[];
    readonly aliases: Record<string, unknown>;
    protected resolved: boolean;
    readonly nodesByHash: Record<string, BaseNode>;
    readonly intrinsic: Omit<typeof $ark.intrinsic, `json${string}`>;
    constructor(
    /** The set of names defined at the root-level of the scope mapped to their
     * corresponding definitions.**/
    def: Record<string, unknown>, config?: ArkSchemaScopeConfig);
    protected cacheGetter<name extends keyof this>(name: name, value: this[name]): this[name];
    get internal(): this;
    private _json;
    get json(): JsonStructure;
    defineSchema<def extends RootSchema>(def: def): def;
    generic: GenericRootParser;
    units: (values: array, opts?: BaseParseOptions) => BaseRoot;
    protected lazyResolutions: Alias.Node[];
    lazilyResolve(resolve: () => BaseRoot, syntheticAlias?: string): Alias.Node;
    schema: InternalSchemaParser;
    parseSchema: InternalSchemaParser;
    protected preparseNode(kinds: NodeKind | listable<RootKind>, schema: unknown, opts: BaseParseOptions): BaseNode | NodeParseContextInput;
    bindReference<reference extends BaseNode | GenericRoot>(reference: reference): reference;
    resolveRoot(name: string): BaseRoot;
    maybeResolveRoot(name: string): BaseRoot | undefined;
    /** If name is a valid reference to a submodule alias, return its resolution  */
    protected maybeResolveSubalias(name: string): BaseRoot | GenericRoot | undefined;
    get ambient(): InternalModule;
    maybeResolve(name: string): Exclude<CachedResolution, string> | undefined;
    protected createParseContext<input extends BaseParseContextInput>(input: input): input & AttachedParseContext;
    traversal(root: unknown): Traversal;
    import(): SchemaModule<{
        [k in exportedNameOf<$> as PrivateDeclaration<k>]: $[k];
    }>;
    import<names extends exportedNameOf<$>[]>(...names: names): SchemaModule<{
        [k in names[number] as PrivateDeclaration<k>]: $[k];
    } & unknown>;
    precompilation: string | undefined;
    private _exportedResolutions;
    private _exports;
    export(): SchemaModule<{
        [k in exportedNameOf<$>]: $[k];
    }>;
    export<names extends exportedNameOf<$>[]>(...names: names): SchemaModule<{
        [k in names[number]]: $[k];
    } & unknown>;
    resolve<name extends exportedNameOf<$>>(name: name): instantiateRoot<$[name]>;
    node: <kinds extends NodeKind | array<RootKind>, prereduced extends boolean = false>(kinds: kinds, nodeSchema: NodeSchema<flattenListable<kinds>>, opts?: BaseParseOptions<prereduced>) => nodeOfKind<prereduced extends true ? flattenListable<kinds> : reducibleKindOf<flattenListable<kinds>>>;
    parse: (def: unknown, opts?: BaseParseOptions) => BaseRoot;
    parseDefinition(def: unknown, opts?: BaseParseOptions): BaseRoot;
    finalize<node extends BaseRoot>(node: node): node;
    protected abstract preparseOwnDefinitionFormat(def: unknown, opts: BaseParseOptions): BaseRoot | BaseParseContextInput;
    abstract parseOwnDefinitionFormat(def: unknown, ctx: BaseParseContext): BaseRoot;
    protected abstract preparseOwnAliasEntry(k: string, v: unknown): AliasDefEntry;
    protected abstract normalizeRootScopeValue(resolution: unknown): unknown;
}
export declare class SchemaScope<$ extends {} = {}> extends BaseScope<$> {
    parseOwnDefinitionFormat(def: unknown, ctx: NodeParseContext): BaseRoot;
    protected preparseOwnDefinitionFormat(schema: RootSchema, opts: BaseParseOptions): BaseRoot | NodeParseContextInput;
    protected preparseOwnAliasEntry(k: string, v: unknown): AliasDefEntry;
    protected normalizeRootScopeValue(v: unknown): unknown;
}
type instantiateAliases<aliases> = {
    [k in keyof aliases]: aliases[k] extends InternalResolution ? aliases[k] : BaseRoot;
} & unknown;
export type SchemaScopeParser = <const aliases>(aliases: {
    [k in keyof aliases]: conform<aliases[k], RootSchema | PreparsedNodeResolution>;
}, config?: ArkSchemaScopeConfig) => BaseScope<instantiateAliases<aliases>>;
export declare const schemaScope: SchemaScopeParser;
export type InternalSchemaParser = (schema: RootSchema, opts?: BaseParseOptions) => BaseRoot;
export declare const rootSchemaScope: SchemaScope;
export declare const parseAsSchema: (def: unknown, opts?: BaseParseOptions) => BaseRoot | ParseError;
export type RootExportCache = Record<string, BaseRoot | GenericRoot | RootModule | undefined>;
export declare const writeUnresolvableMessage: <token extends string>(token: token) => writeUnresolvableMessage<token>;
export type writeUnresolvableMessage<token extends string> = `'${token}' is unresolvable`;
export declare const writeNonSubmoduleDotMessage: <name extends string>(name: name) => writeNonSubmoduleDotMessage<name>;
export type writeNonSubmoduleDotMessage<name extends string> = `'${name}' must reference a module to be accessed using dot syntax`;
export declare const writeMissingSubmoduleAccessMessage: <name extends string>(name: name) => writeMissingSubmoduleAccessMessage<name>;
export type writeMissingSubmoduleAccessMessage<name extends string> = `Reference to submodule '${name}' must specify an alias`;
export declare const rootSchema: BaseScope["schema"];
export declare const node: BaseScope["node"];
export declare const defineSchema: BaseScope["defineSchema"];
export declare const genericNode: BaseScope["generic"];
export {};
