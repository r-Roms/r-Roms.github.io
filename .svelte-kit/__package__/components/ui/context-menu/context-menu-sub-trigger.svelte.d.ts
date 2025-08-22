import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import { type WithoutChild } from "../../../utils.js";
type $$ComponentProps = WithoutChild<ContextMenuPrimitive.SubTriggerProps> & {
    inset?: boolean;
};
declare const ContextMenuSubTrigger: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ContextMenuSubTrigger = ReturnType<typeof ContextMenuSubTrigger>;
export default ContextMenuSubTrigger;
