import type { VariantProps } from "tailwind-variants";
import { toggleVariants } from "../toggle/index.js";
type ToggleVariants = VariantProps<typeof toggleVariants>;
interface ToggleGroupContext extends ToggleVariants {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
}
export declare function setToggleGroupCtx(props: ToggleGroupContext): void;
export declare function getToggleGroupCtx(): Required<ToggleGroupContext>;
import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
type $$ComponentProps = ToggleGroupPrimitive.RootProps & ToggleVariants & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
};
declare const ToggleGroup: import("svelte").Component<$$ComponentProps, {}, "ref" | "value">;
type ToggleGroup = ReturnType<typeof ToggleGroup>;
export default ToggleGroup;
