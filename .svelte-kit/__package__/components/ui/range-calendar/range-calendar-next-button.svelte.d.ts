import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
import { type ButtonVariant } from "../button/index.js";
type $$ComponentProps = RangeCalendarPrimitive.NextButtonProps & {
    variant?: ButtonVariant;
};
declare const RangeCalendarNextButton: import("svelte").Component<$$ComponentProps, {}, "ref">;
type RangeCalendarNextButton = ReturnType<typeof RangeCalendarNextButton>;
export default RangeCalendarNextButton;
