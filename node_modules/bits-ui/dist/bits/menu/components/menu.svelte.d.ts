import type { MenuRootProps } from "../types.js";
type $$ComponentProps = MenuRootProps & {
    _internal_variant?: "context-menu" | "dropdown-menu" | "menubar";
};
declare const Menu: import("svelte").Component<$$ComponentProps, {}, "open">;
type Menu = ReturnType<typeof Menu>;
export default Menu;
