declare const wrap: <T extends Array<unknown>, U>(fn: (...args: T) => U) => (...args: T) => U;
declare const memoize: typeof wrap;
export { memoize };
