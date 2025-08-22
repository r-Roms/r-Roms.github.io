import type { ClassValue } from "clsx";
export declare function isFunction(value: unknown): value is (...args: unknown[]) => unknown;
export declare function isObject(value: unknown): value is Record<PropertyKey, unknown>;
export declare function isClassValue(value: unknown): value is ClassValue;
