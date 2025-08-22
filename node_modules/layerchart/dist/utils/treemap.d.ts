import type { HierarchyNode, HierarchyRectangularNode } from 'd3-hierarchy';
type TileFunc = (node: HierarchyRectangularNode<any>, x0: number, y0: number, x1: number, y1: number) => void;
/**
 * This custom tiling function adapts the tiling function
 * for the appropriate aspect ratio when the treemap is zoomed-in.
 * see: https://observablehq.com/@d3/zoomable-treemap#tile and https://observablehq.com/@d3/stretched-treemap
 */
export declare function aspectTile(tile: TileFunc, width: number, height: number): TileFunc;
/**
 * Show if the node (a) is a child of the selected (b), or any parent above selected
 */
export declare function isNodeVisible(a: HierarchyNode<any>, b: HierarchyNode<any> | null | undefined): boolean;
export {};
