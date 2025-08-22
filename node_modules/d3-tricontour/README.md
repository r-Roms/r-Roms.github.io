# d3-tricontour

This library computes contour polygons by applying [meandering triangles](https://blog.bruce-hill.com/meandering-triangles) to an array of points with arbitrary 2D coordinates (_x_, _y_) holding numeric values _z_. To compute contours on gridded coordinates, see [d3-contour](https://github.com/d3/d3-contour) instead. To compute contours on geographic data, see [d3.geoContour](https://github.com/Fil/d3-geo-voronoi/blob/main/README.md#contours).

For examples, see the [tricontours collection](https://observablehq.com/collection/@fil/tricontours) on Observable.

## Installing

If you use npm, `npm install d3-tricontour`. You can also download the [latest release on GitHub](https://github.com/d3/d3-tricontour/releases/latest). For vanilla HTML in modern browsers, import d3-tricontour from Skypack:

```html
<script type="module">
import {tricontour} from "https://cdn.skypack.dev/d3-tricontour@1";
</script>
```

For legacy environments, you can load d3-tricontour’s UMD bundle from an npm-based CDN such as jsDelivr; a `d3` global is exported:

```html
<script src="https://cdn.jsdelivr.net/npm/d3-scale@4"></script>
<script src="https://cdn.jsdelivr.net/npm/d3-delaunay@6"></script>
<script src="https://cdn.jsdelivr.net/npm/d3-tricontour@1"></script>
<script>

const tric = d3.tricontour();
const contours = tric([[0, 0, 1], [1, 1, 0], [2, 0, 1]]);
> Array(11) [ {type: "MultiPolygon", coordinates: Array(1), value: 0} … ]
  
</script>
```

## API Reference

The API of tricontour is similar to that of [d3-contour](https://github.com/d3/d3-contour):

<a href="#tricontour" name="tricontour">#</a> <b>d3.tricontour</b>() · [Source](https://github.com/Fil/d3-tricontour/blob/main/src/tricontour.js), [Examples](https://observablehq.com/collection/@fil/tricontours)

Constructs a new tricontour generator with the default settings.

[<img src="https://raw.githubusercontent.com/Fil/d3-tricontour/main/img/tricontour.jpg" alt="tricontours" width="320">](https://observablehq.com/@fil/tricontours)


<a href="#_tricontour" name="_tricontour">#</a> _tricontour_(_data_) · [Examples](https://observablehq.com/@fil/tricontours)

Returns an array of contours, one for each threshold. The contours are MultiPolygons in GeoJSON format, that contain all the points with a value larger than the threshold. The value is indicated as _geometry_.value.

The _data_ is passed as an array of points, by default with the format [x, y, value].

[<img src="https://raw.githubusercontent.com/Fil/d3-tricontour/main/img/tricontour-flower.jpg" alt="tricontours flower" width="320">](https://observablehq.com/@fil/tricontour-flower)



<a href="#contour" name="contour">#</a> _tricontour_.<b>contour</b>(_data_[, _threshold_])

Returns a contour, as a MultiPolygon in GeoJSON format, containing all points with a value larger or equal to _threshold_. The threshold is indicated as _geometry_.value 

<a href="#contours" name="contours">#</a> _tricontour_.<b>contours</b>(_data_)

Returns an iterable over the contours.

[<img src="https://raw.githubusercontent.com/Fil/d3-tricontour/main/img/tricontour-iterator.jpg" alt="iterable" width="320">](https://observablehq.com/@fil/tricontour-iterator)


<a href="#isobands" name="isobands">#</a> _tricontour_.<b>isobands</b>(_data_)

Returns an iterable over the isobands: contours between pairs of consecutive threshold values _v0_ (inclusive) and _v1_ (exclusive). _geometry_.value is equal to _v0_, _geometry_.valueMax to _v1_.

[<img src="https://raw.githubusercontent.com/Fil/d3-tricontour/main/img/tricontour-isobands.jpg" alt="isobands" width="320">](https://observablehq.com/@fil/tricontour-isobands)


<a href="#x" name="x">#</a> _tricontour_.<b>x</b>([_x_])

Sets the *x* accessor. Defaults to \`d => d[0]\`. If _x_ is not given, returns the current x accessor.

<a href="#y" name="y">#</a> _tricontour_.<b>y</b>([_y_])

Sets the *y* accessor. Defaults to \`d => d[1]\`. If _y_ is not given, returns the current y accessor.

<a href="#value" name="value">#</a> _tricontour_.<b>value</b>([_value_])

Sets the *value* accessor. Defaults to \`d => d[2]\`. Values must be defined and finite. If _value_ is not given, returns the current value accessor.

[<img src="https://raw.githubusercontent.com/Fil/d3-tricontour/main/img/tricontour-hexbin.jpg" alt="hexbin heatmap" width="320">](https://observablehq.com/@fil/d3-hexbin-tricontours-heatmap)


<a href="#thresholds" name="thresholds">#</a>  _tricontour_.<b>thresholds</b>([_thresholds_])

Sets the thresholds, either explicitly as an array of values, or as a count that will be passed to d3.ticks. If empty, returns the current thresholds.


_The following are experimental_

These methods are used in d3-geo-voronoi’s [geoContour](https://github.com/Fil/d3-geo-voronoi/blob/main/README.md#contours).

[<img src="https://raw.githubusercontent.com/Fil/d3-tricontour/main/img/geocontour.jpg" alt="geoContour" width="320">](https://observablehq.com/@fil/spherical-contours)


<a href="#triangulate" name="triangulate">#</a>  _tricontour_.<b>triangulate</b>([_triangulate_])

Sets the *triangulate* function. Defaults to d3.Delaunay.from. See [Reusing a  tricontour triangulation](https://observablehq.com/@fil/reusing-a-tricontour-triangulation) and [UK tricontour](https://observablehq.com/@fil/tricontours-with-a-personalized-triangulation) for detailed examples.

[<img src="https://raw.githubusercontent.com/Fil/d3-tricontour/main/img/tricontour-triangulation.jpg" alt="UK tricontour" width="320">](https://observablehq.com/@fil/tricontours-with-a-personalized-triangulation)


<a href="#pointInterpolate" name="pointInterpolate">#</a> _tricontour_.<b>pointInterpolate</b>(_[pointInterpolate]_)

Sets the *pointInterpolate* function. Arguments: *i*, *j*, *0≤a<1*. Defaults to linear interpolation between the coordinates of points *i* and *j*.

<a href="#ringsort" name="ringsort">#</a> _tricontour_.<b>ringsort</b>(_[ringsort]_)

Sets the *ringsort* function.