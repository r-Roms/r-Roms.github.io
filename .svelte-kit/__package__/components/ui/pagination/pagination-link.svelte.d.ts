import { Pagination as PaginationPrimitive } from "bits-ui";
import { type ButtonSize } from "../button/index.js";
type $$ComponentProps = PaginationPrimitive.PageProps & {
    size?: ButtonSize;
    isActive: boolean;
};
declare const PaginationLink: import("svelte").Component<$$ComponentProps, {}, "ref">;
type PaginationLink = ReturnType<typeof PaginationLink>;
export default PaginationLink;
