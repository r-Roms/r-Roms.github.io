import { watch } from "../watch/watch.svelte.js";
import { get } from "../../internal/utils/get.js";
/**
 * Tracks the change history of a value, providing undo and redo capabilities.
 *
 * @see {@link https://runed.dev/docs/utilities/state-history}
 */
export class StateHistory {
    #redoStack = $state([]);
    #ignoreUpdate = false;
    #set;
    log = $state([]);
    canUndo = $derived(this.log.length > 1);
    canRedo = $derived(this.#redoStack.length > 0);
    constructor(value, set, options) {
        this.#redoStack = [];
        this.#set = set;
        this.undo = this.undo.bind(this);
        this.redo = this.redo.bind(this);
        const addEvent = (event) => {
            this.log.push(event);
            const capacity$ = get(options?.capacity);
            if (capacity$ && this.log.length > capacity$) {
                this.log = this.log.slice(-capacity$);
            }
        };
        watch(() => get(value), (v) => {
            if (this.#ignoreUpdate) {
                this.#ignoreUpdate = false;
                return;
            }
            addEvent({ snapshot: v, timestamp: new Date().getTime() });
            this.#redoStack = [];
        });
        watch(() => get(options?.capacity), (c) => {
            if (!c)
                return;
            this.log = this.log.slice(-c);
        });
    }
    undo() {
        const [prev, curr] = this.log.slice(-2);
        if (!curr || !prev)
            return;
        this.#ignoreUpdate = true;
        this.#redoStack.push(curr);
        this.log.pop();
        this.#set(prev.snapshot);
    }
    redo() {
        const nextEvent = this.#redoStack.pop();
        if (!nextEvent)
            return;
        this.#ignoreUpdate = true;
        this.log.push(nextEvent);
        this.#set(nextEvent.snapshot);
    }
}
