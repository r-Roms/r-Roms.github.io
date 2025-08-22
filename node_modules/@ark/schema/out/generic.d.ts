import { Callable, type array, type Hkt, type JsonStructure } from "@ark/util";
import type { RootSchema } from "./kinds.ts";
import type { BaseNode } from "./node.ts";
import type { BaseRoot } from "./roots/root.ts";
import type { BaseScope } from "./scope.ts";
import { arkKind } from "./shared/utils.ts";
export type GenericParamAst<name extends string = string, constraint = unknown> = [name: name, constraint: constraint];
export type GenericParamDef<name extends string = string> = name | readonly [name, unknown];
export declare const parseGeneric: (paramDefs: array<GenericParamDef>, bodyDef: unknown, $: BaseScope) => GenericRoot;
export type genericParamNames<params extends array<GenericParamAst>> = {
    [i in keyof params]: params[i][0];
};
export type genericParamConstraints<params extends array<GenericParamAst>> = {
    [i in keyof params]: params[i][1];
};
export type GenericArgResolutions<params extends array<GenericParamAst> = array<GenericParamAst>> = {
    [i in keyof params as params[i & `${number}`][0]]: BaseRoot;
};
export declare class LazyGenericBody<argResolutions = {}, returns = unknown> extends Callable<(args: argResolutions) => returns> {
}
export interface GenericAst<params extends array<GenericParamAst> = array<GenericParamAst>, bodyDef = unknown, $ = unknown, arg$ = $> {
    [arkKind]: "generic";
    paramsAst: params;
    bodyDef: bodyDef;
    $: $;
    arg$: arg$;
    names: genericParamNames<params>;
    t: this;
}
export declare class GenericRoot<params extends array<GenericParamAst> = array<GenericParamAst>, bodyDef = unknown> extends Callable<(...args: {
    [i in keyof params]: BaseRoot;
}) => BaseRoot> {
    readonly [arkKind] = "generic";
    readonly paramsAst: params;
    readonly t: GenericAst<params, bodyDef, {}, {}>;
    paramDefs: array<GenericParamDef>;
    bodyDef: bodyDef;
    $: BaseScope;
    arg$: BaseScope;
    baseInstantiation: BaseRoot;
    hkt: Hkt.constructor | null;
    description: string;
    constructor(paramDefs: array<GenericParamDef>, bodyDef: bodyDef, $: BaseScope, arg$: BaseScope, hkt: Hkt.constructor | null);
    defIsLazy(): this is GenericRoot<params, LazyGenericBody>;
    protected cacheGetter<name extends keyof this>(name: name, value: this[name]): this[name];
    get json(): JsonStructure;
    get params(): {
        [i in keyof params]: [params[i][0], BaseRoot];
    };
    get names(): genericParamNames<params>;
    get constraints(): {
        [i in keyof params]: BaseRoot;
    };
    get internal(): this;
    get referencesById(): Record<string, BaseNode>;
    get references(): BaseNode[];
}
export type genericParamSchemasToAst<schemas extends readonly GenericParamDef[]> = {
    [i in keyof schemas]: schemas[i] extends GenericParamDef<infer name> ? [
        name,
        unknown
    ] : never;
};
export type genericHktToConstraints<hkt extends abstract new () => Hkt> = InstanceType<hkt>["constraints"];
export type GenericRootParser = <const paramsDef extends readonly GenericParamDef[]>(...params: paramsDef) => GenericRootBodyParser<genericParamSchemasToAst<paramsDef>>;
export type GenericRootBodyParser<params extends array<GenericParamAst>> = {
    <const body>(body: RootSchema): GenericRoot<params, body>;
    <hkt extends Hkt.constructor>(instantiateDef: LazyGenericBody<GenericArgResolutions<params>>, hkt: hkt): GenericRoot<{
        [i in keyof params]: [params[i][0], genericHktToConstraints<hkt>[i]];
    }, InstanceType<hkt>>;
};
export declare const writeUnsatisfiedParameterConstraintMessage: <name extends string, constraint extends string, arg extends string>(name: name, constraint: constraint, arg: arg) => writeUnsatisfiedParameterConstraintMessage<name, constraint, arg>;
export type writeUnsatisfiedParameterConstraintMessage<name extends string, constraint extends string, arg extends string> = `${name} must be assignable to ${constraint} (was ${arg})`;
