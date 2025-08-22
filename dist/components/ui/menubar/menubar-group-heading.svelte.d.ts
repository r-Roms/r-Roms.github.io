import { Menubar as MenubarPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
type $$ComponentProps = ComponentProps<typeof MenubarPrimitive.GroupHeading> & {
    inset?: boolean;
};
declare const MenubarGroupHeading: import("svelte").Component<$$ComponentProps, {}, "ref">;
type MenubarGroupHeading = ReturnType<typeof MenubarGroupHeading>;
export default MenubarGroupHeading;
