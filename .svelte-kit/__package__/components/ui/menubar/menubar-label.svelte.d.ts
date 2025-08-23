import { type WithElementRef } from "bits-ui";
import type { HTMLAttributes } from "svelte/elements";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLElement>> & {
    inset?: boolean;
};
declare const MenubarLabel: import("svelte").Component<$$ComponentProps, {}, "ref">;
type MenubarLabel = ReturnType<typeof MenubarLabel>;
export default MenubarLabel;
