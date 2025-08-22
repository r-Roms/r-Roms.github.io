import type { FormPathLeaves as _FormPathLeaves } from "sveltekit-superforms";
import type { ElementFieldProps } from "./types.js";
declare class __sveltets_Render<T extends Record<string, unknown>, U extends _FormPathLeaves<T>> {
    props(): ElementFieldProps<T, U>;
    events(): {};
    slots(): {};
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends Record<string, unknown>, U extends _FormPathLeaves<T>>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T, U>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T, U>['props']>, ReturnType<__sveltets_Render<T, U>['events']>, ReturnType<__sveltets_Render<T, U>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T, U>['bindings']>;
    } & ReturnType<__sveltets_Render<T, U>['exports']>;
    <T extends Record<string, unknown>, U extends _FormPathLeaves<T>>(internal: unknown, props: ReturnType<__sveltets_Render<T, U>['props']> & {}): ReturnType<__sveltets_Render<T, U>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any, any>['bindings']>;
}
/**
 * ## ElementField
 * A component that provides the necessary context for a form field that represents a single element in an array.
 *
 * - [ElementField Documentation](https://formsnap.dev/docs/components/element-field)
 *
 * ### Snippet Props
 * - `value` - The value of the field.
 * - `errors` - The errors of the field.
 * - `tainted` - The tainted state of the field.
 * - `constraints` - The constraints of the field.
 *
 * @param {SuperForm} form - The form object.
 * @param {FormPathLeaves<T>} name - The name and index of the field. For example, `urls[0]`.
 */
declare const ElementField: $$IsomorphicComponent;
type ElementField<T extends Record<string, unknown>, U extends _FormPathLeaves<T>> = InstanceType<typeof ElementField<T, U>>;
export default ElementField;
