import { describeCollapsibleDate } from "@ark/util";
import { implementNode } from "../shared/implement.js";
import { $ark } from "../shared/registry.js";
import { BaseRange, createDateSchemaNormalizer, parseDateLimit } from "./range.js";
const implementation = implementNode({
    kind: "after",
    collapsibleKey: "rule",
    hasAssociatedError: true,
    keys: {
        rule: {
            parse: parseDateLimit,
            serialize: schema => schema.toISOString()
        }
    },
    normalize: createDateSchemaNormalizer("after"),
    defaults: {
        description: node => `${node.collapsibleLimitString} or later`,
        actual: describeCollapsibleDate
    },
    intersections: {
        after: (l, r) => (l.isStricterThan(r) ? l : r)
    }
});
export class AfterNode extends BaseRange {
    impliedBasis = $ark.intrinsic.Date.internal;
    collapsibleLimitString = describeCollapsibleDate(this.rule);
    traverseAllows = data => data >= this.rule;
    reduceJsonSchema(base, ctx) {
        return ctx.fallback.date({ code: "date", base, after: this.rule });
    }
}
export const After = {
    implementation,
    Node: AfterNode
};
