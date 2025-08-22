import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
import { type ToggleVariants } from "../toggle/index.js";
type $$ComponentProps = ToggleGroupPrimitive.ItemProps & ToggleVariants;
declare const ToggleGroupItem: import("svelte").Component<$$ComponentProps, {}, "ref" | "value">;
type ToggleGroupItem = ReturnType<typeof ToggleGroupItem>;
export default ToggleGroupItem;
