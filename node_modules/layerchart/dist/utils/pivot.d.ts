/**
 * Pivot longer (columns to rows)
 *  - see: https://observablehq.com/d/3ea8d446f5ba96fe
 *  - see also: https://observablehq.com/d/ac2a320cf2b0adc4 as generator
 */
export declare function pivotLonger(data: any[], columns: string[], name: string, value: string): any[];
/**
 * Pivot wider (rows to columns)
 *  - see: https://github.com/d3/d3-array/issues/142#issuecomment-761861983
 */
export declare function pivotWider(data: any[], column: string, name: string, value: string): any[];
