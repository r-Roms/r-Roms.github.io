export type FSMLifecycleFn<StatesT extends string, EventsT extends string> = (meta: LifecycleFnMeta<StatesT, EventsT>) => void;
export type LifecycleFnMeta<StatesT extends string, EventsT extends string> = {
    from: StatesT | null;
    to: StatesT;
    event: EventsT | null;
    args: unknown;
};
export declare function isLifecycleFnMeta<StatesT extends string, EventsT extends string>(meta: unknown): meta is LifecycleFnMeta<StatesT, EventsT>;
export type FSMLifecycle = "_enter" | "_exit";
export type ActionFn<StatesT> = (...args: unknown[]) => StatesT | void;
export type Action<StatesT> = StatesT | ActionFn<StatesT>;
export type StateHandler<StatesT extends string, EventsT extends string> = {
    [e in EventsT]?: Action<StatesT>;
} & {
    [k in FSMLifecycle]?: FSMLifecycleFn<StatesT, EventsT>;
};
export type Transition<StatesT extends string, EventsT extends string> = {
    [s in StatesT]: StateHandler<StatesT, EventsT>;
} & {
    "*"?: StateHandler<StatesT, EventsT>;
};
/**
 * Defines a strongly-typed finite state machine.
 *
 * @see {@link https://runed.dev/docs/utilities/finite-state-machine}
 */
export declare class FiniteStateMachine<StatesT extends string, EventsT extends string> {
    #private;
    readonly states: Transition<StatesT, EventsT>;
    constructor(initial: StatesT, states: Transition<StatesT, EventsT>);
    /** Triggers a new event and returns the new state. */
    send(event: EventsT, ...args: unknown[]): StatesT;
    /** Debounces the triggering of an event. */
    debounce(wait: number | undefined, event: EventsT, ...args: unknown[]): Promise<StatesT>;
    /** The current state. */
    get current(): StatesT;
}
