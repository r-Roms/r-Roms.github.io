import type { Direction } from "../shared/index.js";
/**
 * Detects the text direction in the element.
 * @returns {Direction} The text direction ('ltr' for left-to-right or 'rtl' for right-to-left).
 */
export declare function getElemDirection(elem: HTMLElement): Direction;
