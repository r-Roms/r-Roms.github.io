import { deepClone, envHasCsp, flatMorph, withAlphabetizedKeys } from "@ark/util";
import { mergeConfigs } from "./config.js";
import { Predicate } from "./predicate.js";
import { Divisor } from "./refinements/divisor.js";
import { boundClassesByKind, boundImplementationsByKind } from "./refinements/kinds.js";
import { Pattern } from "./refinements/pattern.js";
import { Alias } from "./roots/alias.js";
import { Domain } from "./roots/domain.js";
import { Intersection } from "./roots/intersection.js";
import { Morph } from "./roots/morph.js";
import { Proto } from "./roots/proto.js";
import { Union } from "./roots/union.js";
import { Unit } from "./roots/unit.js";
import { $ark } from "./shared/registry.js";
import { ToJsonSchema } from "./shared/toJsonSchema.js";
import { Index } from "./structure/index.js";
import { Optional } from "./structure/optional.js";
import { Required } from "./structure/required.js";
import { Sequence } from "./structure/sequence.js";
import { Structure } from "./structure/structure.js";
export const nodeImplementationsByKind = {
    ...boundImplementationsByKind,
    alias: Alias.implementation,
    domain: Domain.implementation,
    unit: Unit.implementation,
    proto: Proto.implementation,
    union: Union.implementation,
    morph: Morph.implementation,
    intersection: Intersection.implementation,
    divisor: Divisor.implementation,
    pattern: Pattern.implementation,
    predicate: Predicate.implementation,
    required: Required.implementation,
    optional: Optional.implementation,
    index: Index.implementation,
    sequence: Sequence.implementation,
    structure: Structure.implementation
};
$ark.defaultConfig = withAlphabetizedKeys(Object.assign(flatMorph(nodeImplementationsByKind, (kind, implementation) => [
    kind,
    implementation.defaults
]), {
    jitless: envHasCsp(),
    clone: deepClone,
    onUndeclaredKey: "ignore",
    exactOptionalPropertyTypes: true,
    numberAllowsNaN: false,
    dateAllowsInvalid: false,
    onFail: null,
    keywords: {},
    toJsonSchema: ToJsonSchema.defaultConfig
}));
$ark.resolvedConfig = mergeConfigs($ark.defaultConfig, $ark.config);
export const nodeClassesByKind = {
    ...boundClassesByKind,
    alias: Alias.Node,
    domain: Domain.Node,
    unit: Unit.Node,
    proto: Proto.Node,
    union: Union.Node,
    morph: Morph.Node,
    intersection: Intersection.Node,
    divisor: Divisor.Node,
    pattern: Pattern.Node,
    predicate: Predicate.Node,
    required: Required.Node,
    optional: Optional.Node,
    index: Index.Node,
    sequence: Sequence.Node,
    structure: Structure.Node
};
