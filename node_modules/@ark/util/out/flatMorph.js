import { append } from "./arrays.js";
export const flatMorph = (o, flatMapEntry) => {
    const result = {};
    const inputIsArray = Array.isArray(o);
    let outputShouldBeArray = false;
    for (const [i, entry] of Object.entries(o).entries()) {
        const mapped = inputIsArray ? flatMapEntry(i, entry[1]) : flatMapEntry(...entry, i);
        outputShouldBeArray ||= typeof mapped[0] === "number";
        const flattenedEntries = Array.isArray(mapped[0]) || mapped.length === 0 ?
            // if we have an empty array (for filtering) or an array with
            // another array as its first element, treat it as a list
            mapped
            // otherwise, it should be a single entry, so nest it in a tuple
            // so it doesn't get spread when the result is flattened
            : [mapped];
        for (const [k, v] of flattenedEntries) {
            if (typeof k === "object")
                result[k.group] = append(result[k.group], v);
            else
                result[k] = v;
        }
    }
    return outputShouldBeArray ? Object.values(result) : result;
};
