import type { Direction, Orientation } from "../shared/index.js";
export declare const FIRST_KEYS: string[];
export declare const LAST_KEYS: string[];
export declare const FIRST_LAST_KEYS: string[];
export declare const SELECTION_KEYS: string[];
/**
 * A utility function that returns the next key based on the direction and orientation.
 */
export declare function getNextKey(dir?: Direction, orientation?: Orientation): string;
/**
 * A utility function that returns the previous key based on the direction and orientation.
 */
export declare function getPrevKey(dir?: Direction, orientation?: Orientation): string;
/**
 * A utility function that returns the next and previous keys based on the direction
 * and orientation.
 */
export declare function getDirectionalKeys(dir?: Direction, orientation?: Orientation): {
    nextKey: string;
    prevKey: string;
};
