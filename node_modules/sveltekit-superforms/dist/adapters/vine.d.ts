import { type ValidationAdapter, type ClientValidationAdapter, type RequiredDefaultsOptions, type Infer, type InferIn } from './adapters.js';
import type { SchemaTypes } from '@vinejs/vine/types';
export declare const vine: <T extends SchemaTypes>(schema: T, options: RequiredDefaultsOptions<Infer<T, "vine">>) => ValidationAdapter<Infer<T, "vine">, InferIn<T, "vine">>;
export declare const vineClient: <T extends SchemaTypes>(schema: T) => ClientValidationAdapter<Infer<T, "vine">, InferIn<T, "vine">>;
