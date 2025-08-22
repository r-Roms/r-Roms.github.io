export type TimerOptions<T> = {
    initial?: T;
    /** Delay between ticks in milliseconds
     * @default 1000
     */
    delay?: number;
    /** Start disabled (manually call `start()`)
     * @default false
     */
    disabled?: boolean;
    /** Called on each interval tick.  Returned value is used to update store value, defaulting to current Date */
    tick?: (current: T | null) => any;
};
/**
 * Subscribable timer/interval state
 */
export declare class TimerState<T = any> {
    #private;
    constructor(options?: TimerOptions<T>);
    get current(): T | null;
    set current(value: T | null);
    get delay(): number;
    set delay(value: number);
    start: () => void;
    stop: () => void;
    reset: () => T | null;
    get running(): boolean;
}
//# sourceMappingURL=timerState.svelte.d.ts.map