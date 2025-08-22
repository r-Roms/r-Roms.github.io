/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
}
