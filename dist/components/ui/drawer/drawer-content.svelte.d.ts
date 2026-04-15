import { Drawer as DrawerPrimitive } from "vaul-svelte";
import DrawerPortal from "./drawer-portal.svelte";
import type { ComponentProps } from "svelte";
import type { WithoutChildrenOrChild } from "../../../utils.js";
type $$ComponentProps = DrawerPrimitive.ContentProps & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DrawerPortal>>;
};
declare const DrawerContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type DrawerContent = ReturnType<typeof DrawerContent>;
export default DrawerContent;
