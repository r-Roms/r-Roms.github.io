import {} from "svelte-toolbelt";
import { Context } from "runed";
export const DateRangePickerRootContext = new Context("DateRangePicker.Root");
export class DateRangePickerRootState {
    static create(opts) {
        return DateRangePickerRootContext.set(new DateRangePickerRootState(opts));
    }
    opts;
    constructor(opts) {
        this.opts = opts;
    }
}
