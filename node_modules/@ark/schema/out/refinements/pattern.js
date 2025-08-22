import { InternalPrimitiveConstraint } from "../constraint.js";
import { implementNode } from "../shared/implement.js";
import { $ark } from "../shared/registry.js";
const implementation = implementNode({
    kind: "pattern",
    collapsibleKey: "rule",
    keys: {
        rule: {},
        flags: {}
    },
    normalize: schema => typeof schema === "string" ? { rule: schema }
        : schema instanceof RegExp ?
            schema.flags ?
                { rule: schema.source, flags: schema.flags }
                : { rule: schema.source }
            : schema,
    obviatesBasisDescription: true,
    obviatesBasisExpression: true,
    hasAssociatedError: true,
    intersectionIsOpen: true,
    defaults: {
        description: node => `matched by ${node.rule}`
    },
    intersections: {
        // for now, non-equal regex are naively intersected:
        // https://github.com/arktypeio/arktype/issues/853
        pattern: () => null
    }
});
export class PatternNode extends InternalPrimitiveConstraint {
    instance = new RegExp(this.rule, this.flags);
    expression = `${this.instance}`;
    traverseAllows = this.instance.test.bind(this.instance);
    compiledCondition = `${this.expression}.test(data)`;
    compiledNegation = `!${this.compiledCondition}`;
    impliedBasis = $ark.intrinsic.string.internal;
    reduceJsonSchema(base, ctx) {
        if (base.pattern) {
            return ctx.fallback.patternIntersection({
                code: "patternIntersection",
                base: base,
                pattern: this.rule
            });
        }
        base.pattern = this.rule;
        return base;
    }
}
export const Pattern = {
    implementation,
    Node: PatternNode
};
