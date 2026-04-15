import { Menubar as MenubarPrimitive } from "bits-ui";
import { type WithoutChild } from "../../../utils.js";
type $$ComponentProps = WithoutChild<MenubarPrimitive.RadioItemProps> & {
    inset?: boolean;
};
declare const MenubarRadioItem: import("svelte").Component<$$ComponentProps, {}, "ref">;
type MenubarRadioItem = ReturnType<typeof MenubarRadioItem>;
export default MenubarRadioItem;
