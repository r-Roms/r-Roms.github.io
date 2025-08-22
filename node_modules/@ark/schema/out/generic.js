import { Callable, flatMorph, snapshot, throwParseError } from "@ark/util";
import { $ark } from "./shared/registry.js";
import { arkKind } from "./shared/utils.js";
export const parseGeneric = (paramDefs, bodyDef, $) => new GenericRoot(paramDefs, bodyDef, $, $, null);
export class LazyGenericBody extends Callable {
}
export class GenericRoot extends Callable {
    [arkKind] = "generic";
    paramDefs;
    bodyDef;
    $;
    arg$;
    baseInstantiation;
    hkt;
    description;
    constructor(paramDefs, bodyDef, $, arg$, hkt) {
        super((...args) => {
            const argNodes = flatMorph(this.names, (i, name) => {
                const arg = this.arg$.parse(args[i]);
                if (!arg.extends(this.constraints[i])) {
                    throwParseError(writeUnsatisfiedParameterConstraintMessage(name, this.constraints[i].expression, arg.expression));
                }
                return [name, arg];
            });
            if (this.defIsLazy()) {
                const def = this.bodyDef(argNodes);
                return this.$.parse(def);
            }
            return this.$.parse(bodyDef, { args: argNodes });
        });
        this.paramDefs = paramDefs;
        this.bodyDef = bodyDef;
        this.$ = $;
        this.arg$ = arg$;
        this.hkt = hkt;
        this.description =
            hkt ?
                (new hkt().description ?? `a generic type for ${hkt.constructor.name}`)
                : "a generic type";
        this.baseInstantiation = this(...this.constraints);
    }
    defIsLazy() {
        return this.bodyDef instanceof LazyGenericBody;
    }
    cacheGetter(name, value) {
        Object.defineProperty(this, name, { value });
        return value;
    }
    get json() {
        return this.cacheGetter("json", {
            params: this.params.map(param => param[1].isUnknown() ? param[0] : [param[0], param[1].json]),
            body: snapshot(this.bodyDef)
        });
    }
    get params() {
        return this.cacheGetter("params", this.paramDefs.map(param => typeof param === "string" ?
            [param, $ark.intrinsic.unknown]
            : [param[0], this.$.parse(param[1])]));
    }
    get names() {
        return this.cacheGetter("names", this.params.map(e => e[0]));
    }
    get constraints() {
        return this.cacheGetter("constraints", this.params.map(e => e[1]));
    }
    get internal() {
        return this;
    }
    get referencesById() {
        return this.baseInstantiation.internal.referencesById;
    }
    get references() {
        return this.baseInstantiation.internal.references;
    }
}
export const writeUnsatisfiedParameterConstraintMessage = (name, constraint, arg) => `${name} must be assignable to ${constraint} (was ${arg})`;
