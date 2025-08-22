import { type NonNegativeIntegerLiteral } from "@ark/util";
import type { ArkSchemaRegistry } from "../config.ts";
export declare const registryName: string;
export declare const $ark: ArkSchemaRegistry;
export declare const reference: (name: string) => RegisteredReference;
export declare const registeredReference: (value: object | symbol) => RegisteredReference;
export type RegisteredReference<to extends string = string> = `$ark${"" | NonNegativeIntegerLiteral}.${to}`;
