import { describeCollapsibleDate } from "@ark/util";
import { Disjoint } from "../shared/disjoint.js";
import { implementNode } from "../shared/implement.js";
import { $ark } from "../shared/registry.js";
import { BaseRange, createDateSchemaNormalizer, parseDateLimit } from "./range.js";
const implementation = implementNode({
    kind: "before",
    collapsibleKey: "rule",
    hasAssociatedError: true,
    keys: {
        rule: {
            parse: parseDateLimit,
            serialize: schema => schema.toISOString()
        }
    },
    normalize: createDateSchemaNormalizer("before"),
    defaults: {
        description: node => `${node.collapsibleLimitString} or earlier`,
        actual: describeCollapsibleDate
    },
    intersections: {
        before: (l, r) => (l.isStricterThan(r) ? l : r),
        after: (before, after, ctx) => before.overlapsRange(after) ?
            before.overlapIsUnit(after) ?
                ctx.$.node("unit", { unit: before.rule })
                : null
            : Disjoint.init("range", before, after)
    }
});
export class BeforeNode extends BaseRange {
    collapsibleLimitString = describeCollapsibleDate(this.rule);
    traverseAllows = data => data <= this.rule;
    impliedBasis = $ark.intrinsic.Date.internal;
    reduceJsonSchema(base, ctx) {
        return ctx.fallback.date({ code: "date", base, before: this.rule });
    }
}
export const Before = {
    implementation,
    Node: BeforeNode
};
