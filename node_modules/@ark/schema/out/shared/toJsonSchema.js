import { printable, throwInternalError } from "@ark/util";
class ToJsonSchemaError extends Error {
    name = "ToJsonSchemaError";
    code;
    context;
    constructor(code, context) {
        super(printable(context, { quoteKeys: false, indent: 4 }));
        this.code = code;
        this.context = context;
    }
    hasCode(code) {
        return this.code === code;
    }
}
const defaultConfig = {
    dialect: "https://json-schema.org/draft/2020-12/schema",
    useRefs: false,
    fallback: {
        arrayObject: ctx => ToJsonSchema.throw("arrayObject", ctx),
        arrayPostfix: ctx => ToJsonSchema.throw("arrayPostfix", ctx),
        defaultValue: ctx => ToJsonSchema.throw("defaultValue", ctx),
        domain: ctx => ToJsonSchema.throw("domain", ctx),
        morph: ctx => ToJsonSchema.throw("morph", ctx),
        patternIntersection: ctx => ToJsonSchema.throw("patternIntersection", ctx),
        predicate: ctx => ToJsonSchema.throw("predicate", ctx),
        proto: ctx => ToJsonSchema.throw("proto", ctx),
        symbolKey: ctx => ToJsonSchema.throw("symbolKey", ctx),
        unit: ctx => ToJsonSchema.throw("unit", ctx),
        date: ctx => ToJsonSchema.throw("date", ctx)
    }
};
export const ToJsonSchema = {
    Error: ToJsonSchemaError,
    throw: (...args) => {
        throw new ToJsonSchema.Error(...args);
    },
    throwInternalOperandError: (kind, schema) => throwInternalError(`Unexpected JSON Schema input for ${kind}: ${printable(schema)}`),
    defaultConfig
};
