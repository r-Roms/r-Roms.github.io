export const writePrefixedPrivateReferenceMessage = (name) => `Private type references should not include '#'. Use '${name}' instead.`;
export const shallowOptionalMessage = "Optional definitions like 'string?' are only valid as properties in an object or tuple";
export const shallowDefaultableMessage = "Defaultable definitions like 'number = 0' are only valid as properties in an object or tuple";
