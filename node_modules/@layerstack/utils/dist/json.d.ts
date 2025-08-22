/**
 *  JSON.stringify() with custom handling for `Map` and `Set`.  To be used with `parse()`
 */
export declare function stringify(value: any): string;
export declare function replacer(key: string, value: any): any;
/**
 * JSON.parse() with support for restoring `Date`, `Map`, and `Set` instances. `Map` and `Set` require using accompanying `stringify()`
 */
export declare function parse<T = any>(value: string): T;
/**
 * Convert date strings to Date instances
 */
export declare function reviver(key: string, value: any): any;
//# sourceMappingURL=json.d.ts.map