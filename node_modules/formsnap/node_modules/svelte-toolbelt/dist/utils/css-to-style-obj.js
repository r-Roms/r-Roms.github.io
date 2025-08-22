import parse from "style-to-object";
import { camelCase, pascalCase } from "./strings.js";
export function cssToStyleObj(css) {
    if (!css)
        return {};
    const styleObj = {};
    function iterator(name, value) {
        if (name.startsWith("-moz-") ||
            name.startsWith("-webkit-") ||
            name.startsWith("-ms-") ||
            name.startsWith("-o-")) {
            styleObj[pascalCase(name)] = value;
            return;
        }
        if (name.startsWith("--")) {
            styleObj[name] = value;
            return;
        }
        styleObj[camelCase(name)] = value;
    }
    parse(css, iterator);
    return styleObj;
}
