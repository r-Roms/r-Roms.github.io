import type { Snippet } from 'svelte';
export type GeoVisibleProps = {
    /** Latitude */
    lat: number;
    /** Longitude */
    long: number;
    children?: Snippet;
};
declare const GeoVisible: import("svelte").Component<GeoVisibleProps, {}, "">;
type GeoVisible = ReturnType<typeof GeoVisible>;
export default GeoVisible;
