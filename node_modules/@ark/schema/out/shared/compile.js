import { CastableBase, DynamicFunction, hasDomain, isDotAccessible, serializePrimitive } from "@ark/util";
import { registeredReference } from "./registry.js";
export class CompiledFunction extends CastableBase {
    argNames;
    body = "";
    constructor(...args) {
        super();
        this.argNames = args;
        for (const arg of args) {
            if (arg in this) {
                throw new Error(`Arg name '${arg}' would overwrite an existing property on FunctionBody`);
            }
            ;
            this[arg] = arg;
        }
    }
    indentation = 0;
    indent() {
        this.indentation += 4;
        return this;
    }
    dedent() {
        this.indentation -= 4;
        return this;
    }
    prop(key, optional = false) {
        return compileLiteralPropAccess(key, optional);
    }
    index(key, optional = false) {
        return indexPropAccess(`${key}`, optional);
    }
    line(statement) {
        ;
        this.body += `${" ".repeat(this.indentation)}${statement}\n`;
        return this;
    }
    const(identifier, expression) {
        this.line(`const ${identifier} = ${expression}`);
        return this;
    }
    let(identifier, expression) {
        return this.line(`let ${identifier} = ${expression}`);
    }
    set(identifier, expression) {
        return this.line(`${identifier} = ${expression}`);
    }
    if(condition, then) {
        return this.block(`if (${condition})`, then);
    }
    elseIf(condition, then) {
        return this.block(`else if (${condition})`, then);
    }
    else(then) {
        return this.block("else", then);
    }
    /** Current index is "i" */
    for(until, body, initialValue = 0) {
        return this.block(`for (let i = ${initialValue}; ${until}; i++)`, body);
    }
    /** Current key is "k" */
    forIn(object, body) {
        return this.block(`for (const k in ${object})`, body);
    }
    block(prefix, contents, suffix = "") {
        this.line(`${prefix} {`);
        this.indent();
        contents(this);
        this.dedent();
        return this.line(`}${suffix}`);
    }
    return(expression = "") {
        return this.line(`return ${expression}`);
    }
    write(name = "anonymous", indent = 0) {
        return `${name}(${this.argNames.join(", ")}) { ${indent ?
            this.body
                .split("\n")
                .map(l => " ".repeat(indent) + `${l}`)
                .join("\n")
            : this.body} }`;
    }
    compile() {
        return new DynamicFunction(...this.argNames, this.body);
    }
}
export const compileSerializedValue = (value) => hasDomain(value, "object") || typeof value === "symbol" ?
    registeredReference(value)
    : serializePrimitive(value);
export const compileLiteralPropAccess = (key, optional = false) => {
    if (typeof key === "string" && isDotAccessible(key))
        return `${optional ? "?" : ""}.${key}`;
    return indexPropAccess(serializeLiteralKey(key), optional);
};
export const serializeLiteralKey = (key) => typeof key === "symbol" ? registeredReference(key) : JSON.stringify(key);
export const indexPropAccess = (key, optional = false) => `${optional ? "?." : ""}[${key}]`;
export class NodeCompiler extends CompiledFunction {
    traversalKind;
    optimistic;
    constructor(ctx) {
        super("data", "ctx");
        this.traversalKind = ctx.kind;
        this.optimistic = ctx.optimistic === true;
    }
    invoke(node, opts) {
        const arg = opts?.arg ?? this.data;
        const requiresContext = typeof node === "string" ? true : this.requiresContextFor(node);
        const id = typeof node === "string" ? node : node.id;
        if (requiresContext)
            return `${this.referenceToId(id, opts)}(${arg}, ${this.ctx})`;
        return `${this.referenceToId(id, opts)}(${arg})`;
    }
    referenceToId(id, opts) {
        const invokedKind = opts?.kind ?? this.traversalKind;
        const base = `this.${id}${invokedKind}`;
        return opts?.bind ? `${base}.bind(${opts?.bind})` : base;
    }
    requiresContextFor(node) {
        return this.traversalKind === "Apply" || node.allowsRequiresContext;
    }
    initializeErrorCount() {
        return this.const("errorCount", "ctx.currentErrorCount");
    }
    returnIfFail() {
        return this.if("ctx.currentErrorCount > errorCount", () => this.return());
    }
    returnIfFailFast() {
        return this.if("ctx.failFast && ctx.currentErrorCount > errorCount", () => this.return());
    }
    traverseKey(keyExpression, accessExpression, node) {
        const requiresContext = this.requiresContextFor(node);
        if (requiresContext)
            this.line(`${this.ctx}.path.push(${keyExpression})`);
        this.check(node, {
            arg: accessExpression
        });
        if (requiresContext)
            this.line(`${this.ctx}.path.pop()`);
        return this;
    }
    check(node, opts) {
        return this.traversalKind === "Allows" ?
            this.if(`!${this.invoke(node, opts)}`, () => this.return(false))
            : this.line(this.invoke(node, opts));
    }
}
