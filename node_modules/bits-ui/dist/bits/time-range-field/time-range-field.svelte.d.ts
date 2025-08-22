import type { Time } from "@internationalized/date";
import { DOMContext, type ReadableBoxedValues, type WritableBoxedValues } from "svelte-toolbelt";
import { Context } from "runed";
import { TimeFieldRootState } from "../time-field/time-field.svelte.js";
import { TimeFieldInputState } from "../time-field/time-field.svelte.js";
import type { TimeSegmentPart } from "../../shared/index.js";
import type { RefAttachment, WithRefOpts } from "../../internal/types.js";
import type { TimeGranularity, TimeOnInvalid, TimeRange, TimeRangeValidator, TimeValue } from "../../shared/date/types.js";
import { type TimeFormatter } from "../../internal/date-time/formatter.js";
export declare const timeRangeFieldAttrs: import("../../internal/attrs.js").CreateBitsAttrsReturn<readonly ["root", "label"]>;
export declare const TimeRangeFieldRootContext: Context<TimeRangeFieldRootState<Time>>;
interface TimeRangeFieldRootStateOpts<T extends TimeValue = Time> extends WithRefOpts, WritableBoxedValues<{
    value: TimeRange<T>;
    placeholder: TimeValue;
    startValue: T | undefined;
    endValue: T | undefined;
}>, ReadableBoxedValues<{
    readonlySegments: TimeSegmentPart[];
    validate: TimeRangeValidator<T> | undefined;
    onInvalid: TimeOnInvalid | undefined;
    minValue: TimeValue | undefined;
    maxValue: TimeValue | undefined;
    disabled: boolean;
    readonly: boolean;
    granularity: TimeGranularity | undefined;
    hourCycle: 12 | 24 | undefined;
    locale: string;
    hideTimeZone: boolean;
    required: boolean;
    errorMessageId: string | undefined;
}> {
}
export declare class TimeRangeFieldRootState<T extends TimeValue = Time> {
    #private;
    static create<T extends TimeValue = Time>(opts: TimeRangeFieldRootStateOpts<T>): TimeRangeFieldRootState<Time>;
    readonly opts: TimeRangeFieldRootStateOpts<T>;
    readonly attachment: RefAttachment;
    startFieldState: TimeFieldRootState | undefined;
    endFieldState: TimeFieldRootState | undefined;
    descriptionId: string;
    formatter: TimeFormatter;
    fieldNode: HTMLElement | null;
    labelNode: HTMLElement | null;
    descriptionNode: HTMLElement | null;
    readonly startValueComplete: boolean;
    readonly endValueComplete: boolean;
    readonly rangeComplete: boolean;
    readonly startValueTime: Time | undefined;
    readonly endValueTime: Time | undefined;
    readonly minValueTime: Time | undefined;
    readonly maxValueTime: Time | undefined;
    domContext: DOMContext;
    constructor(opts: TimeRangeFieldRootStateOpts<T>);
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
    props: {
        readonly id: string;
        readonly role: "group";
        readonly "data-invalid": "" | undefined;
    };
}
interface TimeRangeFieldLabelStateOpts extends WithRefOpts {
}
export declare class TimeRangeFieldLabelState {
    #private;
    static create(opts: TimeRangeFieldLabelStateOpts): TimeRangeFieldLabelState;
    readonly opts: TimeRangeFieldLabelStateOpts;
    readonly root: TimeRangeFieldRootState;
    readonly attachment: RefAttachment;
    constructor(opts: TimeRangeFieldLabelStateOpts, root: TimeRangeFieldRootState);
    readonly props: {
        readonly id: string;
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly onclick: () => void;
    };
}
interface TimeRangeFieldInputStateOpts<T extends TimeValue = Time> extends WritableBoxedValues<{
    value: T | undefined;
}>, ReadableBoxedValues<{
    name: string;
}>, WithRefOpts {
}
export declare class TimeRangeFieldInputState {
    static create(opts: Omit<TimeRangeFieldInputStateOpts, "value">, type: "start" | "end"): TimeFieldInputState;
}
export {};
