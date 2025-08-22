import type { Module, Submodule } from "../module.ts";
/**
 * As per the ECMA-262 specification:
 * A time value supports a slightly smaller range of -8,640,000,000,000,000 to 8,640,000,000,000,000 milliseconds.
 *
 * @see https://262.ecma-international.org/15.0/index.html#sec-time-values-and-time-range
 */
export declare const epoch: import("@ark/schema").BaseRoot<import("@ark/schema").InternalRootDeclaration>;
export declare const integer: import("@ark/schema").BaseRoot<import("@ark/schema").InternalRootDeclaration>;
export declare const number: number.module;
export declare namespace number {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: number;
        epoch: number;
        integer: number;
        safe: number;
        NaN: number;
        Infinity: number;
        NegativeInfinity: number;
    };
}
