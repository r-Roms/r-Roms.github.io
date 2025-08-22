export const epsilon = 1e-6;
export const epsilon2 = 1e-12;
export const pi = Math.PI;
export const halfPi = pi / 2;
export const quarterPi = pi / 4;
export const tau = pi * 2;

export const degrees = 180 / pi;
export const radians = pi / 180;

export const abs = Math.abs;
export const atan = Math.atan;
export const atan2 = Math.atan2;
export const cos = Math.cos;
export const ceil = Math.ceil;
export const exp = Math.exp;
export const floor = Math.floor;
export const log = Math.log;
export const max = Math.max;
export const min = Math.min;
export const pow = Math.pow;
export const sin = Math.sin;
export const sign =
  Math.sign ||
  function (x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  };
export const sqrt = Math.sqrt;
export const tan = Math.tan;

export function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

export function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

export function haversin(x) {
  return (x = sin(x / 2)) * x;
}
