/** Shallowly copy the properties of the object. */
export declare const shallowClone: <input extends object>(input: input) => input;
/** Deeply copy the properties of the a non-subclassed Object, Array or Date.*/
export declare const deepClone: <input extends object>(input: input) => input;
