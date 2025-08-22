import { watch } from "runed";
import { onDestroyEffect } from "./on-destroy-effect.svelte.js";
/**
 * Finds the node with that ID and sets it to the boxed node.
 * Reactive using `$effect` to ensure when the ID or deps change,
 * an update is triggered and new node is found.
 */
export function useRefById({ id, ref, deps = () => true, onRefChange, getRootNode }) {
    watch([() => id.current, deps], ([_id]) => {
        const rootNode = getRootNode?.() ?? document;
        const node = rootNode?.getElementById(_id);
        if (node)
            ref.current = node;
        else
            ref.current = null;
        onRefChange?.(ref.current);
    });
    onDestroyEffect(() => {
        ref.current = null;
        onRefChange?.(null);
    });
}
