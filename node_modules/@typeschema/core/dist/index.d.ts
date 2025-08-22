import { JSONSchema7 } from 'json-schema';

type IfDefined<TValue, TModule extends string = ''> = unknown extends TValue ? TModule extends '' ? never : `Cannot find module '${TModule}'` : TValue;
type UnknownIfNever<T> = [T] extends [never] ? unknown : T;
declare function memoize<TValue>(fn: () => Promise<TValue>): (() => Promise<TValue>) & {
    clear(): void;
};
declare function memoizeWithKey<TKey, TValue>(fn: (key: TKey) => Promise<TValue>): ((key: TKey) => Promise<TValue>) & {
    clear(): void;
};
declare function unsupportedAdapter<TResolver extends Resolver>(adapterName: string): (schema: SchemaFrom<TResolver>) => Promise<never>;

interface Resolver<TSchema = unknown> {
    schema: TSchema;
    input: unknown;
    output: unknown;
    base: unknown;
}
type SchemaFrom<TResolver extends Resolver> = IfDefined<TResolver['base']>;
type InputFrom<TResolver extends Resolver, TSchema> = TSchema extends SchemaFrom<TResolver> ? IfDefined<(TResolver & {
    schema: TSchema;
})['input']> : never;
type OutputFrom<TResolver extends Resolver, TSchema> = TSchema extends SchemaFrom<TResolver> ? IfDefined<(TResolver & {
    schema: TSchema;
})['output']> : never;

type SerializationAdapter<TResolver extends Resolver> = <TSchema extends SchemaFrom<TResolver>>(schema: TSchema) => Promise<JSONSchema7>;
type ToJSONSchema<TResolver extends Resolver> = <TSchema extends SchemaFrom<TResolver>>(schema: TSchema) => Promise<JSONSchema7>;
declare function createToJSONSchema<TResolver extends Resolver>(serializationAdapter: SerializationAdapter<TResolver>): ToJSONSchema<TResolver>;

type ValidationIssue = {
    message: string;
    path?: Array<PropertyKey>;
};
type ValidationResult<TOutput> = {
    success: true;
    data: TOutput;
} | {
    success: false;
    issues: Array<ValidationIssue>;
};
type ValidationAdapter<TResolver extends Resolver> = <TSchema extends SchemaFrom<TResolver>>(schema: TSchema) => Promise<(data: unknown) => Promise<ValidationResult<UnknownIfNever<OutputFrom<TResolver, TSchema>>>>>;
type Validate<TResolver extends Resolver> = <TSchema extends SchemaFrom<TResolver>>(schema: TSchema, data: unknown) => Promise<ValidationResult<UnknownIfNever<OutputFrom<TResolver, TSchema>>>>;
declare function createValidate<TResolver extends Resolver>(validationAdapter: ValidationAdapter<TResolver>): Validate<TResolver>;
type Assert<TResolver extends Resolver> = <TSchema extends SchemaFrom<TResolver>>(schema: TSchema, data: unknown) => Promise<UnknownIfNever<OutputFrom<TResolver, TSchema>>>;
declare function createAssert<TResolver extends Resolver>(validate: Validate<TResolver>): Assert<TResolver>;

type TypeSchema<TOutput, TInput = TOutput> = {
    _input: TInput;
    _output: TOutput;
    assert(data: unknown): Promise<TOutput>;
    parse(data: unknown): Promise<TOutput>;
    validate(data: unknown): Promise<{
        data: TOutput;
    } | {
        issues: Array<ValidationIssue>;
    }>;
};
type Wrap<TResolver extends Resolver> = <TSchema extends SchemaFrom<TResolver>>(schema: TSchema) => TypeSchema<UnknownIfNever<OutputFrom<TResolver, TSchema>>, UnknownIfNever<InputFrom<TResolver, TSchema>>>;
declare function createWrap<TResolver extends Resolver>(assert: Assert<TResolver>, validate: Validate<TResolver>): Wrap<TResolver>;

export { type Assert, type IfDefined, type InputFrom, type OutputFrom, type Resolver, type SchemaFrom, type SerializationAdapter, type ToJSONSchema, type TypeSchema, type UnknownIfNever, type Validate, type ValidationAdapter, type ValidationIssue, type ValidationResult, type Wrap, createAssert, createToJSONSchema, createValidate, createWrap, memoize, memoizeWithKey, unsupportedAdapter };
