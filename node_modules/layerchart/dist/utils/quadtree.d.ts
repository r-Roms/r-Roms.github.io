import type { Quadtree } from 'd3-quadtree';
type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * Transverse quadtree and generate rect dimensions
 */
export declare function quadtreeRects<T>(quadtree: Quadtree<T>, showLeaves?: boolean): Rect[];
export {};
