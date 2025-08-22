import { writeUnresolvableMessage, type BaseRoot, type GenericAst, type GenericRoot, type arkKind, type genericParamNames, type resolvableReferenceIn, type writeNonSubmoduleDotMessage } from "@ark/schema";
import { type BigintLiteral, type NumberLiteral, type join, type lastOf } from "@ark/util";
import type { ArkAmbient } from "../../../config.ts";
import type { resolutionToAst } from "../../../scope.ts";
import type { GenericInstantiationAst } from "../../ast/generic.ts";
import type { InferredAst } from "../../ast/infer.ts";
import { writePrefixedPrivateReferenceMessage } from "../../ast/validate.ts";
import type { DynamicState } from "../../reduce/dynamic.ts";
import type { StaticState, state } from "../../reduce/static.ts";
import type { BaseCompletions } from "../../string.ts";
import type { ArkTypeScanner } from "../scanner.ts";
import { parseGenericArgs, writeInvalidGenericArgCountMessage, type ParsedArgs } from "./genericArgs.ts";
export declare const parseUnenclosed: (s: DynamicState) => void;
export type parseUnenclosed<s extends StaticState, $, args> = ArkTypeScanner.shiftUntilNextTerminator<s["unscanned"]> extends (ArkTypeScanner.shiftResult<infer token, infer unscanned>) ? tryResolve<s, unscanned, token, $, args> extends state.from<infer s> ? s : never : never;
type parseResolution<s extends StaticState, unscanned extends string, alias extends string, resolution, $, args> = resolutionToAst<alias, resolution> extends infer ast ? ast extends GenericAst ? parseGenericInstantiation<alias, ast, state.scanTo<s, unscanned>, $, args> : state.setRoot<s, ast, unscanned> : never;
export declare const parseGenericInstantiation: (name: string, g: GenericRoot, s: DynamicState) => BaseRoot;
export type parseGenericInstantiation<name extends string, g extends GenericAst, s extends StaticState, $, args> = ArkTypeScanner.skipWhitespace<s["unscanned"]> extends `<${infer unscanned}` ? parseGenericArgs<name, g, unscanned, $, args> extends infer result ? result extends ParsedArgs<infer argAsts, infer nextUnscanned> ? state.setRoot<s, GenericInstantiationAst<g, argAsts>, nextUnscanned> : result : never : state.error<writeInvalidGenericArgCountMessage<name, genericParamNames<g["paramsAst"]>, [
]>>;
type tryResolve<s extends StaticState, unscanned extends string, token extends string, $, args> = token extends keyof args ? parseResolution<s, unscanned, token, args[token], $, args> : token extends keyof $ ? parseResolution<s, unscanned, token, $[token], $, args> : `#${token}` extends keyof $ ? parseResolution<s, unscanned, token, $[`#${token}`], $, args> : token extends keyof ArkAmbient.$ ? parseResolution<s, unscanned, token, ArkAmbient.$[token], $, args> : token extends NumberLiteral<infer n> ? state.setRoot<s, InferredAst<n, token>, unscanned> : token extends (`${infer submodule extends keyof $ & string}.${infer reference}`) ? tryResolveSubmodule<token, $[submodule], reference, s, unscanned, $, args, [
    submodule
]> : token extends (`${infer submodule extends keyof ArkAmbient.$ & string}.${infer reference}`) ? tryResolveSubmodule<token, ArkAmbient.$[submodule], reference, s, unscanned, $, args, [
    submodule
]> : token extends BigintLiteral<infer b> ? state.setRoot<s, InferredAst<b, token>, unscanned> : token extends "keyof" ? state.addPrefix<s, "keyof", unscanned> : unresolvableState<s, token, $, args, []>;
type tryResolveSubmodule<token extends string, resolution, reference extends string, s extends StaticState, unscanned extends string, $, args, submodulePath extends string[]> = resolution extends {
    [arkKind]: "module";
} ? reference extends keyof resolution ? parseResolution<s, unscanned, token, resolution[reference], $, args> : reference extends (`${infer nestedSubmodule extends keyof resolution & string}.${infer nestedReference}`) ? tryResolveSubmodule<token, resolution[nestedSubmodule], nestedReference, s, unscanned, $, args, [
    ...submodulePath,
    nestedSubmodule
]> : unresolvableState<s, reference, resolution, {}, submodulePath> : state.error<writeNonSubmoduleDotMessage<lastOf<submodulePath>>>;
/** Provide valid completions for the current token, or fallback to an
 * unresolvable error if there are none */
export type unresolvableState<s extends StaticState, token extends string, resolutions, args, submodulePath extends string[]> = [
    token,
    s["unscanned"]
] extends ([
    "",
    ArkTypeScanner.shift<"#", infer unscanned>
]) ? ArkTypeScanner.shiftUntilNextTerminator<unscanned> extends (ArkTypeScanner.shiftResult<infer name, string>) ? state.error<writePrefixedPrivateReferenceMessage<name>> : never : validReferenceFromToken<token, resolutions, args, submodulePath> extends (never) ? state.error<writeUnresolvableMessage<qualifiedReference<token, submodulePath>>> : state.completion<`${s["scanned"]}${qualifiedReference<validReferenceFromToken<token, resolutions, args, submodulePath>, submodulePath>}`>;
type qualifiedReference<reference extends string, submodulePath extends string[]> = join<[...submodulePath, reference], ".">;
type validReferenceFromToken<token extends string, $, args, submodulePath extends string[]> = Extract<submodulePath["length"] extends 0 ? BaseCompletions<$, args> : resolvableReferenceIn<$>, `${token}${string}`>;
export declare const writeMissingOperandMessage: (s: DynamicState) => string;
export type writeMissingRightOperandMessage<token extends string, unscanned extends string = ""> = `Token '${token}' requires a right operand${unscanned extends "" ? "" : ` before '${unscanned}'`}`;
export declare const writeMissingRightOperandMessage: <token extends string, unscanned extends string>(token: token, unscanned?: unscanned) => writeMissingRightOperandMessage<token, unscanned>;
export declare const writeExpressionExpectedMessage: <unscanned extends string>(unscanned: unscanned) => writeExpressionExpectedMessage<unscanned>;
export type writeExpressionExpectedMessage<unscanned extends string> = `Expected an expression${unscanned extends "" ? "" : ` before '${unscanned}'`}`;
export {};
