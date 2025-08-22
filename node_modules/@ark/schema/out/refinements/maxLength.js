import { Disjoint } from "../shared/disjoint.js";
import { implementNode } from "../shared/implement.js";
import { $ark } from "../shared/registry.js";
import { ToJsonSchema } from "../shared/toJsonSchema.js";
import { BaseRange, createLengthRuleParser, createLengthSchemaNormalizer } from "./range.js";
const implementation = implementNode({
    kind: "maxLength",
    collapsibleKey: "rule",
    hasAssociatedError: true,
    keys: {
        rule: {
            parse: createLengthRuleParser("maxLength")
        }
    },
    reduce: (inner, $) => inner.rule === 0 ? $.node("exactLength", inner) : undefined,
    normalize: createLengthSchemaNormalizer("maxLength"),
    defaults: {
        description: node => `at most length ${node.rule}`,
        actual: data => `${data.length}`
    },
    intersections: {
        maxLength: (l, r) => (l.isStricterThan(r) ? l : r),
        minLength: (max, min, ctx) => max.overlapsRange(min) ?
            max.overlapIsUnit(min) ?
                ctx.$.node("exactLength", { rule: max.rule })
                : null
            : Disjoint.init("range", max, min)
    }
});
export class MaxLengthNode extends BaseRange {
    impliedBasis = $ark.intrinsic.lengthBoundable.internal;
    traverseAllows = data => data.length <= this.rule;
    reduceJsonSchema(schema) {
        switch (schema.type) {
            case "string":
                schema.maxLength = this.rule;
                return schema;
            case "array":
                schema.maxItems = this.rule;
                return schema;
            default:
                return ToJsonSchema.throwInternalOperandError("maxLength", schema);
        }
    }
}
export const MaxLength = {
    implementation,
    Node: MaxLengthNode
};
