import { throwInternalError, throwParseError } from "@ark/util";
import { DynamicState } from "./reduce/dynamic.js";
import { parseDefault } from "./shift/operator/default.js";
import { writeUnexpectedCharacterMessage } from "./shift/operator/operator.js";
import { ArkTypeScanner } from "./shift/scanner.js";
export const parseString = (def, ctx) => {
    const aliasResolution = ctx.$.maybeResolveRoot(def);
    if (aliasResolution)
        return aliasResolution;
    if (def.endsWith("[]")) {
        const possibleElementResolution = ctx.$.maybeResolveRoot(def.slice(0, -2));
        if (possibleElementResolution)
            return possibleElementResolution.array();
    }
    const s = new DynamicState(new ArkTypeScanner(def), ctx);
    const node = fullStringParse(s);
    if (s.finalizer === ">")
        throwParseError(writeUnexpectedCharacterMessage(">"));
    return node;
};
export const fullStringParse = (s) => {
    s.parseOperand();
    let result = parseUntilFinalizer(s).root;
    if (!result) {
        return throwInternalError(`Root was unexpectedly unset after parsing string '${s.scanner.scanned}'`);
    }
    if (s.finalizer === "=")
        result = parseDefault(s);
    else if (s.finalizer === "?")
        result = [result, "?"];
    s.scanner.shiftUntilNonWhitespace();
    if (s.scanner.lookahead) {
        // throw a parse error if non-whitespace characters made it here without being parsed
        throwParseError(writeUnexpectedCharacterMessage(s.scanner.lookahead));
    }
    return result;
};
export const parseUntilFinalizer = (s) => {
    while (s.finalizer === undefined)
        next(s);
    return s;
};
const next = (s) => s.hasRoot() ? s.parseOperator() : s.parseOperand();
