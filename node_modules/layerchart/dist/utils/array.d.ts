import type { Numeric } from 'd3-array';
import { extent as d3extent } from 'd3-array';
import { type Accessor } from './common.js';
/**
 * Wrapper around d3-array's `extent()` but remove [undefined, undefined] return type
 */
export declare function extent<T extends Numeric>(iterable: Parameters<typeof d3extent<T>>[0]): [T, T];
/**
 * Determine whether two arrays equal one another, order not important.
 * This uses includes instead of converting to a set because this is only
 * used internally on a small array size and it's not worth the cost
 * of making a set
 */
export declare function arraysEqual(arr1: unknown[], arr2: unknown[]): boolean;
/**
 * Add `lanes` property to each element in the data array support densely packing.
 * This is useful for visualizing overlapping events in a timeline / Gantt chart.
 */
export declare function applyLanes<T extends Record<string, any>>(data: T[], options?: {
    start: Accessor<T>;
    end: Accessor<T>;
}): (T & {
    lane: number;
})[];
