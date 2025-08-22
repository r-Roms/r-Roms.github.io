import { PersistedState, watch } from "runed";
import { isBrowser, noopStorage } from "./utils.js";
import { modeStorageKey } from "./storage-keys.svelte.js";
import { isValidMode } from "./modes.js";
import { MediaQuery } from "svelte/reactivity";
export class UserPrefersMode {
    #defaultValue = "system";
    #storage = isBrowser ? localStorage : noopStorage;
    #initialValue = this.#storage.getItem(modeStorageKey.current);
    #value = isValidMode(this.#initialValue) ? this.#initialValue : this.#defaultValue;
    #persisted = $state(this.#makePersisted());
    #makePersisted(value = this.#value) {
        return new PersistedState(modeStorageKey.current, value, {
            serializer: {
                serialize: (v) => v,
                deserialize: (v) => {
                    if (isValidMode(v))
                        return v;
                    return this.#defaultValue;
                },
            },
        });
    }
    constructor() {
        $effect.root(() => {
            return watch.pre(() => modeStorageKey.current, (_, prevStorageKey) => {
                const currModeValue = this.#persisted.current;
                this.#persisted = this.#makePersisted(currModeValue);
                if (prevStorageKey) {
                    localStorage.removeItem(prevStorageKey);
                }
            });
        });
    }
    get current() {
        return this.#persisted.current;
    }
    set current(newValue) {
        this.#persisted.current = newValue;
    }
}
export class SystemPrefersMode {
    #defaultValue = undefined;
    #track = true;
    #current = $state(this.#defaultValue);
    #mediaQueryState = typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? new MediaQuery("prefers-color-scheme: light")
        : { current: false };
    query() {
        if (!isBrowser)
            return;
        this.#current = this.#mediaQueryState.current ? "light" : "dark";
    }
    tracking(active) {
        this.#track = active;
    }
    constructor() {
        $effect.root(() => {
            $effect.pre(() => {
                if (!this.#track)
                    return;
                this.query();
            });
        });
        this.query = this.query.bind(this);
        this.tracking = this.tracking.bind(this);
    }
    get current() {
        return this.#current;
    }
}
/**
 * Writable state that represents the user's preferred mode
 * (`"dark"`, `"light"` or `"system"`)
 */
export const userPrefersMode = new UserPrefersMode();
/**
 * Readable store that represents the system's preferred mode (`"dark"`, `"light"` or `undefined`)
 */
export const systemPrefersMode = new SystemPrefersMode();
