import { DayOfWeek } from './date_types.js';
export function getWeekStartsOnFromIntl(locales) {
    if (!locales) {
        return DayOfWeek.Sunday;
    }
    const locale = new Intl.Locale(locales);
    // @ts-expect-error
    const weekInfo = locale.weekInfo ?? locale.getWeekInfo?.();
    return (weekInfo?.firstDay ?? 0) % 7; // (in Intl, sunday is 7 not 0, so we need to mod 7)
}
/**
 * Unicode to strftime format mapping
 * Based on Unicode TR35 Date Field Symbol Table and POSIX strftime
 * @see https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * @see https://pubs.opengroup.org/onlinepubs/9699919799/functions/strftime.html
 */
const unicodeToStrftime = {
    // ===== YEAR =====
    y: '%y', // 2-digit year (00-99)
    yy: '%y', // 2-digit year with leading zero
    yyyy: '%Y', // 4-digit year
    Y: '%Y', // 4-digit year (short form)
    // ===== MONTH =====
    M: '%m', // Month as number (1-12, but strftime uses 01-12)
    MM: '%m', // Month as 2-digit number (01-12)
    MMM: '%b', // Abbreviated month name (Jan, Feb, etc.)
    MMMM: '%B', // Full month name (January, February, etc.)
    L: '%m', // Standalone month number (same as M in most cases)
    LL: '%m', // Standalone month number, 2-digit
    LLL: '%b', // Standalone abbreviated month name
    LLLL: '%B', // Standalone full month name
    // ===== WEEK =====
    w: null, // ❌ Week of year (1-53) - no direct strftime equivalent
    ww: null, // ❌ Week of year, 2-digit - no direct strftime equivalent
    W: '%W', // Week of year (Monday as first day) - close match
    // ===== DAY =====
    d: '%d', // Day of month (1-31, but strftime uses 01-31)
    dd: '%d', // Day of month, 2-digit (01-31)
    D: '%j', // Day of year (1-366, but strftime uses 001-366)
    DD: '%j', // Day of year, 2-digit - strftime always uses 3 digits
    DDD: '%j', // Day of year, 3-digit (001-366)
    // ===== WEEKDAY =====
    E: '%a', // Abbreviated weekday name (Mon, Tue, etc.)
    EE: '%a', // Abbreviated weekday name
    EEE: '%a', // Abbreviated weekday name
    EEEE: '%A', // Full weekday name (Monday, Tuesday, etc.)
    EEEEE: null, // ❌ Narrow weekday name (M, T, W) - no strftime equivalent
    EEEEEE: null, // ❌ Short weekday name - no strftime equivalent
    e: '%u', // Local weekday number (1-7, Monday=1) - close match
    ee: '%u', // Local weekday number, 2-digit
    eee: '%a', // Local abbreviated weekday name
    eeee: '%A', // Local full weekday name
    c: '%u', // Standalone weekday number
    cc: '%u', // Standalone weekday number, 2-digit
    ccc: '%a', // Standalone abbreviated weekday name
    cccc: '%A', // Standalone full weekday name
    // ===== PERIOD (AM/PM) =====
    a: '%p', // AM/PM
    aa: '%p', // AM/PM
    aaa: '%p', // AM/PM
    aaaa: '%p', // AM/PM (long form, but strftime only has short)
    aaaaa: null, // ❌ Narrow AM/PM (A/P) - no strftime equivalent
    // ===== HOUR =====
    h: '%I', // Hour in 12-hour format (1-12)
    hh: '%I', // Hour in 12-hour format, 2-digit (01-12)
    H: '%H', // Hour in 24-hour format (0-23)
    HH: '%H', // Hour in 24-hour format, 2-digit (00-23)
    K: null, // ❌ Hour in 12-hour format (0-11) - no direct strftime equivalent
    KK: null, // ❌ Hour in 12-hour format, 2-digit (00-11) - no strftime equivalent
    k: null, // ❌ Hour in 24-hour format (1-24) - no direct strftime equivalent
    kk: null, // ❌ Hour in 24-hour format, 2-digit (01-24) - no strftime equivalent
    // ===== MINUTE =====
    m: '%M', // Minutes (0-59)
    mm: '%M', // Minutes, 2-digit (00-59)
    // ===== SECOND =====
    s: '%S', // Seconds (0-59)
    ss: '%S', // Seconds, 2-digit (00-59)
    S: null, // ❌ Fractional seconds (1 digit) - no direct strftime equivalent
    SS: null, // ❌ Fractional seconds (2 digits) - no direct strftime equivalent
    SSS: null, // ❌ Fractional seconds (3 digits) - no direct strftime equivalent
    A: null, // ❌ Milliseconds in day - no strftime equivalent
    // ===== TIMEZONE =====
    z: '%Z', // Timezone name (EST, PST, etc.)
    zz: '%Z', // Timezone name
    zzz: '%Z', // Timezone name
    zzzz: '%Z', // Full timezone name
    Z: '%z', // Timezone offset (+0000, -0500, etc.)
    ZZ: '%z', // Timezone offset
    ZZZ: '%z', // Timezone offset
    ZZZZ: null, // ❌ GMT-relative timezone - partial strftime support
    ZZZZZ: null, // ❌ ISO 8601 timezone - no direct strftime equivalent
    O: null, // ❌ Localized GMT offset - no strftime equivalent
    OOOO: null, // ❌ Full localized GMT offset - no strftime equivalent
    v: null, // ❌ Generic timezone - no strftime equivalent
    vvvv: null, // ❌ Generic timezone full - no strftime equivalent
    V: null, // ❌ Timezone ID - no strftime equivalent
    VV: null, // ❌ Timezone ID - no strftime equivalent
    VVV: null, // ❌ Timezone exemplar city - no strftime equivalent
    VVVV: null, // ❌ Generic location format - no strftime equivalent
    X: null, // ❌ ISO 8601 timezone - no direct strftime equivalent
    XX: null, // ❌ ISO 8601 timezone - no direct strftime equivalent
    XXX: null, // ❌ ISO 8601 timezone - no direct strftime equivalent
    XXXX: null, // ❌ ISO 8601 timezone - no direct strftime equivalent
    XXXXX: null, // ❌ ISO 8601 timezone - no direct strftime equivalent
    x: null, // ❌ ISO 8601 timezone - no direct strftime equivalent
    xx: null, // ❌ ISO 8601 timezone - no direct strftime equivalent
    xxx: null, // ❌ ISO 8601 timezone - no direct strftime equivalent
    xxxx: null, // ❌ ISO 8601 timezone - no direct strftime equivalent
    xxxxx: null, // ❌ ISO 8601 timezone - no direct strftime equivalent
    // ===== QUARTER =====
    Q: null, // ❌ Quarter (1-4) - no strftime equivalent
    QQ: null, // ❌ Quarter, 2-digit (01-04) - no strftime equivalent
    QQQ: null, // ❌ Abbreviated quarter (Q1, Q2, etc.) - no strftime equivalent
    QQQQ: null, // ❌ Full quarter (1st quarter, etc.) - no strftime equivalent
    QQQQQ: null, // ❌ Narrow quarter - no strftime equivalent
    q: null, // ❌ Standalone quarter - no strftime equivalent
    qq: null, // ❌ Standalone quarter, 2-digit - no strftime equivalent
    qqq: null, // ❌ Standalone abbreviated quarter - no strftime equivalent
    qqqq: null, // ❌ Standalone full quarter - no strftime equivalent
    qqqqq: null, // ❌ Standalone narrow quarter - no strftime equivalent
    // ===== ERA =====
    G: null, // ❌ Era designator (AD, BC) - no strftime equivalent
    GG: null, // ❌ Era designator - no strftime equivalent
    GGG: null, // ❌ Era designator - no strftime equivalent
    GGGG: null, // ❌ Era designator full - no strftime equivalent
    GGGGG: null, // ❌ Era designator narrow - no strftime equivalent
};
/**
 * Convert a Unicode format string to strftime format
 * @param unicodeFormat - The Unicode format string to convert
 * @returns The strftime format string
 */
export function convertUnicodeToStrftime(unicodeFormat) {
    let result = '';
    let i = 0;
    let unsupportedPatterns = [];
    while (i < unicodeFormat.length) {
        let matched = false;
        // Try to match the longest possible pattern starting at current position
        for (let len = Math.min(5, unicodeFormat.length - i); len >= 1; len--) {
            const pattern = unicodeFormat.substring(i, i + len);
            if (pattern in unicodeToStrftime) {
                const strftimeEquivalent = unicodeToStrftime[pattern];
                if (strftimeEquivalent === null) {
                    unsupportedPatterns.push(pattern);
                    result += pattern; // Keep original if unsupported
                }
                else {
                    result += strftimeEquivalent;
                }
                i += len;
                matched = true;
                break;
            }
        }
        // If no pattern matched, copy the character as-is
        if (!matched) {
            result += unicodeFormat[i];
            i++;
        }
    }
    if (unsupportedPatterns.length > 0) {
        console.warn('Unsupported patterns:', [...new Set(unsupportedPatterns)]);
    }
    return result;
}
