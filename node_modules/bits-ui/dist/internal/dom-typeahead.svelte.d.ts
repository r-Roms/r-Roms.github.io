type DOMTypeaheadOptions = {
    onMatch?: (item: HTMLElement) => void;
    getCurrentItem?: () => HTMLElement | null;
    getActiveElement: () => HTMLElement | null;
    getWindow: () => Window & typeof globalThis;
};
export declare class DOMTypeahead {
    #private;
    constructor(opts: DOMTypeaheadOptions);
    handleTypeaheadSearch(key: string, candidates: HTMLElement[]): HTMLElement | undefined;
    resetTypeahead(): void;
    get search(): string;
}
export {};
