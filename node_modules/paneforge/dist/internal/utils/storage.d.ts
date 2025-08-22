import type { PaneState } from "../../paneforge.svelte.js";
export interface PaneConfigState {
    expandToSizes: {
        [paneId: string]: number;
    };
    layout: number[];
}
export interface SerializedPaneGroupState {
    [paneIds: string]: PaneConfigState;
}
export interface PaneGroupStorage {
    getItem: (name: string) => string | null;
    setItem: (name: string, value: string) => void;
}
/**
 * Initializes the storage object with the appropriate getItem
 *  and setItem functions depending on the environment (browser or not).
 */
export declare function initializeStorage(storageObject: PaneGroupStorage): void;
/**
 * Loads the pane group state from local storage.
 * If the state is not found, returns null.
 */
export declare function loadPaneGroupState(autoSaveId: string, panesArray: PaneState[], storage: PaneGroupStorage): PaneConfigState | null;
/**
 * Saves the pane group state to local storage.
 */
export declare function savePaneGroupState(autoSaveId: string, panesArray: PaneState[], paneSizesBeforeCollapse: Map<string, number>, sizes: number[], storage: PaneGroupStorage): void;
/**
 * Updates the values in local storage based on the current state of
 * the pane group.
 * This function is debounced to limit the frequency of local storage writes.
 */
export declare function updateStorageValues({ autoSaveId, layout, storage, panesArray, paneSizeBeforeCollapse, }: {
    autoSaveId: string;
    layout: number[];
    storage: PaneGroupStorage;
    panesArray: PaneState[];
    paneSizeBeforeCollapse: Map<string, number>;
}): void;
