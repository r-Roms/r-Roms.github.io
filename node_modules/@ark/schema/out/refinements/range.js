import { isKeyOf, throwParseError } from "@ark/util";
import { InternalPrimitiveConstraint } from "../constraint.js";
export class BaseRange extends InternalPrimitiveConstraint {
    boundOperandKind = operandKindsByBoundKind[this.kind];
    compiledActual = this.boundOperandKind === "value" ? `data`
        : this.boundOperandKind === "length" ? `data.length`
            : `data.valueOf()`;
    comparator = compileComparator(this.kind, this.exclusive);
    numericLimit = this.rule.valueOf();
    expression = `${this.comparator} ${this.rule}`;
    compiledCondition = `${this.compiledActual} ${this.comparator} ${this.numericLimit}`;
    compiledNegation = `${this.compiledActual} ${negatedComparators[this.comparator]} ${this.numericLimit}`;
    // we need to compute stringLimit before errorContext, which references it
    // transitively through description for date bounds
    stringLimit = this.boundOperandKind === "date" ?
        dateLimitToString(this.numericLimit)
        : `${this.numericLimit}`;
    limitKind = this.comparator["0"] === "<" ? "upper" : "lower";
    isStricterThan(r) {
        const thisLimitIsStricter = this.limitKind === "upper" ?
            this.numericLimit < r.numericLimit
            : this.numericLimit > r.numericLimit;
        return (thisLimitIsStricter ||
            (this.numericLimit === r.numericLimit &&
                this.exclusive === true &&
                !r.exclusive));
    }
    overlapsRange(r) {
        if (this.isStricterThan(r))
            return false;
        if (this.numericLimit === r.numericLimit && (this.exclusive || r.exclusive))
            return false;
        return true;
    }
    overlapIsUnit(r) {
        return (this.numericLimit === r.numericLimit && !this.exclusive && !r.exclusive);
    }
}
const negatedComparators = {
    "<": ">=",
    "<=": ">",
    ">": "<=",
    ">=": "<"
};
export const boundKindPairsByLower = {
    min: "max",
    minLength: "maxLength",
    after: "before"
};
export const parseExclusiveKey = {
    // omit key with value false since it is the default
    parse: (flag) => flag || undefined
};
export const createLengthSchemaNormalizer = (kind) => (schema) => {
    if (typeof schema === "number")
        return { rule: schema };
    const { exclusive, ...normalized } = schema;
    return exclusive ?
        {
            ...normalized,
            rule: kind === "minLength" ? normalized.rule + 1 : normalized.rule - 1
        }
        : normalized;
};
export const createDateSchemaNormalizer = (kind) => (schema) => {
    if (typeof schema === "number" ||
        typeof schema === "string" ||
        schema instanceof Date)
        return { rule: schema };
    const { exclusive, ...normalized } = schema;
    if (!exclusive)
        return normalized;
    const numericLimit = typeof normalized.rule === "number" ? normalized.rule
        : typeof normalized.rule === "string" ?
            new Date(normalized.rule).valueOf()
            : normalized.rule.valueOf();
    return exclusive ?
        {
            ...normalized,
            rule: kind === "after" ? numericLimit + 1 : numericLimit - 1
        }
        : normalized;
};
export const parseDateLimit = (limit) => typeof limit === "string" || typeof limit === "number" ?
    new Date(limit)
    : limit;
export const writeInvalidLengthBoundMessage = (kind, limit) => `${kind} bound must be a positive integer (was ${limit})`;
export const createLengthRuleParser = (kind) => (limit) => {
    if (!Number.isInteger(limit) || limit < 0)
        throwParseError(writeInvalidLengthBoundMessage(kind, limit));
    return limit;
};
const operandKindsByBoundKind = {
    min: "value",
    max: "value",
    minLength: "length",
    maxLength: "length",
    after: "date",
    before: "date"
};
export const compileComparator = (kind, exclusive) => `${isKeyOf(kind, boundKindPairsByLower) ? ">" : "<"}${exclusive ? "" : "="}`;
export const dateLimitToString = (limit) => typeof limit === "string" ? limit : new Date(limit).toLocaleString();
export const writeUnboundableMessage = (root) => `Bounded expression ${root} must be exactly one of number, string, Array, or Date`;
