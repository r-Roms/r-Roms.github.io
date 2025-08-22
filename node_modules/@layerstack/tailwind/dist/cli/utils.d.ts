import { type Color } from 'culori';
export type SupportedColorSpace = 'rgb' | 'hsl' | 'oklch';
export type Colors = Record<string, string>;
export declare const colorNames: string[];
/**
 * Generate missing theme colors (if needed), convert names to CSS variables and to a common color space (hsl, oklch, etc)
 */
export declare function processThemeColors(colors: Colors, colorSpace: SupportedColorSpace): any;
/**
 * Convert color to space separated components string
 */
export declare function convertColor(color: Color | string, colorSpace: SupportedColorSpace, decimals?: number): string | undefined;
/**
 * Process theme to style variables
 */
export declare function themeStylesString(colors: Colors, colorSpace: SupportedColorSpace): any;
//# sourceMappingURL=utils.d.ts.map