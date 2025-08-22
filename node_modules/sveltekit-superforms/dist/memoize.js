// @ts-expect-error No type information exists
import baseMemoize from 'memoize-weak';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wrap = (fn) => {
    return (...args) => fn(...args);
};
const memoize = baseMemoize;
export { memoize };
