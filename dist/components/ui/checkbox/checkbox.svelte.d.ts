import { Checkbox as CheckboxPrimitive } from "bits-ui";
declare const Checkbox: import("svelte").Component<Omit<Omit<CheckboxPrimitive.RootProps, "child">, "children">, {}, "ref" | "checked" | "indeterminate">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
