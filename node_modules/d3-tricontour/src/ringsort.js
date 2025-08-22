// sorts the polygons so that the holes are grouped with their parent polygon
// https://github.com/d3/d3-contour/blob/master/src/contours.js
import contains from "./contains.js";
import area from "./area.js";

export default function(rings) {
  const polygons = [];
  const holes = [];

  for (const ring of rings) {
    if (area(ring) > 0) polygons.push([ring]);
    else holes.push(ring);
  }

  holes.forEach(function(hole) {
    for (let i = 0, n = polygons.length, polygon; i < n; ++i) {
      if (contains((polygon = polygons[i])[0], hole) !== -1) {
        polygon.push(hole);
        return;
      }
    }
  });

  return polygons;
}