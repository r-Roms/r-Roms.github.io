import { GenericRoot } from "@ark/schema";
import { throwParseError } from "@ark/util";
import { DynamicState } from "./parser/reduce/dynamic.js";
import { parseUntilFinalizer } from "./parser/string.js";
export const Generic = GenericRoot;
export const emptyGenericParameterMessage = "An empty string is not a valid generic parameter name";
export const parseGenericParamName = (scanner, result, ctx) => {
    scanner.shiftUntilNonWhitespace();
    const name = scanner.shiftUntilNextTerminator();
    if (name === "") {
        // if we've reached the end of the string and have parsed at least one
        // param, return the valid result
        if (scanner.lookahead === "" && result.length)
            return result;
        return throwParseError(emptyGenericParameterMessage);
    }
    scanner.shiftUntilNonWhitespace();
    return _parseOptionalConstraint(scanner, name, result, ctx);
};
const extendsToken = "extends ";
const _parseOptionalConstraint = (scanner, name, result, ctx) => {
    scanner.shiftUntilNonWhitespace();
    if (scanner.unscanned.startsWith(extendsToken))
        scanner.jumpForward(extendsToken.length);
    else {
        // if we don't have a contraining token here, return now so we can
        // assume in the rest of the function body we do have a constraint
        if (scanner.lookahead === ",")
            scanner.shift();
        result.push(name);
        return parseGenericParamName(scanner, result, ctx);
    }
    const s = parseUntilFinalizer(new DynamicState(scanner, ctx));
    result.push([name, s.root]);
    return parseGenericParamName(scanner, result, ctx);
};
