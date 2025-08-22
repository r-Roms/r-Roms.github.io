declare const DrawerNested: import("svelte").Component<Omit<import("./types").DrawerRootPropsWithoutHTML, "onRelease" | "nested" | "onClose">, {}, "open" | "activeSnapPoint">;
type DrawerNested = ReturnType<typeof DrawerNested>;
export default DrawerNested;
