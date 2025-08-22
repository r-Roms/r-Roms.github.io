import type { AnyFunction, DrawerDirection } from "./types.js";
interface Style {
    [key: string]: string;
}
export declare function isInView(el: HTMLElement): boolean;
export declare function set(el: Element | HTMLElement | null | undefined, styles: Style, ignoreCache?: boolean): void;
export declare function reset(el: Element | HTMLElement | null, prop?: string): void;
export declare const isVertical: (direction: DrawerDirection) => boolean;
export declare function getTranslate(element: HTMLElement, direction: DrawerDirection): number | null;
export declare function dampenValue(v: number): number;
export declare function assignStyle(element: HTMLElement | null | undefined, style: Partial<CSSStyleDeclaration>): () => void;
/**
 * Receives functions as arguments and returns a new function that calls all.
 */
export declare function chain<T>(...fns: T[]): (...args: T extends AnyFunction ? Parameters<T> : never) => void;
export {};
