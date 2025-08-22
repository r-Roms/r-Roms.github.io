import crimson from './crimson.js';
import goldNouveau from './gold-nouveau.js';
import hamlindigo from './hamlindigo.js';
import modern from './modern.js';
import rocket from './rocket.js';
import sahara from './sahara.js';
import seafoam from './seafoam.js';
import skeleton from './skeleton.js';
import vintage from './vintage.js';
import wintry from './wintry.js';
export const themes = {
    crimson,
    'gold-nouveau': goldNouveau,
    hamlindigo,
    modern,
    rocket,
    sahara,
    seafoam,
    skeleton,
    vintage,
    wintry,
};
export function getThemeProperties(themeName) {
    return themes[themeName].properties;
}
