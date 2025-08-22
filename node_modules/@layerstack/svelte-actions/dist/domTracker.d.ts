import type { Action, ActionReturn } from 'svelte/action';
/**
 * Apply changes to an HTMLElement with the ability to reverse.
 * Useful with Svelte actions when being destroyed
 */
export default class DomTracker {
    node: HTMLElement;
    changes: {
        classes: string[];
        styles: {
            property: string;
            value: string;
        }[];
        attributes: {
            qualifiedName: string;
            value: string;
        }[];
        eventListeners: {
            type: string;
            listener: () => any;
        }[];
        actions: Map<string, ActionReturn | void>;
    };
    constructor(node: HTMLElement);
    addClass(className: string): void;
    addStyle(property: string, value: string): void;
    addAttribute(qualifiedName: string, value: string): void;
    addEventListener(type: string, listener: () => any): void;
    addAction<TOptions>(action: Action, options: TOptions): void;
    reset(): void;
    destroy(): void;
}
//# sourceMappingURL=domTracker.d.ts.map