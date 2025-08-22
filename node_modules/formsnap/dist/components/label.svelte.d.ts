import type { LabelProps } from "./types.js";
/**
 * ## Label
 * A component that renders a label element associated with a form control, and must be used within a [Control](https://formsnap.dev/docs/components/control) component.
 *
 * - [Label Documentation](https://formsnap.dev/docs/components/label)
 *
 * @example
 * ```svelte
 * <Control>
 * {#snippet children({ props })}
 * 	<Label>First Name</Label>
 * 	<input type="text" name="first_name" {...props} bind:value={$formData.first_name} />
 * {/snippet}
 * </Control>
 * ```
 *
 * ### `child` Snippet Props
 * - `props` - A spreadable object of attributes for the label element
 *
 * @param {boolean} [asChild=false] - Whether to opt out of rendering the label element. [[asChild Docs](https://formsnap.dev/docs/composition/aschild)]
 */
declare const Label: import("svelte").Component<LabelProps, {}, "ref">;
export default Label;
