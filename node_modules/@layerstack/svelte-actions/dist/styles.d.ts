import type { Action } from 'svelte/action';
type CSSProps = {
    [key: string]: string | number | boolean | null | undefined;
};
export declare const styleProps: Action<HTMLElement, CSSProps>;
type ComputedStylesCallback = (styles: CSSStyleDeclaration) => void;
export declare const computedStyles: Action<HTMLElement | SVGElement, ComputedStylesCallback>;
export {};
//# sourceMappingURL=styles.d.ts.map