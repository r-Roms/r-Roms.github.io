import { attachRef } from "svelte-toolbelt";
import { createBitsAttrs } from "../../internal/attrs.js";
const progressAttrs = createBitsAttrs({
    component: "progress",
    parts: ["root"],
});
export class ProgressRootState {
    static create(opts) {
        return new ProgressRootState(opts);
    }
    opts;
    attachment;
    constructor(opts) {
        this.opts = opts;
        this.attachment = attachRef(this.opts.ref);
    }
    props = $derived.by(() => ({
        role: "progressbar",
        value: this.opts.value.current,
        "aria-valuemin": this.opts.min.current,
        "aria-valuemax": this.opts.max.current,
        "aria-valuenow": this.opts.value.current === null ? undefined : this.opts.value.current,
        "data-value": this.opts.value.current === null ? undefined : this.opts.value.current,
        "data-state": getProgressDataState(this.opts.value.current, this.opts.max.current),
        "data-max": this.opts.max.current,
        "data-min": this.opts.min.current,
        "data-indeterminate": this.opts.value.current === null ? "" : undefined,
        [progressAttrs.root]: "",
        ...this.attachment,
    }));
}
function getProgressDataState(value, max) {
    if (value === null)
        return "indeterminate";
    return value === max ? "loaded" : "loading";
}
