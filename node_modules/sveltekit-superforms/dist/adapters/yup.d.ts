import { type AdapterOptions, type ValidationAdapter, type Infer, type InferIn, type ClientValidationAdapter } from './adapters.js';
import type { AnySchema, Schema } from 'yup';
export declare function yupToJSONSchema(schema: AnySchema): import("json-schema").JSONSchema7;
export declare const yup: <T extends Schema>(schema: T, options?: AdapterOptions<Infer<T, "yup">> | undefined) => ValidationAdapter<Infer<T, "yup">, InferIn<T, "yup">>;
export declare const yupClient: <T extends Schema>(schema: T) => ClientValidationAdapter<Infer<T, "yup">, InferIn<T, "yup">>;
