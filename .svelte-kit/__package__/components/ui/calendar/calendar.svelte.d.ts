import { Calendar as CalendarPrimitive } from "bits-ui";
import * as Calendar from "./index.js";
import { type WithoutChildrenOrChild } from "../../../utils.js";
import type { ButtonVariant } from "../button/button.svelte";
import { type DateValue } from "@internationalized/date";
import type { Snippet } from "svelte";
type $$ComponentProps = WithoutChildrenOrChild<CalendarPrimitive.RootProps> & {
    buttonVariant?: ButtonVariant;
    captionLayout?: "dropdown" | "dropdown-months" | "dropdown-years" | "label";
    months?: CalendarPrimitive.MonthSelectProps["months"];
    years?: CalendarPrimitive.YearSelectProps["years"];
    monthFormat?: CalendarPrimitive.MonthSelectProps["monthFormat"];
    yearFormat?: CalendarPrimitive.YearSelectProps["yearFormat"];
    day?: Snippet<[{
        day: DateValue;
        outsideMonth: boolean;
    }]>;
};
declare const Calendar: import("svelte").Component<$$ComponentProps, {}, "ref" | "placeholder" | "value">;
type Calendar = ReturnType<typeof Calendar>;
export default Calendar;
