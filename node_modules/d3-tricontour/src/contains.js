// https://github.com/d3/d3-contour/blob/master/src/contains.js
export default function(ring, hole) {
  const n = hole.length;
  let i = -1;
  while (++i < n) {
    const c = ringContains(ring, hole[i]);
    if (c) return c;
  }
  return 0;
}

function ringContains(ring, point) {
  let x = point[0], y = point[1], contains = -1;
  for (let i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
    const pi = ring[i], xi = pi[0], yi = pi[1], pj = ring[j], xj = pj[0], yj = pj[1];
    if (segmentContains(pi, pj, point)) return 0;
    if (((yi > y) !== (yj > y)) && ((x < (xj - xi) * (y - yi) / (yj - yi) + xi))) contains = -contains;
  }
  return contains;
}

function segmentContains(a, b, c) {
  let i; return collinear(a, b, c) && within(a[i = +(a[0] === b[0])], c[i], b[i]);
}

function collinear(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) === (c[0] - a[0]) * (b[1] - a[1]);
}

function within(p, q, r) {
  return p <= q && q <= r || r <= q && q <= p;
}
