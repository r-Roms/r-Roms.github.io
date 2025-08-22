import { attachRef } from "svelte-toolbelt";
import { createBitsAttrs } from "../../internal/attrs.js";
const aspectRatioAttrs = createBitsAttrs({
    component: "aspect-ratio",
    parts: ["root"],
});
export class AspectRatioRootState {
    static create(opts) {
        return new AspectRatioRootState(opts);
    }
    opts;
    attachment;
    constructor(opts) {
        this.opts = opts;
        this.attachment = attachRef(this.opts.ref);
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        style: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        [aspectRatioAttrs.root]: "",
        ...this.attachment,
    }));
}
