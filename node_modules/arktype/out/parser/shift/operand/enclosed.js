import { isKeyOf, throwParseError } from "@ark/util";
import { tryParseDate, writeInvalidDateMessage } from "./date.js";
export const parseEnclosed = (s, enclosing) => {
    const enclosed = s.scanner.shiftUntil(untilLookaheadIsClosing[enclosingTokens[enclosing]]);
    if (s.scanner.lookahead === "")
        return s.error(writeUnterminatedEnclosedMessage(enclosed, enclosing));
    // Shift the scanner one additional time for the second enclosing token
    s.scanner.shift();
    if (enclosing === "/") {
        try {
            new RegExp(enclosed);
        }
        catch (e) {
            throwParseError(String(e));
        }
        s.root = s.ctx.$.node("intersection", {
            domain: "string",
            pattern: enclosed
        }, { prereduced: true });
    }
    else if (isKeyOf(enclosing, enclosingQuote))
        s.root = s.ctx.$.node("unit", { unit: enclosed });
    else {
        const date = tryParseDate(enclosed, writeInvalidDateMessage(enclosed));
        s.root = s.ctx.$.node("unit", { meta: enclosed, unit: date });
    }
};
export const enclosingQuote = {
    "'": 1,
    '"': 1
};
export const enclosingChar = {
    "/": 1,
    "'": 1,
    '"': 1
};
export const enclosingTokens = {
    "d'": "'",
    'd"': '"',
    "'": "'",
    '"': '"',
    "/": "/"
};
export const untilLookaheadIsClosing = {
    "'": scanner => scanner.lookahead === `'`,
    '"': scanner => scanner.lookahead === `"`,
    "/": scanner => scanner.lookahead === `/`
};
const enclosingCharDescriptions = {
    '"': "double-quote",
    "'": "single-quote",
    "/": "forward slash"
};
export const writeUnterminatedEnclosedMessage = (fragment, enclosingStart) => `${enclosingStart}${fragment} requires a closing ${enclosingCharDescriptions[enclosingTokens[enclosingStart]]}`;
