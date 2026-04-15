import { type VariantProps } from "tailwind-variants";
declare const inputGroupButtonVariants: import("tailwind-variants").TVReturnType<{
    size: {
        xs: string;
        sm: string;
        "icon-xs": string;
        "icon-sm": string;
    };
}, undefined, "gap-2 text-sm flex items-center shadow-none", {
    size: {
        xs: string;
        sm: string;
        "icon-xs": string;
        "icon-sm": string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    size: {
        xs: string;
        sm: string;
        "icon-xs": string;
        "icon-sm": string;
    };
}, undefined, "gap-2 text-sm flex items-center shadow-none", unknown, unknown, undefined>>;
export type InputGroupButtonSize = VariantProps<typeof inputGroupButtonVariants>["size"];
import type { ComponentProps } from "svelte";
import { Button } from "../button/index.js";
type $$ComponentProps = Omit<ComponentProps<typeof Button>, "href" | "size"> & {
    size?: InputGroupButtonSize;
};
declare const InputGroupButton: import("svelte").Component<$$ComponentProps, {}, "ref">;
type InputGroupButton = ReturnType<typeof InputGroupButton>;
export default InputGroupButton;
