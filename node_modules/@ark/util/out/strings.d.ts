export declare const capitalize: <s extends string>(s: s) => Capitalize<s>;
export declare const uncapitalize: <s extends string>(s: s) => Uncapitalize<s>;
export type firstChar<s extends string> = s extends `${infer head}${string}` ? head : "";
export type charsAfterFirst<s extends string> = s extends `${string}${infer tail}` ? tail : "";
export type lastChar<s extends string> = s extends `${infer head}${infer tail}` ? tail extends "" ? head : lastChar<tail> : s;
export type charsBeforeLast<s extends string> = s extends `${infer head}${infer tail}` ? tail extends "" ? "" : `${head}${charsBeforeLast<tail>}` : "";
export declare const anchoredRegex: (regex: RegExp | string) => RegExp;
export declare const deanchoredRegex: (regex: RegExp | string) => RegExp;
export declare const anchoredSource: (regex: RegExp | string) => string;
export declare const deanchoredSource: (regex: RegExp | string) => string;
export declare const RegexPatterns: {
    negativeLookahead: (pattern: string) => `(?!${string})`;
    nonCapturingGroup: (pattern: string) => `(?:${string})`;
};
export declare const escapeChar = "\\";
export type EscapeChar = typeof escapeChar;
export declare const whitespaceChars: {
    readonly " ": 1;
    readonly "\n": 1;
    readonly "\t": 1;
};
export type WhitespaceChar = keyof typeof whitespaceChars;
export type trim<s extends string> = trimEnd<trimStart<s>>;
export type trimStart<s extends string> = s extends `${WhitespaceChar}${infer tail}` ? trimEnd<tail> : s;
export type trimEnd<s extends string> = s extends `${infer init}${WhitespaceChar}` ? trimEnd<init> : s;
export type isStringLiteral<t> = [
    t
] extends [string] ? [
    string
] extends [t] ? false : Uppercase<t> extends Uppercase<Lowercase<t>> ? Lowercase<t> extends Lowercase<Uppercase<t>> ? true : false : false : false;
export declare const emojiToUnicode: (emoji: string) => string;
