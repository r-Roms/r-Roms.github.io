import type { PropAccessorArg } from './object.js';
/**
 * Useful until Array.flat is more mainstream - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
 * see also: https://lodash.com/docs/4.17.11#flatten and https://stackoverflow.com/a/55345130/191902
 */
export declare function flatten<T>(items: T[][]): T[];
/**
 * Combine values using reducer.  Returns null if all values null (unlike d3.sum)
 */
export declare function combine(values: (number | null)[], func: (total: number | null, operand: number | null) => number): number | null;
/**
 * Sum values but maintain null if all values null (unlike d3.sum)
 */
export declare function sum(items: (object | null)[], prop?: PropAccessorArg): number | null;
/**
 * Sum array of objects by property
 */
export declare function sumObjects(items: (object | null)[], prop?: PropAccessorArg): Record<never, number | null>;
/**
 * Subtract each value from previous but maintain null if all values null (unlike d3.sum)
 */
export declare function subtract(items: (object | null)[], prop?: PropAccessorArg): number | null;
/**
 * Average values but maintain null if all values null (unlike d3.mean)
 */
export declare function average(items: (object | null)[], prop?: PropAccessorArg): number | null;
/**
 * Moving average.
 *   @see https://observablehq.com/@d3/moving-average
 *   @see https://mathworld.wolfram.com/MovingAverage.html
 */
export declare function movingAverage(items: (object | null)[], windowSize: number, prop?: PropAccessorArg): (number | null)[];
/**
 * Return the unique set of values (remove duplicates)
 */
export declare function unique(values: any[]): any[];
/**
 * Join values up to a maximum with `separator`, then truncate with total
 */
export declare function joinValues(values?: string[], max?: number, separator?: string): string;
/**
 * Recursively transverse nested arrays by path
 */
export declare function nestedFindByPath(arr: any[], path: string[], props?: {
    key?: PropAccessorArg;
    values?: PropAccessorArg;
}, depth?: number): any;
/**
 * Recursively transverse nested arrays looking for item
 */
export declare function nestedFindByPredicate(arr: any[], predicate: (item: any, index: number) => boolean, childrenProp?: PropAccessorArg): any | undefined;
export type TreeNode = {
    id: string;
    name: string;
    level: number;
    children: TreeNode[];
};
/**
 * Given a flat array of objects with a `level` property, build a nested object with `children`
 */
export declare function buildTree<T extends Omit<TreeNode, 'children'>>(arr: T[]): TreeNode[];
/**
 * Transverse array tree in depth-first order and execute callback for each item
 */
export declare function walk<T>(arr: T[], children: Function, callback: Function): void;
/**
 * Build flatten array in depth-first order (using `walk`)
 */
export declare function flattenTree<T>(arr: T[], children: Function): T[];
export declare function chunk(array: any[], size: number): any;
/**
 * Get evenly spaced samples from array
 * see: https://observablehq.com/@mbostock/evenly-spaced-sampling
 * see also: https://observablehq.com/@jonhelfman/uniform-sampling-variants
 */
export declare function samples(array: any[], size: number): any[];
/**
 * Adds item at `index` and returns array
 * Note: mutates, wrap with immer `produce(array, draft => addItem(draft))` for immutable
 */
export declare function addItem(array: any[], item: any, index: number): any[];
/**
 * Move item `from` index `to` index and returns array
 * Note: mutates, wrap with immer `produce(array, draft => moveItem(draft))` for immutable
 */
export declare function moveItem(array: any[], from: number, to: number): any[];
/**
 * Remove item at `index` returns array (not removed item)
 * Note: mutates, wrap with immer `produce(array, draft => removeItem(draft))` for immutable
 */
export declare function removeItem(array: any[], index: number): any[];
/**
 * Get the greatest absolute value in an array of numbers, and maintain sign of value
 */
export declare function greatestAbs(array: number[]): number | undefined;
//# sourceMappingURL=array.d.ts.map