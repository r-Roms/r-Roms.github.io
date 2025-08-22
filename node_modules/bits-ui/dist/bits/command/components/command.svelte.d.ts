import type { CommandRootProps } from "../types.js";
declare const Command: import("svelte").Component<CommandRootProps, {
    /**
         * Sets selection to item at specified index in valid items array.
         * If index is out of bounds, does nothing.
         *
         * @param index - Zero-based index of item to select
         * @remarks
         * Uses `getValidItems()` to get selectable items, filtering out disabled/hidden ones.
         * Access valid items directly via `getValidItems()` to check bounds before calling.
         *
         * @example
         * // get valid items length for bounds check
         * const items = getValidItems()
         * if (index < items.length) {
         *   updateSelectedToIndex(index)
         * }
         */ updateSelectedToIndex: (index: number) => void;
    /**
         * Moves selection to the first valid item in the next/previous group.
         * If no group is found, falls back to selecting the next/previous item globally.
         *
         * @param change - Direction to move: 1 for next group, -1 for previous group
         * @example
         * // move to first item in next group
         * updateSelectedByGroup(1)
         *
         * // move to first item in previous group
         * updateSelectedByGroup(-1)
         */ updateSelectedByGroup: (change: 1 | -1) => void;
    /**
         * Updates selected item by moving up/down relative to current selection.
         * Handles wrapping when loop option is enabled.
         *
         * @param change - Direction to move: 1 for next item, -1 for previous item
         * @remarks
         * The loop behavior wraps:
         * - From last item to first when moving next
         * - From first item to last when moving previous
         *
         * Uses `getValidItems()` to get all selectable items, which filters out disabled/hidden items.
         * You can call `getValidItems()` directly to get the current valid items array.
         *
         * @example
         * // select next item
         * updateSelectedByItem(1)
         *
         * // get all valid items
         * const items = getValidItems()
         */ updateSelectedByItem: (change: number) => void;
    /**
         * Gets all non-disabled, visible command items.
         *
         * @returns Array of valid item elements
         * @remarks Exposed for direct item access and bound checking
         */ getValidItems: () => HTMLElement[];
}, "value" | "ref">;
type Command = ReturnType<typeof Command>;
export default Command;
