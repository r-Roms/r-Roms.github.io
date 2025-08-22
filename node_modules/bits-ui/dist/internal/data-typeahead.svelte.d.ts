import type { Getter } from "svelte-toolbelt";
interface DataTypeaheadOpts {
    onMatch: (value: string) => void;
    getCurrentItem: () => string;
    candidateValues: Getter<string[]>;
    enabled: Getter<boolean>;
    getWindow: () => Window & typeof globalThis;
}
export declare class DataTypeahead {
    #private;
    constructor(opts: DataTypeaheadOpts);
    handleTypeaheadSearch(key: string): string | undefined;
    resetTypeahead(): void;
}
export {};
