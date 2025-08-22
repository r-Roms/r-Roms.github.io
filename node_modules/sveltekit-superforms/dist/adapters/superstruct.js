import { createAdapter, createJsonSchema } from './adapters.js';
import { memoize } from '../memoize.js';
async function validate(schema, data) {
    const result = schema.validate(data, { coerce: true });
    if (!result[0]) {
        return {
            data: result[1],
            success: true
        };
    }
    const errors = result[0];
    return {
        success: false,
        issues: errors.failures().map((error) => ({
            message: error.message,
            path: error.path
        }))
    };
}
function _superstruct(schema, options) {
    return createAdapter({
        superFormValidationLibrary: 'superstruct',
        defaults: options.defaults,
        jsonSchema: createJsonSchema(options),
        validate: async (data) => validate(schema, data)
    });
}
function _superstructClient(schema) {
    return {
        superFormValidationLibrary: 'superstruct',
        validate: async (data) => validate(schema, data)
    };
}
export const superstruct = /* @__PURE__ */ memoize(_superstruct);
export const superstructClient = /* @__PURE__ */ memoize(_superstructClient);
