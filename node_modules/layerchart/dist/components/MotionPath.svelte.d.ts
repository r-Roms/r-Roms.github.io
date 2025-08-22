import type { Snippet } from 'svelte';
export type MotionPathPropsWithoutHTML = {
    /**
     * Id of path to move object along
     */
    pathId?: string;
    /**
     * Id of object to move along path
     */
    objectId?: string;
    /**
     * Duration of the animation
     */
    duration: string;
    /**
     * Number of times the animation will occur
     */
    repeatCount?: number | 'indefinite';
    /**
     * Final state of the animation.  Freeze (last frame) or remove (first frame)
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill#animate
     *
     * @default 'freeze'
     */
    fill?: 'freeze' | 'remove';
    /**
     * Rotation applied to the element animated along a path, usually to make it pointing
     * in the direction of the animation
     */
    rotate?: number | 'auto' | 'auto-reverse';
    /**
     * A bindable reference to the underlying `<animateMotion>` element.
     *
     * @bindable
     */
    ref?: SVGAnimateMotionElement;
    children?: Snippet<[{
        pathId: string;
        objectId: string;
    }]>;
};
export type MotionPathProps = MotionPathPropsWithoutHTML & Without<Omit<SVGAttributes<SVGAnimateMotionElement>, 'dir' | 'href'>, MotionPathPropsWithoutHTML>;
import type { Without } from '../utils/types.js';
import type { SVGAttributes } from 'svelte/elements';
declare const MotionPath: import("svelte").Component<MotionPathPropsWithoutHTML, {}, "ref">;
type MotionPath = ReturnType<typeof MotionPath>;
export default MotionPath;
