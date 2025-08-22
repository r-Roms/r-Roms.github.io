import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
type $$ComponentProps = ContextMenuPrimitive.ItemProps & {
    inset?: boolean;
    variant?: "default" | "destructive";
};
declare const ContextMenuItem: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ContextMenuItem = ReturnType<typeof ContextMenuItem>;
export default ContextMenuItem;
