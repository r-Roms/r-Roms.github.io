import { type EcmascriptObjects, type PlatformObjects } from "@ark/util";
import type { Module, Submodule } from "../module.ts";
import { arkArray } from "./Array.ts";
import { arkFormData } from "./FormData.ts";
import { TypedArray } from "./TypedArray.ts";
declare const omittedPrototypes: {
    Boolean: 1;
    Number: 1;
    String: 1;
};
export declare const arkPrototypes: arkPrototypes.module;
export declare namespace arkPrototypes {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    interface keywords extends ecmascript, platform {
    }
    interface $ extends Omit<keywords, keyof wrapped>, wrapped {
    }
    interface wrapped {
        Array: arkArray.submodule;
        TypedArray: TypedArray.submodule;
        FormData: arkFormData.submodule;
    }
    type ecmascript = Omit<EcmascriptObjects, keyof typeof omittedPrototypes>;
    type platform = PlatformObjects;
    interface instances extends ecmascript, platform {
    }
    type NonDegenerateName = keyof instances extends infer k ? k extends keyof instances ? {} extends instances[k] ? never : k : never : never;
    type instanceOf<name extends NonDegenerateName = NonDegenerateName> = instances[name];
}
export {};
