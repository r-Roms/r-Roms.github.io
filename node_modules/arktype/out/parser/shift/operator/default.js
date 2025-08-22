export const parseDefault = (s) => {
    // store the node that will be bounded
    const baseNode = s.unsetRoot();
    s.parseOperand();
    const defaultNode = s.unsetRoot();
    // after parsing the next operand, use the locations to get the
    // token from which it was parsed
    if (!defaultNode.hasKind("unit"))
        return s.error(writeNonLiteralDefaultMessage(defaultNode.expression));
    const defaultValue = defaultNode.unit instanceof Date ?
        () => new Date(defaultNode.unit)
        : defaultNode.unit;
    return [baseNode, "=", defaultValue];
};
export const writeNonLiteralDefaultMessage = (defaultDef) => `Default value '${defaultDef}' must a literal value`;
