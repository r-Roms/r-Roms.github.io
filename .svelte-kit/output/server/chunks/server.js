let base = "";
let assets = base;
const app_dir = "_app";
const relative = true;
const initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
function set_assets(path) {
  assets = initial.assets = path;
}
export {
  assets as a,
  base as b,
  app_dir as c,
  reset as d,
  override as o,
  relative as r,
  set_assets as s
};
