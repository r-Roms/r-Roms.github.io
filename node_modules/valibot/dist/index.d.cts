/**
 * Checks if the input matches the schema. As this is an assertion function, it
 * can be used as a type guard.
 *
 * @param schema The schema to be used.
 * @param input The input to be tested.
 */
declare function assert<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema, input: unknown): asserts input is InferInput<TSchema>;

/**
 * Changes the local configuration of a schema.
 *
 * @param schema The schema to configure.
 * @param config The parse configuration.
 *
 * @returns The configured schema.
 */
declare function config<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema, config: Config<InferIssue<TSchema>>): TSchema;

/**
 * Fallback type.
 */
type Fallback<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>> = MaybeReadonly<InferOutput<TSchema>> | ((dataset?: OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>>, config?: Config<InferIssue<TSchema>>) => MaybeReadonly<InferOutput<TSchema>>);
/**
 * Schema with fallback type.
 */
type SchemaWithFallback<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TFallback extends Fallback<TSchema>> = TSchema & {
    /**
     * The fallback value.
     */
    readonly fallback: TFallback;
};
/**
 * Returns a fallback value as output if the input does not match the schema.
 *
 * @param schema The schema to catch.
 * @param fallback The fallback value.
 *
 * @returns The passed schema.
 */
declare function fallback<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TFallback extends Fallback<TSchema>>(schema: TSchema, fallback: TFallback): SchemaWithFallback<TSchema, TFallback>;

/**
 * Fallback async type.
 */
type FallbackAsync<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = MaybeReadonly<InferOutput<TSchema>> | ((dataset?: OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>>, config?: Config<InferIssue<TSchema>>) => MaybePromise<MaybeReadonly<InferOutput<TSchema>>>);
/**
 * Schema with fallback async type.
 */
type SchemaWithFallbackAsync<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TFallback extends FallbackAsync<TSchema>> = Omit<TSchema, 'async' | '~standard' | '~run'> & {
    /**
     * The fallback value.
     */
    readonly fallback: TFallback;
    /**
     * Whether it's async.
     */
    readonly async: true;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferInput<TSchema>, InferOutput<TSchema>>;
    /**
     * Parses unknown input values.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>>>;
};
/**
 * Returns a fallback value as output if the input does not match the schema.
 *
 * @param schema The schema to catch.
 * @param fallback The fallback value.
 *
 * @returns The passed schema.
 */
declare function fallbackAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TFallback extends FallbackAsync<TSchema>>(schema: TSchema, fallback: TFallback): SchemaWithFallbackAsync<TSchema, TFallback>;

/**
 * Flat errors type.
 */
type FlatErrors<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | undefined> = Prettify<{
    /**
     * The root errors.
     *
     * Hint: The error messages of issues without a path that belong to the root
     * of the schema are added to this key.
     */
    readonly root?: [string, ...string[]];
    /**
     * The nested errors.
     *
     * Hint: The error messages of issues with a path that belong to the nested
     * parts of the schema and can be converted to a dot path are added to this
     * key.
     */
    readonly nested?: Prettify<Readonly<Partial<Record<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> ? IssueDotPath<TSchema> : string, [
        string,
        ...string[]
    ]>>>>;
    /**
     * The other errors.
     *
     * Hint: Some issue paths, for example for complex data types like `Set` and
     * `Map`, have no key or a key that cannot be converted to a dot path. These
     * error messages are added to this key.
     */
    readonly other?: [string, ...string[]];
}>;
/**
 * Flatten the error messages of issues.
 *
 * @param issues The list of issues.
 *
 * @returns A flat error object.
 */
declare function flatten(issues: [BaseIssue<unknown>, ...BaseIssue<unknown>[]]): FlatErrors<undefined>;
/**
 * Flatten the error messages of issues.
 *
 * @param issues The list of issues.
 *
 * @returns A flat error object.
 */
declare function flatten<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(issues: [InferIssue<TSchema>, ...InferIssue<TSchema>[]]): FlatErrors<TSchema>;

/**
 * Extracts the exact keys of a tuple, array or object.
 */
type KeyOf$1<TValue> = IsAny<TValue> extends true ? never : TValue extends readonly unknown[] ? number extends TValue['length'] ? number : {
    [TKey in keyof TValue]: TKey extends `${infer TIndex extends number}` ? TIndex : never;
}[number] : TValue extends Record<string, unknown> ? keyof TValue & (string | number) : never;
/**
 * Path type.
 */
type Path$1 = readonly (string | number)[];
/**
 * Required path type.
 */
type RequiredPath$1 = readonly [string | number, ...Path$1];
/**
 * Lazily evaluate only the last valid path segment based on the given value.
 */
type LazyPath$1<TValue, TPathToCheck extends Path$1, TValidPath extends Path$1 = readonly []> = TPathToCheck extends readonly [] ? TValidPath : TPathToCheck extends readonly [
    infer TFirstKey extends KeyOf$1<TValue> & keyof TValue,
    ...infer TPathRest extends Path$1
] ? LazyPath$1<TValue[TFirstKey], TPathRest, readonly [...TValidPath, TFirstKey]> : IsNever<KeyOf$1<TValue>> extends false ? readonly [...TValidPath, KeyOf$1<TValue>] : TValidPath;
/**
 * Returns the path if valid, otherwise the last possible valid path based on
 * the given value.
 */
type ValidPath$1<TValue extends Record<string, unknown> | ArrayLike<unknown>, TPath extends RequiredPath$1> = TPath extends LazyPath$1<TValue, TPath> ? TPath : LazyPath$1<TValue, TPath>;

/**
 * Forwards the issues of the passed validation action.
 *
 * @param action The validation action.
 * @param path The path to forward the issues to.
 *
 * @returns The modified action.
 */
declare function forward<TInput extends Record<string, unknown> | ArrayLike<unknown>, TIssue extends BaseIssue<unknown>, const TPath extends RequiredPath$1>(action: BaseValidation<TInput, TInput, TIssue>, path: ValidPath$1<TInput, TPath>): BaseValidation<TInput, TInput, TIssue>;

/**
 * Forwards the issues of the passed validation action.
 *
 * @param action The validation action.
 * @param path The path to forward the issues to.
 *
 * @returns The modified action.
 */
declare function forwardAsync<TInput extends Record<string, unknown> | ArrayLike<unknown>, TIssue extends BaseIssue<unknown>, const TPath extends RequiredPath$1>(action: BaseValidation<TInput, TInput, TIssue> | BaseValidationAsync<TInput, TInput, TIssue>, path: ValidPath$1<TInput, TPath>): BaseValidationAsync<TInput, TInput, TIssue>;

/**
 * Schema with default type.
 */
type SchemaWithDefault = ExactOptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | NullableSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | NullishSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | UndefinedableSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown>;
/**
 * Schema with default async type.
 */
type SchemaWithDefaultAsync = ExactOptionalSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | NullableSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | NullishSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | UndefinedableSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown>;
/**
 * Infer default type.
 */
type InferDefault<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | SchemaWithDefault | SchemaWithDefaultAsync> = TSchema extends SchemaWithDefault | SchemaWithDefaultAsync ? TSchema['default'] extends (...args: any) => any ? ReturnType<TSchema['default']> : TSchema['default'] : undefined;
/**
 * Returns the default value of the schema.
 *
 * @param schema The schema to get it from.
 * @param dataset The input dataset if available.
 * @param config The config if available.
 *
 * @returns The default value.
 */
declare function getDefault<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema, dataset?: UnknownDataset, config?: Config<InferIssue<TSchema>>): InferDefault<TSchema>;

/**
 * Infer defaults type.
 */
type InferDefaults<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = TSchema extends LooseObjectSchema<infer TEntries, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<infer TEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<infer TEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<infer TEntries, ErrorMessage<StrictObjectIssue> | undefined> ? {
    -readonly [TKey in keyof TEntries]: InferDefaults<TEntries[TKey]>;
} : TSchema extends LooseObjectSchemaAsync<infer TEntries, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchemaAsync<infer TEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchemaAsync<infer TEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchemaAsync<infer TEntries, ErrorMessage<StrictObjectIssue> | undefined> ? {
    -readonly [TKey in keyof TEntries]: InferDefaults<TEntries[TKey]>;
} : TSchema extends LooseTupleSchema<infer TItems, ErrorMessage<LooseTupleIssue> | undefined> | StrictTupleSchema<infer TItems, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchema<infer TItems, ErrorMessage<TupleIssue> | undefined> | TupleWithRestSchema<infer TItems, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined> ? {
    -readonly [TKey in keyof TItems]: InferDefaults<TItems[TKey]>;
} : TSchema extends LooseTupleSchemaAsync<infer TItems, ErrorMessage<LooseTupleIssue> | undefined> | StrictTupleSchemaAsync<infer TItems, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchemaAsync<infer TItems, ErrorMessage<TupleIssue> | undefined> | TupleWithRestSchemaAsync<infer TItems, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined> ? {
    -readonly [TKey in keyof TItems]: InferDefaults<TItems[TKey]>;
} : Awaited<InferDefault<TSchema>>;

/**
 * Returns the default values of the schema.
 *
 * Hint: The difference to `getDefault` is that for object and tuple schemas
 * this function recursively returns the default values of the subschemas
 * instead of `undefined`.
 *
 * @param schema The schema to get them from.
 *
 * @returns The default values.
 */
declare function getDefaults<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined> | LooseTupleSchema<TupleItems, ErrorMessage<LooseTupleIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined> | StrictTupleSchema<TupleItems, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchema<TupleItems, ErrorMessage<TupleIssue> | undefined> | TupleWithRestSchema<TupleItems, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined>>(schema: TSchema): InferDefaults<TSchema>;

/**
 * Returns the default values of the schema.
 *
 * Hint: The difference to `getDefault` is that for object and tuple schemas
 * this function recursively returns the default values of the subschemas
 * instead of `undefined`.
 *
 * @param schema The schema to get them from.
 *
 * @returns The default values.
 */
declare function getDefaultsAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined> | LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<LooseObjectIssue> | undefined> | LooseTupleSchema<TupleItems, ErrorMessage<LooseTupleIssue> | undefined> | LooseTupleSchemaAsync<TupleItemsAsync, ErrorMessage<LooseTupleIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<StrictObjectIssue> | undefined> | StrictTupleSchema<TupleItems, ErrorMessage<StrictTupleIssue> | undefined> | StrictTupleSchemaAsync<TupleItemsAsync, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchema<TupleItems, ErrorMessage<TupleIssue> | undefined> | TupleSchemaAsync<TupleItemsAsync, ErrorMessage<TupleIssue> | undefined> | TupleWithRestSchema<TupleItems, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined> | TupleWithRestSchemaAsync<TupleItemsAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined>>(schema: TSchema): Promise<InferDefaults<TSchema>>;

/**
 * Schema type.
 */
type Schema$d = BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | SchemaWithPipe<readonly [
    BaseSchema<unknown, unknown, BaseIssue<unknown>>,
    ...(PipeItem<any, unknown, BaseIssue<unknown>> | DescriptionAction<unknown, string>)[]
]> | SchemaWithPipeAsync<readonly [
    (BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>),
    ...(PipeItem<any, unknown, BaseIssue<unknown>> | PipeItemAsync<any, unknown, BaseIssue<unknown>> | DescriptionAction<unknown, string>)[]
]>;
/**
 * Returns the description of the schema.
 *
 * If multiple descriptions are defined, the last one of the highest level is
 * returned. If no description is defined, `undefined` is returned.
 *
 * @param schema The schema to get the description from.
 *
 * @returns The description, if any.
 *
 * @beta
 */
declare function getDescription(schema: Schema$d): string | undefined;

/**
 * Infer fallback type.
 */
type InferFallback<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = TSchema extends SchemaWithFallback<BaseSchema<unknown, unknown, BaseIssue<unknown>>, infer TFallback> | SchemaWithFallbackAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, infer TFallback> ? TFallback extends InferOutput<TSchema> ? TFallback : TFallback extends () => MaybePromise<InferOutput<TSchema>> ? ReturnType<TFallback> : never : undefined;
/**
 * Returns the fallback value of the schema.
 *
 * @param schema The schema to get it from.
 * @param dataset The output dataset if available.
 * @param config The config if available.
 *
 * @returns The fallback value.
 */
declare function getFallback<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema, dataset?: OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>>, config?: Config<InferIssue<TSchema>>): InferFallback<TSchema>;

/**
 * Infer fallbacks type.
 */
type InferFallbacks<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = TSchema extends LooseObjectSchema<infer TEntries, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<infer TEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<infer TEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<infer TEntries, ErrorMessage<StrictObjectIssue> | undefined> ? {
    -readonly [TKey in keyof TEntries]: InferFallbacks<TEntries[TKey]>;
} : TSchema extends LooseObjectSchemaAsync<infer TEntries, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchemaAsync<infer TEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchemaAsync<infer TEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchemaAsync<infer TEntries, ErrorMessage<StrictObjectIssue> | undefined> ? {
    -readonly [TKey in keyof TEntries]: InferFallbacks<TEntries[TKey]>;
} : TSchema extends LooseTupleSchema<infer TItems, ErrorMessage<LooseTupleIssue> | undefined> | StrictTupleSchema<infer TItems, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchema<infer TItems, ErrorMessage<TupleIssue> | undefined> | TupleWithRestSchema<infer TItems, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined> ? {
    -readonly [TKey in keyof TItems]: InferFallbacks<TItems[TKey]>;
} : TSchema extends LooseTupleSchemaAsync<infer TItems, ErrorMessage<LooseTupleIssue> | undefined> | StrictTupleSchemaAsync<infer TItems, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchemaAsync<infer TItems, ErrorMessage<TupleIssue> | undefined> | TupleWithRestSchemaAsync<infer TItems, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined> ? {
    -readonly [TKey in keyof TItems]: InferFallbacks<TItems[TKey]>;
} : Awaited<InferFallback<TSchema>>;

/**
 * Returns the fallback values of the schema.
 *
 * Hint: The difference to `getFallback` is that for object and tuple schemas
 * this function recursively returns the fallback values of the subschemas
 * instead of `undefined`.
 *
 * @param schema The schema to get them from.
 *
 * @returns The fallback values.
 */
declare function getFallbacks<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined> | LooseTupleSchema<TupleItems, ErrorMessage<LooseTupleIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined> | StrictTupleSchema<TupleItems, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchema<TupleItems, ErrorMessage<TupleIssue> | undefined> | TupleWithRestSchema<TupleItems, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined>>(schema: TSchema): InferFallbacks<TSchema>;

/**
 * Returns the fallback values of the schema.
 *
 * Hint: The difference to `getFallback` is that for object and tuple schemas
 * this function recursively returns the fallback values of the subschemas
 * instead of `undefined`.
 *
 * @param schema The schema to get them from.
 *
 * @returns The fallback values.
 */
declare function getFallbacksAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined> | LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<LooseObjectIssue> | undefined> | LooseTupleSchema<TupleItems, ErrorMessage<LooseTupleIssue> | undefined> | LooseTupleSchemaAsync<TupleItemsAsync, ErrorMessage<LooseTupleIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<StrictObjectIssue> | undefined> | StrictTupleSchema<TupleItems, ErrorMessage<StrictTupleIssue> | undefined> | StrictTupleSchemaAsync<TupleItemsAsync, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchema<TupleItems, ErrorMessage<TupleIssue> | undefined> | TupleSchemaAsync<TupleItemsAsync, ErrorMessage<TupleIssue> | undefined> | TupleWithRestSchema<TupleItems, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined> | TupleWithRestSchemaAsync<TupleItemsAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined>>(schema: TSchema): Promise<InferFallbacks<TSchema>>;

/**
 * Schema with pipe type.
 */
type SchemaWithPipe<TPipe extends readonly [
    BaseSchema<unknown, unknown, BaseIssue<unknown>>,
    ...PipeItem<any, unknown, BaseIssue<unknown>>[]
]> = Omit<FirstTupleItem<TPipe>, 'pipe' | '~standard' | '~run' | '~types'> & {
    /**
     * The pipe items.
     */
    readonly pipe: TPipe;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferInput<FirstTupleItem<TPipe>>, InferOutput<LastTupleItem<TPipe>>>;
    /**
     * Parses unknown input values.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<InferOutput<LastTupleItem<TPipe>>, InferIssue<TPipe[number]>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferInput<FirstTupleItem<TPipe>>;
        readonly output: InferOutput<LastTupleItem<TPipe>>;
        readonly issue: InferIssue<TPipe[number]>;
    } | undefined;
};
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>): SchemaWithPipe<readonly [TSchema, TItem1]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>): SchemaWithPipe<readonly [TSchema, TItem1, TItem2]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>): SchemaWithPipe<readonly [TSchema, TItem1, TItem2, TItem3]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>): SchemaWithPipe<readonly [TSchema, TItem1, TItem2, TItem3, TItem4]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>): SchemaWithPipe<readonly [TSchema, TItem1, TItem2, TItem3, TItem4, TItem5]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>): SchemaWithPipe<readonly [TSchema, TItem1, TItem2, TItem3, TItem4, TItem5, TItem6]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>): SchemaWithPipe<readonly [TSchema, TItem1, TItem2, TItem3, TItem4, TItem5, TItem6, TItem7]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>): SchemaWithPipe<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>): SchemaWithPipe<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>): SchemaWithPipe<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>): SchemaWithPipe<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>): SchemaWithPipe<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>): SchemaWithPipe<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>>, const TItem14 extends PipeItem<InferOutput<TItem13>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>, item14: TItem14 | PipeAction<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>>): SchemaWithPipe<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13,
    TItem14
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>>, const TItem14 extends PipeItem<InferOutput<TItem13>, unknown, BaseIssue<unknown>>, const TItem15 extends PipeItem<InferOutput<TItem14>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>, item14: TItem14 | PipeAction<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>>, item15: TItem15 | PipeAction<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>>): SchemaWithPipe<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13,
    TItem14,
    TItem15
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 * @param item16 The sixteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>>, const TItem14 extends PipeItem<InferOutput<TItem13>, unknown, BaseIssue<unknown>>, const TItem15 extends PipeItem<InferOutput<TItem14>, unknown, BaseIssue<unknown>>, const TItem16 extends PipeItem<InferOutput<TItem15>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>, item14: TItem14 | PipeAction<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>>, item15: TItem15 | PipeAction<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>>, item16: TItem16 | PipeAction<InferOutput<TItem15>, InferOutput<TItem16>, InferIssue<TItem16>>): SchemaWithPipe<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13,
    TItem14,
    TItem15,
    TItem16
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 * @param item16 The sixteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>>, const TItem14 extends PipeItem<InferOutput<TItem13>, unknown, BaseIssue<unknown>>, const TItem15 extends PipeItem<InferOutput<TItem14>, unknown, BaseIssue<unknown>>, const TItem16 extends PipeItem<InferOutput<TItem15>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>, item14: TItem14 | PipeAction<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>>, item15: TItem15 | PipeAction<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>>, item16: TItem16 | PipeAction<InferOutput<TItem15>, InferOutput<TItem16>, InferIssue<TItem16>>): SchemaWithPipe<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13,
    TItem14,
    TItem15,
    TItem16
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 * @param item16 The sixteenth pipe item.
 * @param item17 The seventeenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>>, const TItem14 extends PipeItem<InferOutput<TItem13>, unknown, BaseIssue<unknown>>, const TItem15 extends PipeItem<InferOutput<TItem14>, unknown, BaseIssue<unknown>>, const TItem16 extends PipeItem<InferOutput<TItem15>, unknown, BaseIssue<unknown>>, const TItem17 extends PipeItem<InferOutput<TItem16>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>, item14: TItem14 | PipeAction<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>>, item15: TItem15 | PipeAction<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>>, item16: TItem16 | PipeAction<InferOutput<TItem15>, InferOutput<TItem16>, InferIssue<TItem16>>, item17: TItem17 | PipeAction<InferOutput<TItem16>, InferOutput<TItem17>, InferIssue<TItem17>>): SchemaWithPipe<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13,
    TItem14,
    TItem15,
    TItem16,
    TItem17
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 * @param item16 The sixteenth pipe item.
 * @param item17 The seventeenth pipe item.
 * @param item18 The eighteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>>, const TItem14 extends PipeItem<InferOutput<TItem13>, unknown, BaseIssue<unknown>>, const TItem15 extends PipeItem<InferOutput<TItem14>, unknown, BaseIssue<unknown>>, const TItem16 extends PipeItem<InferOutput<TItem15>, unknown, BaseIssue<unknown>>, const TItem17 extends PipeItem<InferOutput<TItem16>, unknown, BaseIssue<unknown>>, const TItem18 extends PipeItem<InferOutput<TItem17>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>, item14: TItem14 | PipeAction<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>>, item15: TItem15 | PipeAction<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>>, item16: TItem16 | PipeAction<InferOutput<TItem15>, InferOutput<TItem16>, InferIssue<TItem16>>, item17: TItem17 | PipeAction<InferOutput<TItem16>, InferOutput<TItem17>, InferIssue<TItem17>>, item18: TItem18 | PipeAction<InferOutput<TItem17>, InferOutput<TItem18>, InferIssue<TItem18>>): SchemaWithPipe<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13,
    TItem14,
    TItem15,
    TItem16,
    TItem17,
    TItem18
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 * @param item16 The sixteenth pipe item.
 * @param item17 The seventeenth pipe item.
 * @param item18 The eighteenth pipe item.
 * @param item19 The nineteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>>, const TItem14 extends PipeItem<InferOutput<TItem13>, unknown, BaseIssue<unknown>>, const TItem15 extends PipeItem<InferOutput<TItem14>, unknown, BaseIssue<unknown>>, const TItem16 extends PipeItem<InferOutput<TItem15>, unknown, BaseIssue<unknown>>, const TItem17 extends PipeItem<InferOutput<TItem16>, unknown, BaseIssue<unknown>>, const TItem18 extends PipeItem<InferOutput<TItem17>, unknown, BaseIssue<unknown>>, const TItem19 extends PipeItem<InferOutput<TItem18>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>, item14: TItem14 | PipeAction<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>>, item15: TItem15 | PipeAction<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>>, item16: TItem16 | PipeAction<InferOutput<TItem15>, InferOutput<TItem16>, InferIssue<TItem16>>, item17: TItem17 | PipeAction<InferOutput<TItem16>, InferOutput<TItem17>, InferIssue<TItem17>>, item18: TItem18 | PipeAction<InferOutput<TItem17>, InferOutput<TItem18>, InferIssue<TItem18>>, item19: TItem19 | PipeAction<InferOutput<TItem18>, InferOutput<TItem19>, InferIssue<TItem19>>): SchemaWithPipe<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13,
    TItem14,
    TItem15,
    TItem16,
    TItem17,
    TItem18,
    TItem19
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param items The pipe items.
 *
 * @returns A schema with a pipeline.
 */
declare function pipe<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TItems extends readonly PipeItem<InferOutput<TSchema>, InferOutput<TSchema>, BaseIssue<unknown>>[]>(schema: TSchema, ...items: TItems): SchemaWithPipe<readonly [TSchema, ...TItems]>;

/**
 * Schema with pipe async type.
 */
type SchemaWithPipeAsync<TPipe extends readonly [
    (BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>),
    ...(PipeItem<any, unknown, BaseIssue<unknown>> | PipeItemAsync<any, unknown, BaseIssue<unknown>>)[]
]> = Omit<FirstTupleItem<TPipe>, 'async' | 'pipe' | '~standard' | '~run' | '~types'> & {
    /**
     * The pipe items.
     */
    readonly pipe: TPipe;
    /**
     * Whether it's async.
     */
    readonly async: true;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferInput<FirstTupleItem<TPipe>>, InferOutput<LastTupleItem<TPipe>>>;
    /**
     * Parses unknown input values.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferOutput<LastTupleItem<TPipe>>, InferIssue<TPipe[number]>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferInput<FirstTupleItem<TPipe>>;
        readonly output: InferOutput<LastTupleItem<TPipe>>;
        readonly issue: InferIssue<TPipe[number]>;
    } | undefined;
};
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>): SchemaWithPipeAsync<readonly [TSchema, TItem1]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>): SchemaWithPipeAsync<readonly [TSchema, TItem1, TItem2]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>): SchemaWithPipeAsync<readonly [TSchema, TItem1, TItem2, TItem3]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>): SchemaWithPipeAsync<readonly [TSchema, TItem1, TItem2, TItem3, TItem4]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>): SchemaWithPipeAsync<readonly [TSchema, TItem1, TItem2, TItem3, TItem4, TItem5]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem5>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>> | PipeActionAsync<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>): SchemaWithPipeAsync<readonly [TSchema, TItem1, TItem2, TItem3, TItem4, TItem5, TItem6]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem6>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>> | PipeActionAsync<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>> | PipeActionAsync<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>): SchemaWithPipeAsync<readonly [TSchema, TItem1, TItem2, TItem3, TItem4, TItem5, TItem6, TItem7]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem7>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>> | PipeActionAsync<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>> | PipeActionAsync<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>> | PipeActionAsync<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>): SchemaWithPipeAsync<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem8>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>> | PipeActionAsync<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>> | PipeActionAsync<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>> | PipeActionAsync<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>> | PipeActionAsync<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>): SchemaWithPipeAsync<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem9>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>> | PipeActionAsync<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>> | PipeActionAsync<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>> | PipeActionAsync<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>> | PipeActionAsync<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>> | PipeActionAsync<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>): SchemaWithPipeAsync<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem10>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>> | PipeActionAsync<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>> | PipeActionAsync<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>> | PipeActionAsync<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>> | PipeActionAsync<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>> | PipeActionAsync<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>> | PipeActionAsync<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>): SchemaWithPipeAsync<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem11>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>> | PipeActionAsync<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>> | PipeActionAsync<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>> | PipeActionAsync<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>> | PipeActionAsync<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>> | PipeActionAsync<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>> | PipeActionAsync<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>> | PipeActionAsync<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>): SchemaWithPipeAsync<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem12>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>> | PipeActionAsync<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>> | PipeActionAsync<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>> | PipeActionAsync<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>> | PipeActionAsync<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>> | PipeActionAsync<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>> | PipeActionAsync<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>> | PipeActionAsync<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>> | PipeActionAsync<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>): SchemaWithPipeAsync<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem12>, unknown, BaseIssue<unknown>>, const TItem14 extends PipeItem<InferOutput<TItem13>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem13>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>> | PipeActionAsync<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>> | PipeActionAsync<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>> | PipeActionAsync<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>> | PipeActionAsync<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>> | PipeActionAsync<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>> | PipeActionAsync<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>> | PipeActionAsync<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>> | PipeActionAsync<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>, item14: TItem14 | PipeAction<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>> | PipeActionAsync<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>>): SchemaWithPipeAsync<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13,
    TItem14
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem12>, unknown, BaseIssue<unknown>>, const TItem14 extends PipeItem<InferOutput<TItem13>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem13>, unknown, BaseIssue<unknown>>, const TItem15 extends PipeItem<InferOutput<TItem14>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem14>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>> | PipeActionAsync<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>> | PipeActionAsync<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>> | PipeActionAsync<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>> | PipeActionAsync<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>> | PipeActionAsync<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>> | PipeActionAsync<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>> | PipeActionAsync<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>> | PipeActionAsync<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>, item14: TItem14 | PipeAction<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>> | PipeActionAsync<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>>, item15: TItem15 | PipeAction<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>> | PipeActionAsync<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>>): SchemaWithPipeAsync<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13,
    TItem14,
    TItem15
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 * @param item16 The sixteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem12>, unknown, BaseIssue<unknown>>, const TItem14 extends PipeItem<InferOutput<TItem13>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem13>, unknown, BaseIssue<unknown>>, const TItem15 extends PipeItem<InferOutput<TItem14>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem14>, unknown, BaseIssue<unknown>>, const TItem16 extends PipeItem<InferOutput<TItem15>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem15>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>> | PipeActionAsync<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>> | PipeActionAsync<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>> | PipeActionAsync<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>> | PipeActionAsync<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>> | PipeActionAsync<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>> | PipeActionAsync<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>> | PipeActionAsync<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>> | PipeActionAsync<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>, item14: TItem14 | PipeAction<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>> | PipeActionAsync<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>>, item15: TItem15 | PipeAction<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>> | PipeActionAsync<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>>, item16: TItem16 | PipeAction<InferOutput<TItem15>, InferOutput<TItem16>, InferIssue<TItem16>> | PipeActionAsync<InferOutput<TItem15>, InferOutput<TItem16>, InferIssue<TItem16>>): SchemaWithPipeAsync<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13,
    TItem14,
    TItem15,
    TItem16
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 * @param item16 The sixteenth pipe item.
 * @param item17 The seventeenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem12>, unknown, BaseIssue<unknown>>, const TItem14 extends PipeItem<InferOutput<TItem13>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem13>, unknown, BaseIssue<unknown>>, const TItem15 extends PipeItem<InferOutput<TItem14>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem14>, unknown, BaseIssue<unknown>>, const TItem16 extends PipeItem<InferOutput<TItem15>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem15>, unknown, BaseIssue<unknown>>, const TItem17 extends PipeItem<InferOutput<TItem16>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem16>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>> | PipeActionAsync<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>> | PipeActionAsync<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>> | PipeActionAsync<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>> | PipeActionAsync<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>> | PipeActionAsync<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>> | PipeActionAsync<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>> | PipeActionAsync<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>> | PipeActionAsync<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>, item14: TItem14 | PipeAction<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>> | PipeActionAsync<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>>, item15: TItem15 | PipeAction<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>> | PipeActionAsync<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>>, item16: TItem16 | PipeAction<InferOutput<TItem15>, InferOutput<TItem16>, InferIssue<TItem16>> | PipeActionAsync<InferOutput<TItem15>, InferOutput<TItem16>, InferIssue<TItem16>>, item17: TItem17 | PipeAction<InferOutput<TItem16>, InferOutput<TItem17>, InferIssue<TItem17>> | PipeActionAsync<InferOutput<TItem16>, InferOutput<TItem17>, InferIssue<TItem17>>): SchemaWithPipeAsync<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13,
    TItem14,
    TItem15,
    TItem16,
    TItem17
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 * @param item16 The sixteenth pipe item.
 * @param item17 The seventeenth pipe item.
 * @param item18 The eighteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem12>, unknown, BaseIssue<unknown>>, const TItem14 extends PipeItem<InferOutput<TItem13>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem13>, unknown, BaseIssue<unknown>>, const TItem15 extends PipeItem<InferOutput<TItem14>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem14>, unknown, BaseIssue<unknown>>, const TItem16 extends PipeItem<InferOutput<TItem15>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem15>, unknown, BaseIssue<unknown>>, const TItem17 extends PipeItem<InferOutput<TItem16>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem16>, unknown, BaseIssue<unknown>>, const TItem18 extends PipeItem<InferOutput<TItem17>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem17>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>> | PipeActionAsync<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>> | PipeActionAsync<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>> | PipeActionAsync<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>> | PipeActionAsync<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>> | PipeActionAsync<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>> | PipeActionAsync<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>> | PipeActionAsync<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>> | PipeActionAsync<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>, item14: TItem14 | PipeAction<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>> | PipeActionAsync<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>>, item15: TItem15 | PipeAction<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>> | PipeActionAsync<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>>, item16: TItem16 | PipeAction<InferOutput<TItem15>, InferOutput<TItem16>, InferIssue<TItem16>> | PipeActionAsync<InferOutput<TItem15>, InferOutput<TItem16>, InferIssue<TItem16>>, item17: TItem17 | PipeAction<InferOutput<TItem16>, InferOutput<TItem17>, InferIssue<TItem17>> | PipeActionAsync<InferOutput<TItem16>, InferOutput<TItem17>, InferIssue<TItem17>>, item18: TItem18 | PipeAction<InferOutput<TItem17>, InferOutput<TItem18>, InferIssue<TItem18>> | PipeActionAsync<InferOutput<TItem17>, InferOutput<TItem18>, InferIssue<TItem18>>): SchemaWithPipeAsync<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13,
    TItem14,
    TItem15,
    TItem16,
    TItem17,
    TItem18
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param item1 The first pipe item.
 * @param item2 The second pipe item.
 * @param item3 The third pipe item.
 * @param item4 The fourth pipe item.
 * @param item5 The fifth pipe item.
 * @param item6 The sixth pipe item.
 * @param item7 The seventh pipe item.
 * @param item8 The eighth pipe item.
 * @param item9 The ninth pipe item.
 * @param item10 The tenth pipe item.
 * @param item11 The eleventh pipe item.
 * @param item12 The twelfth pipe item.
 * @param item13 The thirteenth pipe item.
 * @param item14 The fourteenth pipe item.
 * @param item15 The fifteenth pipe item.
 * @param item16 The sixteenth pipe item.
 * @param item17 The seventeenth pipe item.
 * @param item18 The eighteenth pipe item.
 * @param item19 The nineteenth pipe item.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItem1 extends PipeItem<InferOutput<TSchema>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, unknown, BaseIssue<unknown>>, const TItem2 extends PipeItem<InferOutput<TItem1>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem1>, unknown, BaseIssue<unknown>>, const TItem3 extends PipeItem<InferOutput<TItem2>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem2>, unknown, BaseIssue<unknown>>, const TItem4 extends PipeItem<InferOutput<TItem3>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem3>, unknown, BaseIssue<unknown>>, const TItem5 extends PipeItem<InferOutput<TItem4>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem4>, unknown, BaseIssue<unknown>>, const TItem6 extends PipeItem<InferOutput<TItem5>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem5>, unknown, BaseIssue<unknown>>, const TItem7 extends PipeItem<InferOutput<TItem6>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem6>, unknown, BaseIssue<unknown>>, const TItem8 extends PipeItem<InferOutput<TItem7>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem7>, unknown, BaseIssue<unknown>>, const TItem9 extends PipeItem<InferOutput<TItem8>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem8>, unknown, BaseIssue<unknown>>, const TItem10 extends PipeItem<InferOutput<TItem9>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem9>, unknown, BaseIssue<unknown>>, const TItem11 extends PipeItem<InferOutput<TItem10>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem10>, unknown, BaseIssue<unknown>>, const TItem12 extends PipeItem<InferOutput<TItem11>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem11>, unknown, BaseIssue<unknown>>, const TItem13 extends PipeItem<InferOutput<TItem12>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem12>, unknown, BaseIssue<unknown>>, const TItem14 extends PipeItem<InferOutput<TItem13>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem13>, unknown, BaseIssue<unknown>>, const TItem15 extends PipeItem<InferOutput<TItem14>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem14>, unknown, BaseIssue<unknown>>, const TItem16 extends PipeItem<InferOutput<TItem15>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem15>, unknown, BaseIssue<unknown>>, const TItem17 extends PipeItem<InferOutput<TItem16>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem16>, unknown, BaseIssue<unknown>>, const TItem18 extends PipeItem<InferOutput<TItem17>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem17>, unknown, BaseIssue<unknown>>, const TItem19 extends PipeItem<InferOutput<TItem18>, unknown, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TItem18>, unknown, BaseIssue<unknown>>>(schema: TSchema, item1: TItem1 | PipeAction<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>> | PipeActionAsync<InferOutput<TSchema>, InferOutput<TItem1>, InferIssue<TItem1>>, item2: TItem2 | PipeAction<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>> | PipeActionAsync<InferOutput<TItem1>, InferOutput<TItem2>, InferIssue<TItem2>>, item3: TItem3 | PipeAction<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>> | PipeActionAsync<InferOutput<TItem2>, InferOutput<TItem3>, InferIssue<TItem3>>, item4: TItem4 | PipeAction<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>> | PipeActionAsync<InferOutput<TItem3>, InferOutput<TItem4>, InferIssue<TItem4>>, item5: TItem5 | PipeAction<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>> | PipeActionAsync<InferOutput<TItem4>, InferOutput<TItem5>, InferIssue<TItem5>>, item6: TItem6 | PipeAction<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>> | PipeActionAsync<InferOutput<TItem5>, InferOutput<TItem6>, InferIssue<TItem6>>, item7: TItem7 | PipeAction<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>> | PipeActionAsync<InferOutput<TItem6>, InferOutput<TItem7>, InferIssue<TItem7>>, item8: TItem8 | PipeAction<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>> | PipeActionAsync<InferOutput<TItem7>, InferOutput<TItem8>, InferIssue<TItem8>>, item9: TItem9 | PipeAction<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>> | PipeActionAsync<InferOutput<TItem8>, InferOutput<TItem9>, InferIssue<TItem9>>, item10: TItem10 | PipeAction<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>> | PipeActionAsync<InferOutput<TItem9>, InferOutput<TItem10>, InferIssue<TItem10>>, item11: TItem11 | PipeAction<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>> | PipeActionAsync<InferOutput<TItem10>, InferOutput<TItem11>, InferIssue<TItem11>>, item12: TItem12 | PipeAction<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>> | PipeActionAsync<InferOutput<TItem11>, InferOutput<TItem12>, InferIssue<TItem12>>, item13: TItem13 | PipeAction<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>> | PipeActionAsync<InferOutput<TItem12>, InferOutput<TItem13>, InferIssue<TItem13>>, item14: TItem14 | PipeAction<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>> | PipeActionAsync<InferOutput<TItem13>, InferOutput<TItem14>, InferIssue<TItem14>>, item15: TItem15 | PipeAction<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>> | PipeActionAsync<InferOutput<TItem14>, InferOutput<TItem15>, InferIssue<TItem15>>, item16: TItem16 | PipeAction<InferOutput<TItem15>, InferOutput<TItem16>, InferIssue<TItem16>> | PipeActionAsync<InferOutput<TItem15>, InferOutput<TItem16>, InferIssue<TItem16>>, item17: TItem17 | PipeAction<InferOutput<TItem16>, InferOutput<TItem17>, InferIssue<TItem17>> | PipeActionAsync<InferOutput<TItem16>, InferOutput<TItem17>, InferIssue<TItem17>>, item18: TItem18 | PipeAction<InferOutput<TItem17>, InferOutput<TItem18>, InferIssue<TItem18>> | PipeActionAsync<InferOutput<TItem17>, InferOutput<TItem18>, InferIssue<TItem18>>, item19: TItem19 | PipeAction<InferOutput<TItem18>, InferOutput<TItem19>, InferIssue<TItem19>> | PipeActionAsync<InferOutput<TItem18>, InferOutput<TItem19>, InferIssue<TItem19>>): SchemaWithPipeAsync<readonly [
    TSchema,
    TItem1,
    TItem2,
    TItem3,
    TItem4,
    TItem5,
    TItem6,
    TItem7,
    TItem8,
    TItem9,
    TItem10,
    TItem11,
    TItem12,
    TItem13,
    TItem14,
    TItem15,
    TItem16,
    TItem17,
    TItem18,
    TItem19
]>;
/**
 * Adds a pipeline to a schema, that can validate and transform its input.
 *
 * @param schema The root schema.
 * @param items The pipe items.
 *
 * @returns A schema with a pipeline.
 */
declare function pipeAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TItems extends readonly (PipeItem<InferOutput<TSchema>, InferOutput<TSchema>, BaseIssue<unknown>> | PipeItemAsync<InferOutput<TSchema>, InferOutput<TSchema>, BaseIssue<unknown>>)[]>(schema: TSchema, ...items: TItems): SchemaWithPipeAsync<readonly [TSchema, ...TItems]>;

/**
 * Schema type.
 */
type Schema$c = BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | SchemaWithPipe<readonly [
    BaseSchema<unknown, unknown, BaseIssue<unknown>>,
    ...(PipeItem<any, unknown, BaseIssue<unknown>> | MetadataAction$1<unknown, Record<string, unknown>>)[]
]> | SchemaWithPipeAsync<readonly [
    (BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>),
    ...(PipeItem<any, unknown, BaseIssue<unknown>> | PipeItemAsync<any, unknown, BaseIssue<unknown>> | MetadataAction$1<unknown, Record<string, unknown>>)[]
]>;
/**
 * Basic pipe item type.
 */
type BasicPipeItem = PipeItem<any, unknown, BaseIssue<unknown>> | PipeItemAsync<any, unknown, BaseIssue<unknown>> | MetadataAction$1<unknown, Record<string, unknown>>;
/**
 * Recursive merge type.
 */
type RecursiveMerge$1<TRootPipe extends readonly BasicPipeItem[], TCollectedMetadata extends Record<string, unknown> = {}> = TRootPipe extends readonly [
    infer TFirstItem,
    ...infer TPipeRest extends readonly BasicPipeItem[]
] ? TFirstItem extends SchemaWithPipe<infer TNestedPipe> | SchemaWithPipeAsync<infer TNestedPipe> ? RecursiveMerge$1<TPipeRest, RecursiveMerge$1<TNestedPipe, TCollectedMetadata>> : TFirstItem extends MetadataAction$1<unknown, infer TCurrentMetadata> ? RecursiveMerge$1<TPipeRest, Merge<TCollectedMetadata, TCurrentMetadata>> : RecursiveMerge$1<TPipeRest, TCollectedMetadata> : TCollectedMetadata;
/**
 * Infer metadata type.
 *
 * @beta
 */
type InferMetadata<TSchema extends Schema$c> = BaseSchema<any, any, any> extends TSchema ? Record<string, unknown> : BaseSchemaAsync<any, any, any> extends TSchema ? Record<string, unknown> : TSchema extends SchemaWithPipe<infer TPipe> | SchemaWithPipeAsync<infer TPipe> ? Prettify<RecursiveMerge$1<TPipe>> : {};
/**
 * Returns the metadata of a schema.
 *
 * If multiple metadata are defined, it shallowly merges them using depth-first
 * search. If no metadata is defined, an empty object is returned.
 *
 * @param schema Schema to get the metadata from.
 *
 * @returns The metadata, if any.
 *
 * @beta
 */
declare function getMetadata<const TSchema extends Schema$c>(schema: TSchema): InferMetadata<TSchema>;

/**
 * Title action interface.
 */
interface TitleAction<TInput, TTitle extends string> extends BaseMetadata<TInput> {
    /**
     * The action type.
     */
    readonly type: 'title';
    /**
     * The action reference.
     */
    readonly reference: typeof title;
    /**
     * The title text.
     */
    readonly title: TTitle;
}
/**
 * Creates a title metadata action.
 *
 * @param title_ The title text.
 *
 * @returns A title action.
 */
declare function title<TInput, TTitle extends string>(title_: TTitle): TitleAction<TInput, TTitle>;

/**
 * Schema type.
 */
type Schema$b = BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | SchemaWithPipe<readonly [
    BaseSchema<unknown, unknown, BaseIssue<unknown>>,
    ...(PipeItem<any, unknown, BaseIssue<unknown>> | TitleAction<unknown, string>)[]
]> | SchemaWithPipeAsync<readonly [
    (BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>),
    ...(PipeItem<any, unknown, BaseIssue<unknown>> | PipeItemAsync<any, unknown, BaseIssue<unknown>> | TitleAction<unknown, string>)[]
]>;
/**
 * Returns the title of the schema.
 *
 * If multiple titles are defined, the last one of the highest level is
 * returned. If no title is defined, `undefined` is returned.
 *
 * @param schema The schema to get the title from.
 *
 * @returns The title, if any.
 *
 * @beta
 */
declare function getTitle(schema: Schema$b): string | undefined;

/**
 * Checks if the input matches the schema. By using a type predicate, this
 * function can be used as a type guard.
 *
 * @param schema The schema to be used.
 * @param input The input to be tested.
 *
 * @returns Whether the input matches the schema.
 */
declare function is<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema, input: unknown): input is InferInput<TSchema>;

/**
 * Schema type.
 */
type Schema$a = LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined> | LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<StrictObjectIssue> | undefined>;
/**
 * Force tuple type.
 */
type ForceTuple<T> = T extends [string, ...string[]] ? T : [];
/**
 * Object keys type.
 */
type ObjectKeys$1<TSchema extends Schema$a> = ForceTuple<UnionToTuple<keyof TSchema['entries']>>;
/**
 * Creates a picklist schema of object keys.
 *
 * @param schema The object schema.
 *
 * @returns A picklist schema.
 */
declare function keyof<const TSchema extends Schema$a>(schema: TSchema): PicklistSchema<ObjectKeys$1<TSchema>, undefined>;
/**
 * Creates a picklist schema of object keys.
 *
 * @param schema The object schema.
 * @param message The error message.
 *
 * @returns A picklist schema.
 */
declare function keyof<const TSchema extends Schema$a, const TMessage extends ErrorMessage<PicklistIssue> | undefined>(schema: TSchema, message: TMessage): PicklistSchema<ObjectKeys$1<TSchema>, TMessage>;

/**
 * Changes the local message configuration of a schema.
 *
 * @param schema The schema to configure.
 * @param message_ The error message.
 *
 * @returns The configured schema.
 */
declare function message<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema, message_: ErrorMessage<InferIssue<TSchema>>): TSchema;

/**
 * Schema type.
 */
type Schema$9 = SchemaWithoutPipe<LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined> | LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<StrictObjectIssue> | undefined>>;
/**
 * Schema with omit type.
 */
type SchemaWithOmit<TSchema extends Schema$9, TKeys extends ObjectKeys<TSchema>> = TSchema extends ObjectSchema<infer TEntries, ErrorMessage<ObjectIssue> | undefined> | StrictObjectSchema<infer TEntries, ErrorMessage<StrictObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: Omit<TEntries, TKeys[number]>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<Omit<TEntries, TKeys[number]>>, InferObjectOutput<Omit<TEntries, TKeys[number]>>>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<InferObjectOutput<Omit<TEntries, TKeys[number]>>, Extract<InferIssue<TSchema>, {
        type: TSchema['type'];
    }> | InferObjectIssue<Omit<TEntries, TKeys[number]>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<Omit<TEntries, TKeys[number]>>;
        readonly output: InferObjectOutput<Omit<TEntries, TKeys[number]>>;
        readonly issue: Extract<InferIssue<TSchema>, {
            type: TSchema['type'];
        }> | InferObjectIssue<Omit<TEntries, TKeys[number]>>;
    } | undefined;
} : TSchema extends ObjectSchemaAsync<infer TEntries, ErrorMessage<ObjectIssue> | undefined> | StrictObjectSchemaAsync<infer TEntries, ErrorMessage<StrictObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: Omit<TEntries, TKeys[number]>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<Omit<TEntries, TKeys[number]>>, InferObjectOutput<Omit<TEntries, TKeys[number]>>>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferObjectOutput<Omit<TEntries, TKeys[number]>>, Extract<InferIssue<TSchema>, {
        type: TSchema['type'];
    }> | InferObjectIssue<Omit<TEntries, TKeys[number]>>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<Omit<TEntries, TKeys[number]>>;
        readonly output: InferObjectOutput<Omit<TEntries, TKeys[number]>>;
        readonly issue: Extract<InferIssue<TSchema>, {
            type: TSchema['type'];
        }> | InferObjectIssue<Omit<TEntries, TKeys[number]>>;
    } | undefined;
} : TSchema extends LooseObjectSchema<infer TEntries, ErrorMessage<LooseObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: Omit<TEntries, TKeys[number]>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<Omit<TEntries, TKeys[number]>> & {
        [key: string]: unknown;
    }, InferObjectInput<Omit<TEntries, TKeys[number]>> & {
        [key: string]: unknown;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
        [key: string]: unknown;
    }, Extract<InferIssue<TSchema>, {
        type: TSchema['type'];
    }> | InferObjectIssue<Omit<TEntries, TKeys[number]>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<Omit<TEntries, TKeys[number]>> & {
            [key: string]: unknown;
        };
        readonly output: InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
            [key: string]: unknown;
        };
        readonly issue: Extract<InferIssue<TSchema>, {
            type: TSchema['type'];
        }> | InferObjectIssue<Omit<TEntries, TKeys[number]>>;
    } | undefined;
} : TSchema extends LooseObjectSchemaAsync<infer TEntries, ErrorMessage<LooseObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: Omit<TEntries, TKeys[number]>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<Omit<TEntries, TKeys[number]>> & {
        [key: string]: unknown;
    }, InferObjectInput<Omit<TEntries, TKeys[number]>> & {
        [key: string]: unknown;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
        [key: string]: unknown;
    }, Extract<InferIssue<TSchema>, {
        type: TSchema['type'];
    }> | InferObjectIssue<Omit<TEntries, TKeys[number]>>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<Omit<TEntries, TKeys[number]>> & {
            [key: string]: unknown;
        };
        readonly output: InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
            [key: string]: unknown;
        };
        readonly issue: Extract<InferIssue<TSchema>, {
            type: TSchema['type'];
        }> | InferObjectIssue<Omit<TEntries, TKeys[number]>>;
    } | undefined;
} : TSchema extends ObjectWithRestSchema<infer TEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: Omit<TEntries, TKeys[number]>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<Omit<TEntries, TKeys[number]>> & {
        [key: string]: InferInput<TSchema['rest']>;
    }, InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
        [key: string]: InferOutput<TSchema['rest']>;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
        [key: string]: InferOutput<TSchema['rest']>;
    }, Extract<InferIssue<TSchema>, {
        type: TSchema['type'];
    }> | InferObjectIssue<Omit<TEntries, TKeys[number]>> | InferIssue<TSchema['rest']>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<Omit<TEntries, TKeys[number]>> & {
            [key: string]: InferInput<TSchema['rest']>;
        };
        readonly output: InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
            [key: string]: InferOutput<TSchema['rest']>;
        };
        readonly issue: Extract<InferIssue<TSchema>, {
            type: TSchema['type'];
        }> | InferObjectIssue<Omit<TEntries, TKeys[number]>> | InferIssue<TSchema['rest']>;
    } | undefined;
} : TSchema extends ObjectWithRestSchemaAsync<infer TEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: Omit<TEntries, TKeys[number]>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<Omit<TEntries, TKeys[number]>> & {
        [key: string]: InferInput<TSchema['rest']>;
    }, InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
        [key: string]: InferOutput<TSchema['rest']>;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
        [key: string]: InferOutput<TSchema['rest']>;
    }, Extract<InferIssue<TSchema>, {
        type: TSchema['type'];
    }> | InferObjectIssue<Omit<TEntries, TKeys[number]>> | InferIssue<TSchema['rest']>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<Omit<TEntries, TKeys[number]>> & {
            [key: string]: InferInput<TSchema['rest']>;
        };
        readonly output: InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
            [key: string]: InferOutput<TSchema['rest']>;
        };
        readonly issue: Extract<InferIssue<TSchema>, {
            type: TSchema['type'];
        }> | InferObjectIssue<Omit<TEntries, TKeys[number]>> | InferIssue<TSchema['rest']>;
    } | undefined;
} : never;
/**
 * Creates a modified copy of an object schema that does not contain the
 * selected entries.
 *
 * @param schema The schema to omit from.
 * @param keys The selected entries.
 *
 * @returns An object schema.
 */
declare function omit<const TSchema extends Schema$9, const TKeys extends ObjectKeys<TSchema>>(schema: TSchema, keys: TKeys): SchemaWithOmit<TSchema, TKeys>;

/**
 * Parses an unknown input based on a schema.
 *
 * @param schema The schema to be used.
 * @param input The input to be parsed.
 * @param config The parse configuration.
 *
 * @returns The parsed input.
 */
declare function parse<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema, input: unknown, config?: Config<InferIssue<TSchema>>): InferOutput<TSchema>;

/**
 * Parses an unknown input based on a schema.
 *
 * @param schema The schema to be used.
 * @param input The input to be parsed.
 * @param config The parse configuration.
 *
 * @returns The parsed input.
 */
declare function parseAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema, input: unknown, config?: Config<InferIssue<TSchema>>): Promise<InferOutput<TSchema>>;

/**
 * The parser interface.
 */
interface Parser<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TConfig extends Config<InferIssue<TSchema>> | undefined> {
    /**
     * Parses an unknown input based on the schema.
     */
    (input: unknown): InferOutput<TSchema>;
    /**
     * The schema to be used.
     */
    readonly schema: TSchema;
    /**
     * The parser configuration.
     */
    readonly config: TConfig;
}
/**
 * Returns a function that parses an unknown input based on a schema.
 *
 * @param schema The schema to be used.
 *
 * @returns The parser function.
 */
declare function parser<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema): Parser<TSchema, undefined>;
/**
 * Returns a function that parses an unknown input based on a schema.
 *
 * @param schema The schema to be used.
 * @param config The parser configuration.
 *
 * @returns The parser function.
 */
declare function parser<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TConfig extends Config<InferIssue<TSchema>> | undefined>(schema: TSchema, config: TConfig): Parser<TSchema, TConfig>;

/**
 * The parser async interface.
 */
interface ParserAsync<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TConfig extends Config<InferIssue<TSchema>> | undefined> {
    /**
     * Parses an unknown input based on the schema.
     */
    (input: unknown): Promise<InferOutput<TSchema>>;
    /**
     * The schema to be used.
     */
    readonly schema: TSchema;
    /**
     * The parser configuration.
     */
    readonly config: TConfig;
}
/**
 * Returns a function that parses an unknown input based on a schema.
 *
 * @param schema The schema to be used.
 *
 * @returns The parser function.
 */
declare function parserAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema): ParserAsync<TSchema, undefined>;
/**
 * Returns a function that parses an unknown input based on a schema.
 *
 * @param schema The schema to be used.
 * @param config The parser configuration.
 *
 * @returns The parser function.
 */
declare function parserAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TConfig extends Config<InferIssue<TSchema>> | undefined>(schema: TSchema, config: TConfig): ParserAsync<TSchema, TConfig>;

/**
 * Schema type.
 */
type Schema$8 = SchemaWithoutPipe<LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined>>;
/**
 * Partial entries type.
 */
type PartialEntries$1<TEntries extends ObjectEntries, TKeys extends readonly (keyof TEntries)[] | undefined> = {
    [TKey in keyof TEntries]: TKeys extends readonly (keyof TEntries)[] ? TKey extends TKeys[number] ? OptionalSchema<TEntries[TKey], undefined> : TEntries[TKey] : OptionalSchema<TEntries[TKey], undefined>;
};
/**
 * Schema with partial type.
 */
type SchemaWithPartial<TSchema extends Schema$8, TKeys extends ObjectKeys<TSchema> | undefined> = TSchema extends ObjectSchema<infer TEntries, ErrorMessage<ObjectIssue> | undefined> | StrictObjectSchema<infer TEntries, ErrorMessage<StrictObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: PartialEntries$1<TEntries, TKeys>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<PartialEntries$1<TEntries, TKeys>>, InferObjectOutput<PartialEntries$1<TEntries, TKeys>>>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<InferObjectOutput<PartialEntries$1<TEntries, TKeys>>, InferIssue<TSchema>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<PartialEntries$1<TEntries, TKeys>>;
        readonly output: InferObjectOutput<PartialEntries$1<TEntries, TKeys>>;
        readonly issue: InferIssue<TSchema>;
    } | undefined;
} : TSchema extends LooseObjectSchema<infer TEntries, ErrorMessage<LooseObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: PartialEntries$1<TEntries, TKeys>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<PartialEntries$1<TEntries, TKeys>> & {
        [key: string]: unknown;
    }, InferObjectOutput<PartialEntries$1<TEntries, TKeys>> & {
        [key: string]: unknown;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<InferObjectOutput<PartialEntries$1<TEntries, TKeys>> & {
        [key: string]: unknown;
    }, InferIssue<TSchema>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<PartialEntries$1<TEntries, TKeys>> & {
            [key: string]: unknown;
        };
        readonly output: InferObjectOutput<PartialEntries$1<TEntries, TKeys>> & {
            [key: string]: unknown;
        };
        readonly issue: InferIssue<TSchema>;
    } | undefined;
} : TSchema extends ObjectWithRestSchema<infer TEntries, infer TRest, ErrorMessage<ObjectWithRestIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: PartialEntries$1<TEntries, TKeys>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<PartialEntries$1<TEntries, TKeys>> & {
        [key: string]: InferInput<TRest>;
    }, InferObjectOutput<PartialEntries$1<TEntries, TKeys>> & {
        [key: string]: InferOutput<TRest>;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<InferObjectOutput<PartialEntries$1<TEntries, TKeys>> & {
        [key: string]: InferOutput<TRest>;
    }, InferIssue<TSchema>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<PartialEntries$1<TEntries, TKeys>> & {
            [key: string]: InferInput<TRest>;
        };
        readonly output: InferObjectOutput<PartialEntries$1<TEntries, TKeys>> & {
            [key: string]: InferOutput<TRest>;
        };
        readonly issue: InferIssue<TSchema>;
    } | undefined;
} : never;
/**
 * Creates a modified copy of an object schema that marks all entries as optional.
 *
 * @param schema The schema to modify.
 *
 * @returns An object schema.
 */
declare function partial<const TSchema extends Schema$8>(schema: TSchema): SchemaWithPartial<TSchema, undefined>;
/**
 * Creates a modified copy of an object schema that marks the selected entries
 * as optional.
 *
 * @param schema The schema to modify.
 * @param keys The selected entries.
 *
 * @returns An object schema.
 */
declare function partial<const TSchema extends Schema$8, const TKeys extends ObjectKeys<TSchema>>(schema: TSchema, keys: TKeys): SchemaWithPartial<TSchema, TKeys>;

/**
 * Schema type.
 */
type Schema$7 = SchemaWithoutPipe<LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<StrictObjectIssue> | undefined>>;
/**
 * Partial entries type.
 */
type PartialEntries<TEntries extends ObjectEntriesAsync, TKeys extends readonly (keyof TEntries)[] | undefined> = {
    [TKey in keyof TEntries]: TKeys extends readonly (keyof TEntries)[] ? TKey extends TKeys[number] ? OptionalSchemaAsync<TEntries[TKey], undefined> : TEntries[TKey] : OptionalSchemaAsync<TEntries[TKey], undefined>;
};
/**
 * Schema with partial type.
 */
type SchemaWithPartialAsync<TSchema extends Schema$7, TKeys extends ObjectKeys<TSchema> | undefined> = TSchema extends ObjectSchemaAsync<infer TEntries, ErrorMessage<ObjectIssue> | undefined> | StrictObjectSchemaAsync<infer TEntries, ErrorMessage<StrictObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: PartialEntries<TEntries, TKeys>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<PartialEntries<TEntries, TKeys>>, InferObjectOutput<PartialEntries<TEntries, TKeys>>>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferObjectOutput<PartialEntries<TEntries, TKeys>>, InferIssue<TSchema>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<PartialEntries<TEntries, TKeys>>;
        readonly output: InferObjectOutput<PartialEntries<TEntries, TKeys>>;
        readonly issue: InferIssue<TSchema>;
    } | undefined;
} : TSchema extends LooseObjectSchemaAsync<infer TEntries, ErrorMessage<LooseObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: PartialEntries<TEntries, TKeys>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<PartialEntries<TEntries, TKeys>> & {
        [key: string]: unknown;
    }, InferObjectOutput<PartialEntries<TEntries, TKeys>> & {
        [key: string]: unknown;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferObjectOutput<PartialEntries<TEntries, TKeys>> & {
        [key: string]: unknown;
    }, InferIssue<TSchema>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<PartialEntries<TEntries, TKeys>> & {
            [key: string]: unknown;
        };
        readonly output: InferObjectOutput<PartialEntries<TEntries, TKeys>> & {
            [key: string]: unknown;
        };
        readonly issue: InferIssue<TSchema>;
    } | undefined;
} : TSchema extends ObjectWithRestSchemaAsync<infer TEntries, infer TRest, ErrorMessage<ObjectWithRestIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: PartialEntries<TEntries, TKeys>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<PartialEntries<TEntries, TKeys>> & {
        [key: string]: InferInput<TRest>;
    }, InferObjectOutput<PartialEntries<TEntries, TKeys>> & {
        [key: string]: InferOutput<TRest>;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferObjectOutput<PartialEntries<TEntries, TKeys>> & {
        [key: string]: InferOutput<TRest>;
    }, InferIssue<TSchema>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<PartialEntries<TEntries, TKeys>> & {
            [key: string]: InferInput<TRest>;
        };
        readonly output: InferObjectOutput<PartialEntries<TEntries, TKeys>> & {
            [key: string]: InferOutput<TRest>;
        };
        readonly issue: InferIssue<TSchema>;
    } | undefined;
} : never;
/**
 * Creates a modified copy of an object schema that marks all entries as optional.
 *
 * @param schema The schema to modify.
 *
 * @returns An object schema.
 */
declare function partialAsync<const TSchema extends Schema$7>(schema: TSchema): SchemaWithPartialAsync<TSchema, undefined>;
/**
 * Creates a modified copy of an object schema that marks the selected entries
 * as optional.
 *
 * @param schema The schema to modify.
 * @param keys The selected entries.
 *
 * @returns An object schema.
 */
declare function partialAsync<const TSchema extends Schema$7, const TKeys extends ObjectKeys<TSchema>>(schema: TSchema, keys: TKeys): SchemaWithPartialAsync<TSchema, TKeys>;

/**
 * The schema type.
 */
type Schema$6 = SchemaWithoutPipe<LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined> | LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<StrictObjectIssue> | undefined>>;
/**
 * Schema with pick type.
 */
type SchemaWithPick<TSchema extends Schema$6, TKeys extends ObjectKeys<TSchema>> = TSchema extends ObjectSchema<infer TEntries, ErrorMessage<ObjectIssue> | undefined> | StrictObjectSchema<infer TEntries, ErrorMessage<StrictObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: Pick<TEntries, TKeys[number]>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<Pick<TEntries, TKeys[number]>>, InferObjectOutput<Pick<TEntries, TKeys[number]>>>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<InferObjectOutput<Pick<TEntries, TKeys[number]>>, Extract<InferIssue<TSchema>, {
        type: TSchema['type'];
    }> | InferObjectIssue<Pick<TEntries, TKeys[number]>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<Pick<TEntries, TKeys[number]>>;
        readonly output: InferObjectOutput<Pick<TEntries, TKeys[number]>>;
        readonly issue: Extract<InferIssue<TSchema>, {
            type: TSchema['type'];
        }> | InferObjectIssue<Pick<TEntries, TKeys[number]>>;
    } | undefined;
} : TSchema extends ObjectSchemaAsync<infer TEntries, ErrorMessage<ObjectIssue> | undefined> | StrictObjectSchemaAsync<infer TEntries, ErrorMessage<StrictObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: Pick<TEntries, TKeys[number]>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<Pick<TEntries, TKeys[number]>>, InferObjectOutput<Pick<TEntries, TKeys[number]>>>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferObjectOutput<Pick<TEntries, TKeys[number]>>, Extract<InferIssue<TSchema>, {
        type: TSchema['type'];
    }> | InferObjectIssue<Pick<TEntries, TKeys[number]>>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<Pick<TEntries, TKeys[number]>>;
        readonly output: InferObjectOutput<Pick<TEntries, TKeys[number]>>;
        readonly issue: Extract<InferIssue<TSchema>, {
            type: TSchema['type'];
        }> | InferObjectIssue<Pick<TEntries, TKeys[number]>>;
    } | undefined;
} : TSchema extends LooseObjectSchema<infer TEntries, ErrorMessage<LooseObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: Pick<TEntries, TKeys[number]>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<Pick<TEntries, TKeys[number]>> & {
        [key: string]: unknown;
    }, InferObjectOutput<Pick<TEntries, TKeys[number]>> & {
        [key: string]: unknown;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<InferObjectOutput<Pick<TEntries, TKeys[number]>> & {
        [key: string]: unknown;
    }, Extract<InferIssue<TSchema>, {
        type: TSchema['type'];
    }> | InferObjectIssue<Pick<TEntries, TKeys[number]>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<Pick<TEntries, TKeys[number]>> & {
            [key: string]: unknown;
        };
        readonly output: InferObjectOutput<Pick<TEntries, TKeys[number]>> & {
            [key: string]: unknown;
        };
        readonly issue: Extract<InferIssue<TSchema>, {
            type: TSchema['type'];
        }> | InferObjectIssue<Pick<TEntries, TKeys[number]>>;
    } | undefined;
} : TSchema extends LooseObjectSchemaAsync<infer TEntries, ErrorMessage<LooseObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: Pick<TEntries, TKeys[number]>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<Pick<TEntries, TKeys[number]>> & {
        [key: string]: unknown;
    }, InferObjectOutput<Pick<TEntries, TKeys[number]>> & {
        [key: string]: unknown;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferObjectOutput<Pick<TEntries, TKeys[number]>> & {
        [key: string]: unknown;
    }, Extract<InferIssue<TSchema>, {
        type: TSchema['type'];
    }> | InferObjectIssue<Pick<TEntries, TKeys[number]>>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<Pick<TEntries, TKeys[number]>> & {
            [key: string]: unknown;
        };
        readonly output: InferObjectOutput<Pick<TEntries, TKeys[number]>> & {
            [key: string]: unknown;
        };
        readonly issue: Extract<InferIssue<TSchema>, {
            type: TSchema['type'];
        }> | InferObjectIssue<Pick<TEntries, TKeys[number]>>;
    } | undefined;
} : TSchema extends ObjectWithRestSchema<infer TEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: Pick<TEntries, TKeys[number]>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<Pick<TEntries, TKeys[number]>> & {
        [key: string]: InferInput<TSchema['rest']>;
    }, InferObjectOutput<Pick<TEntries, TKeys[number]>> & {
        [key: string]: InferOutput<TSchema['rest']>;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<InferObjectOutput<Pick<TEntries, TKeys[number]>> & {
        [key: string]: InferOutput<TSchema['rest']>;
    }, Extract<InferIssue<TSchema>, {
        type: TSchema['type'];
    }> | InferObjectIssue<Pick<TEntries, TKeys[number]>> | InferIssue<TSchema['rest']>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<Pick<TEntries, TKeys[number]>> & {
            [key: string]: InferInput<TSchema['rest']>;
        };
        readonly output: InferObjectOutput<Pick<TEntries, TKeys[number]>> & {
            [key: string]: InferOutput<TSchema['rest']>;
        };
        readonly issue: Extract<InferIssue<TSchema>, {
            type: TSchema['type'];
        }> | InferObjectIssue<Pick<TEntries, TKeys[number]>> | InferIssue<TSchema['rest']>;
    } | undefined;
} : TSchema extends ObjectWithRestSchemaAsync<infer TEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: Pick<TEntries, TKeys[number]>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<Pick<TEntries, TKeys[number]>> & {
        [key: string]: InferInput<TSchema['rest']>;
    }, InferObjectOutput<Pick<TEntries, TKeys[number]>> & {
        [key: string]: InferOutput<TSchema['rest']>;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferObjectOutput<Pick<TEntries, TKeys[number]>> & {
        [key: string]: InferOutput<TSchema['rest']>;
    }, Extract<InferIssue<TSchema>, {
        type: TSchema['type'];
    }> | InferObjectIssue<Pick<TEntries, TKeys[number]>> | InferIssue<TSchema['rest']>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<Pick<TEntries, TKeys[number]>> & {
            [key: string]: InferInput<TSchema['rest']>;
        };
        readonly output: InferObjectOutput<Pick<TEntries, TKeys[number]>> & {
            [key: string]: InferOutput<TSchema['rest']>;
        };
        readonly issue: Extract<InferIssue<TSchema>, {
            type: TSchema['type'];
        }> | InferObjectIssue<Pick<TEntries, TKeys[number]>> | InferIssue<TSchema['rest']>;
    } | undefined;
} : never;
/**
 * Creates a modified copy of an object schema that contains only the selected
 * entries.
 *
 * @param schema The schema to pick from.
 * @param keys The selected entries.
 *
 * @returns An object schema.
 */
declare function pick<const TSchema extends Schema$6, const TKeys extends ObjectKeys<TSchema>>(schema: TSchema, keys: TKeys): SchemaWithPick<TSchema, TKeys>;

/**
 * Schema type.
 */
type Schema$5 = SchemaWithoutPipe<LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined>>;
/**
 * Required entries type.
 */
type RequiredEntries$1<TEntries extends ObjectEntries, TKeys extends readonly (keyof TEntries)[] | undefined, TMessage extends ErrorMessage<NonOptionalIssue> | undefined> = {
    [TKey in keyof TEntries]: TKeys extends readonly (keyof TEntries)[] ? TKey extends TKeys[number] ? NonOptionalSchema<TEntries[TKey], TMessage> : TEntries[TKey] : NonOptionalSchema<TEntries[TKey], TMessage>;
};
/**
 * Schema with required type.
 */
type SchemaWithRequired<TSchema extends Schema$5, TKeys extends ObjectKeys<TSchema> | undefined, TMessage extends ErrorMessage<NonOptionalIssue> | undefined> = TSchema extends ObjectSchema<infer TEntries, ErrorMessage<ObjectIssue> | undefined> | StrictObjectSchema<infer TEntries, ErrorMessage<StrictObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: RequiredEntries$1<TEntries, TKeys, TMessage>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<RequiredEntries$1<TEntries, TKeys, TMessage>>, InferObjectOutput<RequiredEntries$1<TEntries, TKeys, TMessage>>>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<InferObjectOutput<RequiredEntries$1<TEntries, TKeys, TMessage>>, NonOptionalIssue | InferIssue<TSchema>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<RequiredEntries$1<TEntries, TKeys, TMessage>>;
        readonly output: InferObjectOutput<RequiredEntries$1<TEntries, TKeys, TMessage>>;
        readonly issue: NonOptionalIssue | InferIssue<TSchema>;
    } | undefined;
} : TSchema extends LooseObjectSchema<infer TEntries, ErrorMessage<LooseObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: RequiredEntries$1<TEntries, TKeys, TMessage>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<RequiredEntries$1<TEntries, TKeys, TMessage>> & {
        [key: string]: unknown;
    }, InferObjectOutput<RequiredEntries$1<TEntries, TKeys, TMessage>> & {
        [key: string]: unknown;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<InferObjectOutput<RequiredEntries$1<TEntries, TKeys, TMessage>> & {
        [key: string]: unknown;
    }, NonOptionalIssue | InferIssue<TSchema>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<RequiredEntries$1<TEntries, TKeys, TMessage>> & {
            [key: string]: unknown;
        };
        readonly output: InferObjectOutput<RequiredEntries$1<TEntries, TKeys, TMessage>> & {
            [key: string]: unknown;
        };
        readonly issue: NonOptionalIssue | InferIssue<TSchema>;
    } | undefined;
} : TSchema extends ObjectWithRestSchema<infer TEntries, infer TRest, ErrorMessage<ObjectWithRestIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: RequiredEntries$1<TEntries, TKeys, TMessage>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<RequiredEntries$1<TEntries, TKeys, TMessage>> & {
        [key: string]: InferInput<TRest>;
    }, InferObjectOutput<RequiredEntries$1<TEntries, TKeys, TMessage>> & {
        [key: string]: InferOutput<TRest>;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<InferObjectOutput<RequiredEntries$1<TEntries, TKeys, TMessage>> & {
        [key: string]: InferOutput<TRest>;
    }, NonOptionalIssue | InferIssue<TSchema>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<RequiredEntries$1<TEntries, TKeys, TMessage>> & {
            [key: string]: InferInput<TRest>;
        };
        readonly output: InferObjectOutput<RequiredEntries$1<TEntries, TKeys, TMessage>> & {
            [key: string]: InferOutput<TRest>;
        };
        readonly issue: NonOptionalIssue | InferIssue<TSchema>;
    } | undefined;
} : never;
/**
 * Creates a modified copy of an object schema that marks all entries as required.
 *
 * @param schema The schema to modify.
 *
 * @returns An object schema.
 */
declare function required<const TSchema extends Schema$5>(schema: TSchema): SchemaWithRequired<TSchema, undefined, undefined>;
/**
 * Creates a modified copy of an object schema that marks all entries as required.
 *
 * @param schema The schema to modify.
 * @param message The error message.
 *
 * @returns An object schema.
 */
declare function required<const TSchema extends Schema$5, const TMessage extends ErrorMessage<NonOptionalIssue> | undefined>(schema: TSchema, message: TMessage): SchemaWithRequired<TSchema, undefined, TMessage>;
/**
 * Creates a modified copy of an object schema that marks the selected entries
 * as required.
 *
 * @param schema The schema to modify.
 * @param keys The selected entries.
 *
 * @returns An object schema.
 */
declare function required<const TSchema extends Schema$5, const TKeys extends ObjectKeys<TSchema>>(schema: TSchema, keys: TKeys): SchemaWithRequired<TSchema, TKeys, undefined>;
/**
 * Creates a modified copy of an object schema that marks the selected entries
 * as required.
 *
 * @param schema The schema to modify.
 * @param keys The selected entries.
 * @param message The error message.
 *
 * @returns An object schema.
 */
declare function required<const TSchema extends Schema$5, const TKeys extends ObjectKeys<TSchema>, const TMessage extends ErrorMessage<NonOptionalIssue> | undefined>(schema: TSchema, keys: TKeys, message: TMessage): SchemaWithRequired<TSchema, TKeys, TMessage>;

/**
 * Schema type.
 */
type Schema$4 = SchemaWithoutPipe<LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<StrictObjectIssue> | undefined>>;
/**
 * Required entries type.
 */
type RequiredEntries<TEntries extends ObjectEntriesAsync, TKeys extends readonly (keyof TEntries)[] | undefined, TMessage extends ErrorMessage<NonOptionalIssue> | undefined> = {
    [TKey in keyof TEntries]: TKeys extends readonly (keyof TEntries)[] ? TKey extends TKeys[number] ? NonOptionalSchemaAsync<TEntries[TKey], TMessage> : TEntries[TKey] : NonOptionalSchemaAsync<TEntries[TKey], TMessage>;
};
/**
 * Schema with required type.
 */
type SchemaWithRequiredAsync<TSchema extends Schema$4, TKeys extends ObjectKeys<TSchema> | undefined, TMessage extends ErrorMessage<NonOptionalIssue> | undefined> = TSchema extends ObjectSchemaAsync<infer TEntries, ErrorMessage<ObjectIssue> | undefined> | StrictObjectSchemaAsync<infer TEntries, ErrorMessage<StrictObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: RequiredEntries<TEntries, TKeys, TMessage>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<RequiredEntries<TEntries, TKeys, TMessage>>, InferObjectOutput<RequiredEntries<TEntries, TKeys, TMessage>>>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferObjectOutput<RequiredEntries<TEntries, TKeys, TMessage>>, NonOptionalIssue | InferIssue<TSchema>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<RequiredEntries<TEntries, TKeys, TMessage>>;
        readonly output: InferObjectOutput<RequiredEntries<TEntries, TKeys, TMessage>>;
        readonly issue: NonOptionalIssue | InferIssue<TSchema>;
    } | undefined;
} : TSchema extends LooseObjectSchemaAsync<infer TEntries, ErrorMessage<LooseObjectIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: RequiredEntries<TEntries, TKeys, TMessage>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<RequiredEntries<TEntries, TKeys, TMessage>> & {
        [key: string]: unknown;
    }, InferObjectOutput<RequiredEntries<TEntries, TKeys, TMessage>> & {
        [key: string]: unknown;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferObjectOutput<RequiredEntries<TEntries, TKeys, TMessage>> & {
        [key: string]: unknown;
    }, NonOptionalIssue | InferIssue<TSchema>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<RequiredEntries<TEntries, TKeys, TMessage>> & {
            [key: string]: unknown;
        };
        readonly output: InferObjectOutput<RequiredEntries<TEntries, TKeys, TMessage>> & {
            [key: string]: unknown;
        };
        readonly issue: NonOptionalIssue | InferIssue<TSchema>;
    } | undefined;
} : TSchema extends ObjectWithRestSchemaAsync<infer TEntries, infer TRest, ErrorMessage<ObjectWithRestIssue> | undefined> ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
    /**
     * The object entries.
     */
    readonly entries: RequiredEntries<TEntries, TKeys, TMessage>;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<InferObjectInput<RequiredEntries<TEntries, TKeys, TMessage>> & {
        [key: string]: InferInput<TRest>;
    }, InferObjectOutput<RequiredEntries<TEntries, TKeys, TMessage>> & {
        [key: string]: InferOutput<TRest>;
    }>;
    /**
     * Parses unknown input.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferObjectOutput<RequiredEntries<TEntries, TKeys, TMessage>> & {
        [key: string]: InferOutput<TRest>;
    }, NonOptionalIssue | InferIssue<TSchema>>>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: InferObjectInput<RequiredEntries<TEntries, TKeys, TMessage>> & {
            [key: string]: InferInput<TRest>;
        };
        readonly output: InferObjectOutput<RequiredEntries<TEntries, TKeys, TMessage>> & {
            [key: string]: InferOutput<TRest>;
        };
        readonly issue: NonOptionalIssue | InferIssue<TSchema>;
    } | undefined;
} : never;
/**
 * Creates a modified copy of an object schema that marks all entries as required.
 *
 * @param schema The schema to modify.
 *
 * @returns An object schema.
 */
declare function requiredAsync<const TSchema extends Schema$4>(schema: TSchema): SchemaWithRequiredAsync<TSchema, undefined, undefined>;
/**
 * Creates a modified copy of an object schema that marks all entries as required.
 *
 * @param schema The schema to modify.
 * @param message The error message.
 *
 * @returns An object schema.
 */
declare function requiredAsync<const TSchema extends Schema$4, const TMessage extends ErrorMessage<NonOptionalIssue> | undefined>(schema: TSchema, message: TMessage): SchemaWithRequiredAsync<TSchema, undefined, TMessage>;
/**
 * Creates a modified copy of an object schema that marks the selected entries
 * as required.
 *
 * @param schema The schema to modify.
 * @param keys The selected entries.
 *
 * @returns An object schema.
 */
declare function requiredAsync<const TSchema extends Schema$4, const TKeys extends ObjectKeys<TSchema>>(schema: TSchema, keys: TKeys): SchemaWithRequiredAsync<TSchema, TKeys, undefined>;
/**
 * Creates a modified copy of an object schema that marks the selected entries
 * as required.
 *
 * @param schema The schema to modify.
 * @param keys The selected entries.
 * @param message The error message.
 *
 * @returns An object schema.
 */
declare function requiredAsync<const TSchema extends Schema$4, const TKeys extends ObjectKeys<TSchema>, const TMessage extends ErrorMessage<NonOptionalIssue> | undefined>(schema: TSchema, keys: TKeys, message: TMessage): SchemaWithRequiredAsync<TSchema, TKeys, TMessage>;

/**
 * Safe parse result type.
 */
type SafeParseResult<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = {
    /**
     * Whether is's typed.
     */
    readonly typed: true;
    /**
     * Whether it's successful.
     */
    readonly success: true;
    /**
     * The output value.
     */
    readonly output: InferOutput<TSchema>;
    /**
     * The issues, if any.
     */
    readonly issues: undefined;
} | {
    readonly typed: true;
    readonly success: false;
    readonly output: InferOutput<TSchema>;
    readonly issues: [InferIssue<TSchema>, ...InferIssue<TSchema>[]];
} | {
    readonly typed: false;
    readonly success: false;
    readonly output: unknown;
    readonly issues: [InferIssue<TSchema>, ...InferIssue<TSchema>[]];
};

/**
 * Parses an unknown input based on a schema.
 *
 * @param schema The schema to be used.
 * @param input The input to be parsed.
 * @param config The parse configuration.
 *
 * @returns The parse result.
 */
declare function safeParse<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema, input: unknown, config?: Config<InferIssue<TSchema>>): SafeParseResult<TSchema>;

/**
 * Parses an unknown input based on a schema.
 *
 * @param schema The schema to be used.
 * @param input The input to be parsed.
 * @param config The parse configuration.
 *
 * @returns The parse result.
 */
declare function safeParseAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema, input: unknown, config?: Config<InferIssue<TSchema>>): Promise<SafeParseResult<TSchema>>;

/**
 * The safe parser interface.
 */
interface SafeParser<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TConfig extends Config<InferIssue<TSchema>> | undefined> {
    /**
     * Parses an unknown input based on the schema.
     */
    (input: unknown): SafeParseResult<TSchema>;
    /**
     * The schema to be used.
     */
    readonly schema: TSchema;
    /**
     * The parser configuration.
     */
    readonly config: TConfig;
}
/**
 * Returns a function that parses an unknown input based on a schema.
 *
 * @param schema The schema to be used.
 *
 * @returns The parser function.
 */
declare function safeParser<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema): SafeParser<TSchema, undefined>;
/**
 * Returns a function that parses an unknown input based on a schema.
 *
 * @param schema The schema to be used.
 * @param config The parser configuration.
 *
 * @returns The parser function.
 */
declare function safeParser<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TConfig extends Config<InferIssue<TSchema>> | undefined>(schema: TSchema, config: TConfig): SafeParser<TSchema, TConfig>;

/**
 * The safe parser async interface.
 */
interface SafeParserAsync<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TConfig extends Config<InferIssue<TSchema>> | undefined> {
    /**
     * Parses an unknown input based on the schema.
     */
    (input: unknown): Promise<SafeParseResult<TSchema>>;
    /**
     * The schema to be used.
     */
    readonly schema: TSchema;
    /**
     * The parser configuration.
     */
    readonly config: TConfig;
}
/**
 * Returns a function that parses an unknown input based on a schema.
 *
 * @param schema The schema to be used.
 *
 * @returns The parser function.
 */
declare function safeParserAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema): SafeParserAsync<TSchema, undefined>;
/**
 * Returns a function that parses an unknown input based on a schema.
 *
 * @param schema The schema to be used.
 * @param config The parser configuration.
 *
 * @returns The parser function.
 */
declare function safeParserAsync<const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TConfig extends Config<InferIssue<TSchema>> | undefined>(schema: TSchema, config: TConfig): SafeParserAsync<TSchema, TConfig>;

/**
 * Summarize the error messages of issues in a pretty-printable multi-line string.
 *
 * @param issues The list of issues.
 *
 * @returns A summary of the issues.
 *
 * @beta
 */
declare function summarize(issues: [BaseIssue<unknown>, ...BaseIssue<unknown>[]]): string;

/**
 * Unwraps the wrapped schema.
 *
 * @param schema The schema to be unwrapped.
 *
 * @returns The unwrapped schema.
 */
declare function unwrap<TSchema extends ExactOptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | ExactOptionalSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | NonNullableSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonNullableIssue> | undefined> | NonNullableSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonNullableIssue> | undefined> | NonNullishSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonNullishIssue> | undefined> | NonNullishSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonNullishIssue> | undefined> | NonOptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonOptionalIssue> | undefined> | NonOptionalSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonOptionalIssue> | undefined> | NullableSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | NullableSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | NullishSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | NullishSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | UndefinedableSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | UndefinedableSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown>>(schema: TSchema): TSchema['wrapped'];

/**
 * Base metadata interface.
 */
interface BaseMetadata<TInput> {
    /**
     * The object kind.
     */
    readonly kind: 'metadata';
    /**
     * The metadata type.
     */
    readonly type: string;
    /**
     * The metadata reference.
     */
    readonly reference: (...args: any[]) => BaseMetadata<any>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: TInput;
        readonly output: TInput;
        readonly issue: never;
    } | undefined;
}
/**
 * Generic metadata type.
 */
type GenericMetadata<TInput = any> = BaseMetadata<TInput>;

/**
 * Unknown dataset interface.
 */
interface UnknownDataset {
    /**
     * Whether is's typed.
     */
    typed?: false;
    /**
     * The dataset value.
     */
    value: unknown;
    /**
     * The dataset issues.
     */
    issues?: undefined;
}
/**
 * Success dataset interface.
 */
interface SuccessDataset<TValue> {
    /**
     * Whether is's typed.
     */
    typed: true;
    /**
     * The dataset value.
     */
    value: TValue;
    /**
     * The dataset issues.
     */
    issues?: undefined;
}
/**
 * Partial dataset interface.
 */
interface PartialDataset<TValue, TIssue extends BaseIssue<unknown>> {
    /**
     * Whether is's typed.
     */
    typed: true;
    /**
     * The dataset value.
     */
    value: TValue;
    /**
     * The dataset issues.
     */
    issues: [TIssue, ...TIssue[]];
}
/**
 * Failure dataset interface.
 */
interface FailureDataset<TIssue extends BaseIssue<unknown>> {
    /**
     * Whether is's typed.
     */
    typed: false;
    /**
     * The dataset value.
     */
    value: unknown;
    /**
     * The dataset issues.
     */
    issues: [TIssue, ...TIssue[]];
}
/**
 * Output dataset type.
 */
type OutputDataset<TValue, TIssue extends BaseIssue<unknown>> = SuccessDataset<TValue> | PartialDataset<TValue, TIssue> | FailureDataset<TIssue>;

/**
 * The Standard Schema properties interface.
 */
interface StandardProps<TInput, TOutput> {
    /**
     * The version number of the standard.
     */
    readonly version: 1;
    /**
     * The vendor name of the schema library.
     */
    readonly vendor: 'valibot';
    /**
     * Validates unknown input values.
     */
    readonly validate: (value: unknown) => StandardResult<TOutput> | Promise<StandardResult<TOutput>>;
    /**
     * Inferred types associated with the schema.
     */
    readonly types?: StandardTypes<TInput, TOutput> | undefined;
}
/**
 * The result interface of the validate function.
 */
type StandardResult<TOutput> = StandardSuccessResult<TOutput> | StandardFailureResult;
/**
 * The result interface if validation succeeds.
 */
interface StandardSuccessResult<TOutput> {
    /**
     * The typed output value.
     */
    readonly value: TOutput;
    /**
     * The non-existent issues.
     */
    readonly issues?: undefined;
}
/**
 * The result interface if validation fails.
 */
interface StandardFailureResult {
    /**
     * The issues of failed validation.
     */
    readonly issues: readonly StandardIssue[];
}
/**
 * The issue interface of the failure output.
 */
interface StandardIssue {
    /**
     * The error message of the issue.
     */
    readonly message: string;
    /**
     * The path of the issue, if any.
     */
    readonly path?: readonly (PropertyKey | StandardPathItem)[] | undefined;
}
/**
 * The path item interface of the issue.
 */
interface StandardPathItem {
    /**
     * The key of the path item.
     */
    readonly key: PropertyKey;
}
/**
 * The Standard Schema types interface.
 */
interface StandardTypes<TInput, TOutput> {
    /**
     * The input type of the schema.
     */
    readonly input: TInput;
    /**
     * The output type of the schema.
     */
    readonly output: TOutput;
}

/**
 * Base schema interface.
 */
interface BaseSchema<TInput, TOutput, TIssue extends BaseIssue<unknown>> {
    /**
     * The object kind.
     */
    readonly kind: 'schema';
    /**
     * The schema type.
     */
    readonly type: string;
    /**
     * The schema reference.
     */
    readonly reference: (...args: any[]) => BaseSchema<unknown, unknown, BaseIssue<unknown>>;
    /**
     * The expected property.
     */
    readonly expects: string;
    /**
     * Whether it's async.
     */
    readonly async: false;
    /**
     * The Standard Schema properties.
     *
     * @internal
     */
    readonly '~standard': StandardProps<TInput, TOutput>;
    /**
     * Parses unknown input values.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<TOutput, TIssue>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: TInput;
        readonly output: TOutput;
        readonly issue: TIssue;
    } | undefined;
}
/**
 * Base schema async interface.
 */
interface BaseSchemaAsync<TInput, TOutput, TIssue extends BaseIssue<unknown>> extends Omit<BaseSchema<TInput, TOutput, TIssue>, 'reference' | 'async' | '~run'> {
    /**
     * The schema reference.
     */
    readonly reference: (...args: any[]) => BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>;
    /**
     * Whether it's async.
     */
    readonly async: true;
    /**
     * Parses unknown input values.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<TOutput, TIssue>>;
}
/**
 * Generic schema type.
 */
type GenericSchema<TInput = unknown, TOutput = TInput, TIssue extends BaseIssue<unknown> = BaseIssue<unknown>> = BaseSchema<TInput, TOutput, TIssue>;
/**
 * Generic schema async type.
 */
type GenericSchemaAsync<TInput = unknown, TOutput = TInput, TIssue extends BaseIssue<unknown> = BaseIssue<unknown>> = BaseSchemaAsync<TInput, TOutput, TIssue>;

/**
 * Base transformation interface.
 */
interface BaseTransformation<TInput, TOutput, TIssue extends BaseIssue<unknown>> {
    /**
     * The object kind.
     */
    readonly kind: 'transformation';
    /**
     * The transformation type.
     */
    readonly type: string;
    /**
     * The transformation reference.
     */
    readonly reference: (...args: any[]) => BaseTransformation<any, any, BaseIssue<unknown>>;
    /**
     * Whether it's async.
     */
    readonly async: false;
    /**
     * Transforms known input values.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: SuccessDataset<TInput>, config: Config<BaseIssue<unknown>>) => OutputDataset<TOutput, BaseIssue<unknown> | TIssue>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: TInput;
        readonly output: TOutput;
        readonly issue: TIssue;
    } | undefined;
}
/**
 * Base transformation async interface.
 */
interface BaseTransformationAsync<TInput, TOutput, TIssue extends BaseIssue<unknown>> extends Omit<BaseTransformation<TInput, TOutput, TIssue>, 'reference' | 'async' | '~run'> {
    /**
     * The transformation reference.
     */
    readonly reference: (...args: any[]) => BaseTransformation<any, any, BaseIssue<unknown>> | BaseTransformationAsync<any, any, BaseIssue<unknown>>;
    /**
     * Whether it's async.
     */
    readonly async: true;
    /**
     * Transforms known input values.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: SuccessDataset<TInput>, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<TOutput, BaseIssue<unknown> | TIssue>>;
}
/**
 * Generic transformation type.
 */
type GenericTransformation<TInput = any, TOutput = TInput, TIssue extends BaseIssue<unknown> = BaseIssue<unknown>> = BaseTransformation<TInput, TOutput, TIssue>;
/**
 * Generic transformation async type.
 */
type GenericTransformationAsync<TInput = any, TOutput = TInput, TIssue extends BaseIssue<unknown> = BaseIssue<unknown>> = BaseTransformationAsync<TInput, TOutput, TIssue>;

/**
 * Base validation interface.
 */
interface BaseValidation<TInput, TOutput, TIssue extends BaseIssue<unknown>> {
    /**
     * The object kind.
     */
    readonly kind: 'validation';
    /**
     * The validation type.
     */
    readonly type: string;
    /**
     * The validation reference.
     */
    readonly reference: (...args: any[]) => BaseValidation<any, any, BaseIssue<unknown>>;
    /**
     * The expected property.
     */
    readonly expects: string | null;
    /**
     * Whether it's async.
     */
    readonly async: false;
    /**
     * Validates known input values.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: OutputDataset<TInput, BaseIssue<unknown>>, config: Config<BaseIssue<unknown>>) => OutputDataset<TOutput, BaseIssue<unknown> | TIssue>;
    /**
     * The input, output and issue type.
     *
     * @internal
     */
    readonly '~types'?: {
        readonly input: TInput;
        readonly output: TOutput;
        readonly issue: TIssue;
    } | undefined;
}
/**
 * Base validation async interface.
 */
interface BaseValidationAsync<TInput, TOutput, TIssue extends BaseIssue<unknown>> extends Omit<BaseValidation<TInput, TOutput, TIssue>, 'reference' | 'async' | '~run'> {
    /**
     * The validation reference.
     */
    readonly reference: (...args: any[]) => BaseValidation<any, any, BaseIssue<unknown>> | BaseValidationAsync<any, any, BaseIssue<unknown>>;
    /**
     * Whether it's async.
     */
    readonly async: true;
    /**
     * Validates known input values.
     *
     * @param dataset The input dataset.
     * @param config The configuration.
     *
     * @returns The output dataset.
     *
     * @internal
     */
    readonly '~run': (dataset: OutputDataset<TInput, BaseIssue<unknown>>, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<TOutput, BaseIssue<unknown> | TIssue>>;
}
/**
 * Generic validation type.
 */
type GenericValidation<TInput = any, TOutput = TInput, TIssue extends BaseIssue<unknown> = BaseIssue<unknown>> = BaseValidation<TInput, TOutput, TIssue>;
/**
 * Generic validation async type.
 */
type GenericValidationAsync<TInput = any, TOutput = TInput, TIssue extends BaseIssue<unknown> = BaseIssue<unknown>> = BaseValidationAsync<TInput, TOutput, TIssue>;

/**
 * Infer input type.
 */
type InferInput<TItem extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<any, unknown, BaseIssue<unknown>> | BaseValidationAsync<any, unknown, BaseIssue<unknown>> | BaseTransformation<any, unknown, BaseIssue<unknown>> | BaseTransformationAsync<any, unknown, BaseIssue<unknown>> | BaseMetadata<any>> = NonNullable<TItem['~types']>['input'];
/**
 * Infer output type.
 */
type InferOutput<TItem extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<any, unknown, BaseIssue<unknown>> | BaseValidationAsync<any, unknown, BaseIssue<unknown>> | BaseTransformation<any, unknown, BaseIssue<unknown>> | BaseTransformationAsync<any, unknown, BaseIssue<unknown>> | BaseMetadata<any>> = NonNullable<TItem['~types']>['output'];
/**
 * Infer issue type.
 */
type InferIssue<TItem extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<any, unknown, BaseIssue<unknown>> | BaseValidationAsync<any, unknown, BaseIssue<unknown>> | BaseTransformation<any, unknown, BaseIssue<unknown>> | BaseTransformationAsync<any, unknown, BaseIssue<unknown>> | BaseMetadata<any>> = NonNullable<TItem['~types']>['issue'];

/**
 * Checks if a type is `any`.
 */
type IsAny<Type> = 0 extends 1 & Type ? true : false;
/**
 * Checks if a type is `never`.
 */
type IsNever<Type> = [Type] extends [never] ? true : false;
/**
 * Extracts `null` from a type.
 */
type NonNullable$1<TValue> = TValue extends null ? never : TValue;
/**
 * Extracts `null` and `undefined` from a type.
 */
type NonNullish<TValue> = TValue extends null | undefined ? never : TValue;
/**
 * Extracts `undefined` from a type.
 */
type NonOptional<TValue> = TValue extends undefined ? never : TValue;
/**
 * Constructs a type that is maybe readonly.
 */
type MaybeReadonly<TValue> = TValue | Readonly<TValue>;
/**
 * Constructs a type that is maybe a promise.
 */
type MaybePromise<TValue> = TValue | Promise<TValue>;
/**
 * Prettifies a type for better readability.
 *
 * Hint: This type has no effect and is only used so that TypeScript displays
 * the final type in the preview instead of the utility types used.
 */
type Prettify<TObject> = {
    [TKey in keyof TObject]: TObject[TKey];
} & {};
/**
 * Marks specific keys as optional.
 */
type MarkOptional<TObject, TKeys extends keyof TObject> = {
    [TKey in keyof TObject]?: unknown;
} & Omit<TObject, TKeys> & Partial<Pick<TObject, TKeys>>;
/**
 * Merges two objects. Overlapping entries from the second object overwrite
 * properties from the first object.
 */
type Merge<TFirstObject, TSecondObject> = Omit<TFirstObject, keyof TFirstObject & keyof TSecondObject> & TSecondObject;
/**
 * Extracts first tuple item.
 */
type FirstTupleItem<TTuple extends readonly [unknown, ...unknown[]]> = TTuple[0];
/**
 * Extracts last tuple item.
 */
type LastTupleItem<TTuple extends readonly [unknown, ...unknown[]]> = TTuple[TTuple extends readonly [unknown, ...infer TRest] ? TRest['length'] : never];
/**
 * Converts union to intersection type.
 */
type UnionToIntersect<TUnion> = (TUnion extends any ? (arg: TUnion) => void : never) extends (arg: infer Intersect) => void ? Intersect : never;
/**
 * Converts union to tuple type using an accumulator.
 *
 * For more information: {@link https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types}
 */
type UnionToTupleHelper<TUnion, TResult extends unknown[]> = UnionToIntersect<TUnion extends never ? never : () => TUnion> extends () => infer TLast ? UnionToTupleHelper<Exclude<TUnion, TLast>, [TLast, ...TResult]> : TResult;
/**
 * Converts union to tuple type.
 */
type UnionToTuple<TUnion> = UnionToTupleHelper<TUnion, []>;

/**
 * Error message type.
 */
type ErrorMessage<TIssue extends BaseIssue<unknown>> = ((issue: TIssue) => string) | string;
/**
 * Default type.
 */
type Default<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TInput extends null | undefined> = MaybeReadonly<InferInput<TWrapped> | TInput> | ((dataset?: UnknownDataset, config?: Config<InferIssue<TWrapped>>) => MaybeReadonly<InferInput<TWrapped> | TInput>) | undefined;
/**
 * Default async type.
 */
type DefaultAsync<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TInput extends null | undefined> = MaybeReadonly<InferInput<TWrapped> | TInput> | ((dataset?: UnknownDataset, config?: Config<InferIssue<TWrapped>>) => MaybePromise<MaybeReadonly<InferInput<TWrapped> | TInput>>) | undefined;
/**
 * Default value type.
 */
type DefaultValue<TDefault extends Default<BaseSchema<unknown, unknown, BaseIssue<unknown>>, null | undefined> | DefaultAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, null | undefined>> = TDefault extends DefaultAsync<infer TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, infer TInput> ? TDefault extends (dataset?: UnknownDataset, config?: Config<InferIssue<TWrapped>>) => MaybePromise<InferInput<TWrapped> | TInput> ? Awaited<ReturnType<TDefault>> : TDefault : never;

/**
 * Optional entry schema type.
 */
type OptionalEntrySchema = ExactOptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | NullishSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown>;
/**
 * Optional entry schema async type.
 */
type OptionalEntrySchemaAsync = ExactOptionalSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | NullishSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown>;
/**
 * Object entries interface.
 */
interface ObjectEntries {
    [key: string]: BaseSchema<unknown, unknown, BaseIssue<unknown>> | SchemaWithFallback<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalEntrySchema;
}
/**
 * Object entries async interface.
 */
interface ObjectEntriesAsync {
    [key: string]: BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | SchemaWithFallback<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | SchemaWithFallbackAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalEntrySchema | OptionalEntrySchemaAsync;
}
/**
 * Object keys type.
 */
type ObjectKeys<TSchema extends LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined> | LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<StrictObjectIssue> | undefined>> = MaybeReadonly<[keyof TSchema['entries'], ...(keyof TSchema['entries'])[]]>;
/**
 * Infer entries input type.
 */
type InferEntriesInput<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
    -readonly [TKey in keyof TEntries]: InferInput<TEntries[TKey]>;
};
/**
 * Infer entries output type.
 */
type InferEntriesOutput<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
    -readonly [TKey in keyof TEntries]: InferOutput<TEntries[TKey]>;
};
/**
 * Optional input keys type.
 */
type OptionalInputKeys<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
    [TKey in keyof TEntries]: TEntries[TKey] extends OptionalEntrySchema | OptionalEntrySchemaAsync ? TKey : never;
}[keyof TEntries];
/**
 * Optional output keys type.
 */
type OptionalOutputKeys<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
    [TKey in keyof TEntries]: TEntries[TKey] extends OptionalEntrySchema | OptionalEntrySchemaAsync ? undefined extends TEntries[TKey]['default'] ? TKey : never : never;
}[keyof TEntries];
/**
 * Input with question marks type.
 */
type InputWithQuestionMarks<TEntries extends ObjectEntries | ObjectEntriesAsync, TObject extends InferEntriesInput<TEntries>> = MarkOptional<TObject, OptionalInputKeys<TEntries>>;
/**
 * Output with question marks type.
 */
type OutputWithQuestionMarks<TEntries extends ObjectEntries | ObjectEntriesAsync, TObject extends InferEntriesOutput<TEntries>> = MarkOptional<TObject, OptionalOutputKeys<TEntries>>;
/**
 * Readonly output keys type.
 */
type ReadonlyOutputKeys<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
    [TKey in keyof TEntries]: TEntries[TKey] extends SchemaWithPipe<infer TPipe> | SchemaWithPipeAsync<infer TPipe> ? ReadonlyAction<any> extends TPipe[number] ? TKey : never : never;
}[keyof TEntries];
/**
 * Output with readonly type.
 */
type OutputWithReadonly<TEntries extends ObjectEntries | ObjectEntriesAsync, TObject extends OutputWithQuestionMarks<TEntries, InferEntriesOutput<TEntries>>> = Readonly<TObject> & Pick<TObject, Exclude<keyof TObject, ReadonlyOutputKeys<TEntries>>>;
/**
 * Infer object input type.
 */
type InferObjectInput<TEntries extends ObjectEntries | ObjectEntriesAsync> = Prettify<InputWithQuestionMarks<TEntries, InferEntriesInput<TEntries>>>;
/**
 * Infer object output type.
 */
type InferObjectOutput<TEntries extends ObjectEntries | ObjectEntriesAsync> = Prettify<OutputWithReadonly<TEntries, OutputWithQuestionMarks<TEntries, InferEntriesOutput<TEntries>>>>;
/**
 * Infer object issue type.
 */
type InferObjectIssue<TEntries extends ObjectEntries | ObjectEntriesAsync> = InferIssue<TEntries[keyof TEntries]>;

/**
 * Tuple items type.
 */
type TupleItems = MaybeReadonly<BaseSchema<unknown, unknown, BaseIssue<unknown>>[]>;
/**
 * Tuple items async type.
 */
type TupleItemsAsync = MaybeReadonly<(BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>)[]>;
/**
 * Infer tuple input type.
 */
type InferTupleInput<TItems extends TupleItems | TupleItemsAsync> = {
    -readonly [TKey in keyof TItems]: InferInput<TItems[TKey]>;
};
/**
 * Infer tuple output type.
 */
type InferTupleOutput<TItems extends TupleItems | TupleItemsAsync> = {
    -readonly [TKey in keyof TItems]: InferOutput<TItems[TKey]>;
};
/**
 * Infer tuple issue type.
 */
type InferTupleIssue<TItems extends TupleItems | TupleItemsAsync> = InferIssue<TItems[number]>;

/**
 * Array path item interface.
 */
interface ArrayPathItem {
    /**
     * The path item type.
     */
    readonly type: 'array';
    /**
     * The path item origin.
     */
    readonly origin: 'value';
    /**
     * The path item input.
     */
    readonly input: MaybeReadonly<unknown[]>;
    /**
     * The path item key.
     */
    readonly key: number;
    /**
     * The path item value.
     */
    readonly value: unknown;
}
/**
 * Map path item interface.
 */
interface MapPathItem {
    /**
     * The path item type.
     */
    readonly type: 'map';
    /**
     * The path item origin.
     */
    readonly origin: 'key' | 'value';
    /**
     * The path item input.
     */
    readonly input: Map<unknown, unknown>;
    /**
     * The path item key.
     */
    readonly key: unknown;
    /**
     * The path item value.
     */
    readonly value: unknown;
}
/**
 * Object path item interface.
 */
interface ObjectPathItem {
    /**
     * The path item type.
     */
    readonly type: 'object';
    /**
     * The path item origin.
     */
    readonly origin: 'key' | 'value';
    /**
     * The path item input.
     */
    readonly input: Record<string, unknown>;
    /**
     * The path item key.
     */
    readonly key: string;
    /**
     * The path item value.
     */
    readonly value: unknown;
}
/**
 * Set path item interface.
 */
interface SetPathItem {
    /**
     * The path item type.
     */
    readonly type: 'set';
    /**
     * The path item origin.
     */
    readonly origin: 'value';
    /**
     * The path item input.
     */
    readonly input: Set<unknown>;
    /**
     * The path item key.
     */
    readonly key: null;
    /**
     * The path item key.
     */
    readonly value: unknown;
}
/**
 * Unknown path item interface.
 */
interface UnknownPathItem {
    /**
     * The path item type.
     */
    readonly type: 'unknown';
    /**
     * The path item origin.
     */
    readonly origin: 'key' | 'value';
    /**
     * The path item input.
     */
    readonly input: unknown;
    /**
     * The path item key.
     */
    readonly key: unknown;
    /**
     * The path item value.
     */
    readonly value: unknown;
}
/**
 * Issue path item type.
 */
type IssuePathItem = ArrayPathItem | MapPathItem | ObjectPathItem | SetPathItem | UnknownPathItem;
/**
 * Base issue interface.
 */
interface BaseIssue<TInput> extends Config<BaseIssue<TInput>> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema' | 'validation' | 'transformation';
    /**
     * The issue type.
     */
    readonly type: string;
    /**
     * The raw input data.
     */
    readonly input: TInput;
    /**
     * The expected property.
     */
    readonly expected: string | null;
    /**
     * The received property.
     */
    readonly received: string;
    /**
     * The error message.
     */
    readonly message: string;
    /**
     * The input requirement.
     */
    readonly requirement?: unknown | undefined;
    /**
     * The issue path.
     */
    readonly path?: [IssuePathItem, ...IssuePathItem[]] | undefined;
    /**
     * The sub issues.
     */
    readonly issues?: [BaseIssue<TInput>, ...BaseIssue<TInput>[]] | undefined;
}
/**
 * Generic issue type.
 */
type GenericIssue<TInput = unknown> = BaseIssue<TInput>;
/**
 * Dot path type.
 */
type DotPath<TKey extends string | number | symbol, TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = TKey extends string | number ? `${TKey}` | `${TKey}.${IssueDotPath<TSchema>}` : never;
/**
 * Object path type.
 */
type ObjectPath<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
    [TKey in keyof TEntries]: DotPath<TKey, TEntries[TKey]>;
}[keyof TEntries];
/**
 * Tuple keys type.
 */
type TupleKeys<TItems extends TupleItems | TupleItemsAsync> = Exclude<keyof TItems, keyof []>;
/**
 * Tuple path type.
 */
type TuplePath<TItems extends TupleItems | TupleItemsAsync> = {
    [TKey in TupleKeys<TItems>]: TItems[TKey] extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> ? DotPath<TKey, TItems[TKey]> : never;
}[TupleKeys<TItems>];
/**
 * Issue dot path type.
 */
type IssueDotPath<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = TSchema extends SchemaWithPipe<infer TPipe> ? IssueDotPath<FirstTupleItem<TPipe>> : TSchema extends SchemaWithPipeAsync<infer TPipe> ? IssueDotPath<FirstTupleItem<TPipe>> : TSchema extends ArraySchema<infer TItem, ErrorMessage<ArrayIssue> | undefined> ? DotPath<number, TItem> : TSchema extends ArraySchemaAsync<infer TItem, ErrorMessage<ArrayIssue> | undefined> ? DotPath<number, TItem> : TSchema extends IntersectSchema<infer TOptions, ErrorMessage<IntersectIssue> | undefined> | UnionSchema<infer TOptions, ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined> | VariantSchema<string, infer TOptions, ErrorMessage<VariantIssue> | undefined> ? IssueDotPath<TOptions[number]> : TSchema extends IntersectSchemaAsync<infer TOptions, ErrorMessage<IntersectIssue> | undefined> | UnionSchemaAsync<infer TOptions, ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined> | VariantSchemaAsync<string, infer TOptions, ErrorMessage<VariantIssue> | undefined> ? IssueDotPath<TOptions[number]> : TSchema extends MapSchema<infer TKey, infer TValue, ErrorMessage<MapIssue> | undefined> | RecordSchema<infer TKey, infer TValue, ErrorMessage<RecordIssue> | undefined> ? DotPath<InferInput<TKey>, TValue> : TSchema extends MapSchemaAsync<infer TKey, infer TValue, ErrorMessage<MapIssue> | undefined> | RecordSchemaAsync<infer TKey, infer TValue, ErrorMessage<RecordIssue> | undefined> ? DotPath<InferInput<TKey>, TValue> : TSchema extends LooseObjectSchema<infer TEntries, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<infer TEntries, ErrorMessage<ObjectIssue> | undefined> | StrictObjectSchema<infer TEntries, ErrorMessage<StrictObjectIssue> | undefined> ? ObjectPath<TEntries> : TSchema extends LooseObjectSchemaAsync<infer TEntries, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchemaAsync<infer TEntries, ErrorMessage<ObjectIssue> | undefined> | StrictObjectSchemaAsync<infer TEntries, ErrorMessage<StrictObjectIssue> | undefined> ? ObjectPath<TEntries> : TSchema extends ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> ? string : TSchema extends ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> ? string : TSchema extends SetSchema<infer TValue, ErrorMessage<SetIssue> | undefined> ? DotPath<number, TValue> : TSchema extends SetSchemaAsync<infer TValue, ErrorMessage<SetIssue> | undefined> ? DotPath<number, TValue> : TSchema extends LooseTupleSchema<infer TItems, ErrorMessage<LooseTupleIssue> | undefined> | StrictTupleSchema<infer TItems, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchema<infer TItems, ErrorMessage<TupleIssue> | undefined> ? TuplePath<TItems> : TSchema extends LooseTupleSchemaAsync<infer TItems, ErrorMessage<LooseTupleIssue> | undefined> | StrictTupleSchemaAsync<infer TItems, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchemaAsync<infer TItems, ErrorMessage<TupleIssue> | undefined> ? TuplePath<TItems> : TSchema extends TupleWithRestSchema<infer TItems, infer TRest, ErrorMessage<TupleWithRestIssue> | undefined> ? TuplePath<TItems> | DotPath<number, TRest> : TSchema extends TupleWithRestSchemaAsync<infer TItems, infer TRest, ErrorMessage<TupleWithRestIssue> | undefined> ? TuplePath<TItems> | DotPath<number, TRest> : TSchema extends ExactOptionalSchema<infer TWrapped, Default<BaseSchema<unknown, unknown, BaseIssue<unknown>>, never>> | LazySchema<infer TWrapped> | NonNullableSchema<infer TWrapped, ErrorMessage<NonNullableIssue> | undefined> | NonNullishSchema<infer TWrapped, ErrorMessage<NonNullishIssue> | undefined> | NonOptionalSchema<infer TWrapped, ErrorMessage<NonOptionalIssue> | undefined> | NullableSchema<infer TWrapped, Default<BaseSchema<unknown, unknown, BaseIssue<unknown>>, null>> | NullishSchema<infer TWrapped, Default<BaseSchema<unknown, unknown, BaseIssue<unknown>>, null | undefined>> | OptionalSchema<infer TWrapped, Default<BaseSchema<unknown, unknown, BaseIssue<unknown>>, undefined>> | UndefinedableSchema<infer TWrapped, Default<BaseSchema<unknown, unknown, BaseIssue<unknown>>, undefined>> ? IssueDotPath<TWrapped> : TSchema extends ExactOptionalSchemaAsync<infer TWrapped, DefaultAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, never>> | LazySchemaAsync<infer TWrapped> | NonNullableSchemaAsync<infer TWrapped, ErrorMessage<NonNullableIssue> | undefined> | NonNullishSchemaAsync<infer TWrapped, ErrorMessage<NonNullishIssue> | undefined> | NonOptionalSchemaAsync<infer TWrapped, ErrorMessage<NonOptionalIssue> | undefined> | NullableSchemaAsync<infer TWrapped, DefaultAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, null>> | NullishSchemaAsync<infer TWrapped, DefaultAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, null | undefined>> | OptionalSchemaAsync<infer TWrapped, DefaultAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, undefined>> | UndefinedableSchemaAsync<infer TWrapped, DefaultAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, undefined>> ? IssueDotPath<TWrapped> : never;

/**
 * Config interface.
 */
interface Config<TIssue extends BaseIssue<unknown>> {
    /**
     * The selected language.
     */
    readonly lang?: string | undefined;
    /**
     * The error message.
     */
    readonly message?: ErrorMessage<TIssue> | undefined;
    /**
     * Whether it should be aborted early.
     */
    readonly abortEarly?: boolean | undefined;
    /**
     * Whether a pipe should be aborted early.
     */
    readonly abortPipeEarly?: boolean | undefined;
}

/**
 * Pipe action type.
 */
type PipeAction<TInput, TOutput, TIssue extends BaseIssue<unknown>> = BaseValidation<TInput, TOutput, TIssue> | BaseTransformation<TInput, TOutput, TIssue> | BaseMetadata<TInput>;
/**
 * Pipe action async type.
 */
type PipeActionAsync<TInput, TOutput, TIssue extends BaseIssue<unknown>> = BaseValidationAsync<TInput, TOutput, TIssue> | BaseTransformationAsync<TInput, TOutput, TIssue>;
/**
 * Pipe item type.
 */
type PipeItem<TInput, TOutput, TIssue extends BaseIssue<unknown>> = BaseSchema<TInput, TOutput, TIssue> | PipeAction<TInput, TOutput, TIssue>;
/**
 * Pipe item async type.
 */
type PipeItemAsync<TInput, TOutput, TIssue extends BaseIssue<unknown>> = BaseSchemaAsync<TInput, TOutput, TIssue> | PipeActionAsync<TInput, TOutput, TIssue>;
/**
 * Schema without pipe type.
 */
type SchemaWithoutPipe<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = TSchema & {
    pipe?: never;
};
/**
 * Generic pipe action type.
 */
type GenericPipeAction<TInput = any, TOutput = TInput, TIssue extends BaseIssue<unknown> = BaseIssue<unknown>> = PipeAction<TInput, TOutput, TIssue>;
/**
 * Generic pipe action async type.
 */
type GenericPipeActionAsync<TInput = any, TOutput = TInput, TIssue extends BaseIssue<unknown> = BaseIssue<unknown>> = PipeActionAsync<TInput, TOutput, TIssue>;
/**
 * Generic pipe item type.
 */
type GenericPipeItem<TInput = any, TOutput = TInput, TIssue extends BaseIssue<unknown> = BaseIssue<unknown>> = PipeItem<TInput, TOutput, TIssue>;
/**
 * Generic pipe item async type.
 */
type GenericPipeItemAsync<TInput = any, TOutput = TInput, TIssue extends BaseIssue<unknown> = BaseIssue<unknown>> = PipeItemAsync<TInput, TOutput, TIssue>;

/**
 * Any schema interface.
 */
interface AnySchema extends BaseSchema<any, any, never> {
    /**
     * The schema type.
     */
    readonly type: 'any';
    /**
     * The schema reference.
     */
    readonly reference: typeof any;
    /**
     * The expected property.
     */
    readonly expects: 'any';
}
/**
 * Creates an any schema.
 *
 * Hint: This schema function exists only for completeness and is not
 * recommended in practice. Instead, `unknown` should be used to accept
 * unknown data.
 *
 * @returns An any schema.
 */
declare function any(): AnySchema;

/**
 * Array issue interface.
 */
interface ArrayIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'array';
    /**
     * The expected property.
     */
    readonly expected: 'Array';
}

/**
 * Array schema interface.
 */
interface ArraySchema<TItem extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<ArrayIssue> | undefined> extends BaseSchema<InferInput<TItem>[], InferOutput<TItem>[], ArrayIssue | InferIssue<TItem>> {
    /**
     * The schema type.
     */
    readonly type: 'array';
    /**
     * The schema reference.
     */
    readonly reference: typeof array;
    /**
     * The expected property.
     */
    readonly expects: 'Array';
    /**
     * The array item schema.
     */
    readonly item: TItem;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an array schema.
 *
 * @param item The item schema.
 *
 * @returns An array schema.
 */
declare function array<const TItem extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(item: TItem): ArraySchema<TItem, undefined>;
/**
 * Creates an array schema.
 *
 * @param item The item schema.
 * @param message The error message.
 *
 * @returns An array schema.
 */
declare function array<const TItem extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<ArrayIssue> | undefined>(item: TItem, message: TMessage): ArraySchema<TItem, TMessage>;

/**
 * Array schema interface.
 */
interface ArraySchemaAsync<TItem extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<ArrayIssue> | undefined> extends BaseSchemaAsync<InferInput<TItem>[], InferOutput<TItem>[], ArrayIssue | InferIssue<TItem>> {
    /**
     * The schema type.
     */
    readonly type: 'array';
    /**
     * The schema reference.
     */
    readonly reference: typeof array | typeof arrayAsync;
    /**
     * The expected property.
     */
    readonly expects: 'Array';
    /**
     * The array item schema.
     */
    readonly item: TItem;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an array schema.
 *
 * @param item The item schema.
 *
 * @returns An array schema.
 */
declare function arrayAsync<const TItem extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(item: TItem): ArraySchemaAsync<TItem, undefined>;
/**
 * Creates an array schema.
 *
 * @param item The item schema.
 * @param message The error message.
 *
 * @returns An array schema.
 */
declare function arrayAsync<const TItem extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<ArrayIssue> | undefined>(item: TItem, message: TMessage): ArraySchemaAsync<TItem, TMessage>;

/**
 * Bigint issue interface.
 */
interface BigintIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'bigint';
    /**
     * The expected property.
     */
    readonly expected: 'bigint';
}
/**
 * Bigint schema interface.
 */
interface BigintSchema<TMessage extends ErrorMessage<BigintIssue> | undefined> extends BaseSchema<bigint, bigint, BigintIssue> {
    /**
     * The schema type.
     */
    readonly type: 'bigint';
    /**
     * The schema reference.
     */
    readonly reference: typeof bigint;
    /**
     * The expected property.
     */
    readonly expects: 'bigint';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a bigint schema.
 *
 * @returns A bigint schema.
 */
declare function bigint(): BigintSchema<undefined>;
/**
 * Creates a bigint schema.
 *
 * @param message The error message.
 *
 * @returns A bigint schema.
 */
declare function bigint<const TMessage extends ErrorMessage<BigintIssue> | undefined>(message: TMessage): BigintSchema<TMessage>;

/**
 * Blob issue interface.
 */
interface BlobIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'blob';
    /**
     * The expected property.
     */
    readonly expected: 'Blob';
}
/**
 * Blob schema interface.
 */
interface BlobSchema<TMessage extends ErrorMessage<BlobIssue> | undefined> extends BaseSchema<Blob, Blob, BlobIssue> {
    /**
     * The schema type.
     */
    readonly type: 'blob';
    /**
     * The schema reference.
     */
    readonly reference: typeof blob;
    /**
     * The expected property.
     */
    readonly expects: 'Blob';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a blob schema.
 *
 * @returns A blob schema.
 */
declare function blob(): BlobSchema<undefined>;
/**
 * Creates a blob schema.
 *
 * @param message The error message.
 *
 * @returns A blob schema.
 */
declare function blob<const TMessage extends ErrorMessage<BlobIssue> | undefined>(message: TMessage): BlobSchema<TMessage>;

/**
 * Boolean issue interface.
 */
interface BooleanIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'boolean';
    /**
     * The expected property.
     */
    readonly expected: 'boolean';
}
/**
 * Boolean schema interface.
 */
interface BooleanSchema<TMessage extends ErrorMessage<BooleanIssue> | undefined> extends BaseSchema<boolean, boolean, BooleanIssue> {
    /**
     * The schema type.
     */
    readonly type: 'boolean';
    /**
     * The schema reference.
     */
    readonly reference: typeof boolean;
    /**
     * The expected property.
     */
    readonly expects: 'boolean';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a boolean schema.
 *
 * @returns A boolean schema.
 */
declare function boolean(): BooleanSchema<undefined>;
/**
 * Creates a boolean schema.
 *
 * @param message The error message.
 *
 * @returns A boolean schema.
 */
declare function boolean<const TMessage extends ErrorMessage<BooleanIssue> | undefined>(message: TMessage): BooleanSchema<TMessage>;

/**
 * Custom issue interface.
 */
interface CustomIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'custom';
    /**
     * The expected property.
     */
    readonly expected: 'unknown';
}

/**
 * Check type.
 */
type Check = (input: unknown) => boolean;
/**
 * Custom schema interface.
 */
interface CustomSchema<TInput, TMessage extends ErrorMessage<CustomIssue> | undefined> extends BaseSchema<TInput, TInput, CustomIssue> {
    /**
     * The schema type.
     */
    readonly type: 'custom';
    /**
     * The schema reference.
     */
    readonly reference: typeof custom;
    /**
     * The expected property.
     */
    readonly expects: 'unknown';
    /**
     * The type check function.
     */
    readonly check: Check;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a custom schema.
 *
 * @param check The type check function.
 *
 * @returns A custom schema.
 */
declare function custom<TInput>(check: Check): CustomSchema<TInput, undefined>;
/**
 * Creates a custom schema.
 *
 * @param check The type check function.
 * @param message The error message.
 *
 * @returns A custom schema.
 */
declare function custom<TInput, const TMessage extends ErrorMessage<CustomIssue> | undefined = ErrorMessage<CustomIssue> | undefined>(check: Check, message: TMessage): CustomSchema<TInput, TMessage>;

/**
 * Check async type.
 */
type CheckAsync = (input: unknown) => MaybePromise<boolean>;
/**
 * Custom schema async interface.
 */
interface CustomSchemaAsync<TInput, TMessage extends ErrorMessage<CustomIssue> | undefined> extends BaseSchemaAsync<TInput, TInput, CustomIssue> {
    /**
     * The schema type.
     */
    readonly type: 'custom';
    /**
     * The schema reference.
     */
    readonly reference: typeof custom | typeof customAsync;
    /**
     * The expected property.
     */
    readonly expects: 'unknown';
    /**
     * The type check function.
     */
    readonly check: CheckAsync;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a custom schema.
 *
 * @param check The type check function.
 *
 * @returns A custom schema.
 */
declare function customAsync<TInput>(check: CheckAsync): CustomSchemaAsync<TInput, undefined>;
/**
 * Creates a custom schema.
 *
 * @param check The type check function.
 * @param message The error message.
 *
 * @returns A custom schema.
 */
declare function customAsync<TInput, const TMessage extends ErrorMessage<CustomIssue> | undefined = ErrorMessage<CustomIssue> | undefined>(check: CheckAsync, message: TMessage): CustomSchemaAsync<TInput, TMessage>;

/**
 * Date issue interface.
 */
interface DateIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'date';
    /**
     * The expected property.
     */
    readonly expected: 'Date';
}
/**
 * Date schema interface.
 */
interface DateSchema<TMessage extends ErrorMessage<DateIssue> | undefined> extends BaseSchema<Date, Date, DateIssue> {
    /**
     * The schema type.
     */
    readonly type: 'date';
    /**
     * The schema reference.
     */
    readonly reference: typeof date;
    /**
     * The expected property.
     */
    readonly expects: 'Date';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a date schema.
 *
 * @returns A date schema.
 */
declare function date(): DateSchema<undefined>;
/**
 * Creates a date schema.
 *
 * @param message The error message.
 *
 * @returns A date schema.
 */
declare function date<const TMessage extends ErrorMessage<DateIssue> | undefined>(message: TMessage): DateSchema<TMessage>;

/**
 * Enum interface.
 */
interface Enum {
    [key: string]: string | number;
}
/**
 * Enum values type.
 */
type EnumValues<TEnum extends Enum> = {
    [TKey in keyof TEnum]: TKey extends number ? TEnum[TKey] extends string ? TEnum[TEnum[TKey]] extends TKey ? never : TEnum[TKey] : TEnum[TKey] : TKey extends 'NaN' | 'Infinity' | '-Infinity' ? TEnum[TKey] extends string ? TEnum[TEnum[TKey]] extends number ? never : TEnum[TKey] : TEnum[TKey] : TKey extends `+${number}` ? TEnum[TKey] : TKey extends `${infer TNumber extends number}` ? TEnum[TKey] extends string ? TEnum[TEnum[TKey]] extends TNumber ? never : TEnum[TKey] : TEnum[TKey] : TEnum[TKey];
}[keyof TEnum];
/**
 * Enum issue interface.
 */
interface EnumIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'enum';
    /**
     * The expected property.
     */
    readonly expected: string;
}
/**
 * Enum schema interface.
 */
interface EnumSchema<TEnum extends Enum, TMessage extends ErrorMessage<EnumIssue> | undefined> extends BaseSchema<EnumValues<TEnum>, EnumValues<TEnum>, EnumIssue> {
    /**
     * The schema type.
     */
    readonly type: 'enum';
    /**
     * The schema reference.
     */
    readonly reference: typeof enum_;
    /**
     * The enum object.
     */
    readonly enum: TEnum;
    /**
     * The enum options.
     */
    readonly options: EnumValues<TEnum>[];
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an enum schema.
 *
 * @param enum__ The enum object.
 *
 * @returns An enum schema.
 */
declare function enum_<const TEnum extends Enum>(enum__: TEnum): EnumSchema<TEnum, undefined>;
/**
 * Creates an enum schema.
 *
 * @param enum__ The enum object.
 * @param message The error message.
 *
 * @returns An enum schema.
 */
declare function enum_<const TEnum extends Enum, const TMessage extends ErrorMessage<EnumIssue> | undefined>(enum__: TEnum, message: TMessage): EnumSchema<TEnum, TMessage>;

/**
 * Exact optional schema interface.
 */
interface ExactOptionalSchema<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TDefault extends Default<TWrapped, never>> extends BaseSchema<InferInput<TWrapped>, InferOutput<TWrapped>, InferIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'exact_optional';
    /**
     * The schema reference.
     */
    readonly reference: typeof exactOptional;
    /**
     * The expected property.
     */
    readonly expects: TWrapped['expects'];
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The default value.
     */
    readonly default: TDefault;
}
/**
 * Creates an exact optional schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns An exact optional schema.
 */
declare function exactOptional<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): ExactOptionalSchema<TWrapped, undefined>;
/**
 * Creates an exact optional schema.
 *
 * @param wrapped The wrapped schema.
 * @param default_ The default value.
 *
 * @returns An exact optional schema.
 */
declare function exactOptional<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TDefault extends Default<TWrapped, never>>(wrapped: TWrapped, default_: TDefault): ExactOptionalSchema<TWrapped, TDefault>;

/**
 * Exact optional schema async interface.
 */
interface ExactOptionalSchemaAsync<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TDefault extends DefaultAsync<TWrapped, never>> extends BaseSchemaAsync<InferInput<TWrapped>, InferOutput<TWrapped>, InferIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'exact_optional';
    /**
     * The schema reference.
     */
    readonly reference: typeof exactOptional | typeof exactOptionalAsync;
    /**
     * The expected property.
     */
    readonly expects: TWrapped['expects'];
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The default value.
     */
    readonly default: TDefault;
}
/**
 * Creates an exact optional schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns An exact optional schema.
 */
declare function exactOptionalAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): ExactOptionalSchemaAsync<TWrapped, undefined>;
/**
 * Creates an exact optional schema.
 *
 * @param wrapped The wrapped schema.
 * @param default_ The default value.
 *
 * @returns An exact optional schema.
 */
declare function exactOptionalAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TDefault extends DefaultAsync<TWrapped, never>>(wrapped: TWrapped, default_: TDefault): ExactOptionalSchemaAsync<TWrapped, TDefault>;

/**
 * File issue interface.
 */
interface FileIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'file';
    /**
     * The expected property.
     */
    readonly expected: 'File';
}
/**
 * File schema interface.
 */
interface FileSchema<TMessage extends ErrorMessage<FileIssue> | undefined> extends BaseSchema<File, File, FileIssue> {
    /**
     * The schema type.
     */
    readonly type: 'file';
    /**
     * The schema reference.
     */
    readonly reference: typeof file;
    /**
     * The expected property.
     */
    readonly expects: 'File';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a file schema.
 *
 * @returns A file schema.
 */
declare function file(): FileSchema<undefined>;
/**
 * Creates a file schema.
 *
 * @param message The error message.
 *
 * @returns A file schema.
 */
declare function file<const TMessage extends ErrorMessage<FileIssue> | undefined>(message: TMessage): FileSchema<TMessage>;

/**
 * Function issue interface.
 */
interface FunctionIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'function';
    /**
     * The expected property.
     */
    readonly expected: 'Function';
}
/**
 * Function schema interface.
 */
interface FunctionSchema<TMessage extends ErrorMessage<FunctionIssue> | undefined> extends BaseSchema<(...args: unknown[]) => unknown, (...args: unknown[]) => unknown, FunctionIssue> {
    /**
     * The schema type.
     */
    readonly type: 'function';
    /**
     * The schema reference.
     */
    readonly reference: typeof function_;
    /**
     * The expected property.
     */
    readonly expects: 'Function';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a function schema.
 *
 * @returns A function schema.
 */
declare function function_(): FunctionSchema<undefined>;
/**
 * Creates a function schema.
 *
 * @param message The error message.
 *
 * @returns A function schema.
 */
declare function function_<const TMessage extends ErrorMessage<FunctionIssue> | undefined>(message: TMessage): FunctionSchema<TMessage>;

/**
 * Class type.
 */
type Class = new (...args: any[]) => any;
/**
 * Instance issue interface.
 */
interface InstanceIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'instance';
    /**
     * The expected property.
     */
    readonly expected: string;
}
/**
 * Instance schema interface.
 */
interface InstanceSchema<TClass extends Class, TMessage extends ErrorMessage<InstanceIssue> | undefined> extends BaseSchema<InstanceType<TClass>, InstanceType<TClass>, InstanceIssue> {
    /**
     * The schema type.
     */
    readonly type: 'instance';
    /**
     * The schema reference.
     */
    readonly reference: typeof instance;
    /**
     * The class of the instance.
     */
    readonly class: TClass;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an instance schema.
 *
 * @param class_ The class of the instance.
 *
 * @returns An instance schema.
 */
declare function instance<TClass extends Class>(class_: TClass): InstanceSchema<TClass, undefined>;
/**
 * Creates an instance schema.
 *
 * @param class_ The class of the instance.
 * @param message The error message.
 *
 * @returns An instance schema.
 */
declare function instance<TClass extends Class, const TMessage extends ErrorMessage<InstanceIssue> | undefined>(class_: TClass, message: TMessage): InstanceSchema<TClass, TMessage>;

/**
 * Intersect issue interface.
 */
interface IntersectIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'intersect';
    /**
     * The expected property.
     */
    readonly expected: string;
}
/**
 * Intersect options type.
 */
type IntersectOptions = MaybeReadonly<BaseSchema<unknown, unknown, BaseIssue<unknown>>[]>;
/**
 * Intersect options async type.
 */
type IntersectOptionsAsync = MaybeReadonly<(BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>)[]>;
/**
 * Infer option type.
 */
type InferOption<TInput, TOutput> = BaseSchema<TInput, TOutput, BaseIssue<unknown>> | BaseSchemaAsync<TInput, TOutput, BaseIssue<unknown>>;
/**
 * Infer intersect input type.
 */
type InferIntersectInput<TOptions extends IntersectOptions | IntersectOptionsAsync> = TOptions extends readonly [
    InferOption<infer TInput, unknown>,
    ...infer TRest
] ? TRest extends readonly [
    InferOption<unknown, unknown>,
    ...InferOption<unknown, unknown>[]
] ? TInput & InferIntersectInput<TRest> : TInput : never;
/**
 * Infer intersect output type.
 */
type InferIntersectOutput<TOptions extends IntersectOptions | IntersectOptionsAsync> = TOptions extends readonly [
    InferOption<unknown, infer TOutput>,
    ...infer TRest
] ? TRest extends readonly [
    InferOption<unknown, unknown>,
    ...InferOption<unknown, unknown>[]
] ? TOutput & InferIntersectOutput<TRest> : TOutput : never;

/**
 * Intersect schema interface.
 */
interface IntersectSchema<TOptions extends IntersectOptions, TMessage extends ErrorMessage<IntersectIssue> | undefined> extends BaseSchema<InferIntersectInput<TOptions>, InferIntersectOutput<TOptions>, IntersectIssue | InferIssue<TOptions[number]>> {
    /**
     * The schema type.
     */
    readonly type: 'intersect';
    /**
     * The schema reference.
     */
    readonly reference: typeof intersect;
    /**
     * The intersect options.
     */
    readonly options: TOptions;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an intersect schema.
 *
 * @param options The intersect options.
 *
 * @returns An intersect schema.
 */
declare function intersect<const TOptions extends IntersectOptions>(options: TOptions): IntersectSchema<TOptions, undefined>;
/**
 * Creates an intersect schema.
 *
 * @param options The intersect options.
 * @param message The error message.
 *
 * @returns An intersect schema.
 */
declare function intersect<const TOptions extends IntersectOptions, const TMessage extends ErrorMessage<IntersectIssue> | undefined>(options: TOptions, message: TMessage): IntersectSchema<TOptions, TMessage>;

/**
 * Intersect schema async interface.
 */
interface IntersectSchemaAsync<TOptions extends IntersectOptionsAsync, TMessage extends ErrorMessage<IntersectIssue> | undefined> extends BaseSchemaAsync<InferIntersectInput<TOptions>, InferIntersectOutput<TOptions>, IntersectIssue | InferIssue<TOptions[number]>> {
    /**
     * The schema type.
     */
    readonly type: 'intersect';
    /**
     * The schema reference.
     */
    readonly reference: typeof intersect | typeof intersectAsync;
    /**
     * The intersect options.
     */
    readonly options: TOptions;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an intersect schema.
 *
 * @param options The intersect options.
 *
 * @returns An intersect schema.
 */
declare function intersectAsync<const TOptions extends IntersectOptionsAsync>(options: TOptions): IntersectSchemaAsync<TOptions, undefined>;
/**
 * Creates an intersect schema.
 *
 * @param options The intersect options.
 * @param message The error message.
 *
 * @returns An intersect schema.
 */
declare function intersectAsync<const TOptions extends IntersectOptionsAsync, const TMessage extends ErrorMessage<IntersectIssue> | undefined>(options: TOptions, message: TMessage): IntersectSchemaAsync<TOptions, TMessage>;

/**
 * Lazy schema interface.
 */
interface LazySchema<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>> extends BaseSchema<InferInput<TWrapped>, InferOutput<TWrapped>, InferIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'lazy';
    /**
     * The schema reference.
     */
    readonly reference: typeof lazy;
    /**
     * The expected property.
     */
    readonly expects: 'unknown';
    /**
     * The schema getter.
     */
    readonly getter: (input: unknown) => TWrapped;
}
/**
 * Creates a lazy schema.
 *
 * @param getter The schema getter.
 *
 * @returns A lazy schema.
 */
declare function lazy<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(getter: (input: unknown) => TWrapped): LazySchema<TWrapped>;

/**
 * Lazy schema async interface.
 */
interface LazySchemaAsync<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> extends BaseSchemaAsync<InferInput<TWrapped>, InferOutput<TWrapped>, InferIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'lazy';
    /**
     * The schema reference.
     */
    readonly reference: typeof lazy | typeof lazyAsync;
    /**
     * The expected property.
     */
    readonly expects: 'unknown';
    /**
     * The schema getter.
     */
    readonly getter: (input: unknown) => MaybePromise<TWrapped>;
}
/**
 * Creates a lazy schema.
 *
 * @param getter The schema getter.
 *
 * @returns A lazy schema.
 */
declare function lazyAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(getter: (input: unknown) => MaybePromise<TWrapped>): LazySchemaAsync<TWrapped>;

/**
 * Literal type.
 */
type Literal = bigint | boolean | number | string | symbol;
/**
 * Literal issue interface.
 */
interface LiteralIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'literal';
    /**
     * The expected property.
     */
    readonly expected: string;
}
/**
 * Literal schema interface.
 */
interface LiteralSchema<TLiteral extends Literal, TMessage extends ErrorMessage<LiteralIssue> | undefined> extends BaseSchema<TLiteral, TLiteral, LiteralIssue> {
    /**
     * The schema type.
     */
    readonly type: 'literal';
    /**
     * The schema reference.
     */
    readonly reference: typeof literal;
    /**
     * The literal value.
     */
    readonly literal: TLiteral;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a literal schema.
 *
 * @param literal_ The literal value.
 *
 * @returns A literal schema.
 */
declare function literal<const TLiteral extends Literal>(literal_: TLiteral): LiteralSchema<TLiteral, undefined>;
/**
 * Creates a literal schema.
 *
 * @param literal_ The literal value.
 * @param message The error message.
 *
 * @returns A literal schema.
 */
declare function literal<const TLiteral extends Literal, const TMessage extends ErrorMessage<LiteralIssue> | undefined>(literal_: TLiteral, message: TMessage): LiteralSchema<TLiteral, TMessage>;

/**
 * Loose object issue interface.
 */
interface LooseObjectIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'loose_object';
    /**
     * The expected property.
     */
    readonly expected: 'Object' | `"${string}"`;
}

/**
 * Loose object schema interface.
 */
interface LooseObjectSchema<TEntries extends ObjectEntries, TMessage extends ErrorMessage<LooseObjectIssue> | undefined> extends BaseSchema<InferObjectInput<TEntries> & {
    [key: string]: unknown;
}, InferObjectOutput<TEntries> & {
    [key: string]: unknown;
}, LooseObjectIssue | InferObjectIssue<TEntries>> {
    /**
     * The schema type.
     */
    readonly type: 'loose_object';
    /**
     * The schema reference.
     */
    readonly reference: typeof looseObject;
    /**
     * The expected property.
     */
    readonly expects: 'Object';
    /**
     * The entries schema.
     */
    readonly entries: TEntries;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a loose object schema.
 *
 * @param entries The entries schema.
 *
 * @returns A loose object schema.
 */
declare function looseObject<const TEntries extends ObjectEntries>(entries: TEntries): LooseObjectSchema<TEntries, undefined>;
/**
 * Creates a loose object schema.
 *
 * @param entries The entries schema.
 * @param message The error message.
 *
 * @returns A loose object schema.
 */
declare function looseObject<const TEntries extends ObjectEntries, const TMessage extends ErrorMessage<LooseObjectIssue> | undefined>(entries: TEntries, message: TMessage): LooseObjectSchema<TEntries, TMessage>;

/**
 * Object schema async interface.
 */
interface LooseObjectSchemaAsync<TEntries extends ObjectEntriesAsync, TMessage extends ErrorMessage<LooseObjectIssue> | undefined> extends BaseSchemaAsync<InferObjectInput<TEntries> & {
    [key: string]: unknown;
}, InferObjectOutput<TEntries> & {
    [key: string]: unknown;
}, LooseObjectIssue | InferObjectIssue<TEntries>> {
    /**
     * The schema type.
     */
    readonly type: 'loose_object';
    /**
     * The schema reference.
     */
    readonly reference: typeof looseObject | typeof looseObjectAsync;
    /**
     * The expected property.
     */
    readonly expects: 'Object';
    /**
     * The entries schema.
     */
    readonly entries: TEntries;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a loose object schema.
 *
 * @param entries The entries schema.
 *
 * @returns A loose object schema.
 */
declare function looseObjectAsync<const TEntries extends ObjectEntriesAsync>(entries: TEntries): LooseObjectSchemaAsync<TEntries, undefined>;
/**
 * Creates a loose object schema.
 *
 * @param entries The entries schema.
 * @param message The error message.
 *
 * @returns A loose object schema.
 */
declare function looseObjectAsync<const TEntries extends ObjectEntriesAsync, const TMessage extends ErrorMessage<LooseObjectIssue> | undefined>(entries: TEntries, message: TMessage): LooseObjectSchemaAsync<TEntries, TMessage>;

/**
 * Loose tuple issue interface.
 */
interface LooseTupleIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'loose_tuple';
    /**
     * The expected property.
     */
    readonly expected: 'Array';
}

/**
 * Loose tuple schema interface.
 */
interface LooseTupleSchema<TItems extends TupleItems, TMessage extends ErrorMessage<LooseTupleIssue> | undefined> extends BaseSchema<[
    ...InferTupleInput<TItems>,
    ...unknown[]
], [
    ...InferTupleOutput<TItems>,
    ...unknown[]
], LooseTupleIssue | InferTupleIssue<TItems>> {
    /**
     * The schema type.
     */
    readonly type: 'loose_tuple';
    /**
     * The schema reference.
     */
    readonly reference: typeof looseTuple;
    /**
     * The expected property.
     */
    readonly expects: 'Array';
    /**
     * The items schema.
     */
    readonly items: TItems;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a loose tuple schema.
 *
 * @param items The items schema.
 *
 * @returns A loose tuple schema.
 */
declare function looseTuple<const TItems extends TupleItems>(items: TItems): LooseTupleSchema<TItems, undefined>;
/**
 * Creates a loose tuple schema.
 *
 * @param items The items schema.
 * @param message The error message.
 *
 * @returns A loose tuple schema.
 */
declare function looseTuple<const TItems extends TupleItems, const TMessage extends ErrorMessage<LooseTupleIssue> | undefined>(items: TItems, message: TMessage): LooseTupleSchema<TItems, TMessage>;

/**
 * Loose tuple schema async interface.
 */
interface LooseTupleSchemaAsync<TItems extends TupleItemsAsync, TMessage extends ErrorMessage<LooseTupleIssue> | undefined> extends BaseSchemaAsync<[
    ...InferTupleInput<TItems>,
    ...unknown[]
], [
    ...InferTupleOutput<TItems>,
    ...unknown[]
], LooseTupleIssue | InferTupleIssue<TItems>> {
    /**
     * The schema type.
     */
    readonly type: 'loose_tuple';
    /**
     * The schema reference.
     */
    readonly reference: typeof looseTuple | typeof looseTupleAsync;
    /**
     * The expected property.
     */
    readonly expects: 'Array';
    /**
     * The items schema.
     */
    readonly items: TItems;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a loose tuple schema.
 *
 * @param items The items schema.
 *
 * @returns A loose tuple schema.
 */
declare function looseTupleAsync<const TItems extends TupleItemsAsync>(items: TItems): LooseTupleSchemaAsync<TItems, undefined>;
/**
 * Creates a loose tuple schema.
 *
 * @param items The items schema.
 * @param message The error message.
 *
 * @returns A loose tuple schema.
 */
declare function looseTupleAsync<const TItems extends TupleItemsAsync, const TMessage extends ErrorMessage<LooseTupleIssue> | undefined>(items: TItems, message: TMessage): LooseTupleSchemaAsync<TItems, TMessage>;

/**
 * Map issue interface.
 */
interface MapIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'map';
    /**
     * The expected property.
     */
    readonly expected: 'Map';
}
/**
 * Infer map input type.
 */
type InferMapInput<TKey extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = Map<InferInput<TKey>, InferInput<TValue>>;
/**
 * Infer map output type.
 */
type InferMapOutput<TKey extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = Map<InferOutput<TKey>, InferOutput<TValue>>;

/**
 * Map schema interface.
 */
interface MapSchema<TKey extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<MapIssue> | undefined> extends BaseSchema<InferMapInput<TKey, TValue>, InferMapOutput<TKey, TValue>, MapIssue | InferIssue<TKey> | InferIssue<TValue>> {
    /**
     * The schema type.
     */
    readonly type: 'map';
    /**
     * The schema reference.
     */
    readonly reference: typeof map;
    /**
     * The expected property.
     */
    readonly expects: 'Map';
    /**
     * The map key schema.
     */
    readonly key: TKey;
    /**
     * The map value schema.
     */
    readonly value: TValue;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a map schema.
 *
 * @param key The key schema.
 * @param value The value schema.
 *
 * @returns A map schema.
 */
declare function map<const TKey extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(key: TKey, value: TValue): MapSchema<TKey, TValue, undefined>;
/**
 * Creates a map schema.
 *
 * @param key The key schema.
 * @param value The value schema.
 * @param message The error message.
 *
 * @returns A map schema.
 */
declare function map<const TKey extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<MapIssue> | undefined>(key: TKey, value: TValue, message: TMessage): MapSchema<TKey, TValue, TMessage>;

/**
 * Map schema async interface.
 */
interface MapSchemaAsync<TKey extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<MapIssue> | undefined> extends BaseSchemaAsync<InferMapInput<TKey, TValue>, InferMapOutput<TKey, TValue>, MapIssue | InferIssue<TKey> | InferIssue<TValue>> {
    /**
     * The schema type.
     */
    readonly type: 'map';
    /**
     * The schema reference.
     */
    readonly reference: typeof map | typeof mapAsync;
    /**
     * The expected property.
     */
    readonly expects: 'Map';
    /**
     * The map key schema.
     */
    readonly key: TKey;
    /**
     * The map value schema.
     */
    readonly value: TValue;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a map schema.
 *
 * @param key The key schema.
 * @param value The value schema.
 *
 * @returns A map schema.
 */
declare function mapAsync<const TKey extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(key: TKey, value: TValue): MapSchemaAsync<TKey, TValue, undefined>;
/**
 * Creates a map schema.
 *
 * @param key The key schema.
 * @param value The value schema.
 * @param message The error message.
 *
 * @returns A map schema.
 */
declare function mapAsync<const TKey extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<MapIssue> | undefined>(key: TKey, value: TValue, message: TMessage): MapSchemaAsync<TKey, TValue, TMessage>;

/**
 * NaN issue interface.
 */
interface NanIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'nan';
    /**
     * The expected property.
     */
    readonly expected: 'NaN';
}
/**
 * NaN schema interface.
 */
interface NanSchema<TMessage extends ErrorMessage<NanIssue> | undefined> extends BaseSchema<number, number, NanIssue> {
    /**
     * The schema type.
     */
    readonly type: 'nan';
    /**
     * The schema reference.
     */
    readonly reference: typeof nan;
    /**
     * The expected property.
     */
    readonly expects: 'NaN';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a NaN schema.
 *
 * @returns A NaN schema.
 */
declare function nan(): NanSchema<undefined>;
/**
 * Creates a NaN schema.
 *
 * @param message The error message.
 *
 * @returns A NaN schema.
 */
declare function nan<const TMessage extends ErrorMessage<NanIssue> | undefined>(message: TMessage): NanSchema<TMessage>;

/**
 * Never issue interface.
 */
interface NeverIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'never';
    /**
     * The expected property.
     */
    readonly expected: 'never';
}
/**
 * Never schema interface.
 */
interface NeverSchema<TMessage extends ErrorMessage<NeverIssue> | undefined> extends BaseSchema<never, never, NeverIssue> {
    /**
     * The schema type.
     */
    readonly type: 'never';
    /**
     * The schema reference.
     */
    readonly reference: typeof never;
    /**
     * The expected property.
     */
    readonly expects: 'never';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a never schema.
 *
 * @returns A never schema.
 */
declare function never(): NeverSchema<undefined>;
/**
 * Creates a never schema.
 *
 * @param message The error message.
 *
 * @returns A never schema.
 */
declare function never<const TMessage extends ErrorMessage<NeverIssue> | undefined>(message: TMessage): NeverSchema<TMessage>;

/**
 * Union issue interface.
 */
interface UnionIssue<TSubIssue extends BaseIssue<unknown>> extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'union';
    /**
     * The expected property.
     */
    readonly expected: string;
    /**
     * The sub issues.
     */
    readonly issues?: [TSubIssue, ...TSubIssue[]];
}

/**
 * Union options type.
 */
type UnionOptions = MaybeReadonly<BaseSchema<unknown, unknown, BaseIssue<unknown>>[]>;
/**
 * Union schema interface.
 */
interface UnionSchema<TOptions extends UnionOptions, TMessage extends ErrorMessage<UnionIssue<InferIssue<TOptions[number]>>> | undefined> extends BaseSchema<InferInput<TOptions[number]>, InferOutput<TOptions[number]>, UnionIssue<InferIssue<TOptions[number]>> | InferIssue<TOptions[number]>> {
    /**
     * The schema type.
     */
    readonly type: 'union';
    /**
     * The schema reference.
     */
    readonly reference: typeof union;
    /**
     * The union options.
     */
    readonly options: TOptions;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an union schema.
 *
 * @param options The union options.
 *
 * @returns An union schema.
 */
declare function union<const TOptions extends UnionOptions>(options: TOptions): UnionSchema<TOptions, undefined>;
/**
 * Creates an union schema.
 *
 * @param options The union options.
 * @param message The error message.
 *
 * @returns An union schema.
 */
declare function union<const TOptions extends UnionOptions, const TMessage extends ErrorMessage<UnionIssue<InferIssue<TOptions[number]>>> | undefined>(options: TOptions, message: TMessage): UnionSchema<TOptions, TMessage>;

/**
 * Union options async type.
 */
type UnionOptionsAsync = MaybeReadonly<(BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>)[]>;
/**
 * Union schema async interface.
 */
interface UnionSchemaAsync<TOptions extends UnionOptionsAsync, TMessage extends ErrorMessage<UnionIssue<InferIssue<TOptions[number]>>> | undefined> extends BaseSchemaAsync<InferInput<TOptions[number]>, InferOutput<TOptions[number]>, UnionIssue<InferIssue<TOptions[number]>> | InferIssue<TOptions[number]>> {
    /**
     * The schema type.
     */
    readonly type: 'union';
    /**
     * The schema reference.
     */
    readonly reference: typeof union | typeof unionAsync;
    /**
     * The union options.
     */
    readonly options: TOptions;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an union schema.
 *
 * @param options The union options.
 *
 * @returns An union schema.
 */
declare function unionAsync<const TOptions extends UnionOptionsAsync>(options: TOptions): UnionSchemaAsync<TOptions, undefined>;
/**
 * Creates an union schema.
 *
 * @param options The union options.
 * @param message The error message.
 *
 * @returns An union schema.
 */
declare function unionAsync<const TOptions extends UnionOptionsAsync, const TMessage extends ErrorMessage<UnionIssue<InferIssue<TOptions[number]>>> | undefined>(options: TOptions, message: TMessage): UnionSchemaAsync<TOptions, TMessage>;

/**
 * Non nullable issue interface.
 */
interface NonNullableIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'non_nullable';
    /**
     * The expected property.
     */
    readonly expected: '!null';
}
/**
 * Infer non nullable input type.
 */
type InferNonNullableInput<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = NonNullable$1<InferInput<TWrapped>>;
/**
 * Infer non nullable output type.
 */
type InferNonNullableOutput<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = NonNullable$1<InferOutput<TWrapped>>;
/**
 * Infer non nullable issue type.
 */
type InferNonNullableIssue<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = TWrapped extends UnionSchema<UnionOptions, ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined> | UnionSchemaAsync<UnionOptionsAsync, ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined> ? Exclude<InferIssue<TWrapped>, {
    type: 'null' | 'union';
}> | UnionIssue<InferNonNullableIssue<TWrapped['options'][number]>> : Exclude<InferIssue<TWrapped>, {
    type: 'null';
}>;

/**
 * Non nullable schema interface.
 */
interface NonNullableSchema<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<NonNullableIssue> | undefined> extends BaseSchema<InferNonNullableInput<TWrapped>, InferNonNullableOutput<TWrapped>, NonNullableIssue | InferNonNullableIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'non_nullable';
    /**
     * The schema reference.
     */
    readonly reference: typeof nonNullable;
    /**
     * The expected property.
     */
    readonly expects: '!null';
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a non nullable schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns A non nullable schema.
 */
declare function nonNullable<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): NonNullableSchema<TWrapped, undefined>;
/**
 * Creates a non nullable schema.
 *
 * @param wrapped The wrapped schema.
 * @param message The error message.
 *
 * @returns A non nullable schema.
 */
declare function nonNullable<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<NonNullableIssue> | undefined>(wrapped: TWrapped, message: TMessage): NonNullableSchema<TWrapped, TMessage>;

/**
 * Non nullable schema async interface.
 */
interface NonNullableSchemaAsync<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<NonNullableIssue> | undefined> extends BaseSchemaAsync<InferNonNullableInput<TWrapped>, InferNonNullableOutput<TWrapped>, NonNullableIssue | InferNonNullableIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'non_nullable';
    /**
     * The schema reference.
     */
    readonly reference: typeof nonNullable | typeof nonNullableAsync;
    /**
     * The expected property.
     */
    readonly expects: '!null';
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a non nullable schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns A non nullable schema.
 */
declare function nonNullableAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): NonNullableSchemaAsync<TWrapped, undefined>;
/**
 * Creates a non nullable schema.
 *
 * @param wrapped The wrapped schema.
 * @param message The error message.
 *
 * @returns A non nullable schema.
 */
declare function nonNullableAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<NonNullableIssue> | undefined>(wrapped: TWrapped, message: TMessage): NonNullableSchemaAsync<TWrapped, TMessage>;

/**
 * Non nullish issue interface.
 */
interface NonNullishIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'non_nullish';
    /**
     * The expected property.
     */
    readonly expected: '(!null & !undefined)';
}
/**
 * Infer non nullish input type.
 */
type InferNonNullishInput<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = NonNullish<InferInput<TWrapped>>;
/**
 * Infer non nullish output type.
 */
type InferNonNullishOutput<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = NonNullish<InferOutput<TWrapped>>;
/**
 * Infer non nullish issue type.
 */
type InferNonNullishIssue<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = TWrapped extends UnionSchema<UnionOptions, ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined> | UnionSchemaAsync<UnionOptionsAsync, ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined> ? Exclude<InferIssue<TWrapped>, {
    type: 'null' | 'undefined' | 'union';
}> | UnionIssue<InferNonNullishIssue<TWrapped['options'][number]>> : Exclude<InferIssue<TWrapped>, {
    type: 'null' | 'undefined';
}>;

/**
 * Non nullish schema interface.
 */
interface NonNullishSchema<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<NonNullishIssue> | undefined> extends BaseSchema<InferNonNullishInput<TWrapped>, InferNonNullishOutput<TWrapped>, NonNullishIssue | InferNonNullishIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'non_nullish';
    /**
     * The schema reference.
     */
    readonly reference: typeof nonNullish;
    /**
     * The expected property.
     */
    readonly expects: '(!null & !undefined)';
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a non nullish schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns A non nullish schema.
 */
declare function nonNullish<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): NonNullishSchema<TWrapped, undefined>;
/**
 * Creates a non nullish schema.
 *
 * @param wrapped The wrapped schema.
 * @param message The error message.
 *
 * @returns A non nullish schema.
 */
declare function nonNullish<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<NonNullishIssue> | undefined>(wrapped: TWrapped, message: TMessage): NonNullishSchema<TWrapped, TMessage>;

/**
 * Non nullish schema async interface.
 */
interface NonNullishSchemaAsync<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<NonNullishIssue> | undefined> extends BaseSchemaAsync<InferNonNullishInput<TWrapped>, InferNonNullishOutput<TWrapped>, NonNullishIssue | InferNonNullishIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'non_nullish';
    /**
     * The schema reference.
     */
    readonly reference: typeof nonNullish | typeof nonNullishAsync;
    /**
     * The expected property.
     */
    readonly expects: '(!null & !undefined)';
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a non nullish schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns A non nullish schema.
 */
declare function nonNullishAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): NonNullishSchemaAsync<TWrapped, undefined>;
/**
 * Creates a non nullish schema.
 *
 * @param wrapped The wrapped schema.
 * @param message The error message.
 *
 * @returns A non nullish schema.
 */
declare function nonNullishAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<NonNullishIssue> | undefined>(wrapped: TWrapped, message: TMessage): NonNullishSchemaAsync<TWrapped, TMessage>;

/**
 * Non optional issue interface.
 */
interface NonOptionalIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'non_optional';
    /**
     * The expected property.
     */
    readonly expected: '!undefined';
}
/**
 * Infer non optional input type.
 */
type InferNonOptionalInput<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = NonOptional<InferInput<TWrapped>>;
/**
 * Infer non optional output type.
 */
type InferNonOptionalOutput<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = NonOptional<InferOutput<TWrapped>>;
/**
 * Infer non optional issue type.
 */
type InferNonOptionalIssue<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = TWrapped extends UnionSchema<UnionOptions, ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined> | UnionSchemaAsync<UnionOptionsAsync, ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined> ? Exclude<InferIssue<TWrapped>, {
    type: 'undefined' | 'union';
}> | UnionIssue<InferNonOptionalIssue<TWrapped['options'][number]>> : Exclude<InferIssue<TWrapped>, {
    type: 'undefined';
}>;

/**
 * Non optional schema interface.
 */
interface NonOptionalSchema<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<NonOptionalIssue> | undefined> extends BaseSchema<InferNonOptionalInput<TWrapped>, InferNonOptionalOutput<TWrapped>, NonOptionalIssue | InferNonOptionalIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'non_optional';
    /**
     * The schema reference.
     */
    readonly reference: typeof nonOptional;
    /**
     * The expected property.
     */
    readonly expects: '!undefined';
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a non optional schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns A non optional schema.
 */
declare function nonOptional<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): NonOptionalSchema<TWrapped, undefined>;
/**
 * Creates a non optional schema.
 *
 * @param wrapped The wrapped schema.
 * @param message The error message.
 *
 * @returns A non optional schema.
 */
declare function nonOptional<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<NonOptionalIssue> | undefined>(wrapped: TWrapped, message: TMessage): NonOptionalSchema<TWrapped, TMessage>;

/**
 * Non optional schema async interface.
 */
interface NonOptionalSchemaAsync<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<NonOptionalIssue> | undefined> extends BaseSchemaAsync<InferNonOptionalInput<TWrapped>, InferNonOptionalOutput<TWrapped>, NonOptionalIssue | InferNonOptionalIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'non_optional';
    /**
     * The schema reference.
     */
    readonly reference: typeof nonOptional | typeof nonOptionalAsync;
    /**
     * The expected property.
     */
    readonly expects: '!undefined';
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a non optional schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns A non optional schema.
 */
declare function nonOptionalAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): NonOptionalSchemaAsync<TWrapped, undefined>;
/**
 * Creates a non optional schema.
 *
 * @param wrapped The wrapped schema.
 * @param message The error message.
 *
 * @returns A non optional schema.
 */
declare function nonOptionalAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<NonOptionalIssue> | undefined>(wrapped: TWrapped, message: TMessage): NonOptionalSchemaAsync<TWrapped, TMessage>;

/**
 * Null issue interface.
 */
interface NullIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'null';
    /**
     * The expected property.
     */
    readonly expected: 'null';
}
/**
 * Null schema interface.
 */
interface NullSchema<TMessage extends ErrorMessage<NullIssue> | undefined> extends BaseSchema<null, null, NullIssue> {
    /**
     * The schema type.
     */
    readonly type: 'null';
    /**
     * The schema reference.
     */
    readonly reference: typeof null_;
    /**
     * The expected property.
     */
    readonly expects: 'null';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a null schema.
 *
 * @returns A null schema.
 */
declare function null_(): NullSchema<undefined>;
/**
 * Creates a null schema.
 *
 * @param message The error message.
 *
 * @returns A null schema.
 */
declare function null_<const TMessage extends ErrorMessage<NullIssue> | undefined>(message: TMessage): NullSchema<TMessage>;

/**
 * Infer nullable output type.
 */
type InferNullableOutput<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TDefault extends DefaultAsync<TWrapped, null>> = undefined extends TDefault ? InferOutput<TWrapped> | null : InferOutput<TWrapped> | Extract<DefaultValue<TDefault>, null>;

/**
 * Nullable schema interface.
 */
interface NullableSchema<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TDefault extends Default<TWrapped, null>> extends BaseSchema<InferInput<TWrapped> | null, InferNullableOutput<TWrapped, TDefault>, InferIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'nullable';
    /**
     * The schema reference.
     */
    readonly reference: typeof nullable;
    /**
     * The expected property.
     */
    readonly expects: `(${TWrapped['expects']} | null)`;
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The default value.
     */
    readonly default: TDefault;
}
/**
 * Creates a nullable schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns A nullable schema.
 */
declare function nullable<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): NullableSchema<TWrapped, undefined>;
/**
 * Creates a nullable schema.
 *
 * @param wrapped The wrapped schema.
 * @param default_ The default value.
 *
 * @returns A nullable schema.
 */
declare function nullable<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TDefault extends Default<TWrapped, null>>(wrapped: TWrapped, default_: TDefault): NullableSchema<TWrapped, TDefault>;

/**
 * Nullable schema async interface.
 */
interface NullableSchemaAsync<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TDefault extends DefaultAsync<TWrapped, null>> extends BaseSchemaAsync<InferInput<TWrapped> | null, InferNullableOutput<TWrapped, TDefault>, InferIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'nullable';
    /**
     * The schema reference.
     */
    readonly reference: typeof nullable | typeof nullableAsync;
    /**
     * The expected property.
     */
    readonly expects: `(${TWrapped['expects']} | null)`;
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The default value.
     */
    readonly default: TDefault;
}
/**
 * Creates a nullable schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns A nullable schema.
 */
declare function nullableAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): NullableSchemaAsync<TWrapped, undefined>;
/**
 * Creates a nullable schema.
 *
 * @param wrapped The wrapped schema.
 * @param default_ The default value.
 *
 * @returns A nullable schema.
 */
declare function nullableAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TDefault extends DefaultAsync<TWrapped, null>>(wrapped: TWrapped, default_: TDefault): NullableSchemaAsync<TWrapped, TDefault>;

/**
 * Infer nullish output type.
 */
type InferNullishOutput<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TDefault extends DefaultAsync<TWrapped, null | undefined>> = undefined extends TDefault ? InferOutput<TWrapped> | null | undefined : InferOutput<TWrapped> | Extract<DefaultValue<TDefault>, null | undefined>;

/**
 * Nullish schema interface.
 */
interface NullishSchema<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TDefault extends Default<TWrapped, null | undefined>> extends BaseSchema<InferInput<TWrapped> | null | undefined, InferNullishOutput<TWrapped, TDefault>, InferIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'nullish';
    /**
     * The schema reference.
     */
    readonly reference: typeof nullish;
    /**
     * The expected property.
     */
    readonly expects: `(${TWrapped['expects']} | null | undefined)`;
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The default value.
     */
    readonly default: TDefault;
}
/**
 * Creates a nullish schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns A nullish schema.
 */
declare function nullish<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): NullishSchema<TWrapped, undefined>;
/**
 * Creates a nullish schema.
 *
 * @param wrapped The wrapped schema.
 * @param default_ The default value.
 *
 * @returns A nullish schema.
 */
declare function nullish<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TDefault extends Default<TWrapped, null | undefined>>(wrapped: TWrapped, default_: TDefault): NullishSchema<TWrapped, TDefault>;

/**
 * Nullish schema async interface.
 */
interface NullishSchemaAsync<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TDefault extends DefaultAsync<TWrapped, null | undefined>> extends BaseSchemaAsync<InferInput<TWrapped> | null | undefined, InferNullishOutput<TWrapped, TDefault>, InferIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'nullish';
    /**
     * The schema reference.
     */
    readonly reference: typeof nullish | typeof nullishAsync;
    /**
     * The expected property.
     */
    readonly expects: `(${TWrapped['expects']} | null | undefined)`;
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The default value.
     */
    readonly default: TDefault;
}
/**
 * Creates a nullish schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns A nullish schema.
 */
declare function nullishAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): NullishSchemaAsync<TWrapped, undefined>;
/**
 * Creates a nullish schema.
 *
 * @param wrapped The wrapped schema.
 * @param default_ The default value.
 *
 * @returns A nullish schema.
 */
declare function nullishAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TDefault extends DefaultAsync<TWrapped, null | undefined>>(wrapped: TWrapped, default_: TDefault): NullishSchemaAsync<TWrapped, TDefault>;

/**
 * Number issue interface.
 */
interface NumberIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'number';
    /**
     * The expected property.
     */
    readonly expected: 'number';
}
/**
 * Number schema interface.
 */
interface NumberSchema<TMessage extends ErrorMessage<NumberIssue> | undefined> extends BaseSchema<number, number, NumberIssue> {
    /**
     * The schema type.
     */
    readonly type: 'number';
    /**
     * The schema reference.
     */
    readonly reference: typeof number;
    /**
     * The expected property.
     */
    readonly expects: 'number';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a number schema.
 *
 * @returns A number schema.
 */
declare function number(): NumberSchema<undefined>;
/**
 * Creates a number schema.
 *
 * @param message The error message.
 *
 * @returns A number schema.
 */
declare function number<const TMessage extends ErrorMessage<NumberIssue> | undefined>(message: TMessage): NumberSchema<TMessage>;

/**
 * Object issue interface.
 */
interface ObjectIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'object';
    /**
     * The expected property.
     */
    readonly expected: 'Object' | `"${string}"`;
}

/**
 * Object schema interface.
 */
interface ObjectSchema<TEntries extends ObjectEntries, TMessage extends ErrorMessage<ObjectIssue> | undefined> extends BaseSchema<InferObjectInput<TEntries>, InferObjectOutput<TEntries>, ObjectIssue | InferObjectIssue<TEntries>> {
    /**
     * The schema type.
     */
    readonly type: 'object';
    /**
     * The schema reference.
     */
    readonly reference: typeof object;
    /**
     * The expected property.
     */
    readonly expects: 'Object';
    /**
     * The entries schema.
     */
    readonly entries: TEntries;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an object schema.
 *
 * Hint: This schema removes unknown entries. The output will only include the
 * entries you specify. To include unknown entries, use `looseObject`. To
 * return an issue for unknown entries, use `strictObject`. To include and
 * validate unknown entries, use `objectWithRest`.
 *
 * @param entries The entries schema.
 *
 * @returns An object schema.
 */
declare function object<const TEntries extends ObjectEntries>(entries: TEntries): ObjectSchema<TEntries, undefined>;
/**
 * Creates an object schema.
 *
 * Hint: This schema removes unknown entries. The output will only include the
 * entries you specify. To include unknown entries, use `looseObject`. To
 * return an issue for unknown entries, use `strictObject`. To include and
 * validate unknown entries, use `objectWithRest`.
 *
 * @param entries The entries schema.
 * @param message The error message.
 *
 * @returns An object schema.
 */
declare function object<const TEntries extends ObjectEntries, const TMessage extends ErrorMessage<ObjectIssue> | undefined>(entries: TEntries, message: TMessage): ObjectSchema<TEntries, TMessage>;

/**
 * Object schema async interface.
 */
interface ObjectSchemaAsync<TEntries extends ObjectEntriesAsync, TMessage extends ErrorMessage<ObjectIssue> | undefined> extends BaseSchemaAsync<InferObjectInput<TEntries>, InferObjectOutput<TEntries>, ObjectIssue | InferObjectIssue<TEntries>> {
    /**
     * The schema type.
     */
    readonly type: 'object';
    /**
     * The schema reference.
     */
    readonly reference: typeof object | typeof objectAsync;
    /**
     * The expected property.
     */
    readonly expects: 'Object';
    /**
     * The entries schema.
     */
    readonly entries: TEntries;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an object schema.
 *
 * Hint: This schema removes unknown entries. The output will only include the
 * entries you specify. To include unknown entries, use `looseObjectAsync`. To
 * return an issue for unknown entries, use `strictObjectAsync`. To include and
 * validate unknown entries, use `objectWithRestAsync`.
 *
 * @param entries The entries schema.
 *
 * @returns An object schema.
 */
declare function objectAsync<const TEntries extends ObjectEntriesAsync>(entries: TEntries): ObjectSchemaAsync<TEntries, undefined>;
/**
 * Creates an object schema.
 *
 * Hint: This schema removes unknown entries. The output will only include the
 * entries you specify. To include unknown entries, use `looseObjectAsync`. To
 * return an issue for unknown entries, use `strictObjectAsync`. To include and
 * validate unknown entries, use `objectWithRestAsync`.
 *
 * @param entries The entries schema.
 * @param message The error message.
 *
 * @returns An object schema.
 */
declare function objectAsync<const TEntries extends ObjectEntriesAsync, const TMessage extends ErrorMessage<ObjectIssue> | undefined>(entries: TEntries, message: TMessage): ObjectSchemaAsync<TEntries, TMessage>;

/**
 * Object with rest issue interface.
 */
interface ObjectWithRestIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'object_with_rest';
    /**
     * The expected property.
     */
    readonly expected: 'Object' | `"${string}"`;
}

/**
 * Object with rest schema interface.
 */
interface ObjectWithRestSchema<TEntries extends ObjectEntries, TRest extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<ObjectWithRestIssue> | undefined> extends BaseSchema<InferObjectInput<TEntries> & {
    [key: string]: InferInput<TRest>;
}, InferObjectOutput<TEntries> & {
    [key: string]: InferOutput<TRest>;
}, ObjectWithRestIssue | InferObjectIssue<TEntries> | InferIssue<TRest>> {
    /**
     * The schema type.
     */
    readonly type: 'object_with_rest';
    /**
     * The schema reference.
     */
    readonly reference: typeof objectWithRest;
    /**
     * The expected property.
     */
    readonly expects: 'Object';
    /**
     * The entries schema.
     */
    readonly entries: TEntries;
    /**
     * The rest schema.
     */
    readonly rest: TRest;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an object with rest schema.
 *
 * @param entries The entries schema.
 * @param rest The rest schema.
 *
 * @returns An object with rest schema.
 */
declare function objectWithRest<const TEntries extends ObjectEntries, const TRest extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(entries: TEntries, rest: TRest): ObjectWithRestSchema<TEntries, TRest, undefined>;
/**
 * Creates an object with rest schema.
 *
 * @param entries The entries schema.
 * @param rest The rest schema.
 * @param message The error message.
 *
 * @returns An object with rest schema.
 */
declare function objectWithRest<const TEntries extends ObjectEntries, const TRest extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<ObjectWithRestIssue> | undefined>(entries: TEntries, rest: TRest, message: TMessage): ObjectWithRestSchema<TEntries, TRest, TMessage>;

/**
 * Object schema async interface.
 */
interface ObjectWithRestSchemaAsync<TEntries extends ObjectEntriesAsync, TRest extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<ObjectWithRestIssue> | undefined> extends BaseSchemaAsync<InferObjectInput<TEntries> & {
    [key: string]: InferInput<TRest>;
}, InferObjectOutput<TEntries> & {
    [key: string]: InferOutput<TRest>;
}, ObjectWithRestIssue | InferObjectIssue<TEntries> | InferIssue<TRest>> {
    /**
     * The schema type.
     */
    readonly type: 'object_with_rest';
    /**
     * The schema reference.
     */
    readonly reference: typeof objectWithRest | typeof objectWithRestAsync;
    /**
     * The expected property.
     */
    readonly expects: 'Object';
    /**
     * The entries schema.
     */
    readonly entries: TEntries;
    /**
     * The rest schema.
     */
    readonly rest: TRest;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an object with rest schema.
 *
 * @param entries The entries schema.
 * @param rest The rest schema.
 *
 * @returns An object with rest schema.
 */
declare function objectWithRestAsync<const TEntries extends ObjectEntriesAsync, const TRest extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(entries: TEntries, rest: TRest): ObjectWithRestSchemaAsync<TEntries, TRest, undefined>;
/**
 * Creates an object with rest schema.
 *
 * @param entries The entries schema.
 * @param rest The rest schema.
 * @param message The error message.
 *
 * @returns An object with rest schema.
 */
declare function objectWithRestAsync<const TEntries extends ObjectEntriesAsync, const TRest extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<ObjectWithRestIssue> | undefined>(entries: TEntries, rest: TRest, message: TMessage): ObjectWithRestSchemaAsync<TEntries, TRest, TMessage>;

/**
 * Infer optional output type.
 */
type InferOptionalOutput<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TDefault extends DefaultAsync<TWrapped, undefined>> = undefined extends TDefault ? InferOutput<TWrapped> | undefined : InferOutput<TWrapped> | Extract<DefaultValue<TDefault>, undefined>;

/**
 * Optional schema interface.
 */
interface OptionalSchema<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TDefault extends Default<TWrapped, undefined>> extends BaseSchema<InferInput<TWrapped> | undefined, InferOptionalOutput<TWrapped, TDefault>, InferIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'optional';
    /**
     * The schema reference.
     */
    readonly reference: typeof optional;
    /**
     * The expected property.
     */
    readonly expects: `(${TWrapped['expects']} | undefined)`;
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The default value.
     */
    readonly default: TDefault;
}
/**
 * Creates an optional schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns An optional schema.
 */
declare function optional<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): OptionalSchema<TWrapped, undefined>;
/**
 * Creates an optional schema.
 *
 * @param wrapped The wrapped schema.
 * @param default_ The default value.
 *
 * @returns An optional schema.
 */
declare function optional<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TDefault extends Default<TWrapped, undefined>>(wrapped: TWrapped, default_: TDefault): OptionalSchema<TWrapped, TDefault>;

/**
 * Optional schema async interface.
 */
interface OptionalSchemaAsync<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TDefault extends DefaultAsync<TWrapped, undefined>> extends BaseSchemaAsync<InferInput<TWrapped> | undefined, InferOptionalOutput<TWrapped, TDefault>, InferIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'optional';
    /**
     * The schema reference.
     */
    readonly reference: typeof optional | typeof optionalAsync;
    /**
     * The expected property.
     */
    readonly expects: `(${TWrapped['expects']} | undefined)`;
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The default value.
     */
    readonly default: TDefault;
}
/**
 * Creates an optional schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns An optional schema.
 */
declare function optionalAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): OptionalSchemaAsync<TWrapped, undefined>;
/**
 * Creates an optional schema.
 *
 * @param wrapped The wrapped schema.
 * @param default_ The default value.
 *
 * @returns An optional schema.
 */
declare function optionalAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TDefault extends DefaultAsync<TWrapped, undefined>>(wrapped: TWrapped, default_: TDefault): OptionalSchemaAsync<TWrapped, TDefault>;

/**
 * Picklist options type.
 */
type PicklistOptions = MaybeReadonly<(string | number | bigint)[]>;
/**
 * Picklist issue interface.
 */
interface PicklistIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'picklist';
    /**
     * The expected property.
     */
    readonly expected: string;
}
/**
 * Picklist schema interface.
 */
interface PicklistSchema<TOptions extends PicklistOptions, TMessage extends ErrorMessage<PicklistIssue> | undefined> extends BaseSchema<TOptions[number], TOptions[number], PicklistIssue> {
    /**
     * The schema type.
     */
    readonly type: 'picklist';
    /**
     * The schema reference.
     */
    readonly reference: typeof picklist;
    /**
     * The picklist options.
     */
    readonly options: TOptions;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a picklist schema.
 *
 * @param options The picklist options.
 *
 * @returns A picklist schema.
 */
declare function picklist<const TOptions extends PicklistOptions>(options: TOptions): PicklistSchema<TOptions, undefined>;
/**
 * Creates a picklist schema.
 *
 * @param options The picklist options.
 * @param message The error message.
 *
 * @returns A picklist schema.
 */
declare function picklist<const TOptions extends PicklistOptions, const TMessage extends ErrorMessage<PicklistIssue> | undefined>(options: TOptions, message: TMessage): PicklistSchema<TOptions, TMessage>;

/**
 * Promise issue interface.
 */
interface PromiseIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'promise';
    /**
     * The expected property.
     */
    readonly expected: 'Promise';
}
/**
 * Promise schema interface.
 */
interface PromiseSchema<TMessage extends ErrorMessage<PromiseIssue> | undefined> extends BaseSchema<Promise<unknown>, Promise<unknown>, PromiseIssue> {
    /**
     * The schema type.
     */
    readonly type: 'promise';
    /**
     * The schema reference.
     */
    readonly reference: typeof promise;
    /**
     * The expected property.
     */
    readonly expects: 'Promise';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a promise schema.
 *
 * @returns A promise schema.
 */
declare function promise(): PromiseSchema<undefined>;
/**
 * Creates a promise schema.
 *
 * @param message The error message.
 *
 * @returns A promise schema.
 */
declare function promise<const TMessage extends ErrorMessage<PromiseIssue> | undefined>(message: TMessage): PromiseSchema<TMessage>;

/**
 * Record issue interface.
 */
interface RecordIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'record';
    /**
     * The expected property.
     */
    readonly expected: 'Object';
}
/**
 * Is literal type.
 */
type IsLiteral<TKey extends string | number | symbol> = string extends TKey ? false : number extends TKey ? false : symbol extends TKey ? false : TKey extends Brand<string | number | symbol> ? false : true;
/**
 * Optional keys type.
 */
type OptionalKeys<TObject extends Record<string | number | symbol, unknown>> = {
    [TKey in keyof TObject]: IsLiteral<TKey> extends true ? TKey : never;
}[keyof TObject];
/**
 * With question marks type.
 *
 * Hint: We mark an entry as optional if we detect that its key is a literal
 * type. The reason for this is that it is not technically possible to detect
 * missing literal keys without restricting the key schema to `string`, `enum`
 * and `picklist`. However, if `enum` and `picklist` are used, it is better to
 * use `object` with `entriesFromList` because it already covers the needed
 * functionality. This decision also reduces the bundle size of `record`,
 * because it only needs to check the entries of the input and not any missing
 * keys.
 */
type WithQuestionMarks<TObject extends Record<string | number | symbol, unknown>> = MarkOptional<TObject, OptionalKeys<TObject>>;
/**
 * With readonly type.
 */
type WithReadonly<TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TObject extends WithQuestionMarks<Record<string | number | symbol, unknown>>> = TValue extends SchemaWithPipe<infer TPipe> | SchemaWithPipeAsync<infer TPipe> ? ReadonlyAction<any> extends TPipe[number] ? Readonly<TObject> : TObject : TObject;
/**
 * Infer record input type.
 */
type InferRecordInput<TKey extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>> | BaseSchemaAsync<string, string | number | symbol, BaseIssue<unknown>>, TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = Prettify<WithQuestionMarks<Record<InferInput<TKey>, InferInput<TValue>>>>;
/**
 * Infer record output type.
 */
type InferRecordOutput<TKey extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>> | BaseSchemaAsync<string, string | number | symbol, BaseIssue<unknown>>, TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = Prettify<WithReadonly<TValue, WithQuestionMarks<Record<InferOutput<TKey>, InferOutput<TValue>>>>>;

/**
 * Record schema interface.
 */
interface RecordSchema<TKey extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>>, TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<RecordIssue> | undefined> extends BaseSchema<InferRecordInput<TKey, TValue>, InferRecordOutput<TKey, TValue>, RecordIssue | InferIssue<TKey> | InferIssue<TValue>> {
    /**
     * The schema type.
     */
    readonly type: 'record';
    /**
     * The schema reference.
     */
    readonly reference: typeof record;
    /**
     * The expected property.
     */
    readonly expects: 'Object';
    /**
     * The record key schema.
     */
    readonly key: TKey;
    /**
     * The record value schema.
     */
    readonly value: TValue;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a record schema.
 *
 * @param key The key schema.
 * @param value The value schema.
 *
 * @returns A record schema.
 */
declare function record<const TKey extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>>, const TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(key: TKey, value: TValue): RecordSchema<TKey, TValue, undefined>;
/**
 * Creates a record schema.
 *
 * @param key The key schema.
 * @param value The value schema.
 * @param message The error message.
 *
 * @returns A record schema.
 */
declare function record<const TKey extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>>, const TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<RecordIssue> | undefined>(key: TKey, value: TValue, message: TMessage): RecordSchema<TKey, TValue, TMessage>;

/**
 * Record schema async interface.
 */
interface RecordSchemaAsync<TKey extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>> | BaseSchemaAsync<string, string | number | symbol, BaseIssue<unknown>>, TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<RecordIssue> | undefined> extends BaseSchemaAsync<InferRecordInput<TKey, TValue>, InferRecordOutput<TKey, TValue>, RecordIssue | InferIssue<TKey> | InferIssue<TValue>> {
    /**
     * The schema type.
     */
    readonly type: 'record';
    /**
     * The schema reference.
     */
    readonly reference: typeof record | typeof recordAsync;
    /**
     * The expected property.
     */
    readonly expects: 'Object';
    /**
     * The record key schema.
     */
    readonly key: TKey;
    /**
     * The record value schema.
     */
    readonly value: TValue;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a record schema.
 *
 * @param key The key schema.
 * @param value The value schema.
 *
 * @returns A record schema.
 */
declare function recordAsync<const TKey extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>> | BaseSchemaAsync<string, string | number | symbol, BaseIssue<unknown>>, const TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(key: TKey, value: TValue): RecordSchemaAsync<TKey, TValue, undefined>;
/**
 * Creates a record schema.
 *
 * @param key The key schema.
 * @param value The value schema.
 * @param message The error message.
 *
 * @returns A record schema.
 */
declare function recordAsync<const TKey extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>> | BaseSchemaAsync<string, string | number | symbol, BaseIssue<unknown>>, const TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<RecordIssue> | undefined>(key: TKey, value: TValue, message: TMessage): RecordSchemaAsync<TKey, TValue, TMessage>;

/**
 * Set issue interface.
 */
interface SetIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'set';
    /**
     * The expected property.
     */
    readonly expected: 'Set';
}
/**
 * Infer set input type.
 */
type InferSetInput<TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = Set<InferInput<TValue>>;
/**
 * Infer set output type.
 */
type InferSetOutput<TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = Set<InferOutput<TValue>>;

/**
 * Set schema interface.
 */
interface SetSchema<TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<SetIssue> | undefined> extends BaseSchema<InferSetInput<TValue>, InferSetOutput<TValue>, SetIssue | InferIssue<TValue>> {
    /**
     * The schema type.
     */
    readonly type: 'set';
    /**
     * The schema reference.
     */
    readonly reference: typeof set;
    /**
     * The expected property.
     */
    readonly expects: 'Set';
    /**
     * The set value schema.
     */
    readonly value: TValue;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a set schema.
 *
 * @param value The value schema.
 *
 * @returns A set schema.
 */
declare function set<const TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(value: TValue): SetSchema<TValue, undefined>;
/**
 * Creates a set schema.
 *
 * @param value The value schema.
 * @param message The error message.
 *
 * @returns A set schema.
 */
declare function set<const TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<SetIssue> | undefined>(value: TValue, message: TMessage): SetSchema<TValue, TMessage>;

/**
 * Set schema async interface.
 */
interface SetSchemaAsync<TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<SetIssue> | undefined> extends BaseSchemaAsync<InferSetInput<TValue>, InferSetOutput<TValue>, SetIssue | InferIssue<TValue>> {
    /**
     * The schema type.
     */
    readonly type: 'set';
    /**
     * The schema reference.
     */
    readonly reference: typeof set | typeof setAsync;
    /**
     * The expected property.
     */
    readonly expects: 'Set';
    /**
     * The set value schema.
     */
    readonly value: TValue;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a set schema.
 *
 * @param value The value schema.
 *
 * @returns A set schema.
 */
declare function setAsync<const TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(value: TValue): SetSchemaAsync<TValue, undefined>;
/**
 * Creates a set schema.
 *
 * @param value The value schema.
 * @param message The error message.
 *
 * @returns A set schema.
 */
declare function setAsync<const TValue extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<SetIssue> | undefined>(value: TValue, message: TMessage): SetSchemaAsync<TValue, TMessage>;

/**
 * Strict object issue interface.
 */
interface StrictObjectIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'strict_object';
    /**
     * The expected property.
     */
    readonly expected: 'Object' | `"${string}"` | 'never';
}

/**
 * Strict object schema interface.
 */
interface StrictObjectSchema<TEntries extends ObjectEntries, TMessage extends ErrorMessage<StrictObjectIssue> | undefined> extends BaseSchema<InferObjectInput<TEntries>, InferObjectOutput<TEntries>, StrictObjectIssue | InferObjectIssue<TEntries>> {
    /**
     * The schema type.
     */
    readonly type: 'strict_object';
    /**
     * The schema reference.
     */
    readonly reference: typeof strictObject;
    /**
     * The expected property.
     */
    readonly expects: 'Object';
    /**
     * The entries schema.
     */
    readonly entries: TEntries;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a strict object schema.
 *
 * @param entries The entries schema.
 *
 * @returns A strict object schema.
 */
declare function strictObject<const TEntries extends ObjectEntries>(entries: TEntries): StrictObjectSchema<TEntries, undefined>;
/**
 * Creates a strict object schema.
 *
 * @param entries The entries schema.
 * @param message The error message.
 *
 * @returns A strict object schema.
 */
declare function strictObject<const TEntries extends ObjectEntries, const TMessage extends ErrorMessage<StrictObjectIssue> | undefined>(entries: TEntries, message: TMessage): StrictObjectSchema<TEntries, TMessage>;

/**
 * Strict object schema async interface.
 */
interface StrictObjectSchemaAsync<TEntries extends ObjectEntriesAsync, TMessage extends ErrorMessage<StrictObjectIssue> | undefined> extends BaseSchemaAsync<InferObjectInput<TEntries>, InferObjectOutput<TEntries>, StrictObjectIssue | InferObjectIssue<TEntries>> {
    /**
     * The schema type.
     */
    readonly type: 'strict_object';
    /**
     * The schema reference.
     */
    readonly reference: typeof strictObject | typeof strictObjectAsync;
    /**
     * The expected property.
     */
    readonly expects: 'Object';
    /**
     * The entries schema.
     */
    readonly entries: TEntries;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a strict object schema.
 *
 * @param entries The entries schema.
 *
 * @returns A strict object schema.
 */
declare function strictObjectAsync<const TEntries extends ObjectEntriesAsync>(entries: TEntries): StrictObjectSchemaAsync<TEntries, undefined>;
/**
 * Creates a strict object schema.
 *
 * @param entries The entries schema.
 * @param message The error message.
 *
 * @returns A strict object schema.
 */
declare function strictObjectAsync<const TEntries extends ObjectEntriesAsync, const TMessage extends ErrorMessage<StrictObjectIssue> | undefined>(entries: TEntries, message: TMessage): StrictObjectSchemaAsync<TEntries, TMessage>;

/**
 * Strict tuple issue interface.
 */
interface StrictTupleIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'strict_tuple';
    /**
     * The expected property.
     */
    readonly expected: 'Array' | 'never';
}

/**
 * Strict tuple schema interface.
 */
interface StrictTupleSchema<TItems extends TupleItems, TMessage extends ErrorMessage<StrictTupleIssue> | undefined> extends BaseSchema<InferTupleInput<TItems>, InferTupleOutput<TItems>, StrictTupleIssue | InferTupleIssue<TItems>> {
    /**
     * The schema type.
     */
    readonly type: 'strict_tuple';
    /**
     * The schema reference.
     */
    readonly reference: typeof strictTuple;
    /**
     * The expected property.
     */
    readonly expects: 'Array';
    /**
     * The items schema.
     */
    readonly items: TItems;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a strict tuple schema.
 *
 * @param items The items schema.
 *
 * @returns A strict tuple schema.
 */
declare function strictTuple<const TItems extends TupleItems>(items: TItems): StrictTupleSchema<TItems, undefined>;
/**
 * Creates a strict tuple schema.
 *
 * @param items The items schema.
 * @param message The error message.
 *
 * @returns A strict tuple schema.
 */
declare function strictTuple<const TItems extends TupleItems, const TMessage extends ErrorMessage<StrictTupleIssue> | undefined>(items: TItems, message: TMessage): StrictTupleSchema<TItems, TMessage>;

/**
 * Strict tuple schema async interface.
 */
interface StrictTupleSchemaAsync<TItems extends TupleItemsAsync, TMessage extends ErrorMessage<StrictTupleIssue> | undefined> extends BaseSchemaAsync<InferTupleInput<TItems>, InferTupleOutput<TItems>, StrictTupleIssue | InferTupleIssue<TItems>> {
    /**
     * The schema type.
     */
    readonly type: 'strict_tuple';
    /**
     * The schema reference.
     */
    readonly reference: typeof strictTuple | typeof strictTupleAsync;
    /**
     * The expected property.
     */
    readonly expects: 'Array';
    /**
     * The items schema.
     */
    readonly items: TItems;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a strict tuple schema.
 *
 * @param items The items schema.
 *
 * @returns A strict tuple schema.
 */
declare function strictTupleAsync<const TItems extends TupleItemsAsync>(items: TItems): StrictTupleSchemaAsync<TItems, undefined>;
/**
 * Creates a strict tuple schema.
 *
 * @param items The items schema.
 * @param message The error message.
 *
 * @returns A strict tuple schema.
 */
declare function strictTupleAsync<const TItems extends TupleItemsAsync, const TMessage extends ErrorMessage<StrictTupleIssue> | undefined>(items: TItems, message: TMessage): StrictTupleSchemaAsync<TItems, TMessage>;

/**
 * String issue interface.
 */
interface StringIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'string';
    /**
     * The expected property.
     */
    readonly expected: 'string';
}
/**
 * String schema interface.
 */
interface StringSchema<TMessage extends ErrorMessage<StringIssue> | undefined> extends BaseSchema<string, string, StringIssue> {
    /**
     * The schema type.
     */
    readonly type: 'string';
    /**
     * The schema reference.
     */
    readonly reference: typeof string;
    /**
     * The expected property.
     */
    readonly expects: 'string';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a string schema.
 *
 * @returns A string schema.
 */
declare function string(): StringSchema<undefined>;
/**
 * Creates a string schema.
 *
 * @param message The error message.
 *
 * @returns A string schema.
 */
declare function string<const TMessage extends ErrorMessage<StringIssue> | undefined>(message: TMessage): StringSchema<TMessage>;

/**
 * Symbol issue interface.
 */
interface SymbolIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'symbol';
    /**
     * The expected property.
     */
    readonly expected: 'symbol';
}
/**
 * Symbol schema interface.
 */
interface SymbolSchema<TMessage extends ErrorMessage<SymbolIssue> | undefined> extends BaseSchema<symbol, symbol, SymbolIssue> {
    /**
     * The schema type.
     */
    readonly type: 'symbol';
    /**
     * The schema reference.
     */
    readonly reference: typeof symbol;
    /**
     * The expected property.
     */
    readonly expects: 'symbol';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a symbol schema.
 *
 * @returns A symbol schema.
 */
declare function symbol(): SymbolSchema<undefined>;
/**
 * Creates a symbol schema.
 *
 * @param message The error message.
 *
 * @returns A symbol schema.
 */
declare function symbol<const TMessage extends ErrorMessage<SymbolIssue> | undefined>(message: TMessage): SymbolSchema<TMessage>;

/**
 * Tuple issue interface.
 */
interface TupleIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'tuple';
    /**
     * The expected property.
     */
    readonly expected: 'Array';
}

/**
 * Tuple schema interface.
 */
interface TupleSchema<TItems extends TupleItems, TMessage extends ErrorMessage<TupleIssue> | undefined> extends BaseSchema<InferTupleInput<TItems>, InferTupleOutput<TItems>, TupleIssue | InferTupleIssue<TItems>> {
    /**
     * The schema type.
     */
    readonly type: 'tuple';
    /**
     * The schema reference.
     */
    readonly reference: typeof tuple;
    /**
     * The expected property.
     */
    readonly expects: 'Array';
    /**
     * The items schema.
     */
    readonly items: TItems;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a tuple schema.
 *
 * Hint: This schema removes unknown items. The output will only include the
 * items you specify. To include unknown items, use `looseTuple`. To
 * return an issue for unknown items, use `strictTuple`. To include and
 * validate unknown items, use `tupleWithRest`.
 *
 * @param items The items schema.
 *
 * @returns A tuple schema.
 */
declare function tuple<const TItems extends TupleItems>(items: TItems): TupleSchema<TItems, undefined>;
/**
 * Creates a tuple schema.
 *
 * Hint: This schema removes unknown items. The output will only include the
 * items you specify. To include unknown items, use `looseTuple`. To
 * return an issue for unknown items, use `strictTuple`. To include and
 * validate unknown items, use `tupleWithRest`.
 *
 * @param items The items schema.
 * @param message The error message.
 *
 * @returns A tuple schema.
 */
declare function tuple<const TItems extends TupleItems, const TMessage extends ErrorMessage<TupleIssue> | undefined>(items: TItems, message: TMessage): TupleSchema<TItems, TMessage>;

/**
 * Tuple schema async interface.
 */
interface TupleSchemaAsync<TItems extends TupleItemsAsync, TMessage extends ErrorMessage<TupleIssue> | undefined> extends BaseSchemaAsync<InferTupleInput<TItems>, InferTupleOutput<TItems>, TupleIssue | InferTupleIssue<TItems>> {
    /**
     * The schema type.
     */
    readonly type: 'tuple';
    /**
     * The schema reference.
     */
    readonly reference: typeof tuple | typeof tupleAsync;
    /**
     * The expected property.
     */
    readonly expects: 'Array';
    /**
     * The items schema.
     */
    readonly items: TItems;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a tuple schema.
 *
 * Hint: This schema removes unknown items. The output will only include the
 * items you specify. To include unknown items, use `looseTupleAsync`. To
 * return an issue for unknown items, use `strictTupleAsync`. To include and
 * validate unknown items, use `tupleWithRestAsync`.
 *
 * @param items The items schema.
 *
 * @returns A tuple schema.
 */
declare function tupleAsync<const TItems extends TupleItemsAsync>(items: TItems): TupleSchemaAsync<TItems, undefined>;
/**
 * Creates a tuple schema.
 *
 * Hint: This schema removes unknown items. The output will only include the
 * items you specify. To include unknown items, use `looseTupleAsync`. To
 * return an issue for unknown items, use `strictTupleAsync`. To include and
 * validate unknown items, use `tupleWithRestAsync`.
 *
 * @param items The items schema.
 * @param message The error message.
 *
 * @returns A tuple schema.
 */
declare function tupleAsync<const TItems extends TupleItemsAsync, const TMessage extends ErrorMessage<TupleIssue> | undefined>(items: TItems, message: TMessage): TupleSchemaAsync<TItems, TMessage>;

/**
 * Tuple with rest issue interface.
 */
interface TupleWithRestIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'tuple_with_rest';
    /**
     * The expected property.
     */
    readonly expected: 'Array';
}

/**
 * Tuple with rest schema interface.
 */
interface TupleWithRestSchema<TItems extends TupleItems, TRest extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<TupleWithRestIssue> | undefined> extends BaseSchema<[
    ...InferTupleInput<TItems>,
    ...InferInput<TRest>[]
], [
    ...InferTupleOutput<TItems>,
    ...InferOutput<TRest>[]
], TupleWithRestIssue | InferTupleIssue<TItems> | InferIssue<TRest>> {
    /**
     * The schema type.
     */
    readonly type: 'tuple_with_rest';
    /**
     * The schema reference.
     */
    readonly reference: typeof tupleWithRest;
    /**
     * The expected property.
     */
    readonly expects: 'Array';
    /**
     * The items schema.
     */
    readonly items: TItems;
    /**
     * The rest schema.
     */
    readonly rest: TRest;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a tuple with rest schema.
 *
 * @param items The items schema.
 * @param rest The rest schema.
 *
 * @returns A tuple with rest schema.
 */
declare function tupleWithRest<const TItems extends TupleItems, const TRest extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(items: TItems, rest: TRest): TupleWithRestSchema<TItems, TRest, undefined>;
/**
 * Creates a tuple with rest schema.
 *
 * @param items The items schema.
 * @param rest The rest schema.
 * @param message The error message.
 *
 * @returns A tuple with rest schema.
 */
declare function tupleWithRest<const TItems extends TupleItems, const TRest extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<TupleWithRestIssue> | undefined>(items: TItems, rest: TRest, message: TMessage): TupleWithRestSchema<TItems, TRest, TMessage>;

/**
 * Tuple with rest schema async interface.
 */
interface TupleWithRestSchemaAsync<TItems extends TupleItemsAsync, TRest extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<TupleWithRestIssue> | undefined> extends BaseSchemaAsync<[
    ...InferTupleInput<TItems>,
    ...InferInput<TRest>[]
], [
    ...InferTupleOutput<TItems>,
    ...InferOutput<TRest>[]
], TupleWithRestIssue | InferTupleIssue<TItems> | InferIssue<TRest>> {
    /**
     * The schema type.
     */
    readonly type: 'tuple_with_rest';
    /**
     * The schema reference.
     */
    readonly reference: typeof tupleWithRest | typeof tupleWithRestAsync;
    /**
     * The expected property.
     */
    readonly expects: 'Array';
    /**
     * The items schema.
     */
    readonly items: TItems;
    /**
     * The rest schema.
     */
    readonly rest: TRest;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a tuple with rest schema.
 *
 * @param items The items schema.
 * @param rest The rest schema.
 *
 * @returns A tuple with rest schema.
 */
declare function tupleWithRestAsync<const TItems extends TupleItemsAsync, const TRest extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(items: TItems, rest: TRest): TupleWithRestSchemaAsync<TItems, TRest, undefined>;
/**
 * Creates a tuple with rest schema.
 *
 * @param items The items schema.
 * @param rest The rest schema.
 * @param message The error message.
 *
 * @returns A tuple with rest schema.
 */
declare function tupleWithRestAsync<const TItems extends TupleItemsAsync, const TRest extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<TupleWithRestIssue> | undefined>(items: TItems, rest: TRest, message: TMessage): TupleWithRestSchemaAsync<TItems, TRest, TMessage>;

/**
 * Undefined issue interface.
 */
interface UndefinedIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'undefined';
    /**
     * The expected property.
     */
    readonly expected: 'undefined';
}
/**
 * Undefined schema interface.
 */
interface UndefinedSchema<TMessage extends ErrorMessage<UndefinedIssue> | undefined> extends BaseSchema<undefined, undefined, UndefinedIssue> {
    /**
     * The schema type.
     */
    readonly type: 'undefined';
    /**
     * The schema reference.
     */
    readonly reference: typeof undefined_;
    /**
     * The expected property.
     */
    readonly expects: 'undefined';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an undefined schema.
 *
 * @returns An undefined schema.
 */
declare function undefined_(): UndefinedSchema<undefined>;
/**
 * Creates an undefined schema.
 *
 * @param message The error message.
 *
 * @returns An undefined schema.
 */
declare function undefined_<const TMessage extends ErrorMessage<UndefinedIssue> | undefined>(message: TMessage): UndefinedSchema<TMessage>;

/**
 * Infer undefinedable output type.
 */
type InferUndefinedableOutput<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TDefault extends DefaultAsync<TWrapped, undefined>> = undefined extends TDefault ? InferOutput<TWrapped> | undefined : InferOutput<TWrapped> | Extract<DefaultValue<TDefault>, undefined>;

/**
 * Undefinedable schema interface.
 */
interface UndefinedableSchema<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TDefault extends Default<TWrapped, undefined>> extends BaseSchema<InferInput<TWrapped> | undefined, InferUndefinedableOutput<TWrapped, TDefault>, InferIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'undefinedable';
    /**
     * The schema reference.
     */
    readonly reference: typeof undefinedable;
    /**
     * The expected property.
     */
    readonly expects: `(${TWrapped['expects']} | undefined)`;
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The default value.
     */
    readonly default: TDefault;
}
/**
 * Creates an undefinedable schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns An undefinedable schema.
 */
declare function undefinedable<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): UndefinedableSchema<TWrapped, undefined>;
/**
 * Creates an undefinedable schema.
 *
 * @param wrapped The wrapped schema.
 * @param default_ The default value.
 *
 * @returns An undefinedable schema.
 */
declare function undefinedable<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TDefault extends Default<TWrapped, undefined>>(wrapped: TWrapped, default_: TDefault): UndefinedableSchema<TWrapped, TDefault>;

/**
 * Undefinedable schema async interface.
 */
interface UndefinedableSchemaAsync<TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TDefault extends DefaultAsync<TWrapped, undefined>> extends BaseSchemaAsync<InferInput<TWrapped> | undefined, InferUndefinedableOutput<TWrapped, TDefault>, InferIssue<TWrapped>> {
    /**
     * The schema type.
     */
    readonly type: 'undefinedable';
    /**
     * The schema reference.
     */
    readonly reference: typeof undefinedable | typeof undefinedableAsync;
    /**
     * The expected property.
     */
    readonly expects: `(${TWrapped['expects']} | undefined)`;
    /**
     * The wrapped schema.
     */
    readonly wrapped: TWrapped;
    /**
     * The default value.
     */
    readonly default: TDefault;
}
/**
 * Creates an undefinedable schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns An undefinedable schema.
 */
declare function undefinedableAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped): UndefinedableSchemaAsync<TWrapped, undefined>;
/**
 * Creates an undefinedable schema.
 *
 * @param wrapped The wrapped schema.
 * @param default_ The default value.
 *
 * @returns An undefinedable schema.
 */
declare function undefinedableAsync<const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TDefault extends DefaultAsync<TWrapped, undefined>>(wrapped: TWrapped, default_: TDefault): UndefinedableSchemaAsync<TWrapped, TDefault>;

/**
 * Unknown schema interface.
 */
interface UnknownSchema extends BaseSchema<unknown, unknown, never> {
    /**
     * The schema type.
     */
    readonly type: 'unknown';
    /**
     * The schema reference.
     */
    readonly reference: typeof unknown;
    /**
     * The expected property.
     */
    readonly expects: 'unknown';
}
/**
 * Creates a unknown schema.
 *
 * @returns A unknown schema.
 */
declare function unknown(): UnknownSchema;

/**
 * Variant schema interface.
 */
interface VariantSchema<TKey extends string, TOptions extends VariantOptions<TKey>, TMessage extends ErrorMessage<VariantIssue> | undefined> extends BaseSchema<InferInput<TOptions[number]>, InferOutput<TOptions[number]>, VariantIssue | InferVariantIssue<TOptions>> {
    /**
     * The schema type.
     */
    readonly type: 'variant';
    /**
     * The schema reference.
     */
    readonly reference: typeof variant;
    /**
     * The expected property.
     */
    readonly expects: 'Object';
    /**
     * The discriminator key.
     */
    readonly key: TKey;
    /**
     * The variant options.
     */
    readonly options: TOptions;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a variant schema.
 *
 * @param key The discriminator key.
 * @param options The variant options.
 *
 * @returns A variant schema.
 */
declare function variant<const TKey extends string, const TOptions extends VariantOptions<TKey>>(key: TKey, options: TOptions): VariantSchema<TKey, TOptions, undefined>;
/**
 * Creates a variant schema.
 *
 * @param key The discriminator key.
 * @param options The variant options.
 * @param message The error message.
 *
 * @returns An variant schema.
 */
declare function variant<const TKey extends string, const TOptions extends VariantOptions<TKey>, const TMessage extends ErrorMessage<VariantIssue> | undefined>(key: TKey, options: TOptions, message: TMessage): VariantSchema<TKey, TOptions, TMessage>;

/**
 * Variant schema async interface.
 */
interface VariantSchemaAsync<TKey extends string, TOptions extends VariantOptionsAsync<TKey>, TMessage extends ErrorMessage<VariantIssue> | undefined> extends BaseSchemaAsync<InferInput<TOptions[number]>, InferOutput<TOptions[number]>, VariantIssue | InferVariantIssue<TOptions>> {
    /**
     * The schema type.
     */
    readonly type: 'variant';
    /**
     * The schema reference.
     */
    readonly reference: typeof variant | typeof variantAsync;
    /**
     * The expected property.
     */
    readonly expects: 'Object';
    /**
     * The discriminator key.
     */
    readonly key: TKey;
    /**
     * The variant options.
     */
    readonly options: TOptions;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a variant schema.
 *
 * @param key The discriminator key.
 * @param options The variant options.
 *
 * @returns A variant schema.
 */
declare function variantAsync<const TKey extends string, const TOptions extends VariantOptionsAsync<TKey>>(key: TKey, options: TOptions): VariantSchemaAsync<TKey, TOptions, undefined>;
/**
 * Creates a variant schema.
 *
 * @param key The discriminator key.
 * @param options The variant options.
 * @param message The error message.
 *
 * @returns An variant schema.
 */
declare function variantAsync<const TKey extends string, const TOptions extends VariantOptionsAsync<TKey>, const TMessage extends ErrorMessage<VariantIssue> | undefined>(key: TKey, options: TOptions, message: TMessage): VariantSchemaAsync<TKey, TOptions, TMessage>;

/**
 * Variant issue interface.
 */
interface VariantIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'variant';
    /**
     * The expected property.
     */
    readonly expected: string;
}
/**
 * Variant option schema interface.
 */
interface VariantOptionSchema<TKey extends string> extends BaseSchema<unknown, unknown, VariantIssue | BaseIssue<unknown>> {
    readonly type: 'variant';
    readonly reference: typeof variant;
    readonly key: string;
    readonly options: VariantOptions<TKey>;
    readonly message: ErrorMessage<VariantIssue> | undefined;
}
/**
 * Variant option schema async interface.
 */
interface VariantOptionSchemaAsync<TKey extends string> extends BaseSchemaAsync<unknown, unknown, VariantIssue | BaseIssue<unknown>> {
    readonly type: 'variant';
    readonly reference: typeof variant | typeof variantAsync;
    readonly key: string;
    readonly options: VariantOptionsAsync<TKey>;
    readonly message: ErrorMessage<VariantIssue> | undefined;
}
/**
 * Variant object entries type.
 */
type VariantObjectEntries<TKey extends string> = Record<TKey, BaseSchema<unknown, unknown, BaseIssue<unknown>> | OptionalEntrySchema> & ObjectEntries;
/**
 * Variant object entries async type.
 */
type VariantObjectEntriesAsync<TKey extends string> = Record<TKey, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | OptionalEntrySchema | OptionalEntrySchemaAsync> & ObjectEntriesAsync;
/**
 * Variant option type.
 */
type VariantOption<TKey extends string> = LooseObjectSchema<VariantObjectEntries<TKey>, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<VariantObjectEntries<TKey>, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<VariantObjectEntries<TKey>, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<VariantObjectEntries<TKey>, ErrorMessage<StrictObjectIssue> | undefined> | VariantOptionSchema<TKey>;
/**
 * Variant option async type.
 */
type VariantOptionAsync<TKey extends string> = LooseObjectSchemaAsync<VariantObjectEntriesAsync<TKey>, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchemaAsync<VariantObjectEntriesAsync<TKey>, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchemaAsync<VariantObjectEntriesAsync<TKey>, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchemaAsync<VariantObjectEntriesAsync<TKey>, ErrorMessage<StrictObjectIssue> | undefined> | VariantOptionSchemaAsync<TKey>;
/**
 * Variant options type.
 */
type VariantOptions<TKey extends string> = MaybeReadonly<VariantOption<TKey>[]>;
/**
 * Variant options async type.
 */
type VariantOptionsAsync<TKey extends string> = MaybeReadonly<(VariantOption<TKey> | VariantOptionAsync<TKey>)[]>;
/**
 * Infer variant issue type.
 */
type InferVariantIssue<TOptions extends VariantOptions<string> | VariantOptionsAsync<string>> = Exclude<InferIssue<TOptions[number]>, {
    type: 'loose_object' | 'object' | 'object_with_rest';
}>;

/**
 * Void issue interface.
 */
interface VoidIssue extends BaseIssue<unknown> {
    /**
     * The issue kind.
     */
    readonly kind: 'schema';
    /**
     * The issue type.
     */
    readonly type: 'void';
    /**
     * The expected property.
     */
    readonly expected: 'void';
}
/**
 * Void schema interface.
 */
interface VoidSchema<TMessage extends ErrorMessage<VoidIssue> | undefined> extends BaseSchema<void, void, VoidIssue> {
    /**
     * The schema type.
     */
    readonly type: 'void';
    /**
     * The schema reference.
     */
    readonly reference: typeof void_;
    /**
     * The expected property.
     */
    readonly expects: 'void';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a void schema.
 *
 * @returns A void schema.
 */
declare function void_(): VoidSchema<undefined>;
/**
 * Creates a void schema.
 *
 * @param message The error message.
 *
 * @returns A void schema.
 */
declare function void_<const TMessage extends ErrorMessage<VoidIssue> | undefined>(message: TMessage): VoidSchema<TMessage>;

/**
 * Schema type.
 */
type Schema$3 = LooseTupleSchema<TupleItems, ErrorMessage<LooseTupleIssue> | undefined> | StrictTupleSchema<TupleItems, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchema<TupleItems, ErrorMessage<TupleIssue> | undefined> | TupleWithRestSchema<TupleItems, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined>;
/**
 * Args action type.
 */
interface ArgsAction<TInput extends (...args: any[]) => unknown, TSchema extends Schema$3> extends BaseTransformation<TInput, (...args: InferInput<TSchema>) => ReturnType<TInput>, never> {
    /**
     * The action type.
     */
    readonly type: 'args';
    /**
     * The action reference.
     */
    readonly reference: typeof args;
    /**
     * The arguments schema.
     */
    readonly schema: TSchema;
}
/**
 * Creates a function arguments transformation action.
 *
 * @param schema The arguments schema.
 *
 * @returns An args action.
 */
declare function args<TInput extends (...args: any[]) => unknown, TSchema extends Schema$3>(schema: TSchema): ArgsAction<TInput, TSchema>;

/**
 * Schema type.
 */
type Schema$2 = LooseTupleSchema<TupleItems, ErrorMessage<LooseTupleIssue> | undefined> | LooseTupleSchemaAsync<TupleItemsAsync, ErrorMessage<LooseTupleIssue> | undefined> | StrictTupleSchema<TupleItems, ErrorMessage<StrictTupleIssue> | undefined> | StrictTupleSchemaAsync<TupleItemsAsync, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchema<TupleItems, ErrorMessage<TupleIssue> | undefined> | TupleSchemaAsync<TupleItemsAsync, ErrorMessage<TupleIssue> | undefined> | TupleWithRestSchema<TupleItems, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined> | TupleWithRestSchemaAsync<TupleItemsAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined>;
/**
 * Args action async type.
 */
interface ArgsActionAsync<TInput extends (...args: any[]) => unknown, TSchema extends Schema$2> extends BaseTransformation<TInput, (...args: InferInput<TSchema>) => Promise<Awaited<ReturnType<TInput>>>, never> {
    /**
     * The action type.
     */
    readonly type: 'args';
    /**
     * The action reference.
     */
    readonly reference: typeof argsAsync;
    /**
     * The arguments schema.
     */
    readonly schema: TSchema;
}
/**
 * Creates a function arguments transformation action.
 *
 * @param schema The arguments schema.
 *
 * @returns An args action.
 */
declare function argsAsync<TInput extends (...args: any[]) => unknown, TSchema extends Schema$2>(schema: TSchema): ArgsActionAsync<TInput, TSchema>;

/**
 * Await action async interface.
 */
interface AwaitActionAsync<TInput extends Promise<unknown>> extends BaseTransformationAsync<TInput, Awaited<TInput>, never> {
    /**
     * The action type.
     */
    readonly type: 'await';
    /**
     * The action reference.
     */
    readonly reference: typeof awaitAsync;
}
/**
 * Creates an await transformation action.
 *
 * @returns An await action.
 */
declare function awaitAsync<TInput extends Promise<unknown>>(): AwaitActionAsync<TInput>;

/**
 * Base64 issue interface.
 */
interface Base64Issue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'base64';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The Base64 regex.
     */
    readonly requirement: RegExp;
}
/**
 * Base64 action interface.
 */
interface Base64Action<TInput extends string, TMessage extends ErrorMessage<Base64Issue<TInput>> | undefined> extends BaseValidation<TInput, TInput, Base64Issue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'base64';
    /**
     * The action reference.
     */
    readonly reference: typeof base64;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The Base64 regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [Base64](https://en.wikipedia.org/wiki/Base64) validation action.
 *
 * @returns A Base64 action.
 */
declare function base64<TInput extends string>(): Base64Action<TInput, undefined>;
/**
 * Creates a [Base64](https://en.wikipedia.org/wiki/Base64) validation action.
 *
 * @param message The error message.
 *
 * @returns A Base64 action.
 */
declare function base64<TInput extends string, const TMessage extends ErrorMessage<Base64Issue<TInput>> | undefined>(message: TMessage): Base64Action<TInput, TMessage>;

/**
 * BIC issue interface.
 */
interface BicIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'bic';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The BIC regex.
     */
    readonly requirement: RegExp;
}
/**
 * BIC action interface.
 */
interface BicAction<TInput extends string, TMessage extends ErrorMessage<BicIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, BicIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'bic';
    /**
     * The action reference.
     */
    readonly reference: typeof bic;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The BIC regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [BIC](https://en.wikipedia.org/wiki/ISO_9362) validation action.
 *
 * @returns A BIC action.
 */
declare function bic<TInput extends string>(): BicAction<TInput, undefined>;
/**
 * Creates a [BIC](https://en.wikipedia.org/wiki/ISO_9362) validation action.
 *
 * @param message The error message.
 *
 * @returns A BIC action.
 */
declare function bic<TInput extends string, const TMessage extends ErrorMessage<BicIssue<TInput>> | undefined>(message: TMessage): BicAction<TInput, TMessage>;

/**
 * Brand symbol.
 */
declare const BrandSymbol: unique symbol;
/**
 * Brand name type.
 */
type BrandName = string | number | symbol;
/**
 * Brand interface.
 */
interface Brand<TName extends BrandName> {
    [BrandSymbol]: {
        [TValue in TName]: TValue;
    };
}
/**
 * Brand action interface.
 */
interface BrandAction<TInput, TName extends BrandName> extends BaseTransformation<TInput, TInput & Brand<TName>, never> {
    /**
     * The action type.
     */
    readonly type: 'brand';
    /**
     * The action reference.
     */
    readonly reference: typeof brand;
    /**
     * The brand name.
     */
    readonly name: TName;
}
/**
 * Creates a brand transformation action.
 *
 * @param name The brand name.
 *
 * @returns A brand action.
 */
declare function brand<TInput, TName extends BrandName>(name: TName): BrandAction<TInput, TName>;

/**
 * Bytes issue interface.
 */
interface BytesIssue<TInput extends string, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'bytes';
    /**
     * The expected property.
     */
    readonly expected: `${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The required bytes.
     */
    readonly requirement: TRequirement;
}
/**
 * Bytes action interface.
 */
interface BytesAction<TInput extends string, TRequirement extends number, TMessage extends ErrorMessage<BytesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, BytesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'bytes';
    /**
     * The action reference.
     */
    readonly reference: typeof bytes;
    /**
     * The expected property.
     */
    readonly expects: `${TRequirement}`;
    /**
     * The required bytes.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [bytes](https://en.wikipedia.org/wiki/Byte) validation action.
 *
 * @param requirement The required bytes.
 *
 * @returns A bytes action.
 */
declare function bytes<TInput extends string, const TRequirement extends number>(requirement: TRequirement): BytesAction<TInput, TRequirement, undefined>;
/**
 * Creates a [bytes](https://en.wikipedia.org/wiki/Byte) validation action.
 *
 * @param requirement The required bytes.
 * @param message The error message.
 *
 * @returns A bytes action.
 */
declare function bytes<TInput extends string, const TRequirement extends number, const TMessage extends ErrorMessage<BytesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): BytesAction<TInput, TRequirement, TMessage>;

/**
 * Check issue interface.
 */
interface CheckIssue<TInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'check';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The validation function.
     */
    readonly requirement: (input: TInput) => MaybePromise<boolean>;
}

/**
 * Check action interface.
 */
interface CheckAction<TInput, TMessage extends ErrorMessage<CheckIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, CheckIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'check';
    /**
     * The action reference.
     */
    readonly reference: typeof check;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The validation function.
     */
    readonly requirement: (input: TInput) => boolean;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a check validation action.
 *
 * @param requirement The validation function.
 *
 * @returns A check action.
 */
declare function check<TInput>(requirement: (input: TInput) => boolean): CheckAction<TInput, undefined>;
/**
 * Creates a check validation action.
 *
 * @param requirement The validation function.
 * @param message The error message.
 *
 * @returns A check action.
 */
declare function check<TInput, const TMessage extends ErrorMessage<CheckIssue<TInput>> | undefined>(requirement: (input: TInput) => boolean, message: TMessage): CheckAction<TInput, TMessage>;

/**
 * Check action async interface.
 */
interface CheckActionAsync<TInput, TMessage extends ErrorMessage<CheckIssue<TInput>> | undefined> extends BaseValidationAsync<TInput, TInput, CheckIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'check';
    /**
     * The action reference.
     */
    readonly reference: typeof checkAsync;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The validation function.
     */
    readonly requirement: (input: TInput) => MaybePromise<boolean>;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a check validation action.
 *
 * @param requirement The validation function.
 *
 * @returns A check action.
 */
declare function checkAsync<TInput>(requirement: (input: TInput) => MaybePromise<boolean>): CheckActionAsync<TInput, undefined>;
/**
 * Creates a check validation action.
 *
 * @param requirement The validation function.
 * @param message The error message.
 *
 * @returns A check action.
 */
declare function checkAsync<TInput, const TMessage extends ErrorMessage<CheckIssue<TInput>> | undefined>(requirement: (input: TInput) => MaybePromise<boolean>, message: TMessage): CheckActionAsync<TInput, TMessage>;

/**
 * Array input type.
 */
type ArrayInput = MaybeReadonly<unknown[]>;
/**
 * Array requirement type.
 */
type ArrayRequirement$1<TInput extends ArrayInput> = (item: TInput[number], index: number, array: TInput) => boolean;
/**
 * Array requirement async type.
 */
type ArrayRequirementAsync<TInput extends ArrayInput> = (item: TInput[number], index: number, array: TInput) => MaybePromise<boolean>;
/**
 * Content input type.
 */
type ContentInput = string | MaybeReadonly<unknown[]>;
/**
 * Content requirement type.
 */
type ContentRequirement<TInput extends ContentInput> = TInput extends readonly unknown[] ? TInput[number] : TInput;
/**
 * Entries input type.
 */
type EntriesInput = Record<string | number, unknown>;
/**
 * Length input type.
 */
type LengthInput = string | ArrayLike<unknown>;
/**
 * Size input type.
 */
type SizeInput = Blob | Map<unknown, unknown> | Set<unknown>;
/**
 * Value input type.
 */
type ValueInput = string | number | bigint | boolean | Date;

/**
 * Check items issue interface.
 */
interface CheckItemsIssue<TInput extends ArrayInput> extends BaseIssue<TInput[number]> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'check_items';
    /**
     * The expected input.
     */
    readonly expected: null;
    /**
     * The validation function.
     */
    readonly requirement: ArrayRequirementAsync<TInput>;
}

/**
 * Check items action interface.
 */
interface CheckItemsAction<TInput extends ArrayInput, TMessage extends ErrorMessage<CheckItemsIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, CheckItemsIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'check_items';
    /**
     * The action reference.
     */
    readonly reference: typeof checkItems;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The validation function.
     */
    readonly requirement: ArrayRequirement$1<TInput>;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an check items validation action.
 *
 * @param requirement The validation function.
 *
 * @returns An check items action.
 */
declare function checkItems<TInput extends ArrayInput>(requirement: ArrayRequirement$1<TInput>): CheckItemsAction<TInput, undefined>;
/**
 * Creates an check items validation action.
 *
 * @param requirement The validation function.
 * @param message The error message.
 *
 * @returns An check items action.
 */
declare function checkItems<TInput extends ArrayInput, const TMessage extends ErrorMessage<CheckItemsIssue<TInput>> | undefined>(requirement: ArrayRequirement$1<TInput>, message: TMessage): CheckItemsAction<TInput, TMessage>;

/**
 * Check items action async interface.
 */
interface CheckItemsActionAsync<TInput extends ArrayInput, TMessage extends ErrorMessage<CheckItemsIssue<TInput>> | undefined> extends BaseValidationAsync<TInput, TInput, CheckItemsIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'check_items';
    /**
     * The action reference.
     */
    readonly reference: typeof checkItemsAsync;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The validation function.
     */
    readonly requirement: ArrayRequirementAsync<TInput>;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a check items validation action.
 *
 * @param requirement The validation function.
 *
 * @returns A check items action.
 */
declare function checkItemsAsync<TInput extends ArrayInput>(requirement: ArrayRequirementAsync<TInput>): CheckItemsActionAsync<TInput, undefined>;
/**
 * Creates a check items validation action.
 *
 * @param requirement The validation function.
 * @param message The error message.
 *
 * @returns A check items action.
 */
declare function checkItemsAsync<TInput extends ArrayInput, const TMessage extends ErrorMessage<CheckItemsIssue<TInput>> | undefined>(requirement: ArrayRequirementAsync<TInput>, message: TMessage): CheckItemsActionAsync<TInput, TMessage>;

/**
 * Credit card issue interface.
 */
interface CreditCardIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'credit_card';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The validation function.
     */
    readonly requirement: (input: string) => boolean;
}
/**
 * Credit card action interface.
 */
interface CreditCardAction<TInput extends string, TMessage extends ErrorMessage<CreditCardIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, CreditCardIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'credit_card';
    /**
     * The action reference.
     */
    readonly reference: typeof creditCard;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The validation function.
     */
    readonly requirement: (input: string) => boolean;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [credit card](https://en.wikipedia.org/wiki/Payment_card_number) validation action.
 *
 * @returns A Credit card action.
 */
declare function creditCard<TInput extends string>(): CreditCardAction<TInput, undefined>;
/**
 * Creates a [credit card](https://en.wikipedia.org/wiki/Payment_card_number) validation action.
 *
 * @param message The error message.
 *
 * @returns A credit card action.
 */
declare function creditCard<TInput extends string, const TMessage extends ErrorMessage<CreditCardIssue<TInput>> | undefined>(message: TMessage): CreditCardAction<TInput, TMessage>;

/**
 * Cuid2 issue interface.
 */
interface Cuid2Issue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'cuid2';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The Cuid2 regex.
     */
    readonly requirement: RegExp;
}
/**
 * Cuid2 action interface.
 */
interface Cuid2Action<TInput extends string, TMessage extends ErrorMessage<Cuid2Issue<TInput>> | undefined> extends BaseValidation<TInput, TInput, Cuid2Issue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'cuid2';
    /**
     * The action reference.
     */
    readonly reference: typeof cuid2;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The Cuid2 regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [Cuid2](https://github.com/paralleldrive/cuid2) validation action.
 *
 * @returns A Cuid2 action.
 */
declare function cuid2<TInput extends string>(): Cuid2Action<TInput, undefined>;
/**
 * Creates a [Cuid2](https://github.com/paralleldrive/cuid2) validation action.
 *
 * @param message The error message.
 *
 * @returns A Cuid2 action.
 */
declare function cuid2<TInput extends string, const TMessage extends ErrorMessage<Cuid2Issue<TInput>> | undefined>(message: TMessage): Cuid2Action<TInput, TMessage>;

/**
 * Decimal issue interface.
 */
interface DecimalIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'decimal';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The decimal regex.
     */
    readonly requirement: RegExp;
}
/**
 * Decimal action interface.
 */
interface DecimalAction<TInput extends string, TMessage extends ErrorMessage<DecimalIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, DecimalIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'decimal';
    /**
     * The action reference.
     */
    readonly reference: typeof decimal;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The decimal regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [decimal](https://en.wikipedia.org/wiki/Decimal) validation action.
 *
 * @returns An decimal action.
 */
declare function decimal<TInput extends string>(): DecimalAction<TInput, undefined>;
/**
 * Creates a [decimal](https://en.wikipedia.org/wiki/Decimal) validation action.
 *
 * @param message The error message.
 *
 * @returns An decimal action.
 */
declare function decimal<TInput extends string, const TMessage extends ErrorMessage<DecimalIssue<TInput>> | undefined>(message: TMessage): DecimalAction<TInput, TMessage>;

/**
 * Description action interface.
 */
interface DescriptionAction<TInput, TDescription extends string> extends BaseMetadata<TInput> {
    /**
     * The action type.
     */
    readonly type: 'description';
    /**
     * The action reference.
     */
    readonly reference: typeof description;
    /**
     * The description text.
     */
    readonly description: TDescription;
}
/**
 * Creates a description metadata action.
 *
 * @param description_ The description text.
 *
 * @returns A description action.
 */
declare function description<TInput, TDescription extends string>(description_: TDescription): DescriptionAction<TInput, TDescription>;

/**
 * Digits issue interface.
 */
interface DigitsIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'digits';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The digits regex.
     */
    readonly requirement: RegExp;
}
/**
 * Digits action interface.
 */
interface DigitsAction<TInput extends string, TMessage extends ErrorMessage<DigitsIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, DigitsIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'digits';
    /**
     * The action reference.
     */
    readonly reference: typeof digits;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The digits regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [digits](https://en.wikipedia.org/wiki/Numerical_digit) validation action.
 *
 * @returns An digits action.
 */
declare function digits<TInput extends string>(): DigitsAction<TInput, undefined>;
/**
 * Creates a [digits](https://en.wikipedia.org/wiki/Numerical_digit) validation action.
 *
 * @param message The error message.
 *
 * @returns An digits action.
 */
declare function digits<TInput extends string, const TMessage extends ErrorMessage<DigitsIssue<TInput>> | undefined>(message: TMessage): DigitsAction<TInput, TMessage>;

/**
 * Email issue interface.
 */
interface EmailIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'email';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The email regex.
     */
    readonly requirement: RegExp;
}
/**
 * Email action interface.
 */
interface EmailAction<TInput extends string, TMessage extends ErrorMessage<EmailIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, EmailIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'email';
    /**
     * The action reference.
     */
    readonly reference: typeof email;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The email regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [email](https://en.wikipedia.org/wiki/Email_address) validation
 * action.
 *
 * Hint: This validation action intentionally only validates common email
 * addresses. If you are interested in an action that covers the entire
 * specification, please use the `rfcEmail` action instead.
 *
 * @returns An email action.
 */
declare function email<TInput extends string>(): EmailAction<TInput, undefined>;
/**
 * Creates an [email](https://en.wikipedia.org/wiki/Email_address) validation
 * action.
 *
 * Hint: This validation action intentionally only validates common email
 * addresses. If you are interested in an action that covers the entire
 * specification, please use the `rfcEmail` action instead.
 *
 * @param message The error message.
 *
 * @returns An email action.
 */
declare function email<TInput extends string, const TMessage extends ErrorMessage<EmailIssue<TInput>> | undefined>(message: TMessage): EmailAction<TInput, TMessage>;

/**
 * Emoji issue interface.
 */
interface EmojiIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'emoji';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The emoji regex.
     */
    readonly requirement: RegExp;
}
/**
 * Emoji action interface.
 */
interface EmojiAction<TInput extends string, TMessage extends ErrorMessage<EmojiIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, EmojiIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'emoji';
    /**
     * The action reference.
     */
    readonly reference: typeof emoji;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The emoji regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [emoji](https://en.wikipedia.org/wiki/Emoji) validation action.
 *
 * @returns An emoji action.
 */
declare function emoji<TInput extends string>(): EmojiAction<TInput, undefined>;
/**
 * Creates an [emoji](https://en.wikipedia.org/wiki/Emoji) validation action.
 *
 * @param message The error message.
 *
 * @returns An emoji action.
 */
declare function emoji<TInput extends string, const TMessage extends ErrorMessage<EmojiIssue<TInput>> | undefined>(message: TMessage): EmojiAction<TInput, TMessage>;

/**
 * Empty issue interface.
 */
interface EmptyIssue<TInput extends LengthInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'empty';
    /**
     * The expected input.
     */
    readonly expected: '0';
    /**
     * The received input.
     */
    readonly received: `${number}`;
}
/**
 * Empty action interface.
 */
interface EmptyAction<TInput extends LengthInput, TMessage extends ErrorMessage<EmptyIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, EmptyIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'empty';
    /**
     * The action reference.
     */
    readonly reference: typeof empty;
    /**
     * The expected property.
     */
    readonly expects: '0';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an empty validation action.
 *
 * @returns An empty action.
 */
declare function empty<TInput extends LengthInput>(): EmptyAction<TInput, undefined>;
/**
 * Creates an empty validation action.
 *
 * @param message The error message.
 *
 * @returns An empty action.
 */
declare function empty<TInput extends LengthInput, const TMessage extends ErrorMessage<EmptyIssue<TInput>> | undefined>(message: TMessage): EmptyAction<TInput, TMessage>;

/**
 * Ends with issue interface.
 */
interface EndsWithIssue<TInput extends string, TRequirement extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'ends_with';
    /**
     * The expected property.
     */
    readonly expected: `"${TRequirement}"`;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The end string.
     */
    readonly requirement: TRequirement;
}
/**
 * Ends with action interface.
 */
interface EndsWithAction<TInput extends string, TRequirement extends string, TMessage extends ErrorMessage<EndsWithIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, EndsWithIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'ends_with';
    /**
     * The action reference.
     */
    readonly reference: typeof endsWith;
    /**
     * The expected property.
     */
    readonly expects: `"${TRequirement}"`;
    /**
     * The end string.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an ends with validation action.
 *
 * @param requirement The end string.
 *
 * @returns An ends with action.
 */
declare function endsWith<TInput extends string, const TRequirement extends string>(requirement: TRequirement): EndsWithAction<TInput, TRequirement, undefined>;
/**
 * Creates an ends with validation action.
 *
 * @param requirement The end string.
 * @param message The error message.
 *
 * @returns An ends with action.
 */
declare function endsWith<TInput extends string, const TRequirement extends string, const TMessage extends ErrorMessage<EndsWithIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): EndsWithAction<TInput, TRequirement, TMessage>;

/**
 * Entries issue interface.
 *
 * @beta
 */
interface EntriesIssue<TInput extends EntriesInput, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'entries';
    /**
     * The expected property.
     */
    readonly expected: `${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The required entries.
     */
    readonly requirement: TRequirement;
}
/**
 * Entries action interface.
 *
 * @beta
 */
interface EntriesAction<TInput extends EntriesInput, TRequirement extends number, TMessage extends ErrorMessage<EntriesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, EntriesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'entries';
    /**
     * The action reference.
     */
    readonly reference: typeof entries;
    /**
     * The expected property.
     */
    readonly expects: `${TRequirement}`;
    /**
     * The required entries.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an entries validation action.
 *
 * @param requirement The required entries.
 *
 * @returns An entries action.
 *
 * @beta
 */
declare function entries<TInput extends EntriesInput, const TRequirement extends number>(requirement: TRequirement): EntriesAction<TInput, TRequirement, undefined>;
/**
 * Creates an entries validation action.
 *
 * @param requirement The required entries.
 * @param message The error message.
 *
 * @returns An entries action.
 *
 * @beta
 */
declare function entries<TInput extends EntriesInput, const TRequirement extends number, const TMessage extends ErrorMessage<EntriesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): EntriesAction<TInput, TRequirement, TMessage>;

/**
 * Every item issue interface.
 */
interface EveryItemIssue<TInput extends ArrayInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'every_item';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The validation function.
     */
    readonly requirement: ArrayRequirement$1<TInput>;
}
/**
 * Every item action interface.
 */
interface EveryItemAction<TInput extends ArrayInput, TMessage extends ErrorMessage<EveryItemIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, EveryItemIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'every_item';
    /**
     * The action reference.
     */
    readonly reference: typeof everyItem;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The validation function.
     */
    readonly requirement: ArrayRequirement$1<TInput>;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an every item validation action.
 *
 * @param requirement The validation function.
 *
 * @returns An every item action.
 */
declare function everyItem<TInput extends ArrayInput>(requirement: ArrayRequirement$1<TInput>): EveryItemAction<TInput, undefined>;
/**
 * Creates an every item validation action.
 *
 * @param requirement The validation function.
 * @param message The error message.
 *
 * @returns An every item action.
 */
declare function everyItem<TInput extends ArrayInput, const TMessage extends ErrorMessage<EveryItemIssue<TInput>> | undefined>(requirement: ArrayRequirement$1<TInput>, message: TMessage): EveryItemAction<TInput, TMessage>;

/**
 * Excludes issue interface.
 */
interface ExcludesIssue<TInput extends ContentInput, TRequirement extends ContentRequirement<TInput>> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'excludes';
    /**
     * The expected property.
     */
    readonly expected: string;
    /**
     * The content to be excluded.
     */
    readonly requirement: TRequirement;
}
/**
 * Excludes action interface.
 */
interface ExcludesAction<TInput extends ContentInput, TRequirement extends ContentRequirement<TInput>, TMessage extends ErrorMessage<ExcludesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, ExcludesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'excludes';
    /**
     * The action reference.
     */
    readonly reference: typeof excludes;
    /**
     * The expected property.
     */
    readonly expects: string;
    /**
     * The content to be excluded.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an excludes validation action.
 *
 * @param requirement The content to be excluded.
 *
 * @returns An excludes action.
 */
declare function excludes<TInput extends ContentInput, const TRequirement extends ContentRequirement<TInput>>(requirement: TRequirement): ExcludesAction<TInput, TRequirement, undefined>;
/**
 * Creates an excludes validation action.
 *
 * @param requirement The content to be excluded.
 * @param message The error message.
 *
 * @returns An excludes action.
 */
declare function excludes<TInput extends ContentInput, const TRequirement extends ContentRequirement<TInput>, const TMessage extends ErrorMessage<ExcludesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): ExcludesAction<TInput, TRequirement, TMessage>;

/**
 * Filter items action interface.
 */
interface FilterItemsAction<TInput extends ArrayInput> extends BaseTransformation<TInput, TInput, never> {
    /**
     * The action type.
     */
    readonly type: 'filter_items';
    /**
     * The action reference.
     */
    readonly reference: typeof filterItems;
    /**
     * The filter items operation.
     */
    readonly operation: ArrayRequirement$1<TInput>;
}
/**
 * Creates a filter items transformation action.
 *
 * @param operation The filter items operation.
 *
 * @returns A filter items action.
 */
declare function filterItems<TInput extends ArrayInput>(operation: ArrayRequirement$1<TInput>): FilterItemsAction<TInput>;

/**
 * Array requirement type.
 */
type ArrayRequirement<TInput extends ArrayInput, TOuput extends TInput[number]> = ((item: TInput[number], index: number, array: TInput) => item is TOuput) | ((item: TInput[number], index: number, array: TInput) => boolean);
/**
 * Find item action interface.
 */
interface FindItemAction<TInput extends ArrayInput, TOuput extends TInput[number]> extends BaseTransformation<TInput, TOuput | undefined, never> {
    /**
     * The action type.
     */
    readonly type: 'find_item';
    /**
     * The action reference.
     */
    readonly reference: typeof findItem;
    /**
     * The find item operation.
     */
    readonly operation: ArrayRequirement<TInput, TOuput>;
}
/**
 * Creates a find item transformation action.
 *
 * @param operation The find item operation.
 *
 * @returns A find item action.
 */
declare function findItem<TInput extends ArrayInput, TOuput extends TInput[number]>(operation: ArrayRequirement<TInput, TOuput>): FindItemAction<TInput, TOuput>;

/**
 * Finite issue interface.
 */
interface FiniteIssue<TInput extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'finite';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The validation function.
     */
    readonly requirement: (input: number) => boolean;
}
/**
 * Finite action interface.
 */
interface FiniteAction<TInput extends number, TMessage extends ErrorMessage<FiniteIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, FiniteIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'finite';
    /**
     * The action reference.
     */
    readonly reference: typeof finite;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The validation function.
     */
    readonly requirement: (input: number) => boolean;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [finite](https://en.wikipedia.org/wiki/Finite) validation action.
 *
 * @returns A finite action.
 */
declare function finite<TInput extends number>(): FiniteAction<TInput, undefined>;
/**
 * Creates a [finite](https://en.wikipedia.org/wiki/Finite) validation action.
 *
 * @param message The error message.
 *
 * @returns A finite action.
 */
declare function finite<TInput extends number, const TMessage extends ErrorMessage<FiniteIssue<TInput>> | undefined>(message: TMessage): FiniteAction<TInput, TMessage>;

/**
 * Flavor symbol.
 *
 * @beta
 */
declare const FlavorSymbol: unique symbol;
/**
 * Flavor name type.
 *
 * @beta
 */
type FlavorName = string | number | symbol;
/**
 * Flavor interface.
 *
 * @beta
 */
interface Flavor<TName extends FlavorName> {
    [FlavorSymbol]?: {
        [TValue in TName]: TValue;
    };
}
/**
 * Flavor action interface.
 *
 * @beta
 */
interface FlavorAction<TInput, TName extends FlavorName> extends BaseTransformation<TInput, TInput & Flavor<TName>, never> {
    /**
     * The action type.
     */
    readonly type: 'flavor';
    /**
     * The action reference.
     */
    readonly reference: typeof flavor;
    /**
     * The flavor name.
     */
    readonly name: TName;
}
/**
 * Creates a flavor transformation action.
 *
 * @param name The flavor name.
 *
 * @returns A flavor action.
 *
 * @beta
 */
declare function flavor<TInput, TName extends FlavorName>(name: TName): FlavorAction<TInput, TName>;

/**
 * Graphemes issue interface.
 */
interface GraphemesIssue<TInput extends string, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'graphemes';
    /**
     * The expected property.
     */
    readonly expected: `${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The required graphemes.
     */
    readonly requirement: TRequirement;
}
/**
 * Graphemes action interface.
 */
interface GraphemesAction<TInput extends string, TRequirement extends number, TMessage extends ErrorMessage<GraphemesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, GraphemesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'graphemes';
    /**
     * The action reference.
     */
    readonly reference: typeof graphemes;
    /**
     * The expected property.
     */
    readonly expects: `${TRequirement}`;
    /**
     * The required graphemes.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a graphemes validation action.
 *
 * @param requirement The required graphemes.
 *
 * @returns A graphemes action.
 */
declare function graphemes<TInput extends string, const TRequirement extends number>(requirement: TRequirement): GraphemesAction<TInput, TRequirement, undefined>;
/**
 * Creates a graphemes validation action.
 *
 * @param requirement The required graphemes.
 * @param message The error message.
 *
 * @returns A graphemes action.
 */
declare function graphemes<TInput extends string, const TRequirement extends number, const TMessage extends ErrorMessage<GraphemesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): GraphemesAction<TInput, TRequirement, TMessage>;

/**
 * Greater than value issue type.
 */
interface GtValueIssue<TInput extends ValueInput, TRequirement extends TInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'gt_value';
    /**
     * The expected property.
     */
    readonly expected: `>${string}`;
    /**
     * The greater than value.
     */
    readonly requirement: TRequirement;
}
/**
 * Greater than value action type.
 */
interface GtValueAction<TInput extends ValueInput, TRequirement extends TInput, TMessage extends ErrorMessage<GtValueIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, GtValueIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'gt_value';
    /**
     * The action reference.
     */
    readonly reference: typeof gtValue;
    /**
     * The expected property.
     */
    readonly expects: `>${string}`;
    /**
     * The greater than value.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a greater than value validation action.
 *
 * @param requirement The greater than value.
 *
 * @returns A greater than value action.
 */
declare function gtValue<TInput extends ValueInput, const TRequirement extends TInput>(requirement: TRequirement): GtValueAction<TInput, TRequirement, undefined>;
/**
 * Creates a greater than value validation action.
 *
 * @param requirement The greater than value.
 * @param message The error message.
 *
 * @returns A greater than value action.
 */
declare function gtValue<TInput extends ValueInput, const TRequirement extends TInput, const TMessage extends ErrorMessage<GtValueIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): GtValueAction<TInput, TRequirement, TMessage>;

/**
 * Hash lengths object.
 */
declare const HASH_LENGTHS: {
    readonly md4: 32;
    readonly md5: 32;
    readonly sha1: 40;
    readonly sha256: 64;
    readonly sha384: 96;
    readonly sha512: 128;
    readonly ripemd128: 32;
    readonly ripemd160: 40;
    readonly tiger128: 32;
    readonly tiger160: 40;
    readonly tiger192: 48;
    readonly crc32: 8;
    readonly crc32b: 8;
    readonly adler32: 8;
};
/**
 * Hash type type.
 */
type HashType = keyof typeof HASH_LENGTHS;
/**
 * Hash issue interface.
 */
interface HashIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'hash';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The hash regex.
     */
    readonly requirement: RegExp;
}
/**
 * Hash action interface.
 */
interface HashAction<TInput extends string, TMessage extends ErrorMessage<HashIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, HashIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'hash';
    /**
     * The action reference.
     */
    readonly reference: typeof hash;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The hash regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [hash](https://en.wikipedia.org/wiki/Hash_function) validation action.
 *
 * @param types The hash types.
 *
 * @returns A hash action.
 */
declare function hash<TInput extends string>(types: [HashType, ...HashType[]]): HashAction<TInput, undefined>;
/**
 * Creates a [hash](https://en.wikipedia.org/wiki/Hash_function) validation action.
 *
 * @param types The hash types.
 * @param message The error message.
 *
 * @returns A hash action.
 */
declare function hash<TInput extends string, const TMessage extends ErrorMessage<HashIssue<TInput>> | undefined>(types: [HashType, ...HashType[]], message: TMessage): HashAction<TInput, TMessage>;

/**
 * Hexadecimal issue interface.
 */
interface HexadecimalIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'hexadecimal';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The hexadecimal regex.
     */
    readonly requirement: RegExp;
}
/**
 * Hexadecimal action interface.
 */
interface HexadecimalAction<TInput extends string, TMessage extends ErrorMessage<HexadecimalIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, HexadecimalIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'hexadecimal';
    /**
     * The action reference.
     */
    readonly reference: typeof hexadecimal;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The hexadecimal regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) validation action.
 *
 * @returns A hexadecimal action.
 */
declare function hexadecimal<TInput extends string>(): HexadecimalAction<TInput, undefined>;
/**
 * Creates a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) validation action.
 *
 * @param message The error message.
 *
 * @returns A hexadecimal action.
 */
declare function hexadecimal<TInput extends string, const TMessage extends ErrorMessage<HexadecimalIssue<TInput>> | undefined>(message: TMessage): HexadecimalAction<TInput, TMessage>;

/**
 * Hex color issue interface.
 */
interface HexColorIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'hex_color';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The hex color regex.
     */
    readonly requirement: RegExp;
}
/**
 * Hex color action interface.
 */
interface HexColorAction<TInput extends string, TMessage extends ErrorMessage<HexColorIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, HexColorIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'hex_color';
    /**
     * The action reference.
     */
    readonly reference: typeof hexColor;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The hex color regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [hex color](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet) validation action.
 *
 * @returns A hex color action.
 */
declare function hexColor<TInput extends string>(): HexColorAction<TInput, undefined>;
/**
 * Creates a [hex color](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet) validation action.
 *
 * @param message The error message.
 *
 * @returns A hex color action.
 */
declare function hexColor<TInput extends string, const TMessage extends ErrorMessage<HexColorIssue<TInput>> | undefined>(message: TMessage): HexColorAction<TInput, TMessage>;

/**
 * IMEI issue interface.
 */
interface ImeiIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'imei';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The validation function.
     */
    readonly requirement: (input: string) => boolean;
}
/**
 * IMEI action interface.
 */
interface ImeiAction<TInput extends string, TMessage extends ErrorMessage<ImeiIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, ImeiIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'imei';
    /**
     * The action reference.
     */
    readonly reference: typeof imei;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The validation function.
     */
    readonly requirement: (input: string) => boolean;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [IMEI](https://en.wikipedia.org/wiki/International_Mobile_Equipment_Identity) validation action.
 *
 * Formats:
 * - AABBBBBBCCCCCCD
 * - AA-BBBBBB-CCCCCC-D
 *
 * @returns An IMEI action.
 */
declare function imei<TInput extends string>(): ImeiAction<TInput, undefined>;
/**
 * Creates an [IMEI](https://en.wikipedia.org/wiki/International_Mobile_Equipment_Identity) validation action.
 *
 * Formats:
 * - AABBBBBBCCCCCCD
 * - AA-BBBBBB-CCCCCC-D
 *
 * @param message The error message.
 *
 * @returns An IMEI action.
 */
declare function imei<TInput extends string, const TMessage extends ErrorMessage<ImeiIssue<TInput>> | undefined>(message: TMessage): ImeiAction<TInput, TMessage>;

/**
 * Includes issue interface.
 */
interface IncludesIssue<TInput extends ContentInput, TRequirement extends ContentRequirement<TInput>> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'includes';
    /**
     * The expected property.
     */
    readonly expected: string;
    /**
     * The content to be included.
     */
    readonly requirement: TRequirement;
}
/**
 * Includes action interface.
 */
interface IncludesAction<TInput extends ContentInput, TRequirement extends ContentRequirement<TInput>, TMessage extends ErrorMessage<IncludesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, IncludesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'includes';
    /**
     * The action reference.
     */
    readonly reference: typeof includes;
    /**
     * The expected property.
     */
    readonly expects: string;
    /**
     * The content to be included.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an includes validation action.
 *
 * @param requirement The content to be included.
 *
 * @returns An includes action.
 */
declare function includes<TInput extends ContentInput, const TRequirement extends ContentRequirement<TInput>>(requirement: TRequirement): IncludesAction<TInput, TRequirement, undefined>;
/**
 * Creates an includes validation action.
 *
 * @param requirement The content to be included.
 * @param message The error message.
 *
 * @returns An includes action.
 */
declare function includes<TInput extends ContentInput, const TRequirement extends ContentRequirement<TInput>, const TMessage extends ErrorMessage<IncludesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): IncludesAction<TInput, TRequirement, TMessage>;

/**
 * Integer issue interface.
 */
interface IntegerIssue<TInput extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'integer';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The validation function.
     */
    readonly requirement: (input: number) => boolean;
}
/**
 * Integer action interface.
 */
interface IntegerAction<TInput extends number, TMessage extends ErrorMessage<IntegerIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, IntegerIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'integer';
    /**
     * The action reference.
     */
    readonly reference: typeof integer;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The validation function.
     */
    readonly requirement: (input: number) => boolean;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [integer](https://en.wikipedia.org/wiki/Integer) validation action.
 *
 * @returns An integer action.
 */
declare function integer<TInput extends number>(): IntegerAction<TInput, undefined>;
/**
 * Creates an [integer](https://en.wikipedia.org/wiki/Integer) validation action.
 *
 * @param message The error message.
 *
 * @returns An integer action.
 */
declare function integer<TInput extends number, const TMessage extends ErrorMessage<IntegerIssue<TInput>> | undefined>(message: TMessage): IntegerAction<TInput, TMessage>;

/**
 * IP issue interface.
 */
interface IpIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'ip';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The IP regex.
     */
    readonly requirement: RegExp;
}
/**
 * IP action interface.
 */
interface IpAction<TInput extends string, TMessage extends ErrorMessage<IpIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, IpIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'ip';
    /**
     * The action reference.
     */
    readonly reference: typeof ip;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The IP regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [IP address](https://en.wikipedia.org/wiki/IP_address) validation action.
 *
 * @returns An IP action.
 */
declare function ip<TInput extends string>(): IpAction<TInput, undefined>;
/**
 * Creates an [IP address](https://en.wikipedia.org/wiki/IP_address) validation action.
 *
 * @param message The error message.
 *
 * @returns An IP action.
 */
declare function ip<TInput extends string, const TMessage extends ErrorMessage<IpIssue<TInput>> | undefined>(message: TMessage): IpAction<TInput, TMessage>;

/**
 * IPv4 issue interface.
 */
interface Ipv4Issue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'ipv4';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The IPv4 regex.
     */
    readonly requirement: RegExp;
}
/**
 * IPv4 action interface.
 */
interface Ipv4Action<TInput extends string, TMessage extends ErrorMessage<Ipv4Issue<TInput>> | undefined> extends BaseValidation<TInput, TInput, Ipv4Issue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'ipv4';
    /**
     * The action reference.
     */
    readonly reference: typeof ipv4;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The IPv4 regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [IPv4](https://en.wikipedia.org/wiki/IPv4) address validation action.
 *
 * @returns An IPv4 action.
 */
declare function ipv4<TInput extends string>(): Ipv4Action<TInput, undefined>;
/**
 * Creates an [IPv4](https://en.wikipedia.org/wiki/IPv4) address validation action.
 *
 * @param message The error message.
 *
 * @returns An IPv4 action.
 */
declare function ipv4<TInput extends string, const TMessage extends ErrorMessage<Ipv4Issue<TInput>> | undefined>(message: TMessage): Ipv4Action<TInput, TMessage>;

/**
 * IPv6 issue interface.
 */
interface Ipv6Issue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'ipv6';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The IPv6 regex.
     */
    readonly requirement: RegExp;
}
/**
 * IPv6 action interface.
 */
interface Ipv6Action<TInput extends string, TMessage extends ErrorMessage<Ipv6Issue<TInput>> | undefined> extends BaseValidation<TInput, TInput, Ipv6Issue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'ipv6';
    /**
     * The action reference.
     */
    readonly reference: typeof ipv6;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The IPv6 regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [IPv6](https://en.wikipedia.org/wiki/IPv6) address validation action.
 *
 * @returns An IPv6 action.
 */
declare function ipv6<TInput extends string>(): Ipv6Action<TInput, undefined>;
/**
 * Creates an [IPv6](https://en.wikipedia.org/wiki/IPv6) address validation action.
 *
 * @param message The error message.
 *
 * @returns An IPv6 action.
 */
declare function ipv6<TInput extends string, const TMessage extends ErrorMessage<Ipv6Issue<TInput>> | undefined>(message: TMessage): Ipv6Action<TInput, TMessage>;

/**
 * ISO date issue interface.
 */
interface IsoDateIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'iso_date';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The ISO date regex.
     */
    readonly requirement: RegExp;
}
/**
 * ISO date action interface.
 */
interface IsoDateAction<TInput extends string, TMessage extends ErrorMessage<IsoDateIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, IsoDateIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'iso_date';
    /**
     * The action reference.
     */
    readonly reference: typeof isoDate;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The ISO date regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [ISO date](https://en.wikipedia.org/wiki/ISO_8601) validation action.
 *
 * Format: yyyy-mm-dd
 *
 * Hint: The regex used cannot validate the maximum number of days based on
 * year and month. For example, "2023-06-31" is valid although June has only
 * 30 days.
 *
 * @returns An ISO date action.
 */
declare function isoDate<TInput extends string>(): IsoDateAction<TInput, undefined>;
/**
 * Creates an [ISO date](https://en.wikipedia.org/wiki/ISO_8601) validation action.
 *
 * Format: yyyy-mm-dd
 *
 * Hint: The regex used cannot validate the maximum number of days based on
 * year and month. For example, "2023-06-31" is valid although June has only
 * 30 days.
 *
 * @param message The error message.
 *
 * @returns An ISO date action.
 */
declare function isoDate<TInput extends string, const TMessage extends ErrorMessage<IsoDateIssue<TInput>> | undefined>(message: TMessage): IsoDateAction<TInput, TMessage>;

/**
 * ISO date time issue interface.
 */
interface IsoDateTimeIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'iso_date_time';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The ISO date time regex.
     */
    readonly requirement: RegExp;
}
/**
 * ISO date time action interface.
 */
interface IsoDateTimeAction<TInput extends string, TMessage extends ErrorMessage<IsoDateTimeIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, IsoDateTimeIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'iso_date_time';
    /**
     * The action reference.
     */
    readonly reference: typeof isoDateTime;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The ISO date time regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [ISO date time](https://en.wikipedia.org/wiki/ISO_8601) validation action.
 *
 * Format: yyyy-mm-ddThh:mm
 *
 * Hint: The regex used cannot validate the maximum number of days based on
 * year and month. For example, "2023-06-31T00:00" is valid although June has only
 * 30 days.
 *
 * Hint: The regex also allows a space as a separator between the date and time
 * parts instead of the "T" character.
 *
 * @returns An ISO date time action.
 */
declare function isoDateTime<TInput extends string>(): IsoDateTimeAction<TInput, undefined>;
/**
 * Creates an [ISO date time](https://en.wikipedia.org/wiki/ISO_8601) validation action.
 *
 * Format: yyyy-mm-ddThh:mm
 *
 * Hint: The regex used cannot validate the maximum number of days based on
 * year and month. For example, "2023-06-31T00:00" is valid although June has only
 * 30 days.
 *
 * Hint: The regex also allows a space as a separator between the date and time
 * parts instead of the "T" character.
 *
 * @param message The error message.
 *
 * @returns An ISO date time action.
 */
declare function isoDateTime<TInput extends string, const TMessage extends ErrorMessage<IsoDateTimeIssue<TInput>> | undefined>(message: TMessage): IsoDateTimeAction<TInput, TMessage>;

/**
 * ISO time issue interface.
 */
interface IsoTimeIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'iso_time';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The ISO time regex.
     */
    readonly requirement: RegExp;
}
/**
 * ISO time action interface.
 */
interface IsoTimeAction<TInput extends string, TMessage extends ErrorMessage<IsoTimeIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, IsoTimeIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'iso_time';
    /**
     * The action reference.
     */
    readonly reference: typeof isoTime;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The ISO time regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [ISO time](https://en.wikipedia.org/wiki/ISO_8601) validation action.
 *
 * Format: hh:mm
 *
 * @returns An ISO time action.
 */
declare function isoTime<TInput extends string>(): IsoTimeAction<TInput, undefined>;
/**
 * Creates an [ISO time](https://en.wikipedia.org/wiki/ISO_8601) validation action.
 *
 * Format: hh:mm
 *
 * @param message The error message.
 *
 * @returns An ISO time action.
 */
declare function isoTime<TInput extends string, const TMessage extends ErrorMessage<IsoTimeIssue<TInput>> | undefined>(message: TMessage): IsoTimeAction<TInput, TMessage>;

/**
 * ISO time second issue interface.
 */
interface IsoTimeSecondIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'iso_time_second';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The ISO time with seconds regex.
     */
    readonly requirement: RegExp;
}
/**
 * ISO time second action interface.
 */
interface IsoTimeSecondAction<TInput extends string, TMessage extends ErrorMessage<IsoTimeSecondIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, IsoTimeSecondIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'iso_time_second';
    /**
     * The action reference.
     */
    readonly reference: typeof isoTimeSecond;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The ISO time second regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [ISO time second](https://en.wikipedia.org/wiki/ISO_8601) validation action.
 *
 * Format: hh:mm:ss
 *
 * @returns An ISO time second action.
 */
declare function isoTimeSecond<TInput extends string>(): IsoTimeSecondAction<TInput, undefined>;
/**
 * Creates an [ISO time second](https://en.wikipedia.org/wiki/ISO_8601) validation action.
 *
 * Format: hh:mm:ss
 *
 * @param message The error message.
 *
 * @returns An ISO time second action.
 */
declare function isoTimeSecond<TInput extends string, const TMessage extends ErrorMessage<IsoTimeSecondIssue<TInput>> | undefined>(message: TMessage): IsoTimeSecondAction<TInput, TMessage>;

/**
 * ISO timestamp issue interface.
 */
interface IsoTimestampIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'iso_timestamp';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The ISO timestamp regex.
     */
    readonly requirement: RegExp;
}
/**
 * ISO timestamp action interface.
 */
interface IsoTimestampAction<TInput extends string, TMessage extends ErrorMessage<IsoTimestampIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, IsoTimestampIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'iso_timestamp';
    /**
     * The action reference.
     */
    readonly reference: typeof isoTimestamp;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The ISO timestamp regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [ISO timestamp](https://en.wikipedia.org/wiki/ISO_8601) validation
 * action.
 *
 * Formats:
 * - yyyy-mm-ddThh:mm:ss.sssZ
 * - yyyy-mm-ddThh:mm:ss.sss±hh:mm
 * - yyyy-mm-ddThh:mm:ss.sss±hhmm
 *
 * Hint: To support timestamps with lower or higher accuracy, the millisecond
 * specification can be removed or contain up to 9 digits.
 *
 * Hint: The regex used cannot validate the maximum number of days based on
 * year and month. For example, "2023-06-31T00:00:00.000Z" is valid although
 * June has only 30 days.
 *
 * Hint: The regex also allows a space as a separator between the date and time
 * parts instead of the "T" character.
 *
 * @returns An ISO timestamp action.
 */
declare function isoTimestamp<TInput extends string>(): IsoTimestampAction<TInput, undefined>;
/**
 * Creates an [ISO timestamp](https://en.wikipedia.org/wiki/ISO_8601) validation
 * action.
 *
 * Formats:
 * - yyyy-mm-ddThh:mm:ss.sssZ
 * - yyyy-mm-ddThh:mm:ss.sss±hh:mm
 * - yyyy-mm-ddThh:mm:ss.sss±hhmm
 * - yyyy-mm-ddThh:mm:ss.sss±hh
 *
 * Hint: To support timestamps with lower or higher accuracy, the millisecond
 * specification can be removed or contain up to 9 digits.
 *
 * Hint: The regex used cannot validate the maximum number of days based on
 * year and month. For example, "2023-06-31T00:00:00.000Z" is valid although
 * June has only 30 days.
 *
 * Hint: The regex also allows a space as a separator between the date and time
 * parts instead of the "T" character.
 *
 * @param message The error message.
 *
 * @returns An ISO timestamp action.
 */
declare function isoTimestamp<TInput extends string, const TMessage extends ErrorMessage<IsoTimestampIssue<TInput>> | undefined>(message: TMessage): IsoTimestampAction<TInput, TMessage>;

/**
 * ISO week issue interface.
 */
interface IsoWeekIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'iso_week';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The ISO week regex.
     */
    readonly requirement: RegExp;
}
/**
 * ISO week action interface.
 */
interface IsoWeekAction<TInput extends string, TMessage extends ErrorMessage<IsoWeekIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, IsoWeekIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'iso_week';
    /**
     * The action reference.
     */
    readonly reference: typeof isoWeek;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The ISO week regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [ISO week](https://en.wikipedia.org/wiki/ISO_8601) validation action.
 *
 * Format: yyyy-Www
 *
 * Hint: The regex used cannot validate the maximum number of weeks based on
 * the year. For example, "2021W53" is valid although 2021 has only 52 weeks.
 *
 * @returns An ISO week action.
 */
declare function isoWeek<TInput extends string>(): IsoWeekAction<TInput, undefined>;
/**
 * Creates an [ISO week](https://en.wikipedia.org/wiki/ISO_8601) validation action.
 *
 * Format: yyyy-Www
 *
 * Hint: The regex used cannot validate the maximum number of weeks based on
 * the year. For example, "2021W53" is valid although 2021 has only 52 weeks.
 *
 * @param message The error message.
 *
 * @returns An ISO week action.
 */
declare function isoWeek<TInput extends string, const TMessage extends ErrorMessage<IsoWeekIssue<TInput>> | undefined>(message: TMessage): IsoWeekAction<TInput, TMessage>;

/**
 * Length issue interface.
 */
interface LengthIssue<TInput extends LengthInput, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'length';
    /**
     * The expected property.
     */
    readonly expected: `${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The required length.
     */
    readonly requirement: TRequirement;
}
/**
 * Length action interface.
 */
interface LengthAction<TInput extends LengthInput, TRequirement extends number, TMessage extends ErrorMessage<LengthIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, LengthIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'length';
    /**
     * The action reference.
     */
    readonly reference: typeof length;
    /**
     * The expected property.
     */
    readonly expects: `${TRequirement}`;
    /**
     * The required length.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a length validation action.
 *
 * @param requirement The required length.
 *
 * @returns A length action.
 */
declare function length<TInput extends LengthInput, const TRequirement extends number>(requirement: TRequirement): LengthAction<TInput, TRequirement, undefined>;
/**
 * Creates a length validation action.
 *
 * @param requirement The required length.
 * @param message The error message.
 *
 * @returns A length action.
 */
declare function length<TInput extends LengthInput, const TRequirement extends number, const TMessage extends ErrorMessage<LengthIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): LengthAction<TInput, TRequirement, TMessage>;

/**
 * Less than value issue type.
 */
interface LtValueIssue<TInput extends ValueInput, TRequirement extends TInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'lt_value';
    /**
     * The expected property.
     */
    readonly expected: `<${string}`;
    /**
     * The less than value.
     */
    readonly requirement: TRequirement;
}
/**
 * Less than value action type.
 */
interface LtValueAction<TInput extends ValueInput, TRequirement extends TInput, TMessage extends ErrorMessage<LtValueIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, LtValueIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'lt_value';
    /**
     * The action reference.
     */
    readonly reference: typeof ltValue;
    /**
     * The expected property.
     */
    readonly expects: `<${string}`;
    /**
     * The less than value.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a less than value validation action.
 *
 * @param requirement The less than value.
 *
 * @returns A less than value action.
 */
declare function ltValue<TInput extends ValueInput, const TRequirement extends TInput>(requirement: TRequirement): LtValueAction<TInput, TRequirement, undefined>;
/**
 * Creates a less than value validation action.
 *
 * @param requirement The less than value.
 * @param message The error message.
 *
 * @returns A less than value action.
 */
declare function ltValue<TInput extends ValueInput, const TRequirement extends TInput, const TMessage extends ErrorMessage<LtValueIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): LtValueAction<TInput, TRequirement, TMessage>;

/**
 * MAC issue interface.
 */
interface MacIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'mac';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The MAC regex.
     */
    readonly requirement: RegExp;
}
/**
 * MAC action interface.
 */
interface MacAction<TInput extends string, TMessage extends ErrorMessage<MacIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, MacIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'mac';
    /**
     * The action reference.
     */
    readonly reference: typeof mac;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The MAC regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.
 *
 * @returns A MAC action.
 */
declare function mac<TInput extends string>(): MacAction<TInput, undefined>;
/**
 * Creates a [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.
 *
 * @param message The error message.
 *
 * @returns A MAC action.
 */
declare function mac<TInput extends string, const TMessage extends ErrorMessage<MacIssue<TInput>> | undefined>(message: TMessage): MacAction<TInput, TMessage>;

/**
 * 48-bit MAC issue interface.
 */
interface Mac48Issue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'mac48';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The 48-bit MAC regex.
     */
    readonly requirement: RegExp;
}
/**
 * 48-bit MAC action interface.
 */
interface Mac48Action<TInput extends string, TMessage extends ErrorMessage<Mac48Issue<TInput>> | undefined> extends BaseValidation<TInput, TInput, Mac48Issue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'mac48';
    /**
     * The action reference.
     */
    readonly reference: typeof mac48;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The 48-bit MAC regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a 48-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.
 *
 * @returns A 48-bit MAC action.
 */
declare function mac48<TInput extends string>(): Mac48Action<TInput, undefined>;
/**
 * Creates a 48-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.
 *
 * @param message The error message.
 *
 * @returns A 48-bit MAC action.
 */
declare function mac48<TInput extends string, const TMessage extends ErrorMessage<Mac48Issue<TInput>> | undefined>(message: TMessage): Mac48Action<TInput, TMessage>;

/**
 * 64-bit MAC issue interface.
 */
interface Mac64Issue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'mac64';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The 64-bit MAC regex.
     */
    readonly requirement: RegExp;
}
/**
 * 64-bit MAC action interface.
 */
interface Mac64Action<TInput extends string, TMessage extends ErrorMessage<Mac64Issue<TInput>> | undefined> extends BaseValidation<TInput, TInput, Mac64Issue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'mac64';
    /**
     * The action reference.
     */
    readonly reference: typeof mac64;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The 64-bit MAC regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a 64-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.
 *
 * @returns A 64-bit MAC action.
 */
declare function mac64<TInput extends string>(): Mac64Action<TInput, undefined>;
/**
 * Creates a 64-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.
 *
 * @param message The error message.
 *
 * @returns A 64-bit MAC action.
 */
declare function mac64<TInput extends string, const TMessage extends ErrorMessage<Mac64Issue<TInput>> | undefined>(message: TMessage): Mac64Action<TInput, TMessage>;

/**
 * Array action type.
 */
type ArrayAction$2<TInput extends ArrayInput, TOutput> = (item: TInput[number], index: number, array: TInput) => TOutput;
/**
 * Map items action interface.
 */
interface MapItemsAction<TInput extends ArrayInput, TOutput> extends BaseTransformation<TInput, TOutput[], never> {
    /**
     * The action type.
     */
    readonly type: 'map_items';
    /**
     * The action reference.
     */
    readonly reference: typeof mapItems;
    /**
     * The map items operation.
     */
    readonly operation: ArrayAction$2<TInput, TOutput>;
}
/**
 * Creates a map items transformation action.
 *
 * @param operation The map items operation.
 *
 * @returns A map items action.
 */
declare function mapItems<TInput extends ArrayInput, TOutput>(operation: ArrayAction$2<TInput, TOutput>): MapItemsAction<TInput, TOutput>;

/**
 * Max bytes issue interface.
 */
interface MaxBytesIssue<TInput extends string, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'max_bytes';
    /**
     * The expected property.
     */
    readonly expected: `<=${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The maximum bytes.
     */
    readonly requirement: TRequirement;
}
/**
 * Max bytes action interface.
 */
interface MaxBytesAction<TInput extends string, TRequirement extends number, TMessage extends ErrorMessage<MaxBytesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MaxBytesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'max_bytes';
    /**
     * The action reference.
     */
    readonly reference: typeof maxBytes;
    /**
     * The expected property.
     */
    readonly expects: `<=${TRequirement}`;
    /**
     * The maximum bytes.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a max [bytes](https://en.wikipedia.org/wiki/Byte) validation action.
 *
 * @param requirement The maximum bytes.
 *
 * @returns A max bytes action.
 */
declare function maxBytes<TInput extends string, const TRequirement extends number>(requirement: TRequirement): MaxBytesAction<TInput, TRequirement, undefined>;
/**
 * Creates a max [bytes](https://en.wikipedia.org/wiki/Byte) validation action.
 *
 * @param requirement The maximum bytes.
 * @param message The error message.
 *
 * @returns A max bytes action.
 */
declare function maxBytes<TInput extends string, const TRequirement extends number, const TMessage extends ErrorMessage<MaxBytesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MaxBytesAction<TInput, TRequirement, TMessage>;

/**
 * Max entries issue interface.
 *
 * @beta
 */
interface MaxEntriesIssue<TInput extends EntriesInput, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'max_entries';
    /**
     * The expected property.
     */
    readonly expected: `<=${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The maximum entries.
     */
    readonly requirement: TRequirement;
}
/**
 * Max entries action interface.
 *
 * @beta
 */
interface MaxEntriesAction<TInput extends EntriesInput, TRequirement extends number, TMessage extends ErrorMessage<MaxEntriesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MaxEntriesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'max_entries';
    /**
     * The action reference.
     */
    readonly reference: typeof maxEntries;
    /**
     * The expected property.
     */
    readonly expects: `<=${TRequirement}`;
    /**
     * The maximum entries.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a max entries validation action.
 *
 * @param requirement The maximum entries.
 *
 * @returns A max entries action.
 *
 * @beta
 */
declare function maxEntries<TInput extends EntriesInput, const TRequirement extends number>(requirement: TRequirement): MaxEntriesAction<TInput, TRequirement, undefined>;
/**
 * Creates a max entries validation action.
 *
 * @param requirement The maximum entries.
 * @param message The error message.
 *
 * @returns A max entries action.
 *
 * @beta
 */
declare function maxEntries<TInput extends EntriesInput, const TRequirement extends number, const TMessage extends ErrorMessage<MaxEntriesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MaxEntriesAction<TInput, TRequirement, TMessage>;

/**
 * Max graphemes issue interface.
 */
interface MaxGraphemesIssue<TInput extends string, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'max_graphemes';
    /**
     * The expected property.
     */
    readonly expected: `<=${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The maximum graphemes.
     */
    readonly requirement: TRequirement;
}
/**
 * Max graphemes action interface.
 */
interface MaxGraphemesAction<TInput extends string, TRequirement extends number, TMessage extends ErrorMessage<MaxGraphemesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MaxGraphemesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'max_graphemes';
    /**
     * The action reference.
     */
    readonly reference: typeof maxGraphemes;
    /**
     * The expected property.
     */
    readonly expects: `<=${TRequirement}`;
    /**
     * The maximum graphemes.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a max graphemes validation action.
 *
 * @param requirement The maximum graphemes.
 *
 * @returns A max graphemes action.
 */
declare function maxGraphemes<TInput extends string, const TRequirement extends number>(requirement: TRequirement): MaxGraphemesAction<TInput, TRequirement, undefined>;
/**
 * Creates a max graphemes validation action.
 *
 * @param requirement The maximum graphemes.
 * @param message The error message.
 *
 * @returns A max graphemes action.
 */
declare function maxGraphemes<TInput extends string, const TRequirement extends number, const TMessage extends ErrorMessage<MaxGraphemesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MaxGraphemesAction<TInput, TRequirement, TMessage>;

/**
 * Max length issue interface.
 */
interface MaxLengthIssue<TInput extends LengthInput, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'max_length';
    /**
     * The expected property.
     */
    readonly expected: `<=${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The maximum length.
     */
    readonly requirement: TRequirement;
}
/**
 * Max length action interface.
 */
interface MaxLengthAction<TInput extends LengthInput, TRequirement extends number, TMessage extends ErrorMessage<MaxLengthIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MaxLengthIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'max_length';
    /**
     * The action reference.
     */
    readonly reference: typeof maxLength;
    /**
     * The expected property.
     */
    readonly expects: `<=${TRequirement}`;
    /**
     * The maximum length.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a max length validation action.
 *
 * @param requirement The maximum length.
 *
 * @returns A max length action.
 */
declare function maxLength<TInput extends LengthInput, const TRequirement extends number>(requirement: TRequirement): MaxLengthAction<TInput, TRequirement, undefined>;
/**
 * Creates a max length validation action.
 *
 * @param requirement The maximum length.
 * @param message The error message.
 *
 * @returns A max length action.
 */
declare function maxLength<TInput extends LengthInput, const TRequirement extends number, const TMessage extends ErrorMessage<MaxLengthIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MaxLengthAction<TInput, TRequirement, TMessage>;

/**
 * Max size issue interface.
 */
interface MaxSizeIssue<TInput extends SizeInput, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'max_size';
    /**
     * The expected property.
     */
    readonly expected: `<=${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The maximum size.
     */
    readonly requirement: TRequirement;
}
/**
 * Max size action interface.
 */
interface MaxSizeAction<TInput extends SizeInput, TRequirement extends number, TMessage extends ErrorMessage<MaxSizeIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MaxSizeIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'max_size';
    /**
     * The action reference.
     */
    readonly reference: typeof maxSize;
    /**
     * The expected property.
     */
    readonly expects: `<=${TRequirement}`;
    /**
     * The maximum size.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a max size validation action.
 *
 * @param requirement The maximum size.
 *
 * @returns A max size action.
 */
declare function maxSize<TInput extends SizeInput, const TRequirement extends number>(requirement: TRequirement): MaxSizeAction<TInput, TRequirement, undefined>;
/**
 * Creates a max size validation action.
 *
 * @param requirement The maximum size.
 * @param message The error message.
 *
 * @returns A max size action.
 */
declare function maxSize<TInput extends SizeInput, const TRequirement extends number, const TMessage extends ErrorMessage<MaxSizeIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MaxSizeAction<TInput, TRequirement, TMessage>;

/**
 * Max value issue interface.
 */
interface MaxValueIssue<TInput extends ValueInput, TRequirement extends ValueInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'max_value';
    /**
     * The expected property.
     */
    readonly expected: `<=${string}`;
    /**
     * The maximum value.
     */
    readonly requirement: TRequirement;
}
/**
 * Max value action interface.
 */
interface MaxValueAction<TInput extends ValueInput, TRequirement extends TInput, TMessage extends ErrorMessage<MaxValueIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MaxValueIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'max_value';
    /**
     * The action reference.
     */
    readonly reference: typeof maxValue;
    /**
     * The expected property.
     */
    readonly expects: `<=${string}`;
    /**
     * The maximum value.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a max value validation action.
 *
 * @param requirement The maximum value.
 *
 * @returns A max value action.
 */
declare function maxValue<TInput extends ValueInput, const TRequirement extends TInput>(requirement: TRequirement): MaxValueAction<TInput, TRequirement, undefined>;
/**
 * Creates a max value validation action.
 *
 * @param requirement The maximum value.
 * @param message The error message.
 *
 * @returns A max value action.
 */
declare function maxValue<TInput extends ValueInput, const TRequirement extends TInput, const TMessage extends ErrorMessage<MaxValueIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MaxValueAction<TInput, TRequirement, TMessage>;

/**
 * Max words issue interface.
 */
interface MaxWordsIssue<TInput extends string, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'max_words';
    /**
     * The expected property.
     */
    readonly expected: `<=${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The maximum words.
     */
    readonly requirement: TRequirement;
}
/**
 * Max words action interface.
 */
interface MaxWordsAction<TInput extends string, TLocales extends Intl.LocalesArgument, TRequirement extends number, TMessage extends ErrorMessage<MaxWordsIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MaxWordsIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'max_words';
    /**
     * The action reference.
     */
    readonly reference: typeof maxWords;
    /**
     * The expected property.
     */
    readonly expects: `<=${TRequirement}`;
    /**
     * The locales to be used.
     */
    readonly locales: TLocales;
    /**
     * The maximum words.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a max words validation action.
 *
 * @param locales The locales to be used.
 * @param requirement The maximum words.
 *
 * @returns A max words action.
 */
declare function maxWords<TInput extends string, TLocales extends Intl.LocalesArgument, const TRequirement extends number>(locales: TLocales, requirement: TRequirement): MaxWordsAction<TInput, TLocales, TRequirement, undefined>;
/**
 * Creates a max words validation action.
 *
 * @param locales The locales to be used.
 * @param requirement The maximum words.
 * @param message The error message.
 *
 * @returns A max words action.
 */
declare function maxWords<TInput extends string, TLocales extends Intl.LocalesArgument, const TRequirement extends number, const TMessage extends ErrorMessage<MaxWordsIssue<TInput, TRequirement>> | undefined>(locales: TLocales, requirement: TRequirement, message: TMessage): MaxWordsAction<TInput, TLocales, TRequirement, TMessage>;

/**
 * Metadata action interface.
 */
interface MetadataAction$1<TInput, TMetadata extends Record<string, unknown>> extends BaseMetadata<TInput> {
    /**
     * The action type.
     */
    readonly type: 'metadata';
    /**
     * The action reference.
     */
    readonly reference: typeof metadata;
    /**
     * The metadata object.
     */
    readonly metadata: TMetadata;
}
/**
 * Creates a custom metadata action.
 *
 * @param metadata_ The metadata object.
 *
 * @returns A metadata action.
 */
declare function metadata<TInput, const TMetadata extends Record<string, unknown>>(metadata_: TMetadata): MetadataAction$1<TInput, TMetadata>;

/**
 * Requirement type.
 */
type Requirement = readonly `${string}/${string}`[];
/**
 * MIME type issue interface.
 */
interface MimeTypeIssue<TInput extends Blob, TRequirement extends Requirement> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'mime_type';
    /**
     * The expected input.
     */
    readonly expected: string;
    /**
     * The received input.
     */
    readonly received: `"${string}"`;
    /**
     * The MIME types.
     */
    readonly requirement: TRequirement;
}
/**
 * MIME type action interface.
 */
interface MimeTypeAction<TInput extends Blob, TRequirement extends Requirement, TMessage extends ErrorMessage<MimeTypeIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MimeTypeIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'mime_type';
    /**
     * The action reference.
     */
    readonly reference: typeof mimeType;
    /**
     * The expected property.
     */
    readonly expects: string;
    /**
     * The MIME types.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [MIME type](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types) validation action.
 *
 * @param requirement The MIME types.
 *
 * @returns A MIME type action.
 */
declare function mimeType<TInput extends Blob, const TRequirement extends Requirement>(requirement: TRequirement): MimeTypeAction<TInput, TRequirement, undefined>;
/**
 * Creates a [MIME type](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types) validation action.
 *
 * @param requirement The MIME types.
 * @param message The error message.
 *
 * @returns A MIME type action.
 */
declare function mimeType<TInput extends Blob, const TRequirement extends Requirement, const TMessage extends ErrorMessage<MimeTypeIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MimeTypeAction<TInput, TRequirement, TMessage>;

/**
 * Min bytes issue interface.
 */
interface MinBytesIssue<TInput extends string, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'min_bytes';
    /**
     * The expected property.
     */
    readonly expected: `>=${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The minimum bytes.
     */
    readonly requirement: TRequirement;
}
/**
 * Min bytes action interface.
 */
interface MinBytesAction<TInput extends string, TRequirement extends number, TMessage extends ErrorMessage<MinBytesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MinBytesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'min_bytes';
    /**
     * The action reference.
     */
    readonly reference: typeof minBytes;
    /**
     * The expected property.
     */
    readonly expects: `>=${TRequirement}`;
    /**
     * The minimum bytes.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a min [bytes](https://en.wikipedia.org/wiki/Byte) validation action.
 *
 * @param requirement The minimum bytes.
 *
 * @returns A min bytes action.
 */
declare function minBytes<TInput extends string, const TRequirement extends number>(requirement: TRequirement): MinBytesAction<TInput, TRequirement, undefined>;
/**
 * Creates a min [bytes](https://en.wikipedia.org/wiki/Byte) validation action.
 *
 * @param requirement The minimum bytes.
 * @param message The error message.
 *
 * @returns A min bytes action.
 */
declare function minBytes<TInput extends string, const TRequirement extends number, const TMessage extends ErrorMessage<MinBytesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MinBytesAction<TInput, TRequirement, TMessage>;

/**
 * Min entries issue interface.
 *
 * @beta
 */
interface MinEntriesIssue<TInput extends EntriesInput, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'min_entries';
    /**
     * The expected property.
     */
    readonly expected: `>=${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The minimum entries.
     */
    readonly requirement: TRequirement;
}
/**
 * Min entries action interface.
 *
 * @beta
 */
interface MinEntriesAction<TInput extends EntriesInput, TRequirement extends number, TMessage extends ErrorMessage<MinEntriesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MinEntriesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'min_entries';
    /**
     * The action reference.
     */
    readonly reference: typeof minEntries;
    /**
     * The expected property.
     */
    readonly expects: `>=${TRequirement}`;
    /**
     * The minimum entries.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a min entries validation action.
 *
 * @param requirement The minimum entries.
 *
 * @returns A min entries action.
 *
 * @beta
 */
declare function minEntries<TInput extends EntriesInput, const TRequirement extends number>(requirement: TRequirement): MinEntriesAction<TInput, TRequirement, undefined>;
/**
 * Creates a min entries validation action.
 *
 * @param requirement The minimum entries.
 * @param message The error message.
 *
 * @returns A min entries action.
 *
 * @beta
 */
declare function minEntries<TInput extends EntriesInput, const TRequirement extends number, const TMessage extends ErrorMessage<MinEntriesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MinEntriesAction<TInput, TRequirement, TMessage>;

/**
 * Min graphemes issue interface.
 */
interface MinGraphemesIssue<TInput extends string, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'min_graphemes';
    /**
     * The expected property.
     */
    readonly expected: `>=${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The minimum graphemes.
     */
    readonly requirement: TRequirement;
}
/**
 * Min graphemes action interface.
 */
interface MinGraphemesAction<TInput extends string, TRequirement extends number, TMessage extends ErrorMessage<MinGraphemesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MinGraphemesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'min_graphemes';
    /**
     * The action reference.
     */
    readonly reference: typeof minGraphemes;
    /**
     * The expected property.
     */
    readonly expects: `>=${TRequirement}`;
    /**
     * The minimum graphemes.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a min graphemes validation action.
 *
 * @param requirement The minimum graphemes.
 *
 * @returns A min graphemes action.
 */
declare function minGraphemes<TInput extends string, const TRequirement extends number>(requirement: TRequirement): MinGraphemesAction<TInput, TRequirement, undefined>;
/**
 * Creates a min graphemes validation action.
 *
 * @param requirement The minimum graphemes.
 * @param message The error message.
 *
 * @returns A min graphemes action.
 */
declare function minGraphemes<TInput extends string, const TRequirement extends number, const TMessage extends ErrorMessage<MinGraphemesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MinGraphemesAction<TInput, TRequirement, TMessage>;

/**
 * Min length issue interface.
 */
interface MinLengthIssue<TInput extends LengthInput, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'min_length';
    /**
     * The expected property.
     */
    readonly expected: `>=${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The minimum length.
     */
    readonly requirement: TRequirement;
}
/**
 * Min length action interface.
 */
interface MinLengthAction<TInput extends LengthInput, TRequirement extends number, TMessage extends ErrorMessage<MinLengthIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MinLengthIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'min_length';
    /**
     * The action reference.
     */
    readonly reference: typeof minLength;
    /**
     * The expected property.
     */
    readonly expects: `>=${TRequirement}`;
    /**
     * The minimum length.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a min length validation action.
 *
 * @param requirement The minimum length.
 *
 * @returns A min length action.
 */
declare function minLength<TInput extends LengthInput, const TRequirement extends number>(requirement: TRequirement): MinLengthAction<TInput, TRequirement, undefined>;
/**
 * Creates a min length validation action.
 *
 * @param requirement The minimum length.
 * @param message The error message.
 *
 * @returns A min length action.
 */
declare function minLength<TInput extends LengthInput, const TRequirement extends number, const TMessage extends ErrorMessage<MinLengthIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MinLengthAction<TInput, TRequirement, TMessage>;

/**
 * Min size issue interface.
 */
interface MinSizeIssue<TInput extends SizeInput, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'min_size';
    /**
     * The expected property.
     */
    readonly expected: `>=${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The minimum size.
     */
    readonly requirement: TRequirement;
}
/**
 * Min size action interface.
 */
interface MinSizeAction<TInput extends SizeInput, TRequirement extends number, TMessage extends ErrorMessage<MinSizeIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MinSizeIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'min_size';
    /**
     * The action reference.
     */
    readonly reference: typeof minSize;
    /**
     * The expected property.
     */
    readonly expects: `>=${TRequirement}`;
    /**
     * The minimum size.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a min size validation action.
 *
 * @param requirement The minimum size.
 *
 * @returns A min size action.
 */
declare function minSize<TInput extends SizeInput, const TRequirement extends number>(requirement: TRequirement): MinSizeAction<TInput, TRequirement, undefined>;
/**
 * Creates a min size validation action.
 *
 * @param requirement The minimum size.
 * @param message The error message.
 *
 * @returns A min size action.
 */
declare function minSize<TInput extends SizeInput, const TRequirement extends number, const TMessage extends ErrorMessage<MinSizeIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MinSizeAction<TInput, TRequirement, TMessage>;

/**
 * Min value issue interface.
 */
interface MinValueIssue<TInput extends ValueInput, TRequirement extends ValueInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'min_value';
    /**
     * The expected property.
     */
    readonly expected: `>=${string}`;
    /**
     * The minimum value.
     */
    readonly requirement: TRequirement;
}
/**
 * Min value action interface.
 */
interface MinValueAction<TInput extends ValueInput, TRequirement extends TInput, TMessage extends ErrorMessage<MinValueIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MinValueIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'min_value';
    /**
     * The action reference.
     */
    readonly reference: typeof minValue;
    /**
     * The expected property.
     */
    readonly expects: `>=${string}`;
    /**
     * The minimum value.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a min value validation action.
 *
 * @param requirement The minimum value.
 *
 * @returns A min value action.
 */
declare function minValue<TInput extends ValueInput, const TRequirement extends TInput>(requirement: TRequirement): MinValueAction<TInput, TRequirement, undefined>;
/**
 * Creates a min value validation action.
 *
 * @param requirement The minimum value.
 * @param message The error message.
 *
 * @returns A min value action.
 */
declare function minValue<TInput extends ValueInput, const TRequirement extends TInput, const TMessage extends ErrorMessage<MinValueIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MinValueAction<TInput, TRequirement, TMessage>;

/**
 * Min words issue interface.
 */
interface MinWordsIssue<TInput extends string, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'min_words';
    /**
     * The expected property.
     */
    readonly expected: `>=${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The minimum words.
     */
    readonly requirement: TRequirement;
}
/**
 * Min words action interface.
 */
interface MinWordsAction<TInput extends string, TLocales extends Intl.LocalesArgument, TRequirement extends number, TMessage extends ErrorMessage<MinWordsIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MinWordsIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'min_words';
    /**
     * The action reference.
     */
    readonly reference: typeof minWords;
    /**
     * The expected property.
     */
    readonly expects: `>=${TRequirement}`;
    /**
     * The locales to be used.
     */
    readonly locales: TLocales;
    /**
     * The minimum words.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a min words validation action.
 *
 * @param locales The locales to be used.
 * @param requirement The minimum words.
 *
 * @returns A min words action.
 */
declare function minWords<TInput extends string, TLocales extends Intl.LocalesArgument, const TRequirement extends number>(locales: TLocales, requirement: TRequirement): MinWordsAction<TInput, TLocales, TRequirement, undefined>;
/**
 * Creates a min words validation action.
 *
 * @param locales The locales to be used.
 * @param requirement The minimum words.
 * @param message The error message.
 *
 * @returns A min words action.
 */
declare function minWords<TInput extends string, TLocales extends Intl.LocalesArgument, const TRequirement extends number, const TMessage extends ErrorMessage<MinWordsIssue<TInput, TRequirement>> | undefined>(locales: TLocales, requirement: TRequirement, message: TMessage): MinWordsAction<TInput, TLocales, TRequirement, TMessage>;

/**
 * Input type
 */
type Input = number | bigint;
/**
 * Multiple of issue interface.
 */
interface MultipleOfIssue<TInput extends Input, TRequirement extends Input> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'multiple_of';
    /**
     * The expected property.
     */
    readonly expected: `%${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${TInput}`;
    /**
     * The divisor.
     */
    readonly requirement: TRequirement;
}
/**
 * Multiple of action interface.
 */
interface MultipleOfAction<TInput extends Input, TRequirement extends Input, TMessage extends ErrorMessage<MultipleOfIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, MultipleOfIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'multiple_of';
    /**
     * The action reference.
     */
    readonly reference: typeof multipleOf;
    /**
     * The expected property.
     */
    readonly expects: `%${TRequirement}`;
    /**
     * The divisor.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [multiple](https://en.wikipedia.org/wiki/Multiple_(mathematics)) of validation action.
 *
 * @param requirement The divisor.
 *
 * @returns A multiple of action.
 */
declare function multipleOf<TInput extends number, const TRequirement extends number>(requirement: TRequirement): MultipleOfAction<TInput, TRequirement, undefined>;
/**
 * Creates a [multiple](https://en.wikipedia.org/wiki/Multiple_(mathematics)) of validation action.
 *
 * @param requirement The divisor.
 *
 * @returns A multiple of action.
 */
declare function multipleOf<TInput extends bigint, const TRequirement extends bigint>(requirement: TRequirement): MultipleOfAction<TInput, TRequirement, undefined>;
/**
 * Creates a [multiple](https://en.wikipedia.org/wiki/Multiple_(mathematics)) of validation action.
 *
 * @param requirement The divisor.
 * @param message The error message.
 *
 * @returns A multiple of action.
 */
declare function multipleOf<TInput extends number, const TRequirement extends number, const TMessage extends ErrorMessage<MultipleOfIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MultipleOfAction<TInput, TRequirement, TMessage>;
/**
 * Creates a [multiple](https://en.wikipedia.org/wiki/Multiple_(mathematics)) of validation action.
 *
 * @param requirement The divisor.
 * @param message The error message.
 *
 * @returns A multiple of action.
 */
declare function multipleOf<TInput extends bigint, const TRequirement extends bigint, const TMessage extends ErrorMessage<MultipleOfIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): MultipleOfAction<TInput, TRequirement, TMessage>;

/**
 * Nano ID issue interface.
 */
interface NanoIdIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'nanoid';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: string;
    /**
     * The Nano ID regex.
     */
    readonly requirement: RegExp;
}
/**
 * Nano ID issue type.
 *
 * @deprecated Use `NanoIdIssue` instead.
 */
type NanoIDIssue<TInput extends string> = NanoIdIssue<TInput>;
/**
 * Nano ID action interface.
 */
interface NanoIdAction<TInput extends string, TMessage extends ErrorMessage<NanoIdIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, NanoIdIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'nanoid';
    /**
     * The action reference.
     */
    readonly reference: typeof nanoid;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The Nano ID regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Nano ID action type.
 *
 * @deprecated Use `NanoIdAction` instead.
 */
type NanoIDAction<TInput extends string, TMessage extends ErrorMessage<NanoIdIssue<TInput>> | undefined> = NanoIdAction<TInput, TMessage>;
/**
 * Creates a [Nano ID](https://github.com/ai/nanoid) validation action.
 *
 * @returns A Nano ID action.
 */
declare function nanoid<TInput extends string>(): NanoIdAction<TInput, undefined>;
/**
 * Creates a [Nano ID](https://github.com/ai/nanoid) validation action.
 *
 * @param message The error message.
 *
 * @returns A Nano ID action.
 */
declare function nanoid<TInput extends string, const TMessage extends ErrorMessage<NanoIdIssue<TInput>> | undefined>(message: TMessage): NanoIdAction<TInput, TMessage>;

/**
 * Non empty issue interface.
 */
interface NonEmptyIssue<TInput extends LengthInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'non_empty';
    /**
     * The expected input.
     */
    readonly expected: '!0';
    /**
     * The received input.
     */
    readonly received: '0';
}
/**
 * Non empty action interface.
 */
interface NonEmptyAction<TInput extends LengthInput, TMessage extends ErrorMessage<NonEmptyIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, NonEmptyIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'non_empty';
    /**
     * The action reference.
     */
    readonly reference: typeof nonEmpty;
    /**
     * The expected property.
     */
    readonly expects: '!0';
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a non-empty validation action.
 *
 * @returns A non-empty action.
 */
declare function nonEmpty<TInput extends LengthInput>(): NonEmptyAction<TInput, undefined>;
/**
 * Creates a non-empty validation action.
 *
 * @param message The error message.
 *
 * @returns A non-empty action.
 */
declare function nonEmpty<TInput extends LengthInput, const TMessage extends ErrorMessage<NonEmptyIssue<TInput>> | undefined>(message: TMessage): NonEmptyAction<TInput, TMessage>;

/**
 * Normalize form type.
 */
type NormalizeForm = 'NFC' | 'NFD' | 'NFKC' | 'NFKD';
/**
 * Normalize action interface.
 */
interface NormalizeAction<TForm extends NormalizeForm | undefined> extends BaseTransformation<string, string, never> {
    /**
     * The action type.
     */
    readonly type: 'normalize';
    /**
     * The action reference.
     */
    readonly reference: typeof normalize;
    /**
     * The normalization form.
     */
    readonly form: TForm;
}
/**
 * Creates a normalize transformation action.
 *
 * @returns A normalize action.
 */
declare function normalize(): NormalizeAction<undefined>;
/**
 * Creates a normalize transformation action.
 *
 * @param form The normalization form.
 *
 * @returns A normalize action.
 */
declare function normalize<TForm extends NormalizeForm | undefined>(form: TForm): NormalizeAction<TForm>;

/**
 * Not bytes issue interface.
 */
interface NotBytesIssue<TInput extends string, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'not_bytes';
    /**
     * The expected property.
     */
    readonly expected: `!${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The not required bytes.
     */
    readonly requirement: TRequirement;
}
/**
 * Not bytes action interface.
 */
interface NotBytesAction<TInput extends string, TRequirement extends number, TMessage extends ErrorMessage<NotBytesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, NotBytesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'not_bytes';
    /**
     * The action reference.
     */
    readonly reference: typeof notBytes;
    /**
     * The expected property.
     */
    readonly expects: `!${TRequirement}`;
    /**
     * The not required bytes.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a not [bytes](https://en.wikipedia.org/wiki/Byte) validation action.
 *
 * @param requirement The not required bytes.
 *
 * @returns A not bytes action.
 */
declare function notBytes<TInput extends string, const TRequirement extends number>(requirement: TRequirement): NotBytesAction<TInput, TRequirement, undefined>;
/**
 * Creates a not [bytes](https://en.wikipedia.org/wiki/Byte) validation action.
 *
 * @param requirement The not required bytes.
 * @param message The error message.
 *
 * @returns A not bytes action.
 */
declare function notBytes<TInput extends string, const TRequirement extends number, const TMessage extends ErrorMessage<NotBytesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): NotBytesAction<TInput, TRequirement, TMessage>;

/**
 * Not entries issue interface.
 *
 * @beta
 */
interface NotEntriesIssue<TInput extends EntriesInput, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'not_entries';
    /**
     * The expected property.
     */
    readonly expected: `!${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The not required entries.
     */
    readonly requirement: TRequirement;
}
/**
 * Not entries action interface.
 *
 * @beta
 */
interface NotEntriesAction<TInput extends EntriesInput, TRequirement extends number, TMessage extends ErrorMessage<NotEntriesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, NotEntriesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'not_entries';
    /**
     * The action reference.
     */
    readonly reference: typeof notEntries;
    /**
     * The expected property.
     */
    readonly expects: `!${TRequirement}`;
    /**
     * The not required entries.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a not entries validation action.
 *
 * @param requirement The not required entries.
 *
 * @returns A not entries action.
 *
 * @beta
 */
declare function notEntries<TInput extends EntriesInput, const TRequirement extends number>(requirement: TRequirement): NotEntriesAction<TInput, TRequirement, undefined>;
/**
 * Creates a not entries validation action.
 *
 * @param requirement The not required entries.
 * @param message The error message.
 *
 * @returns A not entries action.
 *
 * @beta
 */
declare function notEntries<TInput extends EntriesInput, const TRequirement extends number, const TMessage extends ErrorMessage<NotEntriesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): NotEntriesAction<TInput, TRequirement, TMessage>;

/**
 * Not graphemes issue interface.
 */
interface NotGraphemesIssue<TInput extends string, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'not_graphemes';
    /**
     * The expected property.
     */
    readonly expected: `!${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The not required graphemes.
     */
    readonly requirement: TRequirement;
}
/**
 * Not graphemes action interface.
 */
interface NotGraphemesAction<TInput extends string, TRequirement extends number, TMessage extends ErrorMessage<NotGraphemesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, NotGraphemesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'not_graphemes';
    /**
     * The action reference.
     */
    readonly reference: typeof notGraphemes;
    /**
     * The expected property.
     */
    readonly expects: `!${TRequirement}`;
    /**
     * The not required graphemes.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a not graphemes validation action.
 *
 * @param requirement The not required graphemes.
 *
 * @returns A not graphemes action.
 */
declare function notGraphemes<TInput extends string, const TRequirement extends number>(requirement: TRequirement): NotGraphemesAction<TInput, TRequirement, undefined>;
/**
 * Creates a not graphemes validation action.
 *
 * @param requirement The not required graphemes.
 * @param message The error message.
 *
 * @returns A not graphemes action.
 */
declare function notGraphemes<TInput extends string, const TRequirement extends number, const TMessage extends ErrorMessage<NotGraphemesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): NotGraphemesAction<TInput, TRequirement, TMessage>;

/**
 * Not length issue interface.
 */
interface NotLengthIssue<TInput extends LengthInput, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'not_length';
    /**
     * The expected property.
     */
    readonly expected: `!${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${TRequirement}`;
    /**
     * The not required length.
     */
    readonly requirement: TRequirement;
}
/**
 * Not length action interface.
 */
interface NotLengthAction<TInput extends LengthInput, TRequirement extends number, TMessage extends ErrorMessage<NotLengthIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, NotLengthIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'not_length';
    /**
     * The action reference.
     */
    readonly reference: typeof notLength;
    /**
     * The expected property.
     */
    readonly expects: `!${TRequirement}`;
    /**
     * The not required length.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a not length validation action.
 *
 * @param requirement The not required length.
 *
 * @returns A not length action.
 */
declare function notLength<TInput extends LengthInput, const TRequirement extends number>(requirement: TRequirement): NotLengthAction<TInput, TRequirement, undefined>;
/**
 * Creates a not length validation action.
 *
 * @param requirement The not required length.
 * @param message The error message.
 *
 * @returns A not length action.
 */
declare function notLength<TInput extends LengthInput, const TRequirement extends number, const TMessage extends ErrorMessage<NotLengthIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): NotLengthAction<TInput, TRequirement, TMessage>;

/**
 * Not size issue interface.
 */
interface NotSizeIssue<TInput extends SizeInput, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'not_size';
    /**
     * The expected property.
     */
    readonly expected: `!${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${TRequirement}`;
    /**
     * The not required size.
     */
    readonly requirement: TRequirement;
}
/**
 * Not size action interface.
 */
interface NotSizeAction<TInput extends SizeInput, TRequirement extends number, TMessage extends ErrorMessage<NotSizeIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, NotSizeIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'not_size';
    /**
     * The action reference.
     */
    readonly reference: typeof notSize;
    /**
     * The expected property.
     */
    readonly expects: `!${TRequirement}`;
    /**
     * The not required size.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a not size validation action.
 *
 * @param requirement The not required size.
 *
 * @returns A not size action.
 */
declare function notSize<TInput extends SizeInput, const TRequirement extends number>(requirement: TRequirement): NotSizeAction<TInput, TRequirement, undefined>;
/**
 * Creates a not size validation action.
 *
 * @param requirement The not required size.
 * @param message The error message.
 *
 * @returns A not size action.
 */
declare function notSize<TInput extends SizeInput, const TRequirement extends number, const TMessage extends ErrorMessage<NotSizeIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): NotSizeAction<TInput, TRequirement, TMessage>;

/**
 * Not value issue interface.
 */
interface NotValueIssue<TInput extends ValueInput, TRequirement extends TInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'not_value';
    /**
     * The expected property.
     */
    readonly expected: `!${string}`;
    /**
     * The not required value.
     */
    readonly requirement: TRequirement;
}
/**
 * Not value action interface.
 */
interface NotValueAction<TInput extends ValueInput, TRequirement extends TInput, TMessage extends ErrorMessage<NotValueIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, NotValueIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'not_value';
    /**
     * The action reference.
     */
    readonly reference: typeof notValue;
    /**
     * The expected property.
     */
    readonly expects: `!${string}`;
    /**
     * The not required value.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a not value validation action.
 *
 * @param requirement The not required value.
 *
 * @returns A not value action.
 */
declare function notValue<TInput extends ValueInput, const TRequirement extends TInput>(requirement: TRequirement): NotValueAction<TInput, TRequirement, undefined>;
/**
 * Creates a not value validation action.
 *
 * @param requirement The not required value.
 * @param message The error message.
 *
 * @returns A not value action.
 */
declare function notValue<TInput extends ValueInput, const TRequirement extends TInput, const TMessage extends ErrorMessage<NotValueIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): NotValueAction<TInput, TRequirement, TMessage>;

/**
 * Not values issue type.
 */
interface NotValuesIssue<TInput extends ValueInput, TRequirement extends readonly TInput[]> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'not_values';
    /**
     * The expected property.
     */
    readonly expected: `!${string}`;
    /**
     * The not required values.
     */
    readonly requirement: TRequirement;
}
/**
 * Not values action type.
 */
interface NotValuesAction<TInput extends ValueInput, TRequirement extends readonly TInput[], TMessage extends ErrorMessage<NotValuesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, NotValuesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'not_values';
    /**
     * The action reference.
     */
    readonly reference: typeof notValues;
    /**
     * The expected property.
     */
    readonly expects: `!${string}`;
    /**
     * The not required values.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a not values validation action.
 *
 * @param requirement The not required values.
 *
 * @returns A not values action.
 */
declare function notValues<TInput extends ValueInput, const TRequirement extends readonly TInput[]>(requirement: TRequirement): NotValuesAction<TInput, TRequirement, undefined>;
/**
 * Creates a not values validation action.
 *
 * @param requirement The not required values.
 * @param message The error message.
 *
 * @returns A not values action.
 */
declare function notValues<TInput extends ValueInput, const TRequirement extends readonly TInput[], const TMessage extends ErrorMessage<NotValuesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): NotValuesAction<TInput, TRequirement, TMessage>;

/**
 * Not words issue interface.
 */
interface NotWordsIssue<TInput extends string, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'not_words';
    /**
     * The expected property.
     */
    readonly expected: `!${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The not required words.
     */
    readonly requirement: TRequirement;
}
/**
 * Not words action interface.
 */
interface NotWordsAction<TInput extends string, TLocales extends Intl.LocalesArgument, TRequirement extends number, TMessage extends ErrorMessage<NotWordsIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, NotWordsIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'not_words';
    /**
     * The action reference.
     */
    readonly reference: typeof notWords;
    /**
     * The expected property.
     */
    readonly expects: `!${TRequirement}`;
    /**
     * The locales to be used.
     */
    readonly locales: TLocales;
    /**
     * The not required words.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a not words validation action.
 *
 * @param locales The locales to be used.
 * @param requirement The not required words.
 *
 * @returns A not words action.
 */
declare function notWords<TInput extends string, TLocales extends Intl.LocalesArgument, const TRequirement extends number>(locales: TLocales, requirement: TRequirement): NotWordsAction<TInput, TLocales, TRequirement, undefined>;
/**
 * Creates a not words validation action.
 *
 * @param locales The locales to be used.
 * @param requirement The not required words.
 * @param message The error message.
 *
 * @returns A not words action.
 */
declare function notWords<TInput extends string, TLocales extends Intl.LocalesArgument, const TRequirement extends number, const TMessage extends ErrorMessage<NotWordsIssue<TInput, TRequirement>> | undefined>(locales: TLocales, requirement: TRequirement, message: TMessage): NotWordsAction<TInput, TLocales, TRequirement, TMessage>;

/**
 * Octal issue interface.
 */
interface OctalIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'octal';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The octal regex.
     */
    readonly requirement: RegExp;
}
/**
 * Octal action interface.
 */
interface OctalAction<TInput extends string, TMessage extends ErrorMessage<OctalIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, OctalIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'octal';
    /**
     * The action reference.
     */
    readonly reference: typeof octal;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The octal regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [octal](https://en.wikipedia.org/wiki/Octal) validation action.
 *
 * @returns An octal action.
 */
declare function octal<TInput extends string>(): OctalAction<TInput, undefined>;
/**
 * Creates an [octal](https://en.wikipedia.org/wiki/Octal) validation action.
 *
 * @param message The error message.
 *
 * @returns An octal action.
 */
declare function octal<TInput extends string, const TMessage extends ErrorMessage<OctalIssue<TInput>> | undefined>(message: TMessage): OctalAction<TInput, TMessage>;

/**
 * Parse JSON config interface.
 *
 * @beta
 */
interface ParseJsonConfig {
    /**
     * The JSON reviver function.
     */
    reviver?: (this: any, key: string, value: any) => any;
}
/**
 * Parse JSON issue interface.
 *
 * @beta
 */
interface ParseJsonIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'transformation';
    /**
     * The issue type.
     */
    readonly type: 'parse_json';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
}
/**
 * Parse JSON action interface.
 *
 * @beta
 */
interface ParseJsonAction<TInput extends string, TConfig extends ParseJsonConfig | undefined, TMessage extends ErrorMessage<ParseJsonIssue<TInput>> | undefined> extends BaseTransformation<TInput, unknown, ParseJsonIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'parse_json';
    /**
     * The action reference.
     */
    readonly reference: typeof parseJson;
    /**
     * The action config.
     */
    readonly config: TConfig;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a parse JSON transformation action.
 *
 * @returns A parse JSON action.
 *
 * @beta
 */
declare function parseJson<TInput extends string>(): ParseJsonAction<TInput, undefined, undefined>;
/**
 * Creates a parse JSON transformation action.
 *
 * @param config The action config.
 *
 * @returns A parse JSON action.
 *
 * @beta
 */
declare function parseJson<TInput extends string, const TConfig extends ParseJsonConfig | undefined>(config: TConfig): ParseJsonAction<TInput, TConfig, undefined>;
/**
 * Creates a parse JSON transformation action.
 *
 * @param config The action config.
 * @param message The error message.
 *
 * @returns A parse JSON action.
 *
 * @beta
 */
declare function parseJson<TInput extends string, const TConfig extends ParseJsonConfig | undefined, const TMessage extends ErrorMessage<ParseJsonIssue<TInput>> | undefined>(config: TConfig, message: TMessage): ParseJsonAction<TInput, TConfig, TMessage>;

/**
 * Partial input type.
 */
type PartialInput = Record<string, unknown> | ArrayLike<unknown>;
/**
 * Partial check issue interface.
 */
interface PartialCheckIssue<TInput extends PartialInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'partial_check';
    /**
     * The expected input.
     */
    readonly expected: null;
    /**
     * The validation function.
     */
    readonly requirement: (input: TInput) => MaybePromise<boolean>;
}
/**
 * Extracts the exact keys of a tuple, array or object.
 */
type KeyOf<TValue> = IsAny<TValue> extends true ? never : TValue extends readonly unknown[] ? number extends TValue['length'] ? '$' : {
    [TKey in keyof TValue]: TKey extends `${infer TIndex extends number}` ? TIndex : never;
}[number] : TValue extends Record<string, unknown> ? keyof TValue & (string | number) : never;
/**
 * Path type.
 */
type Path = readonly (string | number)[];
/**
 * Required path type.
 */
type RequiredPath = readonly [string | number, ...Path];
/**
 * Paths type.
 */
type Paths = readonly RequiredPath[];
/**
 * Required paths type.
 */
type RequiredPaths = readonly [RequiredPath, ...RequiredPath[]];
/**
 * Lazily evaluate only the last valid path segment based on the given value.
 */
type LazyPath<TValue, TPathToCheck extends Path, TValidPath extends Path = readonly []> = TPathToCheck extends readonly [] ? TValidPath : TPathToCheck extends readonly [
    infer TFirstKey extends KeyOf<TValue>,
    ...infer TPathRest extends Path
] ? LazyPath<TFirstKey extends keyof TValue ? TValue[TFirstKey] : TFirstKey extends '$' ? TValue extends readonly unknown[] ? TValue[number] : never : never, TPathRest, readonly [...TValidPath, TFirstKey]> : IsNever<KeyOf<TValue>> extends false ? readonly [...TValidPath, KeyOf<TValue>] : TValidPath;
/**
 * Returns the path if valid, otherwise the last possible valid path based on
 * the given value.
 */
type ValidPath<TValue, TPath extends RequiredPath> = TPath extends LazyPath<TValue, TPath> ? TPath : LazyPath<TValue, TPath>;
/**
 * Returns a valid path for any given path based on the given value.
 */
type ValidPaths<TValue, TPaths extends RequiredPaths> = {
    [TKey in keyof TPaths]: ValidPath<TValue, TPaths[TKey]>;
};
/**
 * Deeply picks specific keys.
 *
 * Hint: If this type is ever exported and accessible from the outside, it must
 * be wrapped in `UnionToIntersect` to avoid invalid results.
 */
type DeepPick<TValue, TPath extends Path> = TPath extends readonly [
    infer TFirstKey extends string | number,
    ...infer TPathRest extends Path
] ? TValue extends readonly unknown[] ? number extends TValue['length'] ? TPathRest extends readonly [] ? TValue : DeepPick<TValue[number], TPathRest>[] : {
    [TKey in keyof TValue]: TKey extends `${TFirstKey}` ? TPathRest extends readonly [] ? TValue[TKey] : DeepPick<TValue[TKey], TPathRest> : unknown;
} : {
    [TKey in keyof TValue as TKey extends TFirstKey ? TKey : never]: TPathRest extends readonly [] ? TValue[TKey] : DeepPick<TValue[TKey], TPathRest>;
} : never;
/**
 * Deeply merges two types.
 */
type DeepMerge<TValue1, TValue2> = TValue1 extends readonly unknown[] ? TValue2 extends readonly unknown[] ? number extends TValue1['length'] | TValue2['length'] ? DeepMerge<TValue1[number], TValue2[number]>[] : {
    [TKey in keyof TValue1]: TKey extends keyof TValue2 ? unknown extends TValue1[TKey] ? TValue2[TKey] : TValue1[TKey] : never;
} : never : TValue1 extends Record<string, unknown> ? TValue2 extends Record<string, unknown> ? {
    [TKey in keyof (TValue1 & TValue2)]: TKey extends keyof TValue1 ? TKey extends keyof TValue2 ? DeepMerge<TValue1[TKey], TValue2[TKey]> : TValue1[TKey] : TKey extends keyof TValue2 ? TValue2[TKey] : never;
} : never : TValue1 & TValue2;
/**
 * Deeply picks N specific keys.
 */
type DeepPickN<TInput, TPaths extends Paths> = TPaths extends readonly [
    infer TFirstPath extends Path,
    ...infer TRestPaths extends Paths
] ? TRestPaths extends readonly [] ? DeepPick<TInput, TFirstPath> : DeepMerge<DeepPick<TInput, TFirstPath>, DeepPickN<TInput, TRestPaths>> : TInput;

/**
 * Partial check action interface.
 */
interface PartialCheckAction<TInput extends PartialInput, TPaths extends Paths, TSelection extends DeepPickN<TInput, TPaths>, TMessage extends ErrorMessage<PartialCheckIssue<TSelection>> | undefined> extends BaseValidation<TInput, TInput, PartialCheckIssue<TSelection>> {
    /**
     * The action type.
     */
    readonly type: 'partial_check';
    /**
     * The action reference.
     */
    readonly reference: typeof partialCheck;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The selected paths.
     */
    readonly paths: TPaths;
    /**
     * The validation function.
     */
    readonly requirement: (input: TSelection) => boolean;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a partial check validation action.
 *
 * @param paths The selected paths.
 * @param requirement The validation function.
 *
 * @returns A partial check action.
 */
declare function partialCheck<TInput extends PartialInput, const TPaths extends RequiredPaths, const TSelection extends DeepPickN<TInput, TPaths>>(paths: ValidPaths<TInput, TPaths>, requirement: (input: TSelection) => boolean): PartialCheckAction<TInput, TPaths, TSelection, undefined>;
/**
 * Creates a partial check validation action.
 *
 * @param paths The selected paths.
 * @param requirement The validation function.
 * @param message The error message.
 *
 * @returns A partial check action.
 */
declare function partialCheck<TInput extends PartialInput, const TPaths extends RequiredPaths, const TSelection extends DeepPickN<TInput, TPaths>, const TMessage extends ErrorMessage<PartialCheckIssue<TSelection>> | undefined>(paths: ValidPaths<TInput, TPaths>, requirement: (input: TSelection) => boolean, message: TMessage): PartialCheckAction<TInput, TPaths, TSelection, TMessage>;

/**
 * Partial check action async interface.
 */
interface PartialCheckActionAsync<TInput extends PartialInput, TPaths extends Paths, TSelection extends DeepPickN<TInput, TPaths>, TMessage extends ErrorMessage<PartialCheckIssue<TSelection>> | undefined> extends BaseValidationAsync<TInput, TInput, PartialCheckIssue<TSelection>> {
    /**
     * The action type.
     */
    readonly type: 'partial_check';
    /**
     * The action reference.
     */
    readonly reference: typeof partialCheckAsync;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The selected paths.
     */
    readonly paths: TPaths;
    /**
     * The validation function.
     */
    readonly requirement: (input: TSelection) => MaybePromise<boolean>;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a partial check validation action.
 *
 * @param paths The selected paths.
 * @param requirement The validation function.
 *
 * @returns A partial check action.
 */
declare function partialCheckAsync<TInput extends PartialInput, const TPaths extends RequiredPaths, const TSelection extends DeepPickN<TInput, TPaths>>(paths: ValidPaths<TInput, TPaths>, requirement: (input: TSelection) => MaybePromise<boolean>): PartialCheckActionAsync<TInput, TPaths, TSelection, undefined>;
/**
 * Creates a partial check validation action.
 *
 * @param paths The selected paths.
 * @param requirement The validation function.
 * @param message The error message.
 *
 * @returns A partial check action.
 */
declare function partialCheckAsync<TInput extends PartialInput, const TPaths extends RequiredPaths, const TSelection extends DeepPickN<TInput, TPaths>, const TMessage extends ErrorMessage<PartialCheckIssue<TSelection>> | undefined>(paths: ValidPaths<TInput, TPaths>, requirement: (input: TSelection) => MaybePromise<boolean>, message: TMessage): PartialCheckActionAsync<TInput, TPaths, TSelection, TMessage>;

/**
 * Raw check issue interface.
 */
interface RawCheckIssue<TInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'raw_check';
}
/**
 * Issue info interface.
 */
interface IssueInfo$1<TInput> {
    label?: string | undefined;
    input?: unknown | undefined;
    expected?: string | undefined;
    received?: string | undefined;
    message?: ErrorMessage<RawCheckIssue<TInput>> | undefined;
    path?: [IssuePathItem, ...IssuePathItem[]] | undefined;
}
/**
 * Add issue type.
 */
type AddIssue$1<TInput> = (info?: IssueInfo$1<TInput>) => void;
/**
 * Context interface.
 */
interface Context$2<TInput> {
    readonly dataset: OutputDataset<TInput, BaseIssue<unknown>>;
    readonly config: Config<RawCheckIssue<TInput>>;
    readonly addIssue: AddIssue$1<TInput>;
}

/**
 * Raw check action interface.
 */
interface RawCheckAction<TInput> extends BaseValidation<TInput, TInput, RawCheckIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'raw_check';
    /**
     * The action reference.
     */
    readonly reference: typeof rawCheck;
    /**
     * The expected property.
     */
    readonly expects: null;
}
/**
 * Creates a raw check validation action.
 *
 * @param action The validation action.
 *
 * @returns A raw check action.
 */
declare function rawCheck<TInput>(action: (context: Context$2<TInput>) => void): RawCheckAction<TInput>;

/**
 * Raw check action async interface.
 */
interface RawCheckActionAsync<TInput> extends BaseValidationAsync<TInput, TInput, RawCheckIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'raw_check';
    /**
     * The action reference.
     */
    readonly reference: typeof rawCheckAsync;
    /**
     * The expected property.
     */
    readonly expects: null;
}
/**
 * Creates a raw check validation action.
 *
 * @param action The validation action.
 *
 * @returns A raw check action.
 */
declare function rawCheckAsync<TInput>(action: (context: Context$2<TInput>) => MaybePromise<void>): RawCheckActionAsync<TInput>;

/**
 * Raw transform issue interface.
 */
interface RawTransformIssue<TInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'transformation';
    /**
     * The issue type.
     */
    readonly type: 'raw_transform';
}
/**
 * Issue info interface.
 */
interface IssueInfo<TInput> {
    label?: string | undefined;
    input?: unknown | undefined;
    expected?: string | undefined;
    received?: string | undefined;
    message?: ErrorMessage<RawTransformIssue<TInput>> | undefined;
    path?: [IssuePathItem, ...IssuePathItem[]] | undefined;
}
/**
 * Add issue type.
 */
type AddIssue<TInput> = (info?: IssueInfo<TInput>) => void;
/**
 * Context interface.
 */
interface Context$1<TInput> {
    readonly dataset: SuccessDataset<TInput>;
    readonly config: Config<RawTransformIssue<TInput>>;
    readonly addIssue: AddIssue<TInput>;
    readonly NEVER: never;
}

/**
 * Raw transform action interface.
 */
interface RawTransformAction<TInput, TOutput> extends BaseTransformation<TInput, TOutput, RawTransformIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'raw_transform';
    /**
     * The action reference.
     */
    readonly reference: typeof rawTransform;
}
/**
 * Creates a raw transformation action.
 *
 * @param action The transformation action.
 *
 * @returns A raw transform action.
 */
declare function rawTransform<TInput, TOutput>(action: (context: Context$1<TInput>) => TOutput): RawTransformAction<TInput, TOutput>;

/**
 * Raw transform action async interface.
 */
interface RawTransformActionAsync<TInput, TOutput> extends BaseTransformationAsync<TInput, TOutput, RawTransformIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'raw_transform';
    /**
     * The action reference.
     */
    readonly reference: typeof rawTransformAsync;
}
/**
 * Creates a raw transformation action.
 *
 * @param action The transformation action.
 *
 * @returns A raw transform action.
 */
declare function rawTransformAsync<TInput, TOutput>(action: (context: Context$1<TInput>) => MaybePromise<TOutput>): RawTransformActionAsync<TInput, TOutput>;

/**
 * Readonly output type.
 */
type ReadonlyOutput<TInput> = TInput extends Map<infer TKey, infer TValue> ? ReadonlyMap<TKey, TValue> : TInput extends Set<infer TValue> ? ReadonlySet<TValue> : Readonly<TInput>;
/**
 * Readonly action interface.
 */
interface ReadonlyAction<TInput> extends BaseTransformation<TInput, ReadonlyOutput<TInput>, never> {
    /**
     * The action type.
     */
    readonly type: 'readonly';
    /**
     * The action reference.
     */
    readonly reference: typeof readonly;
}
/**
 * Creates a readonly transformation action.
 *
 * @returns A readonly action.
 */
declare function readonly<TInput>(): ReadonlyAction<TInput>;

/**
 * Array action type.
 */
type ArrayAction$1<TInput extends ArrayInput, TOutput> = (output: TOutput, item: TInput[number], index: number, array: TInput) => TOutput;
/**
 * Reduce items action interface.
 */
interface ReduceItemsAction<TInput extends ArrayInput, TOutput> extends BaseTransformation<TInput, TOutput, never> {
    /**
     * The action type.
     */
    readonly type: 'reduce_items';
    /**
     * The action reference.
     */
    readonly reference: typeof reduceItems;
    /**
     * The reduce items operation.
     */
    readonly operation: ArrayAction$1<TInput, TOutput>;
    /**
     * The initial value.
     */
    readonly initial: TOutput;
}
/**
 * Creates a reduce items transformation action.
 *
 * @param operation The reduce items operation.
 * @param initial The initial value.
 *
 * @returns A reduce items action.
 */
declare function reduceItems<TInput extends ArrayInput, TOutput>(operation: ArrayAction$1<TInput, TOutput>, initial: TOutput): ReduceItemsAction<TInput, TOutput>;

/**
 * Regex issue interface.
 */
interface RegexIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'regex';
    /**
     * The expected input.
     */
    readonly expected: string;
    /**
     * The received input.
     */
    readonly received: `"${string}"`;
    /**
     * The regex pattern.
     */
    readonly requirement: RegExp;
}
/**
 * Regex action interface.
 */
interface RegexAction<TInput extends string, TMessage extends ErrorMessage<RegexIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, RegexIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'regex';
    /**
     * The action reference.
     */
    readonly reference: typeof regex;
    /**
     * The expected property.
     */
    readonly expects: string;
    /**
     * The regex pattern.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [regex](https://en.wikipedia.org/wiki/Regular_expression) validation action.
 *
 * Hint: Be careful with the global flag `g` in your regex pattern, as it can lead to unexpected results. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test#using_test_on_a_regex_with_the_global_flag) for more information.
 *
 * @param requirement The regex pattern.
 *
 * @returns A regex action.
 */
declare function regex<TInput extends string>(requirement: RegExp): RegexAction<TInput, undefined>;
/**
 * Creates a [regex](https://en.wikipedia.org/wiki/Regular_expression) validation action.
 *
 * Hint: Be careful with the global flag `g` in your regex pattern, as it can lead to unexpected results. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test#using_test_on_a_regex_with_the_global_flag) for more information.
 *
 * @param requirement The regex pattern.
 * @param message The error message.
 *
 * @returns A regex action.
 */
declare function regex<TInput extends string, const TMessage extends ErrorMessage<RegexIssue<TInput>> | undefined>(requirement: RegExp, message: TMessage): RegexAction<TInput, TMessage>;

/**
 * Returns action type.
 */
interface ReturnsAction<TInput extends (...args: any[]) => unknown, TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>> extends BaseTransformation<TInput, (...args: Parameters<TInput>) => InferOutput<TSchema>, never> {
    /**
     * The action type.
     */
    readonly type: 'returns';
    /**
     * The action reference.
     */
    readonly reference: typeof returns;
    /**
     * The arguments schema.
     */
    readonly schema: TSchema;
}
/**
 * Creates a function return transformation action.
 *
 * @param schema The arguments schema.
 *
 * @returns An returns action.
 */
declare function returns<TInput extends (...args: any[]) => unknown, TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema): ReturnsAction<TInput, TSchema>;

/**
 * Returns action async type.
 */
interface ReturnsActionAsync<TInput extends (...args: any[]) => unknown, TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> extends BaseTransformation<TInput, (...args: Parameters<TInput>) => Promise<Awaited<InferOutput<TSchema>>>, never> {
    /**
     * The action type.
     */
    readonly type: 'returns';
    /**
     * The action reference.
     */
    readonly reference: typeof returnsAsync;
    /**
     * The arguments schema.
     */
    readonly schema: TSchema;
}
/**
 * Creates a function arguments transformation action.
 *
 * @param schema The arguments schema.
 *
 * @returns An returns action.
 */
declare function returnsAsync<TInput extends (...args: any[]) => unknown, TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema): ReturnsActionAsync<TInput, TSchema>;

/**
 * RFC email issue interface.
 */
interface RfcEmailIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'rfc_email';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The RFC email regex.
     */
    readonly requirement: RegExp;
}
/**
 * RFC email action interface.
 */
interface RfcEmailAction<TInput extends string, TMessage extends ErrorMessage<RfcEmailIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, RfcEmailIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'rfc_email';
    /**
     * The action reference.
     */
    readonly reference: typeof rfcEmail;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The RFC email regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [RFC email](https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1)
 * validation action.
 *
 * Hint: This validation action intentionally validates the entire RFC 5322
 * specification. If you are interested in an action that only covers common
 * email addresses, please use the `email` action instead.
 *
 * @returns A RFC email action.
 */
declare function rfcEmail<TInput extends string>(): RfcEmailAction<TInput, undefined>;
/**
 * Creates a [RFC email](https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1)
 * validation action.
 *
 * Hint: This validation action intentionally validates the entire RFC 5322
 * specification. If you are interested in an action that only covers common
 * email addresses, please use the `email` action instead.
 *
 * @param message The error message.
 *
 * @returns A RFC email action.
 */
declare function rfcEmail<TInput extends string, const TMessage extends ErrorMessage<RfcEmailIssue<TInput>> | undefined>(message: TMessage): RfcEmailAction<TInput, TMessage>;

/**
 * Safe integer issue interface.
 */
interface SafeIntegerIssue<TInput extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'safe_integer';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The validation function.
     */
    readonly requirement: (input: number) => boolean;
}
/**
 * Safe integer action interface.
 */
interface SafeIntegerAction<TInput extends number, TMessage extends ErrorMessage<SafeIntegerIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, SafeIntegerIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'safe_integer';
    /**
     * The action reference.
     */
    readonly reference: typeof safeInteger;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The validation function.
     */
    readonly requirement: (input: number) => boolean;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a safe integer validation action.
 *
 * @returns A safe integer action.
 */
declare function safeInteger<TInput extends number>(): SafeIntegerAction<TInput, undefined>;
/**
 * Creates a safe integer validation action.
 *
 * @param message The error message.
 *
 * @returns A safe integer action.
 */
declare function safeInteger<TInput extends number, const TMessage extends ErrorMessage<SafeIntegerIssue<TInput>> | undefined>(message: TMessage): SafeIntegerAction<TInput, TMessage>;

/**
 * Size issue interface.
 */
interface SizeIssue<TInput extends SizeInput, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'size';
    /**
     * The expected property.
     */
    readonly expected: `${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The required size.
     */
    readonly requirement: TRequirement;
}
/**
 * Size action interface.
 */
interface SizeAction<TInput extends SizeInput, TRequirement extends number, TMessage extends ErrorMessage<SizeIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, SizeIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'size';
    /**
     * The action reference.
     */
    readonly reference: typeof size;
    /**
     * The expected property.
     */
    readonly expects: `${TRequirement}`;
    /**
     * The required size.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a size validation action.
 *
 * @param requirement The required size.
 *
 * @returns A size action.
 */
declare function size<TInput extends SizeInput, const TRequirement extends number>(requirement: TRequirement): SizeAction<TInput, TRequirement, undefined>;
/**
 * Creates a size validation action.
 *
 * @param requirement The required size.
 * @param message The error message.
 *
 * @returns A size action.
 */
declare function size<TInput extends SizeInput, const TRequirement extends number, const TMessage extends ErrorMessage<SizeIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): SizeAction<TInput, TRequirement, TMessage>;

/**
 * Slug issue type.
 */
interface SlugIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'slug';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The slug regex.
     */
    readonly requirement: RegExp;
}
/**
 * Slug action type.
 */
interface SlugAction<TInput extends string, TMessage extends ErrorMessage<SlugIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, SlugIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'slug';
    /**
     * The action reference.
     */
    readonly reference: typeof slug;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The slug regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a [slug](https://en.wikipedia.org/wiki/Clean_URL#Slug) validation action.
 *
 * @returns A slug action.
 */
declare function slug<TInput extends string>(): SlugAction<TInput, undefined>;
/**
 * Creates a [slug](https://en.wikipedia.org/wiki/Clean_URL#Slug) validation action.
 *
 * @param message The error message.
 *
 * @returns A slug action.
 */
declare function slug<TInput extends string, const TMessage extends ErrorMessage<SlugIssue<TInput>> | undefined>(message: TMessage): SlugAction<TInput, TMessage>;

/**
 * Some item issue interface.
 */
interface SomeItemIssue<TInput extends ArrayInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'some_item';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The validation function.
     */
    readonly requirement: ArrayRequirement$1<TInput>;
}
/**
 * Some item action interface.
 */
interface SomeItemAction<TInput extends ArrayInput, TMessage extends ErrorMessage<SomeItemIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, SomeItemIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'some_item';
    /**
     * The action reference.
     */
    readonly reference: typeof someItem;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The validation function.
     */
    readonly requirement: ArrayRequirement$1<TInput>;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a some item validation action.
 *
 * @param requirement The validation function.
 *
 * @returns A some item action.
 */
declare function someItem<TInput extends ArrayInput>(requirement: ArrayRequirement$1<TInput>): SomeItemAction<TInput, undefined>;
/**
 * Creates a some item validation action.
 *
 * @param requirement The validation function.
 * @param message The error message.
 *
 * @returns A some item action.
 */
declare function someItem<TInput extends ArrayInput, const TMessage extends ErrorMessage<SomeItemIssue<TInput>> | undefined>(requirement: ArrayRequirement$1<TInput>, message: TMessage): SomeItemAction<TInput, TMessage>;

/**
 * Array action type.
 */
type ArrayAction<TInput extends ArrayInput> = (itemA: TInput[number], itemB: TInput[number]) => number;
/**
 * Sort items action interface.
 */
interface SortItemsAction<TInput extends ArrayInput> extends BaseTransformation<TInput, TInput, never> {
    /**
     * The action type.
     */
    readonly type: 'sort_items';
    /**
     * The action reference.
     */
    readonly reference: typeof sortItems;
    /**
     * The sort items operation.
     */
    readonly operation: ArrayAction<TInput> | undefined;
}
/**
 * Creates a sort items transformation action.
 *
 * @param operation The sort items operation.
 *
 * @returns A sort items action.
 */
declare function sortItems<TInput extends ArrayInput>(operation?: ArrayAction<TInput>): SortItemsAction<TInput>;

/**
 * Starts with issue interface.
 */
interface StartsWithIssue<TInput extends string, TRequirement extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'starts_with';
    /**
     * The expected property.
     */
    readonly expected: `"${TRequirement}"`;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The start string.
     */
    readonly requirement: TRequirement;
}
/**
 * Starts with action interface.
 */
interface StartsWithAction<TInput extends string, TRequirement extends string, TMessage extends ErrorMessage<StartsWithIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, StartsWithIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'starts_with';
    /**
     * The action reference.
     */
    readonly reference: typeof startsWith;
    /**
     * The expected property.
     */
    readonly expects: `"${TRequirement}"`;
    /**
     * The start string.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a starts with validation action.
 *
 * @param requirement The start string.
 *
 * @returns A starts with action.
 */
declare function startsWith<TInput extends string, const TRequirement extends string>(requirement: TRequirement): StartsWithAction<TInput, TRequirement, undefined>;
/**
 * Creates a starts with validation action.
 *
 * @param requirement The start string.
 * @param message The error message.
 *
 * @returns A starts with action.
 */
declare function startsWith<TInput extends string, const TRequirement extends string, const TMessage extends ErrorMessage<StartsWithIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): StartsWithAction<TInput, TRequirement, TMessage>;

/**
 * Stringify JSON config interface.
 *
 * @beta
 */
interface StringifyJsonConfig {
    /**
     * The JSON replacer function or array.
     */
    replacer?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((this: any, key: string, value: any) => any) | (number | string)[];
    /**
     * The JSON space option.
     */
    space?: string | number;
}
/**
 * Stringify JSON issue interface.
 *
 * @beta
 */
interface StringifyJsonIssue<TInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'transformation';
    /**
     * The issue type.
     */
    readonly type: 'stringify_json';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
}
/**
 * Stringify JSON action interface.
 *
 * @beta
 */
interface StringifyJsonAction<TInput, TConfig extends StringifyJsonConfig | undefined, TMessage extends ErrorMessage<StringifyJsonIssue<TInput>> | undefined> extends BaseTransformation<TInput, string, StringifyJsonIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'stringify_json';
    /**
     * The action reference.
     */
    readonly reference: typeof stringifyJson;
    /**
     * The action config.
     */
    readonly config: TConfig;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a stringify JSON transformation action.
 *
 * @returns A stringify JSON action.
 *
 * @beta
 */
declare function stringifyJson<TInput>(): StringifyJsonAction<TInput, undefined, undefined>;
/**
 * Creates a stringify JSON transformation action.
 *
 * @param config The action config.
 *
 * @returns A stringify JSON action.
 *
 * @beta
 */
declare function stringifyJson<TInput, const TConfig extends StringifyJsonConfig | undefined>(config: TConfig): StringifyJsonAction<TInput, TConfig, undefined>;
/**
 * Creates a stringify JSON transformation action.
 *
 * @param config The action config.
 * @param message The error message.
 *
 * @returns A stringify JSON action.
 *
 * @beta
 */
declare function stringifyJson<TInput, const TConfig extends StringifyJsonConfig | undefined, const TMessage extends ErrorMessage<StringifyJsonIssue<TInput>> | undefined>(config: TConfig, message: TMessage): StringifyJsonAction<TInput, TConfig, TMessage>;

/**
 * To lower case action interface.
 */
interface ToLowerCaseAction extends BaseTransformation<string, string, never> {
    /**
     * The action type.
     */
    readonly type: 'to_lower_case';
    /**
     * The action reference.
     */
    readonly reference: typeof toLowerCase;
}
/**
 * Creates a to lower case transformation action.
 *
 * @returns A to lower case action.
 */
declare function toLowerCase(): ToLowerCaseAction;

/**
 * To max value action interface.
 */
interface ToMaxValueAction<TInput extends ValueInput, TRequirement extends TInput> extends BaseTransformation<TInput, TInput, never> {
    /**
     * The action type.
     */
    readonly type: 'to_max_value';
    /**
     * The action reference.
     */
    readonly reference: typeof toMaxValue;
    /**
     * The maximum value.
     */
    readonly requirement: TRequirement;
}
/**
 * Creates a to max value transformation action.
 *
 * @param requirement The maximum value.
 *
 * @returns A to max value action.
 */
declare function toMaxValue<TInput extends ValueInput, const TRequirement extends TInput>(requirement: TRequirement): ToMaxValueAction<TInput, TRequirement>;

/**
 * To min value action interface.
 */
interface ToMinValueAction<TInput extends ValueInput, TRequirement extends TInput> extends BaseTransformation<TInput, TInput, never> {
    /**
     * The action type.
     */
    readonly type: 'to_min_value';
    /**
     * The action reference.
     */
    readonly reference: typeof toMinValue;
    /**
     * The minimum value.
     */
    readonly requirement: TRequirement;
}
/**
 * Creates a to min value transformation action.
 *
 * @param requirement The minimum value.
 *
 * @returns A to min value action.
 */
declare function toMinValue<TInput extends ValueInput, const TRequirement extends TInput>(requirement: TRequirement): ToMinValueAction<TInput, TRequirement>;

/**
 * To upper case action interface.
 */
interface ToUpperCaseAction extends BaseTransformation<string, string, never> {
    /**
     * The action type.
     */
    readonly type: 'to_upper_case';
    /**
     * The action reference.
     */
    readonly reference: typeof toUpperCase;
}
/**
 * Creates a to upper case transformation action.
 *
 * @returns A to upper case action.
 */
declare function toUpperCase(): ToUpperCaseAction;

/**
 * Transform action interface.
 */
interface TransformAction<TInput, TOutput> extends BaseTransformation<TInput, TOutput, never> {
    /**
     * The action type.
     */
    readonly type: 'transform';
    /**
     * The action reference.
     */
    readonly reference: typeof transform;
    /**
     * The transformation operation.
     */
    readonly operation: (input: TInput) => TOutput;
}
/**
 * Creates a custom transformation action.
 *
 * @param operation The transformation operation.
 *
 * @returns A transform action.
 */
declare function transform<TInput, TOutput>(operation: (input: TInput) => TOutput): TransformAction<TInput, TOutput>;

/**
 * Transform action async interface.
 */
interface TransformActionAsync<TInput, TOutput> extends BaseTransformationAsync<TInput, TOutput, never> {
    /**
     * The action type.
     */
    readonly type: 'transform';
    /**
     * The action reference.
     */
    readonly reference: typeof transformAsync;
    /**
     * The transformation operation.
     */
    readonly operation: (input: TInput) => Promise<TOutput>;
}
/**
 * Creates a custom transformation action.
 *
 * @param operation The transformation operation.
 *
 * @returns A transform action.
 */
declare function transformAsync<TInput, TOutput>(operation: (input: TInput) => Promise<TOutput>): TransformActionAsync<TInput, TOutput>;

/**
 * Trim action interface.
 */
interface TrimAction extends BaseTransformation<string, string, never> {
    /**
     * The action type.
     */
    readonly type: 'trim';
    /**
     * The action reference.
     */
    readonly reference: typeof trim;
}
/**
 * Creates a trim transformation action.
 *
 * @returns A trim action.
 */
declare function trim(): TrimAction;

/**
 * Trim end action interface.
 */
interface TrimEndAction extends BaseTransformation<string, string, never> {
    /**
     * The action type.
     */
    readonly type: 'trim_end';
    /**
     * The action reference.
     */
    readonly reference: typeof trimEnd;
}
/**
 * Creates a trim end transformation action.
 *
 * @returns A trim end action.
 */
declare function trimEnd(): TrimEndAction;

/**
 * Trim start action interface.
 */
interface TrimStartAction extends BaseTransformation<string, string, never> {
    /**
     * The action type.
     */
    readonly type: 'trim_start';
    /**
     * The action reference.
     */
    readonly reference: typeof trimStart;
}
/**
 * Creates a trim start transformation action.
 *
 * @returns A trim start action.
 */
declare function trimStart(): TrimStartAction;

/**
 * ULID issue interface.
 */
interface UlidIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'ulid';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The ULID regex.
     */
    readonly requirement: RegExp;
}
/**
 * ULID action interface.
 */
interface UlidAction<TInput extends string, TMessage extends ErrorMessage<UlidIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, UlidIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'ulid';
    /**
     * The action reference.
     */
    readonly reference: typeof ulid;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The ULID regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [ULID](https://github.com/ulid/spec) validation action.
 *
 * @returns An ULID action.
 */
declare function ulid<TInput extends string>(): UlidAction<TInput, undefined>;
/**
 * Creates an [ULID](https://github.com/ulid/spec) validation action.
 *
 * @param message The error message.
 *
 * @returns An ULID action.
 */
declare function ulid<TInput extends string, const TMessage extends ErrorMessage<UlidIssue<TInput>> | undefined>(message: TMessage): UlidAction<TInput, TMessage>;

/**
 * URL issue interface.
 */
interface UrlIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'url';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The validation function.
     */
    readonly requirement: (input: string) => boolean;
}
/**
 * URL action interface.
 */
interface UrlAction<TInput extends string, TMessage extends ErrorMessage<UrlIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, UrlIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'url';
    /**
     * The action reference.
     */
    readonly reference: typeof url;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The validation function.
     */
    readonly requirement: (input: string) => boolean;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [URL](https://en.wikipedia.org/wiki/URL) validation action.
 *
 * Hint: The value is passed to the URL constructor to check if it is valid.
 * This check is not perfect. For example, values like "abc:1234" are accepted.
 *
 * @returns An URL action.
 */
declare function url<TInput extends string>(): UrlAction<TInput, undefined>;
/**
 * Creates an [URL](https://en.wikipedia.org/wiki/URL) validation action.
 *
 * Hint: The value is passed to the URL constructor to check if it is valid.
 * This check is not perfect. For example, values like "abc:1234" are accepted.
 *
 * @param message The error message.
 *
 * @returns An URL action.
 */
declare function url<TInput extends string, const TMessage extends ErrorMessage<UrlIssue<TInput>> | undefined>(message: TMessage): UrlAction<TInput, TMessage>;

/**
 * UUID issue interface.
 */
interface UuidIssue<TInput extends string> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'uuid';
    /**
     * The expected property.
     */
    readonly expected: null;
    /**
     * The received property.
     */
    readonly received: `"${string}"`;
    /**
     * The UUID regex.
     */
    readonly requirement: RegExp;
}
/**
 * UUID action interface.
 */
interface UuidAction<TInput extends string, TMessage extends ErrorMessage<UuidIssue<TInput>> | undefined> extends BaseValidation<TInput, TInput, UuidIssue<TInput>> {
    /**
     * The action type.
     */
    readonly type: 'uuid';
    /**
     * The action reference.
     */
    readonly reference: typeof uuid;
    /**
     * The expected property.
     */
    readonly expects: null;
    /**
     * The UUID regex.
     */
    readonly requirement: RegExp;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates an [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) validation action.
 *
 * @returns An UUID action.
 */
declare function uuid<TInput extends string>(): UuidAction<TInput, undefined>;
/**
 * Creates an [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) validation action.
 *
 * @param message The error message.
 *
 * @returns An UUID action.
 */
declare function uuid<TInput extends string, const TMessage extends ErrorMessage<UuidIssue<TInput>> | undefined>(message: TMessage): UuidAction<TInput, TMessage>;

/**
 * Value issue interface.
 */
interface ValueIssue<TInput extends ValueInput, TRequirement extends TInput> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'value';
    /**
     * The expected property.
     */
    readonly expected: string;
    /**
     * The required value.
     */
    readonly requirement: TRequirement;
}
/**
 * Value action interface.
 */
interface ValueAction<TInput extends ValueInput, TRequirement extends TInput, TMessage extends ErrorMessage<ValueIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, ValueIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'value';
    /**
     * The action reference.
     */
    readonly reference: typeof value;
    /**
     * The expected property.
     */
    readonly expects: string;
    /**
     * The required value.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a value validation action.
 *
 * @param requirement The required value.
 *
 * @returns A value action.
 */
declare function value<TInput extends ValueInput, const TRequirement extends TInput>(requirement: TRequirement): ValueAction<TInput, TRequirement, undefined>;
/**
 * Creates a value validation action.
 *
 * @param requirement The required value.
 * @param message The error message.
 *
 * @returns A value action.
 */
declare function value<TInput extends ValueInput, const TRequirement extends TInput, const TMessage extends ErrorMessage<ValueIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): ValueAction<TInput, TRequirement, TMessage>;

/**
 * Values issue type.
 */
interface ValuesIssue<TInput extends ValueInput, TRequirement extends readonly TInput[]> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'values';
    /**
     * The expected property.
     */
    readonly expected: string;
    /**
     * The required values.
     */
    readonly requirement: TRequirement;
}
/**
 * Values action type.
 */
interface ValuesAction<TInput extends ValueInput, TRequirement extends readonly TInput[], TMessage extends ErrorMessage<ValuesIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, ValuesIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'values';
    /**
     * The action reference.
     */
    readonly reference: typeof values;
    /**
     * The expected property.
     */
    readonly expects: string;
    /**
     * The required values.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a values validation action.
 *
 * @param requirement The required values.
 *
 * @returns A values action.
 */
declare function values<TInput extends ValueInput, const TRequirement extends readonly TInput[]>(requirement: TRequirement): ValuesAction<TInput, TRequirement, undefined>;
/**
 * Creates a values validation action.
 *
 * @param requirement The required values.
 * @param message The error message.
 *
 * @returns A values action.
 */
declare function values<TInput extends ValueInput, const TRequirement extends readonly TInput[], const TMessage extends ErrorMessage<ValuesIssue<TInput, TRequirement>> | undefined>(requirement: TRequirement, message: TMessage): ValuesAction<TInput, TRequirement, TMessage>;

/**
 * Words issue interface.
 */
interface WordsIssue<TInput extends string, TRequirement extends number> extends BaseIssue<TInput> {
    /**
     * The issue kind.
     */
    readonly kind: 'validation';
    /**
     * The issue type.
     */
    readonly type: 'words';
    /**
     * The expected property.
     */
    readonly expected: `${TRequirement}`;
    /**
     * The received property.
     */
    readonly received: `${number}`;
    /**
     * The required words.
     */
    readonly requirement: TRequirement;
}
/**
 * Words action interface.
 */
interface WordsAction<TInput extends string, TLocales extends Intl.LocalesArgument, TRequirement extends number, TMessage extends ErrorMessage<WordsIssue<TInput, TRequirement>> | undefined> extends BaseValidation<TInput, TInput, WordsIssue<TInput, TRequirement>> {
    /**
     * The action type.
     */
    readonly type: 'words';
    /**
     * The action reference.
     */
    readonly reference: typeof words;
    /**
     * The expected property.
     */
    readonly expects: `${TRequirement}`;
    /**
     * The locales to be used.
     */
    readonly locales: TLocales;
    /**
     * The required words.
     */
    readonly requirement: TRequirement;
    /**
     * The error message.
     */
    readonly message: TMessage;
}
/**
 * Creates a words validation action.
 *
 * @param locales The locales to be used.
 * @param requirement The required words.
 *
 * @returns A words action.
 */
declare function words<TInput extends string, const TLocales extends Intl.LocalesArgument, const TRequirement extends number>(locales: TLocales, requirement: TRequirement): WordsAction<TInput, TLocales, TRequirement, undefined>;
/**
 * Creates a words validation action.
 *
 * @param locales The locales to be used.
 * @param requirement The required words.
 * @param message The error message.
 *
 * @returns A words action.
 */
declare function words<TInput extends string, const TLocales extends Intl.LocalesArgument, const TRequirement extends number, const TMessage extends ErrorMessage<WordsIssue<TInput, TRequirement>> | undefined>(locales: TLocales, requirement: TRequirement, message: TMessage): WordsAction<TInput, TLocales, TRequirement, TMessage>;

/**
 * [Base64](https://en.wikipedia.org/wiki/Base64) regex.
 */
declare const BASE64_REGEX: RegExp;
/**
 * [BIC](https://en.wikipedia.org/wiki/ISO_9362) regex.
 */
declare const BIC_REGEX: RegExp;
/**
 * [Cuid2](https://github.com/paralleldrive/cuid2) regex.
 */
declare const CUID2_REGEX: RegExp;
/**
 * [Decimal](https://en.wikipedia.org/wiki/Decimal) regex.
 */
declare const DECIMAL_REGEX: RegExp;
/**
 * [Digits](https://en.wikipedia.org/wiki/Numerical_digit) regex.
 */
declare const DIGITS_REGEX: RegExp;
/**
 * [Email address](https://en.wikipedia.org/wiki/Email_address) regex.
 */
declare const EMAIL_REGEX: RegExp;
/**
 * Emoji regex from [emoji-regex-xs](https://github.com/slevithan/emoji-regex-xs) v1.0.0 (MIT license).
 *
 * Hint: We decided against the newer `/^\p{RGI_Emoji}+$/v` regex because it is
 * not supported in older runtimes and does not match all emoji.
 */
declare const EMOJI_REGEX: RegExp;
/**
 * [Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) regex.
 *
 * Hint: We decided against the `i` flag for better JSON Schema compatibility.
 */
declare const HEXADECIMAL_REGEX: RegExp;
/**
 * [Hex color](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet) regex.
 *
 * Hint: We decided against the `i` flag for better JSON Schema compatibility.
 */
declare const HEX_COLOR_REGEX: RegExp;
/**
 * [IMEI](https://en.wikipedia.org/wiki/International_Mobile_Equipment_Identity) regex.
 */
declare const IMEI_REGEX: RegExp;
/**
 * [IPv4](https://en.wikipedia.org/wiki/IPv4) regex.
 */
declare const IPV4_REGEX: RegExp;
/**
 * [IPv6](https://en.wikipedia.org/wiki/IPv6) regex.
 */
declare const IPV6_REGEX: RegExp;
/**
 * [IP](https://en.wikipedia.org/wiki/IP_address) regex.
 */
declare const IP_REGEX: RegExp;
/**
 * [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date regex.
 */
declare const ISO_DATE_REGEX: RegExp;
/**
 * [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time regex.
 */
declare const ISO_DATE_TIME_REGEX: RegExp;
/**
 * [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) time regex.
 */
declare const ISO_TIME_REGEX: RegExp;
/**
 * [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) time with seconds regex.
 */
declare const ISO_TIME_SECOND_REGEX: RegExp;
/**
 * [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp regex.
 */
declare const ISO_TIMESTAMP_REGEX: RegExp;
/**
 * [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) week regex.
 */
declare const ISO_WEEK_REGEX: RegExp;
/**
 * [MAC](https://en.wikipedia.org/wiki/MAC_address) 48 bit regex.
 */
declare const MAC48_REGEX: RegExp;
/**
 * [MAC](https://en.wikipedia.org/wiki/MAC_address) 64 bit regex.
 */
declare const MAC64_REGEX: RegExp;
/**
 * [MAC](https://en.wikipedia.org/wiki/MAC_address) regex.
 */
declare const MAC_REGEX: RegExp;
/**
 * [Nano ID](https://github.com/ai/nanoid) regex.
 */
declare const NANO_ID_REGEX: RegExp;
/**
 * [Octal](https://en.wikipedia.org/wiki/Octal) regex.
 */
declare const OCTAL_REGEX: RegExp;
/**
 * [RFC 5322 email address](https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1) regex.
 *
 * Hint: This regex was taken from the [HTML Living Standard Specification](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) and does not perfectly represent RFC 5322.
 */
declare const RFC_EMAIL_REGEX: RegExp;
/**
 * [Slug](https://en.wikipedia.org/wiki/Clean_URL#Slug) regex.
 */
declare const SLUG_REGEX: RegExp;
/**
 * [ULID](https://github.com/ulid/spec) regex.
 *
 * Hint: We decided against the `i` flag for better JSON Schema compatibility.
 */
declare const ULID_REGEX: RegExp;
/**
 * [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) regex.
 */
declare const UUID_REGEX: RegExp;

/**
 * The global config type.
 */
type GlobalConfig = Omit<Config<never>, 'message'>;
/**
 * Sets the global configuration.
 *
 * @param config The configuration.
 */
declare function setGlobalConfig(config: GlobalConfig): void;
/**
 * Returns the global configuration.
 *
 * @param config The config to merge.
 *
 * @returns The configuration.
 */
declare function getGlobalConfig<const TIssue extends BaseIssue<unknown>>(config?: Config<TIssue>): Config<TIssue>;
/**
 * Deletes the global configuration.
 */
declare function deleteGlobalConfig(): void;

/**
 * Sets a global error message.
 *
 * @param message The error message.
 * @param lang The language of the message.
 */
declare function setGlobalMessage(message: ErrorMessage<BaseIssue<unknown>>, lang?: string): void;
/**
 * Returns a global error message.
 *
 * @param lang The language of the message.
 *
 * @returns The error message.
 */
declare function getGlobalMessage(lang?: string): ErrorMessage<BaseIssue<unknown>> | undefined;
/**
 * Deletes a global error message.
 *
 * @param lang The language of the message.
 */
declare function deleteGlobalMessage(lang?: string): void;

/**
 * Sets a schema error message.
 *
 * @param message The error message.
 * @param lang The language of the message.
 */
declare function setSchemaMessage(message: ErrorMessage<BaseIssue<unknown>>, lang?: string): void;
/**
 * Returns a schema error message.
 *
 * @param lang The language of the message.
 *
 * @returns The error message.
 */
declare function getSchemaMessage(lang?: string): ErrorMessage<BaseIssue<unknown>> | undefined;
/**
 * Deletes a schema error message.
 *
 * @param lang The language of the message.
 */
declare function deleteSchemaMessage(lang?: string): void;

/**
 * Reference type.
 */
type Reference = (...args: any[]) => BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<unknown, unknown, BaseIssue<unknown>> | BaseValidationAsync<unknown, unknown, BaseIssue<unknown>> | BaseTransformation<unknown, unknown, BaseIssue<unknown>> | BaseTransformationAsync<unknown, unknown, BaseIssue<unknown>>;
/**
 * Sets a specific error message.
 *
 * @param reference The identifier reference.
 * @param message The error message.
 * @param lang The language of the message.
 */
declare function setSpecificMessage<const TReference extends Reference>(reference: TReference, message: ErrorMessage<InferIssue<ReturnType<TReference>>>, lang?: string): void;
/**
 * Returns a specific error message.
 *
 * @param reference The identifier reference.
 * @param lang The language of the message.
 *
 * @returns The error message.
 */
declare function getSpecificMessage<const TReference extends Reference>(reference: TReference, lang?: string): ErrorMessage<InferIssue<ReturnType<TReference>>> | undefined;
/**
 * Deletes a specific error message.
 *
 * @param reference The identifier reference.
 * @param lang The language of the message.
 */
declare function deleteSpecificMessage(reference: Reference, lang?: string): void;

/**
 * Context type.
 */
type Context = BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<any, unknown, BaseIssue<unknown>> | BaseValidationAsync<any, unknown, BaseIssue<unknown>> | BaseTransformation<any, unknown, BaseIssue<unknown>> | BaseTransformationAsync<any, unknown, BaseIssue<unknown>>;
/**
 * Other interface.
 */
interface Other<TContext extends Context> {
    input?: unknown | undefined;
    expected?: string | undefined;
    received?: string | undefined;
    message?: ErrorMessage<InferIssue<TContext>> | undefined;
    path?: [IssuePathItem, ...IssuePathItem[]] | undefined;
    issues?: [BaseIssue<InferInput<TContext>>, ...BaseIssue<InferInput<TContext>>[]] | undefined;
}
/**
 * Adds an issue to the dataset.
 *
 * @param context The issue context.
 * @param label The issue label.
 * @param dataset The input dataset.
 * @param config The configuration.
 * @param other The optional props.
 *
 * @internal
 */
declare function _addIssue<const TContext extends Context>(context: TContext & {
    expects?: string | null;
    requirement?: unknown;
    message?: ErrorMessage<Extract<InferIssue<TContext>, {
        type: TContext['type'];
    }>> | undefined;
}, label: string, dataset: UnknownDataset | OutputDataset<unknown, BaseIssue<unknown>>, config: Config<InferIssue<TContext>>, other?: Other<TContext>): void;

/**
 * Returns the byte count of the input.
 *
 * @param input The input to be measured.
 *
 * @returns The byte count.
 *
 * @internal
 */
declare function _getByteCount(input: string): number;

/**
 * Returns the grapheme count of the input.
 *
 * @param input The input to be measured.
 *
 * @returns The grapheme count.
 *
 * @internal
 */
declare function _getGraphemeCount(input: string): number;

/**
 * Metadata action type.
 */
type MetadataAction = TitleAction<unknown, string> | DescriptionAction<unknown, string>;
/**
 * Schema type.
 */
type Schema$1 = BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | SchemaWithPipe<readonly [
    BaseSchema<unknown, unknown, BaseIssue<unknown>>,
    ...(PipeItem<any, unknown, BaseIssue<unknown>> | MetadataAction)[]
]> | SchemaWithPipeAsync<readonly [
    (BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>),
    ...(PipeItem<any, unknown, BaseIssue<unknown>> | PipeItemAsync<any, unknown, BaseIssue<unknown>> | MetadataAction)[]
]>;
/**
 * Returns the last top-level value of a given metadata type from a schema
 * using a breadth-first search that starts with the last item in the pipeline.
 *
 * @param schema The schema to search.
 * @param type The metadata type.
 *
 * @returns The value, if any.
 *
 * @internal
 */
declare function _getLastMetadata(schema: Schema$1, type: 'title' | 'description'): string | undefined;

/**
 * Returns the Standard Schema properties.
 *
 * @param context The schema context.
 *
 * @returns The Standard Schema properties.
 */
declare function _getStandardProps<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(context: TSchema): StandardProps<InferInput<TSchema>, InferOutput<TSchema>>;

/**
 * Returns the word count of the input.
 *
 * @param locales The locales to be used.
 * @param input The input to be measured.
 *
 * @returns The word count.
 *
 * @internal
 */
declare function _getWordCount(locales: Intl.LocalesArgument, input: string): number;

/**
 * Checks whether a string with numbers corresponds to the luhn algorithm.
 *
 * @param input The input to be checked.
 *
 * @returns Whether input is valid.
 *
 * @internal
 */
declare function _isLuhnAlgo(input: string): boolean;

/**
 * Disallows inherited object properties and prevents object prototype
 * pollution by disallowing certain keys.
 *
 * @param object The object to check.
 * @param key The key to check.
 *
 * @returns Whether the key is allowed.
 *
 * @internal
 */
declare function _isValidObjectKey(object: object, key: string): boolean;

/**
 * Joins multiple `expects` values with the given separator.
 *
 * @param values The `expects` values.
 * @param separator The separator.
 *
 * @returns The joined `expects` property.
 *
 * @internal
 */
declare function _joinExpects(values: string[], separator: '&' | '|'): string;

/**
 * Stringifies an unknown input to a literal or type string.
 *
 * @param input The unknown input.
 *
 * @returns A literal or type string.
 *
 * @internal
 */
declare function _stringify(input: unknown): string;

/**
 * Creates an object entries definition from a list of keys and a schema.
 *
 * @param list A list of keys.
 * @param schema The schema of the keys.
 *
 * @returns The object entries.
 */
declare function entriesFromList<const TList extends readonly (string | number | symbol)[], const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(list: TList, schema: TSchema): Record<TList[number], TSchema>;

/**
 * Schema type.
 */
type Schema = LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined> | LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<StrictObjectIssue> | undefined>;
/**
 * Recursive merge type.
 */
type RecursiveMerge<TSchemas extends readonly [Schema, ...Schema[]]> = TSchemas extends readonly [infer TFirstSchema extends Schema] ? TFirstSchema['entries'] : TSchemas extends readonly [
    infer TFirstSchema extends Schema,
    ...infer TRestSchemas extends readonly [Schema, ...Schema[]]
] ? Merge<TFirstSchema['entries'], RecursiveMerge<TRestSchemas>> : never;
/**
 * Merged entries types.
 */
type MergedEntries<TSchemas extends readonly [Schema, ...Schema[]]> = Prettify<RecursiveMerge<TSchemas>>;
/**
 * Creates a new object entries definition from existing object schemas.
 *
 * @param schemas The schemas to merge the entries from.
 *
 * @returns The object entries from the schemas.
 */
declare function entriesFromObjects<const TSchemas extends readonly [Schema, ...Schema[]]>(schemas: TSchemas): MergedEntries<TSchemas>;

/**
 * Creates and returns the dot path of an issue if possible.
 *
 * @param issue The issue to get the dot path from.
 *
 * @returns The dot path or null.
 */
declare function getDotPath(issue: BaseIssue<unknown>): string | null;
/**
 * Creates and returns the dot path of an issue if possible.
 *
 * @param issue The issue to get the dot path from.
 *
 * @returns The dot path or null.
 */
declare function getDotPath<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(issue: InferIssue<TSchema>): IssueDotPath<TSchema> | null;

/**
 * A generic type guard to check the kind of an object.
 *
 * @param kind The kind to check for.
 * @param object The object to check.
 *
 * @returns Whether it matches.
 */
declare function isOfKind<const TKind extends TObject['kind'], const TObject extends {
    kind: string;
}>(kind: TKind, object: TObject): object is Extract<TObject, {
    kind: TKind;
}>;

/**
 * A generic type guard to check the type of an object.
 *
 * @param type The type to check for.
 * @param object The object to check.
 *
 * @returns Whether it matches.
 */
declare function isOfType<const TType extends TObject['type'], const TObject extends {
    type: string;
}>(type: TType, object: TObject): object is Extract<TObject, {
    type: TType;
}>;

/**
 * A type guard to check if an error is a ValiError.
 *
 * @param error The error to check.
 *
 * @returns Whether its a ValiError.
 */
declare function isValiError<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(error: unknown): error is ValiError<TSchema>;

/**
 * A Valibot error with useful information.
 */
declare class ValiError<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> extends Error {
    /**
     * The error issues.
     */
    readonly issues: [InferIssue<TSchema>, ...InferIssue<TSchema>[]];
    /**
     * Creates a Valibot error with useful information.
     *
     * @param issues The error issues.
     */
    constructor(issues: [InferIssue<TSchema>, ...InferIssue<TSchema>[]]);
}

export { type AnySchema, type ArgsAction, type ArgsActionAsync, type ArrayInput, type ArrayIssue, type ArrayPathItem, type ArrayRequirement$1 as ArrayRequirement, type ArrayRequirementAsync, type ArraySchema, type ArraySchemaAsync, type AwaitActionAsync, BASE64_REGEX, BIC_REGEX, type Base64Action, type Base64Issue, type BaseIssue, type BaseMetadata, type BaseSchema, type BaseSchemaAsync, type BaseTransformation, type BaseTransformationAsync, type BaseValidation, type BaseValidationAsync, type BicAction, type BicIssue, type BigintIssue, type BigintSchema, type BlobIssue, type BlobSchema, type BooleanIssue, type BooleanSchema, type Brand, type BrandAction, type BrandName, BrandSymbol, type BytesAction, type BytesIssue, CUID2_REGEX, type CheckAction, type CheckActionAsync, type CheckIssue, type CheckItemsAction, type CheckItemsActionAsync, type CheckItemsIssue, type Class, type Config, type ContentInput, type ContentRequirement, type CreditCardAction, type CreditCardIssue, type Cuid2Action, type Cuid2Issue, type CustomIssue, type CustomSchema, type CustomSchemaAsync, DECIMAL_REGEX, DIGITS_REGEX, type DateIssue, type DateSchema, type DecimalAction, type DecimalIssue, type Default, type DefaultAsync, type DefaultValue, type DescriptionAction, type DigitsAction, type DigitsIssue, EMAIL_REGEX, EMOJI_REGEX, type EmailAction, type EmailIssue, type EmojiAction, type EmojiIssue, type EmptyAction, type EmptyIssue, type EndsWithAction, type EndsWithIssue, type EntriesAction, type EntriesInput, type EntriesIssue, type Enum, type EnumIssue, type EnumSchema, type EnumValues, type ErrorMessage, type EveryItemAction, type EveryItemIssue, type ExactOptionalSchema, type ExactOptionalSchemaAsync, type ExcludesAction, type ExcludesIssue, type FailureDataset, type Fallback, type FallbackAsync, type FileIssue, type FileSchema, type FilterItemsAction, type FindItemAction, type FiniteAction, type FiniteIssue, type FlatErrors, type Flavor, type FlavorAction, type FlavorName, FlavorSymbol, type FunctionIssue, type FunctionSchema, type GenericIssue, type GenericMetadata, type GenericPipeAction, type GenericPipeActionAsync, type GenericPipeItem, type GenericPipeItemAsync, type GenericSchema, type GenericSchemaAsync, type GenericTransformation, type GenericTransformationAsync, type GenericValidation, type GenericValidationAsync, type GlobalConfig, type GraphemesAction, type GraphemesIssue, type GtValueAction, type GtValueIssue, HEXADECIMAL_REGEX, HEX_COLOR_REGEX, type HashAction, type HashIssue, type HashType, type HexColorAction, type HexColorIssue, type HexadecimalAction, type HexadecimalIssue, IMEI_REGEX, IPV4_REGEX, IPV6_REGEX, IP_REGEX, ISO_DATE_REGEX, ISO_DATE_TIME_REGEX, ISO_TIMESTAMP_REGEX, ISO_TIME_REGEX, ISO_TIME_SECOND_REGEX, ISO_WEEK_REGEX, type ImeiAction, type ImeiIssue, type IncludesAction, type IncludesIssue, type InferDefault, type InferDefaults, type InferFallback, type InferFallbacks, type InferInput, type InferIssue, type InferMetadata, type InferOutput, type InstanceIssue, type InstanceSchema, type IntegerAction, type IntegerIssue, type IntersectIssue, type IntersectOptions, type IntersectOptionsAsync, type IntersectSchema, type IntersectSchemaAsync, type IpAction, type IpIssue, type Ipv4Action, type Ipv4Issue, type Ipv6Action, type Ipv6Issue, type IsoDateAction, type IsoDateIssue, type IsoDateTimeAction, type IsoDateTimeIssue, type IsoTimeAction, type IsoTimeIssue, type IsoTimeSecondAction, type IsoTimeSecondIssue, type IsoTimestampAction, type IsoTimestampIssue, type IsoWeekAction, type IsoWeekIssue, type IssueDotPath, type IssuePathItem, type LazySchema, type LazySchemaAsync, type LengthAction, type LengthInput, type LengthIssue, type Literal, type LiteralIssue, type LiteralSchema, type LooseObjectIssue, type LooseObjectSchema, type LooseObjectSchemaAsync, type LooseTupleIssue, type LooseTupleSchema, type LooseTupleSchemaAsync, type LtValueAction, type LtValueIssue, MAC48_REGEX, MAC64_REGEX, MAC_REGEX, type Mac48Action, type Mac48Issue, type Mac64Action, type Mac64Issue, type MacAction, type MacIssue, type MapIssue, type MapItemsAction, type MapPathItem, type MapSchema, type MapSchemaAsync, type MaxBytesAction, type MaxBytesIssue, type MaxEntriesAction, type MaxEntriesIssue, type MaxGraphemesAction, type MaxGraphemesIssue, type MaxLengthAction, type MaxLengthIssue, type MaxSizeAction, type MaxSizeIssue, type MaxValueAction, type MaxValueIssue, type MaxWordsAction, type MaxWordsIssue, type MetadataAction$1 as MetadataAction, type MimeTypeAction, type MimeTypeIssue, type MinBytesAction, type MinBytesIssue, type MinEntriesAction, type MinEntriesIssue, type MinGraphemesAction, type MinGraphemesIssue, type MinLengthAction, type MinLengthIssue, type MinSizeAction, type MinSizeIssue, type MinValueAction, type MinValueIssue, type MinWordsAction, type MinWordsIssue, type MultipleOfAction, type MultipleOfIssue, NANO_ID_REGEX, type NanIssue, type NanSchema, type NanoIDAction, type NanoIDIssue, type NanoIdAction, type NanoIdIssue, type NeverIssue, type NeverSchema, type NonEmptyAction, type NonEmptyIssue, type NonNullableIssue, type NonNullableSchema, type NonNullableSchemaAsync, type NonNullishIssue, type NonNullishSchema, type NonNullishSchemaAsync, type NonOptionalIssue, type NonOptionalSchema, type NonOptionalSchemaAsync, type NormalizeAction, type NormalizeForm, type NotBytesAction, type NotBytesIssue, type NotEntriesAction, type NotEntriesIssue, type NotGraphemesAction, type NotGraphemesIssue, type NotLengthAction, type NotLengthIssue, type NotSizeAction, type NotSizeIssue, type NotValueAction, type NotValueIssue, type NotValuesAction, type NotValuesIssue, type NotWordsAction, type NotWordsIssue, type NullIssue, type NullSchema, type NullableSchema, type NullableSchemaAsync, type NullishSchema, type NullishSchemaAsync, type NumberIssue, type NumberSchema, OCTAL_REGEX, type ObjectEntries, type ObjectEntriesAsync, type ObjectIssue, type ObjectKeys, type ObjectPathItem, type ObjectSchema, type ObjectSchemaAsync, type ObjectWithRestIssue, type ObjectWithRestSchema, type ObjectWithRestSchemaAsync, type OctalAction, type OctalIssue, type OptionalSchema, type OptionalSchemaAsync, type OutputDataset, type ParseJsonAction, type ParseJsonConfig, type ParseJsonIssue, type Parser, type ParserAsync, type PartialCheckAction, type PartialCheckActionAsync, type PartialCheckIssue, type PartialDataset, type PicklistIssue, type PicklistOptions, type PicklistSchema, type PipeAction, type PipeActionAsync, type PipeItem, type PipeItemAsync, type PromiseIssue, type PromiseSchema, RFC_EMAIL_REGEX, type RawCheckAction, type RawCheckActionAsync, type RawCheckIssue, type RawTransformAction, type RawTransformActionAsync, type RawTransformIssue, type ReadonlyAction, type RecordIssue, type RecordSchema, type RecordSchemaAsync, type ReduceItemsAction, type RegexAction, type RegexIssue, type ReturnsAction, type ReturnsActionAsync, type RfcEmailAction, type RfcEmailIssue, SLUG_REGEX, type SafeIntegerAction, type SafeIntegerIssue, type SafeParseResult, type SafeParser, type SafeParserAsync, type SchemaWithFallback, type SchemaWithFallbackAsync, type SchemaWithOmit, type SchemaWithPartial, type SchemaWithPartialAsync, type SchemaWithPick, type SchemaWithPipe, type SchemaWithPipeAsync, type SchemaWithRequired, type SchemaWithRequiredAsync, type SchemaWithoutPipe, type SetIssue, type SetPathItem, type SetSchema, type SetSchemaAsync, type SizeAction, type SizeInput, type SizeIssue, type SlugAction, type SlugIssue, type SomeItemAction, type SomeItemIssue, type SortItemsAction, type StandardProps, type StartsWithAction, type StartsWithIssue, type StrictObjectIssue, type StrictObjectSchema, type StrictObjectSchemaAsync, type StrictTupleIssue, type StrictTupleSchema, type StrictTupleSchemaAsync, type StringIssue, type StringSchema, type StringifyJsonAction, type StringifyJsonConfig, type StringifyJsonIssue, type SuccessDataset, type SymbolIssue, type SymbolSchema, type TitleAction, type ToLowerCaseAction, type ToMaxValueAction, type ToMinValueAction, type ToUpperCaseAction, type TransformAction, type TransformActionAsync, type TrimAction, type TrimEndAction, type TrimStartAction, type TupleIssue, type TupleItems, type TupleItemsAsync, type TupleSchema, type TupleSchemaAsync, type TupleWithRestIssue, type TupleWithRestSchema, type TupleWithRestSchemaAsync, ULID_REGEX, UUID_REGEX, type UlidAction, type UlidIssue, type UndefinedIssue, type UndefinedSchema, type UndefinedableSchema, type UndefinedableSchemaAsync, type UnionIssue, type UnionOptions, type UnionOptionsAsync, type UnionSchema, type UnionSchemaAsync, type UnknownDataset, type UnknownPathItem, type UnknownSchema, type UrlAction, type UrlIssue, type UuidAction, type UuidIssue, ValiError, type ValueAction, type ValueInput, type ValueIssue, type ValuesAction, type ValuesIssue, type VariantIssue, type VariantOptions, type VariantOptionsAsync, type VariantSchema, type VariantSchemaAsync, type VoidIssue, type VoidSchema, type WordsAction, type WordsIssue, _addIssue, _getByteCount, _getGraphemeCount, _getLastMetadata, _getStandardProps, _getWordCount, _isLuhnAlgo, _isValidObjectKey, _joinExpects, _stringify, any, args, argsAsync, array, arrayAsync, assert, awaitAsync, base64, bic, bigint, blob, boolean, brand, bytes, check, checkAsync, checkItems, checkItemsAsync, config, creditCard, cuid2, custom, customAsync, date, decimal, deleteGlobalConfig, deleteGlobalMessage, deleteSchemaMessage, deleteSpecificMessage, description, digits, email, emoji, empty, endsWith, entries, entriesFromList, entriesFromObjects, enum_ as enum, enum_, everyItem, exactOptional, exactOptionalAsync, excludes, fallback, fallbackAsync, file, filterItems, findItem, finite, flatten, flavor, forward, forwardAsync, function_ as function, function_, getDefault, getDefaults, getDefaultsAsync, getDescription, getDotPath, getFallback, getFallbacks, getFallbacksAsync, getGlobalConfig, getGlobalMessage, getMetadata, getSchemaMessage, getSpecificMessage, getTitle, graphemes, gtValue, hash, hexColor, hexadecimal, imei, includes, instance, integer, intersect, intersectAsync, ip, ipv4, ipv6, is, isOfKind, isOfType, isValiError, isoDate, isoDateTime, isoTime, isoTimeSecond, isoTimestamp, isoWeek, keyof, lazy, lazyAsync, length, literal, looseObject, looseObjectAsync, looseTuple, looseTupleAsync, ltValue, mac, mac48, mac64, map, mapAsync, mapItems, maxBytes, maxEntries, maxGraphemes, maxLength, maxSize, maxValue, maxWords, message, metadata, mimeType, minBytes, minEntries, minGraphemes, minLength, minSize, minValue, minWords, multipleOf, nan, nanoid, never, nonEmpty, nonNullable, nonNullableAsync, nonNullish, nonNullishAsync, nonOptional, nonOptionalAsync, normalize, notBytes, notEntries, notGraphemes, notLength, notSize, notValue, notValues, notWords, null_ as null, null_, nullable, nullableAsync, nullish, nullishAsync, number, object, objectAsync, objectWithRest, objectWithRestAsync, octal, omit, optional, optionalAsync, parse, parseAsync, parseJson, parser, parserAsync, partial, partialAsync, partialCheck, partialCheckAsync, pick, picklist, pipe, pipeAsync, promise, rawCheck, rawCheckAsync, rawTransform, rawTransformAsync, readonly, record, recordAsync, reduceItems, regex, required, requiredAsync, returns, returnsAsync, rfcEmail, safeInteger, safeParse, safeParseAsync, safeParser, safeParserAsync, set, setAsync, setGlobalConfig, setGlobalMessage, setSchemaMessage, setSpecificMessage, size, slug, someItem, sortItems, startsWith, strictObject, strictObjectAsync, strictTuple, strictTupleAsync, string, stringifyJson, summarize, symbol, title, toLowerCase, toMaxValue, toMinValue, toUpperCase, transform, transformAsync, trim, trimEnd, trimStart, tuple, tupleAsync, tupleWithRest, tupleWithRestAsync, ulid, undefined_ as undefined, undefined_, undefinedable, undefinedableAsync, union, unionAsync, unknown, unwrap, url, uuid, value, values, variant, variantAsync, void_ as void, void_, words };
