import type { Getter } from "../../internal/types.js";
import { type MaybeGetter } from "runed";
export interface TextareaAutosizeOptions {
    /**
     * The textarea element to autosize.
     */
    element: MaybeGetter<HTMLElement | undefined>;
    /**
     * The current text value of the textarea.
     * Should be reactive.
     */
    input: Getter<string>;
    /**
     * Callback triggered whenever the textarea resizes.
     */
    onResize?: () => void;
    /**
     * Style property to update during resize. Defaults to `"height"`.
     * Use `"minHeight"` to allow natural expansion without shrinking.
     *
     * @default "height"
     */
    styleProp?: "height" | "minHeight";
    /**
     * Optional maximum height in pixels. If exceeded, scrolling is enabled.
     *
     * @default undefined (no limit)
     */
    maxHeight?: number;
}
/**
 * Automatically resizes a textarea element based on its content and width.
 *
 * Uses a hidden clone for accurate measurements without layout shift.
 * Reactively updates when the input or element changes, or when the
 * element is resized.
 */
export declare class TextareaAutosize {
    #private;
    element: MaybeGetter<HTMLElement | undefined>;
    input: string;
    styleProp: "height" | "minHeight";
    maxHeight: number | undefined;
    textareaHeight: number;
    textareaOldWidth: number;
    constructor(options: TextareaAutosizeOptions);
    /**
     * Recomputes the required height based on current content and applies it
     * to the textarea. If `maxHeight` is exceeded, vertical scrolling is enabled.
     */
    triggerResize: () => void;
}
