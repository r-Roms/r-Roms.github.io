import type { Getter } from "../types.js";
/**
 * Simple helper function to sync a read-only dependency with writable state. This only syncs
 * in one direction, from the dependency to the state. If you need to sync both directions, you
 * should use the `box.with(() => dep, (v) => (dep = v))` pattern.
 *
 * @param getDep - A getter that returns the value that may change and whose new value will be
 * passed to the `onChange` function passed as the second argument.
 * @param onChange - A function that accepts a new value to react to or keep other state in sync
 * with the dependency.
 */
export declare function useOnChange<T>(getDep: Getter<T>, onChange: (value: T) => void): void;
