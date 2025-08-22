import Marker from './Marker.svelte';
import type { ComponentProps, Snippet } from 'svelte';
export type MarkerProps = {
    /**
     * A unique identifier for the marker.
     */
    id: string;
    /**
     * The marker or marker options to render
     */
    marker?: MarkerOptions;
};
export type MarkerOptions = ComponentProps<typeof Marker>['type'] | ComponentProps<typeof Marker> | Snippet<[{
    id: string;
}]>;
declare const MarkerWrapper: import("svelte").Component<MarkerProps, {}, "">;
type MarkerWrapper = ReturnType<typeof MarkerWrapper>;
export default MarkerWrapper;
