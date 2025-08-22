import { type Snippet } from "svelte";
import type { NavigationMenuContentProps } from "../types.js";
import { NavigationMenuItemState } from "../navigation-menu.svelte.js";
type $$ComponentProps = Omit<NavigationMenuContentProps, "child"> & {
    itemState?: NavigationMenuItemState;
    onRefChange?: (ref: HTMLElement | null) => void;
    child?: Snippet<[{
        props: Record<string, unknown>;
    }]>;
};
declare const NavigationMenuContentImpl: import("svelte").Component<$$ComponentProps, {}, "ref">;
type NavigationMenuContentImpl = ReturnType<typeof NavigationMenuContentImpl>;
export default NavigationMenuContentImpl;
