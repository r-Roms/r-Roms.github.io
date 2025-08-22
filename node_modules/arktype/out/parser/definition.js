import { hasArkKind } from "@ark/schema";
import { domainOf, hasDomain, isThunk, objectKindOf, printable, throwParseError } from "@ark/util";
import { parseObjectLiteral } from "./objectLiteral.js";
import { parseString } from "./string.js";
import { maybeParseTupleExpression } from "./tupleExpressions.js";
import { parseTupleLiteral } from "./tupleLiteral.js";
const parseCache = {};
export const parseInnerDefinition = (def, ctx) => {
    if (typeof def === "string") {
        if (ctx.args && Object.keys(ctx.args).some(k => def.includes(k))) {
            // we can only rely on the cache if there are no contextual
            // resolutions like "this" or generic args
            return parseString(def, ctx);
        }
        const scopeCache = (parseCache[ctx.$.name] ??= {});
        return (scopeCache[def] ??= parseString(def, ctx));
    }
    return hasDomain(def, "object") ?
        parseObject(def, ctx)
        : throwParseError(writeBadDefinitionTypeMessage(domainOf(def)));
};
export const parseObject = (def, ctx) => {
    const objectKind = objectKindOf(def);
    switch (objectKind) {
        case undefined:
            if (hasArkKind(def, "root"))
                return def;
            return parseObjectLiteral(def, ctx);
        case "Array":
            return parseTuple(def, ctx);
        case "RegExp":
            return ctx.$.node("intersection", {
                domain: "string",
                pattern: def
            }, { prereduced: true });
        case "Function": {
            const resolvedDef = isThunk(def) ? def() : def;
            if (hasArkKind(resolvedDef, "root"))
                return resolvedDef;
            return throwParseError(writeBadDefinitionTypeMessage("Function"));
        }
        default:
            return throwParseError(writeBadDefinitionTypeMessage(objectKind ?? printable(def)));
    }
};
export const parseTuple = (def, ctx) => maybeParseTupleExpression(def, ctx) ?? parseTupleLiteral(def, ctx);
export const writeBadDefinitionTypeMessage = (actual) => `Type definitions must be strings or objects (was ${actual})`;
