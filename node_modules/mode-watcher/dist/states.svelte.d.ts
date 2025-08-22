import type { ThemeColors } from "./types.js";
/**
 * Theme colors for light and dark modes.
 */
export declare const themeColors: import("svelte-toolbelt").WritableBox<ThemeColors>;
/**
 * Whether to disable transitions when changing the mode.
 */
export declare const disableTransitions: import("svelte-toolbelt").WritableBox<boolean>;
/**
 * Whether to run the mode changes synchronously instead of using
 * an animation frame. If true, will have an impact on blocking performance
 * due to blocking the main thread.
 */
export declare const synchronousModeChanges: import("svelte-toolbelt").WritableBox<boolean>;
/**
 * The classnames to add to the root `html` element when the mode is dark.
 */
export declare const darkClassNames: import("svelte-toolbelt").WritableBox<string[]>;
/**
 * The classnames to add to the root `html` element when the mode is light.
 */
export declare const lightClassNames: import("svelte-toolbelt").WritableBox<string[]>;
/**
 * Derived store that represents the current mode (`"dark"`, `"light"` or `undefined`)
 */
export declare const derivedMode: {
    readonly current: import("./mode-states.svelte.js").SystemModeValue;
};
/**
 * Derived store that represents the current custom theme
 */
export declare const derivedTheme: {
    readonly current: string | undefined;
};
export { derivedMode as mode, derivedTheme as theme };
