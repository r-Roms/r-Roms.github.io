declare const args: " args";
type args = typeof args;
export declare abstract class Hkt<constraints extends unknown[] = any> {
    [args]: unknown[];
    constraints: constraints;
    args: this[args] extends infer args extends unknown[] ? args : never;
    0: this[args] extends [infer arg, ...any] ? arg : never;
    1: this[args] extends [any, infer arg, ...any] ? arg : never;
    2: this[args] extends [any, any, infer arg, ...any] ? arg : never;
    3: this[args] extends [any, any, any, infer arg, ...any] ? arg : never;
    abstract body: unknown;
    description?: string;
    constructor();
}
/** A small set of HKT utility types based on https://github.com/gvergnaud/hotscript
 *  See https://github.com/gvergnaud/hotscript/blob/main/src/internals/core/Core.ts
 */
export declare namespace Hkt {
    type constructor<constraints extends unknown[] = any> = new () => Hkt<constraints>;
    type args = typeof args;
    type apply<hkt extends Hkt, args extends {
        [i in keyof args]: hkt["constraints"][i];
    }> = (hkt & {
        [args]: args;
    })["body"];
}
export {};
