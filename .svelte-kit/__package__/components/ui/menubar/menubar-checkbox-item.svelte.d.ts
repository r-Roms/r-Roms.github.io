import { Menubar as MenubarPrimitive } from "bits-ui";
import { type WithoutChildrenOrChild } from "../../../utils.js";
import type { Snippet } from "svelte";
type $$ComponentProps = WithoutChildrenOrChild<MenubarPrimitive.CheckboxItemProps> & {
    children?: Snippet;
};
declare const MenubarCheckboxItem: import("svelte").Component<$$ComponentProps, {}, "ref" | "checked" | "indeterminate">;
type MenubarCheckboxItem = ReturnType<typeof MenubarCheckboxItem>;
export default MenubarCheckboxItem;
