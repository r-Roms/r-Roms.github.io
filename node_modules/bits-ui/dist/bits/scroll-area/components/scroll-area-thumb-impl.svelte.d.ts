import type { ScrollAreaThumbProps } from "../types.js";
type $$ComponentProps = Omit<ScrollAreaThumbProps, "forceMount" | "id"> & {
    id: string;
    present: boolean;
};
declare const ScrollAreaThumbImpl: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ScrollAreaThumbImpl = ReturnType<typeof ScrollAreaThumbImpl>;
export default ScrollAreaThumbImpl;
