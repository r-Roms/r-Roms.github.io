import { type VariantProps } from "tailwind-variants";
export declare const badgeVariants: import("tailwind-variants").TVReturnType<{
    variant: {
        default: string;
        secondary: string;
        destructive: string;
        outline: string;
    };
}, undefined, "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3", {
    variant: {
        default: string;
        secondary: string;
        destructive: string;
        outline: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    variant: {
        default: string;
        secondary: string;
        destructive: string;
        outline: string;
    };
}, undefined, "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3", unknown, unknown, undefined>>;
export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
import type { HTMLAnchorAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAnchorAttributes> & {
    variant?: BadgeVariant;
};
declare const Badge: import("svelte").Component<$$ComponentProps, {}, "ref">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
