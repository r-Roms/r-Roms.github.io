import * as _typeschema_core from '@typeschema/core';
import { Resolver, ValidationAdapter, SchemaFrom, UnknownIfNever, OutputFrom, InputFrom } from '@typeschema/core';

type Prettify<T> = {
    [K in keyof T]: T[K];
} & NonNullable<unknown>;
type Attributes<T> = Prettify<Omit<T, {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T]>>;
interface AdapterResolver extends Resolver {
    base: new (...args: unknown[]) => object;
    input: this['schema'] extends this['base'] ? this['schema'] extends {
        prototype: unknown;
    } ? Attributes<this['schema']['prototype']> : never : never;
    output: this['schema'] extends this['base'] ? this['schema'] extends {
        prototype: unknown;
    } ? Attributes<this['schema']['prototype']> : never : never;
}

declare const validationAdapter: ValidationAdapter<AdapterResolver>;

type Schema = SchemaFrom<AdapterResolver>;
type Infer<TSchema extends Schema> = UnknownIfNever<OutputFrom<AdapterResolver, TSchema>>;
type InferIn<TSchema extends Schema> = UnknownIfNever<InputFrom<AdapterResolver, TSchema>>;
declare const validate: _typeschema_core.Validate<AdapterResolver>;
declare const assert: _typeschema_core.Assert<AdapterResolver>;
declare const wrap: _typeschema_core.Wrap<AdapterResolver>;

export { type AdapterResolver, type Infer, type InferIn, type Schema, assert, validate, validationAdapter, wrap };
