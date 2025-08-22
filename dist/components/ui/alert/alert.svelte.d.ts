import { type VariantProps } from "tailwind-variants";
export declare const alertVariants: import("tailwind-variants").TVReturnType<{
    variant: {
        default: string;
        destructive: string;
    };
}, undefined, "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", {
    variant: {
        default: string;
        destructive: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    variant: {
        default: string;
        destructive: string;
    };
}, undefined, "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", unknown, unknown, undefined>>;
export type AlertVariant = VariantProps<typeof alertVariants>["variant"];
import type { HTMLAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    variant?: AlertVariant;
};
declare const Alert: import("svelte").Component<$$ComponentProps, {}, "ref">;
type Alert = ReturnType<typeof Alert>;
export default Alert;
