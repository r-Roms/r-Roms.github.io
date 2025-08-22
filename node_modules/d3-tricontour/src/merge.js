// https://github.com/d3/d3-array/blob/master/src/merge.js
function* flatten(arrays) {
  for (const array of arrays) {
    yield* array;
  }
}

export default function(arrays) {
  return Array.from(flatten(arrays));
}
