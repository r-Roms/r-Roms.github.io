import { DOMContext, attachRef, } from "svelte-toolbelt";
import { Context, watch } from "runed";
import { createBitsAttrs } from "../../internal/attrs.js";
const avatarAttrs = createBitsAttrs({
    component: "avatar",
    parts: ["root", "image", "fallback"],
});
const AvatarRootContext = new Context("Avatar.Root");
export class AvatarRootState {
    static create(opts) {
        return AvatarRootContext.set(new AvatarRootState(opts));
    }
    opts;
    domContext;
    attachment;
    constructor(opts) {
        this.opts = opts;
        this.domContext = new DOMContext(this.opts.ref);
        this.loadImage = this.loadImage.bind(this);
        this.attachment = attachRef(this.opts.ref);
    }
    loadImage(src, crossorigin, referrerPolicy) {
        if (this.opts.loadingStatus.current === "loaded")
            return;
        let imageTimerId;
        const image = new Image();
        image.src = src;
        if (crossorigin !== undefined)
            image.crossOrigin = crossorigin;
        if (referrerPolicy)
            image.referrerPolicy = referrerPolicy;
        this.opts.loadingStatus.current = "loading";
        image.onload = () => {
            imageTimerId = this.domContext.setTimeout(() => {
                this.opts.loadingStatus.current = "loaded";
            }, this.opts.delayMs.current);
        };
        image.onerror = () => {
            this.opts.loadingStatus.current = "error";
        };
        return () => {
            if (!imageTimerId)
                return;
            this.domContext.clearTimeout(imageTimerId);
        };
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        [avatarAttrs.root]: "",
        "data-status": this.opts.loadingStatus.current,
        ...this.attachment,
    }));
}
export class AvatarImageState {
    static create(opts) {
        return new AvatarImageState(opts, AvatarRootContext.get());
    }
    opts;
    root;
    attachment;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        this.attachment = attachRef(this.opts.ref);
        watch.pre([() => this.opts.src.current, () => this.opts.crossOrigin.current], ([src, crossOrigin]) => {
            if (!src) {
                this.root.opts.loadingStatus.current = "error";
                return;
            }
            this.root.loadImage(src, crossOrigin, this.opts.referrerPolicy.current);
        });
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        style: {
            display: this.root.opts.loadingStatus.current === "loaded" ? "block" : "none",
        },
        "data-status": this.root.opts.loadingStatus.current,
        [avatarAttrs.image]: "",
        src: this.opts.src.current,
        crossorigin: this.opts.crossOrigin.current,
        referrerpolicy: this.opts.referrerPolicy.current,
        ...this.attachment,
    }));
}
export class AvatarFallbackState {
    static create(opts) {
        return new AvatarFallbackState(opts, AvatarRootContext.get());
    }
    opts;
    root;
    attachment;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        this.attachment = attachRef(this.opts.ref);
    }
    style = $derived.by(() => this.root.opts.loadingStatus.current === "loaded" ? { display: "none" } : undefined);
    props = $derived.by(() => ({
        style: this.style,
        "data-status": this.root.opts.loadingStatus.current,
        [avatarAttrs.fallback]: "",
        ...this.attachment,
    }));
}
