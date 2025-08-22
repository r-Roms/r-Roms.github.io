import { extent as d3extent } from 'd3-array';
import { accessor } from './common.js';
/**
 * Wrapper around d3-array's `extent()` but remove [undefined, undefined] return type
 */
export function extent(iterable) {
    return d3extent(iterable);
}
/**
 * Determine whether two arrays equal one another, order not important.
 * This uses includes instead of converting to a set because this is only
 * used internally on a small array size and it's not worth the cost
 * of making a set
 */
export function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    return arr1.every((k) => {
        return arr2.includes(k);
    });
}
/**
 * Add `lanes` property to each element in the data array support densely packing.
 * This is useful for visualizing overlapping events in a timeline / Gantt chart.
 */
export function applyLanes(data, options = {
    start: 'start',
    end: 'end',
}) {
    const result = [];
    let stack = [];
    const startAccessor = accessor(options.start);
    const endAccessor = accessor(options.end);
    for (const d of data) {
        let lane = stack.findIndex((s) => endAccessor(s) <= startAccessor(d) && startAccessor(s) < startAccessor(d));
        if (lane === -1) {
            lane = stack.length;
        }
        result.push({ ...d, lane });
        stack[lane] = d;
    }
    return result;
}
