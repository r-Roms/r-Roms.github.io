import type { HTMLAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    size?: "default" | "sm";
};
declare const Card: import("svelte").Component<$$ComponentProps, {}, "ref">;
type Card = ReturnType<typeof Card>;
export default Card;
