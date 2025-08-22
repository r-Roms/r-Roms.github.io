import { Progress as ProgressPrimitive } from "bits-ui";
declare const Progress: import("svelte").Component<Omit<Omit<ProgressPrimitive.RootProps, "child">, "children">, {}, "ref">;
type Progress = ReturnType<typeof Progress>;
export default Progress;
