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
  jsonSchemaMetadata: () => jsonSchemaMetadata,
  toJSONSchema: () => toJSONSchema,
  withJSONSchemaFeatures: () => withJSONSchemaFeatures
});
module.exports = __toCommonJS(src_exports);

// src/extension/withJSONSchemaFeatures.ts
var JSON_SCHEMA_FEATURES_KEY = "__json_schema_features";
function withJSONSchemaFeatures(schema, features) {
  return Object.assign(schema, { [JSON_SCHEMA_FEATURES_KEY]: features });
}
function getJSONSchemaFeatures(schema) {
  return schema[JSON_SCHEMA_FEATURES_KEY];
}

// src/extension/assignExtraJSONSchemaFeatures.ts
function assignExtraJSONSchemaFeatures(schema, converted) {
  const jsonSchemaFeatures = getJSONSchemaFeatures(schema);
  if (jsonSchemaFeatures) {
    Object.assign(converted, jsonSchemaFeatures);
  }
}

// src/utils/assert.ts
function assert(value, predicate, message) {
  if (!predicate(value)) throw new Error(message.replace("%", String(value)));
  return value;
}

// src/utils/json-schema.ts
var $schema = "http://json-schema.org/draft-07/schema#";
function isJSONLiteral(value) {
  return typeof value === "number" && !Number.isNaN(value) || typeof value === "string" || typeof value === "boolean" || value === null;
}
var assertJSONLiteral = (v) => assert(v, isJSONLiteral, "Unsupported literal value type: %");

// src/toJSONSchema/schemas.ts
var import_valibot = require("valibot");

// src/utils/isEqual.ts
function isEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (typeof obj1 === "object" && typeof obj2 === "object") {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    return keys1.every((key1) => isEqual(obj1[key1], obj2[key1]));
  }
  return false;
}

// src/utils/valibot.ts
function isSchemaType(type) {
  return (schema) => {
    return !!schema && schema.type === type;
  };
}
var isNullishSchema = isSchemaType("nullish");
var isOptionalSchema = isSchemaType("optional");
var isStringSchema = isSchemaType("string");
var isNeverSchema = isSchemaType("never");

// src/toJSONSchema/toDefinitionURI.ts
var toDefinitionURI = (name) => `#/definitions/${name}`;

// src/toJSONSchema/schemas.ts
var SCHEMA_CONVERTERS = {
  any: () => ({}),
  // Core types
  null: () => ({ const: null }),
  literal: ({ literal }) => ({ const: assertJSONLiteral(literal) }),
  number: () => ({ type: "number" }),
  string: () => ({ type: "string" }),
  boolean: () => ({ type: "boolean" }),
  // Compositions
  optional: (schema, convert) => {
    const output = convert(schema.wrapped);
    const defaultValue = (0, import_valibot.getDefault)(schema);
    if (defaultValue !== void 0) output.default = defaultValue;
    return output;
  },
  nullish: (schema, convert) => {
    const output = { anyOf: [{ const: null }, convert(schema.wrapped)] };
    const defaultValue = (0, import_valibot.getDefault)(schema);
    if (defaultValue !== void 0) output.default = defaultValue;
    return output;
  },
  nullable: (schema, convert) => {
    const output = { anyOf: [{ const: null }, convert(schema.wrapped)] };
    const defaultValue = (0, import_valibot.getDefault)(schema);
    if (defaultValue !== void 0) output.default = defaultValue;
    return output;
  },
  picklist: ({ options }) => ({ enum: options.map(assertJSONLiteral) }),
  enum: (options) => ({ enum: Object.values(options.enum).map(assertJSONLiteral) }),
  union: ({ options }, convert) => ({ anyOf: options.map(convert) }),
  intersect: ({ options }, convert) => ({ allOf: options.map(convert) }),
  // Complex types
  array: ({ item }, convert) => ({ type: "array", items: convert(item) }),
  tuple_with_rest({ items: originalItems, rest }, convert) {
    const minItems = originalItems.length;
    let maxItems;
    let items = originalItems.map(convert);
    let additionalItems;
    if (isNeverSchema(rest)) {
      maxItems = minItems;
    } else if (rest) {
      const restItems = convert(rest);
      if (items.length === 1 && isEqual(items[0], restItems)) {
        items = items[0];
      } else {
        additionalItems = restItems;
      }
    }
    return {
      type: "array",
      items,
      ...additionalItems && { additionalItems },
      ...minItems && { minItems },
      ...maxItems && { maxItems }
    };
  },
  strict_tuple({ items: originalItems }, convert) {
    const items = originalItems.map(convert);
    return { type: "array", items, minItems: items.length, maxItems: items.length };
  },
  tuple({ items: originalItems }, convert, context) {
    const items = originalItems.map(convert);
    return { type: "array", items, minItems: items.length };
  },
  object_with_rest({ entries, rest }, convert, context) {
    const properties = {};
    const required = [];
    for (const [propKey, propValue] of Object.entries(entries)) {
      const propSchema = propValue;
      if (!isOptionalSchema(propSchema) && !isNullishSchema(propSchema)) {
        required.push(propKey);
      }
      properties[propKey] = convert(propSchema);
      assignExtraJSONSchemaFeatures(propValue, properties[propKey]);
    }
    let additionalProperties;
    if (rest) {
      additionalProperties = isNeverSchema(rest) ? false : convert(rest);
    } else if (context.strictObjectTypes) {
      additionalProperties = false;
    }
    const output = { type: "object", properties };
    if (additionalProperties !== void 0) output.additionalProperties = additionalProperties;
    if (required.length) output.required = required;
    return output;
  },
  object(schema, convert, context) {
    return SCHEMA_CONVERTERS.object_with_rest(schema, convert, context);
  },
  strict_object(schema, convert, context) {
    const object = SCHEMA_CONVERTERS.object_with_rest(schema, convert, context);
    return { ...object, additionalProperties: false };
  },
  record({ key, value }, convert) {
    assert(key, isStringSchema, "Unsupported record key type: %");
    return { type: "object", additionalProperties: convert(value) };
  },
  lazy(schema, _, context) {
    const nested = schema.getter({});
    const defName = context.defNameMap.get(nested);
    if (!defName) {
      throw new Error("Type inside lazy schema must be provided in the definitions");
    }
    return { $ref: toDefinitionURI(defName) };
  },
  date(_, __, context) {
    if (!context.dateStrategy) {
      throw new Error('The "dateStrategy" option must be set to handle date validators');
    }
    switch (context.dateStrategy) {
      case "integer":
        return { type: "integer", format: "unix-time" };
      case "string":
        return { type: "string", format: "date-time" };
    }
  },
  undefined(_, __, context) {
    if (!context.undefinedStrategy) {
      throw new Error('The "undefinedStrategy" option must be set to handle the `undefined` schema');
    }
    switch (context.undefinedStrategy) {
      case "any":
        return {};
      case "null":
        return { type: "null" };
    }
  },
  bigint(_, __, context) {
    if (!context.bigintStrategy) {
      throw new Error('The "bigintStrategy" option must be set to handle `bigint` validators');
    }
    switch (context.bigintStrategy) {
      case "integer":
        return { type: "integer", format: "int64" };
      case "string":
        return { type: "string" };
    }
  },
  variant({ options }, ...args) {
    return SCHEMA_CONVERTERS.union({ options }, ...args);
  }
};

// src/toJSONSchema/actions/metadata.ts
var METADATA_BY_TYPE = {
  description: ({ description }) => ({ description }),
  "@gcornut/to-json-schema/json_schema_metadata": ({ metadata }) => metadata
};

// src/toJSONSchema/actions/validations.ts
function asDateRequirement(type, requirement, context) {
  assert(requirement, () => context.dateStrategy === "integer", `${type} validation is only available with 'integer' date strategy`);
  assert(requirement, (r) => r instanceof Date, `Non-date value used for ${type} validation`);
  return requirement.getTime();
}
var VALIDATION_BY_SCHEMA = {
  array: {
    length: ({ requirement }) => ({ minItems: requirement, maxItems: requirement }),
    min_length: ({ requirement }) => ({ minItems: requirement }),
    max_length: ({ requirement }) => ({ maxItems: requirement })
  },
  string: {
    value: ({ requirement }) => ({ const: requirement }),
    length: ({ requirement }) => ({ minLength: requirement, maxLength: requirement }),
    min_length: ({ requirement }) => ({ minLength: requirement }),
    max_length: ({ requirement }) => ({ maxLength: requirement }),
    // TODO: validate RegExp features are compatible with json schema ?
    regex: ({ requirement }) => ({ pattern: requirement.source }),
    email: () => ({ format: "email" }),
    iso_date: () => ({ format: "date" }),
    iso_timestamp: () => ({ format: "date-time" }),
    ipv4: () => ({ format: "ipv4" }),
    ipv6: () => ({ format: "ipv6" }),
    uuid: () => ({ format: "uuid" })
  },
  number: {
    value: ({ requirement }) => ({ const: requirement }),
    min_value: ({ requirement }) => ({ minimum: requirement }),
    max_value: ({ requirement }) => ({ maximum: requirement }),
    multiple_of: ({ requirement }) => ({ multipleOf: requirement }),
    integer: () => ({ type: "integer" })
  },
  boolean: {
    value: ({ requirement }) => ({ const: requirement })
  },
  date: {
    value: ({ requirement }, context) => ({ const: asDateRequirement("value", requirement, context) }),
    min_value: ({ requirement }, context) => ({ minimum: asDateRequirement("minValue", requirement, context) }),
    max_value: ({ requirement }, context) => ({ maximum: asDateRequirement("maxValue", requirement, context) })
  }
};

// src/toJSONSchema/actions/convertPipe.ts
function convertPipe(schemaType, pipe, context) {
  const [schema, ...pipeItems] = pipe || [];
  if (!schema) return {};
  const childPipe = convertPipe(schemaType, schema == null ? void 0 : schema.pipe, context);
  function convertPipeItem(def, validation) {
    var _a, _b, _c;
    const validationType = validation.type;
    const validationConverter = ((_b = (_a = context.customValidationConversion) == null ? void 0 : _a[schemaType]) == null ? void 0 : _b[validationType]) || ((_c = VALIDATION_BY_SCHEMA[schemaType]) == null ? void 0 : _c[validationType]) || METADATA_BY_TYPE[validationType];
    if (!validationConverter && context.ignoreUnknownValidation) return {};
    assert(validationConverter, Boolean, `Unsupported valibot validation \`${validationType}\` for schema \`${schemaType}\``);
    const converted = validationConverter(validation, context);
    return Object.assign(def, converted);
  }
  return pipeItems.reduce(convertPipeItem, childPipe);
}

// src/toJSONSchema/index.ts
function getDefNameMap(definitions = {}) {
  const map = /* @__PURE__ */ new Map();
  for (const [name, definition] of Object.entries(definitions)) {
    map.set(definition, name);
  }
  return map;
}
function createConverter(context) {
  const definitions = {};
  function converter(schema) {
    var _a;
    const defName = context.defNameMap.get(schema);
    const defURI = defName && toDefinitionURI(defName);
    if (defURI && defURI in definitions) {
      return { $ref: defURI };
    }
    const schemaConverter = ((_a = context.customSchemaConversion) == null ? void 0 : _a[schema.type]) || SCHEMA_CONVERTERS[schema.type];
    assert(schemaConverter, Boolean, `Unsupported valibot schema: ${(schema == null ? void 0 : schema.type) || schema}`);
    let converted = schemaConverter(schema, converter, context) || {};
    const convertedValidation = convertPipe(schema.type, schema.pipe, context);
    converted = { ...converted, ...convertedValidation };
    assignExtraJSONSchemaFeatures(schema, converted);
    if (defURI) {
      definitions[defName] = converted;
      return { $ref: defURI };
    }
    return converted;
  }
  return { definitions, converter };
}
function toJSONSchema(options) {
  const { schema, definitions: inputDefinitions, ...more } = options;
  const defNameMap = getDefNameMap(inputDefinitions);
  const { definitions, converter } = createConverter({ defNameMap, ...more });
  if (!schema && !inputDefinitions) {
    throw new Error("No main schema or definitions provided.");
  }
  if (inputDefinitions) {
    Object.values(inputDefinitions).forEach(converter);
  }
  const mainConverted = schema && converter(schema);
  const mainDefName = schema && defNameMap.get(schema);
  const out = { $schema };
  if (mainDefName) {
    out.$ref = toDefinitionURI(mainDefName);
  } else {
    Object.assign(out, mainConverted);
  }
  if (Object.keys(definitions).length) {
    out.definitions = definitions;
  }
  return out;
}

// src/extension/jsonSchemaMetadata.ts
function jsonSchemaMetadata(metadata) {
  return {
    kind: "metadata",
    type: "@gcornut/to-json-schema/json_schema_metadata",
    reference: jsonSchemaMetadata,
    metadata
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  jsonSchemaMetadata,
  toJSONSchema,
  withJSONSchemaFeatures
});
