import { implementNode } from "../shared/implement.js";
import { $ark } from "../shared/registry.js";
import { BaseRange, parseExclusiveKey } from "./range.js";
const implementation = implementNode({
    kind: "min",
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
                return node.exclusive ? "positive" : "non-negative";
            return `${node.exclusive ? "more than" : "at least"} ${node.rule}`;
        }
    },
    intersections: {
        min: (l, r) => (l.isStricterThan(r) ? l : r)
    },
    obviatesBasisDescription: true
});
export class MinNode extends BaseRange {
    impliedBasis = $ark.intrinsic.number.internal;
    traverseAllows = this.exclusive ? data => data > this.rule : data => data >= this.rule;
    reduceJsonSchema(schema) {
        if (this.exclusive)
            schema.exclusiveMinimum = this.rule;
        else
            schema.minimum = this.rule;
        return schema;
    }
}
export const Min = {
    implementation,
    Node: MinNode
};
