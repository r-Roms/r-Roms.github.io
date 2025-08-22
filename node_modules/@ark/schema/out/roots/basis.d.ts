import type { NodeCompiler } from "../shared/compile.ts";
import type { TraverseApply } from "../shared/traversal.ts";
import { BaseRoot, type InternalRootDeclaration } from "./root.ts";
export declare abstract class InternalBasis<d extends InternalRootDeclaration = InternalRootDeclaration> extends BaseRoot<d> {
    abstract compiledCondition: string;
    abstract compiledNegation: string;
    structure: undefined;
    traverseApply: TraverseApply<d["prerequisite"]>;
    get errorContext(): d["errorContext"];
    get compiledErrorContext(): string;
    compile(js: NodeCompiler): void;
}
