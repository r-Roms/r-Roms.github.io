import { compileObjectLiteral, implementNode } from "../shared/implement.js";
import { BaseProp, intersectProps } from "./prop.js";
const implementation = implementNode({
    kind: "required",
    hasAssociatedError: true,
    intersectionIsOpen: true,
    keys: {
        key: {},
        value: {
            child: true,
            parse: (schema, ctx) => ctx.$.parseSchema(schema)
        }
    },
    normalize: schema => schema,
    defaults: {
        description: node => `${node.compiledKey}: ${node.value.description}`,
        expected: ctx => ctx.missingValueDescription,
        actual: () => "missing"
    },
    intersections: {
        required: intersectProps,
        optional: intersectProps
    }
});
export class RequiredNode extends BaseProp {
    expression = `${this.compiledKey}: ${this.value.expression}`;
    errorContext = Object.freeze({
        code: "required",
        missingValueDescription: this.value.defaultShortDescription,
        relativePath: [this.key],
        meta: this.meta
    });
    compiledErrorContext = compileObjectLiteral(this.errorContext);
}
export const Required = {
    implementation,
    Node: RequiredNode
};
