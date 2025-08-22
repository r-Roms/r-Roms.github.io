import type { type } from 'arktype';
import type { JSONSchema7 } from 'json-schema';
import { type AdapterOptions, type ClientValidationAdapter, type Infer, type ValidationAdapter } from './adapters.js';
type Options = Parameters<type.Any['toJsonSchema']>[0];
export declare const arktypeToJSONSchema: <S extends type.Any>(schema: S, options?: Options) => JSONSchema7;
export declare const arktype: <T extends type.Any>(schema: T, options?: (AdapterOptions<Infer<T, "arktype">> & {
    config?: Options;
}) | undefined) => ValidationAdapter<T["infer"], T["inferIn"]>;
export declare const arktypeClient: <T extends type.Any>(schema: T) => ClientValidationAdapter<T["infer"], T["inferIn"]>;
export {};
