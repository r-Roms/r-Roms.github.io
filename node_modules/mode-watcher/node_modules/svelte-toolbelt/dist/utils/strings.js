const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
    if (NUMBER_CHAR_RE.test(char))
        return undefined;
    return char !== char.toLowerCase();
}
function splitByCase(str) {
    const parts = [];
    let buff = "";
    let previousUpper;
    let previousSplitter;
    for (const char of str) {
        // Splitter
        const isSplitter = STR_SPLITTERS.includes(char);
        if (isSplitter === true) {
            parts.push(buff);
            buff = "";
            previousUpper = undefined;
            continue;
        }
        const isUpper = isUppercase(char);
        if (previousSplitter === false) {
            // Case rising edge
            if (previousUpper === false && isUpper === true) {
                parts.push(buff);
                buff = char;
                previousUpper = isUpper;
                continue;
            }
            // Case falling edge
            if (previousUpper === true && isUpper === false && buff.length > 1) {
                const lastChar = buff.at(-1);
                parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
                buff = lastChar + char;
                previousUpper = isUpper;
                continue;
            }
        }
        // Normal char
        buff += char;
        previousUpper = isUpper;
        previousSplitter = isSplitter;
    }
    parts.push(buff);
    return parts;
}
export function pascalCase(str) {
    if (!str)
        return "";
    return splitByCase(str)
        .map((p) => upperFirst(p))
        .join("");
}
export function camelCase(str) {
    return lowerFirst(pascalCase(str || ""));
}
export function kebabCase(str) {
    return str
        ? splitByCase(str)
            .map((p) => p.toLowerCase())
            .join("-")
        : "";
}
function upperFirst(str) {
    return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function lowerFirst(str) {
    return str ? str[0].toLowerCase() + str.slice(1) : "";
}
