import daisyThemes from 'daisyui/src/theming/themes.js';
// import { themeOrder } from 'daisyui/src/theming/themeDefaults'; // breaks build
import { entries, fromEntries, sortFunc } from '@layerstack/utils';
const themeNames = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
];
const daisyColorMap = {
    'base-100': 'surface-100',
    'base-200': 'surface-200',
    'base-300': 'surface-300',
    'base-content': 'surface-content',
    error: 'danger',
    'error-content': 'danger-content',
};
/**
 *  Map Daisy UI color names to LayerStack names, and sort themes
 */
function mapColorsName(themes, colorMap) {
    let themesGeneric = themes;
    let colorMapGeneric = colorMap;
    return fromEntries(entries(themesGeneric)
        .map(([themeName, colors]) => {
        const mappedColors = fromEntries(entries(colors).map(([key, value]) => {
            return [colorMapGeneric[key] ?? key, value];
        }));
        return [themeName, mappedColors];
    })
        .sort(sortFunc(([themeName]) => themeNames.indexOf(themeName))));
}
const themes = mapColorsName(daisyThemes, daisyColorMap);
export { themes };
