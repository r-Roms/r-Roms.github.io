import { type ConfigurableNavigator } from "../../internal/configurable-globals.js";
export type UseGeolocationOptions = Partial<PositionOptions> & {
    /**
     * Whether to start the watcher immediately upon creation. If set to `false`, the watcher
     * will only start tracking the position when `resume()` is called.
     *
     * @defaultValue true
     */
    immediate?: boolean;
} & ConfigurableNavigator;
export type UseGeolocationPosition = Omit<GeolocationPosition, "toJSON" | "coords"> & {
    coords: Omit<GeolocationPosition["coords"], "toJSON">;
};
export type UseGeolocationReturn = {
    readonly isSupported: boolean;
    readonly position: UseGeolocationPosition;
    readonly error: GeolocationPositionError | null;
    readonly isPaused: boolean;
    resume: () => void;
    pause: () => void;
};
/**
 * Reactive access to the browser's [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).
 *
 * @see https://runed.dev/docs/utilities/use-geolocation
 */
export declare function useGeolocation(options?: UseGeolocationOptions): UseGeolocationReturn;
