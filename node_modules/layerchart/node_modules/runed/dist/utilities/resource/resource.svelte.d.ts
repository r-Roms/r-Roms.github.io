import type { Getter } from "../../internal/types.js";
/**
 * Configuration options for the resource function
 */
export type ResourceOptions<Data> = {
    /** Skip initial fetch when true */
    lazy?: boolean;
    /** Only fetch once when true */
    once?: boolean;
    /** Initial value for the resource */
    initialValue?: Data;
    /** Debounce time in milliseconds */
    debounce?: number;
    /** Throttle time in milliseconds */
    throttle?: number;
};
/**
 * Core state of a resource
 */
export type ResourceState<Data, HasInitialValue extends boolean = false> = {
    /** Current value of the resource */
    current: HasInitialValue extends true ? Data : Data | undefined;
    /** Whether the resource is currently loading */
    loading: boolean;
    /** Error if the fetch failed */
    error: Error | undefined;
};
/**
 * Return type of the resource function, extends ResourceState with additional methods
 */
export type ResourceReturn<Data, RefetchInfo = unknown, HasInitialValue extends boolean = false> = ResourceState<Data, HasInitialValue> & {
    /** Update the resource value directly */
    mutate: (value: Data) => void;
    /** Re-run the fetcher with current values */
    refetch: (info?: RefetchInfo) => Promise<Data | undefined>;
};
export type ResourceFetcherRefetchInfo<Data, RefetchInfo = unknown> = {
    /** Previous data return from fetcher */
    data: Data | undefined;
    /** Whether the fetcher is currently refetching or it can be the value you passed to refetch. */
    refetching: RefetchInfo | boolean;
    /** A cleanup function that will be called when the source is invalidated and the fetcher is about to re-run */
    onCleanup: (fn: () => void) => void;
    /** AbortSignal for cancelling fetch requests */
    signal: AbortSignal;
};
export type ResourceFetcher<Source, Data, RefetchInfo = unknown> = (
/** Current value of the source */
value: Source extends Array<unknown> ? {
    [K in keyof Source]: Source[K];
} : Source, 
/** Previous value of the source */
previousValue: Source extends Array<unknown> ? {
    [K in keyof Source]: Source[K];
} : Source | undefined, info: ResourceFetcherRefetchInfo<Data, RefetchInfo>) => Promise<Data>;
/**
 * Creates a reactive resource that combines reactive dependency tracking with async data fetching.
 * This version uses watch under the hood and runs after render.
 * For pre-render execution, use resource.pre().
 *
 * Features:
 * - Automatic request cancellation when dependencies change
 * - Built-in loading and error states
 * - Support for initial values and lazy loading
 * - Type-safe reactive dependencies
 *
 * @example
 * ```typescript
 * // Basic usage with automatic request cancellation
 * const userResource = resource(
 *   () => userId,
 *   async (newId, prevId, { signal }) => {
 *     const res = await fetch(`/api/users/${newId}`, { signal });
 *     return res.json();
 *   }
 * );
 *
 * // Multiple dependencies
 * const searchResource = resource(
 *   [() => query, () => page],
 *   async ([query, page], [prevQuery, prevPage], { signal }) => {
 *     const res = await fetch(
 *       `/api/search?q=${query}&page=${page}`,
 *       { signal }
 *     );
 *     return res.json();
 *   },
 *   { lazy: true }
 * );
 *
 * // Custom cleanup with built-in request cancellation
 * const streamResource = resource(
 *   () => streamId,
 *   async (id, prevId, { signal, onCleanup }) => {
 *     const eventSource = new EventSource(`/api/stream/${id}`);
 *     onCleanup(() => eventSource.close());
 *
 *     const res = await fetch(`/api/stream/${id}/init`, { signal });
 *     return res.json();
 *   }
 * );
 * ```
 */
export declare function resource<Source, RefetchInfo = unknown, Fetcher extends ResourceFetcher<Source, Awaited<ReturnType<Fetcher>>, RefetchInfo> = ResourceFetcher<Source, any, RefetchInfo>>(source: Getter<Source>, fetcher: Fetcher, options: ResourceOptions<Awaited<ReturnType<Fetcher>>> & {
    initialValue: Awaited<ReturnType<Fetcher>>;
}): ResourceReturn<Awaited<ReturnType<Fetcher>>, RefetchInfo, true>;
export declare function resource<Source, RefetchInfo = unknown, Fetcher extends ResourceFetcher<Source, Awaited<ReturnType<Fetcher>>, RefetchInfo> = ResourceFetcher<Source, any, RefetchInfo>>(source: Getter<Source>, fetcher: Fetcher, options?: Omit<ResourceOptions<Awaited<ReturnType<Fetcher>>>, "initialValue">): ResourceReturn<Awaited<ReturnType<Fetcher>>, RefetchInfo, false>;
export declare function resource<Sources extends Array<unknown>, RefetchInfo = unknown, Fetcher extends ResourceFetcher<Sources, Awaited<ReturnType<Fetcher>>, RefetchInfo> = ResourceFetcher<Sources, any, RefetchInfo>>(sources: {
    [K in keyof Sources]: Getter<Sources[K]>;
}, fetcher: Fetcher, options: ResourceOptions<Awaited<ReturnType<Fetcher>>> & {
    initialValue: Awaited<ReturnType<Fetcher>>;
}): ResourceReturn<Awaited<ReturnType<Fetcher>>, RefetchInfo, true>;
export declare function resource<Sources extends Array<unknown>, RefetchInfo = unknown, Fetcher extends ResourceFetcher<Sources, Awaited<ReturnType<Fetcher>>, RefetchInfo> = ResourceFetcher<Sources, any, RefetchInfo>>(sources: {
    [K in keyof Sources]: Getter<Sources[K]>;
}, fetcher: Fetcher, options?: Omit<ResourceOptions<Awaited<ReturnType<Fetcher>>>, "initialValue">): ResourceReturn<Awaited<ReturnType<Fetcher>>, RefetchInfo, false>;
export declare namespace resource {
    var pre: typeof resourcePre;
}
/**
 * Helper function to create a resource with pre-effect (runs before render).
 * Uses watch.pre internally instead of watch for pre-render execution.
 * Includes all features of the standard resource including automatic request cancellation.
 *
 * @example
 * ```typescript
 * // Pre-render resource with automatic cancellation
 * const data = resource.pre(
 *   () => query,
 *   async (newQuery, prevQuery, { signal }) => {
 *     const res = await fetch(`/api/search?q=${newQuery}`, { signal });
 *     return res.json();
 *   }
 * );
 * ```
 */
export declare function resourcePre<Source, RefetchInfo = unknown, Fetcher extends ResourceFetcher<Source, Awaited<ReturnType<Fetcher>>, RefetchInfo> = ResourceFetcher<Source, any, RefetchInfo>>(source: Getter<Source>, fetcher: Fetcher, options: ResourceOptions<Awaited<ReturnType<Fetcher>>> & {
    initialValue: Awaited<ReturnType<Fetcher>>;
}): ResourceReturn<Awaited<ReturnType<Fetcher>>, RefetchInfo, true>;
export declare function resourcePre<Source, RefetchInfo = unknown, Fetcher extends ResourceFetcher<Source, Awaited<ReturnType<Fetcher>>, RefetchInfo> = ResourceFetcher<Source, any, RefetchInfo>>(source: Getter<Source>, fetcher: Fetcher, options?: Omit<ResourceOptions<Awaited<ReturnType<Fetcher>>>, "initialValue">): ResourceReturn<Awaited<ReturnType<Fetcher>>, RefetchInfo, false>;
export declare function resourcePre<Sources extends Array<unknown>, RefetchInfo = unknown, Fetcher extends ResourceFetcher<Sources, Awaited<ReturnType<Fetcher>>, RefetchInfo> = ResourceFetcher<Sources, any, RefetchInfo>>(sources: {
    [K in keyof Sources]: Getter<Sources[K]>;
}, fetcher: Fetcher, options: ResourceOptions<Awaited<ReturnType<Fetcher>>> & {
    initialValue: Awaited<ReturnType<Fetcher>>;
}): ResourceReturn<Awaited<ReturnType<Fetcher>>, RefetchInfo, true>;
export declare function resourcePre<Sources extends Array<unknown>, RefetchInfo = unknown, Fetcher extends ResourceFetcher<Sources, Awaited<ReturnType<Fetcher>>, RefetchInfo> = ResourceFetcher<Sources, any, RefetchInfo>>(sources: {
    [K in keyof Sources]: Getter<Sources[K]>;
}, fetcher: Fetcher, options?: Omit<ResourceOptions<Awaited<ReturnType<Fetcher>>>, "initialValue">): ResourceReturn<Awaited<ReturnType<Fetcher>>, RefetchInfo, false>;
