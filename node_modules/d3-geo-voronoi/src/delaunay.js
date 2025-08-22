import { Delaunay } from "d3-delaunay";
import { geoRotation, geoStereographic } from "d3-geo";
import { extent } from "d3-array";
import {
  asin,
  atan2,
  cos,
  degrees,
  max,
  min,
  radians,
  sign,
  sin,
  sqrt,
} from "./math.js";
import {
  cartesianNormalize as normalize,
  cartesianCross as cross,
  cartesianDot as dot,
  cartesianAdd,
} from "./cartesian.js";

// Converts 3D Cartesian to spherical coordinates (degrees).
function spherical(cartesian) {
  return [
    atan2(cartesian[1], cartesian[0]) * degrees,
    asin(max(-1, min(1, cartesian[2]))) * degrees,
  ];
}

// Converts spherical coordinates (degrees) to 3D Cartesian.
function cartesian(coordinates) {
  const lambda = coordinates[0] * radians,
    phi = coordinates[1] * radians,
    cosphi = cos(phi);
  return [cosphi * cos(lambda), cosphi * sin(lambda), sin(phi)];
}

// Spherical excess of a triangle (in spherical coordinates)
export function excess(triangle) {
  triangle = triangle.map((p) => cartesian(p));
  return dot(triangle[0], cross(triangle[2], triangle[1]));
}

export function geoDelaunay(points) {
  const delaunay = geo_delaunay_from(points),
    triangles = geo_triangles(delaunay),
    edges = geo_edges(triangles, points),
    neighbors = geo_neighbors(triangles, points.length),
    find = geo_find(neighbors, points),
    // Voronoi ; could take a center function as an argument
    circumcenters = geo_circumcenters(triangles, points),
    { polygons, centers } = geo_polygons(circumcenters, triangles, points),
    mesh = geo_mesh(polygons),
    hull = geo_hull(triangles, points),
    // Urquhart ; returns a function that takes a distance array as argument.
    urquhart = geo_urquhart(edges, triangles);
  return {
    delaunay,
    edges,
    triangles,
    centers,
    neighbors,
    polygons,
    mesh,
    hull,
    urquhart,
    find,
  };
}

function geo_find(neighbors, points) {
  function distance2(a, b) {
    let x = a[0] - b[0],
      y = a[1] - b[1],
      z = a[2] - b[2];
    return x * x + y * y + z * z;
  }

  return function find(x, y, next) {
    if (next === undefined) next = 0;
    let cell,
      dist,
      found = next;
    const xyz = cartesian([x, y]);
    do {
      cell = next;
      next = null;
      dist = distance2(xyz, cartesian(points[cell]));
      neighbors[cell].forEach((i) => {
        let ndist = distance2(xyz, cartesian(points[i]));
        if (ndist < dist) {
          dist = ndist;
          next = i;
          found = i;
          return;
        }
      });
    } while (next !== null);

    return found;
  };
}

function geo_delaunay_from(points) {
  if (points.length < 2) return {};

  // find a valid point to send to infinity
  let pivot = 0;
  while (isNaN(points[pivot][0] + points[pivot][1]) && pivot++ < points.length);

  const r = geoRotation(points[pivot]),
    projection = geoStereographic()
      .translate([0, 0])
      .scale(1)
      .rotate(r.invert([180, 0]));
  points = points.map(projection);

  const zeros = [];
  let max2 = 1;
  for (let i = 0, n = points.length; i < n; i++) {
    let m = points[i][0] ** 2 + points[i][1] ** 2;
    if (!isFinite(m) || m > 1e32) zeros.push(i);
    else if (m > max2) max2 = m;
  }

  const FAR = 1e6 * sqrt(max2);

  zeros.forEach((i) => (points[i] = [FAR, 0]));

  // Add infinite horizon points
  points.push([0, FAR]);
  points.push([-FAR, 0]);
  points.push([0, -FAR]);

  const delaunay = Delaunay.from(points);

  delaunay.projection = projection;

  // clean up the triangulation
  const { triangles, halfedges, inedges } = delaunay;
  const degenerate = [];
  for (let i = 0, l = halfedges.length; i < l; i++) {
    if (halfedges[i] < 0) {
      const j = i % 3 == 2 ? i - 2 : i + 1;
      const k = i % 3 == 0 ? i + 2 : i - 1;
      const a = halfedges[j];
      const b = halfedges[k];
      halfedges[a] = b;
      halfedges[b] = a;
      halfedges[j] = halfedges[k] = -1;
      triangles[i] = triangles[j] = triangles[k] = pivot;
      inedges[triangles[a]] = a % 3 == 0 ? a + 2 : a - 1;
      inedges[triangles[b]] = b % 3 == 0 ? b + 2 : b - 1;
      degenerate.push(Math.min(i, j, k));
      i += 2 - (i % 3);
    } else if (triangles[i] > points.length - 3 - 1) {
      triangles[i] = pivot;
    }
  }

  // there should always be 4 degenerate triangles
  // console.warn(degenerate);
  return delaunay;
}

function geo_edges(triangles, points) {
  const _index = new Set();
  if (points.length === 2) return [[0, 1]];
  triangles.forEach((tri) => {
    if (tri[0] === tri[1]) return;
    if (excess(tri.map((i) => points[i])) < 0) return;
    for (let i = 0, j; i < 3; i++) {
      j = (i + 1) % 3;
      _index.add(extent([tri[i], tri[j]]).join("-"));
    }
  });
  return Array.from(_index, (d) => d.split("-").map(Number));
}

function geo_triangles(delaunay) {
  const { triangles } = delaunay;
  if (!triangles) return [];

  const geo_triangles = [];
  for (let i = 0, n = triangles.length / 3; i < n; i++) {
    const a = triangles[3 * i],
      b = triangles[3 * i + 1],
      c = triangles[3 * i + 2];
    if (a !== b && b !== c) {
      geo_triangles.push([a, c, b]);
    }
  }
  return geo_triangles;
}

function geo_circumcenters(triangles, points) {
  // if (!use_centroids) {
  return triangles.map((tri) => {
    const c = tri.map((i) => points[i]).map(cartesian),
      V = cartesianAdd(
        cartesianAdd(cross(c[1], c[0]), cross(c[2], c[1])),
        cross(c[0], c[2])
      );
    return spherical(normalize(V));
  });
  /*} else {
    return triangles.map(tri => {
      return d3.geoCentroid({
        type: "MultiPoint",
        coordinates: tri.map(i => points[i])
      });
    });
  }*/
}

function geo_neighbors(triangles, npoints) {
  const neighbors = [];
  triangles.forEach((tri) => {
    for (let j = 0; j < 3; j++) {
      const a = tri[j],
        b = tri[(j + 1) % 3];
      neighbors[a] = neighbors[a] || [];
      neighbors[a].push(b);
    }
  });

  // degenerate cases
  if (triangles.length === 0) {
    if (npoints === 2) (neighbors[0] = [1]), (neighbors[1] = [0]);
    else if (npoints === 1) neighbors[0] = [];
  }

  return neighbors;
}

function geo_polygons(circumcenters, triangles, points) {
  const polygons = [];

  const centers = circumcenters.slice();

  if (triangles.length === 0) {
    if (points.length < 2) return { polygons, centers };
    if (points.length === 2) {
      // two hemispheres
      const a = cartesian(points[0]),
        b = cartesian(points[1]),
        m = normalize(cartesianAdd(a, b)),
        d = normalize(cross(a, b)),
        c = cross(m, d);
      const poly = [
        m,
        cross(m, c),
        cross(cross(m, c), c),
        cross(cross(cross(m, c), c), c),
      ]
        .map(spherical)
        .map(supplement);
      return (
        polygons.push(poly),
        polygons.push(poly.slice().reverse()),
        { polygons, centers }
      );
    }
  }

  triangles.forEach((tri, t) => {
    for (let j = 0; j < 3; j++) {
      const a = tri[j],
        b = tri[(j + 1) % 3],
        c = tri[(j + 2) % 3];
      polygons[a] = polygons[a] || [];
      polygons[a].push([b, c, t, [a, b, c]]);
    }
  });

  // reorder each polygon
  const reordered = polygons.map((poly) => {
    const p = [poly[0][2]]; // t
    let k = poly[0][1]; // k = c
    for (let i = 1; i < poly.length; i++) {
      // look for b = k
      for (let j = 0; j < poly.length; j++) {
        if (poly[j][0] == k) {
          k = poly[j][1];
          p.push(poly[j][2]);
          break;
        }
      }
    }

    if (p.length > 2) {
      return p;
    } else if (p.length == 2) {
      const R0 = o_midpoint(
          points[poly[0][3][0]],
          points[poly[0][3][1]],
          centers[p[0]]
        ),
        R1 = o_midpoint(
          points[poly[0][3][2]],
          points[poly[0][3][0]],
          centers[p[0]]
        );
      const i0 = supplement(R0),
        i1 = supplement(R1);
      return [p[0], i1, p[1], i0];
    }
  });

  function supplement(point) {
    let f = -1;
    centers.slice(triangles.length, Infinity).forEach((p, i) => {
      if (p[0] === point[0] && p[1] === point[1]) f = i + triangles.length;
    });
    if (f < 0) (f = centers.length), centers.push(point);
    return f;
  }

  return { polygons: reordered, centers };
}

function o_midpoint(a, b, c) {
  a = cartesian(a);
  b = cartesian(b);
  c = cartesian(c);
  const s = sign(dot(cross(b, a), c));
  return spherical(normalize(cartesianAdd(a, b)).map((d) => s * d));
}

function geo_mesh(polygons) {
  const mesh = [];
  polygons.forEach((poly) => {
    if (!poly) return;
    let p = poly[poly.length - 1];
    for (let q of poly) {
      if (q > p) mesh.push([p, q]);
      p = q;
    }
  });
  return mesh;
}

function geo_urquhart(edges, triangles) {
  return function (distances) {
    const _lengths = new Map(),
      _urquhart = new Map();
    edges.forEach((edge, i) => {
      const u = edge.join("-");
      _lengths.set(u, distances[i]);
      _urquhart.set(u, true);
    });

    triangles.forEach((tri) => {
      let l = 0,
        remove = -1;
      for (let j = 0; j < 3; j++) {
        let u = extent([tri[j], tri[(j + 1) % 3]]).join("-");
        if (_lengths.get(u) > l) {
          l = _lengths.get(u);
          remove = u;
        }
      }
      _urquhart.set(remove, false);
    });

    return edges.map((edge) => _urquhart.get(edge.join("-")));
  };
}

function geo_hull(triangles, points) {
  const _hull = new Set(),
    hull = [];
  triangles.map((tri) => {
    if (excess(tri.map((i) => points[i > points.length ? 0 : i])) > 1e-12)
      return;
    for (let i = 0; i < 3; i++) {
      let e = [tri[i], tri[(i + 1) % 3]],
        code = `${e[0]}-${e[1]}`;
      if (_hull.has(code)) _hull.delete(code);
      else _hull.add(`${e[1]}-${e[0]}`);
    }
  });

  const _index = new Map();
  let start;
  _hull.forEach((e) => {
    e = e.split("-").map(Number);
    _index.set(e[0], e[1]);
    start = e[0];
  });

  if (start === undefined) return hull;

  let next = start;
  do {
    hull.push(next);
    let n = _index.get(next);
    _index.set(next, -1);
    next = n;
  } while (next > -1 && next !== start);

  return hull;
}
