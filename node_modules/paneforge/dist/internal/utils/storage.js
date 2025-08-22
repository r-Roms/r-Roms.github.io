import { LOCAL_STORAGE_DEBOUNCE_INTERVAL } from "../constants.js";
/**
 * Initializes the storage object with the appropriate getItem
 *  and setItem functions depending on the environment (browser or not).
 */
export function initializeStorage(storageObject) {
    try {
        if (typeof localStorage === "undefined") {
            throw new TypeError("localStorage is not supported in this environment");
        }
        storageObject.getItem = (name) => localStorage.getItem(name);
        storageObject.setItem = (name, value) => localStorage.setItem(name, value);
    }
    catch (err) {
        console.error(err);
        storageObject.getItem = () => null;
        storageObject.setItem = () => { };
    }
}
/**
 * Returns the key to use for storing the pane group state in local storage.
 */
function getPaneGroupKey(autoSaveId) {
    return `paneforge:${autoSaveId}`;
}
/**
 * Returns a key to use for storing the pane state in local storage.
 * The key is based on the pane order and constraints.
 */
function getPaneKey(panes) {
    const sortedPaneIds = panes
        .map((pane) => {
        return pane.opts.order.current
            ? `${pane.opts.order.current}:${JSON.stringify(pane.constraints)}`
            : JSON.stringify(pane.constraints);
    })
        .sort()
        .join(",");
    return sortedPaneIds;
}
/**
 * Loads the serialized pane group state from local storage.
 * If the state is not found, returns null.
 */
function loadSerializedPaneGroupState(autoSaveId, storage) {
    try {
        const paneGroupKey = getPaneGroupKey(autoSaveId);
        const serialized = storage.getItem(paneGroupKey);
        const parsed = JSON.parse(serialized || "");
        if (typeof parsed === "object" && parsed !== null) {
            return parsed;
        }
    }
    catch {
        // noop
    }
    return null;
}
/**
 * Loads the pane group state from local storage.
 * If the state is not found, returns null.
 */
export function loadPaneGroupState(autoSaveId, panesArray, storage) {
    const state = loadSerializedPaneGroupState(autoSaveId, storage) || {};
    const paneKey = getPaneKey(panesArray);
    return state[paneKey] || null;
}
/**
 * Saves the pane group state to local storage.
 */
export function savePaneGroupState(autoSaveId, panesArray, paneSizesBeforeCollapse, sizes, storage) {
    const paneGroupKey = getPaneGroupKey(autoSaveId);
    const paneKey = getPaneKey(panesArray);
    const state = loadSerializedPaneGroupState(autoSaveId, storage) || {};
    state[paneKey] = {
        expandToSizes: Object.fromEntries(paneSizesBeforeCollapse.entries()),
        layout: sizes,
    };
    try {
        storage.setItem(paneGroupKey, JSON.stringify(state));
    }
    catch (error) {
        console.error(error);
    }
}
const debounceMap = {};
/**
 * Returns a debounced version of the given function.
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function debounce(callback, durationMs = 10) {
    let timeoutId = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callable = (...args) => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callback(...args);
        }, durationMs);
    };
    return callable;
}
/**
 * Updates the values in local storage based on the current state of
 * the pane group.
 * This function is debounced to limit the frequency of local storage writes.
 */
export function updateStorageValues({ autoSaveId, layout, storage, panesArray, paneSizeBeforeCollapse, }) {
    // If this pane has been configured to persist sizing
    // information, save sizes to local storage.
    if (layout.length === 0 || layout.length !== panesArray.length)
        return;
    let debouncedSave = debounceMap[autoSaveId];
    // Limit frequency of local storage writes.
    if (debouncedSave == null) {
        debouncedSave = debounce(savePaneGroupState, LOCAL_STORAGE_DEBOUNCE_INTERVAL);
        debounceMap[autoSaveId] = debouncedSave;
    }
    // Clone mutable data before passing to the debounced function,
    // else we run the risk of saving an incorrect combination of mutable and immutable values to state.
    const clonedPanesArray = [...panesArray];
    const clonedPaneSizesBeforeCollapse = new Map(paneSizeBeforeCollapse);
    debouncedSave(autoSaveId, clonedPanesArray, clonedPaneSizesBeforeCollapse, layout, storage);
}
