import type { arkKind, TypeMeta } from "@ark/schema";
import type { Ark } from "./keywords/keywords.ts";
import { type ArkSchemaConfig } from "@ark/schema/config";
import type { anyOrNever } from "@ark/util";
export type KeywordConfig = {
    [k in keyof Ark.flat as parseConfigurableFlatAlias<k, Ark.flat[k]>]?: TypeMeta.Collapsible;
};
type parseConfigurableFlatAlias<k extends string, v> = [
    v
] extends [anyOrNever] ? k : v extends {
    [arkKind]: "generic" | "module";
} ? never : k extends `${infer prefix}.root` ? prefix : k;
export interface ArkConfig extends ArkSchemaConfig {
    keywords?: KeywordConfig;
}
export declare const configure: <config extends ArkConfig>(config: config) => config;
declare global {
    export interface ArkEnv {
        $(): Ark;
    }
}
/**
 * This mirrors the global ArkEnv namespace as a local export. We use it instead
 * of the global internally due to a bug in twoslash that prevents `ark/docs`
 * from building if we refer to the global directly.
 *
 * If, in the future, docs can build while arktype refers to `ArkEnv.$` directly,
 * this can be removed.
 */
export declare namespace ArkAmbient {
    type $ = ReturnType<ArkEnv["$"]>;
    type meta = ArkEnv.meta;
    type prototypes = ArkEnv.prototypes;
}
export {};
