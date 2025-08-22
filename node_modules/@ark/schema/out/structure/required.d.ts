import type { BaseErrorContext, declareNode } from "../shared/declare.ts";
import type { NodeErrorContextInput } from "../shared/errors.ts";
import { type nodeImplementationOf } from "../shared/implement.ts";
import { BaseProp, type Prop } from "./prop.ts";
export declare namespace Required {
    interface ErrorContext extends BaseErrorContext<"required"> {
        missingValueDescription: string;
    }
    interface Schema extends Prop.Schema {
    }
    interface Inner extends Prop.Inner {
    }
    type Declaration = declareNode<Prop.Declaration<"required"> & {
        schema: Schema;
        normalizedSchema: Schema;
        inner: Inner;
        errorContext: ErrorContext;
    }>;
    type Node = RequiredNode;
}
export declare class RequiredNode extends BaseProp<"required"> {
    expression: string;
    errorContext: NodeErrorContextInput<"required">;
    compiledErrorContext: string;
}
export declare const Required: {
    implementation: nodeImplementationOf<{
        reducibleTo: "required";
        kind: "required";
        prerequisite: object;
        intersectionIsOpen: true;
        childKind: import("../shared/implement.ts").RootKind;
        schema: Required.Schema;
        normalizedSchema: Required.Schema;
        inner: Required.Inner;
        errorContext: Required.ErrorContext;
    }>;
    Node: typeof RequiredNode;
};
