/**
 * Sanitizes an array of classnames by removing any empty strings.
 */
export function sanitizeClassNames(classNames) {
    return classNames.filter((className) => className.length > 0);
}
export const noopStorage = {
    getItem: (_key) => null,
    setItem: (_key, _value) => { },
};
export const isBrowser = typeof document !== "undefined";
