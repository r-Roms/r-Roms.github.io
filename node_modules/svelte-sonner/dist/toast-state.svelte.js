import { isBrowser } from './internal/helpers.js';
import { sonnerContext } from './internal/ctx.js';
import { untrack } from 'svelte';
let toastsCounter = 0;
class ToastState {
    toasts = $state([]);
    heights = $state([]);
    #findToastIdx = (id) => {
        const idx = this.toasts.findIndex((toast) => toast.id === id);
        if (idx === -1)
            return null;
        return idx;
    };
    addToast = (data) => {
        if (!isBrowser)
            return;
        this.toasts.unshift(data);
    };
    updateToast = ({ id, data, type, message }) => {
        const toastIdx = this.toasts.findIndex((toast) => toast.id === id);
        const toastToUpdate = this.toasts[toastIdx];
        this.toasts[toastIdx] = {
            ...toastToUpdate,
            ...data,
            id,
            title: message,
            type,
            updated: true
        };
    };
    create = (data) => {
        const { message, ...rest } = data;
        const id = typeof data?.id === 'number' || (data.id && data.id?.length > 0)
            ? data.id
            : toastsCounter++;
        const dismissable = data.dismissable === undefined ? true : data.dismissable;
        const type = data.type === undefined ? 'default' : data.type;
        untrack(() => {
            const alreadyExists = this.toasts.find((toast) => toast.id === id);
            if (alreadyExists) {
                this.updateToast({ id, data, type, message, dismissable });
            }
            else {
                this.addToast({ ...rest, id, title: message, dismissable, type });
            }
        });
        return id;
    };
    dismiss = (id) => {
        untrack(() => {
            if (id === undefined) {
                // we're dismissing all the toasts
                this.toasts = this.toasts.map((toast) => ({ ...toast, dismiss: true }));
                return;
            }
            // we're dismissing a specific toast
            const toastIdx = this.toasts.findIndex((toast) => toast.id === id);
            if (this.toasts[toastIdx]) {
                this.toasts[toastIdx] = { ...this.toasts[toastIdx], dismiss: true };
            }
        });
        return id;
    };
    remove = (id) => {
        if (id === undefined) {
            // remove all toasts
            this.toasts = [];
            return;
        }
        // remove a specific toast
        const toastIdx = this.#findToastIdx(id);
        if (toastIdx === null)
            return;
        this.toasts.splice(toastIdx, 1);
        return id;
    };
    message = (message, data) => {
        return this.create({ ...data, type: 'default', message });
    };
    error = (message, data) => {
        return this.create({ ...data, type: 'error', message });
    };
    success = (message, data) => {
        return this.create({ ...data, type: 'success', message });
    };
    info = (message, data) => {
        return this.create({ ...data, type: 'info', message });
    };
    warning = (message, data) => {
        return this.create({ ...data, type: 'warning', message });
    };
    loading = (message, data) => {
        return this.create({ ...data, type: 'loading', message });
    };
    promise = (promise, data) => {
        if (!data) {
            // Nothing to show
            return;
        }
        let id = undefined;
        if (data.loading !== undefined) {
            id = this.create({
                ...data,
                promise,
                type: 'loading',
                message: typeof data.loading === 'string' ? data.loading : data.loading()
            });
        }
        const p = promise instanceof Promise ? promise : promise();
        let shouldDismiss = id !== undefined;
        p.then((response) => {
            if (typeof response === 'object' &&
                response &&
                'ok' in response &&
                typeof response.ok === 'boolean' &&
                !response.ok) {
                shouldDismiss = false;
                const message = constructPromiseErrorMessage(response);
                this.create({ id, type: 'error', message });
            }
            else if (data.success !== undefined) {
                shouldDismiss = false;
                const message = typeof data.success === 'function' ? data.success(response) : data.success;
                this.create({ id, type: 'success', message });
            }
        })
            .catch((error) => {
            if (data.error !== undefined) {
                shouldDismiss = false;
                const message = typeof data.error === 'function' ? data.error(error) : data.error;
                this.create({ id, type: 'error', message });
            }
        })
            .finally(() => {
            if (shouldDismiss) {
                // Toast is still in load state (and will be indefinitely — dismiss it)
                this.dismiss(id);
                id = undefined;
            }
            data.finally?.();
        });
        return id;
    };
    custom = (component, data) => {
        const id = data?.id || toastsCounter++;
        this.create({ component, id, ...data });
        return id;
    };
    removeHeight = (id) => {
        this.heights = this.heights.filter((height) => height.toastId !== id);
    };
    setHeight = (data) => {
        const toastIdx = this.#findToastIdx(data.toastId);
        if (toastIdx === null) {
            this.heights.push(data);
            return;
        }
        this.heights[toastIdx] = data;
    };
    reset = () => {
        this.toasts = [];
        this.heights = [];
    };
}
function constructPromiseErrorMessage(response) {
    if (response && typeof response === 'object' && 'status' in response) {
        return `HTTP error! Status: ${response.status}`;
    }
    return `Error! ${response}`;
}
export const toastState = new ToastState();
function toastFunction(message, data) {
    return toastState.create({
        message,
        ...data
    });
}
export class SonnerState {
    /**
     * A derived state of the toasts that are not dismissed.
     */
    #activeToasts = $derived(toastState.toasts.filter((toast) => !toast.dismiss));
    get toasts() {
        return this.#activeToasts;
    }
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
export function useSonner() {
    return sonnerContext.get();
}
const basicToast = toastFunction;
export const toast = Object.assign(basicToast, {
    success: toastState.success,
    info: toastState.info,
    warning: toastState.warning,
    error: toastState.error,
    custom: toastState.custom,
    message: toastState.message,
    promise: toastState.promise,
    dismiss: toastState.dismiss,
    loading: toastState.loading,
    getActiveToasts: () => {
        return toastState.toasts.filter((toast) => !toast.dismiss);
    }
});
