/**
 * Checks if two arrays are equal by comparing their values.
 */
export declare function arraysAreEqual<T extends Array<unknown>>(arr1: T, arr2: T): boolean;
/**
 * Splits an array into chunks of a given size.
 * @param arr The array to split.
 * @param size The size of each chunk.
 * @returns An array of arrays, where each sub-array has `size` elements from the original array.
 * @example ```ts
 * const arr = [1, 2, 3, 4, 5, 6, 7, 8];
 * const chunks = chunk(arr, 3);
 * // chunks = [[1, 2, 3], [4, 5, 6], [7, 8]]
 * ```
 */
export declare function chunk<T>(arr: T[], size: number): T[][];
/**
 * Checks if the given index is valid for the given array.
 *
 * @param index - The index to check
 * @param arr - The array to check
 */
export declare function isValidIndex(index: number, arr: unknown[]): boolean;
/**
 * Returns the array element after the given index, or undefined for out-of-bounds or empty arrays.
 * @param array the array.
 * @param index the index of the current element.
 * @param loop loop to the beginning of the array if the next index is out of bounds?
 */
/**
 * Returns the array element after the given index, or undefined for out-of-bounds or empty arrays.
 * For single-element arrays, returns the element if the index is 0.
 * @param array the array.
 * @param index the index of the current element.
 * @param loop loop to the beginning of the array if the next index is out of bounds?
 */
export declare function next<T>(array: T[], index: number, loop?: boolean): T | undefined;
/**
 * Returns the array element prior to the given index, or undefined for out-of-bounds or empty arrays.
 * For single-element arrays, returns the element if the index is 0.
 * @param array the array.
 * @param index the index of the current element.
 * @param loop loop to the end of the array if the previous index is out of bounds?
 */
export declare function prev<T>(array: T[], index: number, loop?: boolean): T | undefined;
/**
 * Returns the element some number after the given index. If the target index is out of bounds:
 *   - If looping is disabled, the first or last element will be returned.
 *   - If looping is enabled, it will wrap around the array.
 * Returns undefined for empty arrays or out-of-bounds initial indices.
 * @param array the array.
 * @param index the index of the current element.
 * @param increment the number of elements to move forward (can be negative).
 * @param loop loop around the array if the target index is out of bounds?
 */
export declare function forward<T>(array: T[], index: number, increment: number, loop?: boolean): T | undefined;
/**
 * Returns the element some number before the given index. If the target index is out of bounds:
 *   - If looping is disabled, the first or last element will be returned.
 *   - If looping is enabled, it will wrap around the array.
 * Returns undefined for empty arrays or out-of-bounds initial indices.
 * @param array the array.
 * @param index the index of the current element.
 * @param decrement the number of elements to move backward (can be negative).
 * @param loop loop around the array if the target index is out of bounds?
 */
export declare function backward<T>(array: T[], index: number, decrement: number, loop?: boolean): T | undefined;
/**
 * Finds the next matching item from a list of values based on a search string.
 *
 * This function handles several special cases in typeahead behavior:
 *
 * 1. Space handling: When a search string ends with a space, it handles it specially:
 *    - If there's only one match for the text before the space, it ignores the space
 *    - If there are multiple matches and the current match already starts with the search prefix
 *      followed by a space, it keeps the current match (doesn't change selection on space)
 *    - Only after typing characters beyond the space will it move to a more specific match
 *
 * 2. Repeated character handling: If a search consists of repeated characters (e.g., "aaa"),
 *    it treats it as a single character for matching purposes
 *
 * 3. Cycling behavior: The function wraps around the values array starting from the current match
 *    to find the next appropriate match, creating a cycling selection behavior
 *
 * @param values - Array of string values to search through (e.g., the text content of menu items)
 * @param search - The current search string typed by the user
 * @param currentMatch - The currently selected/matched item, if any
 * @returns The next matching value that should be selected, or undefined if no match is found
 */
export declare function getNextMatch(values: string[], search: string, currentMatch?: string): string | undefined;
/**
 * Wraps an array around itself at a given start index
 * Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
 */
export declare function wrapArray<T>(array: T[], startIndex: number): T[];
