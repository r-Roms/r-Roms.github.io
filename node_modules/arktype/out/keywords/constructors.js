import { ecmascriptConstructors, flatMorph, platformConstructors } from "@ark/util";
import { Scope } from "../scope.js";
import { arkArray } from "./Array.js";
import { arkFormData } from "./FormData.js";
import { TypedArray } from "./TypedArray.js";
const omittedPrototypes = {
    Boolean: 1,
    Number: 1,
    String: 1
};
export const arkPrototypes = Scope.module({
    ...flatMorph({ ...ecmascriptConstructors, ...platformConstructors }, (k, v) => (k in omittedPrototypes ? [] : [k, ["instanceof", v]])),
    Array: arkArray,
    TypedArray,
    FormData: arkFormData
});
