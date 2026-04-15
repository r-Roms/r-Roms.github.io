export type Side = "top" | "right" | "bottom" | "left";
import { Dialog as SheetPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import SheetPortal from "./sheet-portal.svelte";
import { type WithoutChildrenOrChild } from "../../../utils.js";
import type { ComponentProps } from "svelte";
type $$ComponentProps = WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof SheetPortal>>;
    side?: Side;
    showCloseButton?: boolean;
    children: Snippet;
};
declare const SheetContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type SheetContent = ReturnType<typeof SheetContent>;
export default SheetContent;
