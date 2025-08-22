/**
 * Parameters for the `getAriaDescribedBy` function.
 */
type AriaDescribedByParams = {
    /** The ID of the validation element for the field. */
    fieldErrorsId: string | undefined;
    /** The ID of the description element for the field. */
    descriptionId: string | undefined;
    /** The current validation errors for the field. */
    errors: string[];
};
/**
 * Retrieves the appropriate `aria-describedby` value for a form control
 * given the existence of a description and/or validation message.
 */
export declare function getAriaDescribedBy({ fieldErrorsId, descriptionId, errors, }: AriaDescribedByParams): string | undefined;
/**
 * Retrieves the appropriate `aria-required` attribute value for a form
 * control given the constraints for the field.
 */
export declare function getAriaRequired(constraints: Record<string, unknown>): "true" | undefined;
/**
 * Retrieves the appropriate `aria-invalid` attribute value for a form
 * control given the current validation errors.
 */
export declare function getAriaInvalid(errors: string[] | undefined): "true" | undefined;
/**
 * Retrieves the appropriate `data-fs-error` value for an element
 * given the current validation errors.
 */
export declare function getDataFsError(errors: string[] | undefined): string | undefined;
export {};
