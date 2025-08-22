export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type NumberLiteral<n extends number = number> = `${n}`;
export type BigintLiteral<n extends bigint = bigint> = `${n}n`;
export type IntegerLiteral<n extends bigint = bigint> = `${n}`;
export type NonNegativeIntegerLiteral<n extends bigint = bigint> = `${Digit}` | (`${Exclude<Digit, 0>}${string}` & `${n}`);
/**
 *  Matches a well-formatted numeric expression according to the following rules:
 *    1. Must include an integer portion (i.e. '.321' must be written as '0.321')
 *    2. The first digit of the value must not be 0, unless the entire integer portion is 0
 *    3. If the value includes a decimal, its last digit may not be 0
 *    4. The value may not be "-0"
 */
export declare const wellFormedNumberMatcher: RegExp;
export declare const isWellFormedNumber: RegExp["test"];
/**
 * Similar to wellFormedNumber but more permissive in the following ways:
 *
 *  - Allows numbers without an integer portion like ".5" (well-formed equivalent is "0.5")
 *  - Allows decimals with trailing zeroes like "0.10" (well-formed equivalent is "0.1")
 */
export declare const numericStringMatcher: RegExp;
export declare const isNumericString: (string: string) => boolean;
export declare const numberLikeMatcher: RegExp;
/**
 *  Matches a well-formatted integer according to the following rules:
 *    1. must begin with an integer, the first digit of which cannot be 0 unless the entire value is 0
 *    2. The value may not be "-0"
 */
export declare const wellFormedIntegerMatcher: RegExp;
export declare const isWellFormedInteger: RegExp["test"];
export declare const integerLikeMatcher: RegExp;
type NumericLiteralKind = "number" | "bigint" | "integer";
declare const numericLiteralDescriptions: {
    readonly number: "a number";
    readonly bigint: "a bigint";
    readonly integer: "an integer";
};
type numericLiteralDescriptions = typeof numericLiteralDescriptions;
export type writeMalformedNumericLiteralMessage<def extends string, kind extends NumericLiteralKind> = `'${def}' was parsed as ${numericLiteralDescriptions[kind]} but could not be narrowed to a literal value. Avoid unnecessary leading or trailing zeros and other abnormal notation`;
export declare const writeMalformedNumericLiteralMessage: <def extends string, kind extends NumericLiteralKind>(def: def, kind: kind) => writeMalformedNumericLiteralMessage<def, kind>;
export declare const tryParseNumber: <errorOnFail extends boolean | string>(token: string, options?: NumericParseOptions<errorOnFail>) => errorOnFail extends true | string ? number : number | undefined;
export declare const tryParseWellFormedNumber: typeof tryParseNumber;
export type tryParseNumber<token extends string, messageOnFail extends string> = token extends `${infer n extends number}` ? number extends n ? writeMalformedNumericLiteralMessage<token, "number"> : n : messageOnFail;
export type parseNumber<token extends string> = token extends `${infer n extends number}` ? n : never;
export declare const tryParseInteger: <errorOnFail extends boolean | string>(token: string, options?: NumericParseOptions<errorOnFail>) => errorOnFail extends true | string ? number : number | undefined;
export type tryParseInteger<token extends string, messageOnFail extends string> = token extends `${infer b extends bigint}` ? bigint extends b ? writeMalformedNumericLiteralMessage<token, "integer"> : token extends `${infer n extends number}` ? n : never : messageOnFail;
export type parseInteger<token extends string> = token extends `${bigint}` ? token extends `${infer n extends number}` ? n : never : never;
export type parseNonNegativeInteger<token extends string> = token extends `-${string}` ? never : parseInteger<token>;
export type NumericParseOptions<errorOnFail extends boolean | string> = {
    errorOnFail?: errorOnFail;
    strict?: boolean;
};
export declare const tryParseWellFormedBigint: (def: string) => bigint | undefined;
/**
 * Returns the next or previous representable floating-point number after the given input.
 *
 * @param {"+" | "-"} [direction="+"] - The direction to find the nearest float. "+" for the next float, "-" for the previous float.
 * @throws {Error} If the input is not a finite number.
 *
 * @example
 * console.log(nearestFloat(0)); // Smallest positive number
 * console.log(nearestFloat(2)); // 2.0000000000000004
 * console.log(nearestFloat(2.1)); // 2.1000000000000005
 * console.log(nearestFloat(2, "-")); // 1.9999999999999998
 * console.log(nearestFloat(2.1, "-")); // 2.0999999999999996
 * // as size of input increases, the increments become larger to stay within what
 * // JS can represent in a numeric value
 * console.log(nearestFloat(5555555555555555)); // 5555555555555556
 * console.log(nearestFloat(5555555555555555, "-")); // 5555555555555554
 */
export declare const nearestFloat: (n: number, direction?: "+" | "-") => number;
export {};
