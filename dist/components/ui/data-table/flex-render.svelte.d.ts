import type { CellContext, ColumnDefTemplate, HeaderContext } from "@tanstack/table-core";
declare function $$render<TData, TValue, TContext extends HeaderContext<TData, TValue> | CellContext<TData, TValue>>(): {
    props: {
        /** The cell or header field of the current cell's column definition. */
        content?: TContext extends HeaderContext<TData, TValue> ? ColumnDefTemplate<HeaderContext<TData, TValue>> : TContext extends CellContext<TData, TValue> ? ColumnDefTemplate<CellContext<TData, TValue>> : never;
        /** The result of the `getContext()` function of the header or cell */
        context: TContext;
    };
    exports: {};
    bindings: "";
    slots: {};
    events: {};
};
declare class __sveltets_Render<TData, TValue, TContext extends HeaderContext<TData, TValue> | CellContext<TData, TValue>> {
    props(): ReturnType<typeof $$render<TData, TValue, TContext>>['props'];
    events(): ReturnType<typeof $$render<TData, TValue, TContext>>['events'];
    slots(): ReturnType<typeof $$render<TData, TValue, TContext>>['slots'];
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <TData, TValue, TContext extends HeaderContext<TData, TValue> | CellContext<TData, TValue>>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<TData, TValue, TContext>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<TData, TValue, TContext>['props']>, ReturnType<__sveltets_Render<TData, TValue, TContext>['events']>, ReturnType<__sveltets_Render<TData, TValue, TContext>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<TData, TValue, TContext>['bindings']>;
    } & ReturnType<__sveltets_Render<TData, TValue, TContext>['exports']>;
    <TData, TValue, TContext extends HeaderContext<TData, TValue> | CellContext<TData, TValue>>(internal: unknown, props: ReturnType<__sveltets_Render<TData, TValue, TContext>['props']> & {}): ReturnType<__sveltets_Render<TData, TValue, TContext>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any, any, any>['bindings']>;
}
declare const FlexRender: $$IsomorphicComponent;
type FlexRender<TData, TValue, TContext extends HeaderContext<TData, TValue> | CellContext<TData, TValue>> = InstanceType<typeof FlexRender<TData, TValue, TContext>>;
export default FlexRender;
