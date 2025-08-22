import { DynamicBase, flatMorph } from "@ark/util";
import { arkKind, hasArkKind } from "./shared/utils.js";
export class RootModule extends DynamicBase {
    // ensure `[arkKind]` is non-enumerable so it doesn't get spread on import/export
    get [arkKind]() {
        return "module";
    }
}
export const bindModule = (module, $) => new RootModule(flatMorph(module, (alias, value) => [
    alias,
    hasArkKind(value, "module") ?
        bindModule(value, $)
        : $.bindReference(value)
]));
export const SchemaModule = RootModule;
