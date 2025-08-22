import type { HTMLAnchorAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAnchorAttributes> & {
    child?: Snippet<[{
        props: HTMLAnchorAttributes;
    }]>;
};
declare const BreadcrumbLink: import("svelte").Component<$$ComponentProps, {}, "ref">;
type BreadcrumbLink = ReturnType<typeof BreadcrumbLink>;
export default BreadcrumbLink;
