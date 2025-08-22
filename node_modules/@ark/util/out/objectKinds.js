import { domainOf } from "./domain.js";
import { isKeyOf } from "./records.js";
// ECMAScript Objects
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
export const ecmascriptConstructors = {
    Array,
    Boolean,
    Date,
    Error,
    Function,
    Map,
    Number,
    Promise,
    RegExp,
    Set,
    String,
    WeakMap,
    WeakSet
};
/** Node18 */
export const FileConstructor = globalThis.File ?? Blob;
// Platform APIs
// See https://developer.mozilla.org/en-US/docs/Web/API
// Must be implemented in Node etc. as well as the browser to include here
export const platformConstructors = {
    ArrayBuffer,
    Blob,
    File: FileConstructor,
    FormData,
    Headers,
    Request,
    Response,
    URL
};
export const typedArrayConstructors = {
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    BigInt64Array,
    BigUint64Array
};
// Built-in object constructors based on a subset of:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
export const builtinConstructors = {
    ...ecmascriptConstructors,
    ...platformConstructors,
    ...typedArrayConstructors,
    String,
    Number,
    Boolean
};
export const objectKindOf = (data) => {
    let prototype = Object.getPrototypeOf(data);
    while (prototype?.constructor &&
        (!isKeyOf(prototype.constructor.name, builtinConstructors) ||
            !(data instanceof builtinConstructors[prototype.constructor.name])))
        prototype = Object.getPrototypeOf(prototype);
    const name = prototype?.constructor?.name;
    if (name === undefined || name === "Object")
        return undefined;
    return name;
};
export const objectKindOrDomainOf = (data) => (typeof data === "object" && data !== null ?
    (objectKindOf(data) ?? "object")
    : domainOf(data));
export const hasObjectKind = (data, kind) => objectKindOf(data) === kind;
export const isArray = Array.isArray;
export const ecmascriptDescriptions = {
    Array: "an array",
    Function: "a function",
    Date: "a Date",
    RegExp: "a RegExp",
    Error: "an Error",
    Map: "a Map",
    Set: "a Set",
    String: "a String object",
    Number: "a Number object",
    Boolean: "a Boolean object",
    Promise: "a Promise",
    WeakMap: "a WeakMap",
    WeakSet: "a WeakSet"
};
export const platformDescriptions = {
    ArrayBuffer: "an ArrayBuffer instance",
    Blob: "a Blob instance",
    File: "a File instance",
    FormData: "a FormData instance",
    Headers: "a Headers instance",
    Request: "a Request instance",
    Response: "a Response instance",
    URL: "a URL instance"
};
export const typedArrayDescriptions = {
    Int8Array: "an Int8Array",
    Uint8Array: "a Uint8Array",
    Uint8ClampedArray: "a Uint8ClampedArray",
    Int16Array: "an Int16Array",
    Uint16Array: "a Uint16Array",
    Int32Array: "an Int32Array",
    Uint32Array: "a Uint32Array",
    Float32Array: "a Float32Array",
    Float64Array: "a Float64Array",
    BigInt64Array: "a BigInt64Array",
    BigUint64Array: "a BigUint64Array"
};
/** Each defaultObjectKind's completion for the phrase "must be _____" */
export const objectKindDescriptions = {
    ...ecmascriptDescriptions,
    ...platformDescriptions,
    ...typedArrayDescriptions
};
/**
 * this will only return an object kind if it's the root constructor
 * example TypeError would return null not 'Error'
 **/
export const getBuiltinNameOfConstructor = (ctor) => {
    const constructorName = Object(ctor).name ?? null;
    return (constructorName &&
        isKeyOf(constructorName, builtinConstructors) &&
        builtinConstructors[constructorName] === ctor) ?
        constructorName
        : null;
};
/**
 * Returns an array of constructors for all ancestors (i.e., prototypes) of a given object.
 */
export const ancestorsOf = (o) => {
    let proto = Object.getPrototypeOf(o);
    const result = [];
    while (proto !== null) {
        result.push(proto.constructor);
        proto = Object.getPrototypeOf(proto);
    }
    return result;
};
export const constructorExtends = (ctor, base) => {
    let current = ctor.prototype;
    while (current !== null) {
        if (current === base.prototype)
            return true;
        current = Object.getPrototypeOf(current);
    }
    return false;
};
