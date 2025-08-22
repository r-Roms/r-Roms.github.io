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
    /**
     * Registers a callback to execute when specified key combination is pressed.
     *
     * @param keys - Array or single string of keys to monitor
     * @param callback - Function to execute when the key combination is matched
     */
    onKeys(keys: string | string[], callback: () => void): void;
}
