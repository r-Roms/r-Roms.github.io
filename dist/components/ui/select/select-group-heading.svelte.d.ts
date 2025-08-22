declare const SelectGroupHeading: import("svelte").Component<Omit<{}, "child" | "children"> & {
    child?: import("svelte").Snippet<[{
        props: Record<string, unknown>;
    }]> | undefined;
    children?: import("svelte").Snippet<[]> | undefined;
    style?: import("bits-ui").StyleProperties | string | null | undefined;
    ref?: HTMLElement | null | undefined;
} & import("bits-ui").Without<import("bits-ui").BitsPrimitiveDivAttributes, import("bits-ui").ComboboxGroupHeadingPropsWithoutHTML>, {}, "ref">;
type SelectGroupHeading = ReturnType<typeof SelectGroupHeading>;
export default SelectGroupHeading;
