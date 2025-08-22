import { Context } from "runed";
import { type ReadableBoxedValues } from "svelte-toolbelt";
import type { BitsConfigPropsWithoutChildren } from "./types.js";
type BitsConfigStateProps = ReadableBoxedValues<BitsConfigPropsWithoutChildren>;
export declare const BitsConfigContext: Context<BitsConfigState>;
/**
 * Gets the current Bits UI configuration state from the context.
 *
 * Returns a default configuration (where all values are `undefined`) if no configuration is found.
 */
export declare function getBitsConfig(): Required<ReadableBoxedValues<BitsConfigPropsWithoutChildren>>;
/**
 * Creates and sets a new Bits UI configuration state that inherits from parent configs.
 *
 * @param opts - Configuration options for this level
 * @returns The configuration state instance
 *
 * @example
 * ```typescript
 * // In a component that wants to set a default portal target
 * const config = useBitsConfig({ defaultPortalTo: box("#some-element") });
 *
 * // Child components will inherit this config and can override specific values
 * const childConfig = useBitsConfig({ someOtherProp: box("value") });
 * // childConfig still has defaultPortalTo="#some-element" from parent
 * ```
 */
export declare function useBitsConfig(opts: BitsConfigStateProps): BitsConfigState;
/**
 * Configuration state that inherits from parent configurations.
 *
 * @example
 * Config resolution:
 * ```
 * Level 1: { defaultPortalTo: "#some-element", theme: "dark" }
 * Level 2: { spacing: "large" } // inherits defaultPortalTo="#some-element", theme="dark"
 * Level 3: { theme: "light" }   // inherits defaultPortalTo="#some-element", spacing="large", overrides theme="light"
 * ```
 */
export declare class BitsConfigState {
    readonly opts: Required<BitsConfigStateProps>;
    constructor(parent: BitsConfigState | null, opts: BitsConfigStateProps);
}
export {};
