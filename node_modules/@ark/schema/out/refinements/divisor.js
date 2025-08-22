import { throwParseError } from "@ark/util";
import { InternalPrimitiveConstraint, writeInvalidOperandMessage } from "../constraint.js";
import { implementNode } from "../shared/implement.js";
import { $ark } from "../shared/registry.js";
const implementation = implementNode({
    kind: "divisor",
    collapsibleKey: "rule",
    keys: {
        rule: {
            parse: divisor => Number.isInteger(divisor) ? divisor : (throwParseError(writeNonIntegerDivisorMessage(divisor)))
        }
    },
    normalize: schema => typeof schema === "number" ? { rule: schema } : schema,
    hasAssociatedError: true,
    defaults: {
        description: node => node.rule === 1 ? "an integer"
            : node.rule === 2 ? "even"
                : `a multiple of ${node.rule}`
    },
    intersections: {
        divisor: (l, r, ctx) => ctx.$.node("divisor", {
            rule: Math.abs((l.rule * r.rule) / greatestCommonDivisor(l.rule, r.rule))
        })
    },
    obviatesBasisDescription: true
});
export class DivisorNode extends InternalPrimitiveConstraint {
    traverseAllows = data => data % this.rule === 0;
    compiledCondition = `data % ${this.rule} === 0`;
    compiledNegation = `data % ${this.rule} !== 0`;
    impliedBasis = $ark.intrinsic.number.internal;
    expression = `% ${this.rule}`;
    reduceJsonSchema(schema) {
        schema.type = "integer";
        if (this.rule === 1)
            return schema;
        schema.multipleOf = this.rule;
        return schema;
    }
}
export const Divisor = {
    implementation,
    Node: DivisorNode
};
export const writeIndivisibleMessage = (t) => writeInvalidOperandMessage("divisor", $ark.intrinsic.number, t);
export const writeNonIntegerDivisorMessage = (divisor) => `divisor must be an integer (was ${divisor})`;
// https://en.wikipedia.org/wiki/Euclidean_algorithm
const greatestCommonDivisor = (l, r) => {
    let previous;
    let greatestCommonDivisor = l;
    let current = r;
    while (current !== 0) {
        previous = current;
        current = greatestCommonDivisor % current;
        greatestCommonDivisor = previous;
    }
    return greatestCommonDivisor;
};
