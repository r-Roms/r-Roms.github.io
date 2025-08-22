import type { Snippet } from 'svelte';
export type PointProps = {
    /**
     * Single data point to translate to x/y
     */
    d: any;
    /**
     * Children containing the x and y values
     */
    children?: Snippet<[{
        x: number;
        y: number;
    }]>;
};
declare const Point: import("svelte").Component<PointProps, {}, "">;
type Point = ReturnType<typeof Point>;
export default Point;
