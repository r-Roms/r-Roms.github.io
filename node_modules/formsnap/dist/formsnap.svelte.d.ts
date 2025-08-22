import { type Getter, type ReadableBoxedValues, type WithRefProps } from "svelte-toolbelt";
import type { FormPath } from "sveltekit-superforms";
import type { PrimitiveFromIndex } from "./internal/types.js";
import type { FsSuperForm } from "./components/types.js";
type FieldState<T extends Record<string, unknown>, U extends FormPath<T>> = FormFieldState<T, U> | ElementFieldState<T, U>;
type FormFieldStateProps<T extends Record<string, unknown>, U extends FormPath<T>, M = any> = ReadableBoxedValues<{
    form: FsSuperForm<T, M>;
    name: U;
}>;
declare class FormFieldState<T extends Record<string, unknown>, U extends FormPath<T>> {
    #private;
    form: FsSuperForm<T>;
    name: U;
    errors: string[];
    constraints: any;
    tainted: boolean;
    errorNode: HTMLElement | null;
    descriptionNode: HTMLElement | null;
    errorId: string | undefined;
    descriptionId: string | undefined;
    constructor(props: FormFieldStateProps<T, U>);
    snippetProps: {
        readonly value: T[U];
        readonly errors: string[];
        readonly tainted: boolean;
        readonly constraints: any;
    };
}
type ElementFieldStateProps<T extends Record<string, unknown>, U extends FormPath<T>, M = any> = ReadableBoxedValues<{
    form: FsSuperForm<T, M>;
    name: U;
}>;
declare class ElementFieldState<T extends Record<string, unknown>, U extends FormPath<T>> {
    #private;
    form: FsSuperForm<T>;
    name: U;
    errors: string[];
    constraints: any;
    tainted: boolean;
    errorNode: HTMLElement | null;
    descriptionNode: HTMLElement | null;
    derivedDescriptionNode: HTMLElement | null;
    value: PrimitiveFromIndex<T, U>;
    errorId: string | undefined;
    descriptionId: string | undefined;
    constructor(props: ElementFieldStateProps<T, U>, field: FieldState<T, U>);
    snippetProps: {
        readonly value: T[U];
        readonly errors: string[];
        readonly tainted: boolean;
        readonly constraints: any;
    };
}
type FieldErrorsStateProps = WithRefProps;
declare class FieldErrorsState<T extends Record<string, unknown>, U extends FormPath<T>> {
    #private;
    field: FieldState<T, U>;
    constructor(props: FieldErrorsStateProps, field: FieldState<T, U>);
    snippetProps: {
        errors: string[];
        errorProps: {
            "data-fs-field-error": string;
            "data-fs-error": string | undefined;
        };
    };
    fieldErrorsProps: {
        id: string;
        "data-fs-error": string | undefined;
        "data-fs-field-errors": string;
        "aria-live": "assertive";
    };
    errorProps: {
        "data-fs-field-error": string;
        "data-fs-error": string | undefined;
    };
}
type DescriptionStateProps = WithRefProps;
declare class DescriptionState {
    #private;
    field: FieldState<Record<string, unknown>, string>;
    constructor(props: DescriptionStateProps, field: FieldState<Record<string, unknown>, string>);
    props: {
        id: string;
        "data-fs-error": string | undefined;
        "data-fs-description": string;
    };
}
type ControlStateProps = ReadableBoxedValues<{
    id: string;
}>;
declare class ControlState {
    #private;
    field: FieldState<Record<string, unknown>, string>;
    labelId: ControlStateProps["id"];
    id: string;
    constructor(props: ControlStateProps, field: FieldState<Record<string, unknown>, string>);
    props: {
        id: string;
        name: string;
        "data-fs-error": string | undefined;
        "aria-describedby": string | undefined;
        "aria-invalid": "true" | undefined;
        "aria-required": "true" | undefined;
        "data-fs-control": string;
    };
    labelProps: {
        id: string;
        "data-fs-label": string;
        "data-fs-error": string | undefined;
        for: string;
    };
}
type LabelStateProps = WithRefProps;
declare class LabelState {
    #private;
    control: ControlState;
    constructor(props: LabelStateProps, control: ControlState);
    get props(): {
        id: string;
        "data-fs-label": string;
        "data-fs-error": string | undefined;
        for: string;
    };
}
type LegendStateProps = WithRefProps;
declare class LegendState {
    #private;
    field: FieldState<Record<string, unknown>, string>;
    constructor(props: LegendStateProps, field: FieldState<Record<string, unknown>, string>);
    props: {
        readonly id: string;
        readonly "data-fs-error": string | undefined;
        readonly "data-fs-legend": "";
    };
}
export declare function useField<T extends Record<string, unknown>, U extends FormPath<T>>(props: FormFieldStateProps<T, U>): FormFieldState<T, U>;
export declare function useElementField<T extends Record<string, unknown>, U extends FormPath<T>>(props: ElementFieldStateProps<T, U>): ElementFieldState<T, U>;
export declare function getField<T extends Record<string, unknown> = Record<string, unknown>, U extends FormPath<T> = FormPath<T>>(): FieldState<T, U>;
export declare function useFieldErrors<T extends Record<string, unknown> = Record<string, unknown>, U extends FormPath<T> = FormPath<T>>(props: FieldErrorsStateProps): FieldErrorsState<T, U>;
export declare function useDescription(props: DescriptionStateProps): DescriptionState;
export declare function useControl(props: ControlStateProps): ControlState;
export declare function _getFormControl(): ControlState;
export declare function useLabel(props: LabelStateProps): LabelState;
export declare function useLegend(props: LegendStateProps): LegendState;
export type UseFormFieldProps = {
    /** Optionally provide a function that returns the ID of the field errors container. */
    errorsId?: Getter<string | undefined | null>;
    /** Optionally provide a function that returns the ID of the description element. */
    descriptionId?: Getter<string | undefined | null>;
};
export declare function useFormField<T extends Record<string, unknown> = Record<string, unknown>, U extends FormPath<T> = FormPath<T>>(props: UseFormFieldProps): {
    form: FsSuperForm<T>;
    readonly name: U;
    readonly errors: string[];
    readonly constraints: any;
    readonly tainted: boolean;
    readonly errorsId: string | undefined;
    readonly descriptionId: string | undefined;
};
export type UseFormControlProps = {
    /** Optionally provide a function that returns the ID of the control element. */
    id?: Getter<string | undefined | null>;
};
export declare function useFormControl(props: UseFormControlProps): {
    readonly id: string;
    readonly labelProps: {
        id: string;
        "data-fs-label": string;
        "data-fs-error": string | undefined;
        for: string;
    };
    readonly props: {
        id: string;
        name: string;
        "data-fs-error": string | undefined;
        "aria-describedby": string | undefined;
        "aria-invalid": "true" | undefined;
        "aria-required": "true" | undefined;
        "data-fs-control": string;
    };
};
/**
 * Use `useFormControl` instead.
 * @deprecated
 */
export declare const getFormControl: typeof useFormControl;
/**
 * Use `useFormField` instead.
 * @deprecated
 */
export declare const getFormField: typeof useFormField;
export {};
