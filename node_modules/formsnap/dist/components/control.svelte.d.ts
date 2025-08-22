import type { ControlProps } from "./types.js";
/**
 * ## Control
 * Associates a [Label](https://formsnap.dev/docs/components/label) with and provides necessary attributes for a form control.
 *
 * - [Control Documentation](https://formsnap.dev/docs/components/label)
 *
 * @example
 * ```svelte
 * <Control>
 *  {#snippet children({ props })}
 * <Label>Name</Label>
 * <input type="text" {...props} bind:value={$formData.name} />
 *   {/snippet}
 * </Control>
 * ```
 *
 * ### Snippet Props
 * - `props` - A spreadable object of attributes that must be applied to the form control element.
 */
declare const Control: import("svelte").Component<ControlProps, {}, "">;
export default Control;
