import { isArray, stringifyPath, throwParseError } from "@ark/util";
import { $ark } from "./registry.js";
import { isNode } from "./utils.js";
export class Disjoint extends Array {
    static init(kind, l, r, ctx) {
        return new Disjoint({
            kind,
            l,
            r,
            path: ctx?.path ?? [],
            optional: ctx?.optional ?? false
        });
    }
    add(kind, l, r, ctx) {
        this.push({
            kind,
            l,
            r,
            path: ctx?.path ?? [],
            optional: ctx?.optional ?? false
        });
        return this;
    }
    get summary() {
        return this.describeReasons();
    }
    describeReasons() {
        if (this.length === 1) {
            const { path, l, r } = this[0];
            const pathString = stringifyPath(path);
            return writeUnsatisfiableExpressionError(`Intersection${pathString && ` at ${pathString}`} of ${describeReasons(l, r)}`);
        }
        return `The following intersections result in unsatisfiable types:\n• ${this.map(({ path, l, r }) => `${path}: ${describeReasons(l, r)}`).join("\n• ")}`;
    }
    throw() {
        return throwParseError(this.describeReasons());
    }
    invert() {
        const result = this.map(entry => ({
            ...entry,
            l: entry.r,
            r: entry.l
        }));
        // Workaround for Static Hermes, which doesn't preserve the Array subclass here
        // https://github.com/arktypeio/arktype/issues/1027
        if (!(result instanceof Disjoint))
            return new Disjoint(...result);
        return result;
    }
    withPrefixKey(key, kind) {
        return this.map(entry => ({
            ...entry,
            path: [key, ...entry.path],
            optional: entry.optional || kind === "optional"
        }));
    }
    toNeverIfDisjoint() {
        return $ark.intrinsic.never;
    }
}
const describeReasons = (l, r) => `${describeReason(l)} and ${describeReason(r)}`;
const describeReason = (value) => isNode(value) ? value.expression
    : isArray(value) ? value.map(describeReason).join(" | ") || "never"
        : String(value);
export const writeUnsatisfiableExpressionError = (expression) => `${expression} results in an unsatisfiable type`;
