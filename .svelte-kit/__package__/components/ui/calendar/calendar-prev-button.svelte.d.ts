import { Calendar as CalendarPrimitive } from "bits-ui";
import { type ButtonVariant } from "../button/index.js";
type $$ComponentProps = CalendarPrimitive.PrevButtonProps & {
    variant?: ButtonVariant;
};
declare const CalendarPrevButton: import("svelte").Component<$$ComponentProps, {}, "ref">;
type CalendarPrevButton = ReturnType<typeof CalendarPrevButton>;
export default CalendarPrevButton;
