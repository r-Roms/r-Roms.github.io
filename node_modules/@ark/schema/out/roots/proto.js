import { builtinConstructors, constructorExtends, domainOf, getBuiltinNameOfConstructor, hasKey, objectKindDescriptions, objectKindOrDomainOf, throwParseError } from "@ark/util";
import { Disjoint } from "../shared/disjoint.js";
import { defaultValueSerializer, implementNode } from "../shared/implement.js";
import { $ark } from "../shared/registry.js";
import { isNode } from "../shared/utils.js";
import { InternalBasis } from "./basis.js";
const implementation = implementNode({
    kind: "proto",
    hasAssociatedError: true,
    collapsibleKey: "proto",
    keys: {
        proto: {
            serialize: ctor => getBuiltinNameOfConstructor(ctor) ?? defaultValueSerializer(ctor)
        },
        dateAllowsInvalid: {}
    },
    normalize: schema => {
        const normalized = typeof schema === "string" ? { proto: builtinConstructors[schema] }
            : typeof schema === "function" ?
                isNode(schema) ? schema
                    : { proto: schema }
                : typeof schema.proto === "string" ?
                    { ...schema, proto: builtinConstructors[schema.proto] }
                    : schema;
        if (typeof normalized.proto !== "function")
            throwParseError(Proto.writeInvalidSchemaMessage(normalized.proto));
        if (hasKey(normalized, "dateAllowsInvalid") && normalized.proto !== Date)
            throwParseError(Proto.writeBadInvalidDateMessage(normalized.proto));
        return normalized;
    },
    applyConfig: (schema, config) => {
        if (schema.dateAllowsInvalid === undefined &&
            schema.proto === Date &&
            config.dateAllowsInvalid)
            return { ...schema, dateAllowsInvalid: true };
        return schema;
    },
    defaults: {
        description: node => node.builtinName ?
            objectKindDescriptions[node.builtinName]
            : `an instance of ${node.proto.name}`,
        actual: data => data instanceof Date && data.toString() === "Invalid Date" ?
            "an invalid Date"
            : objectKindOrDomainOf(data)
    },
    intersections: {
        proto: (l, r) => l.proto === Date && r.proto === Date ?
            // since l === r is handled by default,
            // exactly one of l or r must have allow invalid dates
            l.dateAllowsInvalid ?
                r
                : l
            : constructorExtends(l.proto, r.proto) ? l
                : constructorExtends(r.proto, l.proto) ? r
                    : Disjoint.init("proto", l, r),
        domain: (proto, domain) => domain.domain === "object" ?
            proto
            : Disjoint.init("domain", $ark.intrinsic.object.internal, domain)
    }
});
export class ProtoNode extends InternalBasis {
    builtinName = getBuiltinNameOfConstructor(this.proto);
    serializedConstructor = this.json.proto;
    requiresInvalidDateCheck = this.proto === Date && !this.dateAllowsInvalid;
    traverseAllows = this.requiresInvalidDateCheck ?
        data => data instanceof Date && data.toString() !== "Invalid Date"
        : data => data instanceof this.proto;
    compiledCondition = `data instanceof ${this.serializedConstructor}${this.requiresInvalidDateCheck ? ` && data.toString() !== "Invalid Date"` : ""}`;
    compiledNegation = `!(${this.compiledCondition})`;
    innerToJsonSchema(ctx) {
        switch (this.builtinName) {
            case "Array":
                return {
                    type: "array"
                };
            case "Date":
                return (ctx.fallback.date?.({ code: "date", base: {} }) ??
                    ctx.fallback.proto({ code: "proto", base: {}, proto: this.proto }));
            default:
                return ctx.fallback.proto({
                    code: "proto",
                    base: {},
                    proto: this.proto
                });
        }
    }
    expression = this.dateAllowsInvalid ? "Date | InvalidDate" : this.proto.name;
    get nestableExpression() {
        return this.dateAllowsInvalid ? `(${this.expression})` : this.expression;
    }
    domain = "object";
    get defaultShortDescription() {
        return this.description;
    }
}
export const Proto = {
    implementation,
    Node: ProtoNode,
    writeBadInvalidDateMessage: (actual) => `dateAllowsInvalid may only be specified with constructor Date (was ${actual.name})`,
    writeInvalidSchemaMessage: (actual) => `instanceOf operand must be a function (was ${domainOf(actual)})`
};
