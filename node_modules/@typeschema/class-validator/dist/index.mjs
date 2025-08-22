// src/index.ts
import {
  createAssert,
  createValidate,
  createWrap
} from "@typeschema/core";

// src/validation.ts
import { memoize } from "@typeschema/core";
var importValidationModule = memoize(async () => {
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
var validate = createValidate(validationAdapter);
var assert = createAssert(validate);
var wrap = createWrap(assert, validate);
export {
  assert,
  validate,
  validationAdapter,
  wrap
};
