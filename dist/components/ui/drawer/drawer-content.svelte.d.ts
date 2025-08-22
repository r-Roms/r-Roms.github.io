import { Drawer as DrawerPrimitive } from "vaul-svelte";
type $$ComponentProps = DrawerPrimitive.ContentProps & {
    portalProps?: DrawerPrimitive.PortalProps;
};
declare const DrawerContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type DrawerContent = ReturnType<typeof DrawerContent>;
export default DrawerContent;
