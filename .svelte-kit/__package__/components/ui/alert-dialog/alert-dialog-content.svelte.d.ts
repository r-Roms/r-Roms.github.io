import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import AlertDialogPortal from "./alert-dialog-portal.svelte";
import { type WithoutChild, type WithoutChildrenOrChild } from "../../../utils.js";
import type { ComponentProps } from "svelte";
type $$ComponentProps = WithoutChild<AlertDialogPrimitive.ContentProps> & {
    size?: "default" | "sm";
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof AlertDialogPortal>>;
};
declare const AlertDialogContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type AlertDialogContent = ReturnType<typeof AlertDialogContent>;
export default AlertDialogContent;
