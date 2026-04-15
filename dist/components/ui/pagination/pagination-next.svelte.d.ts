declare const PaginationNext: import("svelte").Component<Omit<{
    page: import("bits-ui").Page;
}, "child" | "children"> & {
    child?: import("svelte").Snippet<[{
        props: Record<string, unknown>;
    }]> | undefined;
    children?: import("svelte").Snippet<[]> | undefined;
    style?: import("bits-ui").StyleProperties | string | null | undefined;
    ref?: HTMLElement | null | undefined;
} & import("bits-ui").Without<import("bits-ui").BitsPrimitiveButtonAttributes, import("bits-ui").PaginationPagePropsWithoutHTML> & {
    size?: import("../button/button.svelte.js").ButtonSize;
    isActive: boolean;
}, {}, "">;
type PaginationNext = ReturnType<typeof PaginationNext>;
export default PaginationNext;
