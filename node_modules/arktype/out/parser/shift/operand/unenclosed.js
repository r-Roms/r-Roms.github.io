import { hasArkKind, writeUnresolvableMessage } from "@ark/schema";
import { printable, throwParseError, tryParseWellFormedBigint, tryParseWellFormedNumber } from "@ark/util";
import { writePrefixedPrivateReferenceMessage } from "../../ast/validate.js";
import { parseGenericArgs, writeInvalidGenericArgCountMessage } from "./genericArgs.js";
export const parseUnenclosed = (s) => {
    const token = s.scanner.shiftUntilNextTerminator();
    if (token === "keyof")
        s.addPrefix("keyof");
    else
        s.root = unenclosedToNode(s, token);
};
export const parseGenericInstantiation = (name, g, s) => {
    s.scanner.shiftUntilNonWhitespace();
    const lookahead = s.scanner.shift();
    if (lookahead !== "<")
        return s.error(writeInvalidGenericArgCountMessage(name, g.names, []));
    const parsedArgs = parseGenericArgs(name, g, s);
    return g(...parsedArgs);
};
const unenclosedToNode = (s, token) => maybeParseReference(s, token) ??
    maybeParseUnenclosedLiteral(s, token) ??
    s.error(token === "" ?
        s.scanner.lookahead === "#" ?
            writePrefixedPrivateReferenceMessage(s.shiftedByOne().scanner.shiftUntilNextTerminator())
            : writeMissingOperandMessage(s)
        : writeUnresolvableMessage(token));
const maybeParseReference = (s, token) => {
    if (s.ctx.args?.[token]) {
        const arg = s.ctx.args[token];
        if (typeof arg !== "string")
            return arg;
        return s.ctx.$.node("alias", { reference: arg }, { prereduced: true });
    }
    const resolution = s.ctx.$.maybeResolve(token);
    if (hasArkKind(resolution, "root"))
        return resolution;
    if (resolution === undefined)
        return;
    if (hasArkKind(resolution, "generic"))
        return parseGenericInstantiation(token, resolution, s);
    return throwParseError(`Unexpected resolution ${printable(resolution)}`);
};
const maybeParseUnenclosedLiteral = (s, token) => {
    const maybeNumber = tryParseWellFormedNumber(token);
    if (maybeNumber !== undefined)
        return s.ctx.$.node("unit", { unit: maybeNumber });
    const maybeBigint = tryParseWellFormedBigint(token);
    if (maybeBigint !== undefined)
        return s.ctx.$.node("unit", { unit: maybeBigint });
};
export const writeMissingOperandMessage = (s) => {
    const operator = s.previousOperator();
    return operator ?
        writeMissingRightOperandMessage(operator, s.scanner.unscanned)
        : writeExpressionExpectedMessage(s.scanner.unscanned);
};
export const writeMissingRightOperandMessage = (token, unscanned = "") => `Token '${token}' requires a right operand${unscanned ? ` before '${unscanned}'` : ""}`;
export const writeExpressionExpectedMessage = (unscanned) => `Expected an expression${unscanned ? ` before '${unscanned}'` : ""}`;
