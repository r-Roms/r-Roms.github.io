import { Menubar as MenubarPrimitive } from "bits-ui";
type $$ComponentProps = MenubarPrimitive.ItemProps & {
    inset?: boolean;
    variant?: "default" | "destructive";
};
declare const MenubarItem: import("svelte").Component<$$ComponentProps, {}, "ref">;
type MenubarItem = ReturnType<typeof MenubarItem>;
export default MenubarItem;
