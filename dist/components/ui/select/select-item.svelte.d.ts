import { Select as SelectPrimitive } from "bits-ui";
declare const SelectItem: import("svelte").Component<Omit<SelectPrimitive.ItemProps, "child">, {}, "ref">;
type SelectItem = ReturnType<typeof SelectItem>;
export default SelectItem;
