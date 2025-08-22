import { type WithRefProps } from "svelte-toolbelt";
type UseDrawerOverlayProps = WithRefProps;
export declare function useDrawerOverlay(opts: UseDrawerOverlayProps): {
    readonly props: {
        id: string;
        onmouseup: (event: PointerEvent | null) => void;
        "data-vaul-overlay": string;
        "data-vaul-snap-points": string;
        "data-vaul-snap-points-overlay": string;
        "data-vaul-animate": string;
    };
    readonly shouldRender: boolean;
    setMounted: (value: boolean) => void;
};
export {};
