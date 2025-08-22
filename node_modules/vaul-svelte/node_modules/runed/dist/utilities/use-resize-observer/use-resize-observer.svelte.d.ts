import type { MaybeGetter } from "../../internal/types.js";
import { type ConfigurableWindow } from "../../internal/configurable-globals.js";
export interface ResizeObserverSize {
    readonly inlineSize: number;
    readonly blockSize: number;
}
export interface ResizeObserverEntry {
    readonly target: Element;
    readonly contentRect: DOMRectReadOnly;
    readonly borderBoxSize?: ReadonlyArray<ResizeObserverSize>;
    readonly contentBoxSize?: ReadonlyArray<ResizeObserverSize>;
    readonly devicePixelContentBoxSize?: ReadonlyArray<ResizeObserverSize>;
}
export type ResizeObserverCallback = (entries: ReadonlyArray<ResizeObserverEntry>, observer: ResizeObserver) => void;
export interface UseResizeObserverOptions extends ConfigurableWindow {
    /**
     * Sets which box model the observer will observe changes to. Possible values
     * are `content-box` (the default), `border-box` and `device-pixel-content-box`.
     *
     * @default 'content-box'
     */
    box?: ResizeObserverBoxOptions;
}
declare class ResizeObserver {
    constructor(callback: ResizeObserverCallback);
    disconnect(): void;
    observe(target: Element, options?: UseResizeObserverOptions): void;
    unobserve(target: Element): void;
}
/**
 * Reports changes to the dimensions of an Element's content or the border-box
 *
 * @see https://runed.dev/docs/utilities/useResizeObserver
 */
export declare function useResizeObserver(target: MaybeGetter<HTMLElement | HTMLElement[] | null | undefined>, callback: ResizeObserverCallback, options?: UseResizeObserverOptions): {
    stop: () => void;
};
export type UseResizeObserverReturn = ReturnType<typeof useResizeObserver>;
export {};
