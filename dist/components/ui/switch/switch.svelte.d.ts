import { Switch as SwitchPrimitive } from "bits-ui";
import { type WithoutChildrenOrChild } from "../../../utils.js";
type $$ComponentProps = WithoutChildrenOrChild<SwitchPrimitive.RootProps> & {
    size?: "sm" | "default";
};
declare const Switch: import("svelte").Component<$$ComponentProps, {}, "ref" | "checked">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
