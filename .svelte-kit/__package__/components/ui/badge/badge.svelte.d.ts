import { type VariantProps } from "tailwind-variants";
export declare const badgeVariants: import("tailwind-variants").TVReturnType<{
    variant: {
        default: string;
        secondary: string;
        destructive: string;
        outline: string;
        ghost: string;
        link: string;
    };
}, undefined, "h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap transition-colors focus-visible:ring-[3px] [&>svg]:pointer-events-none", {
    variant: {
        default: string;
        secondary: string;
        destructive: string;
        outline: string;
        ghost: string;
        link: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    variant: {
        default: string;
        secondary: string;
        destructive: string;
        outline: string;
        ghost: string;
        link: string;
    };
}, undefined, "h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap transition-colors focus-visible:ring-[3px] [&>svg]:pointer-events-none", unknown, unknown, undefined>>;
export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
import type { HTMLAnchorAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAnchorAttributes> & {
    variant?: BadgeVariant;
};
declare const Badge: import("svelte").Component<$$ComponentProps, {}, "ref">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
