export default function tileWrap([x, y, z]) {
  const j = 1 << z;
  return [x - Math.floor(x / j) * j, y - Math.floor(y / j) * j, z];
}
