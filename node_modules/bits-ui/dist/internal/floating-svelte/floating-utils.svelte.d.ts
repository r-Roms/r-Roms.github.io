import type { MaybeGetter } from "svelte-toolbelt";
export declare function get<T>(valueOrGetValue: MaybeGetter<T>): T;
export declare function getDPR(element: Element): number;
export declare function roundByDPR(element: Element, value: number): number;
export declare function getFloatingContentCSSVars(name: string): {
    [x: string]: string;
};
