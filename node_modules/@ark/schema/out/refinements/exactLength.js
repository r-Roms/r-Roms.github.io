import { InternalPrimitiveConstraint } from "../constraint.js";
import { Disjoint } from "../shared/disjoint.js";
import { implementNode } from "../shared/implement.js";
import { $ark } from "../shared/registry.js";
import { ToJsonSchema } from "../shared/toJsonSchema.js";
import { createLengthRuleParser } from "./range.js";
const implementation = implementNode({
    kind: "exactLength",
    collapsibleKey: "rule",
    keys: {
        rule: {
            parse: createLengthRuleParser("exactLength")
        }
    },
    normalize: schema => typeof schema === "number" ? { rule: schema } : schema,
    hasAssociatedError: true,
    defaults: {
        description: node => `exactly length ${node.rule}`,
        actual: data => `${data.length}`
    },
    intersections: {
        exactLength: (l, r, ctx) => Disjoint.init("unit", ctx.$.node("unit", { unit: l.rule }), ctx.$.node("unit", { unit: r.rule }), { path: ["length"] }),
        minLength: (exactLength, minLength) => exactLength.rule >= minLength.rule ?
            exactLength
            : Disjoint.init("range", exactLength, minLength),
        maxLength: (exactLength, maxLength) => exactLength.rule <= maxLength.rule ?
            exactLength
            : Disjoint.init("range", exactLength, maxLength)
    }
});
export class ExactLengthNode extends InternalPrimitiveConstraint {
    traverseAllows = data => data.length === this.rule;
    compiledCondition = `data.length === ${this.rule}`;
    compiledNegation = `data.length !== ${this.rule}`;
    impliedBasis = $ark.intrinsic.lengthBoundable.internal;
    expression = `== ${this.rule}`;
    reduceJsonSchema(schema) {
        switch (schema.type) {
            case "string":
                schema.minLength = this.rule;
                schema.maxLength = this.rule;
                return schema;
            case "array":
                schema.minItems = this.rule;
                schema.maxItems = this.rule;
                return schema;
            default:
                return ToJsonSchema.throwInternalOperandError("exactLength", schema);
        }
    }
}
export const ExactLength = {
    implementation,
    Node: ExactLengthNode
};
