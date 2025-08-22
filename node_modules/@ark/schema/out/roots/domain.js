import { domainDescriptions, domainOf, hasKey, throwParseError } from "@ark/util";
import { Disjoint } from "../shared/disjoint.js";
import { implementNode } from "../shared/implement.js";
import { InternalBasis } from "./basis.js";
const implementation = implementNode({
    kind: "domain",
    hasAssociatedError: true,
    collapsibleKey: "domain",
    keys: {
        domain: {},
        numberAllowsNaN: {}
    },
    normalize: schema => typeof schema === "string" ? { domain: schema }
        : hasKey(schema, "numberAllowsNaN") && schema.domain !== "number" ?
            throwParseError(Domain.writeBadAllowNanMessage(schema.domain))
            : schema,
    applyConfig: (schema, config) => (schema.numberAllowsNaN === undefined &&
        schema.domain === "number" &&
        config.numberAllowsNaN) ?
        { ...schema, numberAllowsNaN: true }
        : schema,
    defaults: {
        description: node => domainDescriptions[node.domain],
        actual: data => Number.isNaN(data) ? "NaN" : domainDescriptions[domainOf(data)]
    },
    intersections: {
        domain: (l, r) => 
        // since l === r is handled by default, remaining cases are disjoint
        // outside those including options like numberAllowsNaN
        l.domain === "number" && r.domain === "number" ?
            l.numberAllowsNaN ?
                r
                : l
            : Disjoint.init("domain", l, r)
    }
});
export class DomainNode extends InternalBasis {
    requiresNaNCheck = this.domain === "number" && !this.numberAllowsNaN;
    traverseAllows = this.requiresNaNCheck ?
        data => typeof data === "number" && !Number.isNaN(data)
        : data => domainOf(data) === this.domain;
    compiledCondition = this.domain === "object" ?
        `((typeof data === "object" && data !== null) || typeof data === "function")`
        : `typeof data === "${this.domain}"${this.requiresNaNCheck ? " && !Number.isNaN(data)" : ""}`;
    compiledNegation = this.domain === "object" ?
        `((typeof data !== "object" || data === null) && typeof data !== "function")`
        : `typeof data !== "${this.domain}"${this.requiresNaNCheck ? " || Number.isNaN(data)" : ""}`;
    expression = this.numberAllowsNaN ? "number | NaN" : this.domain;
    get nestableExpression() {
        return this.numberAllowsNaN ? `(${this.expression})` : this.expression;
    }
    get defaultShortDescription() {
        return domainDescriptions[this.domain];
    }
    innerToJsonSchema(ctx) {
        if (this.domain === "bigint" || this.domain === "symbol") {
            return ctx.fallback.domain({
                code: "domain",
                base: {},
                domain: this.domain
            });
        }
        return {
            type: this.domain
        };
    }
}
export const Domain = {
    implementation,
    Node: DomainNode,
    writeBadAllowNanMessage: (actual) => `numberAllowsNaN may only be specified with domain "number" (was ${actual})`
};
