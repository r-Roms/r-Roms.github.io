type Props = Record<string, unknown>;
type PropsArg = Props | null | undefined;
type TupleTypes<T> = {
    [P in keyof T]: T[P];
} extends {
    [key: number]: infer V;
} ? NullToObject<V> : never;
type NullToObject<T> = T extends null | undefined ? {} : T;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
/**
 * Given a list of prop objects, merges them into a single object.
 * - Automatically composes event handlers (e.g. `onclick`, `oninput`, etc.)
 * - Chains regular functions with the same name so they are called in order
 * - Merges class strings with `clsx`
 * - Merges style objects and converts them to strings
 * - Handles a bug with Svelte where setting the `hidden` attribute to `false` doesn't remove it
 * - Overrides other values with the last one
 */
export declare function mergeProps<T extends PropsArg[]>(...args: T): UnionToIntersection<TupleTypes<T>> & {
    style?: string;
};
export {};
