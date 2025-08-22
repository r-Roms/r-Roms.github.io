import { Disjoint } from "../shared/disjoint.js";
import { implementNode } from "../shared/implement.js";
import { $ark } from "../shared/registry.js";
import { BaseRange, parseExclusiveKey } from "./range.js";
const implementation = implementNode({
    kind: "max",
    collapsibleKey: "rule",
    hasAssociatedError: true,
    keys: {
        rule: {},
        exclusive: parseExclusiveKey
    },
    normalize: schema => typeof schema === "number" ? { rule: schema } : schema,
    defaults: {
        description: node => {
            if (node.rule === 0)
                return node.exclusive ? "negative" : "non-positive";
            return `${node.exclusive ? "less than" : "at most"} ${node.rule}`;
        }
    },
    intersections: {
        max: (l, r) => (l.isStricterThan(r) ? l : r),
        min: (max, min, ctx) => max.overlapsRange(min) ?
            max.overlapIsUnit(min) ?
                ctx.$.node("unit", { unit: max.rule })
                : null
            : Disjoint.init("range", max, min)
    },
    obviatesBasisDescription: true
});
export class MaxNode extends BaseRange {
    impliedBasis = $ark.intrinsic.number.internal;
    traverseAllows = this.exclusive ? data => data < this.rule : data => data <= this.rule;
    reduceJsonSchema(schema) {
        if (this.exclusive)
            schema.exclusiveMaximum = this.rule;
        else
            schema.maximum = this.rule;
        return schema;
    }
}
export const Max = {
    implementation,
    Node: MaxNode
};
