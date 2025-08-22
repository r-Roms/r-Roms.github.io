export const hasDomain = (data, kind) => domainOf(data) === kind;
export const domainOf = (data) => {
    const builtinType = typeof data;
    return (builtinType === "object" ?
        data === null ?
            "null"
            : "object"
        : builtinType === "function" ? "object"
            : builtinType);
};
/** Each domain's completion for the phrase "must be _____" */
export const domainDescriptions = {
    boolean: "boolean",
    null: "null",
    undefined: "undefined",
    bigint: "a bigint",
    number: "a number",
    object: "an object",
    string: "a string",
    symbol: "a symbol"
};
export const jsTypeOfDescriptions = {
    ...domainDescriptions,
    function: "a function"
};
