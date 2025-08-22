import { extract } from "../extract/extract.svelte.js";
import { on } from "svelte/events";
export function useEventListener(_target, _events, handler, options) {
    $effect(() => {
        const target = extract(_target);
        const events = extract(_events);
        if (target === undefined || target === null)
            return;
        if (Array.isArray(events)) {
            for (const event of events) {
                $effect(() => on(target, event, handler, options));
            }
        }
        else {
            return on(target, events, handler, options);
        }
    });
}
