import { type DateValue } from "@internationalized/date";
import type { HourCycle, TimeValue } from "../../shared/date/types.js";
import type { ReadableBox } from "svelte-toolbelt";
export type Formatter = ReturnType<typeof createFormatter>;
export type TimeFormatter = ReturnType<typeof createTimeFormatter>;
type CreateFormatterOptions = {
    initialLocale: string;
    monthFormat: ReadableBox<Intl.DateTimeFormatOptions["month"] | ((month: number) => string)>;
    yearFormat: ReadableBox<Intl.DateTimeFormatOptions["year"] | ((year: number) => string)>;
};
/**
 * Creates a wrapper around the `DateFormatter`, which is
 * an improved version of the {@link Intl.DateTimeFormat} API,
 * that is used internally by the various date builders to
 * easily format dates in a consistent way.
 *
 * @see [DateFormatter](https://react-spectrum.adobe.com/internationalized/date/DateFormatter.html)
 */
export declare function createFormatter(opts: CreateFormatterOptions): {
    setLocale: (newLocale: string) => void;
    getLocale: () => string;
    fullMonth: (date: Date) => string;
    fullYear: (date: Date) => string;
    fullMonthAndYear: (date: Date) => string;
    toParts: (date: DateValue, options?: Intl.DateTimeFormatOptions) => Intl.DateTimeFormatPart[];
    custom: (date: Date, options: Intl.DateTimeFormatOptions) => string;
    part: (dateObj: DateValue, type: Intl.DateTimeFormatPartTypes, options?: Intl.DateTimeFormatOptions) => string;
    dayPeriod: (date: Date, hourCycle?: HourCycle | undefined) => "AM" | "PM";
    selectedDate: (date: DateValue, includeTime?: boolean) => string;
    dayOfWeek: (date: Date, length?: Intl.DateTimeFormatOptions["weekday"]) => string;
};
export declare function createTimeFormatter(initialLocale: string): {
    setLocale: (newLocale: string) => void;
    getLocale: () => string;
    toParts: (timeValue: TimeValue, options?: Intl.DateTimeFormatOptions) => Intl.DateTimeFormatPart[];
    custom: (date: Date, options: Intl.DateTimeFormatOptions) => string;
    part: (dateObj: TimeValue, type: Intl.DateTimeFormatPartTypes, options?: Intl.DateTimeFormatOptions) => string;
    dayPeriod: (date: Date, hourCycle?: HourCycle | undefined) => "AM" | "PM";
    selectedTime: (date: TimeValue) => string;
};
export {};
