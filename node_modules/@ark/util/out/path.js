import { ReadonlyArray } from "./arrays.js";
import { throwParseError } from "./errors.js";
import { isDotAccessible } from "./registry.js";
import { printable } from "./serialize.js";
export const appendStringifiedKey = (path, prop, ...[opts]) => {
    const stringifySymbol = opts?.stringifySymbol ?? printable;
    let propAccessChain = path;
    switch (typeof prop) {
        case "string":
            propAccessChain =
                isDotAccessible(prop) ?
                    path === "" ?
                        prop
                        : `${path}.${prop}`
                    : `${path}[${JSON.stringify(prop)}]`;
            break;
        case "number":
            propAccessChain = `${path}[${prop}]`;
            break;
        case "symbol":
            propAccessChain = `${path}[${stringifySymbol(prop)}]`;
            break;
        default:
            if (opts?.stringifyNonKey)
                propAccessChain = `${path}[${opts.stringifyNonKey(prop)}]`;
            else {
                throwParseError(`${printable(prop)} must be a PropertyKey or stringifyNonKey must be passed to options`);
            }
    }
    return propAccessChain;
};
export const stringifyPath = (path, ...opts) => path.reduce((s, k) => appendStringifiedKey(s, k, ...opts), "");
export class ReadonlyPath extends ReadonlyArray {
    // alternate strategy for caching since the base object is frozen
    cache = {};
    constructor(...items) {
        super();
        this.push(...items);
    }
    toJSON() {
        if (this.cache.json)
            return this.cache.json;
        this.cache.json = [];
        for (let i = 0; i < this.length; i++) {
            this.cache.json.push(typeof this[i] === "symbol" ? printable(this[i]) : this[i]);
        }
        return this.cache.json;
    }
    stringify() {
        if (this.cache.stringify)
            return this.cache.stringify;
        return (this.cache.stringify = stringifyPath(this));
    }
    stringifyAncestors() {
        if (this.cache.stringifyAncestors)
            return this.cache.stringifyAncestors;
        let propString = "";
        const result = [propString];
        for (const path of this) {
            propString = appendStringifiedKey(propString, path);
            result.push(propString);
        }
        return (this.cache.stringifyAncestors = result);
    }
}
