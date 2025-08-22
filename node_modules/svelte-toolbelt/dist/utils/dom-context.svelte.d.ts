import type { Box } from "../types.js";
type ElementGetter = () => HTMLElement | null;
export declare class DOMContext {
    readonly element: Box<HTMLElement | null>;
    readonly root: Document | ShadowRoot;
    constructor(element: Box<HTMLElement | null> | ElementGetter);
    getDocument: () => Document;
    getWindow: () => Window & typeof globalThis;
    getActiveElement: () => HTMLElement | null;
    isActiveElement: (node: HTMLElement | null) => boolean;
    getElementById<T extends Element = HTMLElement>(id: string): T | null;
    querySelector: (selector: string) => Element | null;
    querySelectorAll: (selector: string) => NodeListOf<Element>;
    setTimeout: (callback: () => void, delay: number) => number;
    clearTimeout: (timeoutId: number) => void;
}
export {};
