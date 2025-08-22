import { writeUnclosedGroupMessage } from "../../reduce/shared.js";
export const parseGenericArgs = (name, g, s) => _parseGenericArgs(name, g, s, []);
const _parseGenericArgs = (name, g, s, argNodes) => {
    const argState = s.parseUntilFinalizer();
    argNodes.push(argState.root);
    if (argState.finalizer === ">") {
        if (argNodes.length !== g.params.length) {
            return s.error(writeInvalidGenericArgCountMessage(name, g.names, argNodes.map(arg => arg.expression)));
        }
        return argNodes;
    }
    if (argState.finalizer === ",")
        return _parseGenericArgs(name, g, s, argNodes);
    return argState.error(writeUnclosedGroupMessage(">"));
};
export const writeInvalidGenericArgCountMessage = (name, params, argDefs) => `${name}<${params.join(", ")}> requires exactly ${params.length} args (got ${argDefs.length}${argDefs.length === 0 ? "" : `: ${argDefs.join(", ")}`})`;
