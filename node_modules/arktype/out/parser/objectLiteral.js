import { intrinsic, normalizeIndex } from "@ark/schema";
import { append, escapeChar, isArray, isEmptyObject, printable, stringAndSymbolicEntriesOf, throwParseError } from "@ark/util";
import { invalidDefaultableKeyKindMessage, invalidOptionalKeyKindMessage, parseProperty } from "./property.js";
export const parseObjectLiteral = (def, ctx) => {
    let spread;
    const structure = {};
    // We only allow a spread operator to be used as the first key in an object
    // because to match JS behavior any keys before the spread are overwritten
    // by the values in the target object, so there'd be no useful purpose in having it
    // anywhere except for the beginning.
    const defEntries = stringAndSymbolicEntriesOf(def);
    for (const [k, v] of defEntries) {
        const parsedKey = preparseKey(k);
        if (parsedKey.kind === "spread") {
            if (!isEmptyObject(structure))
                return throwParseError(nonLeadingSpreadError);
            const operand = ctx.$.parseOwnDefinitionFormat(v, ctx);
            // treat object domain as empty for spreading (useful for generic constraints)
            if (operand.equals(intrinsic.object))
                continue;
            if (!operand.hasKind("intersection") ||
                // still error on attempts to spread proto nodes like ...Date
                !operand.basis?.equals(intrinsic.object)) {
                return throwParseError(writeInvalidSpreadTypeMessage(operand.expression));
            }
            spread = operand.structure;
            continue;
        }
        if (parsedKey.kind === "undeclared") {
            if (v !== "reject" && v !== "delete" && v !== "ignore")
                throwParseError(writeInvalidUndeclaredBehaviorMessage(v));
            structure.undeclared = v;
            continue;
        }
        const parsedValue = parseProperty(v, ctx);
        const parsedEntryKey = parsedKey;
        if (parsedKey.kind === "required") {
            if (!isArray(parsedValue)) {
                appendNamedProp(structure, "required", {
                    key: parsedKey.normalized,
                    value: parsedValue
                }, ctx);
            }
            else {
                appendNamedProp(structure, "optional", parsedValue[1] === "=" ?
                    {
                        key: parsedKey.normalized,
                        value: parsedValue[0],
                        default: parsedValue[2]
                    }
                    : {
                        key: parsedKey.normalized,
                        value: parsedValue[0]
                    }, ctx);
            }
            continue;
        }
        if (isArray(parsedValue)) {
            if (parsedValue[1] === "?")
                throwParseError(invalidOptionalKeyKindMessage);
            if (parsedValue[1] === "=")
                throwParseError(invalidDefaultableKeyKindMessage);
        }
        // value must be a BaseRoot at this point
        if (parsedKey.kind === "optional") {
            appendNamedProp(structure, "optional", {
                key: parsedKey.normalized,
                value: parsedValue
            }, ctx);
            continue;
        }
        // must be index at this point
        const signature = ctx.$.parseOwnDefinitionFormat(parsedEntryKey.normalized, ctx);
        const normalized = normalizeIndex(signature, parsedValue, ctx.$);
        if (normalized.index)
            structure.index = append(structure.index, normalized.index);
        if (normalized.required)
            structure.required = append(structure.required, normalized.required);
    }
    const structureNode = ctx.$.node("structure", structure);
    return ctx.$.parseSchema({
        domain: "object",
        structure: spread?.merge(structureNode) ?? structureNode
    });
};
const appendNamedProp = (structure, kind, inner, ctx) => {
    structure[kind] = append(
    // doesn't seem like this cast should be necessary
    structure[kind], ctx.$.node(kind, inner));
};
export const writeInvalidUndeclaredBehaviorMessage = (actual) => `Value of '+' key must be 'reject', 'delete', or 'ignore' (was ${printable(actual)})`;
export const nonLeadingSpreadError = "Spread operator may only be used as the first key in an object";
export const preparseKey = (key) => typeof key === "symbol" ? { kind: "required", normalized: key }
    : key.at(-1) === "?" ?
        key.at(-2) === escapeChar ?
            { kind: "required", normalized: `${key.slice(0, -2)}?` }
            : {
                kind: "optional",
                normalized: key.slice(0, -1)
            }
        : key[0] === "[" && key.at(-1) === "]" ?
            { kind: "index", normalized: key.slice(1, -1) }
            : key[0] === escapeChar && key[1] === "[" && key.at(-1) === "]" ?
                { kind: "required", normalized: key.slice(1) }
                : key === "..." ? { kind: "spread" }
                    : key === "+" ? { kind: "undeclared" }
                        : {
                            kind: "required",
                            normalized: key === "\\..." ? "..."
                                : key === "\\+" ? "+"
                                    : key
                        };
export const writeInvalidSpreadTypeMessage = (def) => `Spread operand must resolve to an object literal type (was ${def})`;
