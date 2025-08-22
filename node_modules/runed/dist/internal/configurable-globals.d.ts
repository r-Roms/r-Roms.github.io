export type ConfigurableWindow = {
    /** Provide a custom `window` object to use in place of the global `window` object. */
    window?: typeof globalThis & Window;
};
export type ConfigurableDocument = {
    /** Provide a custom `document` object to use in place of the global `document` object. */
    document?: Document;
};
export type ConfigurableDocumentOrShadowRoot = {
    document?: DocumentOrShadowRoot;
};
export type ConfigurableNavigator = {
    /** Provide a custom `navigator` object to use in place of the global `navigator` object. */
    navigator?: Navigator;
};
export type ConfigurableLocation = {
    /** Provide a custom `location` object to use in place of the global `location` object. */
    location?: Location;
};
export declare const defaultWindow: (Window & typeof globalThis) | undefined;
export declare const defaultDocument: Document | undefined;
export declare const defaultNavigator: Navigator | undefined;
export declare const defaultLocation: Location | undefined;
