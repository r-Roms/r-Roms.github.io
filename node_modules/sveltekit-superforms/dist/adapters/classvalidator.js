import { createAdapter, createJsonSchema } from './adapters.js';
import { memoize } from '../memoize.js';
async function modules() {
    const { validate } = await import(/* webpackIgnore: true */ '@typeschema/class-validator');
    return { validate };
}
const fetchModule = /* @__PURE__ */ memoize(modules);
async function validate(schema, data) {
    const { validate } = await fetchModule();
    const result = await validate(schema, data);
    if (result.success) {
        return {
            data: result.data,
            success: true
        };
    }
    return {
        issues: result.issues.map(({ message, path }) => ({
            message,
            path
        })),
        success: false
    };
}
function _classvalidator(schema, options) {
    return createAdapter({
        superFormValidationLibrary: 'classvalidator',
        validate: async (data) => validate(schema, data),
        jsonSchema: createJsonSchema(options),
        defaults: options.defaults
    });
}
function _classvalidatorClient(schema) {
    return {
        superFormValidationLibrary: 'classvalidator',
        validate: async (data) => validate(schema, data)
    };
}
export const classvalidator = /* @__PURE__ */ memoize(_classvalidator);
export const classvalidatorClient = /* @__PURE__ */ memoize(_classvalidatorClient);
