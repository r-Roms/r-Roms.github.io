import { UniqueState } from './uniqueState.svelte.js';
export class SelectionState {
    #initial;
    #selected;
    all;
    single;
    max;
    constructor(options = {}) {
        this.#initial = options.initial ?? [];
        this.#selected = new UniqueState(this.#initial);
        this.all = options.all ?? [];
        this.single = (options.single ?? false);
        this.max = options.max;
    }
    get current() {
        return (this.single
            ? (Array.from(this.#selected.current)[0] ?? null)
            : Array.from(this.#selected.current));
    }
    set current(values) {
        if (Array.isArray(values)) {
            if (this.max == null || values.length < this.max) {
                this.#selected.clear();
                this.#selected.addEach(values);
            }
            else {
                throw new Error(`Too many values selected.  Current: ${values.length}, max: ${this.max}`);
            }
        }
        else if (values != null) {
            // single
            this.#selected.clear();
            this.#selected.add(values);
        }
        else {
            // null
            this.#selected.clear();
        }
    }
    /** Check if a value is selected */
    isSelected(value) {
        return this.#selected.current.has(value);
    }
    /** Check if the selection is empty */
    isEmpty() {
        return this.#selected.current.size === 0;
    }
    /** Check if all values in `all` are selected */
    isAllSelected() {
        return this.all.every((v) => this.#selected.current.has(v));
    }
    /** Check if any values in `all` are selected */
    isAnySelected() {
        return this.all.some((v) => this.#selected.current.has(v));
    }
    /** Check if the selection is at the maximum */
    isMaxSelected() {
        return this.max != null ? this.#selected.current.size >= this.max : false;
    }
    /** Check if a value is disabled (max reached) */
    isDisabled(value) {
        return !this.isSelected(value) && this.isMaxSelected();
    }
    /** Clear all selected values */
    clear() {
        this.#selected.clear();
    }
    /** Reset to initial values */
    reset() {
        this.#selected.reset();
    }
    /** Toggle a value */
    toggle(value) {
        if (this.#selected.current.has(value)) {
            // Remove
            const prevSelected = [...this.#selected.current];
            this.#selected.clear();
            this.#selected.addEach(prevSelected.filter((v) => v != value));
        }
        else if (this.single) {
            // Replace
            this.#selected.clear();
            this.#selected.add(value);
        }
        else {
            // Add
            if (this.max == null || this.#selected.current.size < this.max) {
                return this.#selected.add(value);
            }
        }
    }
    /** Toggle all values */
    toggleAll() {
        let values;
        if (this.isAllSelected()) {
            // Deselect all (within current `all`, for example page/filtered result)
            values = [...this.#selected.current].filter((v) => !this.all.includes(v));
        }
        else {
            // Select all (`new Set()` will dedupe)
            values = [...this.#selected.current, ...this.all];
        }
        this.#selected.clear();
        this.#selected.addEach(values);
    }
}
