import type { FormPath as _FormPath } from "sveltekit-superforms";
import type { FieldsetProps } from "./types.js";
declare class __sveltets_Render<T extends Record<string, unknown>, U extends _FormPath<T>> {
    props(): FieldsetProps<T, U>;
    events(): {};
    slots(): {};
    bindings(): "ref";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends Record<string, unknown>, U extends _FormPath<T>>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T, U>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T, U>['props']>, ReturnType<__sveltets_Render<T, U>['events']>, ReturnType<__sveltets_Render<T, U>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T, U>['bindings']>;
    } & ReturnType<__sveltets_Render<T, U>['exports']>;
    <T extends Record<string, unknown>, U extends _FormPath<T>>(internal: unknown, props: ReturnType<__sveltets_Render<T, U>['props']> & {}): ReturnType<__sveltets_Render<T, U>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any, any>['bindings']>;
}
/**
 * ## Fieldset
 * A component that groups related form controls or fields and extends the [Field](https://formsnap.dev/docs/components/field) component.
 *
 * - [Fieldset Documentation](https://formsnap.dev/docs/components/fieldset)
 * - [Field Documentation](https://formsnap.dev/docs/components/field)
 *
 * ### Snippet Props
 * - `value` - The value of the field.
 * - `errors` - The errors of the field.
 * - `tainted` - The tainted state of the field.
 * - `constraints` - The constraints of the field.
 * - `props` - A spreadable object of attributes for the fieldset element if using the `child` snippet.
 *
 * @param {SuperForm} form - The form object.
 * @param {FormPath<T>} name - The name of the field.
 */
declare const Fieldset: $$IsomorphicComponent;
type Fieldset<T extends Record<string, unknown>, U extends _FormPath<T>> = InstanceType<typeof Fieldset<T, U>>;
export default Fieldset;
