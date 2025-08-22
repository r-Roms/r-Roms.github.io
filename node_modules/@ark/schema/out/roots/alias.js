import { append, domainDescriptions, printable, throwInternalError, throwParseError } from "@ark/util";
import { nodesByRegisteredId } from "../parse.js";
import { Disjoint } from "../shared/disjoint.js";
import { implementNode } from "../shared/implement.js";
import { intersectOrPipeNodes } from "../shared/intersections.js";
import { $ark } from "../shared/registry.js";
import { hasArkKind } from "../shared/utils.js";
import { BaseRoot } from "./root.js";
import { defineRightwardIntersections } from "./utils.js";
export const normalizeAliasSchema = (schema) => typeof schema === "string" ? { reference: schema } : schema;
const neverIfDisjoint = (result) => result instanceof Disjoint ? $ark.intrinsic.never.internal : result;
const implementation = implementNode({
    kind: "alias",
    hasAssociatedError: false,
    collapsibleKey: "reference",
    keys: {
        reference: {
            serialize: s => (s.startsWith("$") ? s : `$ark.${s}`)
        },
        resolve: {}
    },
    normalize: normalizeAliasSchema,
    defaults: {
        description: node => node.reference
    },
    intersections: {
        alias: (l, r, ctx) => ctx.$.lazilyResolve(() => neverIfDisjoint(intersectOrPipeNodes(l.resolution, r.resolution, ctx)), `${l.reference}${ctx.pipe ? "=>" : "&"}${r.reference}`),
        ...defineRightwardIntersections("alias", (l, r, ctx) => {
            if (r.isUnknown())
                return l;
            if (r.isNever())
                return r;
            if (r.isBasis() && !r.overlaps($ark.intrinsic.object)) {
                // can be more robust as part of https://github.com/arktypeio/arktype/issues/1026
                return Disjoint.init("assignability", $ark.intrinsic.object, r);
            }
            return ctx.$.lazilyResolve(() => neverIfDisjoint(intersectOrPipeNodes(l.resolution, r, ctx)), `${l.reference}${ctx.pipe ? "=>" : "&"}${r.id}`);
        })
    }
});
export class AliasNode extends BaseRoot {
    expression = this.reference;
    structure = undefined;
    get resolution() {
        const result = this._resolve();
        return (nodesByRegisteredId[this.id] = result);
    }
    _resolve() {
        if (this.resolve)
            return this.resolve();
        if (this.reference[0] === "$")
            return this.$.resolveRoot(this.reference.slice(1));
        const id = this.reference;
        let resolution = nodesByRegisteredId[id];
        const seen = [];
        while (hasArkKind(resolution, "context")) {
            if (seen.includes(resolution.id)) {
                return throwParseError(writeShallowCycleErrorMessage(resolution.id, seen));
            }
            seen.push(resolution.id);
            resolution = nodesByRegisteredId[resolution.id];
        }
        if (!hasArkKind(resolution, "root")) {
            return throwInternalError(`Unexpected resolution for reference ${this.reference}
Seen: [${seen.join("->")}] 
Resolution: ${printable(resolution)}`);
        }
        return resolution;
    }
    get resolutionId() {
        if (this.reference.includes("&") || this.reference.includes("=>"))
            return this.resolution.id;
        if (this.reference[0] !== "$")
            return this.reference;
        const alias = this.reference.slice(1);
        const resolution = this.$.resolutions[alias];
        if (typeof resolution === "string")
            return resolution;
        if (hasArkKind(resolution, "root"))
            return resolution.id;
        return throwInternalError(`Unexpected resolution for reference ${this.reference}: ${printable(resolution)}`);
    }
    get defaultShortDescription() {
        return domainDescriptions.object;
    }
    innerToJsonSchema(ctx) {
        return this.resolution.toJsonSchemaRecurse(ctx);
    }
    traverseAllows = (data, ctx) => {
        const seen = ctx.seen[this.reference];
        if (seen?.includes(data))
            return true;
        ctx.seen[this.reference] = append(seen, data);
        return this.resolution.traverseAllows(data, ctx);
    };
    traverseApply = (data, ctx) => {
        const seen = ctx.seen[this.reference];
        if (seen?.includes(data))
            return;
        ctx.seen[this.reference] = append(seen, data);
        this.resolution.traverseApply(data, ctx);
    };
    compile(js) {
        const id = this.resolutionId;
        js.if(`ctx.seen.${id} && ctx.seen.${id}.includes(data)`, () => js.return(true));
        js.if(`!ctx.seen.${id}`, () => js.line(`ctx.seen.${id} = []`));
        js.line(`ctx.seen.${id}.push(data)`);
        js.return(js.invoke(id));
    }
}
export const writeShallowCycleErrorMessage = (name, seen) => `Alias '${name}' has a shallow resolution cycle: ${[...seen, name].join("->")}`;
export const Alias = {
    implementation,
    Node: AliasNode
};
