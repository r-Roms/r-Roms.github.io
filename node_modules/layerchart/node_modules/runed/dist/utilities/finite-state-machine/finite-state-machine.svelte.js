export function isLifecycleFnMeta(meta) {
    return (!!meta &&
        typeof meta === "object" &&
        "to" in meta &&
        "from" in meta &&
        "event" in meta &&
        "args" in meta);
}
/**
 * Defines a strongly-typed finite state machine.
 *
 * @see {@link https://runed.dev/docs/utilities/finite-state-machine}
 */
export class FiniteStateMachine {
    #current = $state();
    states;
    #timeout = {};
    constructor(initial, states) {
        this.#current = initial;
        this.states = states;
        this.send = this.send.bind(this);
        this.debounce = this.debounce.bind(this);
        // synthetically trigger _enter for the initial state.
        this.#dispatch("_enter", { from: null, to: initial, event: null, args: [] });
    }
    #transition(newState, event, args) {
        const metadata = { from: this.#current, to: newState, event, args };
        this.#dispatch("_exit", metadata);
        this.#current = newState;
        this.#dispatch("_enter", metadata);
    }
    #dispatch(event, ...args) {
        const action = this.states[this.#current]?.[event] ?? this.states["*"]?.[event];
        if (action instanceof Function) {
            if (event === "_enter" || event === "_exit") {
                if (isLifecycleFnMeta(args[0])) {
                    action(args[0]);
                }
                else {
                    console.warn("Invalid metadata passed to lifecycle function of the FSM.");
                }
            }
            else {
                return action(...args);
            }
        }
        else if (typeof action === "string") {
            return action;
        }
        else if (event !== "_enter" && event !== "_exit") {
            console.warn("No action defined for event", event, "in state", this.#current);
        }
    }
    /** Triggers a new event and returns the new state. */
    send(event, ...args) {
        const newState = this.#dispatch(event, ...args);
        if (newState && newState !== this.#current) {
            this.#transition(newState, event, args);
        }
        return this.#current;
    }
    /** Debounces the triggering of an event. */
    async debounce(wait = 500, event, ...args) {
        if (this.#timeout[event]) {
            clearTimeout(this.#timeout[event]);
        }
        return new Promise((resolve) => {
            this.#timeout[event] = setTimeout(() => {
                delete this.#timeout[event];
                resolve(this.send(event, ...args));
            }, wait);
        });
    }
    /** The current state. */
    get current() {
        return this.#current;
    }
}
