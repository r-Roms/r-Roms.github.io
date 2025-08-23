import type { ComponentProps } from "svelte";
import type RangeCalendar from "./range-calendar.svelte";
import RangeCalendarMonthSelect from "./range-calendar-month-select.svelte";
import RangeCalendarYearSelect from "./range-calendar-year-select.svelte";
import { type DateValue } from "@internationalized/date";
type $$ComponentProps = {
    captionLayout: ComponentProps<typeof RangeCalendar>["captionLayout"];
    months: ComponentProps<typeof RangeCalendarMonthSelect>["months"];
    monthFormat: ComponentProps<typeof RangeCalendarMonthSelect>["monthFormat"];
    years: ComponentProps<typeof RangeCalendarYearSelect>["years"];
    yearFormat: ComponentProps<typeof RangeCalendarYearSelect>["yearFormat"];
    month: DateValue;
    placeholder: DateValue | undefined;
    locale: string;
    monthIndex: number;
};
declare const RangeCalendarCaption: import("svelte").Component<$$ComponentProps, {}, "placeholder">;
type RangeCalendarCaption = ReturnType<typeof RangeCalendarCaption>;
export default RangeCalendarCaption;
