/**
 * Remove undefined fields from an object
 * @param obj The object to filter
 * @param comparisonObk An object that, for any key, if the key is not present on that object, the
 * key will be filtered out. Note, this ignores the value on that object
 */
export declare function filterObject(obj: object, comparisonObj?: {}): {
    [k: string]: any;
};
