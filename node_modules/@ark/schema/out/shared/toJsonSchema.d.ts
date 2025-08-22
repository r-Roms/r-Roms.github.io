import { type Constructor, type Domain, type Json, type requireKeys, type satisfy } from "@ark/util";
import type { Predicate } from "../predicate.ts";
import type { ConstraintKind } from "./implement.ts";
import type { JsonSchema } from "./jsonSchema.ts";
declare class ToJsonSchemaError<code extends ToJsonSchema.Code = ToJsonSchema.Code> extends Error {
    readonly name = "ToJsonSchemaError";
    readonly code: code;
    readonly context: ToJsonSchema.ContextByCode[code];
    constructor(code: code, context: ToJsonSchema.ContextByCode[code]);
    hasCode<code extends ToJsonSchema.Code>(code: code): this is ToJsonSchemaError<code>;
}
export declare const ToJsonSchema: {
    Error: typeof ToJsonSchemaError;
    throw: (code: keyof ToJsonSchema.ContextByCode, context: ToJsonSchema.MorphContext | ToJsonSchema.UnitContext | ToJsonSchema.ProtoContext | ToJsonSchema.DomainContext | ToJsonSchema.PredicateContext | ToJsonSchema.DateContext | ToJsonSchema.ArrayObjectContext | ToJsonSchema.ArrayPostfixContext | ToJsonSchema.DefaultValueContext | ToJsonSchema.PatternIntersectionContext | ToJsonSchema.SymbolKeyContext) => never;
    throwInternalOperandError: (kind: ConstraintKind, schema: JsonSchema) => never;
    defaultConfig: ToJsonSchema.Context;
};
export declare namespace ToJsonSchema {
    type Unjsonifiable = object | symbol | bigint | undefined;
    type Error = InstanceType<typeof ToJsonSchema.Error>;
    interface BaseContext<code extends Code, base extends JsonSchema = JsonSchema> {
        code: code;
        base: base;
    }
    interface ArrayObjectContext extends BaseContext<"arrayObject", JsonSchema.Array> {
        object: JsonSchema.Object;
    }
    interface ArrayPostfixContext extends BaseContext<"arrayPostfix", VariadicArraySchema> {
        elements: readonly JsonSchema[];
    }
    interface DefaultValueContext extends BaseContext<"defaultValue", JsonSchema> {
        value: Unjsonifiable;
    }
    interface DomainContext extends BaseContext<"domain", JsonSchema> {
        domain: satisfy<Domain, "symbol" | "bigint" | "undefined">;
    }
    interface MorphContext extends BaseContext<"morph", JsonSchema> {
        out: JsonSchema | null;
    }
    interface PatternIntersectionContext extends BaseContext<"patternIntersection", StringSchemaWithPattern> {
        pattern: string;
    }
    interface PredicateContext extends BaseContext<"predicate", JsonSchema> {
        predicate: Predicate;
    }
    interface ProtoContext extends BaseContext<"proto", JsonSchema> {
        proto: Constructor;
    }
    type SymbolKeyContext = IndexSymbolKeyContext | RequiredSymbolKeyContext | OptionalSymbolKeyContext;
    interface IndexSymbolKeyContext extends BaseContext<"symbolKey", JsonSchema.Object> {
        key: null;
        value: JsonSchema;
        optional: false;
    }
    interface RequiredSymbolKeyContext extends BaseContext<"symbolKey", JsonSchema.Object> {
        key: symbol;
        value: JsonSchema;
        optional: false;
    }
    interface OptionalSymbolKeyContext extends BaseContext<"symbolKey", JsonSchema.Object> {
        key: symbol;
        value: JsonSchema;
        optional: true;
        default?: Json;
    }
    interface UnitContext extends BaseContext<"unit", JsonSchema> {
        unit: Unjsonifiable;
    }
    interface DateContext extends BaseContext<"date", JsonSchema> {
        before?: Date;
        after?: Date;
    }
    interface ContextByCode {
        arrayObject: ArrayObjectContext;
        arrayPostfix: ArrayPostfixContext;
        defaultValue: DefaultValueContext;
        domain: DomainContext;
        morph: MorphContext;
        patternIntersection: PatternIntersectionContext;
        predicate: PredicateContext;
        proto: ProtoContext;
        symbolKey: SymbolKeyContext;
        unit: UnitContext;
        date: DateContext;
    }
    type Code = keyof ContextByCode;
    type FallbackContext = ContextByCode[Code];
    type HandlerByCode = satisfy<{
        [code in Code]: (ctx: ContextByCode[code]) => unknown;
    }, {
        arrayObject: (ctx: ArrayObjectContext) => JsonSchema.Structure;
        arrayPostfix: (ctx: ArrayPostfixContext) => VariadicArraySchema;
        defaultValue: (ctx: DefaultValueContext) => JsonSchema;
        domain: (ctx: DomainContext) => JsonSchema;
        morph: (ctx: MorphContext) => JsonSchema;
        patternIntersection: (ctx: PatternIntersectionContext) => JsonSchema.String;
        predicate: (ctx: PredicateContext) => JsonSchema;
        proto: (ctx: ProtoContext) => JsonSchema;
        symbolKey: (ctx: SymbolKeyContext) => JsonSchema.Object;
        unit: (ctx: UnitContext) => JsonSchema;
        date: (ctx: DateContext) => JsonSchema;
    }>;
    type VariadicArraySchema = requireKeys<JsonSchema.Array, "items">;
    type StringSchemaWithPattern = requireKeys<JsonSchema.String, "pattern">;
    type UniversalFallback = (ctx: FallbackContext) => JsonSchema;
    interface FallbackObject extends Partial<HandlerByCode> {
        default?: UniversalFallback;
    }
    type FallbackOption = UniversalFallback | FallbackObject;
    interface Options {
        /** value to assign to the generated $schema key
         *
         *  - set to `null` to omit the `$schema` key
         *  - does not affect the contents of the generated schema
         *
         * @default "https://json-schema.org/draft/2020-12/schema"
         */
        dialect?: string | null;
        useRefs?: boolean;
        fallback?: FallbackOption;
    }
    interface Context extends Required<Options> {
        fallback: HandlerByCode;
    }
}
export {};
