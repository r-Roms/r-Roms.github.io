import { Menubar as MenubarPrimitive } from "bits-ui";
declare const MenubarRadioItem: import("svelte").Component<Omit<MenubarPrimitive.RadioItemProps, "child">, {}, "ref">;
type MenubarRadioItem = ReturnType<typeof MenubarRadioItem>;
export default MenubarRadioItem;
