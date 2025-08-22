import { type WithChildren } from "svelte-toolbelt";
import type { OverlayProps } from "./index.js";
declare const DrawerOverlay: import("svelte").Component<WithChildren<Omit<OverlayProps, "children">>, {}, "ref">;
type DrawerOverlay = ReturnType<typeof DrawerOverlay>;
export default DrawerOverlay;
