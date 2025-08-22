// https://d3js.org/d3-tile/ v1.0.0 Copyright 2019 Mike Bostock
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = global || self, factory(global.d3 = global.d3 || {}));
}(this, function (exports) { 'use strict';

function defaultScale(t) {
  return t.k;
}

function defaultTranslate(t) {
  return [t.x, t.y];
}

function constant(x) {
  return function() {
    return x;
  };
}

function tile() {
  let x0 = 0, y0 = 0, x1 = 960, y1 = 500;
  let clampX = true, clampY = true;
  let tileSize = 256;
  let scale = defaultScale;
  let translate = defaultTranslate;
  let zoomDelta = 0;

  function tile() {
    const scale_ = +scale.apply(this, arguments);
    const translate_ = translate.apply(this, arguments);
    const z = Math.log2(scale_ / tileSize);
    const z0 = Math.round(Math.max(z + zoomDelta, 0));
    const k = Math.pow(2, z - z0) * tileSize;
    const x = +translate_[0] - scale_ / 2;
    const y = +translate_[1] - scale_ / 2;
    const xmin = Math.max(clampX ? 0 : -Infinity, Math.floor((x0 - x) / k));
    const xmax = Math.min(clampX ? 1 << z0 : Infinity, Math.ceil((x1 - x) / k));
    const ymin = Math.max(clampY ? 0 : -Infinity, Math.floor((y0 - y) / k));
    const ymax = Math.min(clampY ? 1 << z0 : Infinity, Math.ceil((y1 - y) / k));
    const tiles = [];
    for (let y = ymin; y < ymax; ++y) {
      for (let x = xmin; x < xmax; ++x) {
        tiles.push([x, y, z0]);
      }
    }
    tiles.translate = [x / k, y / k];
    tiles.scale = k;
    return tiles;
  }

  tile.size = function(_) {
    return arguments.length ? (x0 = y0 = 0, x1 = +_[0], y1 = +_[1], tile) : [x1 - x0, y1 - y0];
  };

  tile.extent = function(_) {
    return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], tile) : [[x0, y0], [x1, y1]];
  };

  tile.scale = function(_) {
    return arguments.length ? (scale = typeof _ === "function" ? _ : constant(+_), tile) : scale;
  };

  tile.translate = function(_) {
    return arguments.length ? (translate = typeof _ === "function" ? _ : constant([+_[0], +_[1]]), tile) : translate;
  };

  tile.zoomDelta = function(_) {
    return arguments.length ? (zoomDelta = +_, tile) : zoomDelta;
  };

  tile.tileSize = function(_) {
    return arguments.length ? (tileSize = +_, tile) : tileSize;
  };

  tile.clamp = function(_) {
    return arguments.length ? (clampX = clampY = !!_, tile) : clampX && clampY;
  };

  tile.clampX = function(_) {
    return arguments.length ? (clampX = !!_, tile) : clampX;
  };

  tile.clampY = function(_) {
    return arguments.length ? (clampY = !!_, tile) : clampY;
  };

  return tile;
}

function tileWrap([x, y, z]) {
  const j = 1 << z;
  return [x - Math.floor(x / j) * j, y - Math.floor(y / j) * j, z];
}

exports.tile = tile;
exports.tileWrap = tileWrap;

Object.defineProperty(exports, '__esModule', { value: true });

}));
