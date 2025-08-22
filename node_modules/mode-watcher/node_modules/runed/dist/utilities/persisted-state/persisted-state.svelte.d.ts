import { type ConfigurableWindow } from "../../internal/configurable-globals.js";
type Serializer<T> = {
    serialize: (value: T) => string;
    deserialize: (value: string) => T | undefined;
};
type StorageType = "local" | "session";
type PersistedStateOptions<T> = {
    /** The storage type to use. Defaults to `local`. */
    storage?: StorageType;
    /** The serializer to use. Defaults to `JSON.stringify` and `JSON.parse`. */
    serializer?: Serializer<T>;
    /** Whether to sync with the state changes from other tabs. Defaults to `true`. */
    syncTabs?: boolean;
} & ConfigurableWindow;
/**
 * Creates reactive state that is persisted and synchronized across browser sessions and tabs using Web Storage.
 * @param key The unique key used to store the state in the storage.
 * @param initialValue The initial value of the state if not already present in the storage.
 * @param options Configuration options including storage type, serializer for complex data types, and whether to sync state changes across tabs.
 *
 * @see {@link https://runed.dev/docs/utilities/persisted-state}
 */
export declare class PersistedState<T> {
    #private;
    constructor(key: string, initialValue: T, options?: PersistedStateOptions<T>);
    get current(): T;
    set current(newValue: T);
}
export {};
