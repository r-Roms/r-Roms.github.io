import { type Getter, type ReadableBox } from "svelte-toolbelt";
export interface ScrollBodyOption {
    padding?: boolean | number;
    margin?: boolean | number;
}
export declare class BodyScrollLock {
    #private;
    readonly locked: ReadableBox<boolean> | undefined;
    constructor(initialState?: boolean | undefined, restoreScrollDelay?: Getter<number | null>);
}
