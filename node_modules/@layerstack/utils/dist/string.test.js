import { describe, test, expect } from 'vitest';
import { isUpperCase, romanize, toCamelCase, toKebabCase, toPascalCase, toSnakeCase, toTitleCase, truncate, } from './string.js';
describe('isUpperCase()', () => {
    test.each([
        ['A', true],
        ['a', false],
        ['THE QUICK BROWN FOX', true],
        ['the quick brown fox', false],
        ['The Quick Brown Fox', false],
        ['The quick brown fox', false],
    ])('isUpperCase(%s) => %s', (original, expected) => {
        expect(isUpperCase(original)).equal(expected);
    });
});
describe('toTitleCase()', () => {
    test.each([
        ['A long time ago', 'A Long Time Ago'], // sentence
        ['the quick brown fox', 'The Quick Brown Fox'], //  lower case
        ['THE QUICK BROWN FOX', 'The Quick Brown Fox'], //  upper case
        ['the_quick_brown_fox', 'The Quick Brown Fox'], // snake case
        ['the-quick-brown-fox', 'The Quick Brown Fox'], // kebab case
        ['theQuickBrownFox', 'The Quick Brown Fox'], // pascal case
        ['the - quick * brown# fox', 'The Quick Brown Fox'], // punctuation
    ])('toTitleCase(%s) => %s', (original, expected) => {
        expect(toTitleCase(original)).equal(expected);
    });
});
describe('toCamelCase()', () => {
    test.each([
        ['the quick brown fox', 'theQuickBrownFox'], // lower case
        ['the_quick_brown_fox', 'theQuickBrownFox'], // snake case
        ['the-quick-brown-fox', 'theQuickBrownFox'], // kebab case
        ['THE-QUICK-BROWN-FOX', 'theQuickBrownFox'], // snake case (all caps)
        ['theQuickBrownFox', 'theQuickBrownFox'], // pascal case
        ['thequickbrownfox', 'thequickbrownfox'], // lowercase
        ['the - quick * brown# fox', 'theQuickBrownFox'], // punctuation
        ['behold theQuickBrownFox', 'beholdTheQuickBrownFox'],
        ['Behold theQuickBrownFox', 'beholdTheQuickBrownFox'],
        ['The quick brown FOX', 'theQuickBrownFox'], // all caps words are camel-cased
        ['theQUickBrownFox', 'theQUickBrownFox'], // all caps substrings >= 4 chars are camel-cased
        ['theQUIckBrownFox', 'theQUIckBrownFox'],
    ])('toCamelCase(%s) => %s', (original, expected) => {
        expect(toCamelCase(original)).equal(expected);
    });
});
describe('toSnakeCase()', () => {
    test.each([
        ['the quick brown fox', 'the_quick_brown_fox'], // lower case
        ['the-quick-brown-fox', 'the_quick_brown_fox'], // kebab case
        ['the_quick_brown_fox', 'the_quick_brown_fox'], // snake case
        ['theQuickBrownFox', 'the_quick_brown_fox'], // pascal case
        ['theQuickBrown Fox', 'the_quick_brown_fox'], // space separated words
        ['thequickbrownfox', 'thequickbrownfox'], // no spaces
        ['the - quick * brown# fox', 'the_quick_brown_fox'], // punctuation
        ['theQUICKBrownFox', 'the_q_u_i_c_k_brown_fox'], // all caps words are snake-cased
    ])('toSnakeCase(%s) => %s', (original, expected) => {
        expect(toSnakeCase(original)).equal(expected);
    });
});
describe('toKebabCase()', () => {
    test.each([
        ['the quick brown fox', 'the-quick-brown-fox'], // lower case
        ['the-quick-brown-fox', 'the-quick-brown-fox'], // kebab case
        ['the_quick_brown_fox', 'the-quick-brown-fox'], // snake case
        ['theQuickBrownFox', 'the-quick-brown-fox'], // pascal case
        ['theQuickBrown Fox', 'the-quick-brown-fox'], // space separated words
        ['thequickbrownfox', 'thequickbrownfox'], // no spaces
        ['the - quick * brown# fox', 'the-quick-brown-fox'], // punctuation
        ['theQUICKBrownFox', 'the-q-u-i-c-k-brown-fox'], // all caps words are snake-cased
    ])('toKebabCase(%s) => %s', (original, expected) => {
        expect(toKebabCase(original)).equal(expected);
    });
});
describe('toPascalCase()', () => {
    test.each([
        ['the quick brown fox', 'TheQuickBrownFox'], // lower case
        ['the_quick_brown_fox', 'TheQuickBrownFox'], // snake case
        ['the-quick-brown-fox', 'TheQuickBrownFox'], // kebab case
        ['theQuickBrownFox', 'TheQuickBrownFox'], // pascal case
        ['thequickbrownfox', 'Thequickbrownfox'], // lowercase
        ['the - quick * brown# fox', 'TheQuickBrownFox'], // punctuation
        ['theQUICKBrownFox', 'TheQUICKBrownFox'], // all caps words are pascal-cased
    ])('toPascalCase(%s) => %s', (original, expected) => {
        expect(toPascalCase(original)).equal(expected);
    });
});
describe('romanize()', () => {
    test.each([
        [1, 'I'],
        [2, 'II'],
        [3, 'III'],
        [4, 'IV'],
        [5, 'V'],
        [6, 'VI'],
        [7, 'VII'],
        [8, 'VIII'],
        [9, 'IX'],
        [10, 'X'],
        [11, 'XI'],
        [12, 'XII'],
        [13, 'XIII'],
        [14, 'XIV'],
        [15, 'XV'],
        [16, 'XVI'],
        [17, 'XVII'],
        [18, 'XVIII'],
        [19, 'XIX'],
        [20, 'XX'],
        [40, 'XL'],
        [49, 'XLIX'],
        [50, 'L'],
        [90, 'XC'],
        [100, 'C'],
        [400, 'CD'],
        [500, 'D'],
        [900, 'CM'],
        [1000, 'M'],
    ])('romanize(%s) => %s', (original, expected) => {
        expect(romanize(original)).equal(expected);
    });
});
describe('truncate()', () => {
    test.each([
        ['the quick brown fox', 9, undefined, 'the quick…'],
        ['the quick brown fox', 15, undefined, 'the quick brown…'],
        ['the quick brown fox', 15, 3, 'the quick br…fox'],
        ['the quick brown fox', 9, Infinity, '…brown fox'],
    ])('truncate(%s, %s) => %s', (original, totalChars, endChars, expected) => {
        expect(truncate(original, totalChars, endChars)).equal(expected);
    });
});
