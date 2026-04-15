import { Command as CommandPrimitive } from "bits-ui";
export type CommandRootApi = CommandPrimitive.Root;
type $$ComponentProps = CommandPrimitive.RootProps & {
    api?: CommandRootApi | null;
};
declare const Command: import("svelte").Component<$$ComponentProps, {}, "ref" | "value" | "api">;
type Command = ReturnType<typeof Command>;
export default Command;
