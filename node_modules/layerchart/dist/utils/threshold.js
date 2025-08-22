import { range } from 'd3-array';
import { scaleTime } from 'd3-scale';
/**
 * Useful threshold function when using Dates
 * https://observablehq.com/@d3/d3-bin-time-thresholds
 */
export function thresholdTime(n) {
    // TODO: Unable to satisfy `ThresholdNumberArrayGenerator<Value extends number>` with `Date`
    // @ts-expect-error
    return (data, min, max) => {
        return scaleTime().domain([min, max]).ticks(n);
    };
}
/**
 * Explicit threshold chunks without nicing (not recommended)
 * see: https://observablehq.com/@d3/d3-bin#bin26
 */
export function thresholdChunks(chunks) {
    return (data, min, max) => range(chunks).map((t) => min + (t / chunks) * (max - min));
}
