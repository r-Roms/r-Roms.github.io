import type { Action } from 'svelte/action';
import { focusMove } from './focus.js';
/**
 * Auto focus node when rendered.  Useful for inputs
 */
export declare function autoFocus(node: HTMLElement | SVGElement, options?: Parameters<typeof focusMove>['1']): import("svelte/action").ActionReturn<undefined, Record<never, any>>;
/**
 * Selects the text inside a text node when the node is focused
 */
export declare const selectOnFocus: Action<HTMLInputElement | HTMLTextAreaElement>;
/**
 * Blurs the node when Escape is pressed
 */
export declare const blurOnEscape: Action<HTMLInputElement | HTMLTextAreaElement>;
/**
 * Automatically resize textarea based on content
 * See:
 *  - https://svelte.dev/repl/ead0f1fcd2d4402bbbd64eca1d665341?version=3.14.1
 *  - https://svelte.dev/repl/f1a7e24a08a54947bb4447f295c741fb?version=3.14.1
 */
export declare const autoHeight: Action<HTMLTextAreaElement>;
/**
 * Debounce event handler (change, input, etc)
 */
export declare const debounceEvent: Action<HTMLInputElement | HTMLTextAreaElement, {
    type: string;
    listener: (e: Event) => any;
    timeout?: number;
} | undefined | null>;
//# sourceMappingURL=input.d.ts.map