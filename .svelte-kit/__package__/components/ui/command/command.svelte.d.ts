import { Command as CommandPrimitive } from "bits-ui";
declare const Command: import("svelte").Component<CommandPrimitive.RootProps, {}, "ref" | "value">;
type Command = ReturnType<typeof Command>;
export default Command;
