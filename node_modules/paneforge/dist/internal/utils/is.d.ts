import type { ResizeEvent } from "../types.js";
export declare const isBrowser: boolean;
export declare function isHTMLElement(element: unknown): element is HTMLElement;
export declare function isKeyDown(event: ResizeEvent): event is KeyboardEvent;
export declare function isMouseEvent(event: ResizeEvent): event is MouseEvent;
export declare function isTouchEvent(event: ResizeEvent): event is TouchEvent;
