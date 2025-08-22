/**
 * Check if str only contians upper case letters
 */
export declare function isUpperCase(str: string): boolean;
/**
 * Returns string with the first letter of each word converted to uppercase (and remainder as lowercase)
 */
export declare function toTitleCase(str: string, ignore?: string[]): string;
/** Convert string to camel case */
export declare function toCamelCase(str: string): string;
/** Convert string to snake case */
export declare function toSnakeCase(str: string): string;
/** Convert string to kebab case */
export declare function toKebabCase(str: string): string;
/** Convert string to pascal case */
export declare function toPascalCase(str: string): string;
/** Get the roman numeral for the given value */
export declare function romanize(value: number): string;
/**
 * Truncate text with option to keep a number of characters on end.  Inserts ellipsis between parts
 */
export declare function truncate(text: string, totalChars: number, endChars?: number): string;
export declare function uniqueId(prefix?: string): string;
//# sourceMappingURL=string.d.ts.map