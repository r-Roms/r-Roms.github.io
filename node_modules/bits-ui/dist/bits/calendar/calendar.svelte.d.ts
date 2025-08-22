import { type DateValue } from "@internationalized/date";
import { DOMContext, type ReadableBoxedValues, type WritableBoxedValues } from "svelte-toolbelt";
import { Context } from "runed";
import type { RangeCalendarRootState } from "../range-calendar/range-calendar.svelte.js";
import type { BitsKeyboardEvent, BitsMouseEvent, RefAttachment, WithRefOpts } from "../../internal/types.js";
import type { DateMatcher, Month } from "../../shared/index.js";
import { type Announcer } from "../../internal/date-time/announcer.js";
import { type Formatter } from "../../internal/date-time/formatter.js";
import { calendarAttrs } from "../../internal/date-time/calendar-helpers.svelte.js";
import type { WeekStartsOn } from "../../shared/date/types.js";
interface CalendarRootStateOpts extends WithRefOpts, WritableBoxedValues<{
    value: DateValue | undefined | DateValue[];
    placeholder: DateValue;
}>, ReadableBoxedValues<{
    preventDeselect: boolean;
    minValue: DateValue | undefined;
    maxValue: DateValue | undefined;
    disabled: boolean;
    pagedNavigation: boolean;
    weekStartsOn: WeekStartsOn | undefined;
    weekdayFormat: Intl.DateTimeFormatOptions["weekday"];
    isDateDisabled: DateMatcher;
    isDateUnavailable: DateMatcher;
    fixedWeeks: boolean;
    numberOfMonths: number;
    locale: string;
    calendarLabel: string;
    type: "single" | "multiple";
    readonly: boolean;
    disableDaysOutsideMonth: boolean;
    initialFocus: boolean;
    maxDays: number | undefined;
    /**
     * This is strictly used by the `DatePicker` component to close the popover when a date
     * is selected. It is not intended to be used by the user.
     */
    onDateSelect?: () => void;
    monthFormat: Intl.DateTimeFormatOptions["month"] | ((month: number) => string);
    yearFormat: Intl.DateTimeFormatOptions["year"] | ((year: number) => string);
}> {
    defaultPlaceholder: DateValue;
}
export declare const CalendarRootContext: Context<RangeCalendarRootState | CalendarRootState>;
export declare class CalendarRootState {
    #private;
    static create(opts: CalendarRootStateOpts): RangeCalendarRootState | CalendarRootState;
    readonly opts: CalendarRootStateOpts;
    readonly visibleMonths: DateValue[];
    readonly formatter: Formatter;
    readonly accessibleHeadingId: string;
    readonly domContext: DOMContext;
    readonly attachment: RefAttachment;
    months: Month<DateValue>[];
    announcer: Announcer;
    constructor(opts: CalendarRootStateOpts);
    setMonths(months: Month<DateValue>[]): void;
    /**
     * This derived state holds an array of localized day names for the current
     * locale and calendar view. It dynamically syncs with the 'weekStartsOn' option,
     * updating its content when the option changes. Using this state to render the
     * calendar's days of the week is strongly recommended, as it guarantees that
     * the days are correctly formatted for the current locale and calendar view.
     */
    readonly weekdays: string[];
    readonly initialPlaceholderYear: number;
    readonly defaultYears: number[];
    /**
     * Navigates to the next page of the calendar.
     */
    nextPage(): void;
    /**
     * Navigates to the previous page of the calendar.
     */
    prevPage(): void;
    nextYear(): void;
    prevYear(): void;
    setYear(year: number): void;
    setMonth(month: number): void;
    isNextButtonDisabled: boolean;
    isPrevButtonDisabled: boolean;
    isInvalid: boolean;
    readonly headingValue: string;
    readonly fullCalendarLabel: string;
    isOutsideVisibleMonths(date: DateValue): boolean;
    isDateDisabled(date: DateValue): boolean;
    isDateSelected(date: DateValue): boolean;
    shiftFocus(node: HTMLElement, add: number): void;
    handleCellClick(_: Event, date: DateValue): void;
    handleMultipleUpdate(prev: DateValue[] | undefined, date: DateValue): DateValue[] | undefined;
    handleSingleUpdate(prev: DateValue | undefined, date: DateValue): DateValue | undefined;
    onkeydown(event: BitsKeyboardEvent): void;
    readonly snippetProps: {
        months: Month<DateValue>[];
        weekdays: string[];
    };
    getBitsAttr: (typeof calendarAttrs)["getAttr"];
    readonly props: {
        readonly onkeydown: (event: BitsKeyboardEvent) => void;
        readonly id: string;
        readonly role: "application";
        readonly "aria-label": string;
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
    };
}
interface CalendarHeadingStateOpts extends WithRefOpts {
}
export declare class CalendarHeadingState {
    static create(opts: CalendarHeadingStateOpts): CalendarHeadingState;
    readonly opts: CalendarHeadingStateOpts;
    readonly root: CalendarRootState | RangeCalendarRootState;
    readonly attachment: RefAttachment;
    constructor(opts: CalendarHeadingStateOpts, root: CalendarRootState | RangeCalendarRootState);
    readonly props: {
        readonly id: string;
        readonly "aria-hidden": "true" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
    };
}
interface CalendarCellStateOpts extends WithRefOpts, ReadableBoxedValues<{
    date: DateValue;
    month: DateValue;
}> {
}
export declare class CalendarCellState {
    static create(opts: CalendarCellStateOpts): CalendarCellState;
    readonly opts: CalendarCellStateOpts;
    readonly root: CalendarRootState;
    readonly cellDate: Date;
    readonly isUnavailable: boolean;
    readonly isDateToday: boolean;
    readonly isOutsideMonth: boolean;
    readonly isOutsideVisibleMonths: boolean;
    readonly isDisabled: boolean;
    readonly isFocusedDate: boolean;
    readonly isSelectedDate: boolean;
    readonly labelText: string;
    readonly attachment: RefAttachment;
    constructor(opts: CalendarCellStateOpts, root: CalendarRootState);
    readonly snippetProps: {
        disabled: boolean;
        unavailable: boolean;
        selected: boolean;
        day: string;
    };
    readonly ariaDisabled: boolean;
    readonly sharedDataAttrs: {
        readonly "data-unavailable": "" | undefined;
        readonly "data-today": "" | undefined;
        readonly "data-outside-month": "" | undefined;
        readonly "data-outside-visible-months": "" | undefined;
        readonly "data-focused": "" | undefined;
        readonly "data-selected": "" | undefined;
        readonly "data-value": string;
        readonly "data-type": string;
        readonly "data-disabled": "" | undefined;
    };
    readonly props: {
        readonly "data-unavailable": "" | undefined;
        readonly "data-today": "" | undefined;
        readonly "data-outside-month": "" | undefined;
        readonly "data-outside-visible-months": "" | undefined;
        readonly "data-focused": "" | undefined;
        readonly "data-selected": "" | undefined;
        readonly "data-value": string;
        readonly "data-type": string;
        readonly "data-disabled": "" | undefined;
        readonly id: string;
        readonly role: "gridcell";
        readonly "aria-selected": "true" | "false";
        readonly "aria-disabled": "true" | "false";
    };
}
interface CalendarDayStateOpts extends WithRefOpts {
}
export declare class CalendarDayState {
    #private;
    static create(opts: CalendarDayStateOpts): CalendarDayState;
    readonly opts: CalendarDayStateOpts;
    readonly cell: CalendarCellState;
    readonly attachment: RefAttachment;
    constructor(opts: CalendarDayStateOpts, cell: CalendarCellState);
    onclick(e: BitsMouseEvent): void;
    readonly snippetProps: {
        disabled: boolean;
        unavailable: boolean;
        selected: boolean;
        day: string;
    };
    readonly props: {
        readonly tabindex: 0 | -1 | undefined;
        readonly "data-bits-day": "";
        readonly onclick: (e: BitsMouseEvent) => void;
        readonly "data-unavailable": "" | undefined;
        readonly "data-today": "" | undefined;
        readonly "data-outside-month": "" | undefined;
        readonly "data-outside-visible-months": "" | undefined;
        readonly "data-focused": "" | undefined;
        readonly "data-selected": "" | undefined;
        readonly "data-value": string;
        readonly "data-type": string;
        readonly "data-disabled": "" | undefined;
        readonly id: string;
        readonly role: "button";
        readonly "aria-label": string;
        readonly "aria-disabled": "true" | "false";
    };
}
interface CalendarNextButtonStateOpts extends WithRefOpts {
}
export declare class CalendarNextButtonState {
    static create(opts: CalendarNextButtonStateOpts): CalendarNextButtonState;
    readonly opts: CalendarNextButtonStateOpts;
    readonly root: CalendarRootState | RangeCalendarRootState;
    readonly isDisabled: boolean;
    readonly attachment: RefAttachment;
    constructor(opts: CalendarNextButtonStateOpts, root: CalendarRootState | RangeCalendarRootState);
    onclick(_: BitsMouseEvent): void;
    readonly props: {
        readonly id: string;
        readonly role: "button";
        readonly type: "button";
        readonly "aria-label": "Next";
        readonly "aria-disabled": "true" | "false";
        readonly "data-disabled": "" | undefined;
        readonly disabled: boolean;
        readonly onclick: (_: BitsMouseEvent) => void;
    };
}
interface CalendarPrevButtonStateOpts extends WithRefOpts {
}
export declare class CalendarPrevButtonState {
    static create(opts: CalendarPrevButtonStateOpts): CalendarPrevButtonState;
    readonly opts: CalendarPrevButtonStateOpts;
    readonly root: CalendarRootState | RangeCalendarRootState;
    readonly isDisabled: boolean;
    readonly attachment: RefAttachment;
    constructor(opts: CalendarPrevButtonStateOpts, root: CalendarRootState | RangeCalendarRootState);
    onclick(_: BitsMouseEvent): void;
    readonly props: {
        readonly id: string;
        readonly role: "button";
        readonly type: "button";
        readonly "aria-label": "Previous";
        readonly "aria-disabled": "true" | "false";
        readonly "data-disabled": "" | undefined;
        readonly disabled: boolean;
        readonly onclick: (_: BitsMouseEvent) => void;
    };
}
interface CalendarGridStateOpts extends WithRefOpts {
}
export declare class CalendarGridState {
    static create(opts: CalendarGridStateOpts): CalendarGridState;
    readonly opts: CalendarGridStateOpts;
    readonly root: CalendarRootState | RangeCalendarRootState;
    readonly attachment: RefAttachment;
    constructor(opts: CalendarGridStateOpts, root: CalendarRootState | RangeCalendarRootState);
    readonly props: {
        readonly id: string;
        readonly tabindex: -1;
        readonly role: "grid";
        readonly "aria-readonly": "true" | "false";
        readonly "aria-disabled": "true" | "false";
        readonly "data-readonly": "" | undefined;
        readonly "data-disabled": "" | undefined;
    };
}
interface CalendarGridBodyStateOpts extends WithRefOpts {
}
export declare class CalendarGridBodyState {
    static create(opts: CalendarGridBodyStateOpts): CalendarGridBodyState;
    readonly opts: CalendarGridBodyStateOpts;
    readonly root: CalendarRootState | RangeCalendarRootState;
    readonly attachment: RefAttachment;
    constructor(opts: CalendarGridBodyStateOpts, root: CalendarRootState | RangeCalendarRootState);
    readonly props: {
        readonly id: string;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
    };
}
interface CalendarGridHeadStateOpts extends WithRefOpts {
}
export declare class CalendarGridHeadState {
    static create(opts: CalendarGridHeadStateOpts): CalendarGridHeadState;
    readonly opts: CalendarGridHeadStateOpts;
    readonly root: CalendarRootState | RangeCalendarRootState;
    readonly attachment: RefAttachment;
    constructor(opts: CalendarGridHeadStateOpts, root: CalendarRootState | RangeCalendarRootState);
    readonly props: {
        readonly id: string;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
    };
}
interface CalendarGridRowStateOpts extends WithRefOpts {
}
export declare class CalendarGridRowState {
    static create(opts: CalendarGridRowStateOpts): CalendarGridRowState;
    readonly opts: CalendarGridRowStateOpts;
    readonly root: CalendarRootState | RangeCalendarRootState;
    readonly attachment: RefAttachment;
    constructor(opts: CalendarGridRowStateOpts, root: CalendarRootState | RangeCalendarRootState);
    readonly props: {
        readonly id: string;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
    };
}
interface CalendarHeadCellStateOpts extends WithRefOpts {
}
export declare class CalendarHeadCellState {
    static create(opts: CalendarHeadCellStateOpts): CalendarHeadCellState;
    readonly opts: CalendarHeadCellStateOpts;
    readonly root: CalendarRootState | RangeCalendarRootState;
    readonly attachment: RefAttachment;
    constructor(opts: CalendarHeadCellStateOpts, root: CalendarRootState | RangeCalendarRootState);
    readonly props: {
        readonly id: string;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
    };
}
interface CalendarHeaderStateOpts extends WithRefOpts {
}
export declare class CalendarHeaderState {
    static create(opts: CalendarHeaderStateOpts): CalendarHeaderState;
    readonly opts: CalendarHeaderStateOpts;
    readonly root: CalendarRootState | RangeCalendarRootState;
    readonly attachment: RefAttachment;
    constructor(opts: CalendarHeaderStateOpts, root: CalendarRootState | RangeCalendarRootState);
    readonly props: {
        readonly id: string;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
    };
}
interface CalendarMonthSelectStateOpts extends WithRefOpts, ReadableBoxedValues<{
    months: number[];
    monthFormat: Intl.DateTimeFormatOptions["month"] | ((month: number) => string);
    disabled: boolean;
}> {
}
export declare class CalendarMonthSelectState {
    static create(opts: CalendarMonthSelectStateOpts): CalendarMonthSelectState;
    readonly opts: CalendarMonthSelectStateOpts;
    readonly root: CalendarRootState | RangeCalendarRootState;
    readonly attachment: RefAttachment;
    constructor(opts: CalendarMonthSelectStateOpts, root: CalendarRootState | RangeCalendarRootState);
    readonly monthItems: {
        value: number;
        label: string;
    }[];
    readonly currentMonth: number;
    readonly isDisabled: boolean;
    readonly snippetProps: {
        monthItems: {
            value: number;
            label: string;
        }[];
        selectedMonthItem: {
            value: number;
            label: string;
        };
    };
    onchange(event: Event): void;
    readonly props: {
        readonly id: string;
        readonly value: number;
        readonly disabled: boolean;
        readonly "data-disabled": "" | undefined;
        readonly onchange: (event: Event) => void;
    };
}
interface CalendarYearSelectStateOpts extends WithRefOpts, ReadableBoxedValues<{
    years: number[] | undefined;
    yearFormat: Intl.DateTimeFormatOptions["year"] | ((year: number) => string);
    disabled: boolean;
}> {
}
export declare class CalendarYearSelectState {
    static create(opts: CalendarYearSelectStateOpts): CalendarYearSelectState;
    readonly opts: CalendarYearSelectStateOpts;
    readonly root: CalendarRootState | RangeCalendarRootState;
    readonly attachment: RefAttachment;
    constructor(opts: CalendarYearSelectStateOpts, root: CalendarRootState | RangeCalendarRootState);
    readonly years: number[];
    readonly yearItems: {
        value: number;
        label: string;
    }[];
    readonly currentYear: number;
    readonly isDisabled: boolean;
    readonly snippetProps: {
        yearItems: {
            value: number;
            label: string;
        }[];
        selectedYearItem: {
            value: number;
            label: string;
        };
    };
    onchange(event: Event): void;
    readonly props: {
        readonly id: string;
        readonly value: number;
        readonly disabled: boolean;
        readonly "data-disabled": "" | undefined;
        readonly onchange: (event: Event) => void;
    };
}
export {};
