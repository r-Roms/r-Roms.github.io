import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
import { type WithoutChildrenOrChild } from "../../../utils.js";
import type { Snippet } from "svelte";
type $$ComponentProps = WithoutChildrenOrChild<DropdownMenuPrimitive.CheckboxItemProps> & {
    children?: Snippet;
};
declare const DropdownMenuCheckboxItem: import("svelte").Component<$$ComponentProps, {}, "ref" | "checked" | "indeterminate">;
type DropdownMenuCheckboxItem = ReturnType<typeof DropdownMenuCheckboxItem>;
export default DropdownMenuCheckboxItem;
