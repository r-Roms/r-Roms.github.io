import { type PropAccessorArg } from './object.js';
export declare function sortFunc(value?: PropAccessorArg, direction?: 'asc' | 'desc'): (a: any, b: any) => number;
export declare function compoundSortFunc(...sortFns: {
    (a: any, b: any): any;
}[]): (a: any, b: any) => any;
/** Make a shallow copy and appy sort */
export declare function sort<T = any>(data: Array<T>, value?: PropAccessorArg, direction?: 'asc' | 'desc'): T[];
export declare function nestedSort(data: Array<{
    values?: object[];
}>, sortFunc: (a: object, b: object, depth: number) => number, depth?: number): {
    values?: object[];
}[];
//# sourceMappingURL=sort.d.ts.map