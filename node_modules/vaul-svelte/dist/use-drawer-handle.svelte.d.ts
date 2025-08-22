import { type ReadableBoxedValues, type WithRefProps } from "svelte-toolbelt";
interface UseDrawerHandleOpts extends WithRefProps, ReadableBoxedValues<{
    preventCycle: boolean;
}> {
}
export declare function useDrawerHandle(opts: UseDrawerHandleOpts): {
    readonly props: {
        id: string;
        "data-vaul-drawer-visible": string;
        "data-vaul-handle": string;
        "aria-hidden": string;
        onclick: () => void;
        onpointercancel: () => void;
        onpointerdown: (e: PointerEvent) => void;
        onpointermove: (e: PointerEvent) => void;
    };
};
export {};
