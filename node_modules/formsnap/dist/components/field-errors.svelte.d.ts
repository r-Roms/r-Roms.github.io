import type { FieldErrorsProps } from "./types.js";
/**
 * ## FieldErrors
 * A component that renders the container for validation errors for a [Field](https://formsnap.dev/docs/components/field), [Fieldset](https://formsnap.dev/docs/components/fieldset), or [ElementField](https://formsnap.dev/docs/components/element-field).
 *
 * - [FieldErrors Documentation](https://formsnap.dev/docs/components/field-errors)
 *
 * ### Snippet Props
 * - `errors` - An array of errors for the associated field.
 * - `fieldErrorsAttrs` - A spreadable object of attributes for the container element if `child` snippet is used.
 * - `errorAttrs` - A spreadable object of attributes for the individual error elements if `child` snippet is used.
 *
 * @param {string} [id] - The id of the field errors container.
 */
declare const FieldErrors: import("svelte").Component<FieldErrorsProps, {}, "ref">;
export default FieldErrors;
