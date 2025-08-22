declare class CustomTheme {
    #private;
    constructor();
    /**
     * The current theme.
     * @returns The current theme.
     */
    get current(): string;
    /**
     * Set the current theme.
     * @param newValue The new theme to set.
     */
    set current(newValue: string);
}
/**
 * A custom theme to apply and persist to the root `html` element.
 */
export declare const customTheme: CustomTheme;
export {};
