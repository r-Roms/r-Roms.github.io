import { type ThresholdNumberArrayGenerator } from 'd3-array';
/**
 * Useful threshold function when using Dates
 * https://observablehq.com/@d3/d3-bin-time-thresholds
 */
export declare function thresholdTime(n: number): ThresholdNumberArrayGenerator<number>;
/**
 * Explicit threshold chunks without nicing (not recommended)
 * see: https://observablehq.com/@d3/d3-bin#bin26
 */
export declare function thresholdChunks(chunks: number): (data: number[], min: number, max: number) => number[];
