import { createTable, } from "@tanstack/table-core";
/**
 * Creates a reactive TanStack table object for Svelte.
 * @param options Table options to create the table with.
 * @returns A reactive table object.
 * @example
 * ```svelte
 * <script>
 *   const table = createSvelteTable({ ... })
 * </script>
 *
 * <table>
 *   <thead>
 *     {#each table.getHeaderGroups() as headerGroup}
 *       <tr>
 *         {#each headerGroup.headers as header}
 *           <th colspan={header.colSpan}>
 *         	   <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
 *         	 </th>
 *         {/each}
 *       </tr>
 *     {/each}
 *   </thead>
 * 	 <!-- ... -->
 * </table>
 * ```
 */
export function createSvelteTable(options) {
    const resolvedOptions = mergeObjects({
        state: {},
        onStateChange() { },
        renderFallbackValue: null,
        mergeOptions: (defaultOptions, options) => {
            return mergeObjects(defaultOptions, options);
        },
    }, options);
    const table = createTable(resolvedOptions);
    let state = $state(table.initialState);
    function updateOptions() {
        table.setOptions((prev) => {
            return mergeObjects(prev, options, {
                state: mergeObjects(state, options.state || {}),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onStateChange: (updater) => {
                    if (updater instanceof Function)
                        state = updater(state);
                    else
                        state = mergeObjects(state, updater);
                    options.onStateChange?.(updater);
                },
            });
        });
    }
    updateOptions();
    $effect.pre(() => {
        updateOptions();
    });
    return table;
}
/**
 * Lazily merges several objects (or thunks) while preserving
 * getter semantics from every source.
 *
 * Proxy-based to avoid known WebKit recursion issue.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mergeObjects(...sources) {
    const resolve = (src) => typeof src === "function" ? (src() ?? undefined) : src;
    const findSourceWithKey = (key) => {
        for (let i = sources.length - 1; i >= 0; i--) {
            const obj = resolve(sources[i]);
            if (obj && key in obj)
                return obj;
        }
        return undefined;
    };
    return new Proxy(Object.create(null), {
        get(_, key) {
            const src = findSourceWithKey(key);
            return src?.[key];
        },
        has(_, key) {
            return !!findSourceWithKey(key);
        },
        ownKeys() {
            const all = new Set();
            for (const s of sources) {
                const obj = resolve(s);
                if (obj) {
                    for (const k of Reflect.ownKeys(obj)) {
                        all.add(k);
                    }
                }
            }
            return [...all];
        },
        getOwnPropertyDescriptor(_, key) {
            const src = findSourceWithKey(key);
            if (!src)
                return undefined;
            return {
                configurable: true,
                enumerable: true,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value: src[key],
                writable: true,
            };
        },
    });
}
