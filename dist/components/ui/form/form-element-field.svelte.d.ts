import * as FormPrimitive from "formsnap";
import type { FormPathLeaves } from "sveltekit-superforms";
import type { HTMLAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
declare function $$render<T extends Record<string, unknown>, U extends FormPathLeaves<T>>(): {
    props: Omit<WithElementRef<HTMLAttributes<HTMLDivElement>>, "children"> & FormPrimitive.ElementFieldProps<T, U, any>;
    exports: {};
    bindings: "ref";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T extends Record<string, unknown>, U extends FormPathLeaves<T>> {
    props(): ReturnType<typeof $$render<T, U>>['props'];
    events(): ReturnType<typeof $$render<T, U>>['events'];
    slots(): ReturnType<typeof $$render<T, U>>['slots'];
    bindings(): "ref";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends Record<string, unknown>, U extends FormPathLeaves<T>>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T, U>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T, U>['props']>, ReturnType<__sveltets_Render<T, U>['events']>, ReturnType<__sveltets_Render<T, U>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T, U>['bindings']>;
    } & ReturnType<__sveltets_Render<T, U>['exports']>;
    <T extends Record<string, unknown>, U extends FormPathLeaves<T>>(internal: unknown, props: ReturnType<__sveltets_Render<T, U>['props']> & {}): ReturnType<__sveltets_Render<T, U>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any, any>['bindings']>;
}
declare const FormElementField: $$IsomorphicComponent;
type FormElementField<T extends Record<string, unknown>, U extends FormPathLeaves<T>> = InstanceType<typeof FormElementField<T, U>>;
export default FormElementField;
