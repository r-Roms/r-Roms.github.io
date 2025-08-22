import { untrack } from "svelte";
/**
 * Finds the node with that ID and sets it to the boxed node.
 * Reactive using `$effect` to ensure when the ID or condition changes,
 * an update is triggered and new node is found.
 */
export function useRefById({ id, ref, deps = () => true, onRefChange = () => { }, getRootNode = () => (typeof document !== "undefined" ? document : undefined) }) {
    const dependencies = $derived.by(() => deps());
    const rootNode = $derived.by(() => getRootNode());
    $effect(() => {
        // re-run when the ID changes.
        id.current;
        // re-run when the deps changes.
        dependencies;
        rootNode;
        return untrack(() => {
            const node = rootNode?.getElementById(id.current);
            if (node) {
                ref.current = node;
            }
            else {
                ref.current = null;
            }
            onRefChange(ref.current);
        });
    });
    $effect(() => {
        return () => {
            ref.current = null;
            onRefChange(null);
        };
    });
}
