import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import { type WithoutChild } from "../../../utils.js";
type $$ComponentProps = WithoutChild<ContextMenuPrimitive.RadioItemProps> & {
    inset?: boolean;
};
declare const ContextMenuRadioItem: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ContextMenuRadioItem = ReturnType<typeof ContextMenuRadioItem>;
export default ContextMenuRadioItem;
