import type { MaybeGetter } from "../../internal/types.js";
import { type ConfigurableDocument, type ConfigurableWindow } from "../../internal/configurable-globals.js";
export type IsIdleOptions = ConfigurableDocument & ConfigurableWindow & {
    /**
     * The events that should set the idle state to `true`
     *
     * @default ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']
     */
    events?: MaybeGetter<(keyof WindowEventMap)[]>;
    /**
     * The timeout in milliseconds before the idle state is set to `true`. Defaults to 60 seconds.
     *
     * @default 60000
     */
    timeout?: MaybeGetter<number>;
    /**
     * Detect document visibility changes
     *
     * @default false
     */
    detectVisibilityChanges?: MaybeGetter<boolean>;
    /**
     * The initial state of the idle property
     *
     * @default false
     */
    initialState?: boolean;
};
/**
 * Tracks whether the user is being inactive.
 * @see {@link https://runed.dev/docs/utilities/is-idle}
 */
export declare class IsIdle {
    #private;
    constructor(_options?: IsIdleOptions);
    get lastActive(): number;
    get current(): boolean;
}
