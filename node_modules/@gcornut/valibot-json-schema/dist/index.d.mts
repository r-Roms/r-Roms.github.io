import { JSONSchema7 } from 'json-schema';
import { AnySchema, LiteralSchema, NullSchema, NumberSchema, BigintSchema, StringSchema, BooleanSchema, NullableSchema, StrictObjectSchema, ObjectSchema, ObjectWithRestSchema, RecordSchema, ArraySchema, TupleSchema, StrictTupleSchema, TupleWithRestSchema, IntersectSchema, UnionSchema, VariantSchema, PicklistSchema, EnumSchema, LazySchema, DateSchema, NullishSchema, OptionalSchema, UndefinedSchema, SchemaWithPipe, PipeItem, GenericIssue, GenericSchema, GenericSchemaAsync, GenericValidation, BaseMetadata } from 'valibot';

/** Get types of the values of a record. */
type ValueOf<T extends Record<any, any>> = T[keyof T];

type NonPipeSchemas = AnySchema | LiteralSchema<any, any> | NullSchema<any> | NumberSchema<any> | BigintSchema<any> | StringSchema<any> | BooleanSchema<any> | NullableSchema<any, any> | StrictObjectSchema<any, any> | ObjectSchema<any, any> | ObjectWithRestSchema<any, any, any> | RecordSchema<any, any, any> | ArraySchema<any, any> | TupleSchema<any, any> | StrictTupleSchema<any, any> | TupleWithRestSchema<readonly any[], any, any> | IntersectSchema<any, any> | UnionSchema<any, any> | VariantSchema<any, any, any> | PicklistSchema<any, any> | EnumSchema<any, any> | LazySchema<any> | DateSchema<any> | NullishSchema<any, any> | OptionalSchema<any, any> | UndefinedSchema<any>;
type PipeSchema = SchemaWithPipe<[NonPipeSchemas, ...PipeItem<any, any, GenericIssue<any>>[]]>;
type SupportedSchemas = NonPipeSchemas | PipeSchema;

declare const DateStrategy: {
    readonly string: "string";
    readonly integer: "integer";
};
type DateStrategy = ValueOf<typeof DateStrategy>;
declare const UndefinedStrategy: {
    readonly any: "any";
    readonly null: "null";
};
type UndefinedStrategy = ValueOf<typeof UndefinedStrategy>;
declare const BigIntStrategy: {
    readonly string: "string";
    readonly integer: "integer";
};
type BigIntStrategy = ValueOf<typeof BigIntStrategy>;
interface ToJSONSchemaOptions {
    /**
     * Main schema (referenced at the root of the JSON schema).
     */
    schema?: GenericSchema | GenericSchemaAsync;
    /**
     * Additional schemas (referenced in the JSON schema `definitions`).
     */
    definitions?: Record<string, SupportedSchemas>;
    /**
     * Make all object type strict (`additionalProperties: false`).
     */
    strictObjectTypes?: boolean;
    /**
     * Date output:
     * - 'integer' sets the type to 'integer' and format to 'unix-time'.
     * - 'string' sets the type to 'string' and format to 'date-time'.
     */
    dateStrategy?: DateStrategy;
    /**
     * Undefined output:
     * - 'any' output an empty schema (the "any" schema)
     * - 'null' sets the type to 'null'
     */
    undefinedStrategy?: UndefinedStrategy;
    /**
     * How bigint schema should be converted:
     * - 'integer': uses integer type with format 'int64' (see https://ajv.js.org/packages/ajv-formats.html#formats)
     * - 'string': uses string type
     */
    bigintStrategy?: BigIntStrategy;
    /**
     * If true, do not throw an error on validations that cannot be
     * converted to JSON schema, like `custom`.
     */
    ignoreUnknownValidation?: boolean;
    /**
     * Customize how valibot schemas of the given type are converted to JSON schema.
     *
     * @example
     *   // Make valibot `instance()` schema convert to the "any" JSON schema (no validation)
     *   { customSchemaConversion: { instance: () => ({}) }  }
     */
    customSchemaConversion?: {
        [schemaType: string]: SchemaConverter<GenericSchema>;
    };
    /**
     * Customize how valibot validations of the given type are converted to JSON schema.
     *
     * @example
     *   // Make valibot `custom()` validation in object schema convert to the "any" JSON schema (no validation)
     *   { customValidationConversion: { object: { custom: () => ({}) }  } }
     */
    customValidationConversion?: {
        [schemaType: string]: {
            [validationType: string]: ValidationConverter<GenericValidation>;
        };
    };
}
interface Context extends Omit<ToJSONSchemaOptions, 'schema' | 'definitions'> {
    /**
     * Mapping from schema to name
     */
    defNameMap: DefinitionNameMap;
}
type DefinitionNameMap = Map<SupportedSchemas, string>;
type BaseConverter = (schema: SupportedSchemas) => JSONSchema7;
type SchemaConverter<S extends GenericSchema> = (schema: S, convert: BaseConverter, context: Context) => JSONSchema7;
type ValidationConverter<V extends PipeItem<any, any, any>> = (validation: V, context: Context) => JSONSchema7;

/**
 * Convert Valibot schemas to JSON schema.
 */
declare function toJSONSchema(options: ToJSONSchemaOptions): JSONSchema7;

declare const JSON_SCHEMA_FEATURES_KEY = "__json_schema_features";
type JSONSchemaFeatures = Partial<JSONSchema7>;
interface WithJSONSchemaFeatures {
    [JSON_SCHEMA_FEATURES_KEY]: JSONSchemaFeatures;
}
/** @deprecated use jsonSchemaMetadata() instead */
declare function withJSONSchemaFeatures<S extends GenericSchema>(schema: S, features: JSONSchemaFeatures): S & WithJSONSchemaFeatures;

interface JsonSchemaMetadataAction extends BaseMetadata<any> {
    type: '@gcornut/to-json-schema/json_schema_metadata';
    metadata: JSONSchema7;
}
declare function jsonSchemaMetadata(metadata: JSONSchema7): JsonSchemaMetadataAction;

export { type ToJSONSchemaOptions, jsonSchemaMetadata, toJSONSchema, withJSONSchemaFeatures };
