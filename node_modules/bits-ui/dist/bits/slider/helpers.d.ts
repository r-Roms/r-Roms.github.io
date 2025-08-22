import type { StyleProperties } from "../../shared/index.js";
export declare function getRangeStyles(direction: "lr" | "rl" | "tb" | "bt", min: number, max: number): StyleProperties;
export declare function getThumbStyles(direction: "lr" | "rl" | "tb" | "bt", thumbPos: number): StyleProperties;
export declare function getTickStyles(direction: "lr" | "rl" | "tb" | "bt", tickPosition: number, offsetPercentage: number): StyleProperties;
export declare function getTickLabelStyles(direction: "lr" | "rl" | "tb" | "bt", tickPosition: number, labelPosition?: "top" | "bottom" | "left" | "right"): StyleProperties;
export declare function getThumbLabelStyles(direction: "lr" | "rl" | "tb" | "bt", thumbPosition: number, labelPosition?: "top" | "bottom" | "left" | "right"): StyleProperties;
/**
 * Normalizes step to always be a sorted array of valid values within min/max range
 */
export declare function normalizeSteps(step: number | number[], min: number, max: number): number[];
/**
 * Snaps a value to the nearest step in a custom steps array
 */
export declare function snapValueToCustomSteps(value: number, steps: number[]): number;
/**
 * Gets the next/previous step value for keyboard navigation
 */
export declare function getAdjacentStepValue(currentValue: number, steps: number[], direction: "next" | "prev"): number;
