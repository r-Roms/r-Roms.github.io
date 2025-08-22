import type { DomainType } from './scales.svelte.js';
import type { AxisKey, BaseRange, DataType, Extents, FieldAccessors, Nice, PaddingArray } from './types.js';
import type { AnyScale } from './scales.svelte.js';
/**
 * Creates a function to calculate a domain based on extents and a domain directive.
 * @param s The key (e.g., 'x', 'y') to look up in the extents object
 * @returns A function that computes the final domain from extents and a domain input
 */
export declare function calcDomain<K extends AxisKey>(s: K, extents: Extents, domain: DomainType | undefined): number[];
/**
 * If we have a domain from settings (the directive), fill in
 * any null values with ones from our measured extents;
 * otherwise, return the measured extent.
 * @param domain A two-value array of numbers representing the measured extent
 * @param directive A two-value array of numbers or nulls that will have any nulls filled in from the `domain` array
 * @returns A two-value array of numbers representing the filled-in domain
 */
export declare function partialDomain(domain?: number[] | undefined, directive?: Array<number | null>): number[];
type CreateChartScaleOpts = {
    domain: number[];
    scale: AnyScale & {
        interpolator?: () => {
            name: string;
        };
        nice?: (nice?: number) => void;
    };
    padding: PaddingArray | undefined;
    nice: Nice;
    reverse: boolean;
    width: number;
    height: number;
    range: BaseRange | undefined;
    percentRange: boolean;
    extents: Extents;
};
export declare function createChartScale(axis: AxisKey, { domain, scale, padding, nice, reverse, width, height, range, percentRange, }: CreateChartScaleOpts): AnyScale;
/**
 * Get a D3 scale name
 * https://svelte.dev/repl/ec6491055208401ca41120c9c8a67737?version=3.49.0
 */
export declare function findScaleName(scale: any): string;
interface ScaleInfo {
    scale: AnyScale;
    sort?: boolean;
}
interface ActiveScales {
    [key: string]: ScaleInfo;
}
/**
 * Calculates scale extents for given data and scales
 * @template T The type of data objects in the input array
 * @param {T[]} flatData Array of data objects
 * @param {FieldAccessors<T>} getters Field accessor functions
 * @param {ActiveScales} activeScales Object containing scale information
 * @returns {Extents} Calculated extents for each scale
 */
export declare function calcScaleExtents<T>(flatData: DataType<T>, getters: FieldAccessors<T>, activeScales: ActiveScales): UniqueResults;
export interface UniqueResults {
    x?: (number | string)[];
    y?: (number | string)[];
    z?: (number | string)[];
    r?: (number | string)[];
}
export declare function identity<T>(d: T): T;
export declare function createGetter<TData>(accessor: (d: TData) => any, scale: AnyScale | null): (d: TData) => any;
/**
 * Move an element to the last child of its parent.
 * Adapted from d3-selection `.raise`
 */
export declare function raise(node: Element): void;
/**
 * Flatten arrays of arrays one level deep
 * @param list The list to flatten
 * @param accessor An optional accessor function or string property key
 * @returns Flattened array
 */
export default function flatten<T, U>(list: T[], accessor?: string | ((item: T) => U[])): U[];
export {};
