import { intrinsic } from "@ark/schema";
import { Callable, domainOf, throwParseError } from "@ark/util";
export class InternalMatchParser extends Callable {
    $;
    constructor($) {
        super((...args) => new InternalChainedMatchParser($)(...args), {
            bind: $
        });
        this.$ = $;
    }
    in(def) {
        return new InternalChainedMatchParser(this.$, def === undefined ? undefined : this.$.parse(def));
    }
    at(key, cases) {
        return new InternalChainedMatchParser(this.$).at(key, cases);
    }
    case(when, then) {
        return new InternalChainedMatchParser(this.$).case(when, then);
    }
}
export class InternalChainedMatchParser extends Callable {
    $;
    in;
    key;
    branches = [];
    constructor($, In) {
        super(cases => this.caseEntries(Object.entries(cases).map(([k, v]) => k === "default" ? [k, v] : [this.$.parse(k), v])));
        this.$ = $;
        this.in = In;
    }
    at(key, cases) {
        if (this.key)
            throwParseError(doubleAtMessage);
        if (this.branches.length)
            throwParseError(chainedAtMessage);
        this.key = key;
        return cases ? this.match(cases) : this;
    }
    case(def, resolver) {
        return this.caseEntry(this.$.parse(def), resolver);
    }
    caseEntry(node, resolver) {
        const wrappableNode = this.key ? this.$.parse({ [this.key]: node }) : node;
        const branch = wrappableNode.pipe(resolver);
        this.branches.push(branch);
        return this;
    }
    match(cases) {
        return this(cases);
    }
    strings(cases) {
        return this.caseEntries(Object.entries(cases).map(([k, v]) => k === "default" ?
            [k, v]
            : [this.$.node("unit", { unit: k }), v]));
    }
    caseEntries(entries) {
        for (let i = 0; i < entries.length; i++) {
            const [k, v] = entries[i];
            if (k === "default") {
                if (i !== entries.length - 1) {
                    throwParseError(`default may only be specified as the last key of a switch definition`);
                }
                return this.default(v);
            }
            if (typeof v !== "function") {
                return throwParseError(`Value for case "${k}" must be a function (was ${domainOf(v)})`);
            }
            this.caseEntry(k, v);
        }
        return this;
    }
    default(defaultCase) {
        if (typeof defaultCase === "function")
            this.case(intrinsic.unknown, defaultCase);
        const schema = {
            branches: this.branches,
            ordered: true
        };
        if (defaultCase === "never" || defaultCase === "assert")
            schema.meta = { onFail: throwOnDefault };
        const cases = this.$.node("union", schema);
        if (!this.in)
            return this.$.finalize(cases);
        let inputValidatedCases = this.in.pipe(cases);
        if (defaultCase === "never" || defaultCase === "assert") {
            inputValidatedCases = inputValidatedCases.configureReferences({
                onFail: throwOnDefault
            }, "self");
        }
        return this.$.finalize(inputValidatedCases);
    }
}
export const throwOnDefault = errors => errors.throw();
export const chainedAtMessage = `A key matcher must be specified before the first case i.e. match.at('foo') or match.in<object>().at('bar')`;
export const doubleAtMessage = `At most one key matcher may be specified per expression`;
