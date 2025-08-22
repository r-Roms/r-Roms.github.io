import type { Without } from '../utils/types.js';
import type { SVGAttributes } from 'svelte/elements';
export type ColorRampPropsWithoutHTML = {
    /**
     * The interpolator function to use for the color ramp.
     *
     * @default (t: number) => `hsl(${t * 360}, 100%, 50%)`
     */
    interpolator?: (t: number) => string;
    /**
     * The number of steps in the color ramp.
     *
     * @default 10
     */
    steps?: number;
    /**
     * The height of the color ramp.
     *
     * @default '20px'
     */
    height?: string | number;
    /**
     * The width of the color ramp.
     *
     * @default '100%'
     */
    width?: string | number;
    /**
     * A bindable reference to the underlying `<image>` element.
     *
     * @bindable
     */
    ref?: SVGImageElement;
};
export type ColorRampProps = ColorRampPropsWithoutHTML & Without<SVGAttributes<SVGImageElement>, ColorRampPropsWithoutHTML>;
declare const ColorRamp: import("svelte").Component<ColorRampProps, {}, "ref">;
type ColorRamp = ReturnType<typeof ColorRamp>;
export default ColorRamp;
