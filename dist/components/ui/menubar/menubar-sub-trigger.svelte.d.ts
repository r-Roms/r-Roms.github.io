import { Menubar as MenubarPrimitive } from "bits-ui";
import { type WithoutChild } from "../../../utils.js";
type $$ComponentProps = WithoutChild<MenubarPrimitive.SubTriggerProps> & {
    inset?: boolean;
};
declare const MenubarSubTrigger: import("svelte").Component<$$ComponentProps, {}, "ref">;
type MenubarSubTrigger = ReturnType<typeof MenubarSubTrigger>;
export default MenubarSubTrigger;
