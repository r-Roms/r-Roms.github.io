import { domainDescriptions, domainOf, printable } from "@ark/util";
import { Disjoint } from "../shared/disjoint.js";
import { defaultValueSerializer, implementNode } from "../shared/implement.js";
import { $ark } from "../shared/registry.js";
import { InternalBasis } from "./basis.js";
import { defineRightwardIntersections } from "./utils.js";
const implementation = implementNode({
    kind: "unit",
    hasAssociatedError: true,
    keys: {
        unit: {
            preserveUndefined: true,
            serialize: schema => schema instanceof Date ?
                schema.toISOString()
                : defaultValueSerializer(schema)
        }
    },
    normalize: schema => schema,
    defaults: {
        description: node => printable(node.unit),
        problem: ({ expected, actual }) => `${expected === actual ? `must be reference equal to ${expected} (serialized to the same value)` : `must be ${expected} (was ${actual})`}`
    },
    intersections: {
        unit: (l, r) => Disjoint.init("unit", l, r),
        ...defineRightwardIntersections("unit", (l, r) => {
            if (r.allows(l.unit))
                return l;
            // will always be a disjoint at this point, but we try to use
            // a domain Disjoint if possible since it's better for discrimination
            const rBasis = r.hasKind("intersection") ? r.basis : r;
            if (rBasis) {
                const rDomain = rBasis.hasKind("domain") ? rBasis : $ark.intrinsic.object;
                if (l.domain !== rDomain.domain) {
                    const lDomainDisjointValue = (l.domain === "undefined" ||
                        l.domain === "null" ||
                        l.domain === "boolean") ?
                        l.domain
                        : $ark.intrinsic[l.domain];
                    return Disjoint.init("domain", lDomainDisjointValue, rDomain);
                }
            }
            return Disjoint.init("assignability", l, r.hasKind("intersection") ?
                r.children.find(rConstraint => !rConstraint.allows(l.unit))
                : r);
        })
    }
});
export class UnitNode extends InternalBasis {
    compiledValue = this.json.unit;
    serializedValue = typeof this.unit === "string" || this.unit instanceof Date ?
        JSON.stringify(this.compiledValue)
        : `${this.compiledValue}`;
    compiledCondition = compileEqualityCheck(this.unit, this.serializedValue);
    compiledNegation = compileEqualityCheck(this.unit, this.serializedValue, "negated");
    expression = printable(this.unit);
    domain = domainOf(this.unit);
    get defaultShortDescription() {
        return this.domain === "object" ?
            domainDescriptions.object
            : this.description;
    }
    innerToJsonSchema(ctx) {
        return (
        // this is the more standard JSON schema representation, especially for Open API
        this.unit === null ? { type: "null" }
            : $ark.intrinsic.jsonPrimitive.allows(this.unit) ? { const: this.unit }
                : ctx.fallback.unit({ code: "unit", base: {}, unit: this.unit }));
    }
    traverseAllows = this.unit instanceof Date ?
        data => data instanceof Date && data.toISOString() === this.compiledValue
        : Number.isNaN(this.unit) ? data => Number.isNaN(data)
            : data => data === this.unit;
}
export const Unit = {
    implementation,
    Node: UnitNode
};
const compileEqualityCheck = (unit, serializedValue, negated) => {
    if (unit instanceof Date) {
        const condition = `data instanceof Date && data.toISOString() === ${serializedValue}`;
        return negated ? `!(${condition})` : condition;
    }
    if (Number.isNaN(unit))
        return `${negated ? "!" : ""}Number.isNaN(data)`;
    return `data ${negated ? "!" : "="}== ${serializedValue}`;
};
