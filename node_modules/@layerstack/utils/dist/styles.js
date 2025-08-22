import { entries } from './typeHelpers.js';
import { toKebabCase } from './string.js';
/**
 * Convert object to style string
 */
export function objectToString(styleObj) {
    return entries(styleObj)
        .map(([key, value]) => {
        if (value) {
            // Convert camelCase into kaboob-case (ex.  (transformOrigin => transform-origin))
            const propertyName = toKebabCase(key);
            return `${propertyName}: ${value};`;
        }
        else {
            return null;
        }
    })
        .filter((x) => x)
        .join(' ');
}
