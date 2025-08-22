import type { array, autocomplete, JsonArray, JsonObject, listable } from "@ark/util";
export type JsonSchema = JsonSchema.NonBooleanBranch;
export type ListableJsonSchema = listable<JsonSchema>;
export type JsonSchemaOrBoolean = listable<JsonSchema.Branch>;
export declare namespace JsonSchema {
    type TypeName = "string" | "integer" | "number" | "object" | "array" | "boolean" | "null";
    /**
     *  a subset of JSON Schema's annotations, see:
     *  https://json-schema.org/understanding-json-schema/reference/annotations
     **/
    interface Meta<t = unknown> extends UniversalMeta<t> {
        $schema?: string;
        $defs?: Record<string, JsonSchema>;
    }
    type Format = autocomplete<"date-time" | "date" | "time" | "email" | "ipv4" | "ipv6" | "uri" | "uuid" | "regex">;
    /**
     * doesn't include root-only keys like $schema
     */
    interface UniversalMeta<t = unknown> {
        title?: string;
        description?: string;
        format?: Format;
        deprecated?: true;
        default?: t;
        examples?: readonly t[];
    }
    type Composition = Union | OneOf | Intersection | Not;
    type NonBooleanBranch = Constrainable | Const | Composition | Enum | String | Numeric | Object | Array | Ref;
    type Branch = boolean | JsonSchema;
    type RefString = `#/$defs/${string}`;
    interface Ref extends Meta {
        $ref: RefString;
        type?: never;
    }
    interface Constrainable extends Meta {
        type?: listable<TypeName>;
    }
    interface Intersection extends Meta {
        allOf: readonly JsonSchema[];
    }
    interface Not extends Meta {
        not: JsonSchema;
    }
    interface OneOf extends Meta {
        oneOf: readonly JsonSchema[];
    }
    interface Union extends Meta {
        anyOf: readonly JsonSchema[];
    }
    interface Const extends Meta {
        const: unknown;
    }
    interface Enum extends Meta {
        enum: array;
    }
    interface String extends Meta<string> {
        type: "string";
        minLength?: number;
        maxLength?: number;
        pattern?: string;
        format?: string;
    }
    interface Numeric extends Meta<number> {
        type: "number" | "integer";
        multipleOf?: number;
        minimum?: number;
        exclusiveMinimum?: number;
        maximum?: number;
        exclusiveMaximum?: number;
    }
    interface Object extends Meta<JsonObject> {
        type: "object";
        properties?: Record<string, JsonSchema>;
        required?: string[];
        patternProperties?: Record<string, JsonSchema>;
        additionalProperties?: JsonSchemaOrBoolean;
        maxProperties?: number;
        minProperties?: number;
        propertyNames?: String;
    }
    interface Array extends Meta<JsonArray> {
        type: "array";
        additionalItems?: JsonSchemaOrBoolean;
        contains?: JsonSchemaOrBoolean;
        uniqueItems?: boolean;
        minItems?: number;
        maxItems?: number;
        items?: JsonSchemaOrBoolean;
        prefixItems?: readonly Branch[];
    }
    type LengthBoundable = String | Array;
    type Structure = Object | Array;
}
