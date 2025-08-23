import { Calendar as CalendarPrimitive } from "bits-ui";
import { type ButtonVariant } from "../button/index.js";
type $$ComponentProps = CalendarPrimitive.NextButtonProps & {
    variant?: ButtonVariant;
};
declare const CalendarNextButton: import("svelte").Component<$$ComponentProps, {}, "ref">;
type CalendarNextButton = ReturnType<typeof CalendarNextButton>;
export default CalendarNextButton;
