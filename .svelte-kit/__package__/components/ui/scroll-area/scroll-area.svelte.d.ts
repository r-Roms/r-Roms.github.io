import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
import { type WithoutChild } from "../../../utils.js";
type $$ComponentProps = WithoutChild<ScrollAreaPrimitive.RootProps> & {
    orientation?: "vertical" | "horizontal" | "both" | undefined;
    scrollbarXClasses?: string | undefined;
    scrollbarYClasses?: string | undefined;
    viewportRef?: HTMLElement | null;
};
declare const ScrollArea: import("svelte").Component<$$ComponentProps, {}, "ref" | "viewportRef">;
type ScrollArea = ReturnType<typeof ScrollArea>;
export default ScrollArea;
