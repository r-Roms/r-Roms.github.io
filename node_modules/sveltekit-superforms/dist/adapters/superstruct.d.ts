import { type ValidationAdapter, type ClientValidationAdapter, type RequiredDefaultsOptions, type Infer } from './adapters.js';
import type { Struct } from 'superstruct';
type StructObject<T extends Record<string, unknown>> = Struct<T, any>;
export declare const superstruct: <T extends StructObject<Infer<T, "superstruct">>>(schema: T, options: RequiredDefaultsOptions<Infer<T, "superstruct">>) => ValidationAdapter<Infer<T, "superstruct">>;
export declare const superstructClient: <T extends StructObject<Infer<T, "superstruct">>>(schema: T) => ClientValidationAdapter<Infer<T, "superstruct">>;
export {};
