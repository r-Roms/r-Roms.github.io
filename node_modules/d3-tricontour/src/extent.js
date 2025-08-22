// https://github.com/d3/d3-array/blob/master/src/extent.js
export default function(values) {
  let min, max;
  for (const value of values) {
    if (value != null) {
      if (min === undefined) {
        if (value >= value) min = max = value;
      } else {
        if (min > value) min = value;
        if (max < value) max = value;
      }
    }
  }
  return [min, max];
}
