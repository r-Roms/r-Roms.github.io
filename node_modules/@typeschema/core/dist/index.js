"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  createAssert: () => createAssert,
  createToJSONSchema: () => createToJSONSchema,
  createValidate: () => createValidate,
  createWrap: () => createWrap,
  memoize: () => memoize,
  memoizeWithKey: () => memoizeWithKey,
  unsupportedAdapter: () => unsupportedAdapter
});
module.exports = __toCommonJS(src_exports);

// src/utils.ts
// @__NO_SIDE_EFFECTS__
function memoize(fn) {
  let cache = void 0;
  const memoizedFn = async () => {
    if (cache === void 0) {
      cache = await fn();
    }
    return cache;
  };
  memoizedFn.clear = () => cache = void 0;
  return memoizedFn;
}
// @__NO_SIDE_EFFECTS__
function memoizeWithKey(fn) {
  const cache = /* @__PURE__ */ new Map();
  const memoizedFn = async (key) => {
    if (!cache.has(key)) {
      cache.set(key, await fn(key));
    }
    return cache.get(key);
  };
  memoizedFn.clear = () => cache.clear();
  return memoizedFn;
}
// @__NO_SIDE_EFFECTS__
function unsupportedAdapter(adapterName) {
  return async () => {
    throw new Error(`This feature is unsupported for ${adapterName}`);
  };
}

// src/serialization.ts
// @__NO_SIDE_EFFECTS__
function createToJSONSchema(serializationAdapter) {
  const memoizedSerializationAdapter = memoizeWithKey(
    (schema) => serializationAdapter(schema)
  );
  return async (schema) => {
    const serializedSchema = await memoizedSerializationAdapter(schema);
    return serializedSchema;
  };
}

// src/validation.ts
// @__NO_SIDE_EFFECTS__
function createValidate(validationAdapter) {
  const memoizedValidationAdapter = memoizeWithKey(
    (schema) => validationAdapter(schema)
  );
  return async (schema, data) => {
    const validateSchema = await memoizedValidationAdapter(schema);
    return validateSchema(data);
  };
}
// @__NO_SIDE_EFFECTS__
function createAssert(validate) {
  return async (schema, data) => {
    const result = await validate(schema, data);
    if (result.success) {
      return result.data;
    }
    throw new AggregateError(result.issues, "Assertion failed");
  };
}

// src/wrap.ts
// @__NO_SIDE_EFFECTS__
function createWrap(assert, validate) {
  return (schema) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _input: void 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _output: void 0,
    assert: (data) => assert(schema, data),
    parse: (data) => assert(schema, data),
    validate: (data) => validate(schema, data)
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAssert,
  createToJSONSchema,
  createValidate,
  createWrap,
  memoize,
  memoizeWithKey,
  unsupportedAdapter
});
