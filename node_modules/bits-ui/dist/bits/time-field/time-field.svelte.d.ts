import type { Updater } from "svelte/store";
import { Time } from "@internationalized/date";
import { type WritableBox, DOMContext, type ReadableBoxedValues, type WritableBoxedValues } from "svelte-toolbelt";
import type { BitsFocusEvent, BitsKeyboardEvent, BitsMouseEvent, RefAttachment, WithRefOpts } from "../../internal/types.js";
import type { TimeSegmentObj, SegmentPart, HourCycle, TimeValidator, TimeOnInvalid, EditableTimeSegmentPart } from "../../shared/date/types.js";
import { type TimeFormatter } from "../../internal/date-time/formatter.js";
import { type Announcer } from "../../internal/date-time/announcer.js";
import type { TimeValue } from "../../shared/date/types.js";
import type { TimeRangeFieldRootState } from "../time-range-field/time-range-field.svelte.js";
export declare const timeFieldAttrs: import("../../internal/attrs.js").CreateBitsAttrsReturn<readonly ["input", "label"]>;
interface SegmentConfig {
    min: number | ((root: TimeFieldRootState) => number);
    max: number | ((root: TimeFieldRootState) => number);
    cycle: number;
    canBeZero?: boolean;
    padZero?: boolean;
}
export interface TimeFieldRootStateOpts<T extends TimeValue = Time> extends WritableBoxedValues<{
    value: T | undefined;
    placeholder: TimeValue;
}>, ReadableBoxedValues<{
    readonlySegments: SegmentPart[];
    validate: TimeValidator<T> | undefined;
    onInvalid: TimeOnInvalid | undefined;
    minValue: TimeValue | undefined;
    maxValue: TimeValue | undefined;
    disabled: boolean;
    readonly: boolean;
    granularity: "hour" | "minute" | "second" | undefined;
    hourCycle: HourCycle | undefined;
    locale: string;
    hideTimeZone: boolean;
    required: boolean;
    errorMessageId: string | undefined;
    isInvalidProp: boolean | undefined;
}> {
}
export declare class TimeFieldRootState<T extends TimeValue = Time> {
    #private;
    static create<T extends TimeValue = Time>(opts: TimeFieldRootStateOpts<T>, rangeRoot?: TimeRangeFieldRootState<T>): TimeFieldRootState<Time>;
    value: TimeFieldRootStateOpts<T>["value"];
    placeholder: WritableBox<TimeValue>;
    validate: TimeFieldRootStateOpts<T>["validate"];
    minValue: TimeFieldRootStateOpts<T>["minValue"];
    maxValue: TimeFieldRootStateOpts<T>["maxValue"];
    disabled: TimeFieldRootStateOpts<T>["disabled"];
    readonly: TimeFieldRootStateOpts<T>["readonly"];
    granularity: TimeFieldRootStateOpts<T>["granularity"];
    readonlySegments: TimeFieldRootStateOpts<T>["readonlySegments"];
    hourCycleProp: TimeFieldRootStateOpts<T>["hourCycle"];
    locale: TimeFieldRootStateOpts<T>["locale"];
    hideTimeZone: TimeFieldRootStateOpts<T>["hideTimeZone"];
    required: TimeFieldRootStateOpts<T>["required"];
    onInvalid: TimeFieldRootStateOpts<T>["onInvalid"];
    errorMessageId: TimeFieldRootStateOpts<T>["errorMessageId"];
    isInvalidProp: TimeFieldRootStateOpts<T>["isInvalidProp"];
    descriptionId: string;
    formatter: TimeFormatter;
    initialSegments: TimeSegmentObj;
    segmentValues: TimeSegmentObj;
    announcer: Announcer;
    readonly readonlySegmentsSet: Set<SegmentPart>;
    segmentStates: import("../../shared/date/types.js").TimeSegmentStateMap;
    descriptionNode: HTMLElement | null;
    validationNode: HTMLElement | null;
    states: import("../../shared/date/types.js").TimeSegmentStateMap;
    dayPeriodNode: HTMLElement | null;
    name: string;
    readonly maxValueTime: Time | undefined;
    readonly minValueTime: Time | undefined;
    readonly valueTime: Time | undefined;
    readonly hourCycle: HourCycle;
    readonly rangeRoot: TimeRangeFieldRootState<T> | undefined;
    domContext: DOMContext;
    constructor(props: TimeFieldRootStateOpts<T>, rangeRoot?: TimeRangeFieldRootState<T>);
    setName(name: string): void;
    setFieldNode(node: HTMLElement | null): void;
    /**
     * Gets the correct field node for the time field regardless of whether it's being
     * used in a standalone context or within a `TimeRangeField` component.
     */
    getFieldNode(): HTMLElement | null;
    setLabelNode(node: HTMLElement | null): void;
    getLabelNode(): HTMLElement | null;
    setValue(value: T | undefined): void;
    syncSegmentValues(value: TimeValue): void;
    validationStatus: false | {
        readonly reason: "custom";
        readonly message: string | string[];
    } | {
        readonly reason: "min";
        readonly message?: undefined;
    } | {
        readonly reason: "max";
        readonly message?: undefined;
    };
    isInvalid: boolean;
    inferredGranularity: "hour" | "minute" | "second";
    timeRef: T;
    allSegmentContent: {
        obj: import("../../shared/date/types.js").TimeSegmentContentObj;
        arr: {
            part: import("../../internal/date-time/field/types.js").TimeSegmentPart;
            value: string;
        }[];
    };
    segmentContents: {
        part: import("../../internal/date-time/field/types.js").TimeSegmentPart;
        value: string;
    }[];
    sharedSegmentAttrs: {
        role: string;
        contenteditable: string;
        tabindex: number;
        spellcheck: boolean;
        inputmode: string;
        autocorrect: string;
        enterkeyhint: string;
        style: {
            caretColor: string;
        };
    };
    updateSegment<T extends EditableTimeSegmentPart>(part: T, cb: Updater<TimeSegmentObj[T]>): void;
    handleSegmentClick(e: BitsMouseEvent): void;
    getBaseSegmentAttrs(part: SegmentPart, segmentId: string): {
        "aria-invalid": "true" | undefined;
        "aria-disabled": "true" | "false";
        "aria-readonly": "true" | "false";
        "data-invalid": "" | undefined;
        "data-disabled": "" | undefined;
        "data-readonly": "" | undefined;
        "data-segment": string;
    } | {
        "aria-labelledby": string;
        contenteditable: string | undefined;
        "aria-describedby": string | undefined;
        tabindex: number | undefined;
        "aria-invalid": "true" | undefined;
        "aria-disabled": "true" | "false";
        "aria-readonly": "true" | "false";
        "data-invalid": "" | undefined;
        "data-disabled": "" | undefined;
        "data-readonly": "" | undefined;
        "data-segment": string;
    };
}
interface TimeFieldInputStateOpts extends WithRefOpts, ReadableBoxedValues<{
    name: string;
}> {
}
export declare class TimeFieldInputState {
    #private;
    static create(opts: TimeFieldInputStateOpts): TimeFieldInputState;
    readonly opts: TimeFieldInputStateOpts;
    readonly root: TimeFieldRootState;
    readonly attachment: RefAttachment;
    domContext: DOMContext;
    constructor(opts: TimeFieldInputStateOpts, root: TimeFieldRootState);
    readonly props: {
        readonly id: string;
        readonly role: "group";
        readonly "aria-labelledby": string | undefined;
        readonly "aria-describedby": string | undefined;
        readonly "aria-disabled": "true" | "false";
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
    };
}
export declare class TimeFieldHiddenInputState {
    static create(): TimeFieldHiddenInputState;
    readonly root: TimeFieldRootState;
    readonly shouldRender: boolean;
    readonly isoValue: string | undefined;
    constructor(root: TimeFieldRootState);
    readonly props: {
        readonly name: string;
        readonly value: string | undefined;
        readonly required: boolean;
    };
}
interface TimeFieldLabelStateOpts extends WithRefOpts {
}
export declare class TimeFieldLabelState {
    static create(opts: TimeFieldLabelStateOpts): TimeFieldLabelState;
    readonly opts: TimeFieldLabelStateOpts;
    readonly root: TimeFieldRootState;
    readonly attachment: RefAttachment;
    constructor(opts: TimeFieldLabelStateOpts, root: TimeFieldRootState);
    onclick(_: BitsMouseEvent): void;
    readonly props: {
        readonly id: string;
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly onclick: (_: BitsMouseEvent) => void;
    };
}
declare abstract class BaseTimeSegmentState {
    #private;
    readonly opts: WithRefOpts;
    readonly root: TimeFieldRootState;
    readonly announcer: Announcer;
    readonly part: string;
    readonly config: SegmentConfig;
    readonly attachment: RefAttachment;
    constructor(opts: WithRefOpts, root: TimeFieldRootState, part: string, config: SegmentConfig);
    onkeydown(e: BitsKeyboardEvent): void;
    onfocusout(_: BitsFocusEvent): void;
    getSegmentProps(): {
        "aria-label": string;
        "aria-valuemin": number;
        "aria-valuemax": number;
        "aria-valuenow": number;
        "aria-valuetext": string;
    };
    props: {
        "aria-invalid": "true" | undefined;
        "aria-disabled": "true" | "false";
        "aria-readonly": "true" | "false";
        "data-invalid": "" | undefined;
        "data-disabled": "" | undefined;
        "data-readonly": "" | undefined;
        "data-segment": string;
        onkeydown: (e: BitsKeyboardEvent) => void;
        onfocusout: (_: BitsFocusEvent) => void;
        onclick: (e: BitsMouseEvent) => void;
        "aria-label": string;
        "aria-valuemin": number;
        "aria-valuemax": number;
        "aria-valuenow": number;
        "aria-valuetext": string;
        id: string;
        role: string;
        contenteditable: string;
        tabindex: number;
        spellcheck: boolean;
        inputmode: string;
        autocorrect: string;
        enterkeyhint: string;
        style: {
            caretColor: string;
        };
    } | {
        "aria-labelledby": string;
        contenteditable: string | undefined;
        "aria-describedby": string | undefined;
        tabindex: number | undefined;
        "aria-invalid": "true" | undefined;
        "aria-disabled": "true" | "false";
        "aria-readonly": "true" | "false";
        "data-invalid": "" | undefined;
        "data-disabled": "" | undefined;
        "data-readonly": "" | undefined;
        "data-segment": string;
        onkeydown: (e: BitsKeyboardEvent) => void;
        onfocusout: (_: BitsFocusEvent) => void;
        onclick: (e: BitsMouseEvent) => void;
        "aria-label": string;
        "aria-valuemin": number;
        "aria-valuemax": number;
        "aria-valuenow": number;
        "aria-valuetext": string;
        id: string;
        role: string;
        spellcheck: boolean;
        inputmode: string;
        autocorrect: string;
        enterkeyhint: string;
        style: {
            caretColor: string;
        };
    };
}
declare class TimeFieldHourSegmentState extends BaseTimeSegmentState {
    constructor(opts: WithRefOpts, root: TimeFieldRootState);
    onkeydown(e: BitsKeyboardEvent): void;
}
declare class TimeFieldMinuteSegmentState extends BaseTimeSegmentState {
    constructor(opts: WithRefOpts, root: TimeFieldRootState);
}
declare class TimeFieldSecondSegmentState extends BaseTimeSegmentState {
    constructor(opts: WithRefOpts, root: TimeFieldRootState);
}
interface TimeFieldDayPeriodSegmentStateOpts extends WithRefOpts {
}
declare class TimeFieldDayPeriodSegmentState {
    #private;
    readonly opts: TimeFieldDayPeriodSegmentStateOpts;
    readonly root: TimeFieldRootState;
    readonly attachment: RefAttachment;
    constructor(opts: TimeFieldDayPeriodSegmentStateOpts, root: TimeFieldRootState);
    onkeydown(e: BitsKeyboardEvent): void;
    readonly props: {
        "aria-invalid": "true" | undefined;
        "aria-disabled": "true" | "false";
        "aria-readonly": "true" | "false";
        "data-invalid": "" | undefined;
        "data-disabled": "" | undefined;
        "data-readonly": "" | undefined;
        "data-segment": string;
        id: string;
        inputmode: string;
        "aria-label": string;
        "aria-valuemin": number;
        "aria-valuemax": number;
        "aria-valuenow": number;
        "aria-valuetext": string;
        onkeydown: (e: BitsKeyboardEvent) => void;
        onclick: (e: BitsMouseEvent) => void;
        role: string;
        contenteditable: string;
        tabindex: number;
        spellcheck: boolean;
        autocorrect: string;
        enterkeyhint: string;
        style: {
            caretColor: string;
        };
    } | {
        "aria-labelledby": string;
        contenteditable: string | undefined;
        "aria-describedby": string | undefined;
        tabindex: number | undefined;
        "aria-invalid": "true" | undefined;
        "aria-disabled": "true" | "false";
        "aria-readonly": "true" | "false";
        "data-invalid": "" | undefined;
        "data-disabled": "" | undefined;
        "data-readonly": "" | undefined;
        "data-segment": string;
        id: string;
        inputmode: string;
        "aria-label": string;
        "aria-valuemin": number;
        "aria-valuemax": number;
        "aria-valuenow": number;
        "aria-valuetext": string;
        onkeydown: (e: BitsKeyboardEvent) => void;
        onclick: (e: BitsMouseEvent) => void;
        role: string;
        spellcheck: boolean;
        autocorrect: string;
        enterkeyhint: string;
        style: {
            caretColor: string;
        };
    } | undefined;
}
interface TimeFieldLiteralSegmentStateOpts extends WithRefOpts {
}
declare class TimeFieldLiteralSegmentState {
    readonly opts: TimeFieldLiteralSegmentStateOpts;
    readonly root: TimeFieldRootState;
    readonly attachment: RefAttachment;
    constructor(opts: TimeFieldLiteralSegmentStateOpts, root: TimeFieldRootState);
    readonly props: {
        readonly "aria-invalid": "true" | undefined;
        readonly "aria-disabled": "true" | "false";
        readonly "aria-readonly": "true" | "false";
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
        readonly "data-segment": string;
        readonly id: string;
        readonly "aria-hidden": "true" | undefined;
    } | {
        readonly "aria-labelledby": string;
        readonly contenteditable: string | undefined;
        readonly "aria-describedby": string | undefined;
        readonly tabindex: number | undefined;
        readonly "aria-invalid": "true" | undefined;
        readonly "aria-disabled": "true" | "false";
        readonly "aria-readonly": "true" | "false";
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
        readonly "data-segment": string;
        readonly id: string;
        readonly "aria-hidden": "true" | undefined;
    };
}
declare class TimeFieldTimeZoneSegmentState {
    readonly opts: TimeFieldLiteralSegmentStateOpts;
    readonly root: TimeFieldRootState;
    readonly attachment: RefAttachment;
    constructor(opts: TimeFieldLiteralSegmentStateOpts, root: TimeFieldRootState);
    onkeydown(e: BitsKeyboardEvent): void;
    readonly props: {
        readonly "data-readonly": "" | undefined;
        readonly "aria-invalid": "true" | undefined;
        readonly "aria-disabled": "true" | "false";
        readonly "aria-readonly": "true" | "false";
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-segment": string;
        readonly role: "textbox";
        readonly id: string;
        readonly "aria-label": "timezone, ";
        readonly style: {
            readonly caretColor: "transparent";
        };
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
        readonly tabindex: 0;
    } | {
        readonly "data-readonly": "" | undefined;
        readonly "aria-labelledby": string;
        readonly contenteditable: string | undefined;
        readonly "aria-describedby": string | undefined;
        readonly tabindex: number | undefined;
        readonly "aria-invalid": "true" | undefined;
        readonly "aria-disabled": "true" | "false";
        readonly "aria-readonly": "true" | "false";
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-segment": string;
        readonly role: "textbox";
        readonly id: string;
        readonly "aria-label": "timezone, ";
        readonly style: {
            readonly caretColor: "transparent";
        };
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    };
}
export declare class DateFieldSegmentState {
    static create(part: SegmentPart, opts: WithRefOpts): TimeFieldHourSegmentState | TimeFieldMinuteSegmentState | TimeFieldSecondSegmentState | TimeFieldDayPeriodSegmentState | TimeFieldLiteralSegmentState | TimeFieldTimeZoneSegmentState;
}
export {};
