import type { MessagesProviderContact, Refs, RootNode } from '@vinejs/compiler/types';
import { ITYPE, OTYPE } from '../symbols.js';
import { ValidationError } from '../errors/validation_error.js';
import type { Infer, SchemaTypes, MetaDataValidator, ValidationOptions, ErrorReporterContract } from '../types.js';
/**
 * Vine Validator exposes the API to validate data using a pre-compiled
 * schema.
 */
export declare class VineValidator<Schema extends SchemaTypes, MetaData extends undefined | Record<string, any>> {
    #private;
    /**
     * Reference to static types
     */
    [ITYPE]: Schema[typeof ITYPE];
    [OTYPE]: Schema[typeof OTYPE];
    /**
     * Messages provider to use on the validator
     */
    messagesProvider: MessagesProviderContact;
    /**
     * Error reporter to use on the validator
     */
    errorReporter: () => ErrorReporterContract;
    /**
     * Validate data against a schema. Optionally, you can share metaData with
     * the validator
     *
     * ```ts
     * await validator.validate(data)
     * await validator.validate(data, { meta: {} })
     *
     * await validator.validate(data, {
     *   meta: { userId: auth.user.id },
     *   errorReporter,
     *   messagesProvider
     * })
     * ```
     */
    validate: (data: any, ...[options]: [undefined] extends MetaData ? [options?: ValidationOptions<MetaData> | undefined] : [options: ValidationOptions<MetaData>]) => Promise<Infer<Schema>>;
    constructor(schema: Schema, options: {
        convertEmptyStringsToNull: boolean;
        metaDataValidator?: MetaDataValidator;
        messagesProvider: MessagesProviderContact;
        errorReporter: () => ErrorReporterContract;
    });
    /**
     * Performs validation without throwing the validation
     * exception. Instead, the validation errors are
     * returned as the first argument.
     *
     *
     * ```ts
     * await validator.tryValidate(data)
     * await validator.tryValidate(data, { meta: {} })
     *
     * await validator.tryValidate(data, {
     *   meta: { userId: auth.user.id },
     *   errorReporter,
     *   messagesProvider
     * })
     * ```
     *
     */
    tryValidate(data: any, ...[options]: [undefined] extends MetaData ? [options?: ValidationOptions<MetaData> | undefined] : [options: ValidationOptions<MetaData>]): Promise<[ValidationError, null] | [null, Infer<Schema>]>;
    /**
     * Returns the compiled schema and refs.
     */
    toJSON(): {
        schema: RootNode;
        refs: Refs;
    };
}
