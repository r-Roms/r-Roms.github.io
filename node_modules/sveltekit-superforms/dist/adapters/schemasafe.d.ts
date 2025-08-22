import { type AdapterOptions, type ClientValidationAdapter, type ValidationAdapter } from './adapters.js';
import type { ValidatorOptions } from '@exodus/schemasafe';
import type { FromSchema, JSONSchema } from 'json-schema-to-ts';
export declare const schemasafe: <T extends JSONSchema | Record<string, unknown>, Data = unknown extends FromSchema<T> ? Record<string, unknown> : FromSchema<T>, Out = [Data] extends [never] ? Record<string, unknown> : Data>(schema: T, options?: (AdapterOptions<Out> & {
    descriptionAsErrors?: boolean;
    config?: ValidatorOptions;
}) | undefined) => ValidationAdapter<Out>;
export declare const schemasafeClient: <T extends JSONSchema | Record<string, unknown>, Data = unknown extends FromSchema<T> ? Record<string, unknown> : FromSchema<T>, Out = [Data] extends [never] ? Record<string, unknown> : Data>(schema: T, options?: (AdapterOptions<Out> & {
    config?: ValidatorOptions;
}) | undefined) => ClientValidationAdapter<Out>;
