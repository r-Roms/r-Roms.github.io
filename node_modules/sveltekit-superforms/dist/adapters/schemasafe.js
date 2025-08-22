import { memoize } from '../memoize.js';
import { createAdapter } from './adapters.js';
import { pathExists } from '../traversal.js';
async function modules() {
    const { validator } = await import(/* webpackIgnore: true */ '@exodus/schemasafe');
    return { validator };
}
const fetchModule = /* @__PURE__ */ memoize(modules);
/*
 * Adapter specificts:
 * Type inference problem unless this is applied:
 * https://github.com/ThomasAribart/json-schema-to-ts/blob/main/documentation/FAQs/applying-from-schema-on-generics.md
 * Must duplicate validate method, otherwise the above type inference will fail.
 */
const Email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
const defaultOptions = {
    formats: {
        email: (str) => Email.test(str)
    },
    includeErrors: true,
    allErrors: true
};
async function cachedValidator(currentSchema, config) {
    const { validator } = await fetchModule();
    if (!cache.has(currentSchema)) {
        cache.set(currentSchema, validator(currentSchema, {
            ...defaultOptions,
            ...config
        }));
    }
    return cache.get(currentSchema);
}
function _schemasafe(schema, options) {
    return createAdapter({
        superFormValidationLibrary: 'schemasafe',
        jsonSchema: schema,
        defaults: options?.defaults,
        async validate(data) {
            const validator = await cachedValidator(schema, options?.config);
            const isValid = validator(data);
            if (isValid) {
                return {
                    data: data,
                    success: true
                };
            }
            return {
                issues: (validator.errors ?? []).map(({ instanceLocation, keywordLocation }) => ({
                    message: options?.descriptionAsErrors
                        ? errorDescription(schema, keywordLocation)
                        : keywordLocation,
                    path: instanceLocation.split('/').slice(1)
                })),
                success: false
            };
        }
    });
}
function _schemasafeClient(schema, options) {
    return {
        superFormValidationLibrary: 'schemasafe',
        async validate(data) {
            const validator = await cachedValidator(schema, options?.config);
            const isValid = validator(data);
            if (isValid) {
                return {
                    data: data,
                    success: true
                };
            }
            return {
                issues: (validator.errors ?? []).map(({ instanceLocation, keywordLocation }) => ({
                    message: keywordLocation,
                    path: instanceLocation.split('/').slice(1)
                })),
                success: false
            };
        }
    };
}
export const schemasafe = /* @__PURE__ */ memoize(_schemasafe);
export const schemasafeClient = /* @__PURE__ */ memoize(_schemasafeClient);
const cache = new WeakMap();
function errorDescription(schema, keywordLocation) {
    if (!keywordLocation.startsWith('#/'))
        return keywordLocation;
    const searchPath = keywordLocation.slice(2).split('/');
    const path = pathExists(schema, searchPath);
    return path?.parent.description ?? keywordLocation;
}
