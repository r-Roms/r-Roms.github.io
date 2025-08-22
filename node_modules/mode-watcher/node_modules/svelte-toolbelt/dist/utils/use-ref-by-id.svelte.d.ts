import type { WritableBox } from "../box/box.svelte.js";
import type { Box, Getter } from "../types.js";
type UseRefByIdProps = {
    /**
     * The ID of the node to find.
     */
    id: Box<string>;
    /**
     * The ref to set the node to.
     */
    ref: WritableBox<HTMLElement | null>;
    /**
     * A reactive condition that will cause the node to be set.
     */
    deps?: Getter<unknown>;
    /**
     * A callback fired when the ref changes.
     */
    onRefChange?: (node: HTMLElement | null) => void;
    /**
     * A function that returns the root node to search for the element by ID.
     * Defaults to `() => document`.
     */
    getRootNode?: Getter<Document | ShadowRoot | undefined>;
};
/**
 * Finds the node with that ID and sets it to the boxed node.
 * Reactive using `$effect` to ensure when the ID or deps change,
 * an update is triggered and new node is found.
 */
export declare function useRefById({ id, ref, deps, onRefChange, getRootNode }: UseRefByIdProps): void;
export {};
