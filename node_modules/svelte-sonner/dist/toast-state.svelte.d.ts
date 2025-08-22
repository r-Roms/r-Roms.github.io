import type { ExternalToast, HeightT, PromiseData, PromiseT, AnyComponent, ToastT, ToastTypes } from './types.js';
type UpdateToastProps = {
    id: number | string;
    data: Partial<ToastT>;
    type: ToastTypes;
    message: string | AnyComponent | undefined;
    dismissable: boolean;
};
declare class ToastState {
    #private;
    toasts: ToastT[];
    heights: HeightT[];
    addToast: (data: ToastT) => void;
    updateToast: ({ id, data, type, message }: UpdateToastProps) => void;
    create: <T extends AnyComponent>(data: ExternalToast<T> & {
        message?: string | T;
        type?: ToastTypes;
        promise?: PromiseT;
    }) => string | number;
    dismiss: (id?: number | string) => string | number | undefined;
    remove: (id?: number | string) => string | number | undefined;
    message: <T extends AnyComponent>(message: string | T, data?: ExternalToast<T>) => string | number;
    error: <T extends AnyComponent>(message: string | T, data?: ExternalToast<T>) => string | number;
    success: <T extends AnyComponent>(message: string | T, data?: ExternalToast<T>) => string | number;
    info: <T extends AnyComponent>(message: string | T, data?: ExternalToast<T>) => string | number;
    warning: <T extends AnyComponent>(message: string | T, data?: ExternalToast<T>) => string | number;
    loading: <T extends AnyComponent>(message: string | T, data?: ExternalToast<T>) => string | number;
    promise: <ToastData>(promise: PromiseT<ToastData>, data?: PromiseData<ToastData>) => string | number | undefined;
    custom: <T extends AnyComponent>(component: T, data?: ExternalToast<T>) => string | number;
    removeHeight: (id: number | string) => void;
    setHeight: (data: HeightT) => void;
    reset: () => void;
}
export declare const toastState: ToastState;
declare function toastFunction<T extends AnyComponent>(message: string | T, data?: ExternalToast<T>): string | number;
export declare class SonnerState {
    #private;
    get toasts(): ToastT[];
}
/**
 * A hook to get a reference to the sonner toast state.
 *
 * Returns a class instance a getter for the `toasts` array.
 *
 * @example
 * ```svelte
 * <script lang="ts">
 *   import { useSonner } from 'svelte-sonner';
 *
 *   const sonner = useSonner();
 *
 *   // Reactive access to the toasts
 *   $effect(() => console.log(sonner.toasts))
 * </script>
 * ```
 */
export declare function useSonner(): SonnerState;
export declare const toast: typeof toastFunction & {
    success: <T extends AnyComponent>(message: string | T, data?: ExternalToast<T> | undefined) => string | number;
    info: <T extends AnyComponent>(message: string | T, data?: ExternalToast<T> | undefined) => string | number;
    warning: <T extends AnyComponent>(message: string | T, data?: ExternalToast<T> | undefined) => string | number;
    error: <T extends AnyComponent>(message: string | T, data?: ExternalToast<T> | undefined) => string | number;
    custom: <T extends AnyComponent>(component: T, data?: ExternalToast<T> | undefined) => string | number;
    message: <T extends AnyComponent>(message: string | T, data?: ExternalToast<T> | undefined) => string | number;
    promise: <ToastData>(promise: PromiseT<ToastData>, data?: PromiseData<ToastData> | undefined) => string | number | undefined;
    dismiss: (id?: number | string) => string | number | undefined;
    loading: <T extends AnyComponent>(message: string | T, data?: ExternalToast<T> | undefined) => string | number;
    getActiveToasts: () => ToastT[];
};
export {};
