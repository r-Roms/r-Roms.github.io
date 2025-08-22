import { defaultWindow } from "../../internal/configurable-globals.js";
import { on } from "svelte/events";
import { createSubscriber } from "svelte/reactivity";
function getStorage(storageType, window) {
    switch (storageType) {
        case "local":
            return window.localStorage;
        case "session":
            return window.sessionStorage;
    }
}
/**
 * Creates reactive state that is persisted and synchronized across browser sessions and tabs using Web Storage.
 * @param key The unique key used to store the state in the storage.
 * @param initialValue The initial value of the state if not already present in the storage.
 * @param options Configuration options including storage type, serializer for complex data types, and whether to sync state changes across tabs.
 *
 * @see {@link https://runed.dev/docs/utilities/persisted-state}
 */
export class PersistedState {
    #current = $state();
    #key;
    #serializer;
    #storage;
    #subscribe;
    constructor(key, initialValue, options = {}) {
        const { storage: storageType = "local", serializer = { serialize: JSON.stringify, deserialize: JSON.parse }, syncTabs = true, window = defaultWindow, } = options;
        this.#current = initialValue;
        this.#key = key;
        this.#serializer = serializer;
        if (window === undefined)
            return;
        const storage = getStorage(storageType, window);
        this.#storage = storage;
        const existingValue = storage.getItem(key);
        if (existingValue !== null) {
            this.#deserialize(existingValue);
        }
        if (syncTabs && storageType === "local") {
            this.#subscribe = createSubscriber(() => {
                return on(window, "storage", this.#handleStorageEvent);
            });
        }
    }
    get current() {
        this.#subscribe?.();
        return this.#current;
    }
    set current(newValue) {
        this.#current = newValue;
        this.#serialize(newValue);
    }
    #handleStorageEvent = (event) => {
        if (event.key !== this.#key || event.newValue === null)
            return;
        this.#deserialize(event.newValue);
    };
    #deserialize(value) {
        try {
            this.#current = this.#serializer.deserialize(value);
        }
        catch (error) {
            console.error(`Error when parsing "${value}" from persisted store "${this.#key}"`, error);
        }
    }
    #serialize(value) {
        try {
            this.#storage?.setItem(this.#key, this.#serializer.serialize(value));
        }
        catch (error) {
            console.error(`Error when writing value from persisted store "${this.#key}" to ${this.#storage}`, error);
        }
    }
}
