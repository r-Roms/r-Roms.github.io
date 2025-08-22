export declare const semanticColors: readonly ["primary", "secondary", "accent", "neutral"];
export declare const stateColors: readonly ["info", "success", "warning", "danger"];
export declare const colors: ("accent" | "success" | "primary" | "secondary" | "neutral" | "info" | "warning" | "danger")[];
export declare const shades: number[];
/**
 * Get themes names from css file (`[data-theme="..."]`) split into `light` and `dark` collections determined by `color-scheme` property
 */
export declare function getThemeNames(cssContent: string): {
    light: string[];
    dark: string[];
};
/** Return a script tag that will set the initial theme from localStorage. This allows setting
 * the theme before anything starts rendering, even when SSR is in use.
 *
 * This feels a bit weird compared to just placing the function directly in svelte:head,
 * but it's the only way to inject the `darkThemes` array into the function.
 **/
export declare function createHeadSnippet(darkThemes: string[]): string;
//# sourceMappingURL=theme.d.ts.map