export type PaginationOptions = {
    /** Initial page  */
    page?: number;
    /** Number of items per page */
    perPage?: number;
    /** Total number of items */
    total?: number;
};
export declare class PaginationState {
    #private;
    constructor(options?: PaginationOptions);
    get page(): number;
    set page(value: number);
    get perPage(): number;
    set perPage(value: number);
    get total(): number;
    set total(value: number);
    get totalPages(): number;
    get from(): number;
    get to(): number;
    get isFirst(): boolean;
    get isLast(): boolean;
    get hasPrevious(): boolean;
    get hasNext(): boolean;
    nextPage: () => void;
    prevPage: () => void;
    firstPage: () => void;
    lastPage: () => void;
    slice<T>(data: T[]): T[];
}
//# sourceMappingURL=paginationState.svelte.d.ts.map