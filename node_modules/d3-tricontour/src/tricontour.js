import {Delaunay} from "d3-delaunay";
import {scaleLinear} from "d3-scale";
import extent from "./extent.js";
import merge from "./merge.js";
import planarRingsort from "./ringsort.js";

export default function() {
  // accessors
  let x = d => d[0],
    y = d => d[1],
    value = d => (isFinite(+d[2]) ? +d[2] : 0),
    triangulate = Delaunay.from,
    pointInterpolate = (i, j, a) => {
      const { points } = triangulation;
      const A = [points[2 * i], points[2 * i + 1]],
        B = [points[2 * j], points[2 * j + 1]];
      return [a * B[0] + (1 - a) * A[0], a * B[1] + (1 - a) * A[1]];
    },
    ringsort = planarRingsort;

  let thresholds, values, triangulation;

  function init(points) {
    triangulation = triangulate(points, x, y);
    values = Array.from(points, value);
    if (typeof thresholds !== "object") {
      thresholds = scaleLinear()
        .domain(extent(values))
        .nice()
        .ticks(thresholds);
    }
  }

  function* tricontours(points) {
    init(points);

    for (const threshold of thresholds) {
      const polygon = tricontour(triangulation, values, threshold);
      yield {
        type: "MultiPolygon",
        coordinates: polygon,
        value: threshold
      };
    }
  }

  function contour(points, threshold) {
    init(points);

    return {
      type: "MultiPolygon",
      coordinates: tricontour(triangulation, values, threshold),
      value: threshold
    };
  }

  function* isobands(points) {
    init(points);

    let p0, p1, th0;
    for (const th of thresholds) {
      if (p1) p0 = p1;
      p1 = merge(tricontour(triangulation, values, th));
      if (p0) {
        yield {
          type: "MultiPolygon",
          coordinates: ringsort(
            p0.concat(p1.map(ring => ring.slice().reverse()))
          ),
          value: th0,
          valueMax: th
        };
      }
      th0 = th;
    }
  }

  const contours = function(data) {
    return [...tricontours(data)];
  };

  // API
  contours.x = _ => (_ ? ((x = _), contours) : x);
  contours.y = _ => (_ ? ((y = _), contours) : y);
  contours.value = _ => (_ ? ((value = _), contours) : value);
  contours.thresholds = _ => (_ ? ((thresholds = _), contours) : thresholds);
  contours.triangulate = _ => (_ ? ((triangulate = _), contours) : triangulate);
  contours.pointInterpolate = _ =>
    _ ? ((pointInterpolate = _), contours) : pointInterpolate;
  contours.ringsort = _ =>
    _ ? ((ringsort = _), contours) : ringsort;
  contours.contours = tricontours;
  contours.contour = contour;
  contours.isobands = isobands;

  // expose the internals (useful for debugging, not part of the API)
  contours._values = () => values;
  contours._triangulation = () => triangulation;

  return contours;

  // navigate a triangle
  function next(i) {
    return i % 3 === 2 ? i - 2 : i + 1;
  }
  function prev(i) {
    return i % 3 === 0 ? i + 2 : i - 1;
  }

  function tricontour(triangulation, values, v0 = 0) {
    // sanity check
    for (const d of values) if (!isFinite(d)) throw ["Invalid value", d];

    const { halfedges, hull, inedges, triangles } = triangulation,
      n = values.length;

    function edgealpha(i) {
      return alpha(triangles[i], triangles[next(i)]);
    }
    function alpha(i, j) {
      const u = values[i],
        v = values[j];
      if (u <= v0 && v >= v0 && u < v) {
        return (v0 - u) / (v - u);
      }
    }

    // create the path from the first exit; cancel visited halfedges
    const rings = [],
      visited = new Uint8Array(halfedges.length).fill(0);
    let path, i, j, k, a;
    for (k = 0; k < halfedges.length; k++) {
      if (visited[k]) continue;

      i = k;
      path = [];

      while ((a = edgealpha(i)) > 0) {
        const [ti, tj] = [triangles[i], triangles[(j = next(i))]];

        // is our tour done?
        if (
          (path.length && (ti === path[0].ti && tj === path[0].tj)) ||
          path.length > 2 * n
        )
          break;

        visited[i] = 1;
        path.push({ ti, tj, a });

        // jump into the adjacent triangle
        if ((j = halfedges[i]) > -1) {
          if (edgealpha((j = next(j))) > 0) {
            i = j;
            continue;
          }
          if (edgealpha((j = next(j))) > 0) {
            i = j;
            continue;
          }
          // debugger;
        }

        // or follow the hull
        else {
          let h = (hull.indexOf(triangles[i]) + 1) % hull.length;

          while (values[hull[h]] < v0) {
            // debugger;
            h = (h + 1) % hull.length;
          }

          while (values[hull[h]] >= v0) {
            path.push({ ti: hull[h], tj: hull[h], a: 0 });
            h = (h + 1) % hull.length;
          }

          // take that entry
          j = inedges[hull[h]];
          path.push({
            ti: hull[h],
            tj: triangles[j],
            a: alpha(hull[h], triangles[j])
          });

          if (edgealpha((i = next(j))) > 0) continue;
          if (edgealpha((i = prev(j))) > 0) continue;
        }
      }

      if (path.length) {
        path.push(path[0]);
        rings.push(path.map(({ ti, tj, a }) => pointInterpolate(ti, tj, a)));
      }
    }

    // special case all values on the hull are >=v0, add the hull
    if (hull.every(d => values[d] >= v0)) {
      rings.unshift(
        Array.from(hull)
          .concat([hull[0]])
          .map(i => pointInterpolate(i, i, 0))
      );
    }

    return ringsort(rings); // return [rings] if we don't need to sort
  }
}