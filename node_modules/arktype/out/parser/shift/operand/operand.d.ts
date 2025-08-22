import { type WhitespaceChar } from "@ark/util";
import type { DynamicState } from "../../reduce/dynamic.ts";
import type { StaticState, state } from "../../reduce/static.ts";
import type { BaseCompletions } from "../../string.ts";
import type { ArkTypeScanner } from "../scanner.ts";
import { parseEnclosed, type EnclosingQuote, type EnclosingStartToken } from "./enclosed.ts";
import { parseUnenclosed } from "./unenclosed.ts";
export declare const parseOperand: (s: DynamicState) => void;
export type parseOperand<s extends StaticState, $, args> = s["unscanned"] extends (ArkTypeScanner.shift<infer lookahead, infer unscanned>) ? lookahead extends "(" ? state.reduceGroupOpen<s, unscanned> : lookahead extends EnclosingStartToken ? parseEnclosed<s, lookahead, unscanned> : lookahead extends WhitespaceChar ? parseOperand<state.scanTo<s, unscanned>, $, args> : lookahead extends "d" ? unscanned extends (ArkTypeScanner.shift<infer enclosing extends EnclosingQuote, infer nextUnscanned>) ? parseEnclosed<s, `d${enclosing}`, nextUnscanned> : parseUnenclosed<s, $, args> : parseUnenclosed<s, $, args> : state.completion<`${s["scanned"]}${BaseCompletions<$, args>}`>;
