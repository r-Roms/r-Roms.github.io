import { type Scanner } from "@ark/util";
import type { InferredAst } from "../../ast/infer.ts";
import type { DynamicState } from "../../reduce/dynamic.ts";
import type { StaticState, state } from "../../reduce/static.ts";
import type { ArkTypeScanner } from "../scanner.ts";
export type StringLiteral<Text extends string = string> = DoubleQuotedStringLiteral<Text> | SingleQuotedStringLiteral<Text>;
export type DoubleQuotedStringLiteral<Text extends string = string> = `"${Text}"`;
export type SingleQuotedStringLiteral<Text extends string = string> = `'${Text}'`;
export declare const parseEnclosed: (s: DynamicState, enclosing: EnclosingStartToken) => void;
export type parseEnclosed<s extends StaticState, enclosingStart extends EnclosingStartToken, unscanned extends string> = ArkTypeScanner.shiftUntil<unscanned, EnclosingTokens[enclosingStart]> extends ArkTypeScanner.shiftResult<infer scanned, infer nextUnscanned> ? nextUnscanned extends "" ? state.error<writeUnterminatedEnclosedMessage<scanned, enclosingStart>> : state.setRoot<s, InferredAst<enclosingStart extends EnclosingQuote ? scanned : enclosingStart extends "/" ? string : Date, `${enclosingStart}${scanned}${EnclosingTokens[enclosingStart]}`>, nextUnscanned extends ArkTypeScanner.shift<string, infer unscanned> ? unscanned : ""> : never;
export declare const enclosingQuote: {
    readonly "'": 1;
    readonly '"': 1;
};
export type EnclosingQuote = keyof typeof enclosingQuote;
export declare const enclosingChar: {
    readonly "/": 1;
    readonly "'": 1;
    readonly '"': 1;
};
export declare const enclosingTokens: {
    readonly "d'": "'";
    readonly 'd"': "\"";
    readonly "'": "'";
    readonly '"': "\"";
    readonly "/": "/";
};
export type EnclosingTokens = typeof enclosingTokens;
export type EnclosingStartToken = keyof EnclosingTokens;
export type EnclosingEndToken = EnclosingTokens[keyof EnclosingTokens];
export declare const untilLookaheadIsClosing: Record<EnclosingEndToken, Scanner.UntilCondition>;
declare const enclosingCharDescriptions: {
    readonly '"': "double-quote";
    readonly "'": "single-quote";
    readonly "/": "forward slash";
};
type enclosingCharDescriptions = typeof enclosingCharDescriptions;
export declare const writeUnterminatedEnclosedMessage: <fragment extends string, enclosingStart extends EnclosingStartToken>(fragment: fragment, enclosingStart: enclosingStart) => writeUnterminatedEnclosedMessage<fragment, enclosingStart>;
export type writeUnterminatedEnclosedMessage<fragment extends string, enclosingStart extends EnclosingStartToken> = `${enclosingStart}${fragment} requires a closing ${enclosingCharDescriptions[EnclosingTokens[enclosingStart]]}`;
export {};
