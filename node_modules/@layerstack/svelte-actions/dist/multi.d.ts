import type { ActionReturn } from 'svelte/action';
export type Actions<TNode = HTMLElement | SVGElement> = (node: TNode) => (ActionReturn | undefined | null | void)[];
/**
 * Helper action to handle multiple actions as a single action.  Useful for adding actions for custom components
 */
export declare function multi<TNode extends HTMLElement | SVGElement = any>(node: TNode, actions?: Actions<TNode>): ActionReturn<Actions<any> | undefined> | undefined;
//# sourceMappingURL=multi.d.ts.map