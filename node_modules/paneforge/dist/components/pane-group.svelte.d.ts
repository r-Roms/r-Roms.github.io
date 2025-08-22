import type { PaneGroupProps } from "./types.js";
declare const PaneGroup: import("svelte").Component<PaneGroupProps, {
    getLayout: () => number[];
    setLayout: (newLayout: number[]) => void;
    getId: () => string;
}, "ref">;
type PaneGroup = ReturnType<typeof PaneGroup>;
export default PaneGroup;
