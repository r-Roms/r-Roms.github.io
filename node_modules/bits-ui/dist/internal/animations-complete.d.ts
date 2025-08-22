import { type ReadableBoxedValues } from "svelte-toolbelt";
interface AnimationsCompleteOpts extends ReadableBoxedValues<{
    ref: HTMLElement | null;
    afterTick: boolean;
}> {
}
export declare class AnimationsComplete {
    #private;
    constructor(opts: AnimationsCompleteOpts);
    run(fn: () => void | Promise<void>): void;
}
export {};
