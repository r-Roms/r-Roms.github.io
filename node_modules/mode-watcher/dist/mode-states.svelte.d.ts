import type { Mode } from "./types.js";
export declare class UserPrefersMode {
    #private;
    constructor();
    get current(): Mode;
    set current(newValue: Mode);
}
export type SystemModeValue = "light" | "dark" | undefined;
export declare class SystemPrefersMode {
    #private;
    query(): void;
    tracking(active: boolean): void;
    constructor();
    get current(): SystemModeValue;
}
/**
 * Writable state that represents the user's preferred mode
 * (`"dark"`, `"light"` or `"system"`)
 */
export declare const userPrefersMode: UserPrefersMode;
/**
 * Readable store that represents the system's preferred mode (`"dark"`, `"light"` or `undefined`)
 */
export declare const systemPrefersMode: SystemPrefersMode;
