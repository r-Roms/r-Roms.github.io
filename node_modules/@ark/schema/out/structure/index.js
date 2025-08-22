import { append, printable, stringAndSymbolicEntriesOf, throwParseError } from "@ark/util";
import { BaseConstraint } from "../constraint.js";
import { flatRef } from "../node.js";
import { Disjoint } from "../shared/disjoint.js";
import { implementNode } from "../shared/implement.js";
import { intersectOrPipeNodes } from "../shared/intersections.js";
import { $ark } from "../shared/registry.js";
import { traverseKey } from "../shared/traversal.js";
const implementation = implementNode({
    kind: "index",
    hasAssociatedError: false,
    intersectionIsOpen: true,
    keys: {
        signature: {
            child: true,
            parse: (schema, ctx) => {
                const key = ctx.$.parseSchema(schema);
                if (!key.extends($ark.intrinsic.key)) {
                    return throwParseError(writeInvalidPropertyKeyMessage(key.expression));
                }
                const enumerableBranches = key.branches.filter(b => b.hasKind("unit"));
                if (enumerableBranches.length) {
                    return throwParseError(writeEnumerableIndexBranches(enumerableBranches.map(b => printable(b.unit))));
                }
                return key;
            }
        },
        value: {
            child: true,
            parse: (schema, ctx) => ctx.$.parseSchema(schema)
        }
    },
    normalize: schema => schema,
    defaults: {
        description: node => `[${node.signature.expression}]: ${node.value.description}`
    },
    intersections: {
        index: (l, r, ctx) => {
            if (l.signature.equals(r.signature)) {
                const valueIntersection = intersectOrPipeNodes(l.value, r.value, ctx);
                const value = valueIntersection instanceof Disjoint ?
                    $ark.intrinsic.never.internal
                    : valueIntersection;
                return ctx.$.node("index", { signature: l.signature, value });
            }
            // if r constrains all of l's keys to a subtype of l's value, r is a subtype of l
            if (l.signature.extends(r.signature) && l.value.subsumes(r.value))
                return r;
            // if l constrains all of r's keys to a subtype of r's value, l is a subtype of r
            if (r.signature.extends(l.signature) && r.value.subsumes(l.value))
                return l;
            // other relationships between index signatures can't be generally reduced
            return null;
        }
    }
});
export class IndexNode extends BaseConstraint {
    impliedBasis = $ark.intrinsic.object.internal;
    expression = `[${this.signature.expression}]: ${this.value.expression}`;
    flatRefs = append(this.value.flatRefs.map(ref => flatRef([this.signature, ...ref.path], ref.node)), flatRef([this.signature], this.value));
    traverseAllows = (data, ctx) => stringAndSymbolicEntriesOf(data).every(entry => {
        if (this.signature.traverseAllows(entry[0], ctx)) {
            return traverseKey(entry[0], () => this.value.traverseAllows(entry[1], ctx), ctx);
        }
        return true;
    });
    traverseApply = (data, ctx) => {
        for (const entry of stringAndSymbolicEntriesOf(data)) {
            if (this.signature.traverseAllows(entry[0], ctx)) {
                traverseKey(entry[0], () => this.value.traverseApply(entry[1], ctx), ctx);
            }
        }
    };
    _transform(mapper, ctx) {
        ctx.path.push(this.signature);
        const result = super._transform(mapper, ctx);
        ctx.path.pop();
        return result;
    }
    compile() {
        // this is currently handled by StructureNode
    }
}
export const Index = {
    implementation,
    Node: IndexNode
};
export const writeEnumerableIndexBranches = (keys) => `Index keys ${keys.join(", ")} should be specified as named props.`;
export const writeInvalidPropertyKeyMessage = (indexSchema) => `Indexed key definition '${indexSchema}' must be a string or symbol`;
