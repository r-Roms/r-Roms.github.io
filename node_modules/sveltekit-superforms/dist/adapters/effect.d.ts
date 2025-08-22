import { Schema } from 'effect';
import type { ParseOptions } from 'effect/SchemaAST';
import type { JSONSchema as TJSONSchema } from '../jsonSchema/index.js';
import { type AdapterOptions, type ClientValidationAdapter, type Infer, type InferIn, type ValidationAdapter } from './adapters.js';
export declare const effectToJSONSchema: <A, I>(schema: Schema.Schema<A, I>) => TJSONSchema;
type AnySchema = Schema.Schema<any, any>;
export declare const effect: <T extends AnySchema>(schema: T, options?: (AdapterOptions<Infer<T, "effect">> & {
    parseOptions?: ParseOptions;
}) | undefined) => ValidationAdapter<Infer<T, "effect">, InferIn<T, "effect">>;
export declare const effectClient: <T extends AnySchema>(schema: T, options?: (AdapterOptions<Infer<T, "effect">> & {
    parseOptions?: ParseOptions;
}) | undefined) => ClientValidationAdapter<Infer<T, "effect">, InferIn<T, "effect">>;
export {};
