import { entries } from './typeHelpers.js';
// any combination of spaces and punctuation characters - http://stackoverflow.com/a/25575009
const wordSeparatorsRegEx = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;
const uppercaseChars = '[A-Z\u00C0-\u00DC\u00D9-\u00DD]'; // includes accented characters
const capitalsRegEx = new RegExp(uppercaseChars, 'g');
const allCapitalsRegEx = new RegExp(`^${uppercaseChars}+$`);
const camelCaseRegEx = /^[a-z\u00E0-\u00FCA-Z\u00C0-\u00DC][\d|a-z\u00E0-\u00FCA-Z\u00C0-\u00DC]*$/;
/**
 * Check if str only contians upper case letters
 */
export function isUpperCase(str) {
    return /^[A-Z ]*$/.test(str);
}
/**
 * Returns string with the first letter of each word converted to uppercase (and remainder as lowercase)
 */
export function toTitleCase(str, ignore = ['a', 'an', 'is', 'the']) {
    const withSpaces = isUpperCase(str) ? str : str.replace(/([A-Z])/g, ' $1').trim();
    return withSpaces
        .split(wordSeparatorsRegEx)
        .map((word, index) => {
        if (index !== 0 && ignore.includes(word)) {
            return word;
        }
        else {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
    })
        .join(' ');
}
/** Convert string to camel case */
export function toCamelCase(str) {
    const words = str.split(wordSeparatorsRegEx);
    return words
        .map((word, i) => {
        if (word === '') {
            return '';
        }
        const isCamelCase = camelCaseRegEx.test(word) && !allCapitalsRegEx.test(word);
        let firstLetter = word[0];
        firstLetter = i > 0 ? firstLetter.toUpperCase() : firstLetter.toLowerCase();
        return firstLetter + (!isCamelCase ? word.slice(1).toLowerCase() : word.slice(1));
    })
        .join('');
}
/** Convert string to snake case */
export function toSnakeCase(str) {
    // Replace capitals with space + lower case equivalent for later parsing
    return str
        .replace(capitalsRegEx, (match) => ' ' + (match.toLowerCase() || match))
        .split(wordSeparatorsRegEx)
        .join('_');
}
/** Convert string to kebab case */
export function toKebabCase(str) {
    return str
        .replace(capitalsRegEx, (match) => '-' + (match.toLowerCase() || match))
        .split(wordSeparatorsRegEx)
        .join('-');
}
/** Convert string to pascal case */
export function toPascalCase(str) {
    return (str
        .split(wordSeparatorsRegEx)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        // .map((word) => toTitleCase(word, []))
        .join(''));
}
/** Get the roman numeral for the given value */
export function romanize(value) {
    const lookup = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };
    let result = '';
    for (let [numeral, numeralValue] of entries(lookup)) {
        while (value >= numeralValue) {
            result += numeral;
            value -= numeralValue;
        }
    }
    return result;
}
/**
 * Truncate text with option to keep a number of characters on end.  Inserts ellipsis between parts
 */
export function truncate(text, totalChars, endChars = 0) {
    endChars = Math.min(endChars, totalChars);
    const start = text.slice(0, totalChars - endChars);
    const end = endChars > 0 ? text.slice(-endChars) : '';
    if (start.length + end.length < text.length) {
        return start + '…' + end;
    }
    else {
        return text;
    }
}
/**
 * Generates a unique Id, with prefix if provided
 */
const idMap = new Map();
export function uniqueId(prefix = '') {
    let id = (idMap.get(prefix) ?? 0) + 1;
    idMap.set(prefix, id);
    return prefix + id;
}
