import { rgb, hsl, oklch, clampRgb, interpolate, wcagContrast, formatCss, } from 'culori';
import { entries, fromEntries, keys } from '@layerstack/utils';
import { colors, semanticColors, shades, stateColors } from '../theme.js';
export const colorNames = [
    // Semantic & State colors (ex. `priamry`, 'primary-content`, 'primary-100`, ...)
    ...colors.flatMap((color) => [
        color, // default
        `${color}-content`, // text/content
        ...shades.map((shade) => `${color}-${shade}`),
    ]),
    // Surfaces
    'surface-100',
    'surface-200',
    'surface-300',
    'surface-content',
];
/**
 * Generate missing theme colors (if needed), convert names to CSS variables and to a common color space (hsl, oklch, etc)
 */
export function processThemeColors(colors, colorSpace) {
    // TODO: make all semanatic colors optional as well
    // Generate optional semanatic colors
    colors['neutral'] ??= colors['neutral-500'] ?? 'oklch(.355192 .032071 262.988584)';
    // Generate optional state colors
    colors['info'] ??= colors['info-500'] ?? 'oklch(0.7206 0.191 231.6)';
    colors['success'] ??= colors['success-500'] ?? 'oklch(64.8% 0.150 160)';
    colors['warning'] ??= colors['warning-500'] ?? 'oklch(0.8471 0.199 83.87)';
    colors['danger'] ??= colors['danger-500'] ?? 'oklch(0.7176 0.221 22.18)';
    // Generate optional content colors
    for (const color of [...semanticColors, ...stateColors]) {
        // Add `primary` from `primary-500` if not defined in theme (ex. Skeleton)
        colors[color] ??= colors[`${color}-500`];
        colors[`${color}-content`] ??= foregroundColor(colors[color]);
        // Generate color shades (ex. `primary-500`) if not defined.  Useful for Daisy but not Skeleton themes, for example
        for (const shade of shades) {
            const shadeColorName = `${color}-${shade}`;
            if (!(shadeColorName in colors)) {
                // Find the next shade above (shade < 500) or below (shade > 500) and use as reference, if available
                const referenceShade = keys(colors)
                    .map((key) => {
                    const [c, s] = String(key).split('-');
                    return [c, Number(s)];
                })
                    .find(([c, s]) => c === color && (s < 500 ? s > shade : s < shade))?.[1] ?? 500;
                const referenceColor = colors[`${color}-${referenceShade}`] ?? colors[color];
                if (shade < 500) {
                    colors[shadeColorName] ??= lightenColor(referenceColor, (referenceShade - shade) / 1000); // 100 == 0.1
                }
                else if (shade > 500) {
                    colors[shadeColorName] ??= darkenColor(colors[color], (shade - referenceShade) / 1000); // 100 == 0.1
                }
                else {
                    colors[shadeColorName] ??= colors[color];
                }
            }
        }
    }
    // Generate optional surface colors
    colors['surface-100'] ??= 'oklch(100 0 0)';
    colors['surface-200'] ??= darkenColor(colors['surface-100'], 0.07);
    colors['surface-300'] ??= darkenColor(colors['surface-200'], 0.07);
    colors['surface-content'] ??= foregroundColor(colors['surface-100']);
    // Add `color-scheme: "dark"` for `dark` theme (if not set)
    colors['color-scheme'] ??= isDark(colors['surface-content']) ? 'light' : 'dark';
    const result = fromEntries(entries(colors).map(([name, value]) => {
        if (colorNames.includes(String(name))) {
            // Convert each color to common colorspace and add variable
            return [`--color-${name}`, convertColor(value, colorSpace)];
        }
        else {
            // Additional properties such as `color-scheme` or CSS variable
            return [name, value];
        }
    }));
    return result;
}
function round(value, decimals) {
    if (value) {
        return Number(value.toFixed(decimals));
    }
    else {
        return 0;
    }
}
function isDark(color) {
    try {
        if (wcagContrast(color, 'black') < wcagContrast(color, 'white')) {
            return true;
        }
        return false;
    }
    catch (e) {
        return false;
    }
}
/** Lighten or darken color based on contrast of input */
function foregroundColor(color, percentage = 0.8) {
    try {
        return isDark(color) ? lightenColor(color, percentage) : darkenColor(color, percentage);
    }
    catch (e) {
        // console.error('Unable to generate foreground color', color);
    }
}
function lightenColor(color, percentage) {
    try {
        return formatCss(interpolate([color, 'white'], 'oklch')(percentage));
    }
    catch (e) {
        // console.error('Unable to generate lighten color', color);
    }
}
function darkenColor(color, percentage) {
    try {
        return formatCss(interpolate([color, 'black'], 'oklch')(percentage));
    }
    catch (e) {
        // console.error('Unable to generate darken color', color);
    }
}
/**
 * Convert color to space separated components string
 */
export function convertColor(color, colorSpace, decimals = 4) {
    try {
        if (colorSpace === 'rgb') {
            const computedColor = typeof color === 'string' ? rgb(color) : color;
            if (computedColor) {
                const { r, g, b } = computedColor;
                return `rgb(${round(r * 255, decimals)} ${round(g * 255, decimals)} ${round(b * 255, decimals)})`;
            }
        }
        else if (colorSpace === 'hsl') {
            const computedColor = typeof color === 'string' ? hsl(clampRgb(color)) : color;
            if (computedColor) {
                const { h, s, l } = computedColor;
                return `hsl(${round(h ?? 0, decimals)} ${round(s * 100, decimals)}% ${round(l * 100, decimals)}%)`;
            }
        }
        else if (colorSpace === 'oklch') {
            const computedColor = typeof color === 'string' ? oklch(clampRgb(color)) : color;
            if (computedColor) {
                const { l, c, h } = computedColor;
                return `oklch(${round(l, decimals)} ${round(c, decimals)} ${round(h ?? 0, decimals)})`;
            }
        }
    }
    catch (e) {
        // console.error('Unable to convert color object to string', color);
    }
}
/**
 * Process theme to style variables
 */
export function themeStylesString(colors, colorSpace) {
    const styleProperties = processThemeColors(colors, colorSpace);
    return entries(styleProperties)
        .map(([key, value]) => {
        return `${key}: ${value};`;
    })
        .join('\n');
}
