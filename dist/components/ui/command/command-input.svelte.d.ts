import { Command as CommandPrimitive } from "bits-ui";
declare const CommandInput: import("svelte").Component<CommandPrimitive.InputProps, {}, "ref" | "value">;
type CommandInput = ReturnType<typeof CommandInput>;
export default CommandInput;
