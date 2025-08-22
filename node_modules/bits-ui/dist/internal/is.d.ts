import type { FocusableTarget } from "./focus.js";
export declare const isBrowser: boolean;
export declare const isIOS: boolean | "";
export declare function isFunction(value: unknown): value is (...args: unknown[]) => unknown;
export declare function isHTMLElement(element: unknown): element is HTMLElement;
export declare function isElement(element: unknown): element is Element;
export declare function isElementOrSVGElement(element: unknown): element is Element | SVGElement;
export declare function isNumberString(value: string): boolean;
export declare function isNull(value: unknown): value is null;
export declare function isTouch(e: PointerEvent): boolean;
export declare function isFocusVisible(element: Element): boolean;
export declare function isNotNull<T>(value: T | null): value is T;
/**
 * Determines if the provided object is a valid `HTMLInputElement` with
 * a `select` method available.
 */
export declare function isSelectableInput(element: unknown): element is FocusableTarget & {
    select: () => void;
};
/**
 * Given a node, determine if it is hidden by walking up the
 * DOM tree until we hit the `stopAt` node (exclusive), if provided)
 * otherwise we stop at the document root.
 */
export declare function isElementHidden(node: HTMLElement, stopAt?: HTMLElement): boolean;
