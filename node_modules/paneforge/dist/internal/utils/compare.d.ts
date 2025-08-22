/**
 * Compares two numbers for equality with a given fractional precision.
 */
export declare function areNumbersAlmostEqual(actual: number, expected: number, fractionDigits?: number): boolean;
/**
 * Compares two numbers with a given tolerance.
 *
 * @returns `-1` if `actual` is less than `expected`, `0` if they are equal,
 * and `1` if `actual` is greater than `expected`.
 */
export declare function compareNumbersWithTolerance(actual: number, expected: number, fractionDigits?: number): number;
/**
 * Compares two arrays for equality.
 */
export declare function areArraysEqual<T extends Array<unknown>>(arrA: T, arrB: T): boolean;
