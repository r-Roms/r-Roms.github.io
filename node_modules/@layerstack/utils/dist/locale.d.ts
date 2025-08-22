import { type Prettify } from './typeHelpers.js';
import { type Readable } from 'svelte/store';
import { type FormatDateLocaleOptions, type FormatDateLocalePresets } from './date_types.js';
import type { DictionaryMessages, DictionaryMessagesOptions } from './dictionary.js';
import type { FormatNumberOptions, FormatNumberStyle } from './number.js';
export interface LocaleStore extends Readable<string> {
    set(value: string | null): void;
}
export declare function localeStore(forceLocale: string | undefined, fallbackLocale?: string): LocaleStore;
type ExcludeNone<T> = T extends 'none' ? never : T;
export type NumberPresetsOptions = Prettify<{
    defaults?: FormatNumberOptions;
} & {
    [key in ExcludeNone<FormatNumberStyle>]?: FormatNumberOptions;
}>;
export type NumberPresets = Prettify<{
    defaults: FormatNumberOptions;
} & {
    [key in ExcludeNone<FormatNumberStyle>]?: FormatNumberOptions;
}>;
export interface LocaleSettingsInput {
    locale: string;
    formats?: {
        numbers?: NumberPresetsOptions;
        dates?: FormatDateLocaleOptions;
    };
    dictionary?: DictionaryMessagesOptions;
}
export interface LocaleSettings {
    locale: string;
    formats: {
        numbers: NumberPresets;
        dates: FormatDateLocalePresets;
    };
    dictionary: DictionaryMessages;
}
/** Creates a locale settings object, using the `base` locale settings as defaults.
 * If omitted, the `en` locale is used as the base. */
export declare function createLocaleSettings(localeSettings: LocaleSettingsInput, base?: LocaleSettings): LocaleSettings;
export declare const defaultLocale: LocaleSettings;
export declare function getAllKnownLocales(additionalLocales?: Record<string, LocaleSettingsInput>): Record<string, LocaleSettings>;
export {};
//# sourceMappingURL=locale.d.ts.map