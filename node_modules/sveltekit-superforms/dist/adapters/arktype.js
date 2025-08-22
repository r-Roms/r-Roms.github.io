import { defaultValues } from '../jsonSchema/schemaDefaults.js';
import { memoize } from '../memoize.js';
import { createAdapter } from './adapters.js';
async function modules() {
    const { type } = await import(/* webpackIgnore: true */ 'arktype');
    return { type };
}
const fetchModule = /* @__PURE__ */ memoize(modules);
const defaultJSONSchemaOptions = {
    fallback: {
        default: (ctx) => {
            if ('domain' in ctx && ctx.domain === 'bigint') {
                return {
                    ...ctx.base,
                    type: 'string',
                    format: 'bigint'
                };
            }
            return ctx.base;
        },
        date: (ctx) => ({
            ...ctx.base,
            type: 'string',
            format: 'date-time',
            description: ctx.after ? `after ${ctx.after}` : 'anytime'
        })
    }
};
/* @__NO_SIDE_EFFECTS__ */
export const arktypeToJSONSchema = (schema, options) => {
    return schema.toJsonSchema({ ...defaultJSONSchemaOptions, ...options });
};
/**
 * Creates defaults for ArkType schemas by filtering out undefined values.
 *
 * ArkType with exactOptionalPropertyTypes requires optional properties to be
 * omitted rather than set to undefined.
 *
 * @param jsonSchema - JSON schema to generate defaults from
 * @returns Default values object without undefined properties
 */
function createArktypeDefaults(jsonSchema) {
    return Object.fromEntries(Object.entries(defaultValues(jsonSchema)).filter(([, value]) => value !== undefined));
}
async function _validate(schema, data) {
    const { type } = await fetchModule();
    const result = schema(data);
    if (!(result instanceof type.errors)) {
        return {
            data: result,
            success: true
        };
    }
    const issues = [];
    for (const error of result) {
        issues.push({ message: error.problem, path: Array.from(error.path) });
    }
    return {
        issues,
        success: false
    };
}
function _arktype(schema, options) {
    const jsonSchema = options?.jsonSchema ?? arktypeToJSONSchema(schema, options?.config);
    return createAdapter({
        superFormValidationLibrary: 'arktype',
        defaults: options?.defaults ?? createArktypeDefaults(jsonSchema),
        jsonSchema,
        validate: async (data) => _validate(schema, data)
    });
}
function _arktypeClient(schema) {
    return {
        superFormValidationLibrary: 'arktype',
        validate: async (data) => _validate(schema, data)
    };
}
export const arktype = /* @__PURE__ */ memoize(_arktype);
export const arktypeClient = /* @__PURE__ */ memoize(_arktypeClient);
