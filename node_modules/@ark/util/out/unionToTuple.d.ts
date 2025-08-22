import type { array, join } from "./arrays.ts";
import type { Fn } from "./functions.ts";
import type { conform } from "./generics.ts";
export type stringifyUnion<t extends string, delimiter extends string = ", "> = join<unionToTuple<t>, delimiter>;
export type unionToTuple<t> = _unionToTuple<t, []> extends infer result ? conform<result, t[]> : never;
type _unionToTuple<t, result extends unknown[]> = getLastBranch<t> extends infer current ? [
    t
] extends [never] ? result : _unionToTuple<Exclude<t, current>, [current, ...result]> : never;
type getLastBranch<t> = intersectUnion<t extends unknown ? (x: t) => void : never> extends ((x: infer branch) => void) ? branch : never;
export type intersectUnion<t> = (t extends unknown ? (_: t) => void : never) extends ((_: infer intersection) => void) ? intersection : never;
export type intersectOverloadReturns<fn extends Fn> = intersectUnion<ReturnType<overloadOf<fn>>>;
export type overloadOf<fn extends Fn, givenArgs extends array = array> = Exclude<collectSignatures<(() => never) & fn, givenArgs, unknown>, fn extends () => never ? never : () => never>;
type collectSignatures<fn, givenArgs extends array, result> = result & fn extends (...args: infer args) => infer returns ? result extends fn ? never : collectSignatures<fn, givenArgs, Pick<fn, keyof fn> & result & ((...args: args) => returns)> | (args extends givenArgs ? (...args: args) => returns : never) : never;
export {};
