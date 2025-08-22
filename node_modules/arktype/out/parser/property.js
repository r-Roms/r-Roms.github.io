import { isArray } from "@ark/util";
import { parseInnerDefinition } from "./definition.js";
export const parseProperty = (def, ctx) => {
    if (isArray(def)) {
        if (def[1] === "=")
            return [ctx.$.parseOwnDefinitionFormat(def[0], ctx), "=", def[2]];
        if (def[1] === "?")
            return [ctx.$.parseOwnDefinitionFormat(def[0], ctx), "?"];
    }
    // string-embedded defaults/optionals are handled by the string parser
    return parseInnerDefinition(def, ctx);
};
// single quote use here is better for TypeScript's inlined error to avoid escapes
export const invalidOptionalKeyKindMessage = `Only required keys may make their values optional, e.g. { [mySymbol]: ['number', '?'] }`;
// single quote use here is better for TypeScript's inlined error to avoid escapes
export const invalidDefaultableKeyKindMessage = `Only required keys may specify default values, e.g. { value: 'number = 0' }`;
