import { type WithElementRef } from "../../../utils.js";
import type { HTMLAttributes } from "svelte/elements";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    inset?: boolean;
};
declare const ContextMenuLabel: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ContextMenuLabel = ReturnType<typeof ContextMenuLabel>;
export default ContextMenuLabel;
