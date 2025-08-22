import { flatMorph, printable, throwParseError } from "@ark/util";
import { compileSerializedValue } from "./compile.js";
import { isNode } from "./utils.js";
export const basisKinds = ["unit", "proto", "domain"];
export const structuralKinds = [
    "required",
    "optional",
    "index",
    "sequence"
];
export const refinementKinds = [
    "pattern",
    "divisor",
    "exactLength",
    "max",
    "min",
    "maxLength",
    "minLength",
    "before",
    "after"
];
export const constraintKinds = [
    ...refinementKinds,
    ...structuralKinds,
    "structure",
    "predicate"
];
export const rootKinds = [
    "alias",
    "union",
    "morph",
    "unit",
    "intersection",
    "proto",
    "domain"
];
export const nodeKinds = [...rootKinds, ...constraintKinds];
export const constraintKeys = flatMorph(constraintKinds, (i, kind) => [kind, 1]);
export const structureKeys = flatMorph([...structuralKinds, "undeclared"], (i, k) => [k, 1]);
export const precedenceByKind = flatMorph(nodeKinds, (i, kind) => [kind, i]);
export const isNodeKind = (value) => typeof value === "string" && value in precedenceByKind;
export function assertNodeKind(value, kind) {
    const valueIsNode = isNode(value);
    if (!valueIsNode || value.kind !== kind) {
        throwParseError(`Expected node of kind ${kind} (was ${valueIsNode ? `${value.kind} node` : printable(value)})`);
    }
}
export const precedenceOfKind = (kind) => precedenceByKind[kind];
export const schemaKindsRightOf = (kind) => rootKinds.slice(precedenceOfKind(kind) + 1);
export const unionChildKinds = [
    ...schemaKindsRightOf("union"),
    "alias"
];
export const morphChildKinds = [
    ...schemaKindsRightOf("morph"),
    "alias"
];
export const defaultValueSerializer = (v) => {
    if (typeof v === "string" || typeof v === "boolean" || v === null)
        return v;
    if (typeof v === "number") {
        if (Number.isNaN(v))
            return "NaN";
        if (v === Number.POSITIVE_INFINITY)
            return "Infinity";
        if (v === Number.NEGATIVE_INFINITY)
            return "-Infinity";
        return v;
    }
    return compileSerializedValue(v);
};
export const compileObjectLiteral = (ctx) => {
    let result = "{ ";
    for (const [k, v] of Object.entries(ctx))
        result += `${k}: ${compileSerializedValue(v)}, `;
    return result + " }";
};
export const implementNode = (_) => {
    const implementation = _;
    if (implementation.hasAssociatedError) {
        implementation.defaults.expected ??= ctx => "description" in ctx ?
            ctx.description
            : implementation.defaults.description(ctx);
        implementation.defaults.actual ??= data => printable(data);
        implementation.defaults.problem ??= ctx => `must be ${ctx.expected}${ctx.actual ? ` (was ${ctx.actual})` : ""}`;
        implementation.defaults.message ??= ctx => {
            if (ctx.path.length === 0)
                return ctx.problem;
            const problemWithLocation = `${ctx.propString} ${ctx.problem}`;
            if (problemWithLocation[0] === "[") {
                // clarify paths like [1], [0][1], and ["key!"] that could be confusing
                return `value at ${problemWithLocation}`;
            }
            return problemWithLocation;
        };
    }
    return implementation;
};
