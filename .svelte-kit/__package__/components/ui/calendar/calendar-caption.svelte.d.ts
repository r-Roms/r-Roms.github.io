import type { ComponentProps } from "svelte";
import type Calendar from "./calendar.svelte";
import CalendarMonthSelect from "./calendar-month-select.svelte";
import CalendarYearSelect from "./calendar-year-select.svelte";
import { type DateValue } from "@internationalized/date";
type $$ComponentProps = {
    captionLayout: ComponentProps<typeof Calendar>["captionLayout"];
    months: ComponentProps<typeof CalendarMonthSelect>["months"];
    monthFormat: ComponentProps<typeof CalendarMonthSelect>["monthFormat"];
    years: ComponentProps<typeof CalendarYearSelect>["years"];
    yearFormat: ComponentProps<typeof CalendarYearSelect>["yearFormat"];
    month: DateValue;
    placeholder: DateValue | undefined;
    locale: string;
    monthIndex: number;
};
declare const CalendarCaption: import("svelte").Component<$$ComponentProps, {}, "placeholder">;
type CalendarCaption = ReturnType<typeof CalendarCaption>;
export default CalendarCaption;
