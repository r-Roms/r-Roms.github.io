import { Scope } from "../scope.js";
export const TypedArray = Scope.module({
    Int8: ["instanceof", Int8Array],
    Uint8: ["instanceof", Uint8Array],
    Uint8Clamped: ["instanceof", Uint8ClampedArray],
    Int16: ["instanceof", Int16Array],
    Uint16: ["instanceof", Uint16Array],
    Int32: ["instanceof", Int32Array],
    Uint32: ["instanceof", Uint32Array],
    Float32: ["instanceof", Float32Array],
    Float64: ["instanceof", Float64Array],
    BigInt64: ["instanceof", BigInt64Array],
    BigUint64: ["instanceof", BigUint64Array]
}, {
    name: "TypedArray"
});
