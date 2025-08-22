import { type WithChildren } from "svelte-toolbelt";
import type { ContentProps } from "./index.js";
declare const DrawerContent: import("svelte").Component<WithChildren<Omit<ContentProps, "children">>, {}, "ref">;
type DrawerContent = ReturnType<typeof DrawerContent>;
export default DrawerContent;
