import { type DateValue } from "@internationalized/date";
import { DOMContext, type ReadableBoxedValues, type WritableBoxedValues } from "svelte-toolbelt";
import type { DateRange, Month } from "../../shared/index.js";
import type { BitsFocusEvent, BitsKeyboardEvent, BitsMouseEvent, RefAttachment, WithRefOpts } from "../../internal/types.js";
import { type Announcer } from "../../internal/date-time/announcer.js";
import { type Formatter } from "../../internal/date-time/formatter.js";
import { calendarAttrs } from "../../internal/date-time/calendar-helpers.svelte.js";
import type { WeekStartsOn } from "../../shared/date/types.js";
interface RangeCalendarRootStateOpts extends WithRefOpts, WritableBoxedValues<{
    value: DateRange;
    placeholder: DateValue;
    startValue: DateValue | undefined;
    endValue: DateValue | undefined;
}>, ReadableBoxedValues<{
    preventDeselect: boolean;
    minValue: DateValue | undefined;
    maxValue: DateValue | undefined;
    disabled: boolean;
    pagedNavigation: boolean;
    weekStartsOn: WeekStartsOn | undefined;
    weekdayFormat: Intl.DateTimeFormatOptions["weekday"];
    isDateDisabled: (date: DateValue) => boolean;
    isDateUnavailable: (date: DateValue) => boolean;
    fixedWeeks: boolean;
    numberOfMonths: number;
    locale: string;
    calendarLabel: string;
    readonly: boolean;
    disableDaysOutsideMonth: boolean;
    excludeDisabled: boolean;
    minDays: number | undefined;
    maxDays: number | undefined;
    /**
     * This is strictly used by the `DateRangePicker` component to close the popover when a date range
     * is selected. It is not intended to be used by the user.
     */
    onRangeSelect?: () => void;
    monthFormat: Intl.DateTimeFormatOptions["month"] | ((month: number) => string);
    yearFormat: Intl.DateTimeFormatOptions["year"] | ((year: number) => string);
}> {
    defaultPlaceholder: DateValue;
}
export declare class RangeCalendarRootState {
    #private;
    static create(opts: RangeCalendarRootStateOpts): RangeCalendarRootState | import("../calendar/calendar.svelte.js").CalendarRootState;
    readonly opts: RangeCalendarRootStateOpts;
    readonly attachment: RefAttachment;
    readonly visibleMonths: DateValue[];
    months: Month<DateValue>[];
    announcer: Announcer;
    formatter: Formatter;
    accessibleHeadingId: string;
    focusedValue: DateValue | undefined;
    lastPressedDateValue: DateValue | undefined;
    domContext: DOMContext;
    /**
     * This derived state holds an array of localized day names for the current
     * locale and calendar view. It dynamically syncs with the 'weekStartsOn' option,
     * updating its content when the option changes. Using this state to render the
     * calendar's days of the week is strongly recommended, as it guarantees that
     * the days are correctly formatted for the current locale and calendar view.
     */
    readonly weekdays: string[];
    readonly isStartInvalid: boolean;
    readonly isEndInvalid: boolean;
    readonly isInvalid: boolean;
    readonly isNextButtonDisabled: boolean;
    readonly isPrevButtonDisabled: boolean;
    readonly headingValue: string;
    readonly fullCalendarLabel: string;
    readonly highlightedRange: {
        start: DateValue;
        end: DateValue;
    } | null;
    readonly initialPlaceholderYear: number;
    readonly defaultYears: number[];
    constructor(opts: RangeCalendarRootStateOpts);
    setMonths: (months: Month<DateValue>[]) => void;
    isOutsideVisibleMonths(date: DateValue): boolean;
    isDateDisabled(date: DateValue): boolean;
    isDateUnavailable(date: DateValue): boolean;
    isSelectionStart(date: DateValue): boolean;
    isSelectionEnd(date: DateValue): boolean;
    isSelected(date: DateValue): boolean;
    shiftFocus(node: HTMLElement, add: number): void;
    handleCellClick(e: Event, date: DateValue): void;
    onkeydown(event: BitsKeyboardEvent): void;
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
    getBitsAttr: (typeof calendarAttrs)["getAttr"];
    readonly snippetProps: {
        months: Month<DateValue>[];
        weekdays: string[];
    };
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
interface RangeCalendarCellStateOpts extends WithRefOpts, ReadableBoxedValues<{
    date: DateValue;
    month: DateValue;
}> {
}
export declare class RangeCalendarCellState {
    static create(opts: RangeCalendarCellStateOpts): RangeCalendarCellState;
    readonly opts: RangeCalendarCellStateOpts;
    readonly root: RangeCalendarRootState;
    readonly attachment: RefAttachment;
    readonly cellDate: Date;
    readonly isOutsideMonth: boolean;
    readonly isDisabled: boolean;
    readonly isUnavailable: boolean;
    readonly isDateToday: boolean;
    readonly isOutsideVisibleMonths: boolean;
    readonly isFocusedDate: boolean;
    readonly isSelectedDate: boolean;
    readonly isSelectionStart: boolean;
    readonly isRangeStart: boolean;
    readonly isRangeEnd: boolean;
    readonly isRangeMiddle: boolean;
    readonly isSelectionMiddle: boolean;
    readonly isSelectionEnd: boolean;
    readonly isHighlighted: boolean;
    readonly labelText: string;
    constructor(opts: RangeCalendarCellStateOpts, root: RangeCalendarRootState);
    readonly snippetProps: {
        disabled: boolean;
        unavailable: boolean;
        selected: boolean;
    };
    readonly ariaDisabled: boolean;
    readonly sharedDataAttrs: {
        readonly "data-unavailable": "" | undefined;
        readonly "data-today": "" | undefined;
        readonly "data-outside-month": "" | undefined;
        readonly "data-outside-visible-months": "" | undefined;
        readonly "data-focused": "" | undefined;
        readonly "data-selection-start": "" | undefined;
        readonly "data-selection-end": "" | undefined;
        readonly "data-range-start": "" | undefined;
        readonly "data-range-end": "" | undefined;
        readonly "data-range-middle": "" | undefined;
        readonly "data-highlighted": "" | undefined;
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
        readonly "data-selection-start": "" | undefined;
        readonly "data-selection-end": "" | undefined;
        readonly "data-range-start": "" | undefined;
        readonly "data-range-end": "" | undefined;
        readonly "data-range-middle": "" | undefined;
        readonly "data-highlighted": "" | undefined;
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
interface RangeCalendarDayStateOpts extends WithRefOpts {
}
export declare class RangeCalendarDayState {
    #private;
    static create(opts: RangeCalendarDayStateOpts): RangeCalendarDayState;
    readonly opts: RangeCalendarDayStateOpts;
    readonly cell: RangeCalendarCellState;
    readonly attachment: RefAttachment;
    constructor(opts: RangeCalendarDayStateOpts, cell: RangeCalendarCellState);
    onclick(e: BitsMouseEvent): void;
    onmouseenter(_: BitsMouseEvent): void;
    onfocusin(_: BitsFocusEvent): void;
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
        readonly onmouseenter: (_: BitsMouseEvent) => void;
        readonly onfocusin: (_: BitsFocusEvent) => void;
        readonly "data-unavailable": "" | undefined;
        readonly "data-today": "" | undefined;
        readonly "data-outside-month": "" | undefined;
        readonly "data-outside-visible-months": "" | undefined;
        readonly "data-focused": "" | undefined;
        readonly "data-selection-start": "" | undefined;
        readonly "data-selection-end": "" | undefined;
        readonly "data-range-start": "" | undefined;
        readonly "data-range-end": "" | undefined;
        readonly "data-range-middle": "" | undefined;
        readonly "data-highlighted": "" | undefined;
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
export {};
