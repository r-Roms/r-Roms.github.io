import { compileObjectLiteral } from "../shared/implement.js";
import { BaseRoot } from "./root.js";
export class InternalBasis extends BaseRoot {
    traverseApply = (data, ctx) => {
        if (!this.traverseAllows(data, ctx))
            ctx.errorFromNodeContext(this.errorContext);
    };
    get errorContext() {
        return {
            code: this.kind,
            description: this.description,
            meta: this.meta,
            ...this.inner
        };
    }
    get compiledErrorContext() {
        return compileObjectLiteral(this.errorContext);
    }
    compile(js) {
        if (js.traversalKind === "Allows")
            js.return(this.compiledCondition);
        else {
            js.if(this.compiledNegation, () => js.line(`${js.ctx}.errorFromNodeContext(${this.compiledErrorContext})`));
        }
    }
}
