import {
  Compiler
} from "./chunk-K5F7IOJS.js";

// src/refs_builder.ts
function refsBuilder() {
  let counter = 0;
  const refs = {};
  return {
    toJSON() {
      return refs;
    },
    /**
     * Track a value inside refs
     */
    track(value) {
      counter++;
      const ref = `ref://${counter}`;
      refs[ref] = value;
      return ref;
    },
    /**
     * Track a validation inside refs
     */
    trackValidation(validation) {
      return this.track(validation);
    },
    /**
     * Track input value parser inside refs
     */
    trackParser(fn) {
      return this.track(fn);
    },
    /**
     * Track output value transformer inside refs
     */
    trackTransformer(fn) {
      return this.track(fn);
    },
    /**
     * Track a conditional inside refs
     */
    trackConditional(fn) {
      return this.track(fn);
    }
  };
}
export {
  Compiler,
  refsBuilder
};
