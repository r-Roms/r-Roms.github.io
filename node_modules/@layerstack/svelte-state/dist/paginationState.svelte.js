import { clamp } from '@layerstack/utils';
export class PaginationState {
    #page;
    #perPage;
    #total;
    constructor(options = {}) {
        this.#page = options.page ?? 1;
        this.#perPage = options.perPage ?? 25;
        this.#total = options.total ?? 0;
    }
    get page() {
        return this.#page;
    }
    set page(value) {
        // Do not allow page to exceed bounds (ex. call nextPage() when on last page)
        this.#page = clamp(value, 1, this.totalPages);
    }
    get perPage() {
        return this.#perPage;
    }
    set perPage(value) {
        this.#perPage = value;
    }
    get total() {
        return this.#total;
    }
    set total(value) {
        this.#total = value;
    }
    get totalPages() {
        return Math.ceil(this.total / this.perPage);
    }
    get from() {
        return Math.min(this.total, Math.max(0, (this.page - 1) * this.perPage + 1));
    }
    get to() {
        return Math.min(this.total, this.page * this.perPage);
    }
    get isFirst() {
        return this.page === 1;
    }
    get isLast() {
        return this.page >= this.totalPages;
    }
    get hasPrevious() {
        return this.page > 1 && this.totalPages > 0;
    }
    get hasNext() {
        return this.page < this.totalPages;
    }
    nextPage = () => {
        this.page = this.page + 1;
    };
    prevPage = () => {
        this.page = this.page - 1;
    };
    firstPage = () => {
        this.page = 1;
    };
    lastPage = () => {
        this.page = Math.ceil(this.total / this.perPage);
    };
    slice(data) {
        return data.slice((this.page - 1) * this.perPage, this.page * this.perPage);
    }
}
