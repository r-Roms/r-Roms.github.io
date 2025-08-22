# d3-tile

Quadtree tiles are common for representing large, multi-resolution geometry and images, as in “slippy” maps. d3.tile provides a convenient mechanism for computing which tile coordinates should be visible in the current viewport. Unlike dedicated libraries for slippy maps, such as [Leaflet](https://leafletjs.com/), d3.tile’s tiny, low-level API is agnostic about how the tiles are presented and offers greater flexibility. d3.tile works well with [d3-geo](https://github.com/d3/d3-geo) for geographic maps and [d3-zoom](https://github.com/d3/d3-zoom) for interaction.

For examples, see the [d3-tile collection](https://observablehq.com/collection/@d3/d3-tile) on Observable.

## Installing

If you use NPM, `npm install d3-tile`. Otherwise, download the [latest release](https://github.com/d3/d3-tile/releases/latest). You can also load directly as a [standalone library](https://cdn.jsdelivr.net/npm/d3-tile). ES modules, AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3` global is exported:

```html
<script src="https://cdn.jsdelivr.net/npm/d3-tile@1"></script>
<script>

const tile = d3.tile();
const tiles = tile({k: 256, x: 480, y: 250});

</script>
```

## API Reference

<a href="#tile" name="tile">#</a> d3.<b>tile</b>() · [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js), [Examples](https://observablehq.com/collection/@d3/d3-tile)

Constructs a new tile layout with the default settings.

```js
const tile = d3.tile();
```

<a href="#_tile" name="_tile">#</a> <i>tile</i>([…*arguments*]) · [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js), [Examples](https://observablehq.com/@d3/raster-tiles)

Computes the set of tiles to display given the current settings, computing the [scale](#tile_scale) and [translate](#tile_translate) by invoking the corresponding accessors with the given *arguments*. Returns an array of [*x*, *y*, *z*] arrays representing the *x*- (horizontal), *y*- (vertical) and *z*- (zoom) coordinates of the visible tiles. The returned tiles array also has tiles.*scale* and tiles.*translate* properties which together with an individual tile’s *x* and *y* determine the intended location of the tile in the viewport.

```js
const tiles = tile({k: 256, x: 480, y: 250});
const {translate: [tx, ty], scale: k} = tiles;
for (const [x, y, z] of tiles) {
  console.log(`tile ${x}/${y}/${z} is at ${(x + tx) * k}, ${(y + ty) * k}`);
}
```

See [Raster Tiles](https://observablehq.com/@d3/raster-tiles) for an example.

<a href="#tile_extent" name="tile_extent">#</a> <i>tile</i>.<b>extent</b>([<i>extent</i>]) · [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js)

If *extent* is specified, sets this tile layout’s viewport extent to the specified array [[*x0*, *y0*], [*x1*, *y1*]], where [*x0*, *y0*] is the top-left corner and [*x1*, *y1*] is the bottom-right corner, and returns this tile layout. If *extent* is not specified, returns the current viewport extent, which defaults to [[0, 0], [960, 500]]. Setting the viewport extent implicitly sets the [viewport size](#tile_size).

```js
const tile = d3.tile().extent([[100, 200], [300, 400]]);
```

<a href="#tile_size" name="tile_size">#</a> <i>tile</i>.<b>size</b>([<i>size</i>]) · [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js)

If *size* is specified, sets this tile layout’s viewport size to the specified array of numbers [*width*, *height*] and returns this tile layout. If *size* is not specified, returns the current viewport size, which defaults to [960, 500]. This is a convenience method for setting the [viewport extent](#tile_extent) to [[0, 0], [*width*, *height*]].

```js
const tile = d3.tile().size([200, 200]);
```

<a href="#tile_scale" name="tile_scale">#</a> <i>tile</i>.<b>scale</b>([<i>scale</i>]) · [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js)

If *scale* is specified, sets this tile layout’s scale function and returns this tile layout. If *scale* is a function, it is invoked when the [tile layout](#_tile) is invoked, being passed the same arguments as the tile layout; this function must return a number indicating the desired width and height of the world tile [0, 0, 0].

```js
const tile = d3.tile().scale(t => t.scale).translate(t => t.translate);
const tiles = tile({scale: 1024, translate: [100, 200]});
```

If *scale* is not a function, it assumed to be a constant number, and is wrapped in a function which returns the specified number.

```js
const tile = d3.tile().scale(1024).translate([100, 200]);
```

If *scale* is not specified, returns the current layout scale function, which defaults to:

```js
function scale(transform) {
  return transform.k;
}
```

This default is compatible with a [d3-zoom transform](https://github.com/d3/d3-zoom/blob/master/README.md#zoom-transforms).

<a href="#tile_translate" name="tile_translate">#</a> <i>tile</i>.<b>translate</b>([<i>translate</i>]) · [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js)

If *translate* is specified, sets this tile layout’s translate function and returns this tile layout. If *translate* is a function, it is invoked when the [tile layout](#_tile) is invoked, being passed the same arguments as the tile layout; this function must return an array of numbers [*x*, *y*] indicating the desired coordinates the center of the world tile [0, 0, 0].

```js
const tile = d3.tile().scale(t => t.scale).translate(t => t.translate);
const tiles = tile({scale: 1024, translate: [100, 200]});
```

If *translate* is not a function, it is assumed to be a constant array [*x*, *y*] and is wrapped in a function which returns the specified array.

```js
const tile = d3.tile().scale(1024).translate([100, 200]);
```

If *translate* is not specified, returns the current layout translate function, which defaults to:

```js
function translate(transform) {
  return [transform.x, transform.y];
}
````

This default is compatible with a [d3-zoom transform](https://github.com/d3/d3-zoom/blob/master/README.md#zoom-transforms).

<a href="#tile_clampX" name="tile_clampX">#</a> <i>tile</i>.<b>clampX</b>([<i>clamp</i>]) · [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js), [Examples](https://observablehq.com/@d3/wrapped-tiles)

If *clamp* is specified, sets whether or not the visible tiles will be clamped in the *x*-coordinate and returns this tile layout. If *clamp* is not specified, returns the current *x*-clamp, which defaults to true. If the *x*-clamp is false, then the tile layout will return tiles that are outside the “world” tile [0, 0, 0], with *x*-coordinates that are outside the normal bounds 0 ≤ *x* < 2^*z*. See [d3.tileWrap](#tileWrap) for converting these coordinates to wrapped in-world coordinates. See [Wrapped Tiles](https://observablehq.com/@d3/wrapped-tiles) for example.

```js
const tile = d3.tile().clampX(false);
```

<a href="#tile_clampY" name="tile_clampY">#</a> <i>tile</i>.<b>clampY</b>([<i>clamp</i>]) · [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js)

If *clamp* is specified, sets whether or not the visible tiles will be clamped in the *y*-coordinate and returns this tile layout. If *clamp* is not specified, returns the current *y*-clamp, which defaults to true. If the *y*-clamp is false, then the tile layout will return tiles that are outside the “world” tile [0, 0, 0], with *y*-coordinates that are outside the normal bounds 0 ≤ *y* < 2^*z*. See [d3.tileWrap](#tileWrap) for converting these coordinates to wrapped in-world coordinates. See also [*tile*.clampX](#tile_clampX).

```js
const tile = d3.tile().clampY(false);
```

<a href="#tile_clamp" name="tile_clamp">#</a> <i>tile</i>.<b>clamp</b>([<i>clamp</i>]) · [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js)

If *clamp* is specified, sets [*tile*.clampX](#tile_clampX) and [*tile*.clampY](#tile_clampY) to the specified boolean *clamp* and returns this tile layout. If *clamp* is not specified, returns true if *tile*.clampX and *tile*.clampY are both true, and false otherwise.

```js
const tile = d3.tile().clamp(false);
```

<a href="#tile_tileSize" name="tile_tileSize">#</a> <i>tile</i>.<b>tileSize</b>([<i>tileSize</i>]) · [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js)

If *tileSize* is specified, sets this tile layout’s tile width and height to the specified number *tileSize* and returns this tile layout. If *tileSize* is not specified, returns the current layout tile size, which defaults to 256. 256×256 is the most common tile size among tile providers.

```js
const tile = d3.tile().tileSize(512);
```

<a href="#tile_zoomDelta" name="tile_zoomDelta">#</a> <i>tile</i>.<b>zoomDelta</b>([<i>zoomDelta</i>]) · [Source](https://github.com/d3/d3-tile/blob/master/src/tile.js)

If *zoomDelta* is specified, sets this tile layout’s zoom offset to the specified number *zoomDelta* and returns this tile layout. If *zoomDelta* is not specified, returns the current zoom offset, which defaults to 0. The zoom offset affects which *z*-coordinate is chosen based on the current [scale](#tile_scale); the default zoom offset of 0 which choose the *z* that is closest the displayed size; a zoom offset of -1 will use *z* - 1, giving tiles that are twice as big (lower resolution); a zoom offset of +1 will use *z* + 1, giving tiles that are twice as small (higher resolution). The latter might be appropriate for showing 256×256 tiles in a 128×128 space on a high-resolution screen.

```js
const tile = d3.tile().zoomDelta(2);
```

<a href="#tileWrap" name="tileWrap">#</a> d3.<b>tileWrap</b>(*tile*) · [Source](https://github.com/d3/d3-tile/blob/master/src/wrap.js), [Examples](https://observablehq.com/@d3/wrapped-tiles)

Given *tile* coordinates [*x*, *y*, *z*], where *x* and *y* may be outside the “world” tile [0, 0, 0], returns the wrapped tile coordinates [*x′*, *y′*, *z*] where *j* = 2 ^ *z*, *x′* = *x* - ⌊*x* / *j*⌋ * *j* and *y′* = *y* - ⌊*y* / *j*⌋ * *j*. This function is most commonly used in conjunction with [*tile*.clampX](#tile_clampX) to allow horizontal wrapping of web Mercator tiles. See [Wrapped Tiles](https://observablehq.com/@d3/wrapped-tiles) for example.

```js
d3.tileWrap([-1, 0, 1]) // [1, 0, 1]
d3.tileWrap([-1, 0, 2]) // [3, 0, 2]
````
