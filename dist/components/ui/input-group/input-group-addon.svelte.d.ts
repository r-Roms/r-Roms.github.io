import { type VariantProps } from "tailwind-variants";
export declare const inputGroupAddonVariants: import("tailwind-variants").TVReturnType<{
    align: {
        "inline-start": string;
        "inline-end": string;
        "block-start": string;
        "block-end": string;
    };
}, undefined, "text-muted-foreground h-auto gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 flex cursor-text items-center justify-center select-none", {
    align: {
        "inline-start": string;
        "inline-end": string;
        "block-start": string;
        "block-end": string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    align: {
        "inline-start": string;
        "inline-end": string;
        "block-start": string;
        "block-end": string;
    };
}, undefined, "text-muted-foreground h-auto gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 flex cursor-text items-center justify-center select-none", unknown, unknown, undefined>>;
export type InputGroupAddonAlign = VariantProps<typeof inputGroupAddonVariants>["align"];
import { type WithElementRef } from "../../../utils.js";
import type { HTMLAttributes } from "svelte/elements";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    align?: InputGroupAddonAlign;
};
declare const InputGroupAddon: import("svelte").Component<$$ComponentProps, {}, "ref">;
type InputGroupAddon = ReturnType<typeof InputGroupAddon>;
export default InputGroupAddon;
