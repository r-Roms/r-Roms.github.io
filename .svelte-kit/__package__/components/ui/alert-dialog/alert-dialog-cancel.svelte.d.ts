import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import { type ButtonVariant, type ButtonSize } from "../button/index.js";
type $$ComponentProps = AlertDialogPrimitive.CancelProps & {
    variant?: ButtonVariant;
    size?: ButtonSize;
};
declare const AlertDialogCancel: import("svelte").Component<$$ComponentProps, {}, "ref">;
type AlertDialogCancel = ReturnType<typeof AlertDialogCancel>;
export default AlertDialogCancel;
