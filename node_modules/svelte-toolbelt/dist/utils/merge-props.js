/**
 * Modified from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/utils/src/mergeProps.ts (see NOTICE.txt for source)
 */
import { clsx } from "clsx";
import { composeHandlers } from "./compose-handlers.js";
import { cssToStyleObj } from "./css-to-style-obj.js";
import { isClassValue } from "./is.js";
import { executeCallbacks } from "./execute-callbacks.js";
import { styleToString } from "./style.js";
import { EVENT_LIST_SET } from "./event-list.js";
function isEventHandler(key) {
    return EVENT_LIST_SET.has(key);
}
/**
 * Given a list of prop objects, merges them into a single object.
 * - Automatically composes event handlers (e.g. `onclick`, `oninput`, etc.)
 * - Chains regular functions with the same name so they are called in order
 * - Merges class strings with `clsx`
 * - Merges style objects and converts them to strings
 * - Handles a bug with Svelte where setting the `hidden` attribute to `false` doesn't remove it
 * - Overrides other values with the last one
 */
export function mergeProps(...args) {
    const result = { ...args[0] };
    for (let i = 1; i < args.length; i++) {
        const props = args[i];
        if (!props)
            continue;
        // Handle string keys
        for (const key of Object.keys(props)) {
            const a = result[key];
            const b = props[key];
            const aIsFunction = typeof a === "function";
            const bIsFunction = typeof b === "function";
            // compose event handlers
            if (aIsFunction && typeof bIsFunction && isEventHandler(key)) {
                // handle merging of event handlers
                const aHandler = a;
                const bHandler = b;
                result[key] = composeHandlers(aHandler, bHandler);
            }
            else if (aIsFunction && bIsFunction) {
                // chain non-event handler functions
                result[key] = executeCallbacks(a, b);
            }
            else if (key === "class") {
                // handle merging acceptable class values from clsx
                const aIsClassValue = isClassValue(a);
                const bIsClassValue = isClassValue(b);
                if (aIsClassValue && bIsClassValue) {
                    result[key] = clsx(a, b);
                }
                else if (aIsClassValue) {
                    result[key] = clsx(a);
                }
                else if (bIsClassValue) {
                    result[key] = clsx(b);
                }
            }
            else if (key === "style") {
                const aIsObject = typeof a === "object";
                const bIsObject = typeof b === "object";
                const aIsString = typeof a === "string";
                const bIsString = typeof b === "string";
                if (aIsObject && bIsObject) {
                    // both are style objects, merge them
                    result[key] = { ...a, ...b };
                }
                else if (aIsObject && bIsString) {
                    // a is style object, b is string, convert b to style object and merge
                    const parsedStyle = cssToStyleObj(b);
                    result[key] = { ...a, ...parsedStyle };
                }
                else if (aIsString && bIsObject) {
                    // a is string, b is style object, convert a to style object and merge
                    const parsedStyle = cssToStyleObj(a);
                    result[key] = { ...parsedStyle, ...b };
                }
                else if (aIsString && bIsString) {
                    // both are strings, convert both to objects and merge
                    const parsedStyleA = cssToStyleObj(a);
                    const parsedStyleB = cssToStyleObj(b);
                    result[key] = { ...parsedStyleA, ...parsedStyleB };
                }
                else if (aIsObject) {
                    result[key] = a;
                }
                else if (bIsObject) {
                    result[key] = b;
                }
                else if (aIsString) {
                    result[key] = a;
                }
                else if (bIsString) {
                    result[key] = b;
                }
            }
            else {
                // override other values
                result[key] = b !== undefined ? b : a;
            }
        }
        // handle symbol keys (mostly for `Attachments`)
        for (const key of Object.getOwnPropertySymbols(props)) {
            const a = result[key];
            const b = props[key];
            // for matching symbols, we just override
            result[key] = b !== undefined ? b : a;
        }
    }
    // convert style object to string
    if (typeof result.style === "object") {
        result.style = styleToString(result.style).replaceAll("\n", " ");
    }
    // handle weird svelte bug where `hidden` is not removed when set to `false`
    if (result.hidden !== true) {
        result.hidden = undefined;
        delete result.hidden;
    }
    // handle weird svelte bug where `disabled` is not removed when set to `false`
    if (result.disabled !== true) {
        result.disabled = undefined;
        delete result.disabled;
    }
    return result;
}
