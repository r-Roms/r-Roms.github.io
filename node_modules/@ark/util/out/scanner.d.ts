import type { KeySet } from "./records.ts";
export declare class Scanner<lookahead extends string = string> {
    chars: string[];
    i: number;
    def: string;
    constructor(def: string);
    /** Get lookahead and advance scanner by one */
    shift(): this["lookahead"];
    get lookahead(): lookahead;
    get nextLookahead(): string;
    get length(): number;
    shiftUntil(condition: Scanner.UntilCondition): string;
    shiftUntilLookahead(charOrSet: string | KeySet): string;
    shiftUntilNonWhitespace(): string;
    jumpToIndex(i: number): void;
    jumpForward(count: number): void;
    get location(): number;
    get unscanned(): string;
    get scanned(): string;
    sliceChars(start: number, end?: number): string;
    lookaheadIs<char extends lookahead>(char: char): this is Scanner<char>;
    lookaheadIsIn<keySet extends KeySet>(tokens: keySet): this is Scanner<Extract<keyof keySet, string>>;
}
export declare namespace Scanner {
    type UntilCondition = (scanner: Scanner, shifted: string) => boolean;
}
