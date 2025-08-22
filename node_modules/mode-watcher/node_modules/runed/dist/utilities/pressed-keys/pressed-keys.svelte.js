import { defaultWindow } from "../../internal/configurable-globals.js";
import { useEventListener } from "../use-event-listener/use-event-listener.svelte.js";
/**
 * Tracks which keys are currently pressed.
 *
 * @see {@link https://runed.dev/docs/utilities/pressed-keys}
 */
export class PressedKeys {
    #pressedKeys = $state([]);
    constructor(options = {}) {
        const { window = defaultWindow } = options;
        this.has = this.has.bind(this);
        if (!window)
            return;
        useEventListener(window, "keydown", (e) => {
            const key = e.key.toLowerCase();
            if (!this.#pressedKeys.includes(key)) {
                this.#pressedKeys.push(key);
            }
        });
        useEventListener(window, "keyup", (e) => {
            const key = e.key.toLowerCase();
            this.#pressedKeys = this.#pressedKeys.filter((k) => k !== key);
        });
    }
    has(...keys) {
        const normalizedKeys = keys.map((key) => key.toLowerCase());
        return normalizedKeys.every((key) => this.#pressedKeys.includes(key));
    }
    get all() {
        return this.#pressedKeys;
    }
}
