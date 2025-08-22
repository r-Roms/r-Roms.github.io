import type { DateValue } from "@internationalized/date";
import { Context } from "runed";
import { type ReadableBoxedValues, type WritableBoxedValues } from "svelte-toolbelt";
import type { DateMatcher, SegmentPart } from "../../shared/index.js";
import type { Granularity, HourCycle, WeekStartsOn } from "../../shared/date/types.js";
export declare const DatePickerRootContext: Context<DatePickerRootState>;
interface DatePickerRootStateOpts extends WritableBoxedValues<{
    value: DateValue | undefined;
    open: boolean;
    placeholder: DateValue;
}>, ReadableBoxedValues<{
    readonlySegments: SegmentPart[];
    isDateUnavailable: DateMatcher;
    isDateDisabled: DateMatcher;
    minValue: DateValue | undefined;
    maxValue: DateValue | undefined;
    disabled: boolean;
    readonly: boolean;
    granularity: Granularity | undefined;
    hourCycle: HourCycle | undefined;
    locale: string;
    hideTimeZone: boolean;
    required: boolean;
    preventDeselect: boolean;
    pagedNavigation: boolean;
    weekStartsOn: WeekStartsOn | undefined;
    weekdayFormat: Intl.DateTimeFormatOptions["weekday"];
    fixedWeeks: boolean;
    numberOfMonths: number;
    calendarLabel: string;
    disableDaysOutsideMonth: boolean;
    initialFocus: boolean;
    onDateSelect?: () => void;
    monthFormat: Intl.DateTimeFormatOptions["month"] | ((month: number) => string);
    yearFormat: Intl.DateTimeFormatOptions["year"] | ((year: number) => string);
}> {
    defaultPlaceholder: DateValue;
}
export declare class DatePickerRootState {
    static create(opts: DatePickerRootStateOpts): DatePickerRootState;
    readonly opts: DatePickerRootStateOpts;
    constructor(opts: DatePickerRootStateOpts);
}
export {};
