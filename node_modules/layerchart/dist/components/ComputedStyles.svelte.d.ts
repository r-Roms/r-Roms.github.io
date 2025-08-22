import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
export type ComputedStylesPropsWithoutHTML = {
    class?: HTMLAttributes<HTMLElement>['class'];
    children?: Snippet<[{
        styles: CSSStyleDeclaration;
    }]>;
};
export type ComputedStylesProps = ComputedStylesPropsWithoutHTML;
declare const ComputedStyles: import("svelte").Component<ComputedStylesPropsWithoutHTML, {}, "">;
type ComputedStyles = ReturnType<typeof ComputedStyles>;
export default ComputedStyles;
