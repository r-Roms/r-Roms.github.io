import type { Module, Submodule } from "../module.ts";
export declare const TypedArray: TypedArray.module;
export declare namespace TypedArray {
    type module = Module<TypedArray.$>;
    type submodule = Submodule<$>;
    type $ = {
        Int8: Int8Array;
        Uint8: Uint8Array;
        Uint8Clamped: Uint8ClampedArray;
        Int16: Int16Array;
        Uint16: Uint16Array;
        Int32: Int32Array;
        Uint32: Uint32Array;
        Float32: Float32Array;
        Float64: Float64Array;
        BigInt64: BigInt64Array;
        BigUint64: BigUint64Array;
    };
}
