import { Context } from "runed";
import {} from "svelte-toolbelt";
export const DatePickerRootContext = new Context("DatePicker.Root");
export class DatePickerRootState {
    static create(opts) {
        return DatePickerRootContext.set(new DatePickerRootState(opts));
    }
    opts;
    constructor(opts) {
        this.opts = opts;
    }
}
