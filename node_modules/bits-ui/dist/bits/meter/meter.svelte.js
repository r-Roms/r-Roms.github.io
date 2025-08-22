import { attachRef } from "svelte-toolbelt";
import { createBitsAttrs } from "../../internal/attrs.js";
const meterAttrs = createBitsAttrs({
    component: "meter",
    parts: ["root"],
});
export class MeterRootState {
    static create(opts) {
        return new MeterRootState(opts);
    }
    opts;
    attachment;
    constructor(opts) {
        this.opts = opts;
        this.attachment = attachRef(this.opts.ref);
    }
    props = $derived.by(() => ({
        role: "meter",
        value: this.opts.value.current,
        "aria-valuemin": this.opts.min.current,
        "aria-valuemax": this.opts.max.current,
        "aria-valuenow": this.opts.value.current,
        "data-value": this.opts.value.current,
        "data-max": this.opts.max.current,
        "data-min": this.opts.min.current,
        [meterAttrs.root]: "",
        ...this.attachment,
    }));
}
