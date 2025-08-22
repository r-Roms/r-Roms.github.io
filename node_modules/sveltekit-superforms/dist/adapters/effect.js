import { Schema, JSONSchema, Either } from 'effect';
import { ArrayFormatter } from 'effect/ParseResult';
import { createAdapter } from './adapters.js';
import { memoize } from '../memoize.js';
export const effectToJSONSchema = (schema) => {
    // effect's json schema type is slightly different so we have to cast it
    return JSONSchema.make(schema);
};
async function validate(schema, data, options) {
    const result = Schema.decodeUnknownEither(schema, { errors: 'all' })(data, options?.parseOptions);
    if (Either.isRight(result)) {
        return {
            data: result.right,
            success: true
        };
    }
    return {
        // get rid of the _tag property
        issues: ArrayFormatter.formatErrorSync(result.left).map(({ message, path }) => ({
            message,
            path: [...path] // path is readonly array so we have to copy it
        })),
        success: false
    };
}
function _effect(schema, options) {
    return createAdapter({
        superFormValidationLibrary: 'effect',
        validate: async (data) => validate(schema, data, options),
        jsonSchema: options?.jsonSchema ?? effectToJSONSchema(schema),
        defaults: options?.defaults
    });
}
function _effectClient(schema, options) {
    return {
        superFormValidationLibrary: 'effect',
        validate: async (data) => validate(schema, data, options)
    };
}
export const effect = /* @__PURE__ */ memoize(_effect);
export const effectClient = /* @__PURE__ */ memoize(_effectClient);
