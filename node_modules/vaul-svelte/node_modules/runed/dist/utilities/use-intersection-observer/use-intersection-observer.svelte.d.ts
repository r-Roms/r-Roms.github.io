import type { MaybeElementGetter, MaybeGetter } from "../../internal/types.js";
import { type ConfigurableWindow } from "../../internal/configurable-globals.js";
export interface UseIntersectionObserverOptions extends Omit<IntersectionObserverInit, "root">, ConfigurableWindow {
    /**
     * Whether to start the observer immediately upon creation. If set to `false`, the observer
     * will only start observing when `resume()` is called.
     *
     * @defaultValue true
     */
    immediate?: boolean;
    /**
     * The root document/element to use as the bounding box for the intersection.
     */
    root?: MaybeElementGetter;
}
/**
 * Watch for intersection changes of a target element.
 *
 * @see https://runed.dev/docs/utilities/useIntersectionObserver
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver IntersectionObserver MDN
 */
export declare function useIntersectionObserver(target: MaybeGetter<HTMLElement | HTMLElement[] | null | undefined>, callback: IntersectionObserverCallback, options?: UseIntersectionObserverOptions): {
    readonly isActive: boolean;
    stop: () => void;
    pause(): void;
    resume(): void;
};
export type UseIntersectionObserverReturn = ReturnType<typeof useIntersectionObserver>;
