import { Select as SelectPrimitive } from "bits-ui";
import { type WithoutChild } from "../../../utils.js";
type $$ComponentProps = WithoutChild<SelectPrimitive.TriggerProps> & {
    size?: "sm" | "default";
};
declare const SelectTrigger: import("svelte").Component<$$ComponentProps, {}, "ref">;
type SelectTrigger = ReturnType<typeof SelectTrigger>;
export default SelectTrigger;
