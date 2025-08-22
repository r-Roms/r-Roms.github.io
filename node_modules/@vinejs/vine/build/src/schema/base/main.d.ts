import type { FieldContext, RefsStore } from '@vinejs/compiler/types';
import { ITYPE, OTYPE, COTYPE, PARSE } from '../../symbols.js';
import type { Parser, Validation, RuleBuilder, FieldOptions, CompilerNodes, ParserOptions, ConstructableSchema, ComparisonOperators, ArrayComparisonOperators, NumericComparisonOperators } from '../../types.js';
import Macroable from '@poppinss/macroable';
/**
 * Base schema type with only modifiers applicable on all the schema types.
 */
export declare abstract class BaseModifiersType<Input, Output, CamelCaseOutput> extends Macroable implements ConstructableSchema<Input, Output, CamelCaseOutput> {
    /**
     * Each subtype should implement the compile method that returns
     * one of the known compiler nodes
     */
    abstract [PARSE](propertyName: string, refs: RefsStore, options: ParserOptions): CompilerNodes;
    /**
     * The child class must implement the clone method
     */
    abstract clone(): this;
    /**
     * Define the input type of the schema
     */
    [ITYPE]: Input;
    /**
     * The output value of the field. The property points to a type only
     * and not the real value.
     */
    [OTYPE]: Output;
    [COTYPE]: CamelCaseOutput;
    /**
     * Mark the field under validation as optional. An optional
     * field allows both null and undefined values.
     */
    optional(): OptionalModifier<this>;
    /**
     * Mark the field under validation to be null. The null value will
     * be written to the output as well.
     *
     * If `optional` and `nullable` are used together, then both undefined
     * and null values will be allowed.
     */
    nullable(): NullableModifier<this>;
}
/**
 * Modifies the schema type to allow null values
 */
export declare class NullableModifier<Schema extends BaseModifiersType<any, any, any>> extends BaseModifiersType<Schema[typeof ITYPE] | null, Schema[typeof OTYPE] | null, Schema[typeof COTYPE] | null> {
    #private;
    constructor(parent: Schema);
    /**
     * Creates a fresh instance of the underlying schema type
     * and wraps it inside the nullable modifier
     */
    clone(): this;
    /**
     * Compiles to compiler node
     */
    [PARSE](propertyName: string, refs: RefsStore, options: ParserOptions): CompilerNodes;
}
/**
 * Modifies the schema type to allow undefined values
 */
export declare class OptionalModifier<Schema extends BaseModifiersType<any, any, any>> extends BaseModifiersType<Schema[typeof ITYPE] | undefined | null, Schema[typeof OTYPE] | undefined, Schema[typeof COTYPE] | undefined> {
    #private;
    /**
     * Optional modifier validations list
     */
    validations: Validation<any>[];
    constructor(parent: Schema, validations?: Validation<any>[]);
    /**
     * Shallow clones the validations. Since, there are no API's to mutate
     * the validation options, we can safely copy them by reference.
     */
    protected cloneValidations(): Validation<any>[];
    /**
     * Compiles validations
     */
    protected compileValidations(refs: RefsStore): {
        ruleFnId: `ref://${number}`;
        implicit: boolean;
        isAsync: boolean;
    }[];
    /**
     * Push a validation to the validations chain.
     */
    use(validation: Validation<any> | RuleBuilder): this;
    /**
     * Define a callback to conditionally require a field at
     * runtime.
     *
     * The callback method should return "true" to mark the
     * field as required, or "false" to skip the required
     * validation
     */
    requiredWhen<Operator extends ComparisonOperators>(otherField: string, operator: Operator, expectedValue: Operator extends ArrayComparisonOperators ? (string | number | boolean)[] : Operator extends NumericComparisonOperators ? number : string | number | boolean): this;
    requiredWhen(callback: (field: FieldContext) => boolean): this;
    /**
     * Mark the field under validation as required when all
     * the other fields are present with value other
     * than `undefined` or `null`.
     */
    requiredIfExists(fields: string | string[]): this;
    /**
     * Mark the field under validation as required when any
     * one of the other fields are present with non-nullable
     * value.
     */
    requiredIfAnyExists(fields: string[]): this;
    /**
     * Mark the field under validation as required when all
     * the other fields are missing or their value is
     * `undefined` or `null`.
     */
    requiredIfMissing(fields: string | string[]): this;
    /**
     * Mark the field under validation as required when any
     * one of the other fields are missing.
     */
    requiredIfAnyMissing(fields: string[]): this;
    /**
     * Creates a fresh instance of the underlying schema type
     * and wraps it inside the optional modifier
     */
    clone(): this;
    /**
     * Compiles to compiler node
     */
    [PARSE](propertyName: string, refs: RefsStore, options: ParserOptions): CompilerNodes;
}
/**
 * The BaseSchema class abstracts the repetitive parts of creating
 * a custom schema type.
 */
export declare abstract class BaseType<Input, Output, CamelCaseOutput> extends BaseModifiersType<Input, Output, CamelCaseOutput> {
    /**
     * Field options
     */
    protected options: FieldOptions;
    /**
     * Set of validations to run
     */
    protected validations: Validation<any>[];
    constructor(options?: FieldOptions, validations?: Validation<any>[]);
    /**
     * Shallow clones the validations. Since, there are no API's to mutate
     * the validation options, we can safely copy them by reference.
     */
    protected cloneValidations(): Validation<any>[];
    /**
     * Shallow clones the options
     */
    protected cloneOptions(): FieldOptions;
    /**
     * Compiles validations
     */
    protected compileValidations(refs: RefsStore): {
        ruleFnId: `ref://${number}`;
        implicit: boolean;
        isAsync: boolean;
    }[];
    /**
     * Define a method to parse the input value. The method
     * is invoked before any validation and hence you must
     * perform type-checking to know the value you are
     * working it.
     */
    parse(callback: Parser): this;
    /**
     * Push a validation to the validations chain.
     */
    use(validation: Validation<any> | RuleBuilder): this;
    /**
     * Enable/disable the bail mode. In bail mode, the field validations
     * are stopped after the first error.
     */
    bail(state: boolean): this;
}
