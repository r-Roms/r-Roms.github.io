import { CountableTimeInterval, type TimeInterval } from 'd3-time';
import { PeriodType, DayOfWeek, type SelectedDate, type CustomIntlDateTimeFormatOptions, type FormatDateOptions, PeriodTypeCode, type TimeIntervalType } from './date_types.js';
import { type LocaleSettings } from './locale.js';
export * from './date_types.js';
export declare function getDayOfWeekName(weekStartsOn: DayOfWeek, locales: string): string;
export declare function getPeriodTypeName(periodType: PeriodType): string;
export declare function getPeriodTypeNameWithLocale(settings: LocaleSettings, periodType: PeriodType): string;
export declare function getPeriodTypeCode(periodType: PeriodType): PeriodTypeCode;
export declare function getPeriodTypeByCode(code: PeriodTypeCode): number;
export declare function getDayOfWeek(periodType: PeriodType): DayOfWeek | null;
/** Replace day of week for `periodType`, if applicable */
export declare function replaceDayOfWeek(periodType: PeriodType, dayOfWeek: DayOfWeek): PeriodType;
/** Check if `periodType` has day of week (Sun-Sat) */
export declare function hasDayOfWeek(periodType: PeriodType): boolean;
/** Is `periodType` missing day of week (Sun-Sat) */
export declare function missingDayOfWeek(periodType: PeriodType): boolean;
export declare function getMonths(year?: number): Date[];
export declare function getMonthDaysByWeek(dateInTheMonth: Date, weekStartsOn?: DayOfWeek): Date[][];
export declare function getMinSelectedDate(date: SelectedDate | null | undefined): Date | null | undefined;
export declare function getMaxSelectedDate(date: SelectedDate | null | undefined): Date | null | undefined;
export declare function getFiscalYear(date?: Date | null, options?: {
    startMonth?: number;
}): number;
export declare function getFiscalYearRange(date?: Date, options?: {
    startMonth?: number;
    numberOfMonths?: number;
}): {
    startDate: Date;
    endDate: Date;
};
export declare function startOfFiscalYear(date: Date, options?: Parameters<typeof getFiscalYearRange>[1]): Date;
export declare function endOfFiscalYear(date: Date, options?: Parameters<typeof getFiscalYearRange>[1]): Date;
export declare function isSameFiscalYear(dateLeft: Date, dateRight: Date): boolean;
export declare function startOfBiWeek(date: Date, week: number, startOfWeek: DayOfWeek): Date;
export declare function endOfBiWeek(date: Date, week: number, startOfWeek: DayOfWeek): Date;
export declare function getDateFuncsByPeriodType(settings: LocaleSettings, periodType: PeriodType | null | undefined): {
    start: typeof startOfFiscalYear;
    end: typeof endOfFiscalYear;
    add: (date: Date, amount: number) => Date;
    difference: (date1: Date, date2: Date) => number;
    isSame: typeof isSameFiscalYear;
};
export declare function formatIntl(settings: LocaleSettings, dt: Date, tokens_or_intlOptions: CustomIntlDateTimeFormatOptions): string;
export declare function formatDate(date: Date | string | null | undefined, periodOrFormat: PeriodType | PeriodTypeCode | string, options?: FormatDateOptions): string;
export declare function updatePeriodTypeWithWeekStartsOn(weekStartsOn: DayOfWeek, periodType: PeriodType | null | undefined): PeriodType | null | undefined;
export declare function formatDateWithLocale(settings: LocaleSettings, date: Date | string | null | undefined, periodType: PeriodType | PeriodTypeCode, options?: FormatDateOptions): string;
/**
 * Return new Date using UTC date/time as local date/time
 */
export declare function utcToLocalDate(date: Date | string | null | undefined): Date;
/**
 * Return new Date using local date/time as UTC date/time
 */
export declare function localToUtcDate(date: Date | string | null | undefined): Date;
/**
 * Generate a random Date between `from` and `to` (exclusive)
 */
export declare function randomDate(from: Date, to: Date): Date;
/**
 * Determine if string is valid date string
 * - Date-only (yyyy-mm-dd)
 * - Date with time (yyyy-mm-ddThh:mm:ss)
 * - Date with time and timezone (yyyy-mm-ddThh:mm:ssZ)
 * - Date with time and offset (yyyy-mm-ddThh:mm:ss-ZZ:ZZ)
 * - Date with time and 3 digit milliseconds (yyyy-mm-ddThh:mm:ss.sss) with or without timezone / offset
 * - Date with time and 7 digit milliseconds (yyyy-mm-ddThh:mm:ss.sssssss) with or without timezone / offset
 */
export declare function isStringDate(value: string): boolean;
/**
 * Determine if string is a date string with time (yyyy-mm-ddThh:mm:ss)
 */
export declare function isStringDateWithTime(value: string): boolean;
/**
 * Determine if string is a date string with time and timezone (yyyy-mm-ddThh:mm:ssZ) or Offset (yyyy-mm-ddThh:mm:ss-ZZ:ZZ)
 */
export declare function isStringDateWithTimezone(value: string): boolean;
/** Parse a date string as a local Date if no timezone is specified
 * @param dateStr - The date string to parse
 * @param format - The format of the date string. If not provided, expects ISO 8601 format.
 *   - If provided, will use the format to parse the date string.
 *   - Supports Unicode or strftime date format strings, but will be converted to applicable strftime format before parsing.
 * @returns A Date object
 */
export declare function parseDate(dateStr: string, format?: string): Date;
/** Custom time interval for quarters */
export declare const timeQuarter: CountableTimeInterval;
/** Get a time interval function by name */
export declare function timeInterval(name: TimeIntervalType): CountableTimeInterval;
/**
 * Get the date at the start of the interval
 * @param interval The time interval to use
 * @param date Optional date to get start of interval for. If not provided, returns a function that takes a date.
 * @returns Either a Date or a function that takes a date and returns a Date
 */
export declare function startOfInterval(interval: TimeInterval | TimeIntervalType, date: Date): Date;
export declare function startOfInterval(interval: TimeInterval | TimeIntervalType): (date: Date) => Date;
/**
 * Get the date at the end of the interval
 * Similar to `interval.ceil(date)` except:
 *   - returns end of day instead of start of next day
 *   - properly handles start of day (i.e. not return same date)
 * @param interval The time interval to use
 * @param date Optional date to get end of interval for. If not provided, returns a function that takes a date.
 * @returns Either a Date or a function that takes a date and returns a Date
 */
export declare function endOfInterval(interval: TimeInterval | TimeIntervalType, date: Date): Date;
export declare function endOfInterval(interval: TimeInterval | TimeIntervalType): (date: Date) => Date;
/** Add or subtract an interval from a date */
export declare function intervalOffset(interval: TimeInterval | TimeIntervalType, date: Date, offset: number): Date;
/** Check if two dates are in the same interval (such as same day or month) */
export declare function isSameInterval(interval: TimeInterval | TimeIntervalType, date1: Date, date2: Date): boolean;
export declare function isSameInterval(interval: TimeInterval | TimeIntervalType): (date1: Date, date2: Date) => boolean;
/** Get the number of intervals between two dates (based on boundaries crossed) */
export declare function intervalDifference(interval: CountableTimeInterval | TimeIntervalType, date1: Date, date2: Date): number;
export declare function intervalDifference(interval: CountableTimeInterval | TimeIntervalType): (date1: Date, date2: Date) => number;
/** Check if date is a leap year */
export declare function isLeapYear(date: Date): boolean;
/** Check if first date is before second date */
export declare function isDateBefore(date1: Date, date2: Date): boolean;
/** Check if first date is after second date */
export declare function isDateAfter(date1: Date, date2: Date): boolean;
/** Check if date is within interval */
export declare function isDateWithin(date: Date, range: {
    start: Date;
    end: Date;
}): boolean;
//# sourceMappingURL=date.d.ts.map