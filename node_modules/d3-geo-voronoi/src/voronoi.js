import { geoCentroid, geoDistance } from "d3-geo";
import { geoDelaunay, excess } from "./delaunay.js";

export function geoVoronoi(data) {
  const v = function (data) {
    v.delaunay = null;
    v._data = data;

    if (typeof v._data === "object" && v._data.type === "FeatureCollection") {
      v._data = v._data.features;
    }
    if (typeof v._data === "object") {
      const temp = v._data
        .map((d) => [v._vx(d), v._vy(d), d])
        .filter((d) => isFinite(d[0] + d[1]));
      v.points = temp.map((d) => [d[0], d[1]]);
      v.valid = temp.map((d) => d[2]);
      v.delaunay = geoDelaunay(v.points);
    }
    return v;
  };

  v._vx = function (d) {
    if (typeof d == "object" && "type" in d) {
      return geoCentroid(d)[0];
    }
    if (0 in d) return d[0];
  };
  v._vy = function (d) {
    if (typeof d == "object" && "type" in d) {
      return geoCentroid(d)[1];
    }
    if (1 in d) return d[1];
  };

  v.x = function (f) {
    if (!f) return v._vx;
    v._vx = f;
    return v;
  };
  v.y = function (f) {
    if (!f) return v._vy;
    v._vy = f;
    return v;
  };

  v.polygons = function (data) {
    if (data !== undefined) {
      v(data);
    }

    if (!v.delaunay) return false;
    const coll = {
      type: "FeatureCollection",
      features: [],
    };
    if (v.valid.length === 0) return coll;
    v.delaunay.polygons.forEach((poly, i) =>
      coll.features.push({
        type: "Feature",
        geometry: !poly
          ? null
          : {
              type: "Polygon",
              coordinates: [
                [...poly, poly[0]].map((i) => v.delaunay.centers[i]),
              ],
            },
        properties: {
          site: v.valid[i],
          sitecoordinates: v.points[i],
          neighbours: v.delaunay.neighbors[i], // not part of the public API
        },
      })
    );
    if (v.valid.length === 1)
      coll.features.push({
        type: "Feature",
        geometry: { type: "Sphere" },
        properties: {
          site: v.valid[0],
          sitecoordinates: v.points[0],
          neighbours: [],
        },
      });
    return coll;
  };

  v.triangles = function (data) {
    if (data !== undefined) {
      v(data);
    }
    if (!v.delaunay) return false;

    return {
      type: "FeatureCollection",
      features: v.delaunay.triangles
        .map((tri, index) => {
          tri = tri.map((i) => v.points[i]);
          tri.center = v.delaunay.centers[index];
          return tri;
        })
        .filter((tri) => excess(tri) > 0)
        .map((tri) => ({
          type: "Feature",
          properties: {
            circumcenter: tri.center,
          },
          geometry: {
            type: "Polygon",
            coordinates: [[...tri, tri[0]]],
          },
        })),
    };
  };

  v.links = function (data) {
    if (data !== undefined) {
      v(data);
    }
    if (!v.delaunay) return false;
    const _distances = v.delaunay.edges.map((e) =>
        geoDistance(v.points[e[0]], v.points[e[1]])
      ),
      _urquart = v.delaunay.urquhart(_distances);
    return {
      type: "FeatureCollection",
      features: v.delaunay.edges.map((e, i) => ({
        type: "Feature",
        properties: {
          source: v.valid[e[0]],
          target: v.valid[e[1]],
          length: _distances[i],
          urquhart: !!_urquart[i],
        },
        geometry: {
          type: "LineString",
          coordinates: [v.points[e[0]], v.points[e[1]]],
        },
      })),
    };
  };

  v.mesh = function (data) {
    if (data !== undefined) {
      v(data);
    }
    if (!v.delaunay) return false;
    return {
      type: "MultiLineString",
      coordinates: v.delaunay.edges.map((e) => [
        v.points[e[0]],
        v.points[e[1]],
      ]),
    };
  };

  v.cellMesh = function (data) {
    if (data !== undefined) {
      v(data);
    }
    if (!v.delaunay) return false;
    const { centers, polygons } = v.delaunay;
    const coordinates = [];
    for (const p of polygons) {
      if (!p) continue;
      for (
        let n = p.length, p0 = p[n - 1], p1 = p[0], i = 0;
        i < n;
        p0 = p1, p1 = p[++i]
      ) {
        if (p1 > p0) {
          coordinates.push([centers[p0], centers[p1]]);
        }
      }
    }
    return {
      type: "MultiLineString",
      coordinates,
    };
  };

  v._found = undefined;
  v.find = function (x, y, radius) {
    v._found = v.delaunay.find(x, y, v._found);
    if (!radius || geoDistance([x, y], v.points[v._found]) < radius)
      return v._found;
  };

  v.hull = function (data) {
    if (data !== undefined) {
      v(data);
    }
    const hull = v.delaunay.hull,
      points = v.points;
    return hull.length === 0
      ? null
      : {
          type: "Polygon",
          coordinates: [[...hull.map((i) => points[i]), points[hull[0]]]],
        };
  };

  return data ? v(data) : v;
}
