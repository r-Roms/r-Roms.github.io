import type * as util from "@ark/util";
import { Hkt, type Key } from "@ark/util";
import type { Module, Submodule } from "../module.ts";
declare class MergeHkt extends Hkt<[base: object, props: object]> {
    body: util.merge<this[0], this[1]>;
    description: string;
}
declare const Merge: import("@ark/schema").GenericRoot<readonly [["base", object], ["props", object]], MergeHkt>;
export declare const arkBuiltins: arkBuiltins;
export type arkBuiltins = Module<arkBuiltins.$>;
export declare namespace arkBuiltins {
    type submodule = Submodule<$>;
    type $ = {
        Key: Key;
        Merge: typeof Merge.t;
    };
}
export {};
