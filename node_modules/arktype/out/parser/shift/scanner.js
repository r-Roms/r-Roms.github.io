import { isKeyOf, Scanner, whitespaceChars } from "@ark/util";
export class ArkTypeScanner extends Scanner {
    shiftUntilNextTerminator() {
        this.shiftUntilNonWhitespace();
        return this.shiftUntil(() => this.lookahead in ArkTypeScanner.terminatingChars);
    }
    static terminatingChars = {
        "<": 1,
        ">": 1,
        "=": 1,
        "|": 1,
        "&": 1,
        ")": 1,
        "[": 1,
        "%": 1,
        ",": 1,
        ":": 1,
        "?": 1,
        "#": 1,
        ...whitespaceChars
    };
    static finalizingLookaheads = {
        ">": 1,
        ",": 1,
        "": 1,
        "=": 1,
        "?": 1
    };
    static lookaheadIsFinalizing = (lookahead, unscanned) => lookahead === ">" ?
        unscanned[0] === "=" ?
            // >== would only occur in an expression like Array<number>==5
            // otherwise, >= would only occur as part of a bound like number>=5
            unscanned[1] === "="
            // if > is the end of a generic instantiation, the next token will be
            // an operator or the end of the string
            : unscanned.trimStart() === "" ||
                isKeyOf(unscanned.trimStart()[0], ArkTypeScanner.terminatingChars)
        // "=" is a finalizer on its own (representing a default value),
        // but not with a second "=" (an equality comparator)
        : lookahead === "=" ? unscanned[0] !== "="
            // "," and "?" are unambiguously finalizers
            : lookahead === "," || lookahead === "?";
}
