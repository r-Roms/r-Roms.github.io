import { $ark, makeRootAndArrayPropertiesMutable, postfixAfterOptionalOrDefaultableMessage } from "@ark/schema";
import { append, isArray, isEmptyObject, throwParseError } from "@ark/util";
import { parseProperty } from "./property.js";
export const parseTupleLiteral = (def, ctx) => {
    let sequences = [{}];
    let i = 0;
    while (i < def.length) {
        let spread = false;
        if (def[i] === "..." && i < def.length - 1) {
            spread = true;
            i++;
        }
        const parsedProperty = parseProperty(def[i], ctx);
        const [valueNode, operator, possibleDefaultValue] = !isArray(parsedProperty) ? [parsedProperty] : parsedProperty;
        i++;
        if (spread) {
            if (!valueNode.extends($ark.intrinsic.Array))
                return throwParseError(writeNonArraySpreadMessage(valueNode.expression));
            // a spread must be distributed over branches e.g.:
            // def: [string, ...(number[] | [true, false])]
            // nodes: [string, ...number[]] | [string, true, false]
            sequences = sequences.flatMap(base => 
            // since appendElement mutates base, we have to shallow-ish clone it for each branch
            valueNode.distribute(branch => appendSpreadBranch(makeRootAndArrayPropertiesMutable(base), branch)));
        }
        else {
            sequences = sequences.map(base => {
                if (operator === "?")
                    return appendOptionalElement(base, valueNode);
                if (operator === "=")
                    return appendDefaultableElement(base, valueNode, possibleDefaultValue);
                return appendRequiredElement(base, valueNode);
            });
        }
    }
    return ctx.$.parseSchema(sequences.map(sequence => isEmptyObject(sequence) ?
        {
            proto: Array,
            exactLength: 0
        }
        : {
            proto: Array,
            sequence
        }));
};
const appendRequiredElement = (base, element) => {
    if (base.defaultables || base.optionals) {
        return throwParseError(base.variadic ?
            // e.g. [boolean = true, ...string[], number]
            postfixAfterOptionalOrDefaultableMessage
            // e.g. [string?, number]
            : requiredPostOptionalMessage);
    }
    if (base.variadic) {
        // e.g. [...string[], number]
        base.postfix = append(base.postfix, element);
    }
    else {
        // e.g. [string, number]
        base.prefix = append(base.prefix, element);
    }
    return base;
};
const appendOptionalElement = (base, element) => {
    if (base.variadic)
        // e.g. [...string[], number?]
        return throwParseError(optionalOrDefaultableAfterVariadicMessage);
    // e.g. [string, number?]
    base.optionals = append(base.optionals, element);
    return base;
};
const appendDefaultableElement = (base, element, value) => {
    if (base.variadic)
        // e.g. [...string[], number = 0]
        return throwParseError(optionalOrDefaultableAfterVariadicMessage);
    if (base.optionals)
        // e.g. [string?, number = 0]
        return throwParseError(defaultablePostOptionalMessage);
    // value's assignability to element will be checked when the
    // sequence is instantiated by @ark/schema
    // e.g. [string, number = 0]
    base.defaultables = append(base.defaultables, [[element, value]]);
    return base;
};
const appendVariadicElement = (base, element) => {
    // e.g. [...string[], number, ...string[]]
    if (base.postfix)
        throwParseError(multipleVariadicMesage);
    if (base.variadic) {
        if (!base.variadic.equals(element)) {
            // e.g. [...string[], ...number[]]
            throwParseError(multipleVariadicMesage);
        }
        // e.g. [...string[], ...string[]]
        // do nothing, second spread doesn't change the type
    }
    else {
        // e.g. [string, ...number[]]
        base.variadic = element.internal;
    }
    return base;
};
const appendSpreadBranch = (base, branch) => {
    const spread = branch.select({ method: "find", kind: "sequence" });
    if (!spread) {
        // the only array with no sequence reference is unknown[]
        return appendVariadicElement(base, $ark.intrinsic.unknown);
    }
    if (spread.prefix)
        for (const node of spread.prefix)
            appendRequiredElement(base, node);
    if (spread.optionals)
        for (const node of spread.optionals)
            appendOptionalElement(base, node);
    if (spread.variadic)
        appendVariadicElement(base, spread.variadic);
    if (spread.postfix)
        for (const node of spread.postfix)
            appendRequiredElement(base, node);
    return base;
};
export const writeNonArraySpreadMessage = (operand) => `Spread element must be an array (was ${operand})`;
export const multipleVariadicMesage = "A tuple may have at most one variadic element";
export const requiredPostOptionalMessage = "A required element may not follow an optional element";
export const optionalOrDefaultableAfterVariadicMessage = "An optional element may not follow a variadic element";
export const spreadOptionalMessage = "A spread element cannot be optional";
export const spreadDefaultableMessage = "A spread element cannot have a default";
export const defaultablePostOptionalMessage = "A defaultable element may not follow an optional element without a default";
