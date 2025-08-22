import type { ReadableBoxedValues, WritableBoxedValues } from "svelte-toolbelt";
import type { DrawerDirection, Getters } from "./types.js";
export declare function useSnapPoints({ snapPoints, drawerNode: drawerNode, overlayNode: overlayNode, fadeFromIndex, setOpenTime, direction, container, snapToSequentialPoint, activeSnapPoint, open, isReleasing, }: Getters<{
    drawerNode: HTMLElement | null;
    overlayNode: HTMLElement | null;
    isReleasing: boolean;
}> & {
    setOpenTime: (time: Date) => void;
} & WritableBoxedValues<{
    activeSnapPoint: number | string | null | undefined;
    open: boolean;
}> & ReadableBoxedValues<{
    direction: DrawerDirection;
    container: HTMLElement | null | undefined;
    snapToSequentialPoint: boolean;
    fadeFromIndex: number | undefined;
    snapPoints: (number | string)[] | undefined;
}>): {
    readonly isLastSnapPoint: true | null;
    readonly shouldFade: boolean;
    readonly activeSnapPointIndex: number | undefined;
    readonly snapPointsOffset: number[];
    getPercentageDragged: (absDraggedDistance: number, isDraggingDown: boolean) => number | null;
    onRelease: ({ draggedDistance, closeDrawer, velocity, dismissible, }: {
        draggedDistance: number;
        closeDrawer: () => void;
        velocity: number;
        dismissible: boolean;
    }) => void;
    onDrag: ({ draggedDistance }: {
        draggedDistance: number;
    }) => void;
};
export declare function isBottomOrRight(direction: DrawerDirection): boolean;
