import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
declare const ScrollAreaScrollbar: import("svelte").Component<Omit<ScrollAreaPrimitive.ScrollbarProps, "child">, {}, "ref">;
type ScrollAreaScrollbar = ReturnType<typeof ScrollAreaScrollbar>;
export default ScrollAreaScrollbar;
