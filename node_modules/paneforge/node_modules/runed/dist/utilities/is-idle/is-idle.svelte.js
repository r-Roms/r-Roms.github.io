import { extract } from "../extract/index.js";
import { useDebounce } from "../use-debounce/index.js";
import { useEventListener } from "../use-event-listener/use-event-listener.svelte.js";
import { defaultWindow, } from "../../internal/configurable-globals.js";
const DEFAULT_EVENTS = [
    "keypress",
    "mousemove",
    "touchmove",
    "click",
    "scroll",
];
const DEFAULT_OPTIONS = {
    events: DEFAULT_EVENTS,
    initialState: false,
    timeout: 60000,
};
/**
 * Tracks whether the user is being inactive.
 * @see {@link https://runed.dev/docs/utilities/is-idle}
 */
export class IsIdle {
    #current = $state(false);
    #lastActive = $state(Date.now());
    constructor(_options) {
        const opts = {
            ...DEFAULT_OPTIONS,
            ..._options,
        };
        const window = opts.window ?? defaultWindow;
        const document = opts.document ?? window?.document;
        const timeout = $derived(extract(opts.timeout));
        const events = $derived(extract(opts.events));
        const detectVisibilityChanges = $derived(extract(opts.detectVisibilityChanges));
        this.#current = opts.initialState;
        const debouncedReset = useDebounce(() => {
            this.#current = true;
        }, () => timeout);
        debouncedReset();
        const handleActivity = () => {
            this.#current = false;
            this.#lastActive = Date.now();
            debouncedReset();
        };
        useEventListener(() => window, events, () => {
            handleActivity();
        }, { passive: true });
        $effect(() => {
            if (!detectVisibilityChanges || !document)
                return;
            useEventListener(document, ["visibilitychange"], () => {
                if (document.hidden)
                    return;
                handleActivity();
            });
        });
    }
    get lastActive() {
        return this.#lastActive;
    }
    get current() {
        return this.#current;
    }
}
