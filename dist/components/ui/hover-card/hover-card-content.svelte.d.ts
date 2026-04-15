import { LinkPreview as HoverCardPrimitive } from "bits-ui";
import { type WithoutChildrenOrChild } from "../../../utils.js";
import HoverCardPortal from "./hover-card-portal.svelte";
import type { ComponentProps } from "svelte";
type $$ComponentProps = HoverCardPrimitive.ContentProps & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof HoverCardPortal>>;
};
declare const HoverCardContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type HoverCardContent = ReturnType<typeof HoverCardContent>;
export default HoverCardContent;
