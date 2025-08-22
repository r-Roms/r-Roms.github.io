import { type ValidationAdapter, type Infer, type InferIn, type ClientValidationAdapter } from './adapters.js';
import type { TSchema } from '@sinclair/typebox';
export declare const typebox: <T extends TSchema>(schema: T) => ValidationAdapter<Infer<T, "typebox">, InferIn<T, "typebox">>;
export declare const typeboxClient: <T extends TSchema>(schema: T) => ClientValidationAdapter<Infer<T, "typebox">, InferIn<T, "typebox">>;
