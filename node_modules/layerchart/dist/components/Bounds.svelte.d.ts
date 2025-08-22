import type { Snippet } from 'svelte';
import type { MotionProp } from '../utils/motion.svelte.js';
export type BoundsExtents = Partial<{
    x0: number;
    y0: number;
    x1: number;
    y1: number;
}>;
export type BoundsExtentsAccessor = (dimensions: {
    width: number;
    height: number;
}) => BoundsExtents;
export type BoundsProps = {
    domain?: BoundsExtents | BoundsExtentsAccessor | null;
    range?: BoundsExtents | BoundsExtentsAccessor | null;
    children?: Snippet<[{
        xScale: AnyScale;
        yScale: AnyScale;
    }]>;
    motion?: MotionProp;
};
import { type AnyScale } from '../utils/scales.svelte.js';
declare const Bounds: import("svelte").Component<BoundsProps, {}, "">;
type Bounds = ReturnType<typeof Bounds>;
export default Bounds;
