import type { DescribeOptions } from "./describe.ts";
import { type domainDescriptions, domainOf } from "./domain.ts";
import type { Fn } from "./functions.ts";
import type { satisfy } from "./generics.ts";
export declare const ecmascriptConstructors: {
    Array: ArrayConstructor;
    Boolean: BooleanConstructor;
    Date: DateConstructor;
    Error: ErrorConstructor;
    Function: FunctionConstructor;
    Map: MapConstructor;
    Number: NumberConstructor;
    Promise: PromiseConstructor;
    RegExp: RegExpConstructor;
    Set: SetConstructor;
    String: StringConstructor;
    WeakMap: WeakMapConstructor;
    WeakSet: WeakSetConstructor;
};
export type ecmascriptConstructors = typeof ecmascriptConstructors;
export type EcmascriptObjects = satisfy<instantiateConstructors<keyof ecmascriptConstructors>, {
    Array: Array<unknown>;
    Boolean: Boolean;
    Date: Date;
    Error: Error;
    Function: Function;
    Map: Map<unknown, unknown>;
    Number: Number;
    RegExp: RegExp;
    Set: Set<unknown>;
    String: String;
    WeakMap: WeakMap<object, unknown>;
    WeakSet: WeakSet<object>;
    Promise: Promise<unknown>;
}>;
/** Node18 */
export declare const FileConstructor: typeof import("buffer").File;
export type platformConstructors = {
    ArrayBuffer: ArrayBufferConstructor;
    Blob: typeof Blob;
    File: typeof File;
    FormData: typeof FormData;
    Headers: typeof Headers;
    Request: typeof Request;
    Response: typeof Response;
    URL: typeof URL;
};
export declare const platformConstructors: platformConstructors;
export type PlatformObjects = instantiateConstructors<keyof platformConstructors>;
export declare const typedArrayConstructors: {
    Int8Array: Int8ArrayConstructor;
    Uint8Array: Uint8ArrayConstructor;
    Uint8ClampedArray: Uint8ClampedArrayConstructor;
    Int16Array: Int16ArrayConstructor;
    Uint16Array: Uint16ArrayConstructor;
    Int32Array: Int32ArrayConstructor;
    Uint32Array: Uint32ArrayConstructor;
    Float32Array: Float32ArrayConstructor;
    Float64Array: Float64ArrayConstructor;
    BigInt64Array: BigInt64ArrayConstructor;
    BigUint64Array: BigUint64ArrayConstructor;
};
export type typedArrayConstructors = typeof typedArrayConstructors;
export type TypedArrayObjects = instantiateConstructors<keyof typedArrayConstructors>;
export declare const builtinConstructors: {
    String: StringConstructor;
    Number: NumberConstructor;
    Boolean: BooleanConstructor;
    Int8Array: Int8ArrayConstructor;
    Uint8Array: Uint8ArrayConstructor;
    Uint8ClampedArray: Uint8ClampedArrayConstructor;
    Int16Array: Int16ArrayConstructor;
    Uint16Array: Uint16ArrayConstructor;
    Int32Array: Int32ArrayConstructor;
    Uint32Array: Uint32ArrayConstructor;
    Float32Array: Float32ArrayConstructor;
    Float64Array: Float64ArrayConstructor;
    BigInt64Array: BigInt64ArrayConstructor;
    BigUint64Array: BigUint64ArrayConstructor;
    ArrayBuffer: ArrayBufferConstructor;
    Blob: typeof Blob;
    File: typeof File;
    FormData: typeof FormData;
    Headers: typeof Headers;
    Request: typeof Request;
    Response: typeof Response;
    URL: typeof URL;
    Array: ArrayConstructor;
    Date: DateConstructor;
    Error: ErrorConstructor;
    Function: FunctionConstructor;
    Map: MapConstructor;
    Promise: PromiseConstructor;
    RegExp: RegExpConstructor;
    Set: SetConstructor;
    WeakMap: WeakMapConstructor;
    WeakSet: WeakSetConstructor;
};
export type builtinConstructors = typeof builtinConstructors;
export type BuiltinObjectKind = keyof builtinConstructors;
export type GlobalName = keyof typeof globalThis;
type instantiateConstructors<kind extends BuiltinObjectKind> = {
    [k in kind]: k extends GlobalName ? InstanceType<(typeof globalThis)[k]> : `${k}Constructor` extends GlobalName ? InstanceType<(typeof globalThis)[`${k}Constructor`]> : never;
};
export type BuiltinObjects = instantiateConstructors<BuiltinObjectKind>;
export type objectKindOf<data extends object> = object extends data ? keyof builtinConstructors | undefined : data extends Fn ? "Function" : instantiableObjectKind<data> extends never ? undefined : instantiableObjectKind<data>;
export type describeObject<o extends object, opts extends DescribeOptions = {}> = objectKindOf<o> extends string ? [
    opts["includeArticles"]
] extends [true] ? objectKindDescriptions[objectKindOf<o>] : objectKindOf<o> : [opts["includeArticles"]] extends [true] ? domainDescriptions["object"] : "object";
type instantiableObjectKind<data extends object> = {
    [kind in keyof builtinConstructors]: data extends (InstanceType<builtinConstructors[kind]>) ? kind : never;
}[keyof builtinConstructors];
export declare const objectKindOf: <data extends object>(data: data) => objectKindOf<data> | undefined;
export declare const objectKindOrDomainOf: <data>(data: data) => (objectKindOf<data & object> & {}) | domainOf<data>;
export type objectKindOrDomainOf<data> = data extends object ? objectKindOf<data> extends undefined ? "object" : objectKindOf<data> : domainOf<data>;
export declare const hasObjectKind: <kind extends keyof builtinConstructors>(data: object, kind: kind) => data is InstanceType<builtinConstructors[kind]>;
export declare const isArray: (data: unknown) => data is readonly unknown[];
export declare const ecmascriptDescriptions: {
    readonly Array: "an array";
    readonly Function: "a function";
    readonly Date: "a Date";
    readonly RegExp: "a RegExp";
    readonly Error: "an Error";
    readonly Map: "a Map";
    readonly Set: "a Set";
    readonly String: "a String object";
    readonly Number: "a Number object";
    readonly Boolean: "a Boolean object";
    readonly Promise: "a Promise";
    readonly WeakMap: "a WeakMap";
    readonly WeakSet: "a WeakSet";
};
export declare const platformDescriptions: {
    ArrayBuffer: string;
    Blob: string;
    File: string;
    FormData: string;
    Headers: string;
    Request: string;
    Response: string;
    URL: string;
};
export declare const typedArrayDescriptions: {
    readonly Int8Array: "an Int8Array";
    readonly Uint8Array: "a Uint8Array";
    readonly Uint8ClampedArray: "a Uint8ClampedArray";
    readonly Int16Array: "an Int16Array";
    readonly Uint16Array: "a Uint16Array";
    readonly Int32Array: "an Int32Array";
    readonly Uint32Array: "a Uint32Array";
    readonly Float32Array: "a Float32Array";
    readonly Float64Array: "a Float64Array";
    readonly BigInt64Array: "a BigInt64Array";
    readonly BigUint64Array: "a BigUint64Array";
};
/** Each defaultObjectKind's completion for the phrase "must be _____" */
export declare const objectKindDescriptions: {
    readonly Int8Array: "an Int8Array";
    readonly Uint8Array: "a Uint8Array";
    readonly Uint8ClampedArray: "a Uint8ClampedArray";
    readonly Int16Array: "an Int16Array";
    readonly Uint16Array: "a Uint16Array";
    readonly Int32Array: "an Int32Array";
    readonly Uint32Array: "a Uint32Array";
    readonly Float32Array: "a Float32Array";
    readonly Float64Array: "a Float64Array";
    readonly BigInt64Array: "a BigInt64Array";
    readonly BigUint64Array: "a BigUint64Array";
    readonly ArrayBuffer: string;
    readonly Blob: string;
    readonly File: string;
    readonly FormData: string;
    readonly Headers: string;
    readonly Request: string;
    readonly Response: string;
    readonly URL: string;
    readonly Array: "an array";
    readonly Function: "a function";
    readonly Date: "a Date";
    readonly RegExp: "a RegExp";
    readonly Error: "an Error";
    readonly Map: "a Map";
    readonly Set: "a Set";
    readonly String: "a String object";
    readonly Number: "a Number object";
    readonly Boolean: "a Boolean object";
    readonly Promise: "a Promise";
    readonly WeakMap: "a WeakMap";
    readonly WeakSet: "a WeakSet";
};
export type objectKindDescriptions = typeof objectKindDescriptions;
/**
 * this will only return an object kind if it's the root constructor
 * example TypeError would return null not 'Error'
 **/
export declare const getBuiltinNameOfConstructor: (ctor: Function) => BuiltinObjectKind | null;
export type Constructor<instance = {}> = abstract new (...args: never[]) => instance;
export type instanceOf<constructor> = constructor extends Constructor<infer instance> ? instance : never;
/**
 * Returns an array of constructors for all ancestors (i.e., prototypes) of a given object.
 */
export declare const ancestorsOf: (o: object) => Function[];
export type normalizedKeyOf<t> = keyof t extends infer k ? k extends number ? `${k}` : k : never;
export declare const constructorExtends: (ctor: Constructor, base: Constructor) => boolean;
export {};
