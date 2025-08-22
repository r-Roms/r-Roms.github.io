import { createAdapter } from './adapters.js';
import { safeParseAsync } from 'valibot';
import { memoize } from '../memoize.js';
import { toJSONSchema as valibotToJSON } from '@gcornut/valibot-json-schema';
const defaultOptions = {
    strictObjectTypes: true,
    dateStrategy: 'integer',
    bigintStrategy: 'integer',
    ignoreUnknownValidation: true,
    customSchemaConversion: {
        custom: () => ({}),
        instance: () => ({}),
        file: () => ({}),
        blob: () => ({})
    }
};
/* @__NO_SIDE_EFFECTS__ */
export const valibotToJSONSchema = (options) => {
    return valibotToJSON({ ...defaultOptions, ...options });
};
async function _validate(schema, data, config) {
    const result = await safeParseAsync(schema, data, config);
    if (result.success) {
        return {
            data: result.output,
            success: true
        };
    }
    return {
        issues: result.issues.map(({ message, path }) => ({
            message,
            path: path?.map(({ key }) => key)
        })),
        success: false
    };
}
function _valibot(schema, options = {}) {
    return createAdapter({
        superFormValidationLibrary: 'valibot',
        validate: async (data) => _validate(schema, data, options?.config),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jsonSchema: options?.jsonSchema ?? valibotToJSONSchema({ schema: schema, ...options }),
        defaults: 'defaults' in options ? options.defaults : undefined
    });
}
function _valibotClient(schema, options = {}) {
    return {
        superFormValidationLibrary: 'valibot',
        validate: async (data) => _validate(schema, data, options?.config)
    };
}
export const valibot = /* @__PURE__ */ memoize(_valibot);
export const valibotClient = /* @__PURE__ */ memoize(_valibotClient);
