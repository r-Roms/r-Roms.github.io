import { implementNode } from "../shared/implement.js";
import { $ark } from "../shared/registry.js";
import { ToJsonSchema } from "../shared/toJsonSchema.js";
import { BaseRange, createLengthRuleParser, createLengthSchemaNormalizer } from "./range.js";
const implementation = implementNode({
    kind: "minLength",
    collapsibleKey: "rule",
    hasAssociatedError: true,
    keys: {
        rule: {
            parse: createLengthRuleParser("minLength")
        }
    },
    reduce: inner => inner.rule === 0 ?
        // a minimum length of zero is trivially satisfied
        $ark.intrinsic.unknown
        : undefined,
    normalize: createLengthSchemaNormalizer("minLength"),
    defaults: {
        description: node => node.rule === 1 ? "non-empty" : `at least length ${node.rule}`,
        // avoid default message like "must be non-empty (was 0)"
        actual: data => (data.length === 0 ? "" : `${data.length}`)
    },
    intersections: {
        minLength: (l, r) => (l.isStricterThan(r) ? l : r)
    }
});
export class MinLengthNode extends BaseRange {
    impliedBasis = $ark.intrinsic.lengthBoundable.internal;
    traverseAllows = data => data.length >= this.rule;
    reduceJsonSchema(schema) {
        switch (schema.type) {
            case "string":
                schema.minLength = this.rule;
                return schema;
            case "array":
                schema.minItems = this.rule;
                return schema;
            default:
                return ToJsonSchema.throwInternalOperandError("minLength", schema);
        }
    }
}
export const MinLength = {
    implementation,
    Node: MinLengthNode
};
