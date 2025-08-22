import type { DateValue } from "@internationalized/date";
import { DOMContext, type ReadableBoxedValues, type WritableBoxedValues } from "svelte-toolbelt";
import { Context } from "runed";
import { DateFieldInputState, DateFieldRootState } from "../date-field/date-field.svelte.js";
import type { DateOnInvalid, DateRange, DateRangeValidator, SegmentPart } from "../../shared/index.js";
import type { RefAttachment, WithRefOpts } from "../../internal/types.js";
import type { Granularity } from "../../shared/date/types.js";
import { type Formatter } from "../../internal/date-time/formatter.js";
export declare const dateRangeFieldAttrs: import("../../internal/attrs.js").CreateBitsAttrsReturn<readonly ["root", "label"]>;
export declare const DateRangeFieldRootContext: Context<DateRangeFieldRootState>;
interface DateRangeFieldRootStateOpts extends WithRefOpts, WritableBoxedValues<{
    value: DateRange;
    placeholder: DateValue;
    startValue: DateValue | undefined;
    endValue: DateValue | undefined;
}>, ReadableBoxedValues<{
    readonlySegments: SegmentPart[];
    validate: DateRangeValidator | undefined;
    onInvalid: DateOnInvalid | undefined;
    minValue: DateValue | undefined;
    maxValue: DateValue | undefined;
    disabled: boolean;
    readonly: boolean;
    granularity: Granularity | undefined;
    hourCycle: 12 | 24 | undefined;
    locale: string;
    hideTimeZone: boolean;
    required: boolean;
    errorMessageId: string | undefined;
}> {
}
export declare class DateRangeFieldRootState {
    #private;
    static create(opts: DateRangeFieldRootStateOpts): DateRangeFieldRootState;
    readonly opts: DateRangeFieldRootStateOpts;
    startFieldState: DateFieldRootState | undefined;
    endFieldState: DateFieldRootState | undefined;
    descriptionId: string;
    formatter: Formatter;
    fieldNode: HTMLElement | null;
    labelNode: HTMLElement | null;
    descriptionNode: HTMLElement | null;
    readonly startValueComplete: boolean;
    readonly endValueComplete: boolean;
    readonly rangeComplete: boolean;
    domContext: DOMContext;
    readonly attachment: RefAttachment;
    constructor(opts: DateRangeFieldRootStateOpts);
    readonly validationStatus: false | {
        readonly reason: "custom";
        readonly message: string | string[];
    } | {
        readonly reason: "min";
        readonly message?: undefined;
    } | {
        readonly reason: "max";
        readonly message?: undefined;
    };
    readonly isInvalid: boolean;
    readonly props: {
        readonly id: string;
        readonly role: "group";
        readonly "data-invalid": "" | undefined;
    };
}
interface DateRangeFieldLabelStateOpts extends WithRefOpts {
}
export declare class DateRangeFieldLabelState {
    #private;
    static create(opts: DateRangeFieldLabelStateOpts): DateRangeFieldLabelState;
    readonly opts: DateRangeFieldLabelStateOpts;
    readonly root: DateRangeFieldRootState;
    readonly attachment: RefAttachment;
    constructor(opts: DateRangeFieldLabelStateOpts, root: DateRangeFieldRootState);
    readonly props: {
        readonly id: string;
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly onclick: () => void;
    };
}
interface DateRangeFieldInputStateOpts extends WithRefOpts, WritableBoxedValues<{
    value: DateValue | undefined;
}>, ReadableBoxedValues<{
    name: string;
}> {
}
export declare class DateRangeFieldInputState {
    static create(opts: Omit<DateRangeFieldInputStateOpts, "value">, type: "start" | "end"): DateFieldInputState;
}
export {};
