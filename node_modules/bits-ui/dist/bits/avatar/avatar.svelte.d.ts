import { DOMContext, type ReadableBox, type WritableBox, type ReadableBoxedValues } from "svelte-toolbelt";
import type { HTMLImgAttributes } from "svelte/elements";
import type { AvatarImageLoadingStatus } from "./types.js";
import type { RefAttachment, WithRefOpts } from "../../internal/types.js";
type CrossOrigin = HTMLImgAttributes["crossorigin"];
type ReferrerPolicy = HTMLImgAttributes["referrerpolicy"];
type AvatarImageSrc = string | null | undefined;
interface AvatarRootStateOpts extends WithRefOpts {
    delayMs: ReadableBox<number>;
    loadingStatus: WritableBox<AvatarImageLoadingStatus>;
}
export declare class AvatarRootState {
    static create(opts: AvatarRootStateOpts): AvatarRootState;
    readonly opts: AvatarRootStateOpts;
    readonly domContext: DOMContext;
    readonly attachment: RefAttachment;
    constructor(opts: AvatarRootStateOpts);
    loadImage(src: string, crossorigin?: CrossOrigin, referrerPolicy?: ReferrerPolicy): (() => void) | undefined;
    props: {
        readonly id: string;
        readonly "data-status": AvatarImageLoadingStatus;
    };
}
interface AvatarImageStateOpts extends WithRefOpts, ReadableBoxedValues<{
    src: AvatarImageSrc;
    crossOrigin: CrossOrigin;
    referrerPolicy: ReferrerPolicy;
}> {
}
export declare class AvatarImageState {
    static create(opts: AvatarImageStateOpts): AvatarImageState;
    readonly opts: AvatarImageStateOpts;
    readonly root: AvatarRootState;
    readonly attachment: RefAttachment;
    constructor(opts: AvatarImageStateOpts, root: AvatarRootState);
    readonly props: {
        readonly id: string;
        readonly style: {
            readonly display: "none" | "block";
        };
        readonly "data-status": AvatarImageLoadingStatus;
        readonly src: AvatarImageSrc;
        readonly crossorigin: "" | "anonymous" | "use-credentials" | null | undefined;
        readonly referrerpolicy: globalThis.ReferrerPolicy | null | undefined;
    };
}
interface AvatarFallbackStateOpts extends WithRefOpts {
}
export declare class AvatarFallbackState {
    static create(opts: AvatarFallbackStateOpts): AvatarFallbackState;
    readonly opts: AvatarFallbackStateOpts;
    readonly root: AvatarRootState;
    readonly attachment: RefAttachment;
    constructor(opts: AvatarFallbackStateOpts, root: AvatarRootState);
    readonly style: {
        display: string;
    } | undefined;
    readonly props: {
        readonly style: {
            display: string;
        } | undefined;
        readonly "data-status": AvatarImageLoadingStatus;
    };
}
export {};
