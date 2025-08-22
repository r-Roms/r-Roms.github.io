import { Hkt, type Json, type Key, type omit, type pick, type show } from "@ark/util";
import type { To } from "../attributes.ts";
import type { Module, Submodule } from "../module.ts";
export declare const arkTsKeywords: arkTsKeywords;
export type arkTsKeywords = Module<arkTsKeywords.$>;
export declare namespace arkTsKeywords {
    type submodule = Submodule<$>;
    type $ = {
        bigint: bigint;
        boolean: boolean;
        false: false;
        never: never;
        null: null;
        number: number;
        object: object;
        string: string;
        symbol: symbol;
        true: true;
        unknown: unknown;
        undefined: undefined;
    };
}
export declare const unknown: Module<{
    root: unknown;
    any: unknown;
}>;
export declare namespace unknown {
    type submodule = Submodule<$>;
    type $ = {
        root: unknown;
        any: any;
    };
}
export declare const json: Module<{
    root: unknown;
    stringify: unknown;
}>;
export declare namespace json {
    type submodule = Submodule<$>;
    type $ = {
        root: Json;
        stringify: (In: Json) => To<string>;
    };
}
export declare const object: Module<{
    root: unknown;
    json: Submodule<{
        root: unknown;
        stringify: unknown;
    }>;
}>;
export declare namespace object {
    type submodule = Submodule<$>;
    type $ = {
        root: object;
        json: json.submodule;
    };
}
declare class RecordHkt extends Hkt<[Key, unknown]> {
    body: Record<this[0], this[1]>;
    description: string;
}
declare const Record: import("@ark/schema").GenericRoot<readonly [["K", Key], ["V", unknown]], RecordHkt>;
declare class PickHkt extends Hkt<[object, Key]> {
    body: pick<this[0], this[1] & keyof this[0]>;
    description: string;
}
declare const Pick: import("@ark/schema").GenericRoot<readonly [["T", object], ["K", Key]], PickHkt>;
declare class OmitHkt extends Hkt<[object, Key]> {
    body: omit<this[0], this[1] & keyof this[0]>;
    description: string;
}
declare const Omit: import("@ark/schema").GenericRoot<readonly [["T", object], ["K", Key]], OmitHkt>;
declare class PartialHkt extends Hkt<[object]> {
    body: show<Partial<this[0]>>;
    description: string;
}
declare const Partial: import("@ark/schema").GenericRoot<readonly [["T", object]], PartialHkt>;
declare class RequiredHkt extends Hkt<[object]> {
    body: show<Required<this[0]>>;
    description: string;
}
declare const Required: import("@ark/schema").GenericRoot<readonly [["T", object]], RequiredHkt>;
declare class ExcludeHkt extends Hkt<[unknown, unknown]> {
    body: Exclude<this[0], this[1]>;
    description: string;
}
declare const Exclude: import("@ark/schema").GenericRoot<readonly [["T", unknown], ["U", unknown]], ExcludeHkt>;
declare class ExtractHkt extends Hkt<[unknown, unknown]> {
    body: Extract<this[0], this[1]>;
    description: string;
}
declare const Extract: import("@ark/schema").GenericRoot<readonly [["T", unknown], ["U", unknown]], ExtractHkt>;
export declare const arkTsGenerics: arkTsGenerics.module;
export declare namespace arkTsGenerics {
    type module = Module<arkTsGenerics.$>;
    type submodule = Submodule<$>;
    type $ = {
        Exclude: typeof Exclude.t;
        Extract: typeof Extract.t;
        Omit: typeof Omit.t;
        Partial: typeof Partial.t;
        Pick: typeof Pick.t;
        Record: typeof Record.t;
        Required: typeof Required.t;
    };
}
export {};
