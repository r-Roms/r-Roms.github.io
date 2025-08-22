import * as FormPrimitive from "formsnap";
import { type WithoutChild } from "../../../utils.js";
type $$ComponentProps = WithoutChild<FormPrimitive.FieldErrorsProps> & {
    errorClasses?: string | undefined | null;
};
declare const FormFieldErrors: import("svelte").Component<$$ComponentProps, {}, "ref">;
type FormFieldErrors = ReturnType<typeof FormFieldErrors>;
export default FormFieldErrors;
