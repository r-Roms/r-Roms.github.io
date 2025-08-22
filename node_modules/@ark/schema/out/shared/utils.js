import { flatMorph, isArray, noSuggest } from "@ark/util";
export const makeRootAndArrayPropertiesMutable = (o) => 
// this cast should not be required, but it seems TS is referencing
// the wrong parameters here?
flatMorph(o, (k, v) => [k, isArray(v) ? [...v] : v]);
export const arkKind = noSuggest("arkKind");
export const hasArkKind = (value, kind) => value?.[arkKind] === kind;
export const isNode = (value) => hasArkKind(value, "root") || hasArkKind(value, "constraint");
