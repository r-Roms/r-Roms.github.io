import type { TaintedFields, SuperFormValidated, SuperValidated } from '../superValidate.js';
import type { ActionResult, BeforeNavigate, Page, SubmitFunction, Transport } from '@sveltejs/kit';
import { type Readable, type Writable, type Updater } from 'svelte/store';
import { type FormPathType, type FormPath, type FormPathLeaves } from '../stringPath.js';
import { enhance as kitEnhance } from '$app/forms';
import type { ValidationErrors } from '../superValidate.js';
import type { IsAny, MaybePromise } from '../utils.js';
import type { ClientValidationAdapter, ValidationAdapter } from '../adapters/adapters.js';
import type { InputConstraints } from '../jsonSchema/constraints.js';
import { type ProxyOptions } from './proxies.js';
export type SuperFormEvents<T extends Record<string, unknown>, M> = Pick<FormOptions<T, M>, 'onError' | 'onResult' | 'onSubmit' | 'onUpdate' | 'onUpdated'>;
export type SuperFormEventList<T extends Record<string, unknown>, M> = {
    [Property in keyof SuperFormEvents<T, M>]-?: NonNullable<SuperFormEvents<T, M>[Property]>[];
};
type FilterType<T, Check> = {
    [K in keyof NonNullable<T> as NonNullable<NonNullable<T>[K]> extends Check ? never : K]: NonNullable<T>[K];
};
/**
 * Helper type for making ActionResult data strongly typed in onUpdate.
 * @example const action : FormResult<ActionData> = result.data;
 */
export type FormResult<T extends Record<string, unknown> | null | undefined> = FilterType<T, SuperValidated<Record<string, unknown>, any, Record<string, unknown>>>;
export type TaintOption = boolean | 'untaint' | 'untaint-all' | 'untaint-form';
type ValidatorsOption<T extends Record<string, unknown>> = ValidationAdapter<Partial<T>, Record<string, unknown>> | false | 'clear';
export type FormOptions<T extends Record<string, unknown> = Record<string, unknown>, M = any, In extends Record<string, unknown> = T> = Partial<{
    id: string;
    /**
     * If `false`, the form won't react to page state updates, except for page invalidations.
     * If `'never'`, not even page invalidations will affect the form.
     * @default true
     */
    applyAction: boolean | 'never';
    invalidateAll: boolean | 'force' | 'pessimistic';
    resetForm: boolean | (() => boolean);
    scrollToError: 'auto' | 'smooth' | 'off' | boolean | ScrollIntoViewOptions;
    autoFocusOnError: boolean | 'detect';
    errorSelector: string;
    selectErrorText: boolean;
    stickyNavbar: string;
    taintedMessage: string | boolean | null | ((nav: BeforeNavigate) => MaybePromise<boolean>);
    /**
     * Enable single page application (SPA) mode.
     * **The string and failStatus options are deprecated** and will be removed in the next major release.
     * @see https://superforms.rocks/concepts/spa
     */
    SPA: true | /** @deprecated */ string | /** @deprecated */ {
        failStatus?: number;
    };
    onSubmit: (input: Parameters<SubmitFunction>[0] & {
        /**
         * If dataType: 'json' is set, send this data instead of $form when posting,
         * and client-side validation for $form passes.
         * @param data An object that can be serialized with devalue.
         */
        jsonData: (data: Record<string, unknown>) => void;
        /**
         * Override client validation temporarily for this form submission.
         */
        validators: (validators: Exclude<ValidatorsOption<T>, 'clear'>) => void;
        /**
         * Use a custom fetch or XMLHttpRequest implementation for this form submission. It must return an ActionResult in the response body.
         * If the request is using a XMLHttpRequest, the promise must be resolved when the request has been completed, not before.
         */
        customRequest: (validators: (input: Parameters<SubmitFunction>[0]) => Promise<Response | XMLHttpRequest | ActionResult>) => void;
    }) => MaybePromise<unknown | void>;
    onResult: (event: {
        result: ActionResult;
        /**
         * @deprecated Use formElement instead
         */
        formEl: HTMLFormElement;
        formElement: HTMLFormElement;
        cancel: () => void;
    }) => MaybePromise<unknown | void>;
    onUpdate: (event: {
        form: SuperValidated<T, M, In>;
        /**
         * @deprecated Use formElement instead
         */
        formEl: HTMLFormElement;
        formElement: HTMLFormElement;
        cancel: () => void;
        result: Required<Extract<ActionResult, {
            type: 'success' | 'failure';
        }>>;
    }) => MaybePromise<unknown | void>;
    onUpdated: (event: {
        form: Readonly<SuperValidated<T, M, In>>;
    }) => MaybePromise<unknown | void>;
    onError: 'apply' | ((event: {
        result: {
            type: 'error';
            status?: number;
            error: App.Error | Error | {
                message: string;
            };
        };
    }) => MaybePromise<unknown | void>);
    onChange: (event: ChangeEvent<T>) => void;
    dataType: 'form' | 'json';
    jsonChunkSize: number;
    validators: ClientValidationAdapter<Partial<T>, Record<string, unknown>> | ValidatorsOption<T>;
    validationMethod: 'auto' | 'oninput' | 'onblur' | 'onsubmit' | 'submit-only';
    customValidity: boolean;
    clearOnSubmit: 'errors' | 'message' | 'errors-and-message' | 'none';
    delayMs: number;
    timeoutMs: number;
    multipleSubmits: 'prevent' | 'allow' | 'abort';
    syncFlashMessage?: boolean;
    /**
     * @deprecated SvelteKit has moved to $app/state instead of $app/stores, making it hard to support both. Use the flash library directly (setFlash or redirect) instead of integrating it with Superforms.
     */
    flashMessage: {
        module: {
            getFlash(page: Readable<Page>): Writable<App.PageData['flash']>;
            updateFlash(page: Readable<Page>, update?: () => Promise<void>): Promise<boolean>;
        };
        onError?: (event: {
            result: {
                type: 'error';
                status?: number;
                error: App.Error | Error | {
                    message: string;
                };
            };
            flashMessage: Writable<App.PageData['flash']>;
        }) => MaybePromise<unknown | void>;
        cookiePath?: string;
        cookieName?: string;
    };
    warnings: {
        duplicateId?: boolean;
    };
    transport: IsAny<Transport> extends true ? never : Transport;
    /**
     * Version 1 compatibilty mode if true.
     * Sets resetForm = false and taintedMessage = true.
     * Add define: { SUPERFORMS_LEGACY: true } to vite.config.ts to enable globally.
     */
    legacy: boolean;
}>;
export type SuperFormSnapshot<T extends Record<string, unknown>, M = App.Superforms.Message extends never ? any : App.Superforms.Message, In extends Record<string, unknown> = T> = SuperFormValidated<T, M, In> & {
    tainted: TaintedFields<T> | undefined;
};
export type SuperFormData<T extends Record<string, unknown>> = {
    subscribe: Readable<T>['subscribe'];
    set(this: void, value: T, options?: {
        taint?: TaintOption;
    }): void;
    update(this: void, updater: Updater<T>, options?: {
        taint?: TaintOption;
    }): void;
};
export type SuperFormErrors<T extends Record<string, unknown>> = {
    subscribe: Writable<ValidationErrors<T>>['subscribe'];
    set(this: void, value: ValidationErrors<T>, options?: {
        force?: boolean;
    }): void;
    update(this: void, updater: Updater<ValidationErrors<T>>, options?: {
        force?: boolean;
    }): void;
    clear: () => void;
};
type ResetOptions<T extends Record<string, unknown>> = {
    keepMessage?: boolean;
    data?: Partial<T>;
    newState?: Partial<T>;
    id?: string;
};
type Capture<T extends Record<string, unknown>, M = App.Superforms.Message extends never ? any : App.Superforms.Message> = [T] extends [T] ? () => SuperFormSnapshot<T, M> : never;
type Restore<T extends Record<string, unknown>, M = App.Superforms.Message extends never ? any : App.Superforms.Message> = (snapshot: SuperFormSnapshot<T, M>) => void;
export type SuperForm<T extends Record<string, unknown>, M = App.Superforms.Message extends never ? any : App.Superforms.Message> = {
    form: SuperFormData<T>;
    formId: Writable<string>;
    errors: SuperFormErrors<T>;
    constraints: Writable<InputConstraints<T>>;
    message: Writable<M | undefined>;
    tainted: Writable<TaintedFields<T> | undefined>;
    submitting: Readable<boolean>;
    delayed: Readable<boolean>;
    timeout: Readable<boolean>;
    /**
     * @deprecated posted is inconsistent between server and client validation, and SPA mode. Will be removed in v3. Use a status message or return your own data in the form action to handle form post status.
     */
    posted: Readable<boolean>;
    allErrors: Readable<{
        path: string;
        messages: string[];
    }[]>;
    options: T extends T ? FormOptions<T, M> : never;
    enhance: (el: HTMLFormElement, events?: SuperFormEvents<T, M>) => ReturnType<typeof kitEnhance>;
    isTainted: (path?: FormPath<T> | Record<string, unknown> | boolean | undefined) => boolean;
    reset: (options?: ResetOptions<T>) => void;
    submit: (submitter?: HTMLElement | Event | EventTarget | null) => void;
    capture: Capture<T, M>;
    restore: T extends T ? Restore<T, M> : never;
    validate: <Out extends Partial<T> = T, Path extends FormPathLeaves<T> = FormPathLeaves<T>, In extends Record<string, unknown> = Record<string, unknown>>(path: Path, opts?: ValidateOptions<FormPathType<T, Path>, Out, In>) => Promise<string[] | undefined>;
    validateForm: <Out extends Partial<T> = T, In extends Record<string, unknown> = Record<string, unknown>>(opts?: {
        update?: boolean;
        schema?: ValidationAdapter<Out, In>;
        focusOnError?: boolean;
    }) => Promise<SuperFormValidated<T, M, In>>;
};
export type ValidateOptions<Value, Out extends Record<string, unknown>, In extends Record<string, unknown>> = Partial<{
    value: Value;
    update: boolean | 'errors' | 'value';
    taint: TaintOption;
    errors: string | string[];
    schema: ValidationAdapter<Out, In>;
}>;
export type ChangeEvent<T extends Record<string, unknown>> = {
    path: FormPath<T>;
    paths: FormPath<T>[];
    formElement: HTMLFormElement;
    target: Element;
    set: <Path extends FormPath<T>>(path: Path, value: FormPathType<T, Path>, options?: ProxyOptions) => void;
    get: <Path extends FormPath<T>>(path: Path) => FormPathType<T, Path>;
} | {
    target: undefined;
    paths: FormPath<T>[];
    set: <Path extends FormPath<T>>(path: Path, value: FormPathType<T, Path>, options?: ProxyOptions) => void;
    get: <Path extends FormPath<T>>(path: Path) => FormPathType<T, Path>;
};
/**
 * Initializes a SvelteKit form, for convenient handling of values, errors and sumbitting data.
 * @param {SuperValidated} form Usually data.form from PageData or defaults, but can also be an object with default values, but then constraints won't be available.
 * @param {FormOptions} formOptions Configuration for the form.
 * @returns {SuperForm} A SuperForm object that can be used in a Svelte component.
 * @DCI-context
 */
export declare function superForm<T extends Record<string, unknown> = Record<string, unknown>, M = App.Superforms.Message extends never ? any : App.Superforms.Message, In extends Record<string, unknown> = T>(form: SuperValidated<T, M, In> | T, formOptions?: FormOptions<T, M, In>): SuperForm<T, M>;
export {};
