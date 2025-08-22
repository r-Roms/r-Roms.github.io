import { SvelteComponentTyped } from "svelte";
import type { Readable } from 'svelte/store';
type EncodeableData = unknown | Promise<unknown>;
type EncodeableDataStore = Readable<EncodeableData>;
type DebugData = EncodeableData | EncodeableDataStore;
type $$ComponentProps = {
    /**
     * Data to be displayed as pretty JSON.
     *
     * @type {DebugData}
     */
    data: DebugData;
    /**
     * Controls when the component should be displayed.
     *
     * Default: `true`.
     */
    display?: boolean;
    /**
     * Controls when to show the HTTP status code of the current page (reflecs the status code of the last request).
     *
     * Default is `true`.
     */
    status?: boolean;
    /**
     * Optional label to identify the component easily.
     */
    label?: string;
    /**
     * Controls the maximum length of a string field of the data prop.
     *
     * Default is `120` characters. Set to `0` to disable trimming.
     */
    stringTruncate?: number;
    /**
     * Reference to the pre element that contains the data.
     *
     * @type {HTMLPreElement | undefined}
     */
    ref?: HTMLPreElement | undefined;
    /**
     * Controls if the data prop should be treated as a promise (skips promise detection when true).
     *
     * Default is `false`.
     * @deprecated Promises are auto-detected from 1.3.0.
     */
    promise?: boolean;
    /**
     * Controls if the data prop should be treated as a plain object (skips promise and store detection when true, prevails over promise prop).
     *
     * Default is `false`.
     */
    raw?: boolean;
    /**
     * Enables the display of fields of the data prop that are functions.
     *
     * Default is `false`.
     */
    functions?: boolean;
    /**
     * Theme, which can also be customized with CSS variables:
     *
     * ```txt
     * --sd-bg-color
     * --sd-label-color
     * --sd-promise-loading-color
     * --sd-promise-rejected-color
     * --sd-code-default
     * --sd-info
     * --sd-success
     * --sd-redirect
     * --sd-error
     * --sd-code-key
     * --sd-code-string
     * --sd-code-date
     * --sd-code-boolean
     * --sd-code-number
     * --sd-code-bigint
     * --sd-code-null
     * --sd-code-nan
     * --sd-code-undefined
     * --sd-code-function
     * --sd-code-symbol
     * --sd-code-error
     * --sd-sb-width
     * --sd-sb-height
     * --sd-sb-track-color
     * --sd-sb-track-color-focus
     * --sd-sb-thumb-color
     * --sd-sb-thumb-color-focus
     * ```
     *
     * @type {"default" | "vscode"}
     */
    theme?: 'default' | 'vscode';
    /**
     * Will show a collapse bar at the bottom of the component, that can be used to hide and show the output. Default is `false`.
     * When toggled, the state is saved in session storage for all SuperDebug components on the page.
     */
    collapsible?: boolean;
    /**
     * Initial state for the collapsed component. Use together with the `collapsible` prop.
     * On subsequent page loads, the session storage will determine the state of all SuperDebug components on the page.
     */
    collapsed?: boolean;
    children?: import('svelte').Snippet;
};
declare const __propDef: {
    props: $$ComponentProps;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SuperDebugRunedProps = typeof __propDef.props;
export type SuperDebugRunedEvents = typeof __propDef.events;
export type SuperDebugRunedSlots = typeof __propDef.slots;
/**
 * SuperDebug is a debugging component that gives you colorized and nicely formatted output for any data structure, usually $form.
 *
 *  Other use cases includes debugging plain objects, promises, stores and more.
 *
 *  More info: https://superforms.rocks/super-debug
 *
 * This is the rune (Svelte 5) version of SuperDebug, which will be default in the next major release.
 *
 *  **Short example:**
 *
 *  ```svelte
 *  <script>
 *    import SuperDebug from 'sveltekit-superforms/SuperDebug.svelte';
 *    import { superForm } from 'sveltekit-superforms';
 *
 *    const { data } = $props();
 *
 *    const { errors, form, enhance } = superForm(data.form);
 *  </script>
 *
 *  <SuperDebug data={$form} label="My form data" />
 *  ```
 */
export default class SuperDebugRuned extends SvelteComponentTyped<SuperDebugRunedProps, SuperDebugRunedEvents, SuperDebugRunedSlots> {
}
export {};
