import { type DateValue } from "@internationalized/date";
import { type ReadableBox, type WritableBox } from "svelte-toolbelt";
import type { Formatter } from "./formatter.js";
import type { DateMatcher, Month } from "../../shared/index.js";
/**
 * Checks if a given node is a calendar cell element.
 *
 * @param node - The node to check.
 */
export declare function isCalendarDayNode(node: unknown): node is HTMLElement;
/**
 * Retrieves an array of date values representing the days between
 * the provided start and end dates.
 */
export declare function getDaysBetween(start: DateValue, end: DateValue): DateValue[];
export type CreateMonthProps = {
    /**
     * The date object representing the month's date (usually the first day of the month).
     */
    dateObj: DateValue;
    /**
     * The day of the week to start the calendar on (0 for Sunday, 1 for Monday, etc.).
     */
    weekStartsOn: number | undefined;
    /**
     * Whether to always render 6 weeks in the calendar, even if the month doesn't
     * span 6 weeks.
     */
    fixedWeeks: boolean;
    /**
     * The locale to use when creating the calendar month.
     */
    locale: string;
};
type SetMonthProps = CreateMonthProps & {
    numberOfMonths: number | undefined;
    currentMonths?: Month<DateValue>[];
};
export declare function createMonths(props: SetMonthProps): Month<DateValue>[];
export declare function getSelectableCells(calendarNode: HTMLElement | null): HTMLElement[];
/**
 * A helper function to extract the date from the `data-value`
 * attribute of a date cell and set it as the placeholder value.
 *
 * Shared between the calendar and range calendar builders.
 *
 * @param node - The node to extract the date from.
 * @param placeholder - The placeholder value store which will be set to the extracted date.
 */
export declare function setPlaceholderToNodeValue(node: HTMLElement, placeholder: WritableBox<DateValue>): void;
type ShiftCalendarFocusProps = {
    /**
     * The day node with current focus.
     */
    node: HTMLElement;
    /**
     * The number of days to shift the focus by.
     */
    add: number;
    /**
     * The `placeholder` value box
     */
    placeholder: WritableBox<DateValue>;
    /**
     * The calendar node.
     */
    calendarNode: HTMLElement | null;
    /**
     * Whether the previous button is disabled.
     */
    isPrevButtonDisabled: boolean;
    /**
     * Whether the next button is disabled.
     */
    isNextButtonDisabled: boolean;
    /**
     * The months array of the calendar.
     */
    months: Month<DateValue>[];
    /**
     * The number of months being displayed in the calendar.
     */
    numberOfMonths: number;
};
/**
 * Shared logic for shifting focus between cells in the
 * calendar and range calendar.
 */
export declare function shiftCalendarFocus({ node, add, placeholder, calendarNode, isPrevButtonDisabled, isNextButtonDisabled, months, numberOfMonths, }: ShiftCalendarFocusProps): void;
type HandleCalendarKeydownProps = {
    event: KeyboardEvent;
    handleCellClick: (event: Event, date: DateValue) => void;
    shiftFocus: (node: HTMLElement, add: number) => void;
    placeholderValue: DateValue;
};
/**
 * Shared keyboard event handler for the calendar and range calendar.
 */
export declare function handleCalendarKeydown({ event, handleCellClick, shiftFocus, placeholderValue, }: HandleCalendarKeydownProps): void;
type HandleCalendarPageProps = {
    months: Month<DateValue>[];
    setMonths: (months: Month<DateValue>[]) => void;
    numberOfMonths: number;
    pagedNavigation: boolean;
    weekStartsOn: number | undefined;
    locale: string;
    fixedWeeks: boolean;
    setPlaceholder: (date: DateValue) => void;
};
export declare function handleCalendarNextPage({ months, setMonths, numberOfMonths, pagedNavigation, weekStartsOn, locale, fixedWeeks, setPlaceholder, }: HandleCalendarPageProps): void;
export declare function handleCalendarPrevPage({ months, setMonths, numberOfMonths, pagedNavigation, weekStartsOn, locale, fixedWeeks, setPlaceholder, }: HandleCalendarPageProps): void;
type GetWeekdaysProps = {
    months: Month<DateValue>[];
    weekdayFormat: Intl.DateTimeFormatOptions["weekday"];
    formatter: Formatter;
};
export declare function getWeekdays({ months, formatter, weekdayFormat }: GetWeekdaysProps): string[];
type UseMonthViewSyncProps = {
    weekStartsOn: ReadableBox<number | undefined>;
    locale: ReadableBox<string>;
    fixedWeeks: ReadableBox<boolean>;
    numberOfMonths: ReadableBox<number>;
    placeholder: WritableBox<DateValue>;
    setMonths: (months: Month<DateValue>[]) => void;
};
/**
 * Updates the displayed months based on changes in the options values,
 * which determines the month to show in the calendar.
 */
export declare function useMonthViewOptionsSync(props: UseMonthViewSyncProps): void;
type CreateAccessibleHeadingProps = {
    calendarNode: HTMLElement;
    label: string;
    accessibleHeadingId: string;
};
/**
 * Creates an accessible heading element for the calendar.
 * Returns a function that removes the heading element.
 */
export declare function createAccessibleHeading({ calendarNode, label, accessibleHeadingId, }: CreateAccessibleHeadingProps): () => void;
type UseMonthViewPlaceholderSyncProps = {
    placeholder: WritableBox<DateValue>;
    getVisibleMonths: () => DateValue[];
    weekStartsOn: ReadableBox<number | undefined>;
    locale: ReadableBox<string>;
    fixedWeeks: ReadableBox<boolean>;
    numberOfMonths: ReadableBox<number>;
    setMonths: (months: Month<DateValue>[]) => void;
};
export declare function useMonthViewPlaceholderSync({ placeholder, getVisibleMonths, weekStartsOn, locale, fixedWeeks, numberOfMonths, setMonths, }: UseMonthViewPlaceholderSyncProps): void;
type GetIsNextButtonDisabledProps = {
    maxValue: DateValue | undefined;
    months: Month<DateValue>[];
    disabled: boolean;
};
export declare function getIsNextButtonDisabled({ maxValue, months, disabled, }: GetIsNextButtonDisabledProps): boolean;
type GetIsPrevButtonDisabledProps = {
    minValue: DateValue | undefined;
    months: Month<DateValue>[];
    disabled: boolean;
};
export declare function getIsPrevButtonDisabled({ minValue, months, disabled, }: GetIsPrevButtonDisabledProps): boolean;
type GetCalendarHeadingValueProps = {
    months: Month<DateValue>[];
    formatter: Formatter;
    locale: string;
};
export declare function getCalendarHeadingValue({ months, locale, formatter, }: GetCalendarHeadingValueProps): string;
type GetCalendarElementProps = {
    fullCalendarLabel: string;
    id: string;
    isInvalid: boolean;
    disabled: boolean;
    readonly: boolean;
};
export declare function getCalendarElementProps({ fullCalendarLabel, id, isInvalid, disabled, readonly, }: GetCalendarElementProps): {
    readonly id: string;
    readonly role: "application";
    readonly "aria-label": string;
    readonly "data-invalid": "" | undefined;
    readonly "data-disabled": "" | undefined;
    readonly "data-readonly": "" | undefined;
};
export type CalendarParts = "root" | "grid" | "cell" | "next-button" | "prev-button" | "day" | "grid-body" | "grid-head" | "grid-row" | "head-cell" | "header" | "heading" | "month-select" | "year-select";
export declare function pickerOpenFocus(e: Event): void;
export declare function getFirstNonDisabledDateInView(calendarRef: HTMLElement): DateValue | undefined;
/**
 * Ensures the placeholder is not set to a disabled date,
 * which would prevent the user from entering the Calendar
 * via the keyboard.
 */
export declare function useEnsureNonDisabledPlaceholder({ ref, placeholder, defaultPlaceholder, minValue, maxValue, isDateDisabled, }: {
    ref: WritableBox<HTMLElement | null>;
    placeholder: WritableBox<DateValue | undefined>;
    isDateDisabled: ReadableBox<DateMatcher>;
    minValue: ReadableBox<DateValue | undefined>;
    maxValue: ReadableBox<DateValue | undefined>;
    defaultPlaceholder: DateValue;
}): void;
export declare function getDateWithPreviousTime(date: DateValue | undefined, prev: DateValue | undefined): DateValue | undefined;
export declare const calendarAttrs: import("../attrs.js").CreateBitsAttrsReturn<readonly ["root", "grid", "cell", "next-button", "prev-button", "day", "grid-body", "grid-head", "grid-row", "head-cell", "header", "heading", "month-select", "year-select"]>;
type GetDefaultYearsProps = {
    placeholderYear: number;
    minValue: DateValue | undefined;
    maxValue: DateValue | undefined;
};
export declare function getDefaultYears(opts: GetDefaultYearsProps): number[];
export {};
