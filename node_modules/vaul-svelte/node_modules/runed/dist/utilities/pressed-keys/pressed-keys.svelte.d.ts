import { type ConfigurableWindow } from "../../internal/configurable-globals.js";
export type PressedKeysOptions = ConfigurableWindow;
/**
 * Tracks which keys are currently pressed.
 *
 * @see {@link https://runed.dev/docs/utilities/pressed-keys}
 */
export declare class PressedKeys {
    #private;
    constructor(options?: PressedKeysOptions);
    has(...keys: string[]): boolean;
    get all(): string[];
}
