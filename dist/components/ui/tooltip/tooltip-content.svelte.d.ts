import { Tooltip as TooltipPrimitive } from "bits-ui";
import TooltipPortal from "./tooltip-portal.svelte";
import type { ComponentProps } from "svelte";
import type { WithoutChildrenOrChild } from "../../../utils.js";
type $$ComponentProps = TooltipPrimitive.ContentProps & {
    arrowClasses?: string;
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof TooltipPortal>>;
};
declare const TooltipContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type TooltipContent = ReturnType<typeof TooltipContent>;
export default TooltipContent;
