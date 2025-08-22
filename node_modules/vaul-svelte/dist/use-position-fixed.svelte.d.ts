import type { Box, Getter } from "svelte-toolbelt";
/**
 * This hook is necessary to prevent buggy behavior on iOS devices (need to test on Android).
 * I won't get into too much detail about what bugs it solves, but so far I've found that setting the body to `position: fixed` is the most reliable way to prevent those bugs.
 * Issues that this hook solves:
 * https://github.com/emilkowalski/vaul/issues/435
 * https://github.com/emilkowalski/vaul/issues/433
 * And more that I discovered, but were just not reported.
 */
export declare function usePositionFixed({ open, modal, nested, hasBeenOpened, preventScrollRestoration, noBodyStyles, }: {
    open: Box<boolean>;
    modal: Box<boolean>;
    nested: Box<boolean>;
    preventScrollRestoration: Box<boolean>;
    noBodyStyles: Box<boolean>;
} & {
    hasBeenOpened: Getter<boolean>;
}): {
    restorePositionSetting: () => void;
};
