import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import ContextMenuPortal from "./context-menu-portal.svelte";
import type { ComponentProps } from "svelte";
import type { WithoutChildrenOrChild } from "../../../utils.js";
type $$ComponentProps = ContextMenuPrimitive.ContentProps & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof ContextMenuPortal>>;
};
declare const ContextMenuContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ContextMenuContent = ReturnType<typeof ContextMenuContent>;
export default ContextMenuContent;
