export const capitalize = (s) => (s[0].toUpperCase() + s.slice(1));
export const uncapitalize = (s) => (s[0].toLowerCase() + s.slice(1));
export const anchoredRegex = (regex) => new RegExp(anchoredSource(regex), typeof regex === "string" ? "" : regex.flags);
export const deanchoredRegex = (regex) => new RegExp(deanchoredSource(regex), typeof regex === "string" ? "" : regex.flags);
export const anchoredSource = (regex) => {
    const source = typeof regex === "string" ? regex : regex.source;
    return `^(?:${source})$`;
};
export const deanchoredSource = (regex) => {
    const source = typeof regex === "string" ? regex : regex.source;
    if (source.startsWith("^(?:") && source.endsWith(")$"))
        return source.slice(4, -2);
    return source.slice(source[0] === "^" ? 1 : 0, source.at(-1) === "$" ? -1 : undefined);
};
export const RegexPatterns = {
    negativeLookahead: (pattern) => `(?!${pattern})`,
    nonCapturingGroup: (pattern) => `(?:${pattern})`
};
export const escapeChar = "\\";
export const whitespaceChars = {
    " ": 1,
    "\n": 1,
    "\t": 1
};
export const emojiToUnicode = (emoji) => emoji
    .split("")
    .map(char => {
    const codePoint = char.codePointAt(0);
    return codePoint ? `\\u${codePoint.toString(16).padStart(4, "0")}` : "";
})
    .join("");
