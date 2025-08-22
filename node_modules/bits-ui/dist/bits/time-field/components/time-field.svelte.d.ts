import type { TimeValue } from "../../../shared/date/types.js";
import type { Time } from "@internationalized/date";
import type { TimeFieldRootProps } from "../types.js";
declare class __sveltets_Render<T extends TimeValue = Time> {
    props(): TimeFieldRootProps<T>;
    events(): {};
    slots(): {};
    bindings(): "value" | "placeholder";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends TimeValue = Time>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T extends TimeValue = Time>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const TimeField: $$IsomorphicComponent;
type TimeField<T extends TimeValue = Time> = InstanceType<typeof TimeField<T>>;
export default TimeField;
