import { type WithElementRef } from "../../../utils.js";
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
import { type VariantProps } from "tailwind-variants";
export declare const buttonVariants: import("tailwind-variants").TVReturnType<{
    variant: {
        default: string;
        outline: string;
        secondary: string;
        ghost: string;
        destructive: string;
        link: string;
    };
    size: {
        default: string;
        xs: string;
        sm: string;
        lg: string;
        icon: string;
        "icon-xs": string;
        "icon-sm": string;
        "icon-lg": string;
    };
}, undefined, "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-lg border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
    variant: {
        default: string;
        outline: string;
        secondary: string;
        ghost: string;
        destructive: string;
        link: string;
    };
    size: {
        default: string;
        xs: string;
        sm: string;
        lg: string;
        icon: string;
        "icon-xs": string;
        "icon-sm": string;
        "icon-lg": string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    variant: {
        default: string;
        outline: string;
        secondary: string;
        ghost: string;
        destructive: string;
        link: string;
    };
    size: {
        default: string;
        xs: string;
        sm: string;
        lg: string;
        icon: string;
        "icon-xs": string;
        "icon-sm": string;
        "icon-lg": string;
    };
}, undefined, "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-lg border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", unknown, unknown, undefined>>;
export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];
export type ButtonProps = WithElementRef<HTMLButtonAttributes> & WithElementRef<HTMLAnchorAttributes> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
};
declare const Button: import("svelte").Component<ButtonProps, {}, "ref">;
type Button = ReturnType<typeof Button>;
export default Button;
