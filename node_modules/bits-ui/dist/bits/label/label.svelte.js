import { attachRef } from "svelte-toolbelt";
import { createBitsAttrs } from "../../internal/attrs.js";
const labelAttrs = createBitsAttrs({
    component: "label",
    parts: ["root"],
});
export class LabelRootState {
    static create(opts) {
        return new LabelRootState(opts);
    }
    opts;
    attachment;
    constructor(opts) {
        this.opts = opts;
        this.attachment = attachRef(this.opts.ref);
        this.onmousedown = this.onmousedown.bind(this);
    }
    onmousedown(e) {
        if (e.detail > 1)
            e.preventDefault();
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        [labelAttrs.root]: "",
        onmousedown: this.onmousedown,
        ...this.attachment,
    }));
}
