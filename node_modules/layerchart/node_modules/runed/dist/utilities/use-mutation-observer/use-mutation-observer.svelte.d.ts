import type { MaybeGetter } from "../../internal/types.js";
import { type ConfigurableWindow } from "../../internal/configurable-globals.js";
export interface UseMutationObserverOptions extends MutationObserverInit, ConfigurableWindow {
}
/**
 * Watch for changes being made to the DOM tree.
 *
 * @see https://runed.dev/docs/utilities/useMutationObserver
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver MutationObserver MDN
 */
export declare function useMutationObserver(target: MaybeGetter<HTMLElement | HTMLElement[] | null | undefined>, callback: MutationCallback, options?: UseMutationObserverOptions): {
    stop: () => void;
    takeRecords(): MutationRecord[] | undefined;
};
export type UseMutationObserverReturn = ReturnType<typeof useMutationObserver>;
