import type { PaneProps } from "./types.js";
declare const Pane: import("svelte").Component<PaneProps, {
    collapse: () => void;
    expand: () => void;
    getSize: () => number;
    isCollapsed: () => boolean;
    isExpanded: () => boolean;
    resize: (size: number) => void;
    getId: () => string;
}, "ref">;
type Pane = ReturnType<typeof Pane>;
export default Pane;
