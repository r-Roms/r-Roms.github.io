import { DynamicBase, type anyOrNever } from "@ark/util";
import type { BaseRoot } from "./roots/root.ts";
import type { BaseScope, InternalResolution, InternalResolutions } from "./scope.ts";
import { arkKind } from "./shared/utils.ts";
export type PreparsedNodeResolution = {
    [arkKind]: "generic" | "module";
};
export declare class RootModule<exports extends {} = {}> extends DynamicBase<exports> {
    get [arkKind](): "module";
}
export interface InternalModule<exports extends InternalResolutions = InternalResolutions> extends RootModule<exports> {
    root?: BaseRoot;
}
export declare const bindModule: (module: InternalModule, $: BaseScope) => InternalModule;
type exportSchemaScope<$> = {
    [k in keyof $]: instantiateRoot<$[k]>;
};
export type instantiateRoot<t> = t extends InternalResolution ? [
    t
] extends [anyOrNever] ? BaseRoot : t : BaseRoot;
export declare const SchemaModule: new <$ = {}>(types: exportSchemaScope<$>) => SchemaModule<$>;
export interface SchemaModule<$ = {}> extends RootModule<exportSchemaScope<$>> {
}
export {};
