import type { Command as CommandPrimitive, Dialog as DialogPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import type { WithoutChildrenOrChild } from "../../../utils.js";
type $$ComponentProps = WithoutChildrenOrChild<DialogPrimitive.RootProps> & WithoutChildrenOrChild<CommandPrimitive.RootProps> & {
    portalProps?: DialogPrimitive.PortalProps;
    children: Snippet;
    title?: string;
    description?: string;
};
declare const CommandDialog: import("svelte").Component<$$ComponentProps, {}, "ref" | "value" | "open">;
type CommandDialog = ReturnType<typeof CommandDialog>;
export default CommandDialog;
