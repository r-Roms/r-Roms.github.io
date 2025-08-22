import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { format } from 'prettier';
import { entries } from '@layerstack/utils';
import { mapKeys } from '@layerstack/utils/object';
import { colorNames, themeStylesString } from './utils.js';
import { themes as daisyThemes } from './daisy.js';
import { themes as skeletonThemes } from './skeleton.js';
/**
 * Build theme CSS variables
 */
function buildThemeCss(colorSpace) {
    let result = [];
    result.push('@theme {');
    // Register theme colors variables with placeholder values
    colorNames.forEach((color) => {
        result.push(`--color-${color}: ${colorSpace}(0 0 0);`);
    });
    result.push('}');
    return format(result.join('\n'), { parser: 'css' });
}
/**
 * Build themes as CSS files
 */
async function buildThemesCss(themes, colorSpace) {
    let result = [];
    let rootThemeName = '';
    entries(themes).map(([themeName, themeColors], index) => {
        if (index === 0) {
            // Root / default theme
            result.push(`:root { ${themeStylesString(themeColors, colorSpace)} }`);
            rootThemeName = themeName;
        }
        else if (index === 1) {
            // Dark theme
            result.push(`@media (prefers-color-scheme: dark) {
        :root { ${themeStylesString(themeColors, colorSpace)} }
      }`);
            // Also register first and second theme by name AFTER @media for precedence
            result.push(`[data-theme=${rootThemeName}] { ${themeStylesString(themes[rootThemeName], colorSpace)} }`);
            result.push(`[data-theme=${themeName}] { ${themeStylesString(themeColors, colorSpace)} }`);
        }
        else {
            result.push(`[data-theme=${themeName}] { ${themeStylesString(themeColors, colorSpace)} }`);
        }
    });
    return format(result.join('\n\n'), { parser: 'css' });
}
function writeFile(filePath, data) {
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, data);
    console.log(`Wrote ${filePath}`);
}
const daisyCss = await buildThemesCss(daisyThemes, 'hsl');
writeFile('src/lib/css/themes/generated/daisy.css', daisyCss);
const skeletonCss = await buildThemesCss(skeletonThemes, 'hsl');
writeFile('src/lib/css/themes/generated/skeleton.css', skeletonCss);
const allThemes = {
    ...daisyThemes,
    ...mapKeys(skeletonThemes, (key) => key === 'light' ? 'skeleton-light' : key === 'dark' ? 'skeleton-dark' : key),
};
const allThemesCss = await buildThemesCss(allThemes, 'hsl');
writeFile('src/lib/css/themes/generated/all.css', allThemesCss);
