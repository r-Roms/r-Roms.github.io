import { type array, type mutable, type show, type Thunk } from "@ark/util";
import type { BaseConstraint } from "../constraint.ts";
import type { GenericRoot } from "../generic.ts";
import type { InternalModule } from "../module.ts";
import type { BaseNode } from "../node.ts";
import type { BaseParseContext } from "../parse.ts";
import type { BaseRoot } from "../roots/root.ts";
import type { BaseScope } from "../scope.ts";
import type { ArkError, ArkErrors } from "./errors.ts";
export declare const makeRootAndArrayPropertiesMutable: <o extends object>(o: o) => makeRootAndArrayPropertiesMutable<o>;
export type makeRootAndArrayPropertiesMutable<inner> = {
    -readonly [k in keyof inner]: inner[k] extends array | undefined ? mutable<inner[k]> : inner[k];
} & unknown;
export type internalImplementationOf<external, typeOnlyKey extends keyof external = never> = {
    [k in Exclude<keyof external, typeOnlyKey>]: external[k] extends ((...args: infer args) => unknown) ? (...args: {
        [i in keyof args]: never;
    }) => unknown : unknown;
};
export type arkKind = typeof arkKind;
export declare const arkKind: " arkKind";
export interface ArkKinds {
    constraint: BaseConstraint;
    root: BaseRoot;
    scope: BaseScope;
    generic: GenericRoot;
    module: InternalModule;
    error: ArkError;
    errors: ArkErrors;
    context: BaseParseContext;
}
export type ArkKind = show<keyof ArkKinds>;
export declare const hasArkKind: <kind extends ArkKind>(value: unknown, kind: kind) => value is ArkKinds[kind];
export declare const isNode: (value: unknown) => value is BaseNode;
export type unwrapDefault<thunkableValue> = thunkableValue extends Thunk<infer returnValue> ? returnValue : thunkableValue;
