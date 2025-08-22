import { geoPath as d3geoPath, } from 'd3-geo';
import { path } from 'd3-path';
import {} from 'd3-shape';
/**
 * Render a geoPath() using curve factory
 * @see {@link https://observablehq.com/@d3/context-to-curve}
 */
export function geoCurvePath(projection, curve, context) {
    const pathContext = context === undefined ? path() : context;
    const geoPath = d3geoPath(projection, curveContext(curve(pathContext)));
    const fn = (object) => {
        geoPath(object);
        return context === undefined ? pathContext + '' : undefined;
    };
    // Expose geoPath properties such as `.centroid()`
    Object.setPrototypeOf(fn, geoPath);
    // @ts-expect-error
    return fn;
}
/**
 * Translate Curve to GeoContext interface
 */
function curveContext(curve) {
    return {
        beginPath() {
            // nothing?
        },
        moveTo(x, y) {
            curve.lineStart();
            curve.point(x, y);
        },
        arc(x, y, radius, startAngle, endAngle, anticlockwise) {
            // nothing?
        },
        lineTo(x, y) {
            curve.point(x, y);
        },
        closePath() {
            curve.lineEnd();
        },
    };
}
/**
 * Return the point on Earth's surface that is diametrically opposite to another point
 * @see: https://en.wikipedia.org/wiki/Antipodes
 */
export function antipode([longitude, latitude]) {
    return [longitude + 180, -latitude];
}
/**
 * Check if point ([x, y]) is visible on projection
 * @see: https://observablehq.com/@d3/testing-projection-visibility
 */
export function isVisible(projection) {
    let visible;
    // @ts-expect-error
    const stream = projection.stream({
        point() {
            visible = true;
        },
    });
    return ([x, y]) => ((visible = false), stream.point(x, y), visible);
}
export function geoFitObjectTransform(projection, size, object) {
    const newProjection = projection.fitSize(size, object);
    const translate = newProjection.translate();
    return { translate: { x: translate[0], y: translate[1] }, scale: newProjection.scale() };
}
