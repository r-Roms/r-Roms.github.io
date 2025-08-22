"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  assert: () => assert,
  validate: () => validate,
  validationAdapter: () => validationAdapter,
  wrap: () => wrap
});
module.exports = __toCommonJS(src_exports);
var import_core2 = require("@typeschema/core");

// src/validation.ts
var import_core = require("@typeschema/core");
var importValidationModule = (0, import_core.memoize)(async () => {
  try {
    var dynamicallyImportedModule = await import(
      /* webpackIgnore: true */
      "class-validator"
    );
  } catch (moduleImportError) {
    throw moduleImportError;
  }
  const { validate: validate2 } = dynamicallyImportedModule;
  return { validate: validate2 };
});
function getIssues(error, parentPath) {
  const path = [
    ...parentPath,
    Number.isInteger(+error.property) ? +error.property : error.property
  ];
  return Object.values(error.constraints ?? {}).map((message) => ({ message, path })).concat(
    error.children?.flatMap((childError) => getIssues(childError, path)) ?? []
  );
}
var validationAdapter = async (schema) => {
  const { validate: validate2 } = await importValidationModule();
  return async (data) => {
    const errors = await validate2(Object.assign(new schema(), data));
    if (errors.length === 0) {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data,
        success: true
      };
    }
    return {
      issues: errors.flatMap((error) => getIssues(error, [])),
      success: false
    };
  };
};

// src/index.ts
var validate = (0, import_core2.createValidate)(validationAdapter);
var assert = (0, import_core2.createAssert)(validate);
var wrap = (0, import_core2.createWrap)(assert, validate);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assert,
  validate,
  validationAdapter,
  wrap
});
