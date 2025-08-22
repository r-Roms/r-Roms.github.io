import { postfixAfterOptionalOrDefaultableMessage, type BaseParseContext, type BaseRoot, type Sequence } from "@ark/schema";
import { type array, type conform, type ErrorMessage, type satisfy } from "@ark/util";
import type { inferDefinition, validateInnerDefinition } from "./definition.ts";
import { type DefaultablePropertyTuple, type isDefaultable, type OptionalPropertyDefinition } from "./property.ts";
export declare const parseTupleLiteral: (def: array, ctx: BaseParseContext) => BaseRoot;
export type validateTupleLiteral<def extends array, $, args> = parseSequence<def, $, args> extends infer s extends SequenceParseState ? Readonly<s["validated"]> : never;
export type inferTupleLiteral<def extends array, $, args> = parseSequence<def, $, args> extends infer s extends SequenceParseState ? s["inferred"] : never;
type SequencePhase = satisfy<keyof Sequence.Inner, SequencePhase.prefix | SequencePhase.optionals | SequencePhase.defaultables | SequencePhase.postfix>;
declare namespace SequencePhase {
    type prefix = "prefix";
    type optionals = "optionals";
    type defaultables = "defaultables";
    type postfix = "postfix";
}
type SequenceParseState = {
    unscanned: array;
    inferred: array;
    validated: array;
    phase: SequencePhase;
};
type parseSequence<def extends array, $, args> = parseNextElement<{
    unscanned: def;
    inferred: [];
    validated: [];
    phase: SequencePhase.prefix;
}, $, args>;
type PreparsedElementKind = "required" | SequencePhase.optionals | SequencePhase.defaultables;
type PreparsedElement = {
    head: unknown;
    tail: array;
    inferred: unknown;
    validated: unknown;
    kind: PreparsedElementKind;
    spread: boolean;
};
declare namespace PreparsedElement {
    type from<result extends PreparsedElement> = result;
    type required = "required";
    type optionals = "optionals";
    type defaultables = "defaultables";
}
type preparseNextState<s extends SequenceParseState, $, args> = s["unscanned"] extends readonly ["...", infer head, ...infer tail] ? preparseNextElement<head, tail, true, $, args> : s["unscanned"] extends readonly [infer head, ...infer tail] ? preparseNextElement<head, tail, false, $, args> : null;
type preparseNextElement<head, tail extends array, spread extends boolean, $, args> = PreparsedElement.from<{
    head: head;
    tail: tail;
    inferred: inferDefinition<head, $, args>;
    validated: validateInnerDefinition<head, $, args>;
    kind: head extends OptionalPropertyDefinition ? PreparsedElement.optionals : head extends DefaultablePropertyTuple ? PreparsedElement.defaultables : isDefaultable<head, $, args> extends true ? PreparsedElement.defaultables : PreparsedElement.required;
    spread: spread;
}>;
type parseNextElement<s extends SequenceParseState, $, args> = preparseNextState<s, $, args> extends infer next extends PreparsedElement ? parseNextElement<{
    unscanned: next["tail"];
    inferred: nextInferred<s, next>;
    validated: nextValidated<s, next>;
    phase: next["kind"] extends (SequencePhase.optionals | SequencePhase.defaultables) ? next["kind"] : number extends nextInferred<s, next>["length"] ? s["phase"] : SequencePhase.prefix;
}, $, args> : s;
type nextInferred<s extends SequenceParseState, next extends PreparsedElement> = next["spread"] extends true ? [
    ...s["inferred"],
    ...conform<next["inferred"], array>
] : next["kind"] extends SequencePhase.optionals ? [
    ...s["inferred"],
    next["inferred"]?
] : [...s["inferred"], next["inferred"]];
type nextValidated<s extends SequenceParseState, next extends PreparsedElement> = [
    ...s["validated"],
    ...nextValidatedSpreadOperatorIfPresent<s, next>,
    nextValidatedElement<s, next>
];
type nextValidatedSpreadOperatorIfPresent<s extends SequenceParseState, next extends PreparsedElement> = next["spread"] extends true ? [
    next["inferred"] extends infer spreadOperand extends array ? [
        number,
        number
    ] extends ([
        s["inferred"]["length"],
        spreadOperand["length"]
    ]) ? ErrorMessage<multipleVariadicMessage> : "..." : ErrorMessage<writeNonArraySpreadMessage<next["head"]>>
] : [];
type nextValidatedElement<s extends SequenceParseState, next extends PreparsedElement> = next["kind"] extends SequencePhase.optionals ? next["spread"] extends true ? ErrorMessage<spreadOptionalMessage> : s["phase"] extends SequencePhase.postfix ? ErrorMessage<optionalOrDefaultableAfterVariadicMessage> : next["validated"] : next["kind"] extends SequencePhase.defaultables ? next["spread"] extends true ? ErrorMessage<spreadDefaultableMessage> : s["phase"] extends SequencePhase.optionals ? ErrorMessage<defaultablePostOptionalMessage> : s["phase"] extends SequencePhase.postfix ? ErrorMessage<optionalOrDefaultableAfterVariadicMessage> : next["validated"] : [s["phase"], next["spread"]] extends ([
    SequencePhase.optionals | SequencePhase.defaultables,
    false
]) ? ErrorMessage<postfixAfterOptionalOrDefaultableMessage> : next["validated"];
export declare const writeNonArraySpreadMessage: <operand extends string>(operand: operand) => writeNonArraySpreadMessage<operand>;
type writeNonArraySpreadMessage<operand> = `Spread element must be an array${operand extends string ? ` (was ${operand})` : ""}`;
export declare const multipleVariadicMesage = "A tuple may have at most one variadic element";
type multipleVariadicMessage = typeof multipleVariadicMesage;
export declare const requiredPostOptionalMessage = "A required element may not follow an optional element";
export declare const optionalOrDefaultableAfterVariadicMessage = "An optional element may not follow a variadic element";
type optionalOrDefaultableAfterVariadicMessage = typeof optionalOrDefaultableAfterVariadicMessage;
export declare const spreadOptionalMessage = "A spread element cannot be optional";
type spreadOptionalMessage = typeof spreadOptionalMessage;
export declare const spreadDefaultableMessage = "A spread element cannot have a default";
type spreadDefaultableMessage = typeof spreadDefaultableMessage;
export declare const defaultablePostOptionalMessage = "A defaultable element may not follow an optional element without a default";
type defaultablePostOptionalMessage = typeof defaultablePostOptionalMessage;
export {};
