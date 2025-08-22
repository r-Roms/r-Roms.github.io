import { noSuggest } from "./errors.js";
export const brand = noSuggest("brand");
export const narrow = (t) => t;
/** primitive key used to represent an inferred type at compile-time */
export const inferred = noSuggest("arkInferred");
