import type { Mode } from "./types.js";
/**
 * the modes that are supported, used for validation & type
 * derivation
 */
export declare const modes: readonly ["dark", "light", "system"];
export declare function isValidMode(value: unknown): value is Mode;
