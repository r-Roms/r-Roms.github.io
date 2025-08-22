import type { MaybeGetter, Setter } from "../../internal/types.js";
type LogEvent<T> = {
    snapshot: T;
    timestamp: number;
};
type StateHistoryOptions = {
    capacity?: MaybeGetter<number>;
};
/**
 * Tracks the change history of a value, providing undo and redo capabilities.
 *
 * @see {@link https://runed.dev/docs/utilities/state-history}
 */
export declare class StateHistory<T> {
    #private;
    log: LogEvent<T>[];
    readonly canUndo: boolean;
    readonly canRedo: boolean;
    constructor(value: MaybeGetter<T>, set: Setter<T>, options?: StateHistoryOptions);
    undo(): void;
    redo(): void;
}
export {};
