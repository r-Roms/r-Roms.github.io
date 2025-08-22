// https://basarat.gitbooks.io/typescript/docs/types/never.html#use-case-exhaustive-checks
// https://www.typescriptlang.org/docs/handbook/basic-types.html#never
export function fail(message) {
    throw new Error(message);
}
// Get keys of object (strongly-typed)
// Reason Object.keys() isn't like this by default due to runtime properties: https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
export function keys(o) {
    return Object.keys(o);
}
// @ts-expect-error
export function entries(o) {
    if (o instanceof Map)
        return Array.from(o.entries());
    return Object.entries(o); // TODO: Improve based on key/value pair - https://stackoverflow.com/questions/60141960/typescript-key-value-relation-preserving-object-entries-type
}
// Get object from entries (array of [key, value] arrays) (strongly-typed)
export function fromEntries(entries) {
    return Object.fromEntries(entries);
}
// https://github.com/Microsoft/TypeScript/issues/17198#issuecomment-315400819
export function enumKeys(E) {
    return keys(E).filter((k) => typeof E[k] === 'number'); // ["A", "B"]
}
export function enumValues(E) {
    const keys = enumKeys(E);
    return keys.map((k) => E[k]); // [0, 1]
}
/**
 * util to make sure we have handled all enum cases in a switch statement
 * Just add at the end of the switch statement a `default` like this:
 *
 * ```ts
 * switch (periodType) {
 *   case xxx:
 *     ...
 *
 *   default:
 *     assertNever(periodType); // This will now report unhandled cases
 * }
 * ```
 */
export function assertNever(x) {
    throw new Error(`Unhandled enum case: ${x}`);
}
