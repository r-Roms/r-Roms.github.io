import { type Getter, type ReadableBox } from "svelte-toolbelt";
/**
 * Resolves a locale value using the prop, the config default, or a fallback.
 *
 * Default value: `"en"`
 */
export declare const resolveLocaleProp: (getProp: Getter<string | undefined>) => ReadableBox<string>;
/**
 * Resolves a portal's `to` value using the prop, the config default, or a fallback.
 *
 * Default value: `"body"`
 */
export declare const resolvePortalToProp: (getProp: Getter<string | Element | undefined>) => ReadableBox<string | Element>;
