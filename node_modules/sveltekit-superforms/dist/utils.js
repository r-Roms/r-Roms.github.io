import { clone as justClone } from './justClone.js';
import { SchemaError } from './errors.js';
export function clone(data) {
    return data && typeof data === 'object' ? justClone(data) : data;
}
export function assertSchema(schema, path) {
    if (typeof schema === 'boolean') {
        throw new SchemaError('Schema property cannot be defined as boolean.', path);
    }
}
/**
 * Casts a Svelte store of a Record<string, unknown> type to a merged type of its unions.
 * @param store A Svelte store of a Record<string, unknown> type
 * @returns The same store but casted to a merged type of its unions.
 */
export function mergeFormUnion(store) {
    return store;
}
