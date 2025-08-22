import { type AnyFn } from "svelte-toolbelt";
/**
 * Detects whether the user is currently using the keyboard
 * or not by listening to keyboard and pointer events. Uses shared global
 * state to avoid listener duplication.
 */
export declare class IsUsingKeyboard {
    static _refs: number;
    static _cleanup?: AnyFn;
    constructor();
    get current(): boolean;
    set current(value: boolean);
}
