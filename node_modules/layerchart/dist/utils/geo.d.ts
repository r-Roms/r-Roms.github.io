import { geoPath as d3geoPath, type GeoProjection, type GeoStreamWrapper } from 'd3-geo';
import { type Path } from 'd3-path';
import { type CurveFactory, type CurveFactoryLineOnly } from 'd3-shape';
/**
 * Render a geoPath() using curve factory
 * @see {@link https://observablehq.com/@d3/context-to-curve}
 */
export declare function geoCurvePath(projection: GeoProjection | GeoStreamWrapper | null, curve: CurveFactory | CurveFactoryLineOnly, context?: CanvasRenderingContext2D | Path): ReturnType<typeof d3geoPath>;
/**
 * Return the point on Earth's surface that is diametrically opposite to another point
 * @see: https://en.wikipedia.org/wiki/Antipodes
 */
export declare function antipode([longitude, latitude]: [number, number]): [number, number];
/**
 * Check if point ([x, y]) is visible on projection
 * @see: https://observablehq.com/@d3/testing-projection-visibility
 */
export declare function isVisible(projection: GeoProjection | GeoStreamWrapper): ([x, y]: [number, number]) => boolean;
export declare function geoFitObjectTransform(projection: GeoProjection, size: [number, number], object: Parameters<typeof projection.fitSize>[1]): {
    translate: {
        x: number;
        y: number;
    };
    scale: number;
};
