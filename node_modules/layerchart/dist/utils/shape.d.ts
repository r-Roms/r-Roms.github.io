/** Get points to create a polygon with given number of points and radius
 *
 * @param count - Number of points
 * @param radius - Radius of the polygon
 * @returns Array of points (angle, radius)
 */
export declare function polygonPoints(count: number, radius: number, rotate?: number): {
    angle: number;
    radius: number;
}[];
/** Create polygon
 *
 * @param cx - Center x coordinate
 * @param cy - Center y coordinate
 * @param count - Number of points
 * @param radius - Radius of the polygon
 * @param rotate - Rotation of the polygon (degrees)
 * @param inset - Percent to inset odd points (<1 inset, >1 outset)
 * @param scaleX - Horizontal stretch factor
 * @param scaleY - Vertical stretch factor
 * @param skewX - Skew angle in degrees along the X axis
 * @param skewY - Skew angle in degrees along the Y axis
 * @param tiltX - Tilt factor for x-coordinates (0 = no tilt, positive moves points top => down, negative moves points bottom => up)
 * @param tiltY - Tilt factor for y-coordinates (0 = no tilt, positive moves points left => right, negative moves points right => left)
 * @returns Array of points (x, y)
 */
export declare function polygon(options: {
    cx: number;
    cy: number;
    count: number;
    radius: number;
    rotate?: number;
    inset?: number;
    scaleX?: number;
    scaleY?: number;
    skewX?: number;
    skewY?: number;
    tiltX?: number;
    tiltY?: number;
}): {
    x: number;
    y: number;
}[];
