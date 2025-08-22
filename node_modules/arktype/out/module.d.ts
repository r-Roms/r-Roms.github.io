import { RootModule, type GenericAst, type PreparsedNodeResolution } from "@ark/schema";
import type { anyOrNever, inferred } from "@ark/util";
import type { Generic } from "./generic.ts";
import type { Type } from "./type.ts";
export declare const Module: new <$ extends {}>(exports: exportScope<$>) => Module<$>;
export interface Module<$ extends {} = {}> extends RootModule<exportScope<$>> {
}
export type exportScope<$> = bindExportsToScope<$, $>;
export declare const BoundModule: new <exports extends {}, $ extends {}>(exports: bindExportsToScope<exports, $>, $: $) => BoundModule<exports, $>;
export interface BoundModule<exports extends {}, $> extends RootModule<bindExportsToScope<exports, $>> {
}
export type bindExportsToScope<exports, $> = {
    [k in keyof exports]: instantiateExport<exports[k], $>;
} & unknown;
export type Submodule<exports extends {}> = RootModule<exports & ("root" extends keyof exports ? {
    [inferred]: exports["root"];
} : {})>;
export type instantiateExport<t, $> = [
    t
] extends [PreparsedNodeResolution] ? [
    t
] extends [anyOrNever] ? Type<t, $> : t extends GenericAst<infer params, infer body, infer body$> ? Generic<params, body, body$, $> : t extends Submodule<infer exports> ? BoundModule<exports, $> : never : Type<t, $>;
