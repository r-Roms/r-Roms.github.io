import { box, useOnChange, useRefById, } from "svelte-toolbelt";
import { fromStore } from "svelte/store";
import { getContext, setContext } from "svelte";
import { extractErrorArray } from "./internal/utils/errors.js";
import { getValueAtPath } from "./internal/utils/path.js";
import { getAriaDescribedBy, getAriaInvalid, getAriaRequired, getDataFsError, } from "./internal/utils/attributes.js";
import { useId } from "./internal/utils/id.js";
class FormFieldState {
    #name;
    #formErrors;
    #formConstraints;
    #formTainted;
    #formData;
    form;
    name = $derived.by(() => this.#name.current);
    errors = $derived.by(() => extractErrorArray(getValueAtPath(this.#name.current, structuredClone(this.#formErrors.current))));
    constraints = $derived.by(() => getValueAtPath(this.#name.current, structuredClone(this.#formConstraints.current)) ?? {});
    tainted = $derived.by(() => this.#formTainted.current
        ? getValueAtPath(this.#name.current, structuredClone(this.#formTainted.current)) ===
            true
        : false);
    errorNode = $state(null);
    descriptionNode = $state(null);
    errorId = $state();
    descriptionId = $state();
    constructor(props) {
        this.#name = props.name;
        this.form = props.form.current;
        this.#formErrors = fromStore(props.form.current.errors);
        this.#formConstraints = fromStore(props.form.current.constraints);
        this.#formTainted = fromStore(props.form.current.tainted);
        this.#formData = fromStore(props.form.current.form);
        $effect(() => {
            if (this.errorNode && this.errorNode.id) {
                this.errorId = this.errorNode.id;
            }
        });
        $effect(() => {
            if (this.descriptionNode && this.descriptionNode.id) {
                this.descriptionId = this.descriptionNode.id;
            }
        });
    }
    snippetProps = $derived.by(() => ({
        value: this.#formData.current[this.#name.current],
        errors: this.errors,
        tainted: this.tainted,
        constraints: this.constraints,
    }));
}
class ElementFieldState {
    #name;
    #formErrors;
    #formConstraints;
    #formTainted;
    #formData;
    #field;
    form;
    name = $derived.by(() => {
        const [path] = splitArrayPath(this.#name.current);
        return path;
    });
    errors = $derived.by(() => extractErrorArray(getValueAtPath(this.#name.current, this.#formErrors.current)));
    constraints = $derived.by(() => getValueAtPath(this.#name.current, this.#formConstraints.current) ?? {});
    tainted = $derived.by(() => this.#formTainted.current
        ? getValueAtPath(this.#name.current, this.#formTainted.current) === true
        : false);
    errorNode = $state(null);
    descriptionNode = $state(null);
    // fall back to the parent field's description node if one for
    // this specific element doesn't exist.
    derivedDescriptionNode = $derived.by(() => {
        if (this.descriptionNode)
            return this.descriptionNode;
        if (this.#field.descriptionNode)
            return this.#field.descriptionNode;
        return null;
    });
    value = $derived.by(() => {
        return getValueAtPath(this.#name.current, this.#formData.current);
    });
    errorId = $state();
    descriptionId = $state();
    constructor(props, field) {
        this.#name = props.name;
        this.form = props.form.current;
        this.#formErrors = fromStore(props.form.current.errors);
        this.#formConstraints = fromStore(props.form.current.constraints);
        this.#formTainted = fromStore(props.form.current.tainted);
        this.#formData = fromStore(props.form.current.form);
        this.#field = field;
        useOnChange(() => this.errorNode, (v) => {
            if (v && v.id) {
                this.errorId = v.id;
            }
        });
        useOnChange(() => this.descriptionNode, (v) => {
            if (v && v.id) {
                this.descriptionId = v.id;
            }
        });
    }
    snippetProps = $derived.by(() => ({
        value: this.#formData.current[this.#name.current],
        errors: this.errors,
        tainted: this.tainted,
        constraints: 
        // @ts-expect-error - this type is wonky
        this.#formConstraints.current[this.#name.current] ?? {},
    }));
}
class FieldErrorsState {
    #ref;
    #id;
    field;
    #errorAttr = $derived.by(() => getDataFsError(this.field.errors));
    constructor(props, field) {
        this.#ref = props.ref;
        this.#id = props.id;
        this.field = field;
        useRefById({
            id: this.#id,
            ref: this.#ref,
            onRefChange: (node) => {
                this.field.errorNode = node;
            },
        });
    }
    snippetProps = $derived.by(() => ({
        errors: this.field.errors,
        errorProps: this.errorProps,
    }));
    fieldErrorsProps = $derived.by(() => ({
        id: this.#id.current,
        "data-fs-error": this.#errorAttr,
        "data-fs-field-errors": "",
        "aria-live": "assertive",
    }));
    errorProps = $derived.by(() => ({
        "data-fs-field-error": "",
        "data-fs-error": this.#errorAttr,
    }));
}
class DescriptionState {
    #ref;
    #id;
    field;
    constructor(props, field) {
        this.#ref = props.ref;
        this.#id = props.id;
        this.field = field;
        useRefById({
            id: this.#id,
            ref: this.#ref,
            onRefChange: (node) => {
                this.field.descriptionNode = node;
            },
        });
    }
    props = $derived.by(() => ({
        id: this.#id.current,
        "data-fs-error": getDataFsError(this.field.errors),
        "data-fs-description": "",
    }));
}
class ControlState {
    #id;
    field;
    labelId = box(useId());
    id = $state(useId());
    constructor(props, field) {
        this.#id = props.id;
        this.field = field;
        useOnChange(() => this.#id.current, (v) => {
            this.id = v;
        });
    }
    props = $derived.by(() => ({
        id: this.id,
        name: this.field.name,
        "data-fs-error": getDataFsError(this.field.errors),
        "aria-describedby": getAriaDescribedBy({
            fieldErrorsId: this.field.errorId,
            descriptionId: this.field.descriptionId,
            errors: this.field.errors,
        }),
        "aria-invalid": getAriaInvalid(this.field.errors),
        "aria-required": getAriaRequired(this.field.constraints),
        "data-fs-control": "",
    }));
    labelProps = $derived.by(() => ({
        id: this.labelId.current,
        "data-fs-label": "",
        "data-fs-error": getDataFsError(this.field.errors),
        for: this.id,
    }));
}
class LabelState {
    #ref;
    #id;
    control;
    constructor(props, control) {
        this.#ref = props.ref;
        this.#id = props.id;
        this.control = control;
        this.control.labelId = this.#id;
        useRefById({
            id: this.#id,
            ref: this.#ref,
        });
    }
    get props() {
        return this.control.labelProps;
    }
}
class LegendState {
    #ref;
    #id;
    field;
    constructor(props, field) {
        this.#ref = props.ref;
        this.#id = props.id;
        this.field = field;
        useRefById({
            id: this.#id,
            ref: this.#ref,
        });
    }
    props = $derived.by(() => ({
        id: this.#id.current,
        "data-fs-error": getDataFsError(this.field.errors),
        "data-fs-legend": "",
    }));
}
const FORM_FIELD_CTX = Symbol.for("formsnap.form-field");
const FORM_CONTROL_CTX = Symbol.for("formsnap.form-control");
export function useField(props) {
    return setContext(FORM_FIELD_CTX, new FormFieldState(props));
}
export function useElementField(props) {
    const formField = getField();
    return setContext(FORM_FIELD_CTX, new ElementFieldState(props, formField));
}
export function getField() {
    return getContext(FORM_FIELD_CTX);
}
export function useFieldErrors(props) {
    return new FieldErrorsState(props, getField());
}
export function useDescription(props) {
    return new DescriptionState(props, getField());
}
export function useControl(props) {
    return setContext(FORM_CONTROL_CTX, new ControlState(props, getField()));
}
export function _getFormControl() {
    return getContext(FORM_CONTROL_CTX);
}
export function useLabel(props) {
    return new LabelState(props, _getFormControl());
}
export function useLegend(props) {
    return new LegendState(props, getField());
}
// takes a string like "urls[0]" and returns ["urls", "0"]
// so we can access the specific array index properties
// since datatype: json is not supported with regular form
// submission, this should be fine
function splitArrayPath(name) {
    const [path, index] = name.split(/[[\]]/);
    return [path, index];
}
export function useFormField(props) {
    const fieldState = getContext(FORM_FIELD_CTX);
    const form = fieldState.form;
    const errorsId = $derived(props.errorsId ? props.errorsId() : undefined);
    const descriptionId = $derived(props.descriptionId ? props.descriptionId() : undefined);
    useOnChange(() => errorsId, (v) => {
        if (v) {
            fieldState.errorId = v;
        }
    });
    useOnChange(() => descriptionId, (v) => {
        if (v) {
            fieldState.descriptionId = v;
        }
    });
    return {
        form,
        get name() {
            return fieldState.name;
        },
        get errors() {
            return fieldState.errors;
        },
        get constraints() {
            return fieldState.constraints;
        },
        get tainted() {
            return fieldState.tainted;
        },
        get errorsId() {
            return fieldState.errorId;
        },
        get descriptionId() {
            return fieldState.descriptionId;
        },
    };
}
export function useFormControl(props) {
    const controlState = getContext(FORM_CONTROL_CTX);
    const id = $derived(props.id ? props.id() : undefined);
    useOnChange(() => id, (v) => {
        if (v) {
            controlState.id = v;
        }
    });
    return {
        get id() {
            return controlState.id;
        },
        get labelProps() {
            return controlState.labelProps;
        },
        get props() {
            return controlState.props;
        },
    };
}
/**
 * Use `useFormControl` instead.
 * @deprecated
 */
export const getFormControl = useFormControl;
/**
 * Use `useFormField` instead.
 * @deprecated
 */
export const getFormField = useFormField;
